// Help bot for /events/telangana-state-championship-2026.
// POST { sessionId, messages: [{ role: "user" | "assistant", content: string }] }
//   → { reply: string, turnId: string | null }
// Runs Claude on Amazon Bedrock with the server's default AWS credential chain
// (the same hprc-site-new IAM user in ~/.aws/credentials) — needs bedrock:InvokeModel.
// Overridable: TSEC_BOT_MODEL (inference profile id), TSEC_BOT_AWS_REGION.
//
// Every turn is logged to Payload `bot-turns` and labelled by the analyzer after
// the reply is sent (see lib/tsec-bot/store.ts); /admin/bot reads those logs.
import Anthropic from "@anthropic-ai/sdk";
import { after, NextResponse } from "next/server";

import { SYSTEM_PROMPT, checkEligibility, estimateFees } from "@/lib/tsec-bot/knowledge";
import {
  MODEL,
  analyzeTurn,
  bedrockClient,
  getGuard,
  hashText,
  recordTurn,
  type ToolCallLog,
  type TurnRecord,
} from "@/lib/tsec-bot/store";

export const runtime = "nodejs";

const MAX_HISTORY = 12;
const MAX_CHARS = 1000;
const MAX_TOOL_ROUNDS = 4;
const PROMPT_HASH = hashText(SYSTEM_PROMPT);

// Simple per-IP limiter (per server process): 20 messages / 10 min.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 20;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

const TOOLS: Anthropic.Tool[] = [
  {
    name: "check_eligibility",
    description:
      "Given a rider's date of birth, return their 2026 competition age and every class they are eligible for (with TS Championship / HPRC Show labels, day, fee) plus whether age proof is needed.",
    input_schema: {
      type: "object",
      properties: {
        dob: {
          type: "string",
          description:
            "Rider date of birth, YYYY-MM-DD. If only a birth year is known, use YYYY-01-01.",
        },
      },
      required: ["dob"],
      additionalProperties: false,
    },
  },
  {
    name: "estimate_fees",
    description:
      "Calculate entry + stabling fees for a set of class ids (from the class list). Uses the current standard / post-entry rate unless entryType is given.",
    input_schema: {
      type: "object",
      properties: {
        classIds: {
          type: "array",
          items: { type: "integer" },
          description: "Class ids, e.g. [8, 9].",
        },
        horsesPerClass: {
          type: "object",
          description: "Optional map of class id → number of horses (1 or 2). Defaults to 1.",
          additionalProperties: { type: "integer" },
        },
        entryType: { type: "string", enum: ["AUTO", "STANDARD", "POST_ENTRY"] },
        stablingType: { type: "string", enum: ["NONE", "PERMANENT", "TEMPORARY", "FULL_CAMP"] },
        stablingCount: { type: "integer", description: "Number of stables." },
      },
      required: ["classIds"],
    },
  },
];

function runTool(name: string, input: unknown): unknown {
  try {
    const args = (input ?? {}) as Record<string, unknown>;
    if (name === "check_eligibility") return checkEligibility(String(args.dob ?? ""));
    if (name === "estimate_fees") {
      return estimateFees({
        classIds: Array.isArray(args.classIds)
          ? args.classIds.map(Number).filter(Number.isFinite)
          : [],
        horsesPerClass: (args.horsesPerClass ?? undefined) as Record<string, number> | undefined,
        entryType: args.entryType as "AUTO" | "STANDARD" | "POST_ENTRY" | undefined,
        stablingType: args.stablingType as
          | "NONE"
          | "PERMANENT"
          | "TEMPORARY"
          | "FULL_CAMP"
          | undefined,
        stablingCount: args.stablingCount as number | undefined,
      });
    }
    return { error: `Unknown tool ${name}` };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Tool failed" };
  }
}

function toolStatus(result: unknown): ToolCallLog["status"] {
  if (result && typeof result === "object" && "error" in result) return "error";
  if (result && typeof result === "object") {
    const r = result as Record<string, unknown>;
    const lists = ["tsChampionshipClasses", "hprcShowClasses", "dressageAndPracticeClasses"]
      .map((k) => r[k])
      .filter(Array.isArray) as unknown[][];
    if (lists.length && lists.every((l) => l.length === 0)) return "empty";
  }
  return "ok";
}

const CONTACT =
  "Please call +91 9949000085 / +91 7799259000 or the Show Secretary at +91 9100033323.";
const FALLBACK_REPLY = `Sorry, I can't answer right now. ${CONTACT}`;
const PAUSED_REPLY = `The online assistant is taking a break. ${CONTACT}`;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        reply:
          "You've sent a lot of questions in a short time. Please wait a few minutes, or call the club for help.",
        turnId: null,
      },
      { status: 429 },
    );
  }

  let body: { sessionId?: string; messages?: { role?: string; content?: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ reply: "Invalid request.", turnId: null }, { status: 400 });
  }

  const sessionId = /^[A-Za-z0-9-]{8,64}$/.test(body.sessionId ?? "")
    ? body.sessionId!
    : `anon-${hashText(ip + Date.now())}`;

  // Accept only plain-text user/assistant turns; trim length and history.
  const history: Anthropic.MessageParam[] = (body.messages ?? [])
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim(),
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content!.slice(0, MAX_CHARS),
    }));
  while (history.length && history[0].role !== "user") history.shift();
  if (!history.length || history[history.length - 1].role !== "user") {
    return NextResponse.json({ reply: "Please type a question.", turnId: null }, { status: 400 });
  }
  const question = history[history.length - 1].content as string;

  const started = Date.now();
  const rec: TurnRecord = {
    sessionId,
    ip,
    question,
    answer: "",
    toolCalls: [],
    status: "ok",
    model: MODEL,
    promptHash: PROMPT_HASH,
    latencyMs: 0,
    inputTokens: 0,
    outputTokens: 0,
  };

  const finish = async (reply: string, status = 200) => {
    rec.answer = reply;
    rec.latencyMs = Date.now() - started;
    const turnId = await recordTurn(rec);
    if (turnId && rec.status === "ok") after(() => analyzeTurn(turnId, rec));
    return NextResponse.json({ reply, turnId }, { status });
  };

  const guard = await getGuard();
  if (guard.paused) {
    rec.status = "paused";
    return finish(PAUSED_REPLY);
  }
  if (guard.spentTodayUsd >= guard.capUsd) {
    rec.status = "capped";
    return finish(PAUSED_REPLY);
  }

  const messages: Anthropic.MessageParam[] = [...history];
  // Text the model writes before a tool call is part of the answer — keep it.
  const parts: string[] = [];
  const textOf = (content: Anthropic.ContentBlock[]) =>
    content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

  try {
    for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
      const response = await bedrockClient().messages.create({
        model: MODEL,
        max_tokens: 1024,
        system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
        tools: TOOLS,
        messages,
      });
      rec.inputTokens += response.usage.input_tokens;
      rec.outputTokens += response.usage.output_tokens;

      if (response.stop_reason === "tool_use" && round < MAX_TOOL_ROUNDS) {
        messages.push({ role: "assistant", content: response.content });
        const pre = textOf(response.content);
        if (pre) parts.push(pre);
        const results: Anthropic.ToolResultBlockParam[] = response.content
          .filter((b): b is Anthropic.ToolUseBlock => b.type === "tool_use")
          .map((b) => {
            const t0 = Date.now();
            const result = runTool(b.name, b.input);
            const json = JSON.stringify(result);
            rec.toolCalls.push({
              name: b.name,
              input: b.input,
              result: json.length > 600 ? `${json.slice(0, 600)}…` : json,
              status: toolStatus(result),
              ms: Date.now() - t0,
            });
            return { type: "tool_result", tool_use_id: b.id, content: json };
          });
        messages.push({ role: "user", content: results });
        continue;
      }

      if (response.stop_reason === "refusal") {
        return finish("I can only help with questions about this event.");
      }

      const last = textOf(response.content);
      if (last) parts.push(last);
      const reply = parts.join("\n\n");
      return finish(reply || FALLBACK_REPLY);
    }
    rec.status = "error";
    rec.error = "Too many tool rounds";
    return finish(FALLBACK_REPLY);
  } catch (err) {
    rec.status = "error";
    rec.error =
      err instanceof Error ? `${err.name}: ${err.message}`.slice(0, 300) : "Unknown error";
    console.error("tsec-bot error", err);
    if (err instanceof Anthropic.RateLimitError) {
      return finish("The assistant is busy right now. Please try again in a minute.", 503);
    }
    return finish(FALLBACK_REPLY, 500);
  }
}

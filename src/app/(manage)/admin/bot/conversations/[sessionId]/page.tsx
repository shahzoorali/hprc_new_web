import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge, BotTabs, istTime, secs, severityTone, usd } from "@/components/admin/bot-ui";
import { RevealButton } from "@/components/admin/reveal-button";
import { flagsOf, sessionTurns } from "@/lib/tsec-bot/admin-data";
import { containsPii, maskPii } from "@/lib/tsec-bot/pii";

import { audit } from "../../actions";

export const dynamic = "force-dynamic";

type ToolCall = { name: string; input: unknown; result: string; status: string; ms: number };

export default async function BotTranscriptPage({
  params,
  searchParams,
}: {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sessionId = decodeURIComponent((await params).sessionId);
  const reveal = (await searchParams).reveal === "1";
  const turns = await sessionTurns(sessionId);
  if (!turns.length) notFound();

  const hasPii = turns.some((t) => containsPii(t.question) || containsPii(t.answer ?? ""));
  await audit(reveal ? "reveal_pii" : "open_chat", sessionId);
  const show = (text: string) => (reveal ? text : maskPii(text));
  const total = turns.reduce((s, t) => s + (t.costUsd ?? 0) + (t.analysis?.costUsd ?? 0), 0);

  return (
    <div className="space-y-5">
      <BotTabs active="/admin/bot/conversations" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin/bot/conversations" className="text-xs font-semibold text-brand-700">
            ← All conversations
          </Link>
          <p className="mt-1 font-mono text-xs text-neutral-500 select-all">{sessionId}</p>
          <p className="text-xs text-neutral-500">
            {turns.length} question(s) · {istTime(turns[0].createdAt)} –{" "}
            {istTime(turns[turns.length - 1].createdAt)} · {usd(total)}
          </p>
        </div>
        {hasPii ? (
          <RevealButton href={reveal ? "?" : "?reveal=1"} revealed={reveal} />
        ) : (
          <span className="text-xs text-neutral-400">No personal data detected</span>
        )}
      </div>

      {turns.map((t, i) => {
        const tools = (Array.isArray(t.toolCalls) ? t.toolCalls : []) as ToolCall[];
        const a = t.analysis;
        return (
          <section key={t.id} className="border border-neutral-200 bg-white">
            <div className="flex flex-wrap items-center gap-2 border-b border-neutral-100 bg-neutral-50 px-4 py-2 text-xs text-neutral-500">
              <span className="font-semibold text-neutral-700">#{i + 1}</span>
              <span>{istTime(t.createdAt)}</span>
              <span>· {t.model?.replace("global.anthropic.", "")}</span>
              <span>· {secs(t.latencyMs ?? null)}</span>
              <span>· {usd((t.costUsd ?? 0) + (a?.costUsd ?? 0))}</span>
              <span>
                · prompt <code>{t.promptHash}</code>
              </span>
              {t.rating ? (
                <Badge tone={t.rating === "up" ? "good" : "medium"}>
                  {t.rating === "up" ? "👍 helpful" : "👎 not helpful"}
                </Badge>
              ) : null}
              {t.status !== "ok" ? <Badge tone="high">{t.status}</Badge> : null}
            </div>

            <div className="space-y-3 p-4 text-sm">
              <div className="flex justify-end">
                <p className="max-w-[80%] whitespace-pre-wrap bg-brand-600 px-3 py-2 text-white">
                  {show(t.question)}
                </p>
              </div>

              {tools.length ? (
                <div className="space-y-1">
                  {tools.map((c, j) => (
                    <details key={j} className="border border-neutral-200 text-xs">
                      <summary className="flex cursor-pointer items-center gap-2 px-3 py-1.5">
                        <code className="font-semibold">{c.name}</code>
                        <Badge
                          tone={
                            c.status === "error" ? "high" : c.status === "empty" ? "medium" : "good"
                          }
                        >
                          {c.status === "empty" ? "nothing found" : c.status}
                        </Badge>
                        <span className="text-neutral-400">{c.ms} ms</span>
                      </summary>
                      <div className="space-y-1 border-t border-neutral-100 bg-neutral-50 px-3 py-2 font-mono text-[11px] break-all">
                        <p>
                          <span className="text-neutral-500">input:</span>{" "}
                          {show(JSON.stringify(c.input))}
                        </p>
                        <p>
                          <span className="text-neutral-500">result:</span> {c.result}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              ) : null}

              <div className="flex">
                <p className="max-w-[80%] whitespace-pre-wrap border border-neutral-200 px-3 py-2 text-neutral-800">
                  {t.status === "error" ? (
                    <span className="text-red-700">[error] {t.error}</span>
                  ) : null}
                  {t.status === "error" ? "\n" : null}
                  {show(t.answer ?? "")}
                </p>
              </div>

              {a?.outcome ? (
                <div className="flex flex-wrap items-center gap-2 border-t border-dashed border-neutral-200 pt-3 text-xs text-neutral-600">
                  <span className="font-semibold text-neutral-500">Analyzer:</span>
                  <Badge
                    tone={
                      a.outcome === "failed"
                        ? "high"
                        : a.outcome === "partial"
                          ? "medium"
                          : a.outcome === "answered"
                            ? "good"
                            : "low"
                    }
                  >
                    {a.outcome.replace("_", " ")}
                  </Badge>
                  <Badge tone={severityTone(a.severity ?? 0)}>sev {a.severity ?? 0}</Badge>
                  {flagsOf(t).map((f) => (
                    <Badge key={f}>{f.replace("_", " ")}</Badge>
                  ))}
                  <span>
                    {a.topic} — {a.reason}
                  </span>
                  {a.summary ? <p className="w-full italic text-neutral-500">{a.summary}</p> : null}
                  {a.gap ? <p className="w-full text-amber-800">Gap: {a.gap}</p> : null}
                </div>
              ) : t.status === "ok" ? (
                <p className="border-t border-dashed border-neutral-200 pt-3 text-xs text-neutral-400">
                  Not analyzed yet.
                </p>
              ) : null}
            </div>
          </section>
        );
      })}
    </div>
  );
}

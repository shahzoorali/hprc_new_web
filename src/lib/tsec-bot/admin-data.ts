// Read-side helpers for the /admin/bot dashboard. Volumes are small (an event
// bot sees hundreds of questions, not millions), so turns in the selected range
// are loaded once and aggregated in memory.
import config from "@payload-config";
import { getPayload } from "payload";
import "server-only";

import type { BotAudit, BotReview, BotTurn } from "@/payload-types";

import { BOT_ID, MODEL, startOfIstDay, sumSpend } from "./store";

export type Range = "24h" | "7d" | "14d" | "30d" | "90d";
export const RANGE_MS: Record<Range, number> = {
  "24h": 86_400_000,
  "7d": 7 * 86_400_000,
  "14d": 14 * 86_400_000,
  "30d": 30 * 86_400_000,
  "90d": 90 * 86_400_000,
};

export function parseRange(
  value: string | string[] | undefined,
  allowed: Range[],
  fallback: Range,
): Range {
  const v = Array.isArray(value) ? value[0] : value;
  return allowed.includes(v as Range) ? (v as Range) : fallback;
}

export async function loadTurns(sinceMs: number): Promise<BotTurn[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "bot-turns",
    where: {
      and: [
        { bot: { equals: BOT_ID } },
        { createdAt: { greater_than_equal: new Date(Date.now() - sinceMs).toISOString() } },
      ],
    },
    sort: "-createdAt",
    limit: 20000,
    pagination: false,
    depth: 0,
  });
  return docs;
}

export const flagsOf = (t: BotTurn): string[] =>
  Array.isArray(t.analysis?.flags) ? (t.analysis!.flags as string[]) : [];
const isFailed = (t: BotTurn) => t.status === "error" || t.analysis?.outcome === "failed";
const totalCost = (t: BotTurn) => (t.costUsd ?? 0) + (t.analysis?.costUsd ?? 0);

function percentile(values: number[], p: number): number | null {
  if (!values.length) return null;
  const s = [...values].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))];
}

function istDayKey(iso: string): string {
  return new Date(new Date(iso).getTime() + 5.5 * 3600_000).toISOString().slice(0, 10);
}

// ─── Overview ───────────────────────────────────────────────────────────────

export function overviewStats(turns: BotTurn[], rangeMs: number) {
  const answeredTurns = turns.filter((t) => t.status === "ok");
  const judged = answeredTurns.filter((t) => t.analysis?.outcome);
  const outcomeCounts: Record<string, number> = {};
  for (const t of judged)
    outcomeCounts[t.analysis!.outcome!] = (outcomeCounts[t.analysis!.outcome!] ?? 0) + 1;

  const topics = new Map<string, { topic: string; count: number; failed: number }>();
  for (const t of judged) {
    const key = t.analysis?.clusterKey || "unlabelled";
    const row = topics.get(key) ?? { topic: t.analysis?.topic || key, count: 0, failed: 0 };
    row.count++;
    if (isFailed(t)) row.failed++;
    topics.set(key, row);
  }

  // One bucket per IST day in range (24h shows today + yesterday).
  const days = Math.max(2, Math.ceil(rangeMs / 86_400_000));
  const perDay = new Map<string, { questions: number; failed: number; cost: number }>();
  for (let i = days - 1; i >= 0; i--) {
    perDay.set(istDayKey(new Date(Date.now() - i * 86_400_000).toISOString()), {
      questions: 0,
      failed: 0,
      cost: 0,
    });
  }
  for (const t of turns) {
    const row = perDay.get(istDayKey(t.createdAt));
    if (!row) continue;
    row.questions++;
    if (isFailed(t)) row.failed++;
    row.cost += totalCost(t);
  }

  const latencies = answeredTurns.map((t) => t.latencyMs ?? 0).filter((x) => x > 0);
  const botCost = turns.reduce((s, t) => s + (t.costUsd ?? 0), 0);
  const analyzerCost = turns.reduce((s, t) => s + (t.analysis?.costUsd ?? 0), 0);

  return {
    questions: turns.length,
    conversations: new Set(turns.map((t) => t.sessionId)).size,
    judged: judged.length,
    answeredPct: judged.length ? (100 * (outcomeCounts.answered ?? 0)) / judged.length : null,
    failedPct: judged.length ? (100 * (outcomeCounts.failed ?? 0)) / judged.length : null,
    thumbsUp: turns.filter((t) => t.rating === "up").length,
    thumbsDown: turns.filter((t) => t.rating === "down").length,
    botCost,
    analyzerCost,
    medianMs: percentile(latencies, 50),
    p95Ms: percentile(latencies, 95),
    errors: turns.filter((t) => t.status === "error").length,
    blocked: turns.filter((t) => t.status === "paused" || t.status === "capped").length,
    outcomeCounts,
    topTopics: [...topics.values()].sort((a, b) => b.count - a.count).slice(0, 10),
    perDay: [...perDay.entries()].map(([day, v]) => ({ day, ...v })),
  };
}

export async function healthInfo() {
  const payload = await getPayload({ config });
  const [settings, lastOk, today] = await Promise.all([
    payload.findGlobal({ slug: "bot-settings", depth: 0 }),
    payload.find({
      collection: "bot-turns",
      where: { and: [{ bot: { equals: BOT_ID } }, { status: { equals: "ok" } }] },
      sort: "-createdAt",
      limit: 1,
      depth: 0,
      select: { createdAt: true, promptHash: true },
    }),
    sumSpend(startOfIstDay()),
  ]);
  return {
    paused: Boolean(settings.paused),
    capUsd: settings.dailyCapUsd ?? 5,
    spentTodayUsd: today,
    lastAnswerAt: lastOk.docs[0]?.createdAt ?? null,
    promptHash: lastOk.docs[0]?.promptHash ?? null,
    model: MODEL,
  };
}

// ─── Alerts (computed on read; they clear themselves) ───────────────────────

export type Alert = {
  severity: "high" | "medium" | "low";
  title: string;
  detail: string;
  href?: string;
};

export function computeAlerts(
  turns: BotTurn[],
  health: Awaited<ReturnType<typeof healthInfo>>,
): Alert[] {
  const now = Date.now();
  const within = (ms: number) => turns.filter((t) => now - new Date(t.createdAt).getTime() <= ms);
  const alerts: Alert[] = [];

  if (health.paused)
    alerts.push({
      severity: "medium",
      title: "Bot paused",
      detail: "Kill switch is on — visitors see the phone numbers.",
    });
  if (health.capUsd > 0 && health.spentTodayUsd >= 0.8 * health.capUsd) {
    alerts.push({
      severity: "high",
      title: health.spentTodayUsd >= health.capUsd ? "Daily cap reached" : "Spend near daily cap",
      detail: `$${health.spentTodayUsd.toFixed(2)} of $${health.capUsd.toFixed(2)} today (IST).`,
    });
  }

  const errors15 = within(15 * 60_000).filter((t) => t.status === "error");
  if (errors15.length >= 3)
    alerts.push({
      severity: "high",
      title: "Error spike",
      detail: `${errors15.length} errors in the last 15 minutes. Last: ${errors15[0].error ?? "unknown"}`,
    });

  const toolStats = new Map<string, { calls: number; errors: number }>();
  for (const t of within(30 * 60_000)) {
    for (const c of (Array.isArray(t.toolCalls) ? t.toolCalls : []) as {
      name: string;
      status: string;
    }[]) {
      const s = toolStats.get(c.name) ?? { calls: 0, errors: 0 };
      s.calls++;
      if (c.status === "error") s.errors++;
      toolStats.set(c.name, s);
    }
  }
  for (const [name, s] of toolStats) {
    if (s.calls >= 4 && s.errors / s.calls >= 0.5)
      alerts.push({
        severity: "high",
        title: `Tool failing: ${name}`,
        detail: `${s.errors} of ${s.calls} calls errored in 30 min.`,
      });
  }

  const day = within(86_400_000);
  const down = day.filter((t) => t.rating === "down").length;
  const up = day.filter((t) => t.rating === "up").length;
  if (down >= 3 && down >= up)
    alerts.push({
      severity: "medium",
      title: "Thumbs-down spike",
      detail: `${down} not helpful vs ${up} helpful in 24 h.`,
      href: "/admin/bot/review",
    });

  const judged = day.filter((t) => t.analysis?.outcome);
  const failed = judged.filter((t) => t.analysis?.outcome === "failed").length;
  if (judged.length >= 10 && failed / judged.length >= 0.25) {
    alerts.push({
      severity: "medium",
      title: "Failure-rate spike",
      detail: `${Math.round((100 * failed) / judged.length)}% of ${judged.length} judged answers failed in 24 h.`,
      href: "/admin/bot/review",
    });
  }

  const unlabelled = turns.filter(
    (t) =>
      t.status === "ok" &&
      !t.analysis?.outcome &&
      now - new Date(t.createdAt).getTime() > 5 * 60_000,
  ).length;
  if (unlabelled >= 20)
    alerts.push({
      severity: "medium",
      title: "Analyzer behind",
      detail: `${unlabelled} answers older than 5 min have no label.`,
    });

  const hour = within(3_600_000)
    .filter((t) => t.status === "ok")
    .map((t) => t.latencyMs ?? 0);
  const p95 = percentile(hour, 95);
  if (p95 !== null && p95 > 20_000)
    alerts.push({
      severity: "low",
      title: "Slow answers",
      detail: `Slowest 5% took over ${(p95 / 1000).toFixed(0)} s in the last hour.`,
    });

  // Event-style alerts over the last 24 h.
  const failingTopics = new Map<string, { topic: string; sessions: Set<string> }>();
  for (const t of day.filter(isFailed)) {
    const k = t.analysis?.clusterKey;
    if (!k) continue;
    const row = failingTopics.get(k) ?? { topic: t.analysis?.topic ?? k, sessions: new Set() };
    row.sessions.add(t.sessionId);
    failingTopics.set(k, row);
  }
  for (const [, row] of failingTopics) {
    if (row.sessions.size >= 2)
      alerts.push({
        severity: "medium",
        title: "Same question failing",
        detail: `"${row.topic}" failed for ${row.sessions.size} people in 24 h.`,
        href: "/admin/bot/review",
      });
  }
  const unsupported = day.filter((t) => flagsOf(t).includes("unsupported_request")).length;
  if (unsupported >= 3)
    alerts.push({
      severity: "low",
      title: "Repeated unsupported requests",
      detail: `${unsupported} in 24 h — see Content gaps on the review page.`,
      href: "/admin/bot/review",
    });
  const injection = day.filter((t) => flagsOf(t).includes("injection")).length;
  if (injection)
    alerts.push({
      severity: "low",
      title: "Prompt-injection wording",
      detail: `${injection} message(s) tried to change the bot's instructions in 24 h.`,
      href: "/admin/bot/conversations?flag=injection",
    });
  const pii = day.filter((t) => flagsOf(t).includes("pii")).length;
  if (pii)
    alerts.push({
      severity: "low",
      title: "Personal data typed into chat",
      detail: `${pii} message(s) in 24 h contained phone numbers, emails or ID-like numbers.`,
    });

  const order = { high: 0, medium: 1, low: 2 };
  return alerts.sort((a, b) => order[a.severity] - order[b.severity]);
}

// ─── Needs review ───────────────────────────────────────────────────────────

export type ReviewCluster = {
  clusterKey: string;
  topic: string;
  turns: BotTurn[];
  sessions: number;
  lastAt: string;
  maxSeverity: number;
  thumbsDown: number;
  flags: string[];
  outcomes: string[];
  review: BotReview | null;
  state: "open" | "reviewed" | "regressed";
  suggestedFix: "data" | "prompt" | "feature" | "none";
};

export function needsReview(t: BotTurn, includeMinor: boolean): boolean {
  if (t.status === "error") return true;
  const a = t.analysis;
  if (t.rating === "down") return true;
  if (flagsOf(t).some((f) => f === "tool_error" || f === "no_answer")) return true;
  if (!a?.outcome) return false;
  if (a.outcome === "failed" || (a.severity ?? 0) >= 2) return true;
  return includeMinor && (a.outcome === "partial" || (a.severity ?? 0) >= 1);
}

export async function reviewClusters(
  turns: BotTurn[],
  includeMinor: boolean,
  showReviewed: boolean,
): Promise<ReviewCluster[]> {
  const payload = await getPayload({ config });
  const { docs: reviews } = await payload.find({
    collection: "bot-reviews",
    where: { bot: { equals: BOT_ID } },
    limit: 2000,
    pagination: false,
    depth: 0,
  });
  const reviewByKey = new Map(reviews.map((r) => [r.clusterKey, r]));

  const groups = new Map<string, BotTurn[]>();
  for (const t of turns.filter((x) => needsReview(x, includeMinor))) {
    const key = t.analysis?.clusterKey || (t.status === "error" ? "bot-errors" : "unlabelled");
    groups.set(key, [...(groups.get(key) ?? []), t]);
  }

  const clusters: ReviewCluster[] = [];
  for (const [key, list] of groups) {
    const review = reviewByKey.get(key) ?? null;
    const lastAt = list[0].createdAt;
    const regressed =
      review?.status === "fixed" &&
      review.reviewedAt != null &&
      list.some((t) => t.createdAt > review.reviewedAt!);
    const state: ReviewCluster["state"] = regressed ? "regressed" : review ? "reviewed" : "open";
    if (state === "reviewed" && !showReviewed) continue;
    const flags = [...new Set(list.flatMap(flagsOf))];
    clusters.push({
      clusterKey: key,
      topic:
        key === "bot-errors"
          ? "Bot errors (no answer generated)"
          : list.find((t) => t.analysis?.topic)?.analysis?.topic || key,
      turns: list,
      sessions: new Set(list.map((t) => t.sessionId)).size,
      lastAt,
      maxSeverity: Math.max(
        0,
        ...list.map((t) => t.analysis?.severity ?? (t.status === "error" ? 3 : 0)),
      ),
      thumbsDown: list.filter((t) => t.rating === "down").length,
      flags,
      outcomes: [...new Set(list.map((t) => t.analysis?.outcome ?? t.status))],
      review,
      state,
      suggestedFix: flags.includes("missing_info")
        ? "data"
        : flags.includes("unsupported_request")
          ? "feature"
          : flags.includes("tool_error")
            ? "feature"
            : "prompt",
    });
  }
  const stateOrder = { regressed: 0, open: 1, reviewed: 2 };
  return clusters.sort(
    (a, b) =>
      stateOrder[a.state] - stateOrder[b.state] ||
      b.maxSeverity - a.maxSeverity ||
      b.sessions - a.sessions ||
      b.lastAt.localeCompare(a.lastAt),
  );
}

export function contentGaps(turns: BotTurn[]) {
  const rows = new Map<
    string,
    {
      gap: string;
      kind: "missing_info" | "unsupported_request";
      sessions: Set<string>;
      lastSessionId: string;
      count: number;
    }
  >();
  for (const t of turns) {
    const flags = flagsOf(t);
    const kind = flags.includes("missing_info")
      ? "missing_info"
      : flags.includes("unsupported_request")
        ? "unsupported_request"
        : null;
    const gap = t.analysis?.gap?.trim();
    if (!kind || !gap) continue;
    const key = `${kind}:${t.analysis?.clusterKey ?? gap.toLowerCase()}`;
    const row = rows.get(key) ?? {
      gap,
      kind,
      sessions: new Set<string>(),
      lastSessionId: t.sessionId,
      count: 0,
    };
    row.sessions.add(t.sessionId);
    row.count++;
    rows.set(key, row);
  }
  return [...rows.values()].sort((a, b) => b.sessions.size - a.sessions.size || b.count - a.count);
}

// ─── Conversations ──────────────────────────────────────────────────────────

export type ConversationRow = {
  sessionId: string;
  firstQuestion: string;
  questions: number;
  failed: number;
  maxSeverity: number;
  flags: string[];
  cost: number;
  lastAt: string;
  ratings: { up: number; down: number };
};

export function conversationRows(
  turns: BotTurn[],
  f: { q?: string; outcome?: string; flag?: string; rating?: string },
): ConversationRow[] {
  const bySession = new Map<string, BotTurn[]>();
  for (const t of turns) bySession.set(t.sessionId, [...(bySession.get(t.sessionId) ?? []), t]);

  const q = f.q?.trim().toLowerCase();
  const rows: ConversationRow[] = [];
  for (const [sessionId, list] of bySession) {
    if (
      q &&
      !sessionId.toLowerCase().includes(q) &&
      !list.some((t) => `${t.question}\n${t.answer ?? ""}`.toLowerCase().includes(q))
    )
      continue;
    if (f.outcome && !list.some((t) => (t.analysis?.outcome ?? t.status) === f.outcome)) continue;
    if (f.flag && !list.some((t) => flagsOf(t).includes(f.flag!))) continue;
    if (f.rating && !list.some((t) => t.rating === f.rating)) continue;
    const ordered = [...list].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    rows.push({
      sessionId,
      firstQuestion: ordered[0].question,
      questions: list.length,
      failed: list.filter(isFailed).length,
      maxSeverity: Math.max(0, ...list.map((t) => t.analysis?.severity ?? 0)),
      flags: [...new Set(list.flatMap(flagsOf))],
      cost: list.reduce((s, t) => s + totalCost(t), 0),
      lastAt: ordered[ordered.length - 1].createdAt,
      ratings: {
        up: list.filter((t) => t.rating === "up").length,
        down: list.filter((t) => t.rating === "down").length,
      },
    });
  }
  return rows.sort((a, b) => b.lastAt.localeCompare(a.lastAt));
}

export async function sessionTurns(sessionId: string): Promise<BotTurn[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "bot-turns",
    where: { and: [{ bot: { equals: BOT_ID } }, { sessionId: { equals: sessionId } }] },
    sort: "createdAt",
    limit: 500,
    pagination: false,
    depth: 0,
  });
  return docs;
}

export async function recentAudit(limit = 30): Promise<BotAudit[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "bot-audit",
    sort: "-createdAt",
    limit,
    depth: 0,
  });
  return docs;
}

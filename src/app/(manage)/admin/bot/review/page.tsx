import Link from "next/link";

import {
  Badge,
  BotTabs,
  Panel,
  RangeSwitch,
  ago,
  istTime,
  severityTone,
} from "@/components/admin/bot-ui";
import {
  RANGE_MS,
  contentGaps,
  loadTurns,
  parseRange,
  reviewClusters,
} from "@/lib/tsec-bot/admin-data";
import { maskPii } from "@/lib/tsec-bot/pii";

import { reopenReview, saveReview } from "../actions";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  planned: "Fix planned",
  fixed: "Fixed",
  wontfix: "Won't fix",
  fine: "Fine as is",
};
const FIX_LABEL: Record<string, string> = {
  data: "Add or correct event data",
  prompt: "Change the bot prompt",
  feature: "New feature or tool",
  none: "No change needed",
};

export default async function BotReviewPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const range = parseRange(sp.range, ["24h", "7d", "14d", "30d"], "7d");
  const includeMinor = sp.minor === "1";
  const showReviewed = sp.reviewed === "1";
  const turns = await loadTurns(RANGE_MS[range]);
  const clusters = await reviewClusters(turns, includeMinor, showReviewed);
  const gaps = contentGaps(turns);

  const params: Record<string, string> = {
    ...(includeMinor ? { minor: "1" } : {}),
    ...(showReviewed ? { reviewed: "1" } : {}),
  };
  const toggle = (key: "minor" | "reviewed", on: boolean) => {
    const next = new URLSearchParams({ range, ...params });
    if (on) next.delete(key);
    else next.set(key, "1");
    return `?${next.toString()}`;
  };

  return (
    <div className="space-y-6">
      <BotTabs active="/admin/bot/review" />

      <div className="flex flex-wrap items-center gap-3">
        <RangeSwitch value={range} options={["24h", "7d", "14d", "30d"]} params={params} />
        <Link
          href={toggle("minor", includeMinor)}
          className={`border px-3 py-1.5 text-xs font-semibold hover:no-underline ${includeMinor ? "border-brand-600 bg-brand-50 text-brand-700" : "border-neutral-200 bg-white text-neutral-600"}`}
        >
          {includeMinor ? "✓ " : ""}Include minor issues
        </Link>
        <Link
          href={toggle("reviewed", showReviewed)}
          className={`border px-3 py-1.5 text-xs font-semibold hover:no-underline ${showReviewed ? "border-brand-600 bg-brand-50 text-brand-700" : "border-neutral-200 bg-white text-neutral-600"}`}
        >
          {showReviewed ? "✓ " : ""}Show reviewed
        </Link>
        <span className="text-xs text-neutral-500">{clusters.length} topic(s)</span>
      </div>

      {clusters.length === 0 ? (
        <Panel title="Nothing to review">
          <p className="text-sm text-neutral-500">
            No failed, low-severity-flagged or thumbs-down answers in this range.
          </p>
        </Panel>
      ) : null}

      {clusters.map((c) => (
        <section
          key={c.clusterKey}
          className={`border bg-white p-5 ${c.state === "regressed" ? "border-red-300" : "border-neutral-200"}`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={severityTone(c.maxSeverity)}>severity {c.maxSeverity}</Badge>
            {c.state === "regressed" ? (
              <Badge tone="high">Came back after fix</Badge>
            ) : c.state === "reviewed" ? (
              <Badge tone="good">{STATUS_LABEL[c.review!.status]}</Badge>
            ) : (
              <Badge>open</Badge>
            )}
            {c.outcomes.map((o) => (
              <Badge key={o}>{o.replace("_", " ")}</Badge>
            ))}
            {c.thumbsDown ? <Badge tone="medium">👎 {c.thumbsDown}</Badge> : null}
            {c.flags.map((f) => (
              <Badge key={f} tone="low">
                {f.replace("_", " ")}
              </Badge>
            ))}
          </div>
          <h3 className="mt-2 font-display text-lg font-bold text-neutral-900">{c.topic}</h3>
          <p className="text-xs text-neutral-500">
            {c.turns.length} time(s) · {c.sessions} people · last {ago(c.lastAt)}
          </p>

          <div className="mt-3 space-y-3">
            {c.turns.slice(0, 3).map((t) => (
              <div key={t.id} className="border-l-2 border-neutral-200 pl-3 text-sm">
                {t.analysis?.summary ? (
                  <p className="text-xs italic text-neutral-500">
                    {t.analysis.summary}
                    {t.analysis.reason ? ` — ${t.analysis.reason}` : ""}
                  </p>
                ) : null}
                <p className="mt-1">
                  <span className="font-semibold text-neutral-700">Q:</span> {maskPii(t.question)}
                </p>
                <p className="mt-1 whitespace-pre-wrap text-neutral-600">
                  <span className="font-semibold text-neutral-700">Bot:</span>{" "}
                  {t.status === "error"
                    ? `[error] ${t.error ?? ""}`
                    : maskPii((t.answer ?? "").slice(0, 600))}
                  {(t.answer ?? "").length > 600 ? "…" : ""}
                </p>
                <Link
                  href={`/admin/bot/conversations/${encodeURIComponent(t.sessionId)}`}
                  className="text-xs font-semibold text-brand-700"
                >
                  Read the whole chat ({istTime(t.createdAt)}) →
                </Link>
              </div>
            ))}
            {c.turns.length > 3 ? (
              <p className="text-xs text-neutral-400">+ {c.turns.length - 3} more</p>
            ) : null}
          </div>

          <details className="mt-4 border-t border-neutral-100 pt-3" open={c.state !== "reviewed"}>
            <summary className="cursor-pointer text-sm font-semibold text-neutral-700">
              {c.review
                ? `Reviewed by ${c.review.reviewedBy} ${c.review.reviewedAt ? ago(c.review.reviewedAt) : ""}`
                : "Review"}
            </summary>
            <form action={saveReview} className="mt-3 grid gap-3 md:grid-cols-2">
              <input type="hidden" name="clusterKey" value={c.clusterKey} />
              <input type="hidden" name="topic" value={c.topic} />
              <label className="text-xs text-neutral-600">
                Status
                <select
                  name="status"
                  defaultValue={c.review?.status ?? "planned"}
                  className="mt-1 block w-full border border-neutral-300 px-2 py-1.5 text-sm"
                >
                  {Object.entries(STATUS_LABEL).map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-xs text-neutral-600">
                Kind of fix{" "}
                <span className="text-neutral-400">(suggested: {FIX_LABEL[c.suggestedFix]})</span>
                <select
                  name="fixKind"
                  defaultValue={c.review?.fixKind ?? c.suggestedFix}
                  className="mt-1 block w-full border border-neutral-300 px-2 py-1.5 text-sm"
                >
                  {Object.entries(FIX_LABEL).map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-xs text-neutral-600 md:col-span-2">
                Note on what will change
                <textarea
                  name="note"
                  rows={2}
                  defaultValue={c.review?.note ?? ""}
                  className="mt-1 block w-full border border-neutral-300 px-2 py-1.5 text-sm"
                />
              </label>
              <label className="text-xs text-neutral-600 md:col-span-2">
                Ideal answer{" "}
                <span className="text-neutral-400">
                  (kept for future prompt fixes; don&apos;t include personal data)
                </span>
                <textarea
                  name="idealAnswer"
                  rows={3}
                  defaultValue={c.review?.idealAnswer ?? ""}
                  className="mt-1 block w-full border border-neutral-300 px-2 py-1.5 text-sm"
                />
              </label>
              <div className="flex gap-2 md:col-span-2">
                <button
                  type="submit"
                  className="border border-brand-700 bg-brand-700 px-4 py-2 text-sm font-bold text-white"
                >
                  Save review
                </button>
                {c.review ? (
                  <button
                    formAction={reopenReview}
                    type="submit"
                    className="border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold"
                  >
                    Reopen
                  </button>
                ) : null}
              </div>
            </form>
          </details>
        </section>
      ))}

      <Panel
        title="Content gaps"
        note="What people needed that the event data or the bot doesn't cover, ranked by how many different people asked."
      >
        {gaps.length ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-neutral-500">
                <th className="pb-2">Gap</th>
                <th className="pb-2">Kind</th>
                <th className="pb-2 text-right">People</th>
                <th className="pb-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {gaps.map((g, i) => (
                <tr key={i}>
                  <td className="py-2 pr-3">{maskPii(g.gap)}</td>
                  <td className="py-2 pr-3 text-xs">
                    {g.kind === "missing_info" ? "Missing info" : "Feature request"}
                  </td>
                  <td className="py-2 pr-3 text-right tabular-nums">{g.sessions.size}</td>
                  <td className="py-2 text-right">
                    <Link
                      href={`/admin/bot/conversations/${encodeURIComponent(g.lastSessionId)}`}
                      className="text-xs font-semibold text-brand-700"
                    >
                      See chat
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-neutral-500">No gaps reported in this range.</p>
        )}
      </Panel>
    </div>
  );
}

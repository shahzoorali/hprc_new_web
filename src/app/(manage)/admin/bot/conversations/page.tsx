import Link from "next/link";

import { Badge, BotTabs, istTime, severityTone, usd } from "@/components/admin/bot-ui";
import { RANGE_MS, conversationRows, loadTurns, parseRange } from "@/lib/tsec-bot/admin-data";
import { maskPii } from "@/lib/tsec-bot/pii";

export const dynamic = "force-dynamic";

const PAGE = 50;
const OUTCOMES = [
  "failed",
  "partial",
  "declined",
  "off_topic",
  "asked_back",
  "answered",
  "error",
  "paused",
  "capped",
];
const FLAGS = [
  "tool_error",
  "no_answer",
  "missing_info",
  "unsupported_request",
  "injection",
  "pii",
];

export default async function BotConversationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const one = (k: string) =>
    (Array.isArray(sp[k]) ? sp[k]![0] : (sp[k] as string | undefined)) || "";
  const range = parseRange(sp.range, ["24h", "7d", "30d", "90d"], "7d");
  const filters = {
    q: one("q"),
    outcome: one("outcome"),
    flag: one("flag"),
    rating: one("rating"),
  };
  const shown = Math.max(PAGE, Math.min(5000, Number(one("show")) || PAGE));

  const rows = conversationRows(await loadTurns(RANGE_MS[range]), filters);
  const page = rows.slice(0, shown);
  const qs = (extra: Record<string, string>) =>
    `?${new URLSearchParams({ range, ...filters, ...extra }).toString()}`;

  return (
    <div className="space-y-5">
      <BotTabs active="/admin/bot/conversations" />

      <form
        className="flex flex-wrap items-end gap-3 border border-neutral-200 bg-white p-4"
        method="get"
      >
        <label className="text-xs text-neutral-600">
          Search text or chat ID
          <input
            name="q"
            defaultValue={filters.q}
            className="mt-1 block w-64 border border-neutral-300 px-2 py-1.5 text-sm"
          />
        </label>
        <label className="text-xs text-neutral-600">
          Outcome
          <select
            name="outcome"
            defaultValue={filters.outcome}
            className="mt-1 block border border-neutral-300 px-2 py-1.5 text-sm"
          >
            <option value="">Any</option>
            {OUTCOMES.map((o) => (
              <option key={o} value={o}>
                {o.replace("_", " ")}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs text-neutral-600">
          Flag
          <select
            name="flag"
            defaultValue={filters.flag}
            className="mt-1 block border border-neutral-300 px-2 py-1.5 text-sm"
          >
            <option value="">Any</option>
            {FLAGS.map((f) => (
              <option key={f} value={f}>
                {f.replace("_", " ")}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs text-neutral-600">
          Rating
          <select
            name="rating"
            defaultValue={filters.rating}
            className="mt-1 block border border-neutral-300 px-2 py-1.5 text-sm"
          >
            <option value="">Any</option>
            <option value="up">Helpful</option>
            <option value="down">Not helpful</option>
          </select>
        </label>
        <label className="text-xs text-neutral-600">
          Time range
          <select
            name="range"
            defaultValue={range}
            className="mt-1 block border border-neutral-300 px-2 py-1.5 text-sm"
          >
            {["24h", "7d", "30d", "90d"].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="border border-brand-700 bg-brand-700 px-4 py-1.5 text-sm font-bold text-white"
        >
          Filter
        </button>
        <span className="text-xs text-neutral-500">{rows.length} chat(s)</span>
      </form>

      <div className="overflow-x-auto border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs text-neutral-500">
            <tr>
              <th className="px-3 py-2">Last message</th>
              <th className="px-3 py-2">First question</th>
              <th className="px-3 py-2 text-right">Qs</th>
              <th className="px-3 py-2 text-right">Failed</th>
              <th className="px-3 py-2">Severity / flags</th>
              <th className="px-3 py-2">Rating</th>
              <th className="px-3 py-2 text-right">Cost</th>
              <th className="px-3 py-2">Chat ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {page.map((r) => (
              <tr key={r.sessionId} className="hover:bg-neutral-50">
                <td className="whitespace-nowrap px-3 py-2 text-xs text-neutral-500">
                  {istTime(r.lastAt)}
                </td>
                <td className="max-w-md px-3 py-2">
                  <Link
                    href={`/admin/bot/conversations/${encodeURIComponent(r.sessionId)}`}
                    className="line-clamp-2 text-neutral-800 hover:text-brand-700"
                  >
                    {maskPii(r.firstQuestion)}
                  </Link>
                </td>
                <td className="px-3 py-2 text-right tabular-nums">{r.questions}</td>
                <td
                  className={`px-3 py-2 text-right tabular-nums ${r.failed ? "font-bold text-red-700" : ""}`}
                >
                  {r.failed}
                </td>
                <td className="px-3 py-2">
                  <div className="flex flex-wrap gap-1">
                    {r.maxSeverity ? (
                      <Badge tone={severityTone(r.maxSeverity)}>sev {r.maxSeverity}</Badge>
                    ) : null}
                    {r.flags.map((f) => (
                      <Badge key={f}>{f.replace("_", " ")}</Badge>
                    ))}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-xs">
                  {r.ratings.up ? `👍 ${r.ratings.up} ` : ""}
                  {r.ratings.down ? `👎 ${r.ratings.down}` : ""}
                </td>
                <td className="px-3 py-2 text-right text-xs tabular-nums">{usd(r.cost)}</td>
                <td className="px-3 py-2 font-mono text-[11px] text-neutral-500 select-all">
                  {r.sessionId}
                </td>
              </tr>
            ))}
            {!page.length ? (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-sm text-neutral-400">
                  No chats match.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      {rows.length > shown ? (
        <Link
          href={qs({ show: String(shown + PAGE) })}
          className="inline-block border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold"
        >
          Load older ({rows.length - shown} more)
        </Link>
      ) : null}
    </div>
  );
}

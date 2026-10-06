import Link from "next/link";

import {
  Badge,
  BotTabs,
  DayBars,
  HBars,
  Panel,
  RangeSwitch,
  ago,
  minutesSince,
  istTime,
  pct,
  secs,
  usd,
} from "@/components/admin/bot-ui";
import { StatCard } from "@/components/admin/stat-card";
import {
  RANGE_MS,
  computeAlerts,
  healthInfo,
  loadTurns,
  needsReview,
  overviewStats,
  parseRange,
  recentAudit,
} from "@/lib/tsec-bot/admin-data";

import { setCap, setPaused } from "./actions";

export const dynamic = "force-dynamic";

const OUTCOME_LABELS: Record<string, string> = {
  answered: "Answered",
  partial: "Partial",
  failed: "Failed",
  declined: "Declined",
  off_topic: "Off-topic",
  asked_back: "Asked back",
};

export default async function BotOverviewPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const range = parseRange((await searchParams).range, ["24h", "7d", "30d"], "7d");
  const [turns, alertTurns, health, auditRows] = await Promise.all([
    loadTurns(RANGE_MS[range]),
    loadTurns(RANGE_MS["24h"]),
    healthInfo(),
    recentAudit(30),
  ]);
  const s = overviewStats(turns, RANGE_MS[range]);
  const alerts = computeAlerts(alertTurns, health);
  const reviewCount = turns.filter((t) => needsReview(t, false)).length;
  const recentErrors = alertTurns.filter((t) => t.status === "error").length;
  const lastAnswerMins = minutesSince(health.lastAnswerAt);

  return (
    <div className="space-y-6">
      <BotTabs active="/admin/bot" />

      {/* Health banner */}
      <section
        className={`border p-5 ${health.paused ? "border-amber-300 bg-amber-50" : recentErrors >= 3 ? "border-red-300 bg-red-50" : "border-green-200 bg-green-50"}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${health.paused ? "bg-amber-500" : recentErrors >= 3 ? "bg-red-600" : "bg-green-600"}`}
              />
              <span className="font-display text-lg font-bold text-neutral-900">
                {health.paused
                  ? "Paused"
                  : recentErrors >= 3
                    ? "Errors"
                    : health.lastAnswerAt
                      ? "Live"
                      : "No questions yet"}
              </span>
              {health.paused ? <Badge tone="medium">Kill switch on</Badge> : null}
            </div>
            <p className="mt-1 text-sm text-neutral-600">
              Last answer {ago(health.lastAnswerAt)}
              {lastAnswerMins !== null && lastAnswerMins > 60
                ? " (quiet is normal when nobody is asking)"
                : ""}{" "}
              · {recentErrors} error(s) in 24 h · Model{" "}
              <code className="text-xs">{health.model.replace("global.anthropic.", "")}</code> ·
              Prompt <code className="text-xs">{health.promptHash ?? "—"}</code>
            </p>
            <p className="mt-0.5 text-sm text-neutral-600">
              Spent today (IST): <strong>{usd(health.spentTodayUsd)}</strong> of{" "}
              {usd(health.capUsd)} cap
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <form action={setPaused} className="flex items-center gap-2">
              <input type="hidden" name="paused" value={health.paused ? "off" : "on"} />
              <button
                type="submit"
                className={`border px-3 py-2 text-sm font-bold ${health.paused ? "border-green-700 bg-green-700 text-white" : "border-red-700 bg-white text-red-700 hover:bg-red-50"}`}
              >
                {health.paused ? "Resume bot" : "Pause bot"}
              </button>
            </form>
            <form action={setCap} className="flex items-end gap-2">
              <label className="text-xs text-neutral-600">
                Daily cap (USD)
                <input
                  name="dailyCapUsd"
                  type="number"
                  min={0}
                  max={500}
                  step="0.5"
                  defaultValue={health.capUsd}
                  className="mt-1 block w-24 border border-neutral-300 bg-white px-2 py-1.5 text-sm"
                />
              </label>
              <button
                type="submit"
                className="border border-neutral-300 bg-white px-3 py-2 text-sm font-semibold hover:bg-neutral-50"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <Panel
        title={`Alerts (${alerts.length})`}
        note="Computed from the last 24 hours; each clears itself when the condition stops."
      >
        {alerts.length ? (
          <ul className="divide-y divide-neutral-100">
            {alerts.map((a, i) => (
              <li key={i} className="flex items-start gap-3 py-2">
                <Badge tone={a.severity}>{a.severity}</Badge>
                <div className="text-sm">
                  <span className="font-semibold text-neutral-900">{a.title}</span>{" "}
                  <span className="text-neutral-600">— {a.detail}</span>
                  {a.href ? (
                    <Link href={a.href} className="ml-2 text-xs font-semibold text-brand-700">
                      Open →
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-neutral-500">All clear.</p>
        )}
      </Panel>

      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-neutral-900">Performance</h2>
        <RangeSwitch value={range} options={["24h", "7d", "30d"]} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard
          label="Questions"
          value={s.questions}
          sub={`${s.conversations} chats · ${s.blocked} blocked`}
          accent
        />
        <StatCard
          label="Answered"
          value={pct(s.answeredPct)}
          sub={`of ${s.judged} judged by the analyzer`}
        />
        <StatCard label="Failed" value={pct(s.failedPct)} sub={`${s.errors} bot errors`} />
        <StatCard label="Needs review" value={reviewCount} sub="answers on the review list" />
        <StatCard
          label="Helpful"
          value={`👍 ${s.thumbsUp} · 👎 ${s.thumbsDown}`}
          sub="visitor ratings"
        />
        <StatCard
          label="Cost"
          value={usd(s.botCost + s.analyzerCost)}
          sub={`analyzer ${usd(s.analyzerCost)}`}
        />
        <StatCard
          label="Speed (median)"
          value={secs(s.medianMs)}
          sub={`slowest 5%: ${secs(s.p95Ms)}`}
        />
        <StatCard
          label="Cost per question"
          value={s.questions ? usd((s.botCost + s.analyzerCost) / s.questions) : "—"}
          sub="bot + analyzer"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Questions per day" note="IST days. Red = failed or errored.">
          <DayBars
            rows={s.perDay.map((d) => ({ day: d.day, value: d.questions, part: d.failed }))}
            totalLabel="Questions"
            partLabel="Failed"
          />
        </Panel>
        <Panel title="Cost per day" note="Bot answers + analyzer, USD.">
          <DayBars
            rows={s.perDay.map((d) => ({ day: d.day, value: d.cost }))}
            totalLabel="Cost"
            format={usd}
          />
        </Panel>
        <Panel title="How answers went" note="Analyzer verdict on each answer.">
          <HBars
            rows={Object.entries(s.outcomeCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([k, v]) => ({
                label: OUTCOME_LABELS[k] ?? k,
                value: v,
                sub: s.judged ? `${Math.round((100 * v) / s.judged)}%` : undefined,
              }))}
          />
        </Panel>
        <Panel title="What people ask" note="Top topics, with how many failed.">
          <HBars
            rows={s.topTopics.map((t) => ({
              label: t.topic,
              value: t.count,
              sub: t.failed ? `${t.failed} failed` : undefined,
            }))}
          />
        </Panel>
      </div>

      <Panel
        title="Audit log"
        note="Last 30 actions: chats opened, personal data revealed, reviews, controls."
      >
        {auditRows.length ? (
          <table className="w-full text-sm">
            <tbody className="divide-y divide-neutral-100">
              {auditRows.map((a) => (
                <tr key={a.id} className={a.action === "reveal_pii" ? "bg-amber-50" : ""}>
                  <td className="py-1.5 pr-3 text-xs text-neutral-500">{istTime(a.createdAt)}</td>
                  <td className="py-1.5 pr-3 text-xs">{a.user}</td>
                  <td className="py-1.5 pr-3 text-xs font-semibold">
                    {a.action.replace("_", " ")}
                  </td>
                  <td className="py-1.5 font-mono text-xs text-neutral-600">{a.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-neutral-500">Nothing yet.</p>
        )}
      </Panel>
    </div>
  );
}

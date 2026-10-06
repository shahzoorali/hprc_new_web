// Building blocks for the /admin/bot dashboard: tab bar, range switch, small
// server-rendered bar charts and badges. Plain HTML + Tailwind, no chart lib.
import Link from "next/link";

export const usd = (n: number) => (n < 0.01 && n > 0 ? `$${n.toFixed(4)}` : `$${n.toFixed(2)}`);
export const pct = (n: number | null) => (n === null ? "—" : `${Math.round(n)}%`);
export const secs = (ms: number | null) => (ms === null ? "—" : `${(ms / 1000).toFixed(1)} s`);

export function istTime(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function minutesSince(iso: string | null): number | null {
  return iso ? (Date.now() - new Date(iso).getTime()) / 60000 : null;
}

export function ago(iso: string | null): string {
  if (!iso) return "never";
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  return hrs < 48 ? `${hrs} h ago` : `${Math.round(hrs / 24)} days ago`;
}

const TABS = [
  { href: "/admin/bot", label: "Overview" },
  { href: "/admin/bot/review", label: "Needs review" },
  { href: "/admin/bot/conversations", label: "Conversations" },
];

export function BotTabs({ active }: { active: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-2xl font-bold text-neutral-900">Event help bot</h1>
      <p className="text-sm text-neutral-500">
        II Telangana State Equestrian Championship &amp; HPRC Show ·
        /events/telangana-state-championship-2026
      </p>
      <nav className="mt-4 flex gap-1 border-b border-neutral-200">
        {TABS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold hover:no-underline ${
              active === t.href
                ? "border-brand-600 text-brand-700"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function RangeSwitch({
  value,
  options,
  params = {},
}: {
  value: string;
  options: string[];
  params?: Record<string, string>;
}) {
  return (
    <div className="inline-flex border border-neutral-200 bg-white">
      {options.map((o) => {
        const qs = new URLSearchParams({ ...params, range: o }).toString();
        return (
          <Link
            key={o}
            href={`?${qs}`}
            className={`px-3 py-1.5 text-xs font-semibold hover:no-underline ${o === value ? "bg-brand-600 text-white" : "text-neutral-600 hover:bg-neutral-50"}`}
          >
            {o}
          </Link>
        );
      })}
    </div>
  );
}

export function Panel({
  title,
  children,
  note,
}: {
  title: string;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <section className="border border-neutral-200 bg-white p-5">
      <h2 className="font-display text-base font-bold text-neutral-900">{title}</h2>
      {note ? <p className="mt-0.5 text-xs text-neutral-500">{note}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

// Vertical bars per day. `part` (optional) is drawn as the bottom segment in red
// with a 2px gap above it — used for "failed of total".
export function DayBars({
  rows,
  format = (n: number) => String(n),
  partLabel,
  totalLabel,
}: {
  rows: { day: string; value: number; part?: number }[];
  format?: (n: number) => string;
  partLabel?: string;
  totalLabel: string;
}) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  const peak = rows.reduce(
    (best, r) => (r.value > best.value ? r : best),
    rows[0] ?? { day: "", value: 0 },
  );
  return (
    <div>
      {partLabel ? (
        <div className="mb-2 flex gap-4 text-xs text-neutral-600">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-brand-500" />
            {totalLabel}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-red-600" />
            {partLabel}
          </span>
        </div>
      ) : null}
      <div className="flex h-40 items-end gap-[2px] border-b border-neutral-200">
        {rows.map((r) => {
          const h = (r.value / max) * 100;
          const ph = r.part ? (r.part / Math.max(r.value, 1)) * 100 : 0;
          return (
            <div
              key={r.day}
              className="group relative flex h-full flex-1 flex-col justify-end"
              title={`${r.day}: ${format(r.value)} ${totalLabel.toLowerCase()}${partLabel ? ` · ${r.part ?? 0} ${partLabel.toLowerCase()}` : ""}`}
            >
              <div className="flex flex-col overflow-hidden rounded-t" style={{ height: `${h}%` }}>
                <div className="flex-1 bg-brand-500 group-hover:bg-brand-600" />
                {ph > 0 ? (
                  <div className="mt-[2px] bg-red-600" style={{ height: `${ph}%` }} />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-neutral-400">
        <span>{rows[0]?.day.slice(5)}</span>
        {peak && peak.value > 0 ? (
          <span className="text-neutral-600">
            Peak {format(peak.value)} on {peak.day.slice(5)}
          </span>
        ) : (
          <span>No data yet</span>
        )}
        <span>{rows[rows.length - 1]?.day.slice(5)}</span>
      </div>
    </div>
  );
}

// Horizontal labelled bars (single hue; the label + number carry meaning).
export function HBars({
  rows,
  empty = "No data yet",
}: {
  rows: { label: string; value: number; sub?: string }[];
  empty?: string;
}) {
  if (!rows.length) return <p className="text-sm text-neutral-400">{empty}</p>;
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <ul className="space-y-2">
      {rows.map((r) => (
        <li key={r.label} title={`${r.label}: ${r.value}${r.sub ? ` (${r.sub})` : ""}`}>
          <div className="flex justify-between gap-3 text-xs">
            <span className="truncate text-neutral-700">{r.label}</span>
            <span className="shrink-0 tabular-nums text-neutral-900">
              {r.value}
              {r.sub ? <span className="ml-1 text-neutral-500">{r.sub}</span> : null}
            </span>
          </div>
          <div className="mt-1 h-2 bg-neutral-100">
            <div
              className="h-2 rounded-r bg-brand-500"
              style={{ width: `${(r.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

const SEVERITY_STYLE: Record<string, string> = {
  high: "bg-red-50 text-red-800 border-red-200",
  medium: "bg-amber-50 text-amber-800 border-amber-200",
  low: "bg-neutral-50 text-neutral-700 border-neutral-200",
};

export function Badge({
  children,
  tone = "low",
}: {
  children: React.ReactNode;
  tone?: "high" | "medium" | "low" | "good";
}) {
  const style =
    tone === "good" ? "bg-green-50 text-green-800 border-green-200" : SEVERITY_STYLE[tone];
  return (
    <span
      className={`inline-flex items-center border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${style}`}
    >
      {children}
    </span>
  );
}

export function severityTone(sev: number): "high" | "medium" | "low" {
  return sev >= 3 ? "high" : sev >= 2 ? "medium" : "low";
}

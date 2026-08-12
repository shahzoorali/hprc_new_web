import Link from "next/link";

import { StatCard } from "@/components/admin/stat-card";
import { EventStats, getStablingSnapshot, getStats } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function EventSummary({ title, href, stats }: { title: string; href: string; stats: EventStats }) {
  return (
    <section className="border border-neutral-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-neutral-900">{title}</h2>
        <Link href={href} className="text-sm font-semibold text-brand-700 hover:text-brand-800">
          View registrations →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Registrations" value={stats.total} />
        <StatCard label="Confirmed" value={stats.success} accent />
        <StatCard label="Pending / Failed" value={stats.pending + stats.failed} />
        <StatCard label="Revenue" value={INR.format(stats.revenue)} accent />
        <StatCard label="Stable requests" value={stats.stablesBooked} />
      </div>
    </section>
  );
}

function relativeTime(iso: string | null): string {
  if (!iso) return "never";
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  return `${days}d ago`;
}

export default async function AdminOverviewPage() {
  const [stats, stabling] = await Promise.all([getStats("all"), getStablingSnapshot()]);

  const empty: EventStats = {
    total: 0,
    success: 0,
    failed: 0,
    pending: 0,
    revenue: 0,
    stablesBooked: 0,
    entries: 0,
  };

  const nqStables = stats.nq?.stablesBooked ?? 0;
  const ecStables = stats.ec?.stablesBooked ?? 0;
  const expectedStablesBooked = nqStables + ecStables;
  const ledgerMismatch = stabling !== null && stabling.totalStablesBooked !== expectedStablesBooked;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-neutral-900">Overview</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Registrations and payments across the two open events.
        </p>
      </div>

      {stabling === null ? (
        <section className="border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
          <strong>Stabling ledger unreachable.</strong> The overview couldn&apos;t load the shared
          camp inventory — availability figures below may be missing or wrong until this recovers.
        </section>
      ) : ledgerMismatch ? (
        <section className="border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
          <strong>Stabling ledger out of sync.</strong> Registrations show {expectedStablesBooked}{" "}
          stable box(es) requested ({nqStables} NQ + {ecStables} EC), but the shared camp ledger has{" "}
          {stabling.totalStablesBooked}. Availability below may be inaccurate — rebuild the ledger
          from the database.
        </section>
      ) : null}

      <EventSummary title="National Qualifier 2026" href="/admin/nq" stats={stats.nq ?? empty} />
      <EventSummary
        title="Equestrian Challenge — August"
        href="/admin/ec"
        stats={stats.ec ?? empty}
      />

      {stabling ? (
        <section className="border border-neutral-200 bg-white p-5">
          <div className="mb-1 flex items-baseline justify-between">
            <h2 className="font-display text-lg font-bold text-neutral-900">
              Stabling availability (shared camp)
            </h2>
            <span className="text-xs text-neutral-500">
              Capacity {stabling.permanentCapacity}/day · min available{" "}
              <strong className="text-neutral-800">{stabling.minAvailable}</strong>
            </span>
          </div>
          <p className="mb-3 text-xs text-neutral-400">
            Boxes occupied per day across both events (one shared {stabling.permanentCapacity}-box
            camp) · ledger updated {relativeTime(stabling.lastUpdated)}
            {stabling.lastRebuiltFromDB ? ` · last rebuilt from DB ${relativeTime(stabling.lastRebuiltFromDB)}` : ""}
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(stabling.dailyAvailability).map(([date, avail]) => {
              const pct = stabling.permanentCapacity > 0 ? avail / stabling.permanentCapacity : 0;
              const tone =
                avail === 0
                  ? "border-brand-200 bg-brand-50 text-brand-800"
                  : pct <= 0.2
                    ? "border-gold-200 bg-gold-100 text-gold-500"
                    : "border-neutral-200 bg-neutral-50 text-neutral-700";
              return (
                <div key={date} className={`border px-3 py-2 text-center ${tone}`}>
                  <div className="text-[11px] font-medium">{date.slice(5)}</div>
                  <div className="font-display text-base font-bold">{avail}</div>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}

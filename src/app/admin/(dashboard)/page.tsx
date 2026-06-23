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
        <StatCard label="Stables booked" value={stats.stablesBooked} />
      </div>
    </section>
  );
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-neutral-900">Overview</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Registrations and payments across the two open events.
        </p>
      </div>

      <EventSummary title="National Qualifier 2026" href="/admin/nq" stats={stats.nq ?? empty} />
      <EventSummary
        title="Equestrian Challenge — August"
        href="/admin/ec"
        stats={stats.ec ?? empty}
      />

      {stabling ? (
        <section className="border border-neutral-200 bg-white p-5">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-display text-lg font-bold text-neutral-900">
              Stabling availability (shared camp)
            </h2>
            <span className="text-xs text-neutral-500">
              Capacity {stabling.permanentCapacity}/day · min available{" "}
              <strong className="text-neutral-800">{stabling.minAvailable}</strong>
            </span>
          </div>
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

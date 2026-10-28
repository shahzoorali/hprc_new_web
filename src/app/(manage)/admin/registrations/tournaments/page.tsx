import Link from "next/link";

import { StatCard } from "@/components/admin/stat-card";
import { getTournaments } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default async function TournamentsIndexPage() {
  const tournaments = await getTournaments();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-neutral-900">Club tournaments</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Members-only tournaments held every few months. Each edition has its own entries.
        </p>
      </div>

      {tournaments.length === 0 ? (
        <p className="text-sm text-neutral-400">No tournaments configured.</p>
      ) : (
        [...tournaments].reverse().map((t) => (
          <section key={t.slug} className="border border-neutral-200 bg-white p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-display text-lg font-bold text-neutral-900">
                  {t.name} — {t.label}
                </h2>
                <p className="text-xs text-neutral-500">
                  {t.dates} · ₹{t.fee.toLocaleString("en-IN")} per player
                </p>
              </div>
              <Link
                href={`/admin/registrations/tournaments/${t.slug}`}
                className="text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                View entries →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard label="Entries" value={t.total} />
              <StatCard label="Confirmed" value={t.success} accent />
              <StatCard label="Pending / Failed" value={t.pending + t.failed} />
              <StatCard label="Revenue" value={INR.format(t.revenue)} accent />
            </div>
          </section>
        ))
      )}
    </div>
  );
}

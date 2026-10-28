import Link from "next/link";
import { notFound } from "next/navigation";

import { FilterBar } from "@/components/admin/filter-bar";
import { StatusPill } from "@/components/admin/status-pill";
import { clubTournamentTitle, getClubTournament } from "@/content/club-tournaments";
import { getTournamentEntries } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function formatDate(iso: string) {
  const d = new Date(iso.replace(" ", "T"));
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function TournamentEntriesPage({
  params,
  searchParams,
}: {
  params: Promise<{ tournament: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { tournament: slug } = await params;
  const tournament = getClubTournament(slug);
  if (!tournament) {
    notFound();
  }

  const sp = await searchParams;
  const str = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);

  const rows = await getTournamentEntries(slug, {
    status: str(sp.status),
    q: str(sp.q),
    from: str(sp.from),
    to: str(sp.to),
  });

  return (
    <div className="space-y-4">
      <Link
        href="/admin/registrations/tournaments"
        className="text-sm text-brand-700 hover:text-brand-800"
      >
        ← All club tournaments
      </Link>

      <div>
        <h1 className="font-display text-2xl font-bold text-neutral-900">
          {clubTournamentTitle(tournament)} — {tournament.edition}
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          {tournament.dateRange} · {rows.length} entr{rows.length === 1 ? "y" : "ies"}
        </p>
      </div>

      <FilterBar
        exportHref={`/api/admin/export?event=club&tournament=${slug}`}
        searchPlaceholder="Name, email, mobile, membership no."
      />

      <div className="overflow-x-auto border border-neutral-200 bg-white">
        <table className="min-w-full divide-y divide-neutral-100 text-sm">
          <thead className="bg-neutral-50 text-left text-[11px] uppercase tracking-wider text-neutral-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Player</th>
              <th className="px-4 py-3 font-semibold">Membership no.</th>
              <th className="px-4 py-3 font-semibold">Handicap / level</th>
              <th className="px-4 py-3 font-semibold">Amount</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-neutral-400">
                  No entries match these filters.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-neutral-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-neutral-900">{r.name || "—"}</div>
                    <div className="text-xs text-neutral-500">
                      {[r.mobile, r.email].filter(Boolean).join(" · ")}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-700">{r.membershipNo || "—"}</td>
                  <td className="px-4 py-3 text-neutral-700">{r.handicap || "—"}</td>
                  <td className="px-4 py-3 text-neutral-700">
                    {r.amount ? INR.format(Number(r.amount)) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={r.order_status} isSuccess={r.isSuccess} />
                  </td>
                  <td className="px-4 py-3 text-neutral-500">{formatDate(r.created_at)}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/registrations/tournaments/${slug}/${r.id}`}
                      className="font-semibold text-brand-700 hover:text-brand-800"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

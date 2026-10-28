import Link from "next/link";
import { notFound } from "next/navigation";

import { StatusPill } from "@/components/admin/status-pill";
import { getClubTournament } from "@/content/club-tournaments";
import { getTournamentEntry } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

function str(v: unknown): string {
  return v === null || v === undefined || v === "" ? "—" : String(v);
}

function Field({ label, value }: { label: string; value: unknown }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-neutral-800">{str(value)}</dd>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-neutral-200 bg-white p-5">
      <h2 className="mb-4 font-display text-base font-bold text-neutral-900">{title}</h2>
      {children}
    </section>
  );
}

export default async function TournamentEntryPage({
  params,
}: {
  params: Promise<{ tournament: string; id: string }>;
}) {
  const { tournament: slug, id } = await params;
  const tournament = getClubTournament(slug);
  const numId = Number(id);
  if (!tournament || !Number.isInteger(numId) || numId <= 0) {
    notFound();
  }

  let rec;
  try {
    rec = await getTournamentEntry(numId);
  } catch {
    notFound();
  }
  // The id must belong to the edition in the URL.
  if (rec.tournament !== slug) {
    notFound();
  }

  const photoUrl = rec.photoPath
    ? `/api/admin/document?event=club&dir=photos&file=${encodeURIComponent(rec.photoPath)}`
    : null;

  return (
    <div className="space-y-5">
      <Link
        href={`/admin/registrations/tournaments/${slug}`}
        className="text-sm text-brand-700 hover:text-brand-800"
      >
        ← {tournament.name} — {tournament.edition}
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">{str(rec.name)}</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Entry #{rec.id} · {str(rec.created_at)}
          </p>
        </div>
        <StatusPill status={rec.order_status as string | null} isSuccess={rec.isSuccess} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Player">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
            <Field label="Name" value={rec.name} />
            <Field label="Mobile" value={rec.mobile} />
            <Field label="Email" value={rec.email} />
            <Field label="Membership no." value={rec.membershipNo} />
            <Field label="Handicap / level" value={rec.handicap} />
          </dl>
        </Card>

        <Card title="Payment">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
            <Field
              label="Amount"
              value={rec.amount ? `₹${rec.amount} ${str(rec.currency)}` : "—"}
            />
            <Field label="Status" value={rec.order_status} />
            <Field label="Tracking ID" value={rec.tracking_id} />
            <Field label="Bank ref no" value={rec.bank_ref_no} />
            <Field label="Payment mode" value={rec.payment_mode} />
            <Field label="Transaction date" value={rec.trans_date} />
            <div className="col-span-2">
              <Field label="Status message" value={rec.status_message} />
            </div>
          </dl>
        </Card>
      </div>

      <Card title="Player photo">
        {photoUrl ? (
          <div className="space-y-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl}
              alt={`${str(rec.name)} photo`}
              className="max-h-[480px] border border-neutral-200"
            />
            <a
              href={photoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Open / download
            </a>
          </div>
        ) : (
          <p className="text-sm text-neutral-400">No photo uploaded.</p>
        )}
      </Card>
    </div>
  );
}

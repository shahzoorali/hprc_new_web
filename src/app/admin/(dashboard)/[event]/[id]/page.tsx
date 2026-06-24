import Link from "next/link";
import { notFound } from "next/navigation";

import { StatusPill } from "@/components/admin/status-pill";
import { EventKey, getRegistration } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

const EVENT_TITLES: Record<EventKey, string> = {
  nq: "National Qualifier 2026",
  ec: "Equestrian Challenge — August",
};

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

export default async function RegistrationDetailPage({
  params,
}: {
  params: Promise<{ event: string; id: string }>;
}) {
  const { event, id } = await params;
  if (event !== "nq" && event !== "ec") {
    notFound();
  }
  const eventKey = event as EventKey;
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId <= 0) {
    notFound();
  }

  let rec;
  try {
    rec = await getRegistration(eventKey, numId);
  } catch {
    notFound();
  }

  const isNq = eventKey === "nq";
  const documents = [rec.documentPath, rec.documentPath2]
    .filter((p): p is string => typeof p === "string" && p.length > 0)
    .map((path, i) => ({
      label: `Document ${i + 1}`,
      url: `/admin/api/document?event=${eventKey}&file=${encodeURIComponent(path)}`,
      isPdf: path.toLowerCase().endsWith(".pdf"),
    }));

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href={`/admin/${eventKey}`} className="text-sm text-brand-700 hover:text-brand-800">
          ← {EVENT_TITLES[eventKey]}
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">{str(rec.name)}</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Registration #{rec.id} · {str(rec.created_at)}
          </p>
        </div>
        <StatusPill status={rec.order_status as string | null} isSuccess={rec.isSuccess} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Rider">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
            <Field label="Name" value={rec.name} />
            <Field label="Parent / Guardian" value={rec.parentName} />
            <Field label="Date of birth" value={rec.dob} />
            <Field label="Mobile" value={rec.mobile} />
            <Field label="Email" value={rec.email} />
            <Field label="Club" value={rec.clubName} />
            {isNq ? <Field label="EFI Rider ID" value={rec.efiRiderId} /> : null}
            {isNq ? <Field label="Indian national" value={rec.isIndian} /> : null}
            <Field label="Emergency contact" value={rec.emergencyContact} />
            <Field label="Emergency relation" value={rec.emergencyRelation} />
            <div className="col-span-2">
              <Field label="Address" value={rec.address} />
            </div>
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

        <Card title="Entries">
          {rec.entries.length === 0 ? (
            <p className="text-sm text-neutral-400">No events selected.</p>
          ) : (
            <ul className="space-y-3">
              {rec.entries.map((e) => (
                <li key={e.id} className="border-l-2 border-brand-200 pl-3">
                  <div className="text-sm font-semibold text-neutral-900">{e.event}</div>
                  {e.horses.length > 0 ? (
                    <ul className="mt-1 space-y-0.5 text-sm text-neutral-600">
                      {e.horses.map((h, i) => (
                        <li key={i}>
                          {h}
                          {isNq && e.efi[i] ? (
                            <span className="text-neutral-400"> · EFI {e.efi[i]}</span>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="mt-1 text-sm text-neutral-400">No horse listed</div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Stabling">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
            <Field label="Type" value={rec.stablingType} />
            <Field label="Count" value={rec.stablingCount} />
            <Field label="From" value={rec.stablingFrom} />
            <Field label="To" value={rec.stablingTo} />
          </dl>
        </Card>
      </div>

      <Card title="Age / nationality document">
        {documents.length > 0 ? (
          <div className="space-y-6">
            {documents.map((doc) => (
              <div key={doc.url} className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  {doc.label}
                </p>
                {doc.isPdf ? (
                  <iframe src={doc.url} className="h-[600px] w-full border border-neutral-200" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={doc.url}
                    alt={doc.label}
                    className="max-h-[600px] border border-neutral-200"
                  />
                )}
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Open / download
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-400">No document uploaded.</p>
        )}
      </Card>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

const NEWSLETTER_URL = "/newsletters/hoofbeats-vol-03-october-2026.html";

export const metadata: Metadata = {
  title: "HOOFBEATS Vol-03 — October 2026 | HPRC Newsletters",
  description:
    "The 2nd Telangana State Equestrian Championship, National Qualifier II and the HPRC International Polo Tour (Madrid and Kentucky), 14-18 October 2026 - the full Vol-03 edition of Hoofbeats, the official events periodical of the Hyderabad Polo & Riding Club.",
};

export default function HoofbeatsVol03Page() {
  return (
    <div className="space-y-8 pb-16">
      <div className="container pt-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/events" className="hover:text-brand-700">
            Events
          </Link>
          <span className="mx-2">/</span>
          <Link href="/events/newsletters" className="hover:text-brand-700">
            Newsletters
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Hoofbeats Vol-03</span>
        </nav>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
              Vol-03 · October 2026
            </p>
            <h1 className="mt-2 text-3xl font-bold text-brand-900 sm:text-4xl">
              HOOFBEATS — The State Title, Kept at Home
            </h1>
            <p className="mt-3 max-w-3xl text-gray-600">
              Two events, one arena, and a tour of two continents. The full account of the 2nd
              Telangana State Equestrian Championship (16-18 October, 16 classes, presented by
              Phoenix Group), National Qualifier II (14-16 October) and the HPRC International
              Polo Tour to Madrid and Kentucky.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={NEWSLETTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span>Open full screen</span>
            </a>
            <Link
              href="/events/newsletters"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to archive</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Reader */}
      <div className="container">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
          <div className="overflow-x-auto">
            <iframe
              src={NEWSLETTER_URL}
              title="HOOFBEATS Vol-03, October 2026"
              className="h-[85vh] min-h-[640px] w-full min-w-[820px] border-0 bg-gray-100"
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Best read on a larger screen. On a phone, tap{" "}
          <span className="font-semibold">Open full screen</span> above to read the edition on its
          own page.
        </p>
      </div>
    </div>
  );
}

import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { ResultsBoard } from "@/components/results/results-board";
import { nqResults } from "@/content/results-nq";

export const metadata = {
  title: "Results — National Qualifier (NQ) 2026 | Hyderabad Polo & Riding Club",
  description:
    "Official results of the National Qualifier (NQ) 2026, held 12–14 August 2026 at the Hyderabad Polo & Riding Club. Dressage and Show Jumping across Children, Junior and Young Rider categories.",
};

const riders = new Set(nqResults.flatMap((c) => c.entries.map((e) => e.rider)));
const clubs = new Set(
  nqResults.flatMap((c) => c.entries.map((e) => e.club).filter(Boolean) as string[]),
);
const placings = nqResults.reduce((n, c) => n + c.entries.length, 0);

const stats = [
  { value: String(nqResults.length), label: "Classes" },
  { value: String(placings), label: "Results" },
  { value: String(riders.size), label: "Riders" },
  { value: String(clubs.size), label: "Clubs" },
];

export default function NQ2026ResultsPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <div className="container pt-12">
        <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 p-8 shadow-[0_40px_80px_-20px_rgba(227,30,36,0.3)] md:p-16">
          <div className="space-y-4 text-center">
            <span className="inline-block rounded-full bg-brand-800/60 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-brand-200">
              Official Results · 12–14 August 2026
            </span>
            <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              National Qualifier (NQ) 2026
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-white/90 md:text-xl">
              Dressage and Show Jumping · Children, Junior and Young Rider categories
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/10 px-4 py-5 text-center backdrop-blur">
                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                <p className="mt-1 text-sm text-brand-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="container">
        <div className="rounded-[2.5rem] border-2 border-brand-100/70 bg-gradient-to-br from-brand-50/80 via-white to-brand-50/60 p-8 shadow-xl md:p-12">
          <SectionHeading
            eyebrow="12–14 August 2026 · Gandipet, Moinabad"
            title="Official Competition Results"
            description="The Hyderabad Polo & Riding Club, in association with the Telangana State Equestrian Association, is proud to announce the official results of the National Qualifier (NQ) 2026."
            align="center"
          />
          <div className="mx-auto mt-6 max-w-3xl space-y-3 text-center text-gray-700">
            <p>
              Results are listed as scored, not ranked. Dressage classes show the average judges&apos; score — a
              higher percentage reflects a stronger round. Show Jumping classes show total penalties, where a lower
              figure reflects a cleaner round.
            </p>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="container">
        <ResultsBoard classes={nqResults} showPhotos={false} showRanking={false} />
      </section>

      {/* Closing */}
      <section className="container">
        <div className="space-y-4 rounded-[2rem] bg-brand-900 p-8 text-center md:p-12">
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/90">
            HPRC congratulates every rider who qualified and competed. The National Qualifier remains a key step on
            the pathway to national-level equestrian competition in India.
          </p>
          <div className="space-y-1 pt-4">
            <p className="font-semibold text-brand-200">Hyderabad Polo &amp; Riding Club</p>
            <p className="text-sm text-white/70">+91 9177000056 · info@hprc.co.in</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link
              href="/events/nq-2026"
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-400"
            >
              ← Event page
            </Link>
            <Link
              href="/events/news/ec-aug-2026-results"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20"
            >
              Equestrian Challenge results →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

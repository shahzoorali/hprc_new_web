import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { ResultsBoard } from "@/components/results/results-board";
import { ecAugResults } from "@/content/results-ec";

export const metadata = {
  title: "Results — 2nd HPRC Equestrian Challenge 2026 | Hyderabad Polo & Riding Club",
  description:
    "Official results of the 2nd HPRC Equestrian Challenge 2026, held 14–16 August 2026 at the Hyderabad Polo & Riding Club. Placings across Hacks, Dressage and Show Jumping.",
};

const riders = new Set(ecAugResults.flatMap((c) => c.entries.map((e) => e.rider)));
const clubs = new Set(
  ecAugResults.flatMap((c) => c.entries.map((e) => e.club).filter(Boolean) as string[]),
);
const placings = ecAugResults.reduce((n, c) => n + c.entries.length, 0);

const stats = [
  { value: String(ecAugResults.length), label: "Classes" },
  { value: String(placings), label: "Placings" },
  { value: String(riders.size), label: "Riders placed" },
  { value: String(clubs.size), label: "Clubs" },
];

export default function ECAug2026ResultsPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <div className="container pt-12">
        <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 p-8 shadow-[0_40px_80px_-20px_rgba(227,30,36,0.3)] md:p-16">
          <div className="space-y-4 text-center">
            <span className="inline-block rounded-full bg-brand-800/60 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-brand-200">
              Official Results · 14–16 August 2026
            </span>
            <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              2nd HPRC Equestrian Challenge 2026
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-white/90 md:text-xl">
              Complete placings across Hacks, Dressage and Show Jumping
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
            eyebrow="14–16 August 2026 · Gandipet, Moinabad"
            title="Official Competition Results"
            description="The Hyderabad Polo & Riding Club is proud to announce the official results of the 2nd HPRC Equestrian Challenge 2026, contested over three days across fourteen classes."
            align="center"
          />
          <p className="mx-auto mt-6 max-w-3xl text-center text-gray-700">
            Riders from {clubs.size} clubs and academies competed across Hacks, Dressage and Show Jumping,
            from 40 cm through to the two-phase 105–110 cm Open. HPRC congratulates every rider who took part.
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="container">
        <ResultsBoard classes={ecAugResults} />
      </section>

      {/* Closing */}
      <section className="container">
        <div className="space-y-4 rounded-[2rem] bg-brand-900 p-8 text-center md:p-12">
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/90">
            HPRC congratulates all winners and participants for their performances, dedication and sportsmanship.
            The club remains committed to promoting equestrian excellence and nurturing emerging riding talent in
            Hyderabad and across India.
          </p>
          <div className="space-y-1 pt-4">
            <p className="font-semibold text-brand-200">Hyderabad Polo &amp; Riding Club</p>
            <p className="text-sm text-white/70">+91 9177000056 · info@hprc.co.in</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link
              href="/events/2nd-equestrian-challenge-2026"
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-400"
            >
              ← Event page
            </Link>
            <Link
              href="/events/news/nq-2026-results"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20"
            >
              National Qualifier 2026 results →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

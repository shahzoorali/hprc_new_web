import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";

const LA_POLO_URL = "https://lapolo.in/blog/close-quarters-pure-fury-the-hyderabad-international-polo-cup/";

export const metadata = {
  title: "India wins both cups at Hyderabad International Polo Cup 2026 | HPRC News",
  description:
    "India claimed the Radha TMT (4-Goal) and Telangana Tourism (6-Goal) championships at the Hyderabad International Polo Cup 2026. Salim Azmi MVP in the 6-goal final.",
};

export default function HyderabadInternationalPoloCup2026IndiaWinsBothCupsPage() {
  return (
    <div className="space-y-16 pb-16">
      <div className="relative overflow-hidden">
        <div className="container pt-12">
          <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand-200/50 shadow-[0_40px_80px_-20px_rgba(227,30,36,0.3)]">
            <div className="absolute inset-0">
              <Image
                src="/images/india-team-trophy-2026.png"
                alt="Indian team with trophy at Hyderabad International Polo Cup 2026 – HPRC"
                fill
                className="object-cover object-center"
                quality={90}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-900/85 via-brand-800/80 to-brand-900/85" />
            </div>
            <div className="relative z-10 p-8 md:p-16 lg:p-20">
              <div className="space-y-6 text-center">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
                  India wins both cups at Hyderabad International Polo Cup 2026
                </h1>
                <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
                  Radha TMT (4-Goal) and Telangana Tourism (6-Goal) championships; Salim Azmi named
                  MVP in the 6-goal final
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-50/80 via-white to-brand-50/60 p-8 md:p-12 lg:p-16 border-2 border-brand-100/70 shadow-xl">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="19 February, 2026"
              title="Championship recap"
              description="The HPRC Polo event was split into the 4-goal Radha TMT and the 6-goal Telangana Tourism Cup. Four international teams competed in high-intensity indoor polo; India emerged champions in both tournaments."
              align="center"
            />
            <div className="prose prose-lg max-w-none mt-8 space-y-6">
              <p className="text-gray-700 leading-relaxed">
                India won the <strong>Radha TMT International Arena Polo Championship</strong> (4-goal)
                with a 21–14 victory over France in the final on 15 February, after league wins for
                France (8–7 vs USA) and India (15–5 vs Luxembourg).
              </p>
              <p className="text-gray-700 leading-relaxed">
                In the <strong>Telangana Tourism International Arena Polo Championship</strong> (6-goal),
                India defeated France 18–15 in the final on 18 February, with Salim Azmi named MVP.
                League matches saw India beat USA 12–3 and France beat Germany 10–2.
              </p>
              <p className="text-gray-700 leading-relaxed">
                For full results, schedule, and official coverage, visit the championship page or
                read the feature on LA POLO.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/events/world-arena-polo-championship-2026#results"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            View full results
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
          <a
            href={LA_POLO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-brand-600 text-brand-600 hover:bg-brand-50 px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Read on LA POLO
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
          <Link
            href="/events/news"
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to News
          </Link>
        </div>
      </section>
    </div>
  );
}

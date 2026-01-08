import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";

export default function HPRCSilverSpurSportsArenaPage() {
  return (
    <div className="space-y-16 pb-16">
      <div className="relative overflow-hidden">
        <div className="container pt-12">
          <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand-200/50 shadow-[0_40px_80px_-20px_rgba(227,30,36,0.3)]">
            <div className="absolute inset-0">
              <Image
                src="/documents/news/news01.jpeg"
                alt="HPRC to launch all inclusive Silver Spur Sports Arena"
                fill
                className="object-cover"
                quality={90}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-900/85 via-brand-800/80 to-brand-900/85"></div>
            </div>
            <div className="relative z-10 p-8 md:p-16 lg:p-20">
              <div className="space-y-6 text-center">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
                  HPRC to launch all inclusive Silver Spur Sports Arena
                </h1>
                <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
                  Expanding world-class sports facilities
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
              eyebrow="Facilities Expansion"
              title="HPRC to launch all inclusive Silver Spur Sports Arena"
              description="Hyderabad Polo & Riding Club announces the launch of the all-inclusive Silver Spur Sports Arena, expanding its world-class sports facilities."
              align="center"
            />
            <div className="prose prose-lg max-w-none mt-8">
              <p className="text-gray-700 leading-relaxed">
                Hyderabad Polo & Riding Club is proud to announce the launch of the all-inclusive Silver Spur 
                Sports Arena. This new facility represents a significant expansion of HPRC's world-class 
                sports infrastructure.
              </p>
              <p className="text-gray-700 leading-relaxed mt-6">
                The Silver Spur Sports Arena will provide comprehensive sports facilities and amenities, 
                further enhancing HPRC's position as a premier destination for sports and recreation in Hyderabad.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="text-center">
          <Link
            href="/events/news"
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to News</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

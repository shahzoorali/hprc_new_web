"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ImageLightbox } from "@/components/ui/image-lightbox";
import { SectionHeading } from "@/components/ui/section-heading";

export default function ChampionshipWeekend4GoalGallopingWheelsPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const featuredImage = {
    src: "/documents/news/galloping-wheels-2026/championship-weekend-chukker.png",
    alt: "CHUKKER magazine cover and dignitaries – preparations underway for World Arena Polo Championship 2026 at Hyderabad Polo & Riding Club",
  };

  return (
    <>
      <div className="space-y-16 pb-16">
        <div className="relative overflow-hidden">
          <div className="container pt-12">
            <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand-200/50 shadow-[0_40px_80px_-20px_rgba(227,30,36,0.3)]">
              <div className="absolute inset-0">
                <Image
                  src={featuredImage.src}
                  alt={featuredImage.alt}
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
                    Championship Weekend to Feature 4-Goal Final and &ldquo;Galloping Wheels&rdquo;
                    Showcase
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
                    Hon&apos;ble Minister Ponnam Prabhakar invited as Guest of Honour for 4-goal final
                    on 15 February; Vintage & Super Cars display to add heritage flair
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
                eyebrow="31 January, 2026"
                title="4-Goal Final & Galloping Wheels"
                description="As a special highlight of the championship weekend, HPRC has invited Ponnam Prabhakar, Hon'ble Minister for Transport & BC Welfare, Government of Telangana, as Guest of Honour for the 4-goal final, alongside the Galloping Wheels Vintage & Super Cars Display."
                align="center"
              />
              <div className="prose prose-lg max-w-none mt-8 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  As a special highlight of the championship weekend, the Hyderabad Polo & Riding
                  Club (HPRC) has invited Ponnam Prabhakar, Hon&apos;ble Minister for Transport & BC
                  Welfare, Government of Telangana, to attend as Guest of Honour for the 4-goal final
                  scheduled on Sunday, 15 February 2026.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The occasion will also feature the &ldquo;Galloping Wheels&rdquo; Vintage & Super Cars
                  Display, adding a distinctive lifestyle and heritage element to the event. The
                  Hon&apos;ble Minister has been requested to present awards to participating automobile
                  owners and to perform the ceremonial throw-in for the final match.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This segment of the championship weekend is designed to celebrate the shared
                  spirit of sport, heritage, and automotive excellence, further enhancing the
                  spectator experience at the International Arena Polo Championship 2026.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured image in article */}
        <section className="container">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Championship preparations</h2>
          <div
            className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden group cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          >
            <Image
              src={featuredImage.src}
              alt={featuredImage.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="rounded-full bg-white/20 backdrop-blur-sm p-3">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className="container">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/events/world-arena-polo-championship-2026"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Championship 2026 Details
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
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

      <ImageLightbox
        images={[featuredImage]}
        initialIndex={0}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}

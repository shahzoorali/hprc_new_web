import DE from "country-flag-icons/react/3x2/DE";
import FR from "country-flag-icons/react/3x2/FR";
import IN from "country-flag-icons/react/3x2/IN";
import LU from "country-flag-icons/react/3x2/LU";
import US from "country-flag-icons/react/3x2/US";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { CountryBadge } from "@/components/ui/country-badge";
import { HeroVideo } from "@/components/ui/hero-video";
import { eventsContent } from "@/content/events";
import { getNewsArticles } from "@/lib/news";
import { homeContent } from "@/content/home";
import { worldArenaPoloChampionship2026 } from "@/content/world-arena-polo-championship-2026";

const countryFlagComponents: Record<
  string,
  React.ComponentType<{ className?: string; title?: string }>
> = {
  USA: US,
  IND: IN,
  GER: DE,
  FRA: FR,
  LUX: LU,
};

export default async function HomePage() {
  const newsArticles = await getNewsArticles(3);
  const heroSlide = homeContent.heroSlides[0];
  const featuredEvent = worldArenaPoloChampionship2026;

  return (
    <div className="min-h-screen">
      {/* Elegant Hero Section with Video */}
      <HeroVideo
        videoUrl={heroSlide.video || ""}
        fallbackImage={heroSlide.image}
        imageAlt={heroSlide.imageAlt}
      />

      {/* August 2026 Results — NQ & EC */}
      <section className="relative overflow-hidden bg-white">
        <div className="container relative z-10 py-12 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* National Qualifier 2026 */}
            <div className="relative group overflow-hidden rounded-[2.5rem] bg-neutral-900 shadow-2xl">
              <div className="absolute inset-0">
                <Image
                  src="/images/ec2026/aamir-shahnawaz-1.jpg"
                  alt="Dressage at the National Qualifier 2026"
                  fill
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-neutral-900/20"></div>
              </div>

              <div className="relative z-10 space-y-6 p-8 sm:p-12">
                <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-5 py-2.5 backdrop-blur-md">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300 font-display">
                    Results Announced
                  </span>
                </div>

                <div className="space-y-3">
                  <p className="text-lg font-medium text-brand-400 font-display italic tracking-wide">
                    12 – 14 August 2026 · HPRC, Gandipet
                  </p>
                  <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05] text-white font-display tracking-tight">
                    National <br /> Qualifier <span className="text-brand-300">2026</span>
                  </h2>
                  <p className="max-w-md text-base text-white/70 leading-relaxed font-light font-body">
                    Dressage and Show Jumping placings across Children, Junior and Young Rider categories.
                  </p>
                </div>

                <Link
                  href="/events/news/nq-2026-results"
                  className="group/btn inline-flex items-center justify-center gap-3 rounded-2xl bg-brand-500 px-8 py-4 text-base font-bold text-white shadow-2xl transition-all duration-300 hover:bg-brand-600 hover:-translate-y-1 font-display"
                >
                  <span>View Results</span>
                  <svg className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* HPRC Equestrian Challenge 2026 */}
            <div className="relative group overflow-hidden rounded-[2.5rem] bg-neutral-900 shadow-2xl">
              <div className="absolute inset-0">
                <Image
                  src="/images/ec2026/action-1.jpg"
                  alt="Show Jumping action at the HPRC Equestrian Challenge 2026"
                  fill
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-neutral-900/20"></div>
              </div>

              <div className="relative z-10 space-y-6 p-8 sm:p-12">
                <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-5 py-2.5 backdrop-blur-md">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300 font-display">
                    Results Announced
                  </span>
                </div>

                <div className="space-y-3">
                  <p className="text-lg font-medium text-brand-400 font-display italic tracking-wide">
                    14 – 16 August 2026 · HPRC, Gandipet
                  </p>
                  <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05] text-white font-display tracking-tight">
                    Equestrian <br /> <span className="text-brand-300">Challenge</span> 2026
                  </h2>
                  <p className="max-w-md text-base text-white/70 leading-relaxed font-light font-body">
                    Hacks, Dressage &amp; Show Jumping placings across fourteen classes at the 2nd edition.
                  </p>
                </div>

                <Link
                  href="/events/news/ec-aug-2026-results"
                  className="group/btn inline-flex items-center justify-center gap-3 rounded-2xl bg-brand-500 px-8 py-4 text-base font-bold text-white shadow-2xl transition-all duration-300 hover:bg-brand-600 hover:-translate-y-1 font-display"
                >
                  <span>View Results</span>
                  <svg className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Award - Indian Polo Awards - Sophisticated Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-brand-900 to-neutral-900 py-16 sm:py-24 lg:py-32">
        {/* Subtle Background Image of the Award Ceremony */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/documents/news/arena-polo-club-of-the-season.jpg"
            alt="Award Ceremony Background"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-neutral-900/70 backdrop-blur-sm"></div>
        </div>

        {/* Sophisticated Decorative Elements */}
        <div className="absolute top-0 right-0 w-[20rem] h-[20rem] sm:w-[30rem] sm:h-[30rem] bg-brand-600/10 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[20rem] h-[20rem] sm:w-[30rem] sm:h-[30rem] bg-[#d97706]/10 blur-[100px]"></div>

        {/* Award Logo - centered */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center rounded-[1.5rem] bg-white/5 backdrop-blur-md border border-white/10 px-6 py-4 shadow-2xl">
          <Image
            src="/TIPA.png"
            alt="The Indian Polo Awards"
            width={120}
            height={80}
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </div>

        <div className="container relative z-10 pt-20 sm:pt-24">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            {/* Elegant Content Side */}
            <div className="text-white space-y-6 sm:space-y-10">
              {/* Sophisticated Badge */}
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-[#d97706]/15 backdrop-blur-md border border-[#d97706]/30 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full">
                <span className="h-1.5 sm:h-2 w-1.5 sm:w-2 bg-[#d97706] animate-pulse rounded-full shadow-[0_0_8px_#d97706]"></span>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#d97706] font-display">
                  Recent Achievement
                </span>
              </div>

              {/* Elegant Typography */}
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-[clamp(2rem,5vw,3.5rem)] sm:text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] font-display tracking-tight">
                  <span className="block text-white">Arena Polo Club</span>
                  <span className="block bg-gradient-to-r from-[#fbbf24] via-[#d97706] to-[#fbbf24] bg-clip-text text-transparent mt-1 sm:mt-2 pb-2">
                    Of The Season
                  </span>
                </h2>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full">
                    <span className="text-sm sm:text-base font-semibold text-white tracking-wide font-display">
                      Season V Winner
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full">
                    <span className="text-sm sm:text-base font-semibold text-white tracking-wide font-display">
                      The Indian Polo Awards
                    </span>
                  </div>
                </div>
              </div>

              {/* Elegant Description */}
              <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed font-light max-w-2xl font-body">
                A season defined by precision and poise. Hyderabad Polo &amp; Riding Club takes home the prestigious <strong>Arena Polo Club of the Season</strong> award, recognizing our world-class facilities, competitive spirit, and unparalleled hospitality in the sport.
              </p>

              {/* Elegant CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-4 sm:pt-6">
                <Link
                  href="/events/news"
                  className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-[#d97706] to-[#b45309] px-6 sm:px-9 py-3 sm:py-4 text-sm sm:text-base font-bold text-white shadow-2xl transition-all duration-300 hover:shadow-[0_10px_30px_-10px_#d97706] hover:-translate-y-1 font-display rounded-full border border-white/10"
                >
                  <span className="tracking-wide text-white">View News Coverage</span>
                  <svg
                    className="h-4 sm:h-5 w-4 sm:w-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="https://www.instagram.com/p/DWQf6T6COAc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-white/20 bg-white/5 backdrop-blur-md px-6 sm:px-9 py-3 sm:py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40 font-display rounded-full gap-2 hover:-translate-y-1"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  View on Instagram
                </a>
              </div>
            </div>

            {/* Sophisticated Image Side */}
            <div className="relative group mt-8 lg:mt-0">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 transition-all duration-700 group-hover:shadow-[0_35px_60px_-15px_rgba(217,119,6,0.25)]">
                <div className="aspect-[4/5] sm:aspect-square lg:aspect-[4/5] relative">
                  <Image
                    src="/documents/news/arena-polo-club-of-the-season.jpg"
                    alt="Arena Polo Club of the Season Award"
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/95 via-neutral-900/20 to-transparent"></div>
                </div>

                {/* Elegant Bottom Badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-gradient-to-r from-neutral-900/95 to-neutral-800/95 px-6 py-4 rounded-[1.5rem] border border-white/5 backdrop-blur-xl shadow-2xl">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d97706] mb-1 font-display">
                      Presented To
                    </p>
                    <p className="text-base sm:text-lg font-bold text-white font-display leading-tight">
                      Hyderabad Polo &amp; Riding Club
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#d97706]/20 blur-2xl -z-10 transition-opacity duration-500 group-hover:bg-[#d97706]/30"></div>
              <div className="absolute -top-10 -left-10 w-28 h-28 bg-white/10 blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section - Sophisticated Design */}
      <section
        className="bg-gradient-elegant py-16 sm:py-20 lg:py-28 lg:py-32"
        aria-labelledby="events-heading"
      >
        <div className="container">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2
              id="events-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-900 mb-4 sm:mb-6 leading-[1.15] font-display tracking-tight"
            >
              A Wide Range of Events
              <span className="block mt-1 sm:mt-2 text-brand-500">For Everyone</span>
            </h2>
            <div className="mx-auto flex items-center justify-center gap-3 sm:gap-4">
              <span className="h-px w-8 sm:w-12 bg-brand-300"></span>
              <span className="h-px w-8 sm:w-12 bg-brand-300"></span>
              <span className="h-px w-8 sm:w-12 bg-brand-500"></span>
            </div>
          </div>

          {/* Sophisticated Cards Layout */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 list-none p-0 m-0">
            {homeContent.events.map((event, index) => {
              // Use actual images from the project
              const eventImages = [
                "/documents/gallery/events/cross-country-2015/001.jpg", // Learn Riding - using cross-country training image
                "/documents/gallery/events/hprc-sport-complex/01.jpg", // Weekend Getaway - using facility image
                "/documents/gallery/chukkers/cha4.jpeg", // Banquet Hall - using Chukkers event space image
                "/documents/gallery/events/hprc-international-arena-polo-championship/001.jpeg", // Polo - using polo championship image
                "/documents/gallery/tennis/001.jpeg", // Sports Center - using sports facility image
                "/documents/gallery/chukkers/cha01.jpeg", // Restaurants - using Chukkers restaurant image
              ];

              const animationDelay = index * 0.15;

              return (
                <li
                  key={index}
                  className="opacity-0 animate-fade-in-up"
                  style={{
                    animationDelay: `${animationDelay}s`,
                  }}
                >
                  <Link
                    href={event.href}
                    className="group relative block overflow-hidden  shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-4"
                  >
                    {/* Elegant Image */}
                    <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
                      <Image
                        src={eventImages[index]}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Sophisticated Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/50 to-brand-900/20 transition-opacity duration-500 group-hover:from-brand-900/95"></div>
                    </div>

                    {/* Elegant Text Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7 text-white">
                      <div className="space-y-3 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                        <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight font-display tracking-tight">
                          {event.title}
                        </h4>
                        <div className="flex items-center gap-3 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-sm sm:text-base font-medium tracking-wide font-body">
                            Learn More
                          </span>
                          <div className="h-px w-8 bg-white/50"></div>
                          <svg
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Explore Section - Refined Design */}
      <section
        className="bg-white py-16 sm:py-20 lg:py-28 lg:py-32"
        aria-labelledby="explore-heading"
      >
        <div className="container">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-4xl mx-auto">
            <h2
              id="explore-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-900 mb-6 sm:mb-8 leading-[1.15] font-display tracking-tight"
            >
              Explore HPRC
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed font-light max-w-2xl mx-auto font-body">
              Discover a 10-acre equestrian estate where riders, athletes, and families come
              together for polo, riding programmes, sports, dining, and celebrations.
            </p>
          </div>
          <div className="mt-8 sm:mt-12 lg:mt-16 grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 md:grid-cols-2 lg:grid-cols-3">
            {homeContent.pillars.map((pillar, index) => {
              // Use actual images from the project
              const pillarImages = [
                "/documents/gallery/events/hprc-international-arena-polo-championship/001.jpeg", // Riding & Polo
                "/documents/gallery/tennis/001.jpeg", // Sports Centre
                "/documents/gallery/chukkers/cha01.jpeg", // Hospitality
              ];
              return (
                <Link
                  key={pillar.title}
                  href={pillar.href}
                  className="group relative overflow-hidden rounded-[2.5rem] bg-white shadow-xl border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-4"
                >
                  {/* Elegant Image */}
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <Image
                      src={pillarImages[index]}
                      alt={pillar.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute right-0 top-0 h-40 w-40 sm:h-48 sm:w-48  bg-gradient-to-br from-brand-500/20 to-brand-500/5 transition-all duration-700 group-hover:scale-150"></div>
                  </div>

                  {/* Elegant Content */}
                  <div className="p-5 sm:p-7 lg:p-9 bg-white relative">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-900 mb-3 sm:mb-4 leading-tight font-display tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg font-light mb-4 sm:mb-6 font-body">
                      {pillar.description}
                    </p>
                    <span className="inline-flex items-center text-xs sm:text-sm lg:text-base font-semibold text-brand-500 group-hover:text-brand-600 transition-colors duration-300 tracking-wide font-display">
                      Explore
                      <svg
                        className="ml-2 sm:ml-3 lg:ml-4 h-4 sm:h-5 lg:h-6 w-4 sm:w-5 lg:w-6 transition-transform duration-300 group-hover:translate-x-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* News Section - Refined Design */}
      {newsArticles.length > 0 && (
        <section
          className="bg-gradient-elegant py-16 sm:py-20 lg:py-28 lg:py-32"
          aria-labelledby="news-heading"
        >
          <div className="container">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-4xl mx-auto">
              <h2
                id="news-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-900 mb-6 sm:mb-8 leading-[1.15] font-display tracking-tight"
              >
                In The Press
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed font-light max-w-2xl mx-auto font-body">
                Latest news coverage and press releases about HPRC tournaments, achievements, and
                events
              </p>
            </div>
            <div className="mt-8 sm:mt-12 lg:mt-16 grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {newsArticles.map((article, index) => {
                const imageUrl =
                  article.imageUrl ||
                  "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80";
                return (
                  <article
                    key={index}
                    className="group relative overflow-hidden  bg-white shadow-xl border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                      {article.category && (
                        <div className="absolute top-5 left-5">
                          <span className="inline-flex items-center  bg-brand-500 px-4 py-2 text-[11px] font-bold text-white tracking-wide uppercase font-display shadow-lg">
                            {article.category}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-7 relative z-10">
                      <div className="flex items-center gap-2.5 text-xs text-gray-500 mb-3">
                        <time dateTime={article.date} className="font-medium font-body">
                          {article.date}
                        </time>
                        <span className="w-1 h-1  bg-gray-300"></span>
                        <span className="font-semibold font-body">{article.source}</span>
                      </div>
                      <h3 className="text-lg font-bold text-brand-900 mb-3 leading-tight line-clamp-2 font-display tracking-tight">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-2 font-light font-body">
                        {article.excerpt}
                      </p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-bold text-brand-500 hover:text-brand-600 transition-colors group/link font-display tracking-wide"
                      >
                        Read Article
                        <svg
                          className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="mt-16 text-center">
              <Link
                href="/events/news"
                className="inline-flex items-center  bg-brand-500 px-10 py-4 text-base font-bold text-white shadow-xl shadow-brand-500/30 transition-all duration-300 hover:bg-brand-600 hover:shadow-2xl hover:-translate-y-1 font-display tracking-wide"
              >
                View All News
                <svg
                  className="ml-3 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Sophisticated CTA Section */}
      <section
        className="relative py-16 sm:py-20 lg:py-28 lg:py-32 overflow-hidden"
        aria-labelledby="cta-heading"
      >
        {/* Elegant Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/documents/gallery/events/hprc-international-arena-polo-championship/001.jpeg"
            alt="Polo event"
            fill
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/97 via-brand-700/97 to-brand-600/97"></div>
          {/* Elegant texture overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          ></div>
        </div>
        <div className="container text-center relative z-10 max-w-5xl mx-auto">
          <h2
            id="cta-heading"
            className="mb-6 sm:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display tracking-tight"
          >
            {homeContent.spotlight.title}
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-3xl text-base sm:text-lg lg:text-xl text-white/95 leading-relaxed font-light font-body">
            {homeContent.spotlight.description}
          </p>
          <Link
            href={homeContent.spotlight.cta.href}
            className="mt-8 sm:mt-12 inline-flex items-center justify-center  bg-white px-8 sm:px-10 lg:px-12 py-3.5 sm:py-4 lg:py-5 text-sm sm:text-base lg:text-lg font-bold text-brand-500 shadow-2xl transition-all duration-300 hover:bg-gray-50 hover:shadow-[0_35px_60px_-15px_rgba(255,255,255,0.3)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-4 font-display tracking-wide"
          >
            {homeContent.spotlight.cta.label}
            <svg
              className="ml-2 sm:ml-3 h-4 sm:h-5 w-4 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

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

export default function HomePage() {
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

      {/* Featured Event - World Arena Polo Championship 2026 - Sophisticated Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 py-16 sm:py-24 lg:py-32">
        {/* Elegant Subtle Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          ></div>
        </div>

        {/* Sophisticated Decorative Elements */}
        <div className="absolute top-0 right-0 w-[20rem] h-[20rem] sm:w-[30rem] sm:h-[30rem] bg-brand-600/8  blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[20rem] h-[20rem] sm:w-[30rem] sm:h-[30rem] bg-brand-700/8  blur-[100px]"></div>

        {/* FIP & IPA logos - centered, white background for visibility */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-white/60 px-6 py-4 shadow-2xl">
          <Image
            src="/logos/fip-logo.svg"
            alt="Federation of International Polo"
            width={72}
            height={72}
            className="h-16 w-auto"
          />
          <Image
            src="/logos/ipa-logo.png"
            alt="Indian Polo Association"
            width={72}
            height={72}
            className="h-16 w-auto"
          />
        </div>

        <div className="container relative z-10 pt-20 sm:pt-24">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            {/* Elegant Content Side */}
            <div className="text-white space-y-6 sm:space-y-10">
              {/* Sophisticated Badge */}
              <div className="inline-flex items-center gap-2 sm:gap-3  bg-white/10 backdrop-blur-md border border-white/20 px-3 sm:px-5 py-2 sm:py-2.5">
                <span className="h-1.5 sm:h-2 w-1.5 sm:w-2  bg-brand-400 animate-pulse"></span>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/90 font-display">
                  Featured Event
                </span>
              </div>

              {/* Elegant Typography */}
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-[clamp(2rem,5vw,4rem)] sm:text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] font-display">
                  <span className="block">World Arena Polo</span>
                  <span className="block bg-gradient-to-r from-white via-brand-100 to-white bg-clip-text text-transparent mt-1 sm:mt-2">
                    Championship 2026
                  </span>
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-brand-300 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-sm sm:text-base font-semibold text-white tracking-wide">
                      Hyderabad
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-brand-300 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm sm:text-base font-semibold text-white tracking-wide">
                      11th – 18th February 2026
                    </span>
                  </div>
                </div>
              </div>

              {/* Elegant Description */}
              <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed font-light max-w-2xl font-body">
                A week-long celebration of world-class arena polo featuring top international teams
                competing for glory. Experience the thrill of elite competition, exceptional
                hospitality, and the finest polo action.
              </p>

              {/* Participating Countries - Elegant Layout */}
              <div className="space-y-4 sm:space-y-6">
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/70 font-display">
                  Participating Countries
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  {featuredEvent.countries.map((country) => {
                    const FlagComponent = countryFlagComponents[country.code];
                    return (
                      <div key={country.code} className="group relative">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105 flex items-center gap-1.5 sm:gap-2.5">
                          {FlagComponent ? (
                            <FlagComponent
                              className="w-4 h-4 sm:w-5 sm:h-5"
                              title={`${country.name} flag`}
                            />
                          ) : (
                            <span className="text-[1rem] sm:text-[1.25rem]">🏳️</span>
                          )}
                          <span className="text-xs sm:text-sm font-semibold text-white tracking-wide font-body">
                            {country.code}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Key Highlights - Sophisticated Cards */}
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-5 pt-3 sm:pt-4">
                {[
                  {
                    title: "4 & 6 Goal Tournaments",
                    desc: "Multiple competitive formats",
                    icon: "trophy",
                  },
                  { title: "International Teams", desc: "5 countries competing", icon: "users" },
                  { title: "Exhibition Matches", desc: "Women's & Best of Best", icon: "star" },
                  {
                    title: "Premium Hospitality",
                    desc: "VIP experiences available",
                    icon: "sparkles",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-1.5">
                      <div className="h-8 w-8  bg-gradient-to-br from-brand-400/20 to-brand-500/10 border border-brand-400/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-brand-400/40">
                        <svg
                          className="h-4 w-4 text-brand-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {item.icon === "trophy" && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
                            />
                          )}
                          {item.icon === "users" && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          )}
                          {item.icon === "star" && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                            />
                          )}
                          {item.icon === "sparkles" && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                          )}
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1.5 font-display">{item.title}</p>
                      <p className="text-sm text-white/70 font-light font-body">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Elegant CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-4 sm:pt-6">
                <Link
                  href="/events/world-arena-polo-championship-2026"
                  className="group inline-flex items-center justify-center gap-2 sm:gap-3  bg-white px-6 sm:px-9 py-3 sm:py-4 text-sm sm:text-base font-bold text-brand-900 shadow-2xl transition-all duration-300 hover:bg-gray-50 hover:text-brand-900 hover:shadow-2xl hover:shadow-brand-500/20 hover:-translate-y-1 font-display"
                >
                  <span className="tracking-wide text-brand-900">View Full Details</span>
                  <svg
                    className="h-4 sm:h-5 w-4 sm:w-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="/events/world-arena-polo-championship-2026#contact"
                  className="inline-flex items-center justify-center  border-2 border-white/30 bg-white/10 backdrop-blur-md px-6 sm:px-9 py-3 sm:py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 hover:bg-white/20 hover:border-white/50 font-display"
                >
                  Register Interest
                </Link>
              </div>
            </div>

            {/* Sophisticated Image Side */}
            <div className="relative group">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/20 transition-all duration-700 group-hover:shadow-[0_35px_60px_-15px_rgba(227,30,36,0.25)]">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/documents/gallery/events/hprc-international-arena-polo-championship/001.jpeg"
                    alt="World Arena Polo Championship 2026"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-brand-900/10 to-transparent"></div>
                </div>

                {/* Elegant Floating Info Cards */}
                <div className="absolute top-8 left-8 right-8 flex flex-wrap gap-3">
                  <div className="bg-white/98 backdrop-blur-md  px-5 py-3.5 shadow-xl border border-white/40 transition-all duration-300 hover:scale-105">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-600 mb-1 font-display">
                      Dates
                    </p>
                    <p className="text-sm font-bold text-brand-900 tracking-wide font-body">
                      11-18 Feb 2026
                    </p>
                  </div>
                  <div className="bg-white/98 backdrop-blur-md  px-5 py-3.5 shadow-xl border border-white/40 transition-all duration-300 hover:scale-105">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-600 mb-1 font-display">
                      Venue
                    </p>
                    <p className="text-sm font-bold text-brand-900 tracking-wide font-body">
                      HPRC Arena
                    </p>
                  </div>
                </div>

                {/* Elegant Bottom Badge */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-gradient-to-r from-brand-600 to-brand-500  px-7 py-4 shadow-2xl border border-white/20 backdrop-blur-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 mb-1 font-display">
                      Event of the Year
                    </p>
                    <p className="text-base font-bold text-white font-display">
                      World Arena Polo Championship 2026
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-500/15  blur-2xl -z-10"></div>
              <div className="absolute -top-10 -left-10 w-28 h-28 bg-white/8  blur-xl -z-10"></div>
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
      {eventsContent.news && eventsContent.news.length > 0 && (
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
              {eventsContent.news.slice(0, 3).map((article, index) => {
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

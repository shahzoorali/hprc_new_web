import Image from "next/image";
import Link from "next/link";

import { HeroVideo } from "@/components/ui/hero-video";
import { eventsContent } from "@/content/events";
import { homeContent } from "@/content/home";
import { worldArenaPoloChampionship2026 } from "@/content/world-arena-polo-championship-2026";
import { CountryBadge } from "@/components/ui/country-badge";

export default function HomePage() {
  const heroSlide = homeContent.heroSlides[0];
  const featuredEvent = worldArenaPoloChampionship2026;

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video */}
      <HeroVideo
        videoUrl={heroSlide.video || ""}
        fallbackImage={heroSlide.image}
        imageAlt={heroSlide.imageAlt}
      />

      {/* Featured Event - World Arena Polo Championship 2026 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 py-24 sm:py-32 lg:py-40">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl"></div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content Side */}
            <div className="text-white space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2">
                <span className="text-xs font-bold uppercase tracking-widest text-white/90">Featured Event</span>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse"></span>
              </div>

              {/* Title */}
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                  <span className="block">World Arena Polo</span>
                  <span className="block bg-gradient-to-r from-white via-brand-100 to-white bg-clip-text text-transparent">
                    Championship 2026
                  </span>
                </h2>
                <p className="text-xl sm:text-2xl text-white/90 font-semibold">
                  Hyderabad • 11th – 18th February 2026
                </p>
              </div>

              {/* Description */}
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl">
                A week-long celebration of world-class arena polo featuring top international teams competing for glory. 
                Experience the thrill of elite competition, exceptional hospitality, and the finest polo action.
              </p>

              {/* Participating Countries */}
              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-widest text-white/70">
                  Participating Countries
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {featuredEvent.countries.map((country) => (
                    <div key={country.code} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
                      <span className="text-xl mr-2" style={{
                        fontFamily: 'system-ui, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        display: 'inline-block',
                        verticalAlign: 'middle'
                      }}>
                        {country.code === "USA" ? "🇺🇸" : country.code === "IND" ? "🇮🇳" : country.code === "GER" ? "🇩🇪" : country.code === "FRA" ? "🇫🇷" : country.code === "LUX" ? "🇱🇺" : "🏳️"}
                      </span>
                      <span className="text-sm font-bold text-white">{country.code}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-6 w-6 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">4 & 6 Goal Tournaments</p>
                    <p className="text-sm text-white/70">Multiple competitive formats</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-6 w-6 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">International Teams</p>
                    <p className="text-sm text-white/70">5 countries competing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-6 w-6 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">Exhibition Matches</p>
                    <p className="text-sm text-white/70">Women's & Best of Best</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-6 w-6 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">Premium Hospitality</p>
                    <p className="text-sm text-white/70">VIP experiences available</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/events/world-arena-polo-championship-2026"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brand-800 shadow-2xl transition-all duration-300 hover:bg-white hover:text-brand-900 hover:shadow-brand-500/50 hover:-translate-y-1"
                >
                  <span className="text-brand-800 group-hover:text-brand-900 transition-colors duration-300">View Full Details</span>
                  <svg
                    className="h-5 w-5 text-brand-800 group-hover:text-brand-900 transition-all duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="/events/world-arena-polo-championship-2026#contact"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:text-white"
                >
                  Register Interest
                </Link>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/20">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=1200&q=80"
                    alt="World Arena Polo Championship 2026"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/20 to-transparent"></div>
                </div>
                
                {/* Floating Info Cards */}
                <div className="absolute top-6 left-6 right-6 flex flex-wrap gap-3">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl border border-white/50">
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">Dates</p>
                    <p className="text-sm font-black text-brand-900">11-18 Feb 2026</p>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl border border-white/50">
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">Venue</p>
                    <p className="text-sm font-black text-brand-900">HPRC Arena</p>
                  </div>
                </div>

                {/* Bottom Badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl px-6 py-4 shadow-xl border border-white/20">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/90 mb-1">Event of the Year</p>
                    <p className="text-lg font-black text-white">Hyderabad's Premier Polo Championship</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section - A wide range of events for everyone */}
      <section className="bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="events-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2
              id="events-heading"
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl mb-5 leading-tight"
            >
              A wide range of events for everyone
            </h2>
            <div className="mx-auto h-1.5 w-20 bg-brand-500 rounded-full"></div>
          </div>

          {/* Creative Boxes Layout */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 list-none p-0 m-0">
            {homeContent.events.map((event, index) => {
              const eventImages = [
                "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80", // Learn Riding
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", // Weekend Getaway
                "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80", // Banquet Hall
                "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&q=80", // Polo
                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80", // Sports Center
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", // Restaurants
              ];

              const animationDelay = index * 0.4;

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
                    className="group relative block overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                  >
                    {/* Image */}
                    <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                      <Image
                        src={eventImages[index]}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/50"></div>
                    </div>

                    {/* Text Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 text-white">
                      <div className="box-text">
                        <h4 className="text-xl sm:text-2xl font-bold mb-2 leading-tight transition-transform duration-300 group-hover:translate-y-[-4px]">
                          {event.title}
                        </h4>
                        <span className="inline-flex items-center text-sm sm:text-base font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                          Learn More
                          <svg
                            className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Explore Section */}
      <section className="bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="explore-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2
              id="explore-heading"
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl mb-5 leading-tight"
            >
              Explore HPRC
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg sm:text-xl text-gray-600 leading-relaxed">
              Discover a 10-acre equestrian estate where riders, athletes, and families come
              together for polo, riding programmes, sports, dining, and celebrations.
            </p>
          </div>
          <div className="mt-12 sm:mt-16 grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
            {homeContent.pillars.map((pillar, index) => {
              const pillarImages = [
                "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80", // Riding & Polo
                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80", // Sports Centre
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", // Hospitality
              ];
              return (
                <Link
                  key={pillar.title}
                  href={pillar.href}
                  className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                >
                  {/* Image */}
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    <Image
                      src={pillarImages[index]}
                      alt={pillar.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute right-0 top-0 h-32 w-32 sm:h-40 sm:w-40 rounded-bl-full bg-gradient-to-br from-brand-500/20 to-brand-500/10 transition-all duration-500 group-hover:scale-150"></div>
                  </div>
                  <div className="p-6 sm:p-8 bg-white relative">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6">
                      {pillar.description}
                    </p>
                    <span className="inline-flex items-center text-sm sm:text-base font-bold text-brand-500 group-hover:text-brand-600 transition-colors duration-300">
                      Explore
                      <svg
                        className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:translate-x-2"
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

      {/* News Section */}
      {eventsContent.news && eventsContent.news.length > 0 && (
        <section className="bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="news-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 sm:mb-20">
              <h2
                id="news-heading"
                className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl mb-5 leading-tight"
              >
                In The Press
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg sm:text-xl text-gray-600 leading-relaxed">
                Latest news coverage and press releases about HPRC tournaments, achievements, and
                events
              </p>
            </div>
            <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-3">
              {eventsContent.news.slice(0, 3).map((article, index) => {
                // Use image from source article, fallback to stock image if not available
                const imageUrl =
                  article.imageUrl ||
                  "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80";
                return (
                  <article
                    key={index}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      {article.category && (
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
                            {article.category}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 relative z-10">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <time dateTime={article.date}>{article.date}</time>
                        <span>•</span>
                        <span className="font-medium">{article.source}</span>
                      </div>
                      <h3 className="text-lg font-extrabold text-gray-900 mb-3 leading-tight line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-bold text-brand-500 hover:text-brand-600 transition-colors group/link"
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
            <div className="mt-12 text-center">
              <Link
                href="/events/news"
                className="inline-flex items-center rounded-full bg-brand-500 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-brand-600 hover:shadow-xl hover:-translate-y-1"
              >
                View All News
                <svg
                  className="ml-2 h-5 w-5"
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

      {/* CTA Section */}
      <section
        className="relative py-20 sm:py-24 lg:py-28 overflow-hidden"
        aria-labelledby="cta-heading"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=1920&q=80"
            alt="Polo event"
            fill
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500/95 via-brand-600/95 to-brand-500/95"></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2
            id="cta-heading"
            className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl mb-5 leading-tight"
          >
            {homeContent.spotlight.title}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg sm:text-xl text-white/95 leading-relaxed">
            {homeContent.spotlight.description}
          </p>
          <Link
            href={homeContent.spotlight.cta.href}
            className="mt-10 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold text-brand-500 shadow-xl transition-all duration-300 hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-brand-600"
          >
            {homeContent.spotlight.cta.label}
          </Link>
        </div>
      </section>
    </div>
  );
}

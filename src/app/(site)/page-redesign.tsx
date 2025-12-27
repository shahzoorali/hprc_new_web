import Image from "next/image";
import Link from "next/link";

import { HeroVideo } from "@/components/ui/hero-video";
import { eventsContent } from "@/content/events";
import { homeContent } from "@/content/home";
import { worldArenaPoloChampionship2026 } from "@/content/world-arena-polo-championship-2026";
import { CountryBadge } from "@/components/ui/country-badge";

export default function HomePageRedesign() {
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
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 py-24 sm:py-32 lg:py-40">
        {/* Elegant Subtle Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}></div>
        </div>
        
        {/* Sophisticated Decorative Elements */}
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-brand-600/8 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-brand-700/8 rounded-full blur-[100px]"></div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Elegant Content Side */}
            <div className="text-white space-y-10">
              {/* Sophisticated Badge */}
              <div className="inline-flex items-center gap-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5">
                <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/90 font-display">Featured Event</span>
              </div>

              {/* Elegant Typography */}
              <div className="space-y-6">
                <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] font-display">
                  <span className="block">World Arena Polo</span>
                  <span className="block bg-gradient-to-r from-white via-brand-100 to-white bg-clip-text text-transparent mt-2">
                    Championship 2026
                  </span>
                </h2>
                <div className="flex items-center gap-4">
                  <span className="h-px flex-1 bg-white/30"></span>
                  <p className="text-lg font-medium text-white/90 tracking-wide">
                    Hyderabad • 11th – 18th February 2026
                  </p>
                  <span className="h-px flex-1 bg-white/30"></span>
                </div>
              </div>

              {/* Elegant Description */}
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed font-light max-w-2xl font-body">
                A week-long celebration of world-class arena polo featuring top international teams competing for glory. 
                Experience the thrill of elite competition, exceptional hospitality, and the finest polo action.
              </p>

              {/* Participating Countries - Elegant Layout */}
              <div className="space-y-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 font-display">
                  Participating Countries
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  {featuredEvent.countries.map((country) => (
                    <div key={country.code} className="group relative">
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105">
                        <span className="text-[1.25rem] mr-2.5" style={{
                          fontFamily: 'system-ui, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "Twemoji Mozilla", "EmojiOne Color", sans-serif',
                          display: 'inline-block',
                          verticalAlign: 'middle'
                        }}>
                          {country.code === "USA" ? "🇺🇸" : country.code === "IND" ? "🇮🇳" : country.code === "GER" ? "🇩🇪" : country.code === "FRA" ? "🇫🇷" : country.code === "LUX" ? "🇱🇺" : "🏳️"}
                        </span>
                        <span className="text-sm font-semibold text-white tracking-wide">{country.code}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Highlights - Sophisticated Cards */}
              <div className="grid sm:grid-cols-2 gap-5 pt-4">
                {[
                  { title: "4 & 6 Goal Tournaments", desc: "Multiple competitive formats", icon: "trophy" },
                  { title: "International Teams", desc: "5 countries competing", icon: "users" },
                  { title: "Exhibition Matches", desc: "Women's & Best of Best", icon: "star" },
                  { title: "Premium Hospitality", desc: "VIP experiences available", icon: "sparkles" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-1.5">
                      <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-brand-400/20 to-brand-500/10 border border-brand-400/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-brand-400/40">
                        <svg className="h-4 w-4 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {item.icon === "trophy" && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          )}
                          {item.icon === "users" && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          )}
                          {item.icon === "star" && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          )}
                          {item.icon === "sparkles" && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          )}
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1.5 font-display">{item.title}</p>
                      <p className="text-sm text-white/70 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Elegant CTA Buttons */}
              <div className="flex flex-wrap items-center gap-5 pt-6">
                <Link
                  href="/events/world-arena-polo-championship-2026"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-9 py-4 text-base font-bold text-brand-800 shadow-2xl transition-all duration-300 hover:bg-gray-50 hover:text-brand-900 hover:shadow-2xl hover:shadow-brand-500/20 hover:-translate-y-1 font-display"
                >
                  <span className="tracking-wide">View Full Details</span>
                  <svg
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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
                  className="inline-flex items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-md px-9 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-white/20 hover:border-white/50 font-display"
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
                    src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=1200&q=80"
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
                  <div className="bg-white/98 backdrop-blur-md rounded-2xl px-5 py-3.5 shadow-xl border border-white/40 transition-all duration-300 hover:scale-105">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-600 mb-1 font-display">Dates</p>
                    <p className="text-sm font-bold text-brand-900 tracking-wide">11-18 Feb 2026</p>
                  </div>
                  <div className="bg-white/98 backdrop-blur-md rounded-2xl px-5 py-3.5 shadow-xl border border-white/40 transition-all duration-300 hover:scale-105">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-600 mb-1 font-display">Venue</p>
                    <p className="text-sm font-bold text-brand-900 tracking-wide">HPRC Arena</p>
                  </div>
                </div>

                {/* Elegant Bottom Badge */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-gradient-to-r from-brand-600 to-brand-500 rounded-2xl px-7 py-4 shadow-2xl border border-white/20 backdrop-blur-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 mb-1 font-display">Event of the Year</p>
                    <p className="text-base font-bold text-white font-display">Hyderabad's Premier Polo Championship</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-500/15 rounded-full blur-2xl -z-10"></div>
              <div className="absolute -top-10 -left-10 w-28 h-28 bg-white/8 rounded-full blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section - Sophisticated Design */}
      <section className="bg-gradient-elegant py-24 sm:py-28 lg:py-32" aria-labelledby="events-heading">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2
              id="events-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 mb-6 leading-[1.15] font-display tracking-tight"
            >
              A Wide Range of Events
              <span className="block mt-2 text-brand-500">For Everyone</span>
            </h2>
            <div className="mx-auto flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-brand-300"></span>
              <span className="h-px w-12 bg-brand-300"></span>
              <span className="h-px w-12 bg-brand-500"></span>
            </div>
          </div>

          {/* Sophisticated Cards Layout */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 list-none p-0 m-0">
            {homeContent.events.map((event, index) => {
              const eventImages = [
                "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
                "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
                "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&q=80",
                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
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
                    className="group relative block overflow-hidden rounded-3xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-4"
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
                          <span className="text-sm sm:text-base font-medium tracking-wide">Learn More</span>
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
      <section className="bg-white py-24 sm:py-28 lg:py-32" aria-labelledby="explore-heading">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
          <div className="text-center mb-16 sm:mb-20 max-w-4xl mx-auto">
            <h2
              id="explore-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 mb-8 leading-[1.15] font-display tracking-tight"
            >
              Explore HPRC
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-light max-w-2xl mx-auto">
              Discover a 10-acre equestrian estate where riders, athletes, and families come
              together for polo, riding programmes, sports, dining, and celebrations.
            </p>
          </div>
          <div className="mt-12 sm:mt-16 grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-3">
            {homeContent.pillars.map((pillar, index) => {
              const pillarImages = [
                "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
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
                    <div className="absolute right-0 top-0 h-40 w-40 sm:h-48 sm:w-48 rounded-bl-full bg-gradient-to-br from-brand-500/20 to-brand-500/5 transition-all duration-700 group-hover:scale-150"></div>
                  </div>
                  
                  {/* Elegant Content */}
                  <div className="p-7 sm:p-9 bg-white relative">
                    <h3 className="text-2xl sm:text-3xl font-bold text-brand-900 mb-4 leading-tight font-display tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base sm:text-lg font-light mb-6">
                      {pillar.description}
                    </p>
                    <span className="inline-flex items-center text-sm sm:text-base font-semibold text-brand-500 group-hover:text-brand-600 transition-colors duration-300 tracking-wide font-display">
                      Explore
                      <svg
                        className="ml-3 sm:ml-4 h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:translate-x-2"
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
        <section className="bg-gradient-elegant py-24 sm:py-28 lg:py-32" aria-labelledby="news-heading">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
            <div className="text-center mb-16 sm:mb-20 max-w-4xl mx-auto">
              <h2
                id="news-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 mb-8 leading-[1.15] font-display tracking-tight"
              >
                In The Press
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-light max-w-2xl mx-auto">
                Latest news coverage and press releases about HPRC tournaments, achievements, and
                events
              </p>
            </div>
            <div className="mt-12 sm:mt-16 grid gap-8 md:grid-cols-3">
              {eventsContent.news.slice(0, 3).map((article, index) => {
                const imageUrl =
                  article.imageUrl ||
                  "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80";
                return (
                  <article
                    key={index}
                    className="group relative overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      {article.category && (
                        <div className="absolute top-5 left-5">
                          <span className="inline-flex items-center rounded-full bg-brand-500 px-4 py-2 text-[11px] font-bold text-white tracking-wide uppercase font-display shadow-lg">
                            {article.category}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-7 relative z-10">
                      <div className="flex items-center gap-2.5 text-xs text-gray-500 mb-3">
                        <time dateTime={article.date} className="font-medium">{article.date}</time>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span className="font-semibold">{article.source}</span>
                      </div>
                      <h3 className="text-lg font-bold text-brand-900 mb-3 leading-tight line-clamp-2 font-display tracking-tight">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-2 font-light">
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
                className="inline-flex items-center rounded-full bg-brand-500 px-10 py-4 text-base font-bold text-white shadow-xl shadow-brand-500/30 transition-all duration-300 hover:bg-brand-600 hover:shadow-2xl hover:-translate-y-1 font-display tracking-wide"
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
        className="relative py-24 sm:py-28 lg:py-32 overflow-hidden"
        aria-labelledby="cta-heading"
      >
        {/* Elegant Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=1920&q=80"
            alt="Polo event"
            fill
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/97 via-brand-700/97 to-brand-600/97"></div>
          {/* Elegant texture overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}></div>
        </div>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-8 text-center relative z-10 max-w-5xl mx-auto">
          <h2
            id="cta-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.15] font-display tracking-tight"
          >
            {homeContent.spotlight.title}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg sm:text-xl text-white/95 leading-relaxed font-light">
            {homeContent.spotlight.description}
          </p>
          <Link
            href={homeContent.spotlight.cta.href}
            className="mt-12 inline-flex items-center justify-center rounded-full bg-white px-10 py-4.5 sm:px-12 sm:py-5 text-base sm:text-lg font-bold text-brand-500 shadow-2xl transition-all duration-300 hover:bg-gray-50 hover:shadow-[0_35px_60px_-15px_rgba(255,255,255,0.3)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-4 font-display tracking-wide"
          >
            {homeContent.spotlight.cta.label}
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
      </section>
    </div>
  );
}


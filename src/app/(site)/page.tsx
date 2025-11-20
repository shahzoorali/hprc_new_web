import Image from "next/image";
import Link from "next/link";

import { eventsContent } from "@/content/events";
import { homeContent } from "@/content/home";

const eventIcons: Record<string, React.ReactNode> = {
  book: (
    <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  ),
  home: (
    <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  ),
  building: (
    <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  ),
  lightning: (
    <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),
  check: (
    <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  utensils: (
    <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  ),
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center px-4 py-20 sm:py-28 overflow-hidden"
        aria-label="Hero section"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=1920&q=80"
            alt="Polo and equestrian sports"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-brand-50/40 to-white/90"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(227,30,36,0.05),transparent_60%)]"></div>
        </div>

        <div className="mx-auto max-w-7xl text-center relative z-10">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1]">
            Where every experience
            <br />
            <span className="text-brand-500">is extraordinary</span>
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-lg text-gray-600 sm:text-xl md:text-2xl leading-relaxed font-normal">
            {homeContent.hero.description}
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {homeContent.hero.actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={
                  action.variant === "primary"
                    ? "inline-flex items-center justify-center rounded-full bg-brand-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-brand-500/40 transition-all duration-300 hover:bg-brand-600 hover:shadow-2xl hover:shadow-brand-500/50 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-brand-500/50 focus:ring-offset-2"
                    : "inline-flex items-center justify-center rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-base font-bold text-gray-900 transition-all duration-300 hover:border-brand-500 hover:text-brand-500 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-500/50 focus:ring-offset-2"
                }
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section - A wide range of events for everyone */}
      <section
        className="bg-gradient-to-br from-brand-50/30 via-white to-brand-50/20 py-20 sm:py-24 lg:py-28"
        aria-labelledby="events-heading"
      >
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
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2">
            {homeContent.events.map((event, index) => {
              const eventImages = [
                "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80", // Learn Riding
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", // Weekend Getaway
                "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80", // Banquet Hall
                "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&q=80", // Polo
                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80", // Sports Center
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", // Restaurants
              ];
              return (
                <article
                  key={index}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2"
                >
                  {/* Image */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <Image
                      src={eventImages[index]}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-white/95 backdrop-blur-sm text-brand-500 shadow-lg">
                        {eventIcons[event.iconName]}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col gap-4">
                      <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-brand-500 leading-tight">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {event.description}
                      </p>
                      <Link
                        href={event.href}
                        className="inline-flex items-center rounded-full bg-brand-500 px-6 py-3 sm:px-8 sm:py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-brand-600 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                      >
                        Read More
                        <svg
                          className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1"
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
                </article>
              );
            })}
          </div>
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
                  <div className="p-6 sm:p-8 relative">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight relative z-10">
                      {pillar.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-sm sm:text-base relative z-10 mb-6">
                      {pillar.description}
                    </p>
                    <span className="relative z-10 inline-flex items-center text-sm sm:text-base font-bold text-white group-hover:text-brand-200 transition-colors duration-300">
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

      {/* Benefits Section */}
      <section
        className="bg-gradient-to-br from-gray-50 via-white to-gray-50/50 py-20 sm:py-24 lg:py-28"
        aria-labelledby="benefits-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2
              id="benefits-heading"
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl mb-5 leading-tight"
            >
              Benefits for Members of HPRC
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg sm:text-xl text-gray-600 leading-relaxed">
              Experience world-class facilities, exceptional service, and a vibrant community
            </p>
          </div>
          <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Request Access",
                description: "Access a galaxy of private clubs worldwide with priority access to exclusive networks.",
                image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80",
                icon: (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                ),
              },
              {
                title: "Explore Programmes",
                description:
                  "Discover programmes across polo, equestrian, athletics, dining, and a lot more.",
                image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80",
                icon: (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Seamless Booking Experience",
                description:
                  "Enabled by state-of-the-art facilities and personalized service for all your needs.",
                image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
                icon: (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                ),
              },
              {
                title: "Discover Local Events",
                description:
                  "Experience events in the city personalized and enhanced with exclusive member access.",
                image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80",
                icon: (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                ),
              },
              {
                title: "Connect & Network",
                description:
                  "Connect with members of private clubs worldwide driven with enhanced recommendation.",
                image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80",
                icon: (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Premium Concierge",
                description: "For premium white glove service and personalized attention to detail.",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
                icon: (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                ),
              },
            ].map((benefit, index) => (
              <article
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  {benefit.image && (
                    <Image
                      src={benefit.image}
                      alt={benefit.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className="relative p-6 sm:p-8">
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/10 to-brand-500/5 text-brand-500 transition-transform duration-300 hover:scale-110">
                    {benefit.icon}
                  </div>
                  <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl font-extrabold text-gray-900 leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="highlights-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2
              id="highlights-heading"
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl mb-5 leading-tight"
            >
              Championing Excellence
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg sm:text-xl text-gray-600 leading-relaxed">
              HPRC's initiatives go beyond the arena—fostering international partnerships, nurturing
              young riders, and celebrating Hyderabad's equestrian history.
            </p>
          </div>
          <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-3">
            {homeContent.highlights.map((item, index) => {
              const highlightImages = [
                "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80", // Tournaments
                "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80", // Community
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80", // Partnerships
              ];
              return (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={highlightImages[index]}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* News Section */}
      {eventsContent.news && eventsContent.news.length > 0 && (
        <section
          className="bg-white py-20 sm:py-24 lg:py-28"
          aria-labelledby="news-heading"
        >
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
                        onError={(e) => {
                          // Fallback to stock image if source image fails to load
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80";
                        }}
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

      {/* Testimonials Section */}
      <section
        className="bg-gradient-to-br from-brand-50/40 via-white to-brand-50/30 py-20 sm:py-24 lg:py-28"
        aria-labelledby="testimonials-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2
              id="testimonials-heading"
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl mb-5 leading-tight"
            >
              Testimonials
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg sm:text-xl text-gray-600 leading-relaxed">
              An unparalleled experience of sophistication and exclusivity where every moment feels
              extraordinary
            </p>
          </div>
          <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-2">
            {homeContent.testimonials.map((testimonial, index) => {
              const testimonialImages = [
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
              ];
              return (
                <blockquote
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={testimonialImages[index]}
                      alt={testimonial.author}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <footer className="mt-6 flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-brand-500/20">
                        <Image
                          src={testimonialImages[index]}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <p className="text-sm sm:text-base font-bold text-brand-500">
                        {testimonial.author}
                      </p>
                    </footer>
                  </div>
                </blockquote>
              );
            })}
          </div>
        </div>
      </section>

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

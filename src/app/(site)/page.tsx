import Image from "next/image";
import Link from "next/link";

import { HeroVideo } from "@/components/ui/hero-video";
import { eventsContent } from "@/content/events";
import { homeContent } from "@/content/home";

export default function HomePage() {
  const heroSlide = homeContent.heroSlides[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video */}
      <HeroVideo
        videoUrl={heroSlide.video || ""}
        fallbackImage={heroSlide.image}
        imageAlt={heroSlide.imageAlt}
      />

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
              HPRC&apos;s initiatives go beyond the arena—fostering international partnerships,
              nurturing young riders, and celebrating Hyderabad&apos;s equestrian history.
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

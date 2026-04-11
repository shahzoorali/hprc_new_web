import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { eventsContent } from "@/content/events";

export default function EventsPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-12 sm:pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow={eventsContent.hero.eyebrow}
          title={eventsContent.hero.title}
          description={eventsContent.hero.description}
          actions={[{ label: "Host an Event", href: "/contact", variant: "primary" }]}
          backgroundImage="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=1920&q=80"
        />
      </div>

      <section className="container space-y-10">
        <SectionHeading
          eyebrow="Upcoming"
          title="Featured events"
          description="Mark your calendar and experience the thrill of equestrian sport and club celebrations."
          align="left"
        />
        {eventsContent.upcoming && eventsContent.upcoming.length > 0 ? (
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
            {eventsContent.upcoming.map((event, index) => {
              const eventImages = [
                "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&q=80",
                "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
              ];
              const commonClasses =
                "group relative overflow-hidden rounded-[2.5rem] border border-brand-100 bg-white/95 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 block";

              const eventContent = (
                <>
                  <div className="relative h-44 sm:h-48 overflow-hidden">
                    <Image
                      src={eventImages[index % eventImages.length]}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-brand-500">
                      {event.date}
                    </p>
                    <h2 className="mt-2 sm:mt-3 text-xl sm:text-2xl font-extrabold text-gray-900">
                      {event.title}
                    </h2>
                    <p className="mt-3 sm:mt-4 text-sm text-gray-700 leading-relaxed">
                      {event.description}
                    </p>
                    {event.link && (
                      <div className="mt-3 sm:mt-4 inline-flex items-center text-xs sm:text-sm font-bold text-brand-500 hover:text-brand-600 transition-colors">
                        Learn More
                        <svg
                          className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
                      </div>
                    )}
                  </div>
                </>
              );

              if (event.link) {
                return (
                  <Link key={event.title} href={event.link} className={commonClasses}>
                    {eventContent}
                  </Link>
                );
              }

              return (
                <article key={event.title} className={commonClasses}>
                  {eventContent}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-gray-100 bg-white/50 py-16 px-6 text-center shadow-inner">
            <svg className="h-12 w-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900">No upcoming events</h3>
            <p className="mt-2 text-sm text-gray-500 max-w-md">
              There are currently no featured upcoming events. Please check back later or subscribe to our newsletter to stay updated.
            </p>
          </div>
        )}
      </section>

      <section className="bg-gradient-to-br from-brand-50/30 via-white to-brand-50/20 py-12 sm:py-16">
        <div className="container space-y-8">
          <div className="flex items-center justify-between">
            <SectionHeading
              eyebrow="Highlights"
              title="Recent milestones"
              description="Explore standout initiatives that continue to elevate Hyderabad's equestrian scene."
              align="left"
            />
            <Link
              href="/events/past"
              className="hidden md:inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
            >
              View All Past Events
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {eventsContent.pastHighlights.slice(0, 6).map((highlight: any, index) => {
              // Get event image based on link
              const getEventImage = (highlight: any, index: number) => {
                if (highlight.image) {
                  return highlight.image;
                }
                const link = highlight.link;
                if (link.includes("1st-rel-10th-hyd-horse-show")) {
                  return "/documents/gallery/events/1st-rel-gallery/gallery-001.jpg";
                }
                if (link.includes("arena-polo-tournament-2016")) {
                  return "/documents/gallery/events/arena-polo-tournament-2016/001.jpg";
                }
                if (link.includes("nec-calendar-2016")) {
                  return "/documents/gallery/events/nec-calendar-2016/001.jpg";
                }
                if (link.includes("hprc-international-arena-polo-championship")) {
                  return "/documents/gallery/events/hprc-international-arena-polo-championship/001.jpeg";
                }
                if (link.includes("hprc-sport-complex")) {
                  return "/documents/gallery/events/hprc-sport-complex/01.jpg";
                }
                // Fallback images
                const fallbackImages = [
                  "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&q=80",
                  "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
                  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
                ];
                return fallbackImages[index % fallbackImages.length];
              };

              const eventImage = getEventImage(highlight, index);

              return (
                <Link
                  key={highlight.title}
                  href={highlight.link}
                  className="group relative overflow-hidden rounded-[2.5rem] border border-brand-100 bg-white/95 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 block"
                >
                  <article>
                    <div className="relative h-44 sm:h-48 overflow-hidden">
                      <Image
                        src={eventImage}
                        alt={highlight.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    </div>
                    <div className="p-6 sm:p-8">
                      <h3 className="mt-2 sm:mt-3 text-xl sm:text-2xl font-extrabold text-gray-900 group-hover:text-brand-600 transition-colors">
                        {highlight.title}
                      </h3>
                      <p className="mt-3 sm:mt-4 text-sm text-gray-700 leading-relaxed line-clamp-3">
                        {highlight.description}
                      </p>
                      <div className="mt-3 sm:mt-4 inline-flex items-center text-xs sm:text-sm font-bold text-brand-500 hover:text-brand-600 transition-colors">
                        Read More
                        <svg
                          className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
          <div className="text-center md:hidden">
            <Link
              href="/events/past"
              className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
            >
              View All Past Events
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Latest News Section */}
      {eventsContent.news && eventsContent.news.length > 0 && (
        <section className="container space-y-6 sm:space-y-8">
          <SectionHeading
            eyebrow="The Press"
            title="Latest News"
            description="Recent coverage and press releases about HPRC tournaments, achievements, and events."
          />
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {eventsContent.news.slice(0, 3).map((article, index) => {
              // Use image from source article, fallback to stock image if not available
              const imageUrl =
                article.imageUrl ||
                "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80";
              return (
                <article
                  key={index}
                  className="group relative overflow-hidden  bg-white shadow-md border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-36 sm:h-40 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    {article.category && (
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                        <span className="inline-flex items-center  bg-brand-500 px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs font-bold text-white">
                          {article.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-500 mb-1.5 sm:mb-2">
                      <time dateTime={article.date}>{article.date}</time>
                      <span>•</span>
                      <span className="font-medium">{article.source}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-gray-900 mb-1.5 sm:mb-2 leading-tight line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[10px] sm:text-xs font-bold text-brand-500 hover:text-brand-600 transition-colors"
                    >
                      Read More
                      <svg
                        className="ml-1.5 h-3.5 w-3.5"
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
          <div className="text-center">
            <Link
              href="/events/news"
              className="inline-flex items-center  bg-brand-500 px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-brand-600 hover:shadow-lg hover:-translate-y-0.5"
            >
              View All News
              <svg
                className="ml-2 h-4 w-4"
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
      )}

      <section className="container space-y-6">
        <SectionHeading
          eyebrow="Media"
          title="Stay informed"
          description="Dive into the latest news, insights, and stories from HPRC."
          align="left"
        />
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {eventsContent.media.map((entry) => (
            <article
              key={entry.category}
              className=" sm: border border-brand-100 bg-white/95 p-4 sm:p-6 shadow-[var(--shadow-elevated)]"
            >
              <h3 className="text-base sm:text-lg font-semibold text-brand-900">
                {entry.category}
              </h3>
              <p className="mt-2 sm:mt-3 text-sm text-gray-700">{entry.summary}</p>
              <Link
                href={entry.href}
                className="mt-3 sm:mt-4 inline-flex text-xs sm:text-sm font-semibold text-brand-800 hover:text-brand-900"
              >
                Browse &rarr;
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="container space-y-6">
        <SectionHeading
          eyebrow="Galleries"
          title="Relive the action"
          description="Photographs and films that capture the passion of our riders, horses, and members."
          align="left"
        />
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
          {eventsContent.galleries.map((gallery) => (
            <article
              key={gallery.type}
              className=" border border-brand-100 bg-white/95 p-6 shadow-[var(--shadow-elevated)]"
            >
              <h3 className="text-lg font-semibold text-brand-900">{gallery.type}</h3>
              <p className="mt-3 text-sm text-gray-700">{gallery.description}</p>
              <Link
                href={gallery.href}
                className="mt-4 inline-flex text-sm font-semibold text-brand-800 hover:text-brand-900"
              >
                View &rarr;
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

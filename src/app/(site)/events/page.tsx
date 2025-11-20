import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { eventsContent } from "@/content/events";

export default function EventsPage() {
  return (
    <div className="space-y-16 pb-16">
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
        <div className="grid gap-8 md:grid-cols-2">
          {eventsContent.upcoming.map((event, index) => {
            const eventImages = [
              "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&q=80",
              "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
            ];
            return (
              <article
                key={event.title}
                className="group relative overflow-hidden rounded-[2.5rem] border border-brand-100 bg-white/95 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={eventImages[index % eventImages.length]}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                <div className="p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
                    {event.date}
                  </p>
                  <h2 className="mt-3 text-2xl font-extrabold text-gray-900">{event.title}</h2>
                  <p className="mt-4 text-sm text-gray-700 leading-relaxed">{event.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-br from-brand-50/30 via-white to-brand-50/20 py-16">
        <div className="container space-y-8">
          <SectionHeading
            eyebrow="Highlights"
            title="Recent milestones"
            description="Explore standout initiatives that continue to elevate Hyderabad's equestrian scene."
            align="left"
          />
          <div className="grid gap-8 md:grid-cols-2">
            {eventsContent.pastHighlights.map((highlight) => (
              <article
                key={highlight.title}
                className="group relative overflow-hidden rounded-3xl border border-brand-100 bg-white/95 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 transition-all duration-500 group-hover:scale-150"></div>
                <div className="relative">
                  <h3 className="text-xl font-extrabold text-brand-900">{highlight.title}</h3>
                  <p className="mt-4 text-sm text-gray-700 leading-relaxed">{highlight.description}</p>
                  <Link
                    href={highlight.link}
                    className="mt-6 inline-flex items-center text-sm font-bold text-brand-500 hover:text-brand-600 transition-colors group/link"
                  >
                    Read more
                    <svg
                      className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
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
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      {eventsContent.news && eventsContent.news.length > 0 && (
        <section className="container space-y-8">
          <SectionHeading
            eyebrow="The Press"
            title="Latest News"
            description="Recent coverage and press releases about HPRC tournaments, achievements, and events."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {eventsContent.news.slice(0, 3).map((article, index) => {
              // Use image from source article, fallback to stock image if not available
              const imageUrl =
                article.imageUrl ||
                "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80";
              return (
                <article
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      onError={(e) => {
                        // Fallback to stock image if source image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    {article.category && (
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center rounded-full bg-brand-500 px-2.5 py-1 text-xs font-bold text-white">
                          {article.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <time dateTime={article.date}>{article.date}</time>
                      <span>•</span>
                      <span className="font-medium">{article.source}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-gray-900 mb-2 leading-tight line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-bold text-brand-500 hover:text-brand-600 transition-colors"
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
              className="inline-flex items-center rounded-full bg-brand-500 px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-brand-600 hover:shadow-lg hover:-translate-y-0.5"
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
        <div className="grid gap-6 md:grid-cols-3">
          {eventsContent.media.map((entry) => (
            <article
              key={entry.category}
              className="rounded-3xl border border-brand-100 bg-white/95 p-6 shadow-[var(--shadow-elevated)]"
            >
              <h3 className="text-lg font-semibold text-brand-900">{entry.category}</h3>
              <p className="mt-3 text-sm text-gray-700">{entry.summary}</p>
              <Link
                href={entry.href}
                className="mt-4 inline-flex text-sm font-semibold text-brand-800 hover:text-brand-900"
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
        <div className="grid gap-6 md:grid-cols-2">
          {eventsContent.galleries.map((gallery) => (
            <article
              key={gallery.type}
              className="rounded-3xl border border-brand-100 bg-white/95 p-6 shadow-[var(--shadow-elevated)]"
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

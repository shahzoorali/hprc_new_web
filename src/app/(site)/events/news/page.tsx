import Image from "next/image";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { eventsContent } from "@/content/events";

export default function NewsPage() {
  const newsSummary = eventsContent.media.find((item) => item.category === "News");

  return (
    <div className="space-y-16 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Media"
          title="The Press"
          description={newsSummary?.summary ?? "Club announcements and press releases."}
          actions={[
            { label: "Contact Media Team", href: "mailto:info@hprc.co.in", variant: "primary" },
          ]}
          backgroundImage="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=1920&q=80"
        />
      </div>

      <section className="container">
        <SectionHeading
          eyebrow="Latest News"
          title="HPRC in the Press"
          description="Stay updated with the latest news, tournament results, and achievements from Hyderabad Polo & Riding Club."
        />
      </section>

      <section className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {eventsContent.news.map((article, index) => {
            // Use image from source article, fallback to stock image if not available
            const imageUrl =
              article.imageUrl ||
              "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&q=80";
            return (
              <article
                key={index}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
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

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <time dateTime={article.date}>{article.date}</time>
                    <span>•</span>
                    <span className="font-medium">{article.source}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-3 leading-tight line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-bold text-brand-500 hover:text-brand-600 transition-colors group/link"
                  >
                    Read Full Article
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
      </section>

      <section className="container">
        <div className="rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50/50 to-white p-8 sm:p-10 shadow-lg">
          <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Media Inquiries</h3>
          <p className="text-gray-600 mb-6">
            For press releases, interview requests, or media partnerships, please contact our media
            team.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:info@hprc.co.in"
              className="inline-flex items-center rounded-full bg-brand-500 px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-brand-600 hover:shadow-lg hover:-translate-y-0.5"
            >
              Contact Media Team
            </a>
            <a
              href="/events"
              className="inline-flex items-center rounded-full border-2 border-brand-300 bg-white px-6 py-3 text-sm font-bold text-brand-600 transition-all duration-300 hover:bg-brand-50"
            >
              View All Events
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

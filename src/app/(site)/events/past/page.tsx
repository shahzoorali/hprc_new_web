import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPastEvents } from "@/lib/events";

export default async function PastEventsPage() {
  const pastHighlights = await getPastEvents();
  return (
    <div className="space-y-12 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Events"
          title="Past events"
          description="Relive marquee tournaments, equestrian showcases, and club celebrations that have defined HPRC over the years."
          actions={[
            { label: "View Upcoming Events", href: "/events/upcoming", variant: "outline" },
          ]}
        />
      </div>

      <section className="container space-y-8">
        <SectionHeading
          eyebrow="Archive"
          title="Past Event Highlights"
          description="Explore standout initiatives and tournaments that continue to elevate Hyderabad's equestrian scene."
          align="left"
        />
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
          {pastHighlights.map((highlight, index) => {
            // Get event image based on highlight data or link
            const getEventImage = (h: typeof highlight, i: number) => {
              if (h.image) return h.image;
              const link = h.link;
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
              const fallbackImages = [
                "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&q=80",
                "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
              ];
              return fallbackImages[i % fallbackImages.length];
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
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="mt-2 sm:mt-3 text-xl sm:text-2xl font-extrabold text-gray-900 group-hover:text-brand-600 transition-colors">
                      {highlight.title}
                    </h3>
                    <p className="mt-3 sm:mt-4 text-sm text-gray-700 leading-relaxed">
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
      </section>

      <section className="container space-y-4 text-sm text-gray-700">
        <p>
          Additional highlights include the Hyderabad Polo and Riding Club International Arena Polo
          Cup, and collaborative showcases with leading academies. Comprehensive archives with
          photos, results, and press releases are available for each event.
        </p>
      </section>
    </div>
  );
}

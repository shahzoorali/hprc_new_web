import Link from "next/link";
import Image from "next/image";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { eventsContent } from "@/content/events";

export default function PastEventsPage() {
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
          {eventsContent.pastHighlights.map((highlight) => (
            <Link
              key={highlight.title}
              href={highlight.link}
              className="group relative overflow-hidden rounded-[2.5rem] border border-brand-100 bg-white/95 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute right-0 top-0 h-24 w-24 sm:h-32 sm:w-32 bg-gradient-to-br from-brand-500/10 to-brand-500/5 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative">
                <h3 className="text-lg sm:text-xl font-extrabold text-brand-900 group-hover:text-brand-600 transition-colors">
                  {highlight.title}
                </h3>
                <p className="mt-3 sm:mt-4 text-sm text-gray-700 leading-relaxed">
                  {highlight.description}
                </p>
                <div className="mt-4 sm:mt-6 inline-flex items-center text-xs sm:text-sm font-bold text-brand-500 hover:text-brand-600 transition-colors group/link">
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container space-y-4 text-sm text-gray-700">
        <p>
          Additional highlights include the Hyderabad Polo and Riding Club International Arena Polo Cup,
          and collaborative showcases with leading academies. Comprehensive archives with photos, results,
          and press releases are available for each event.
        </p>
      </section>
    </div>
  );
}

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
        />
      </div>

      <section className="container space-y-10">
        <SectionHeading
          eyebrow="Upcoming"
          title="Featured events"
          description="Mark your calendar and experience the thrill of equestrian sport and club celebrations."
          align="left"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {eventsContent.upcoming.map((event) => (
            <article
              key={event.title}
              className="rounded-[2.5rem] border border-brand-100 bg-white/95 p-8 shadow-[var(--shadow-elevated)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">
                {event.date}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-brand-900">{event.title}</h2>
              <p className="mt-4 text-sm text-gray-700">{event.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container space-y-6">
        <SectionHeading
          eyebrow="Highlights"
          title="Recent milestones"
          description="Explore standout initiatives that continue to elevate Hyderabad’s equestrian scene."
          align="left"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {eventsContent.pastHighlights.map((highlight) => (
            <article
              key={highlight.title}
              className="rounded-3xl border border-brand-100 bg-white/95 p-6 shadow-[var(--shadow-elevated)]"
            >
              <h3 className="text-lg font-semibold text-brand-900">{highlight.title}</h3>
              <p className="mt-3 text-sm text-gray-700">{highlight.description}</p>
              <Link
                href={highlight.link}
                className="mt-4 inline-flex text-sm font-semibold text-brand-800 hover:text-brand-900"
              >
                Read more &rarr;
              </Link>
            </article>
          ))}
        </div>
      </section>

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

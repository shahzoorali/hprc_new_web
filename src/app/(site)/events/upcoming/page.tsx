import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { eventsContent } from "@/content/events";

export default function UpcomingEventsPage() {
  return (
    <div className="space-y-12 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Events"
          title="Upcoming events"
          description="Stay updated on tournaments, leagues, clinics, and member socials scheduled at HPRC."
          actions={[{ label: "Register Interest", href: "/contact", variant: "primary" }]}
        />
      </div>
      <section className="container space-y-6">
        {eventsContent.upcoming.length === 0 && (
          <div className="border border-brand-100 bg-white/95 p-8 text-center shadow-[var(--shadow-elevated)]">
            <p className="text-gray-700">
              No upcoming events are scheduled right now. Check back soon, or view our{" "}
              <Link href="/events/past" className="font-semibold text-brand-600 underline underline-offset-2 hover:text-brand-800">
                past events
              </Link>
              .
            </p>
          </div>
        )}
        {eventsContent.upcoming.map((event) => (
          <article
            key={event.title}
            className=" border border-brand-100 bg-white/95 p-6 shadow-[var(--shadow-elevated)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">
              {event.date}
            </p>
            <h2 className="mt-3 text-xl font-semibold text-brand-900">{event.title}</h2>
            <p className="mt-3 text-sm text-gray-700">{event.description}</p>
            {event.link && (
              <Link
                href={event.link}
                className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:text-brand-800 underline underline-offset-2"
              >
                View Event &amp; Register →
              </Link>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}

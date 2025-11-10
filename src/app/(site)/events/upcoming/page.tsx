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
        {eventsContent.upcoming.map((event) => (
          <article
            key={event.title}
            className="rounded-3xl border border-brand-100 bg-white/95 p-6 shadow-[var(--shadow-elevated)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">
              {event.date}
            </p>
            <h2 className="mt-3 text-xl font-semibold text-brand-900">{event.title}</h2>
            <p className="mt-3 text-sm text-gray-700">{event.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

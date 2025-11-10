import { PageHero } from "@/components/ui/page-hero";

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
      <section className="container space-y-4 text-sm text-gray-700">
        <p>
          Highlights include the Hyderabad Polo and Riding Club International Arena Polo Cup, the
          National Equestrian Competition 2016, and collaborative showcases with leading academies.
          Comprehensive archives with photos, results, and press releases will be published as part
          of the new digital experience.
        </p>
      </section>
    </div>
  );
}

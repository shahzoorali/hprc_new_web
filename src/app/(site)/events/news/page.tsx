import { PageHero } from "@/components/ui/page-hero";
import { eventsContent } from "@/content/events";

export default function NewsPage() {
  const newsSummary = eventsContent.media.find((item) => item.category === "News");

  return (
    <div className="space-y-12 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Media"
          title="Newsroom"
          description={newsSummary?.summary ?? "Club announcements and press releases."}
          actions={[
            { label: "Contact Media Team", href: "mailto:info@hprc.co.in", variant: "primary" },
          ]}
        />
      </div>
      <section className="container space-y-4 text-sm text-gray-700">
        <p>
          Browse official statements, tournament recaps, and partnership announcements. A structured
          archive with filters by year and category will be available once the content migration is
          complete.
        </p>
      </section>
    </div>
  );
}

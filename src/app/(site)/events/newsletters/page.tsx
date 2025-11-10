import { PageHero } from "@/components/ui/page-hero";
import { eventsContent } from "@/content/events";

export default function NewslettersPage() {
  const newsletterSummary = eventsContent.media.find((item) => item.category === "Newsletters");

  return (
    <div className="space-y-12 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Media"
          title="Newsletters"
          description={
            newsletterSummary?.summary ?? "Monthly recaps, highlights, and member updates."
          }
          actions={[{ label: "Subscribe", href: "/contact", variant: "primary" }]}
        />
      </div>
      <section className="container space-y-4 text-sm text-gray-700">
        <p>
          Browse past newsletter editions, download PDFs, and stay aligned with upcoming
          tournaments, training camps, and hospitality events. Archive links will be added as they
          are migrated.
        </p>
      </section>
    </div>
  );
}

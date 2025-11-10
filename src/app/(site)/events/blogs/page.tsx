import { PageHero } from "@/components/ui/page-hero";
import { eventsContent } from "@/content/events";

export default function BlogsPage() {
  const blogSummary = eventsContent.media.find((item) => item.category === "Blogs");

  return (
    <div className="space-y-12 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Media"
          title="Blogs"
          description={
            blogSummary?.summary ??
            "Insights, stories, and expert advice from HPRC coaches and members."
          }
          actions={[
            { label: "Submit a Story", href: "mailto:info@hprc.co.in", variant: "outline" },
          ]}
        />
      </div>
      <section className="container space-y-4 text-sm text-gray-700">
        <p>
          Articles on horse care, riding technique, gear recommendations, and club lifestyle updates
          will be published here. Subscribe to our newsletter to be notified when fresh stories go
          live.
        </p>
      </section>
    </div>
  );
}

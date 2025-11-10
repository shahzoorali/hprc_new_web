import { PageHero } from "@/components/ui/page-hero";
import { Timeline } from "@/components/ui/timeline";
import { aboutContent } from "@/content/about";

export default function HeritagePage() {
  return (
    <div className="space-y-16 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Heritage"
          title="Hyderabad’s polo story through the decades"
          description="From the Paigah nobles to modern-day championships, Hyderabad’s equestrian journey is woven into every stride at HPRC."
          actions={[{ label: "Plan a Club Visit", href: "/contact", variant: "primary" }]}
        />
      </div>

      <section className="container">
        <Timeline items={aboutContent.heritage} />
      </section>
    </div>
  );
}

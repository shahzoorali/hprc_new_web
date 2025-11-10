import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { hospitalityContent } from "@/content/hospitality";

export default function HospitalityPage() {
  return (
    <div className="space-y-16 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow={hospitalityContent.hero.eyebrow}
          title={hospitalityContent.hero.title}
          description={hospitalityContent.hero.description}
          actions={[{ label: "Plan an Event", href: "/contact", variant: "primary" }]}
        />
      </div>

      <section className="container space-y-10">
        <SectionHeading
          eyebrow="Venues"
          title="Spaces designed for every gathering"
          description="Select from signature restaurants, sprawling lawns, and boutique rooms that capture the essence of HPRC."
          align="left"
        />
        <div className="grid gap-8 md:grid-cols-2">
          {hospitalityContent.venues.map((venue) => (
            <article
              key={venue.name}
              className="rounded-[2.5rem] border border-brand-100 bg-white/95 p-8 shadow-[var(--shadow-elevated)]"
            >
              <h2 className="text-2xl font-semibold text-brand-900">{venue.name}</h2>
              <p className="mt-3 text-sm text-gray-600">{venue.description}</p>
              <ul className="mt-4 space-y-3 text-sm text-gray-700">
                {venue.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="container space-y-6">
        <SectionHeading
          eyebrow="Experiences"
          title="Curated hospitality for members and guests"
          description="Personalise your visit with culinary journeys, wellness add-ons, and signature celebrations."
          align="left"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {hospitalityContent.experiences.map((experience) => (
            <div
              key={experience.title}
              className="rounded-3xl border border-brand-100 bg-white/95 p-6 shadow-[var(--shadow-elevated)]"
            >
              <h3 className="text-base font-semibold text-brand-900">{experience.title}</h3>
              <p className="mt-3 text-sm text-gray-700">{experience.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

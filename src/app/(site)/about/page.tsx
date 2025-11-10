import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Timeline } from "@/components/ui/timeline";
import { aboutContent } from "@/content/about";

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow={aboutContent.hero.eyebrow}
          title={aboutContent.hero.title}
          description={aboutContent.hero.description}
          actions={[
            { label: "Meet the Leadership", href: "/about/leadership", variant: "outline" },
            { label: "Explore Programmes", href: "/programmes", variant: "primary" },
          ]}
        />
      </div>

      <section className="container">
        <SectionHeading
          eyebrow="Club Overview"
          title="Purpose-built facilities inspired by Hyderabad’s polo legacy"
          description="Since 2005, HPRC has combined equestrian excellence with refined lifestyle experiences for members and visiting teams."
          align="left"
        />
        <div className="mt-10 space-y-6 text-sm text-gray-700 md:text-base">
          {aboutContent.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aboutContent.facilities.map((facility) => (
            <div
              key={facility}
              className="rounded-3xl border border-brand-100 bg-white/95 p-6 text-sm text-gray-700 shadow-[var(--shadow-elevated)]"
            >
              {facility}
            </div>
          ))}
        </div>
      </section>

      <section className="container space-y-12">
        <SectionHeading
          eyebrow="Purpose"
          title="Mission, Vision & Values"
          description="Our guiding principles ensure every rider, athlete, and guest experiences the highest standards of care, sport, and hospitality."
          align="left"
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-brand-100 bg-white/90 p-8 shadow-[var(--shadow-elevated)]">
            <h3 className="text-lg font-semibold text-brand-900">Mission</h3>
            <p className="mt-4 text-sm text-gray-700">{aboutContent.mission}</p>
          </div>
          <div className="rounded-3xl border border-brand-100 bg-white/90 p-8 shadow-[var(--shadow-elevated)]">
            <h3 className="text-lg font-semibold text-brand-900">Vision</h3>
            <p className="mt-4 text-sm text-gray-700">{aboutContent.vision}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aboutContent.values.map((value) => (
            <div
              key={value.title}
              className="rounded-3xl border border-brand-100 bg-white/95 p-6 shadow-[var(--shadow-elevated)]"
            >
              <h4 className="text-base font-semibold text-brand-900">{value.title}</h4>
              <p className="mt-3 text-sm text-gray-700">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <SectionHeading
          eyebrow="Legacy"
          title="Polo milestones that shaped Hyderabad"
          description="From the first polo season in 1878 to international tournaments today, HPRC preserves a storied equestrian heritage."
          align="left"
        />
        <Timeline items={aboutContent.heritage} />
      </section>
    </div>
  );
}

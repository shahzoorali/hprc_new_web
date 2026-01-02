import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutContent } from "@/content/about";

export default function MissionVisionPage() {
  return (
    <div className="space-y-16 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Mission, Vision & Values"
          title="Guiding principles of Hyderabad Polo & Riding Club"
          description="Our mission, vision, and values uphold a legacy of excellence while welcoming the next generation of riders, athletes, and patrons."
          actions={[
            { label: "Meet the Leadership", href: "/about/leadership", variant: "outline" },
          ]}
        />
      </div>

      <section className="container space-y-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className=" border border-brand-100 bg-white/95 p-8 shadow-[var(--shadow-elevated)]">
            <h2 className="text-lg font-semibold text-brand-900">Mission</h2>
            <p className="mt-4 text-sm text-gray-700">{aboutContent.mission}</p>
          </div>
          <div className=" border border-brand-100 bg-white/95 p-8 shadow-[var(--shadow-elevated)]">
            <h2 className="text-lg font-semibold text-brand-900">Vision</h2>
            <p className="mt-4 text-sm text-gray-700">{aboutContent.vision}</p>
          </div>
        </div>

        <SectionHeading
          eyebrow="Values"
          title="What we stand for"
          description="Each value reflects how we care for our horses, our members, and the wider community."
          align="left"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aboutContent.values.map((value) => (
            <div
              key={value.title}
              className=" border border-brand-100 bg-white/95 p-6 shadow-[var(--shadow-elevated)]"
            >
              <h3 className="text-base font-semibold text-brand-900">{value.title}</h3>
              <p className="mt-3 text-sm text-gray-700">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

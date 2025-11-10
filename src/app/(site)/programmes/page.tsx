import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { PricingTable } from "@/components/ui/pricing-table";
import { SectionHeading } from "@/components/ui/section-heading";
import { programmesContent } from "@/content/programmes";

export default function ProgrammesPage() {
  return (
    <div className="space-y-16 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow={programmesContent.hero.eyebrow}
          title={programmesContent.hero.title}
          description={programmesContent.hero.description}
          actions={[
            { label: "Schedule a Trial Ride", href: "/contact", variant: "primary" },
            { label: "View Membership Options", href: "/membership", variant: "outline" },
          ]}
        />
      </div>

      <section className="container">
        <div className="space-y-6 text-sm text-gray-700 md:text-base">
          {programmesContent.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="container space-y-12">
        <SectionHeading
          eyebrow="Curriculum"
          title="Tailored programmes for every stage of the rider’s journey"
          description="Discover the structure, highlights, and investment for each pathway. Speak with our coaches to customise schedules for individuals, families, or competitive teams."
        />

        <div className="grid gap-10">
          {programmesContent.programmes.map((programme) => (
            <article
              key={programme.id}
              className="rounded-[2.5rem] border border-brand-100 bg-white/95 p-8 shadow-[var(--shadow-elevated)]"
              id={programme.id}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl space-y-4">
                  <h2 className="text-2xl font-semibold text-brand-900">{programme.title}</h2>
                  <p className="text-sm text-gray-600">{programme.excerpt}</p>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
                    {programme.schedule}
                  </p>
                  <ul className="mt-4 space-y-3 text-sm text-gray-700">
                    {programme.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span
                          className="mt-1 h-2 w-2 rounded-full bg-brand-500"
                          aria-hidden="true"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-4 lg:w-[320px]">
                  <Link
                    href={`/programmes/${programme.id}`}
                    className="inline-flex items-center justify-center rounded-full border border-brand-200 px-6 py-3 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
                  >
                    View Details
                  </Link>
                  {programme.pricingTables?.map((table) => (
                    <PricingTable key={table.heading} heading={table.heading} rows={table.rows} />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container space-y-10">
        <SectionHeading
          eyebrow="Ride Smart"
          title={programmesContent.knowledge.title}
          description={programmesContent.knowledge.summary}
          align="left"
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-brand-100 bg-white/95 p-8 shadow-[var(--shadow-elevated)]">
            <h3 className="text-lg font-semibold text-brand-900">Etiquette Essentials</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-700">
              {programmesContent.knowledge.etiquette.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-brand-100 bg-white/95 p-8 shadow-[var(--shadow-elevated)]">
            <h3 className="text-lg font-semibold text-brand-900">Gear Checklist</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-700">
              {programmesContent.knowledge.gear.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

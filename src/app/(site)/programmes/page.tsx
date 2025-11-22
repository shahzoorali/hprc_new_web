import Image from "next/image";
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
          backgroundImage="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1920&q=80"
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
          {programmesContent.programmes.map((programme, index) => {
            const programmeImages = [
              "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
              "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
              "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&q=80",
              "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&q=80",
              "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
            ];
            return (
              <article
                key={programme.id}
                className="group relative overflow-hidden rounded-[2.5rem] border border-brand-100 bg-white/95 shadow-[var(--shadow-elevated)] transition-all duration-300 hover:shadow-2xl"
                id={programme.id}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="relative h-64 w-full lg:h-auto lg:w-96 flex-shrink-0 overflow-hidden">
                    <Image
                      src={programmeImages[index % programmeImages.length]}
                      alt={programme.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 1024px) 100vw, 384px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent lg:bg-gradient-to-b lg:from-transparent lg:via-transparent lg:to-white/90"></div>
                  </div>
                  <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-start lg:justify-between flex-1">
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
                        <PricingTable
                          key={table.heading}
                          heading={table.heading}
                          rows={table.rows}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-br from-brand-50/30 via-white to-brand-50/20 py-16">
        <div className="container space-y-10">
          <SectionHeading
            eyebrow="Ride Smart"
            title={programmesContent.knowledge.title}
            description={programmesContent.knowledge.summary}
            align="left"
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="group relative overflow-hidden rounded-3xl border border-brand-100 bg-white/95 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/10 to-brand-500/5 text-brand-500">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold text-brand-900">Etiquette Essentials</h3>
                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                  {programmesContent.knowledge.etiquette.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-3xl border border-brand-100 bg-white/95 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/10 to-brand-500/5 text-brand-500">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold text-brand-900">Gear Checklist</h3>
                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                  {programmesContent.knowledge.gear.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

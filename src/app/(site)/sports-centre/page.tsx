import { PageHero } from "@/components/ui/page-hero";
import { PricingTable } from "@/components/ui/pricing-table";
import { SectionHeading } from "@/components/ui/section-heading";
import { sportsContent } from "@/content/sports";

export default function SportsCentrePage() {
  return (
    <div className="space-y-16 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow={sportsContent.hero.eyebrow}
          title={sportsContent.hero.title}
          description={sportsContent.hero.description}
          actions={[{ label: "View Packages", href: "#packages", variant: "primary" }]}
        />
      </div>

      <section className="container space-y-6 text-sm text-gray-700 md:text-base">
        <p>{sportsContent.overview}</p>
      </section>

      <section className="container space-y-12">
        <SectionHeading
          eyebrow="Facilities"
          title="World-class infrastructure across every sport"
          description="Book courts, schedule lessons, or participate in leagues guided by certified coaches and partner academies."
        />
        <div className="grid gap-10 lg:grid-cols-2">
          {sportsContent.facilities.map((facility) => (
            <article
              key={facility.id}
              className="rounded-[2.5rem] border border-brand-100 bg-white/95 p-8 shadow-[var(--shadow-elevated)]"
              id={facility.id}
            >
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-brand-900">{facility.name}</h2>
                <p className="text-sm text-gray-600">{facility.description}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">
                  {facility.timings}
                </p>
                <ul className="space-y-3 text-sm text-gray-700">
                  {facility.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container space-y-8">
        <SectionHeading
          eyebrow="Tariffs"
          title={sportsContent.pricing.heading}
          description="Flexible options for daily play, monthly plans, and year-round engagement. Coaching add-ons cover technique, conditioning, and tactical play."
          align="left"
        />
        <PricingTable heading={sportsContent.pricing.heading} rows={sportsContent.pricing.rows} />
        <ul className="space-y-3 text-sm text-gray-600">
          {sportsContent.pricing.notes.map((note) => (
            <li key={note} className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="container space-y-10" id="packages">
        <SectionHeading
          eyebrow="Membership Packages"
          title="Sports Centre memberships tailored to your lifestyle"
          description="Choose from Gold or Platinum tiers to unlock preferential booking windows, coaching benefits, and hospitality privileges."
          align="left"
        />
        <div className="grid gap-8 md:grid-cols-2">
          {sportsContent.packages.map((pkg) => (
            <div
              key={pkg.name}
              className="rounded-3xl border border-brand-100 bg-white/95 p-8 shadow-[var(--shadow-elevated)]"
            >
              <h3 className="text-xl font-semibold text-brand-900">{pkg.name}</h3>
              <p className="mt-3 text-sm text-gray-600">{pkg.description}</p>
              <ul className="mt-4 space-y-3 text-sm text-gray-700">
                {pkg.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="container space-y-6">
        <SectionHeading
          eyebrow="Calendar"
          title="Upcoming sports events"
          description={sportsContent.upcoming.description}
        />
      </section>
    </div>
  );
}

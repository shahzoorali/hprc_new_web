import Image from "next/image";

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
          backgroundImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80"
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
          {sportsContent.facilities.map((facility, index) => {
            const facilityImages = [
              "https://images.unsplash.com/photo-1534158914592-062992f79e47?w=800&q=80", // Tennis
              "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80", // Badminton
              "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80", // Squash
              "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80", // Swimming
              "https://images.unsplash.com/photo-1519869325930-2811486e6f9a?w=800&q=80", // Basketball
              "https://images.unsplash.com/photo-1574629810360-7efbbe237e16?w=800&q=80", // Futsal
              "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80", // Gym
              "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80", // Sauna
            ];
            return (
              <article
                key={facility.id}
                className="group relative overflow-hidden rounded-[2.5rem] border border-brand-100 bg-white/95 shadow-[var(--shadow-elevated)] transition-all duration-300 hover:shadow-2xl"
                id={facility.id}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={facilityImages[index % facilityImages.length]}
                    alt={facility.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                <div className="p-8">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold text-white relative z-10">{facility.name}</h2>
                    <p className="text-sm text-white/90 relative z-10">{facility.description}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-300 relative z-10">
                      {facility.timings}
                    </p>
                    <ul className="space-y-3 text-sm text-white/90 relative z-10">
                      {facility.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3">
                          <span
                            className="mt-1 h-2 w-2 rounded-full bg-brand-400"
                            aria-hidden="true"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
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
          {sportsContent.packages.map((pkg, index) => {
            const isGold = pkg.name.toLowerCase().includes("gold");
            return (
              <div
                key={pkg.name}
                className={`group relative overflow-hidden rounded-3xl border-2 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  isGold
                    ? "border-brand-300 bg-gradient-to-br from-brand-50/50 to-white"
                    : "border-brand-200 bg-gradient-to-br from-white to-brand-50/30"
                }`}
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 transition-all duration-500 group-hover:scale-150"></div>
                <div className="relative">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        isGold
                          ? "bg-gradient-to-br from-brand-500/20 to-brand-500/10 text-brand-600"
                          : "bg-gradient-to-br from-brand-500/10 to-brand-500/5 text-brand-500"
                      }`}
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </div>
                    <h3 className={`text-2xl font-extrabold ${isGold ? "text-brand-600" : "text-brand-900"}`}>
                      {pkg.name}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{pkg.description}</p>
                  <ul className="mt-6 space-y-3 text-sm text-gray-700">
                    {pkg.benefits.map((benefit) => (
                      <li key={benefit} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
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

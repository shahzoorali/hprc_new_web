import Image from "next/image";

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
          {hospitalityContent.venues.map((venue, index) => {
            const venueImages = [
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", // Chukkers
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", // Snaffles
              "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80", // Banquets
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", // Luxury Rooms
            ];
            return (
              <article
                key={venue.name}
                className="group relative overflow-hidden rounded-[2.5rem] border border-brand-100 bg-white/95 shadow-[var(--shadow-elevated)] transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={venueImages[index % venueImages.length]}
                    alt={venue.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-semibold text-white relative z-10">{venue.name}</h2>
                  <p className="mt-3 text-sm text-white/90 relative z-10">{venue.description}</p>
                  <ul className="mt-4 space-y-3 text-sm text-white/90 relative z-10">
                    {venue.highlights.map((highlight) => (
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
              </article>
            );
          })}
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
          {hospitalityContent.experiences.map((experience, index) => {
            const experienceImages = [
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
              "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80",
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
            ];
            return (
              <div
                key={experience.title}
                className="group relative overflow-hidden rounded-3xl border border-brand-100 bg-white/95 shadow-[var(--shadow-elevated)] transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={experienceImages[index % experienceImages.length]}
                    alt={experience.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-base font-semibold text-white relative z-10">
                    {experience.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/90 relative z-10">{experience.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

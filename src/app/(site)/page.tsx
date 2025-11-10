import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeContent } from "@/content/home";

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow={homeContent.hero.eyebrow}
          title={homeContent.hero.title}
          description={homeContent.hero.description}
          actions={homeContent.hero.actions}
        />
      </div>

      <section className="container">
        <SectionHeading
          eyebrow="Discover"
          title="A club shaped by sport, heritage, and hospitality"
          description="Every experience at HPRC is crafted to balance athletic excellence with community warmth. Explore the pillars that define the club."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {homeContent.pillars.map((pillar) => (
            <Link
              key={pillar.title}
              href={pillar.href}
              className="group relative rounded-3xl border border-brand-100 bg-white/90 p-8 shadow-[var(--shadow-elevated)] transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="absolute right-6 top-6 h-12 w-12 rounded-full bg-brand-100 text-brand-900 opacity-0 transition group-hover:opacity-100" />
              <h3 className="text-xl font-semibold text-brand-900">{pillar.title}</h3>
              <p className="mt-3 text-sm text-gray-600">{pillar.description}</p>
              <span className="mt-6 inline-flex items-center text-sm font-semibold text-brand-700">
                Explore
                <svg className="ml-2 h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M4 8h8m0 0L9.333 5.333M12 8l-2.667 2.667"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container">
        <SectionHeading
          eyebrow="Highlights"
          title="Championing polo, equestrian sport, and community impact"
          description="HPRC’s initiatives go beyond the arena—fostering international partnerships, nurturing young riders, and celebrating Hyderabad’s equestrian history."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {homeContent.highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-brand-100 bg-white/95 p-6 shadow-[var(--shadow-elevated)]"
            >
              <h3 className="text-lg font-semibold text-brand-900">{item.title}</h3>
              <p className="mt-3 text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="rounded-[2.5rem] border border-brand-100 bg-gradient-to-r from-brand-50 via-white to-brand-100/50 p-10 shadow-[var(--shadow-elevated)] lg:flex lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-600">
              Events Spotlight
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-900">
              {homeContent.spotlight.title}
            </h2>
            <p className="mt-4 text-sm text-gray-600">{homeContent.spotlight.description}</p>
          </div>
          <Link
            href={homeContent.spotlight.cta.href}
            className="mt-8 inline-flex rounded-full bg-brand-800 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-900/30 transition hover:bg-brand-900 lg:mt-0"
          >
            {homeContent.spotlight.cta.label}
          </Link>
        </div>
      </section>

      <section className="container">
        <SectionHeading
          eyebrow="Members Say"
          title="A community that rides, competes, and celebrates together"
          description="Testimonials from members who experience the club across riding, sports, family time, and international tournaments."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {homeContent.testimonials.map((testimonial) => (
            <div
              key={testimonial.quote}
              className="rounded-3xl border border-brand-100 bg-white/90 p-8 shadow-[var(--shadow-elevated)]"
            >
              <p className="text-base text-gray-700">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-semibold text-brand-800">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

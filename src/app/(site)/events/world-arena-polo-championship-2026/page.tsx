import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { CountryBadge } from "@/components/ui/country-badge";
import { TournamentCard } from "@/components/ui/tournament-card";
import { EventSchedule } from "@/components/ui/event-schedule";
import { EventContactForm } from "@/components/ui/event-contact-form";
import { worldArenaPoloChampionship2026 } from "@/content/world-arena-polo-championship-2026";

export const metadata = {
  title: "HPRC World Arena Polo Championship 2026 | Hyderabad Polo & Riding Club",
  description:
    "Join us for the HPRC World Arena Polo Championship 2026 in Hyderabad. A week-long celebration of world-class arena polo featuring teams from USA, India, Germany, France, and Luxembourg.",
};

export default function WorldArenaPoloChampionship2026Page() {
  const { hero, overview, keyInfo, countries, tournaments, schedule, officials, hospitality, media, objectives, legacy } =
    worldArenaPoloChampionship2026;

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <div className="container pt-12">
        <PageHero
          eyebrow="World Championship"
          title={hero.title}
          description={`${hero.dates} • ${hero.venue}`}
          actions={[
            { label: "Register Interest", href: "#contact", variant: "primary" },
            { label: "View Schedule", href: "#schedule", variant: "outline" },
          ]}
          backgroundImage="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=1920&q=80"
        />
      </div>

      {/* Event Overview */}
      <section className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-50/50 via-white to-brand-50/30 p-8 md:p-12 border border-brand-100/50 shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(227,30,36,0.05),transparent_50%)]"></div>
          <div className="relative space-y-6">
            <SectionHeading
              eyebrow="About the Championship"
              title="A Global Celebration of Arena Polo"
              align="left"
            />
            <div className="space-y-4 text-base text-gray-700 md:text-lg leading-relaxed">
              <p>{overview.background}</p>
              <p>{overview.rationale}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Information Cards */}
      <section className="container">
        <SectionHeading
          eyebrow="Event Details"
          title="Championship Information"
          description="Essential information about dates, venue, and match timings"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="group relative overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/30 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-600 transition-transform duration-300 group-hover:scale-110">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-bold text-brand-900">Dates</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{keyInfo.dates}</p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/30 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-600 transition-transform duration-300 group-hover:scale-110">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-bold text-brand-900">Venue</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{keyInfo.venue}</p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/30 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-600 transition-transform duration-300 group-hover:scale-110">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-bold text-brand-900">Match Timings</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{keyInfo.timings}</p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/30 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-600 transition-transform duration-300 group-hover:scale-110">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-bold text-brand-900">Format</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{keyInfo.format}</p>
          </div>
        </div>
      </section>

      {/* Participating Countries */}
      <section className="bg-gradient-to-br from-brand-50/30 via-white to-brand-50/20 py-16">
        <div className="container">
          <SectionHeading
            eyebrow="International Participation"
            title="Participating Countries"
            description="Top arena polo teams from around the world"
          />
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {countries.map((country) => (
              <CountryBadge key={country.code} country={country} size="lg" />
            ))}
          </div>
        </div>
      </section>

      {/* Championship Structure */}
      <section className="container" id="tournaments">
        <SectionHeading
          eyebrow="Tournament Structure"
          title="Championship Tournaments"
          description="Four exciting tournaments showcasing the best of international arena polo"
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {tournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </section>

      {/* Day-wise Programme */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-brand-50/40 via-white to-brand-50/20 py-20"
        id="schedule"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-brand-500/5 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-brand-500/5 blur-3xl"></div>
        </div>
        
        <div className="container relative">
          <SectionHeading
            eyebrow="Event Schedule"
            title="Day-wise Programme"
            description="Complete schedule of activities, matches, and ceremonies throughout the championship week"
          />
          <div className="mt-16">
            <EventSchedule schedule={schedule} />
          </div>
        </div>
      </section>

      {/* Technical Officials */}
      <section className="container">
        <SectionHeading
          eyebrow="Governance"
          title="Technical Officials & Committee"
          description="Experienced officials ensuring fair play and adherence to international standards"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/30 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M5.5 7.5L10 11l4-4M20 12l-2 2-4-4"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-brand-900">{officials.chiefUmpire.name}</h3>
            <p className="text-sm font-semibold text-brand-600">{officials.chiefUmpire.role}</p>
          </div>
          {officials.committee.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/30 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-brand-900">{member.name}</h3>
              <p className="text-sm font-semibold text-brand-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hospitality & Experience */}
      <section className="bg-gradient-to-br from-brand-50/30 via-white to-brand-50/20 py-16">
        <div className="container">
          <SectionHeading
            eyebrow="Premium Experience"
            title="Hospitality & Spectator Experience"
            description="Exceptional experiences for guests, sponsors, and spectators"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {hospitality.features.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/30 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-600 transition-transform duration-300 group-hover:scale-110">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-bold text-brand-900">{feature.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media & Branding Opportunities */}
      <section className="container">
        <SectionHeading
          eyebrow="Partnership Opportunities"
          title="Media & Branding Opportunities"
          description="Comprehensive branding and media coverage options for sponsors"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {media.opportunities.map((opportunity, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/30 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-600 transition-transform duration-300 group-hover:scale-110">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-brand-900">{opportunity.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{opportunity.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Objectives & Legacy */}
      <section className="bg-gradient-to-br from-brand-50/30 via-white to-brand-50/20 py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Our Goals"
                title="Championship Objectives"
                align="left"
              />
              <ul className="mt-8 space-y-4">
                {objectives.map((objective, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="mt-1.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-brand-500"></div>
                    </div>
                    <span className="text-sm md:text-base text-gray-700 leading-relaxed">
                      {objective}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading
                eyebrow="Long-term Impact"
                title="Expected Legacy"
                align="left"
              />
              <ul className="mt-8 space-y-4">
                {legacy.map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="mt-1.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-brand-500"></div>
                    </div>
                    <span className="text-sm md:text-base text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container" id="contact">
        <SectionHeading
          eyebrow="Get Involved"
          title="Contact Us"
          description="Interested in sponsorship, tickets, or media coverage? Get in touch with us."
        />
        <div className="mt-12">
          <EventContactForm />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=1920&q=80"
            alt="Polo championship"
            fill
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500/95 via-brand-600/95 to-brand-500/95"></div>
        </div>
        <div className="container relative z-10 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Join Us for the World Arena Polo Championship 2026
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-lg text-white/95 leading-relaxed">
            Experience world-class arena polo, international competition, and exceptional
            hospitality in the heart of Hyderabad.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#contact"
              className="inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-bold text-brand-500 shadow-xl transition-all duration-300 hover:bg-gray-50 hover:shadow-2xl hover:-translate-y-1"
            >
              Register Interest
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border-2 border-white px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-white/10"
            >
              General Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


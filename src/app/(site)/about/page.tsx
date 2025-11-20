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
          backgroundImage="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1920&q=80"
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
          {aboutContent.facilities.map((facility, index) => {
            const facilityIcons = [
              <svg key="0" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>,
              <svg key="1" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>,
              <svg key="2" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>,
            ];
            return (
              <div
                key={facility}
                className="group relative overflow-hidden rounded-3xl border border-brand-100 bg-white/95 p-6 text-sm text-gray-700 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 transition-all duration-500 group-hover:scale-150"></div>
                <div className="relative flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/10 to-brand-500/5 text-brand-500">
                    {facilityIcons[index % facilityIcons.length]}
                  </div>
                  <p className="flex-1 font-medium">{facility}</p>
                </div>
              </div>
            );
          })}
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
          <div className="group relative overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/30 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 transition-all duration-500 group-hover:scale-150"></div>
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/10 to-brand-500/5 text-brand-500">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-brand-900">Mission</h3>
              <p className="mt-4 text-sm text-gray-700 leading-relaxed">{aboutContent.mission}</p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/30 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 transition-all duration-500 group-hover:scale-150"></div>
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/10 to-brand-500/5 text-brand-500">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-brand-900">Vision</h3>
              <p className="mt-4 text-sm text-gray-700 leading-relaxed">{aboutContent.vision}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aboutContent.values.map((value, index) => {
            const valueIcons = [
              <svg key="0" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>,
              <svg key="1" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>,
              <svg key="2" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>,
            ];
            return (
              <div
                key={value.title}
                className="group relative overflow-hidden rounded-3xl border border-brand-100 bg-white/95 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 transition-all duration-500 group-hover:scale-150"></div>
                <div className="relative">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/10 to-brand-500/5 text-brand-500">
                    {valueIcons[index % valueIcons.length]}
                  </div>
                  <h4 className="text-lg font-extrabold text-brand-900">{value.title}</h4>
                  <p className="mt-3 text-sm text-gray-700 leading-relaxed">{value.description}</p>
                </div>
              </div>
            );
          })}
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

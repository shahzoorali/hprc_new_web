import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Timeline } from "@/components/ui/timeline";
import { aboutContent } from "@/content/about";

export default function AboutPage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Enhanced Hero Section */}
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

      {/* Enhanced Overview Section */}
      <section className="container space-y-12">
        <SectionHeading
          eyebrow="Club Overview"
          title="Purpose-built facilities inspired by Hyderabad's polo legacy"
          description="Since 2005, HPRC has combined equestrian excellence with refined lifestyle experiences for members and visiting teams."
          align="left"
        />
        
        {/* Overview Content */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-50/50 via-white to-brand-50/30 p-8 md:p-12 border border-brand-100/50 shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(227,30,36,0.05),transparent_50%)]"></div>
          <div className="relative space-y-6 text-base text-gray-700 md:text-lg leading-relaxed">
            {aboutContent.overview.map((paragraph, idx) => (
              <p 
                key={paragraph} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Enhanced Facilities Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aboutContent.facilities.map((facility, index) => {
            const facilityIcons = [
              <svg
                key="0"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>,
              <svg
                key="1"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>,
              <svg
                key="2"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>,
            ];
            return (
              <div
                key={facility}
                className="group relative overflow-hidden rounded-2xl border border-brand-100/80 bg-white/95 backdrop-blur-sm p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-brand-200"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {facilityIcons[index % facilityIcons.length]}
                  </div>
                  <p className="flex-1 font-medium text-sm md:text-base text-gray-700 leading-relaxed">{facility}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Enhanced Mission, Vision & Values Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50/40 via-white to-brand-50/30 py-16">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-brand-500/5 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-brand-500/5 blur-3xl"></div>
        </div>

        <div className="container relative space-y-12">
          <SectionHeading
            eyebrow="Purpose"
            title="Mission, Vision & Values"
            description="Our guiding principles ensure every rider, athlete, and guest experiences the highest standards of care, sport, and hospitality."
            align="left"
          />

          {/* Mission & Vision Cards */}
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-brand-100/80 bg-white/95 backdrop-blur-sm p-10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-200">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 transition-all duration-700 group-hover:scale-150 group-hover:from-brand-500/20"></div>
              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-600 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-900 mb-4">Mission</h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{aboutContent.mission}</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-brand-100/80 bg-white/95 backdrop-blur-sm p-10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-200">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 transition-all duration-700 group-hover:scale-150 group-hover:from-brand-500/20"></div>
              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-600 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-900 mb-4">Vision</h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{aboutContent.vision}</p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div>
            <h3 className="text-xl font-bold text-brand-900 mb-8 text-center">Our Core Values</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {aboutContent.values.map((value, index) => {
                const valueIcons = [
                  <svg
                    key="0"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>,
                  <svg
                    key="1"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>,
                  <svg
                    key="2"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>,
                ];
                return (
                  <div
                    key={value.title}
                    className="group relative overflow-hidden rounded-2xl border border-brand-100/80 bg-white/95 backdrop-blur-sm p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-brand-200"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        {valueIcons[index % valueIcons.length]}
                      </div>
                      <h4 className="text-lg font-bold text-brand-900 mb-3">{value.title}</h4>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Timeline Section */}
      <section className="container space-y-12">
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

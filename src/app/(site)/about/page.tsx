import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Timeline } from "@/components/ui/timeline";
import { aboutContent } from "@/content/about";

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-24">
      {/* Enhanced Hero Section */}
      <div className="container pt-16">
        <PageHero
          eyebrow={aboutContent.hero.eyebrow}
          title={aboutContent.hero.title}
          description={aboutContent.hero.description}
          actions={[
            { label: "Meet Our Team", href: "/about/leadership", variant: "outline" },
            { label: "Explore Programmes", href: "/programmes", variant: "primary" },
          ]}
          backgroundImage="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1920&q=80"
        />
      </div>

      {/* Statistics Bar - Positioned Below Hero with Overlap */}
      <div className="container -mt-16 md:-mt-20 relative z-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15),transparent_70%)]"></div>
          <div className="relative grid grid-cols-2 gap-8 p-8 md:gap-12 md:p-12 lg:grid-cols-4">
            <div className="text-center space-y-2 group">
              <p className="text-4xl md:text-5xl font-bold text-white font-display group-hover:scale-110 transition-transform duration-300">20</p>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-200">Years of Excellence</p>
            </div>
            <div className="text-center space-y-2 group">
              <p className="text-4xl md:text-5xl font-bold text-white font-display group-hover:scale-110 transition-transform duration-300">50+</p>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-200">Horses</p>
            </div>
            <div className="text-center space-y-2 group">
              <p className="text-4xl md:text-5xl font-bold text-white font-display group-hover:scale-110 transition-transform duration-300">10</p>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-200">Acres Estate</p>
            </div>
            <div className="text-center space-y-2 group">
              <p className="text-4xl md:text-5xl font-bold text-white font-display group-hover:scale-110 transition-transform duration-300">25+</p>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-200">Championships</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Overview Section */}
      <section className="container space-y-16 pt-12">
        <SectionHeading
          eyebrow="Our Story"
          title="Where Heritage Meets Excellence"
          description="A journey of passion, dedication, and world-class equestrian experiences in the heart of Hyderabad."
          align="center"
        />
        
        <div className="relative overflow-hidden rounded-[3.5rem] bg-gradient-to-br from-brand-50/70 via-white to-brand-50/50 p-12 md:p-20 border border-brand-100/70 shadow-2xl">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-600/5 rounded-full blur-[100px]"></div>
          </div>
          
          <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            <div className="space-y-8">
              {aboutContent.overview.map((paragraph, idx) => (
                <p 
                  key={paragraph} 
                  className="text-lg md:text-xl text-gray-700 leading-relaxed font-light animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80"
                alt="HPRC Estate"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white text-sm font-semibold uppercase tracking-wider mb-2">Since 2005</p>
                <p className="text-white text-lg font-light">Nurturing Hyderabad's polo legacy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Facilities Section */}
      <section className="container space-y-16">
        <SectionHeading
          eyebrow="World-Class Amenities"
          title="Facilities Designed for Excellence"
          description="From championship polo grounds to premium lifestyle amenities, every detail is crafted for extraordinary experiences."
          align="center"
        />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {aboutContent.facilities.slice(0, 8).map((facility, index) => (
            <div
              key={facility}
              className="group relative overflow-hidden rounded-[2rem] border border-brand-100/70 bg-white/98 backdrop-blur-sm p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/4 via-transparent to-brand-500/6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-150"></div>
              
              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border border-brand-200/40 shadow-sm">
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5 16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714 2.143L13 3z" />
                  </svg>
                </div>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed font-light">{facility}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Facilities */}
        <div className="rounded-[3rem] border border-brand-100/70 bg-gradient-to-br from-brand-50/50 via-white to-brand-50/30 p-10 md:p-14 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600 mb-6 text-center">Additional Premium Amenities</p>
          <div className="grid gap-6 md:grid-cols-2">
            {aboutContent.facilities.slice(8).map((facility) => (
              <div key={facility} className="flex items-center gap-4 group">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/12 to-brand-500/4 text-brand-600 transition-all duration-300 group-hover:scale-110">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-base text-gray-700 group-hover:text-brand-800 transition-colors">{facility}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Mission, Vision & Values Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50/60 via-white to-brand-50/40 py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-500/4 blur-[150px]"></div>
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-brand-600/4 blur-[120px]"></div>
        </div>

        <div className="container relative space-y-20">
          <SectionHeading
            eyebrow="Our Purpose"
            title="Mission, Vision & Values"
            description="The principles that guide every decision, interaction, and experience at HPRC."
            align="center"
          />

          {/* Mission & Vision Cards */}
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="group relative overflow-hidden rounded-[3.5rem] border border-brand-100/70 bg-white/98 backdrop-blur-sm p-14 shadow-2xl transition-all duration-700 hover:shadow-3xl hover:-translate-y-3 hover:border-brand-200">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute right-0 top-0 h-56 w-56 rounded-bl-full bg-gradient-to-br from-brand-500/12 to-brand-500/5 transition-all duration-700 group-hover:scale-150 group-hover:from-brand-500/18"></div>
              
              <div className="relative">
                <div className="mb-10 flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-brand-500/20 to-brand-500/8 text-brand-600 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 border border-brand-200/50">
                  <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-brand-900 mb-6 font-display tracking-tight">Our Mission</h3>
                <p className="text-xl text-gray-700 leading-relaxed font-light">
                  {aboutContent.mission}
                </p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-[3.5rem] border border-brand-100/70 bg-white/98 backdrop-blur-sm p-14 shadow-2xl transition-all duration-700 hover:shadow-3xl hover:-translate-y-3 hover:border-brand-200">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute right-0 top-0 h-56 w-56 rounded-bl-full bg-gradient-to-br from-brand-500/12 to-brand-500/5 transition-all duration-700 group-hover:scale-150 group-hover:from-brand-500/18"></div>
              
              <div className="relative">
                <div className="mb-10 flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-brand-500/20 to-brand-500/8 text-brand-600 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 border border-brand-200/50">
                  <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-brand-900 mb-6 font-display tracking-tight">Our Vision</h3>
                <p className="text-xl text-gray-700 leading-relaxed font-light">
                  {aboutContent.vision}
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div>
            <h3 className="text-3xl font-bold text-brand-900 mb-14 text-center font-display tracking-tight">Core Values That Define Us</h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {aboutContent.values.map((value, index) => (
                <div
                  key={value.title}
                  className="group relative overflow-hidden rounded-[2.5rem] border border-brand-100/70 bg-white/98 backdrop-blur-sm p-10 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-200"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500/4 via-transparent to-brand-500/6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-brand-500/12 to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-150"></div>
                  
                  <div className="relative">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/18 to-brand-500/8 text-brand-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border border-brand-200/40 shadow-md">
                      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-brand-900 mb-4 font-display tracking-tight">{value.title}</h4>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed font-light">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Timeline Section */}
      <section className="container space-y-16">
        <SectionHeading
          eyebrow="Our Legacy"
          title="A Storied Timeline of Excellence"
          description="From the first polo season in 1878 to becoming India's premier equestrian destination."
          align="center"
        />
        <Timeline items={aboutContent.heritage} />
      </section>

      {/* Leadership Preview Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[200px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-600/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="container relative">
          <SectionHeading
            eyebrow="Leadership"
            title="Visionary Team"
            description="Meet the passionate individuals driving HPRC's legacy forward."
            align="center"
            className="text-white [&_p]:text-white/80 [&_h3]:text-white"
          />
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {aboutContent.leadership.slice(0, 3).map((leader) => (
              <div
                key={leader.name}
                className="group relative overflow-hidden rounded-[2.5rem] bg-white/10 backdrop-blur-md border border-white/10 p-8 transition-all duration-500 hover:bg-white/15 hover:border-white/20 hover:-translate-y-2"
              >
                <div className="relative z-10">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-3xl font-bold text-white shadow-2xl">
                    {leader.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2 font-display">{leader.name}</h4>
                  <p className="text-brand-200 text-sm font-semibold uppercase tracking-wider mb-4">{leader.role}</p>
                  <p className="text-white/80 text-base leading-relaxed font-light">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/about/leadership"
              className="inline-flex items-center gap-3 rounded-full bg-white text-brand-900 px-8 py-4 font-semibold shadow-2xl transition-all duration-300 hover:bg-brand-50 hover:scale-105 hover:shadow-3xl"
            >
              <span>View All Leadership</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Call-to-Action Section */}
      <section className="container">
        <div className="relative overflow-hidden rounded-[3.5rem] bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-[100px]"></div>
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-[80px]"></div>
          </div>
          
          <div className="relative p-12 md:p-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display tracking-tight">
              Experience Excellence
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
              Join a community that celebrates heritage, champions excellence, and creates unforgettable experiences in the world of polo and equestrian sports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/membership/apply"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-brand-900 shadow-xl transition-all duration-300 hover:bg-brand-50 hover:scale-105 hover:shadow-2xl"
              >
                Apply for Membership
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:bg-white hover:text-brand-900 hover:scale-105"
              >
                Schedule a Visit
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

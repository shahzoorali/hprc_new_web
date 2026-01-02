import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Timeline } from "@/components/ui/timeline";
import { aboutContent } from "@/content/about";

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-24">
      {/* Enhanced Hero Section */}
      <div className="container pt-12 sm:pt-16">
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
      <div className="container -mt-12 sm:-mt-16 md:-mt-20 relative z-20">
        <div className="relative overflow-hidden bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15),transparent_70%)]"></div>
          <div className="relative grid grid-cols-2 gap-4 sm:gap-8 p-6 sm:p-8 md:gap-12 md:p-12 lg:grid-cols-4">
            <div className="text-center space-y-1.5 sm:space-y-2 group">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display group-hover:scale-110 transition-transform duration-300">20</p>
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-brand-200">Years of Excellence</p>
            </div>
            <div className="text-center space-y-1.5 sm:space-y-2 group">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display group-hover:scale-110 transition-transform duration-300">50+</p>
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-brand-200">Horses</p>
            </div>
            <div className="text-center space-y-1.5 sm:space-y-2 group">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display group-hover:scale-110 transition-transform duration-300">10</p>
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-brand-200">Acres Estate</p>
            </div>
            <div className="text-center space-y-1.5 sm:space-y-2 group">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display group-hover:scale-110 transition-transform duration-300">25+</p>
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-brand-200">Championships</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section - Modern Minimalist with Glassmorphism */}
      <section className="py-16 sm:py-24">
        {/* Section Header with Animated Line */}
        <div className="container mb-12 sm:mb-16">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-900 font-display tracking-tight text-center">
                Our Story
              </h2>
              {/* Animated underline */}
              <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center max-w-2xl mx-auto">
              Where heritage meets excellence in the heart of Hyderabad
            </p>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="container grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Left Column - Story Content */}
          <div className="space-y-8 sm:space-y-12">
            {aboutContent.overview.map((paragraph, idx) => (
              <div key={paragraph} className="group">
                {/* Glass Card */}
                <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-brand-100/50 p-6 sm:p-8 md:p-10 transition-all duration-500 hover:bg-white/90 hover:border-brand-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500/0 via-transparent to-brand-500/0 group-hover:from-brand-500/5 group-hover:to-brand-500/8 transition-all duration-500"></div>

                  {/* Content */}
                  <div className="relative">
                    {/* Number Indicator */}
                    <div className="mb-4 sm:mb-6 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700 text-sm sm:text-base font-bold font-display border-2 border-brand-300">
                      {String(idx + 1).padStart(2, '0')}
                    </div>

                    <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Visual Elements */}
          <div className="space-y-8 sm:space-y-12">
            {/* Main Image Card */}
            <div className="relative overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80"
                alt="HPRC Estate"
                className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-transparent to-transparent"></div>

              {/* Floating Info Badge */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 sm:px-5 sm:py-3 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl sm:text-3xl font-bold text-brand-700 font-display leading-none">20</span>
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">Years</span>
                  </div>
                  <div className="h-px w-8 bg-gray-300"></div>
                  <span className="text-sm sm:text-base font-semibold text-brand-600">Since 2005</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-700 p-5 sm:p-6 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <p className="text-3xl sm:text-4xl font-bold font-display leading-none">10</p>
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/80">Acres</p>
              </div>
              <div className="relative overflow-hidden bg-white border-2 border-brand-200 p-5 sm:p-6 transition-all duration-300 hover:border-brand-500 hover:scale-105 hover:shadow-xl">
                <p className="text-3xl sm:text-4xl font-bold text-brand-700 font-display leading-none">50+</p>
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">Horses</p>
              </div>
              <div className="relative overflow-hidden bg-white border-2 border-brand-200 p-5 sm:p-6 transition-all duration-300 hover:border-brand-500 hover:scale-105 hover:shadow-xl">
                <p className="text-3xl sm:text-4xl font-bold text-brand-700 font-display leading-none">25+</p>
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">Titles</p>
              </div>
              <div className="relative overflow-hidden bg-brand-50 p-5 sm:p-6 transition-all duration-300 hover:bg-brand-100">
                <p className="text-3xl sm:text-4xl font-bold text-brand-700 font-display leading-none">∞</p>
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">Legacy</p>
              </div>
            </div>

            {/* Quote Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-brand-50 to-white p-6 sm:p-8 border border-brand-200/50">
              <div className="absolute top-2 right-2 w-16 h-16 bg-brand-500/5 rounded-full blur-xl"></div>
              <div className="relative">
                <svg className="h-8 w-8 text-brand-400 mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 21C14.017 21 7.398 21 7.398 14C7.398 6.244 14.017 3 14.017 3C19.658 3 23.982 8.552 24 14.017 24C24 19.658 19.658 21 14.017 21ZM8.017 14C8.017 16.347 9.636 18.316 11.588 19.848L14.017 17.017L16.446 19.848C18.398 18.316 20.017 16.347 20.017 14C20.017 11.653 19.658 9.316 18.316 7.285 16.446 14.017 14L11.588 16.446C9.636 18.316 8.017 16.347 8.017 14Z" />
                </svg>
                <p className="text-base sm:text-lg md:text-xl text-brand-800 font-serif italic leading-relaxed">
                  Excellence is not just about skill—it's about passion, dedication, and the relentless pursuit of perfection.
                </p>
                <p className="mt-4 text-sm sm:text-base font-semibold text-brand-600">
                  — The HPRC Way
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* World-Class Amenities Section - Stock Images, No CTAs */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-brand-50/30 via-white to-brand-50/20">
        {/* Section Header */}
        <div className="container mb-12 sm:mb-16">
          <div className="relative">
            <div className="absolute -top-8 -left-4 w-16 h-16 sm:w-20 sm:h-20 bg-brand-500/10 rounded-full blur-2xl"></div>
            <div className="absolute -top-4 right-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-brand-600/10 rounded-full blur-xl"></div>

            <div className="relative flex flex-col items-center space-y-6 sm:space-y-8">
              <span className="inline-flex items-center gap-3 px-6 py-2 sm:px-8 sm:py-2.5 bg-white border-2 border-brand-600 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-700 shadow-lg">
                <div className="w-2 h-2 bg-brand-600 rounded-full"></div>
                World-Class Amenities
                <div className="w-2 h-2 bg-brand-600 rounded-full"></div>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-900 text-center leading-tight">
                Premium Facilities
              </h2>
              <p className="text-base sm:text-lg text-gray-600 text-center max-w-2xl mx-auto">
                Every detail crafted for extraordinary experiences
              </p>
            </div>
          </div>
        </div>

        {/* Facilities Grid with Stock Images */}
        <div className="container">
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-2 lg:grid-cols-4">
            {aboutContent.facilities.slice(0, 8).map((facility, index) => {
              const facilityImages = [
                'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80', // Riding Arena
                'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80', // Polo Field
                'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80', // Stables
                'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80', // Restaurant
                'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80', // Pool/Recreation
                'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80', // Conference Room
                'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80', // Gardens
                'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80', // Parking
              ];

              return (
                <div
                  key={facility}
                  className="group relative overflow-hidden bg-white shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Colored Accent Bar */}
                  <div className={`h-1.5 transition-all duration-500 group-hover:h-2 ${
                    index % 2 === 0 ? 'bg-gradient-to-r from-brand-600 to-brand-500' :
                    index % 2 === 1 ? 'bg-gradient-to-r from-brand-500 to-400' :
                    'bg-gradient-to-r from-brand-700 to-brand-600'
                  }`}></div>

                  <div className="p-0">
                    {/* Stock Image */}
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <img
                        src={facilityImages[index % facilityImages.length]}
                        alt={facility}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-transparent"></div>

                      {/* Facility Name Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-brand-900/90 via-brand-900/70 to-transparent">
                        <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold leading-tight text-center">
                          {facility}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Amenities - Staggered Grid with Images */}
          <div className="mt-8 sm:mt-12">
            <div className="relative mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-brand-900 text-center mb-6">
                Additional Premium Services
              </h3>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl"></div>
            </div>

            <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
              {aboutContent.facilities.slice(8).map((facility, index) => {
                const additionalImages = [
                  'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80',
                  'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80',
                  'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80',
                  'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80',
                ];

                return (
                  <div
                    key={facility}
                    className="group relative overflow-hidden bg-white border border-brand-200 transition-all duration-300 hover:border-brand-600 hover:shadow-xl"
                  >
                    <div className="p-0">
                      {/* Stock Image */}
                      <div className="relative h-32 sm:h-40 overflow-hidden">
                        <img
                          src={additionalImages[index % additionalImages.length]}
                          alt={facility}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-transparent"></div>

                        {/* Facility Name Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-brand-900/90 via-brand-900/70 to-transparent">
                          <p className="text-white text-sm sm:text-base font-semibold leading-tight text-center">
                            {facility}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mission, Vision & Values Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50/60 via-white to-brand-50/40 py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px]  bg-brand-500/4 blur-[150px]"></div>
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px]  bg-brand-600/4 blur-[120px]"></div>
        </div>

        <div className="container relative space-y-20">
          <SectionHeading
            eyebrow="Our Purpose"
            title="Mission, Vision & Values"
            description="The principles that guide every decision, interaction, and experience at HPRC."
            align="center"
          />

          {/* Mission & Vision Cards */}
          <div className="grid gap-6 sm:gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-2">
            <div className="group relative overflow-hidden rounded-[2.5rem] sm:rounded-[3.5rem] border border-brand-100/70 bg-white/98 backdrop-blur-sm p-8 sm:p-14 shadow-2xl transition-all duration-700 hover:shadow-3xl hover:-translate-y-3 hover:border-brand-200">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute right-0 top-0 h-40 w-40 sm:h-56 sm:w-56  bg-gradient-to-br from-brand-500/12 to-brand-500/5 transition-all duration-700 group-hover:scale-150 group-hover:from-brand-500/18"></div>

              <div className="relative">
                <div className="mb-6 sm:mb-10 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center ' sm:rounded-[2.5rem] bg-gradient-to-br from-brand-500/20 to-brand-500/8 text-brand-600 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 border border-brand-200/50">
                  <svg className="h-10 w-10 sm:h-12 sm:w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-brand-900 mb-6 font-display tracking-tight">Our Mission</h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-light">
                  {aboutContent.mission}
                </p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-[3.5rem] border border-brand-100/70 bg-white/98 backdrop-blur-sm p-14 shadow-2xl transition-all duration-700 hover:shadow-3xl hover:-translate-y-3 hover:border-brand-200">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute right-0 top-0 h-40 w-40 sm:h-56 sm:w-56  bg-gradient-to-br from-brand-500/12 to-brand-500/5 transition-all duration-700 group-hover:scale-150 group-hover:from-brand-500/18"></div>

              <div className="relative">
                <div className="mb-6 sm:mb-10 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center ' sm:rounded-[2.5rem] bg-gradient-to-br from-brand-500/20 to-brand-500/8 text-brand-600 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 border border-brand-200/50">
                  <svg className="h-10 w-10 sm:h-12 sm:w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-brand-900 mb-6 font-display tracking-tight">Our Vision</h3>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-light">
                  {aboutContent.vision}
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-900 mb-8 sm:mb-14 text-center font-display tracking-tight">Core Values That Define Us</h3>
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {aboutContent.values.map((value, index) => (
                <div
                  key={value.title}
                  className="group relative overflow-hidden ' sm:rounded-[2.5rem] border border-brand-100/70 bg-white/98 backdrop-blur-sm p-6 sm:p-10 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-200"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500/4 via-transparent to-brand-500/6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute right-0 top-0 h-24 w-24 sm:h-32 sm:w-32  bg-gradient-to-br from-brand-500/12 to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-150"></div>

                  <div className="relative">
                    <div className="mb-4 sm:mb-6 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center  bg-gradient-to-br from-brand-500/18 to-brand-500/8 text-brand-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border border-brand-200/40 shadow-md">
                      <svg className="h-7 w-7 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-brand-900 mb-3 sm:mb-4 font-display tracking-tight">{value.title}</h4>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-light">
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
      <section className="container space-y-12 sm:space-y-16">
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
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10  blur-[200px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-600/10  blur-[150px]"></div>
        </div>

        <div className="container relative">
          <SectionHeading
            eyebrow="Leadership"
            title="Visionary Team"
            description="Meet the passionate individuals driving HPRC's legacy forward."
            align="center"
            className="text-white [&_p]:text-white/80 [&_h3]:text-white"
          />
          
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {aboutContent.leadership.slice(0, 3).map((leader) => (
              <div
                key={leader.name}
                className="group relative overflow-hidden ' sm:rounded-[2.5rem] bg-white/10 backdrop-blur-md border border-white/10 p-6 sm:p-8 transition-all duration-500 hover:bg-white/15 hover:border-white/20 hover:-translate-y-2"
              >
                <div className="relative z-10">
                  <div className="mb-4 sm:mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center  bg-gradient-to-br from-brand-500 to-brand-600 text-2xl sm:text-3xl font-bold text-white shadow-2xl">
                    {leader.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 font-display">{leader.name}</h4>
                  <p className="text-brand-200 text-[10px] sm:text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-4">{leader.role}</p>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/about/leadership"
              className="inline-flex items-center gap-3  bg-white text-brand-900 px-8 py-4 font-semibold shadow-2xl transition-all duration-300 hover:bg-brand-50 hover:scale-105 hover:shadow-3xl"
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
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/10  blur-[100px]"></div>
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10  blur-[80px]"></div>
          </div>
          
          <div className="relative p-8 sm:p-12 md:p-20 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 font-display tracking-tight">
              Experience Excellence
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-10 max-w-3xl mx-auto leading-relaxed font-light">
              Join a community that celebrates heritage, champions excellence, and creates unforgettable experiences in the world of polo and equestrian sports.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/membership/apply"
                className="inline-flex items-center justify-center gap-2  bg-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-brand-900 shadow-xl transition-all duration-300 hover:bg-brand-50 hover:scale-105 hover:shadow-2xl"
              >
                Apply for Membership
                <svg className="h-4 sm:h-5 w-4 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2  border-2 border-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white shadow-xl transition-all duration-300 hover:bg-white hover:text-brand-900 hover:scale-105"
              >
                Schedule a Visit
                <svg className="h-4 sm:h-5 w-4 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

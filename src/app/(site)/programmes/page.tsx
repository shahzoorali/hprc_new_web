import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { PricingTable } from "@/components/ui/pricing-table";
import { SectionHeading } from "@/components/ui/section-heading";
import { programmesContent } from "@/content/programmes";

export default function ProgrammesPage() {
  return (
    <div className="space-y-16 sm:space-y-20 pb-16 sm:pb-20">
      {/* Enhanced Hero Section */}
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

      {/* Overview Section - Redesigned */}
      <section className="container space-y-10 sm:space-y-16 pt-8 sm:pt-12">
        {/* Section Header */}
        <div className="text-center space-y-4 sm:space-y-6 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 sm:px-6 sm:py-2 bg-brand-100/80 border border-brand-200/50 text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-700">
            About Our Programmes
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-900 leading-tight">
            Excellence in Equestrian Training
          </h2>
        </div>

        {/* Main Content Container */}
        <div className="relative bg-white border-t-4 border-brand-500 shadow-2xl">
          {/* Decorative Top Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-brand-400 to-brand-500"></div>

          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-brand-50/20 to-white"></div>
          <div className="absolute top-0 right-0 w-full sm:w-1/2 h-full bg-gradient-to-l from-brand-500/3 to-transparent opacity-50"></div>

          {/* Content Container */}
          <div className="relative px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 sm:py-12 md:py-16 lg:py-20">
            {/* Content Grid - Responsive Layout */}
            <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2">
              {programmesContent.overview.map((paragraph, idx) => (
                <div key={paragraph} className="group relative">
                  {/* Number Badge */}
                  <div className="absolute -left-2 sm:-left-3 top-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-brand-600 to-brand-700 text-white text-sm sm:text-base font-bold shadow-lg">
                    {idx + 1}
                  </div>

                  {/* Content Card */}
                  <div className="pl-10 sm:pl-12 pt-2 pb-6 border-l-2 border-brand-200 group-hover:border-brand-400 transition-colors duration-300">
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-light">
                      {paragraph}
                    </p>
                  </div>

                  {/* Decorative Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-500 via-brand-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            {/* Bottom Accent Line */}
            <div className="mt-10 sm:mt-12 md:mt-16 pt-8 sm:pt-10 border-t border-brand-100">
              <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-gray-500">
                <div className="h-px w-12 bg-brand-300"></div>
                <span className="font-medium">Established 2005</span>
                <div className="h-px w-12 bg-brand-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes Section with Enhanced Visuals & Responsive Design */}
      <section className="container space-y-10 sm:space-y-16">
        {/* Enhanced Section Heading - Centered & Responsive */}
        <div className="text-center space-y-4 sm:space-y-6 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 sm:px-6 sm:py-2 bg-brand-100/80 border border-brand-200/50 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-700">
            Curriculum
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-900 leading-tight">
            Tailored programmes for every stage of rider's journey
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Discover the structure, highlights, and investment for each pathway. Speak with our
            coaches to customise schedules for individuals, families, or competitive teams.
          </p>
        </div>

        {/* Responsive Grid Layout - Stacked on mobile, alternating on desktop */}
        <div className="space-y-12 sm:space-y-16">
          {programmesContent.programmes.map((programme, index) => {
            const programmeImages = [
              "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
              "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
              "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&q=80",
              "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&q=80",
              "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
            ];
            const isEven = index % 2 === 0;

            return (
              <article key={programme.id} className="group relative" id={programme.id}>
                {/* Main Card - Responsive Layout */}
                <div
                  className={`flex flex-col lg:flex-row ${isEven ? "" : "lg:flex-row-reverse"} gap-0 overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] border border-brand-100/80 bg-white shadow-2xl transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] hover:border-brand-200/60`}
                >
                  {/* Image Section - Responsive Height */}
                  <div className="relative h-56 sm:h-72 lg:h-auto lg:w-[45%] xl:w-[40%] flex-shrink-0 overflow-hidden bg-gradient-to-br from-brand-100 via-brand-50 to-white">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 2px 2px, rgba(227,30,36,0.3) 1px, transparent 0)",
                          backgroundSize: "24px 24px",
                        }}
                      ></div>
                    </div>

                    {/* Main Image */}
                    <Image
                      src={programmeImages[index % programmeImages.length]}
                      alt={programme.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-105"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      priority={index === 0}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-brand-900/20 to-transparent lg:bg-gradient-to-br lg:from-brand-900/50 lg:via-brand-900/10 lg:to-transparent"></div>

                    {/* Floating Badge - Responsive */}
                    <div className="absolute top-3 sm:top-4 lg:top-6 left-3 sm:left-4 lg:left-6 z-10">
                      <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg border border-brand-200/50 rounded-full">
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-600">
                          Programme {index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-tl from-brand-500/20 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100"></div>
                  </div>

                  {/* Content Section - Enhanced Responsive Layout */}
                  <div className="flex flex-col gap-6 sm:gap-8 p-5 sm:p-6 lg:p-8 xl:p-10 flex-1 bg-gradient-to-br from-white via-white to-brand-50/30 relative overflow-hidden">
                    {/* Subtle Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-500/5 to-transparent rounded-full blur-3xl opacity-50"></div>

                    {/* Content - Relative for z-index */}
                    <div className="relative space-y-5 sm:space-y-6">
                      {/* Header */}
                      <div className="space-y-3 sm:space-y-4">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-brand-900 leading-tight tracking-tight">
                          {programme.title}
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                          {programme.excerpt}
                        </p>
                      </div>

                      {/* Schedule Badge - Enhanced */}
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-50 to-brand-100/50 px-4 py-2.5 border border-brand-200/50 rounded-full">
                        <svg
                          className="h-4 w-4 text-brand-600 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-xs sm:text-sm font-semibold text-brand-800">
                          {programme.schedule}
                        </p>
                      </div>
                    </div>

                    {/* Highlights Section - Enhanced Design */}
                    <div className="relative space-y-4">
                      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-600 flex items-center gap-3">
                        <span className="h-px flex-1 bg-gradient-to-r from-brand-300 to-transparent"></span>
                        Key Highlights
                        <span className="h-px flex-1 bg-gradient-to-l from-brand-300 to-transparent"></span>
                      </h3>
                      <ul className="space-y-3 sm:space-y-4">
                        {programme.highlights.map((highlight, idx) => (
                          <li key={highlight} className="flex gap-3 sm:gap-4 group/item">
                            <div className="flex-shrink-0 mt-1 sm:mt-1.5">
                              <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full group-hover/item:scale-125 transition-transform duration-300 shadow-sm"></div>
                            </div>
                            <span className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed flex-1">
                              {highlight}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action & Pricing Section - Responsive */}
                    <div className="flex flex-col gap-5 sm:gap-6 pt-5 sm:pt-6 border-t border-brand-100/60 relative">
                      {/* CTA Button - Full width on mobile */}
                      <Link
                        href={`/programmes/${programme.id}`}
                        className="group/btn inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-xl shadow-brand-900/20 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-900/30 hover:-translate-y-0.5 rounded-xl sm:rounded-xl"
                      >
                        <span>View Full Programme Details</span>
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover/btn:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>

                      {/* Pricing Tables - Responsive */}
                      {programme.pricingTables && programme.pricingTables.length > 0 && (
                        <div className="flex flex-col gap-3 sm:gap-4">
                          {programme.pricingTables.map((table) => (
                            <div
                              key={table.heading}
                              className="transform transition-all duration-300 hover:scale-[1.01]"
                            >
                              <PricingTable heading={table.heading} rows={table.rows} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Enhanced Knowledge Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50/40 via-white to-brand-50/30 py-16 sm:py-20">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80  bg-brand-500/5 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80  bg-brand-500/5 blur-3xl"></div>
        </div>

        <div className="container relative space-y-8 sm:space-y-12">
          <SectionHeading
            eyebrow="Ride Smart"
            title={programmesContent.knowledge.title}
            description={programmesContent.knowledge.summary}
            align="left"
          />

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            {/* Etiquette Card */}
            <div className="group relative overflow-hidden  border border-brand-100/80 bg-white/95 backdrop-blur-sm p-10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-200">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Decorative Corner Element */}
              <div className="absolute right-0 top-0 h-40 w-40  bg-gradient-to-br from-brand-500/10 to-brand-500/5 transition-all duration-700 group-hover:scale-150 group-hover:from-brand-500/20"></div>

              <div className="relative">
                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center  bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-600 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-brand-900 mb-6">Etiquette Essentials</h3>

                <ul className="space-y-4">
                  {programmesContent.knowledge.etiquette.map((item, idx) => (
                    <li key={item} className="flex gap-4 group/item">
                      <div className="flex-shrink-0 mt-2">
                        <div className="h-2.5 w-2.5  bg-brand-500 group-hover/item:scale-150 transition-transform duration-300"></div>
                      </div>
                      <span className="text-sm md:text-base text-gray-700 leading-relaxed flex-1">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Gear Card */}
            <div className="group relative overflow-hidden  border border-brand-100/80 bg-white/95 backdrop-blur-sm p-10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-200">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Decorative Corner Element */}
              <div className="absolute right-0 top-0 h-40 w-40  bg-gradient-to-br from-brand-500/10 to-brand-500/5 transition-all duration-700 group-hover:scale-150 group-hover:from-brand-500/20"></div>

              <div className="relative">
                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center  bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-600 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-brand-900 mb-6">Gear Checklist</h3>

                <ul className="space-y-4">
                  {programmesContent.knowledge.gear.map((item, idx) => (
                    <li key={item} className="flex gap-4 group/item">
                      <div className="flex-shrink-0 mt-2">
                        <div className="h-2.5 w-2.5  bg-brand-500 group-hover/item:scale-150 transition-transform duration-300"></div>
                      </div>
                      <span className="text-sm md:text-base text-gray-700 leading-relaxed flex-1">
                        {item}
                      </span>
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

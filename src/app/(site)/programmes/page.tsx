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

      {/* Overview Section with Modern Design */}
      <section className="container space-y-10 sm:space-y-16 pt-8 sm:pt-12">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-brand-50/50 via-white to-brand-50/30 p-6 sm:p-8 md:p-12 border border-brand-100/50 shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(227,30,36,0.05),transparent_50%)]"></div>
          <div className="relative space-y-4 sm:space-y-6 text-sm sm:text-base text-gray-700 md:text-lg leading-relaxed">
            {programmesContent.overview.map((paragraph, idx) => (
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
      </section>

      {/* Programmes Section with Creative Card Design */}
      <section className="container space-y-10 sm:space-y-16">
        <SectionHeading
          eyebrow="Curriculum"
          title="Tailored programmes for every stage of the rider's journey"
          description="Discover the structure, highlights, and investment for each pathway. Speak with our coaches to customise schedules for individuals, families, or competitive teams."
        />

        <div className="grid gap-12">
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
              <article
                key={programme.id}
                className="group relative"
                id={programme.id}
              >
                <div className={`flex flex-col lg:flex-row ${isEven ? '' : 'lg:flex-row-reverse'} gap-0 overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] border border-brand-100/80 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-brand-200`}>
                  {/* Enhanced Image Section */}
                  <div className="relative h-72 w-full lg:h-auto lg:w-[42%] flex-shrink-0 overflow-hidden bg-gradient-to-br from-brand-100 to-brand-50">
                    <Image
                      src={programmeImages[index % programmeImages.length]}
                      alt={programme.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      sizes="(max-width: 1024px) 100vw, 42%"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-brand-900/40 lg:via-transparent lg:to-transparent"></div>
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 sm:top-6 left-4 sm:left-6 lg:top-8 lg:left-8">
                      <div className="rounded-2xl bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg border border-brand-100">
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-600">
                          Programme {index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Decorative Element */}
                    <div className="absolute bottom-0 right-0 h-24 w-24 sm:h-32 sm:w-32 rounded-tl-full bg-gradient-to-br from-brand-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col gap-6 sm:gap-8 p-6 sm:p-8 lg:p-12 flex-1 bg-gradient-to-br from-white to-brand-50/20">
                    {/* Header */}
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-900 mb-2 sm:mb-3 leading-tight">
                            {programme.title}
                          </h2>
                          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-2 sm:mb-4">
                            {programme.excerpt}
                          </p>
                        </div>
                      </div>
                      
                      {/* Schedule Badge */}
                      <div className="inline-flex items-center gap-1 sm:gap-2 rounded-full bg-brand-100/80 px-3 sm:px-4 py-1.5 sm:py-2 border border-brand-200/50">
                        <svg className="h-3 w-3 sm:h-4 w-3 sm:w-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-brand-700">
                          {programme.schedule}
                        </p>
                      </div>
                    </div>

                    {/* Highlights with Enhanced Design */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-brand-600 flex items-center gap-2">
                        <span className="h-px flex-1 bg-brand-200"></span>
                        Key Highlights
                        <span className="h-px flex-1 bg-brand-200"></span>
                      </h3>
                      <ul className="space-y-3">
                        {programme.highlights.map((highlight, idx) => (
                          <li 
                            key={highlight} 
                            className="flex gap-4 group/item"
                          >
                            <div className="flex-shrink-0 mt-1.5">
                              <div className="h-2 w-2 rounded-full bg-brand-500 group-hover/item:scale-150 transition-transform duration-300"></div>
                            </div>
                            <span className="text-sm md:text-base text-gray-700 leading-relaxed flex-1">
                              {highlight}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action & Pricing Section */}
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between pt-4 border-t border-brand-100">
                      <Link
                        href={`/programmes/${programme.id}`}
                        className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-brand-800 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-900/20 transition-all duration-300 hover:bg-brand-900 hover:shadow-xl hover:shadow-brand-900/30 hover:-translate-y-0.5"
                      >
                        <span>View Details</span>
                        <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      
                      {programme.pricingTables && programme.pricingTables.length > 0 && (
                        <div className="flex flex-col gap-4 lg:min-w-[320px]">
                          {programme.pricingTables.map((table) => (
                            <div key={table.heading} className="transform transition-transform duration-300 hover:scale-[1.02]">
                              <PricingTable
                                heading={table.heading}
                                rows={table.rows}
                              />
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
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-brand-500/5 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-brand-500/5 blur-3xl"></div>
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
            <div className="group relative overflow-hidden rounded-3xl border border-brand-100/80 bg-white/95 backdrop-blur-sm p-10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-200">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Decorative Corner Element */}
              <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 transition-all duration-700 group-hover:scale-150 group-hover:from-brand-500/20"></div>
              
              <div className="relative">
                {/* Icon */}
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
                
                <h3 className="text-2xl font-bold text-brand-900 mb-6">Etiquette Essentials</h3>
                
                <ul className="space-y-4">
                  {programmesContent.knowledge.etiquette.map((item, idx) => (
                    <li 
                      key={item} 
                      className="flex gap-4 group/item"
                    >
                      <div className="flex-shrink-0 mt-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-brand-500 group-hover/item:scale-150 transition-transform duration-300"></div>
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
            <div className="group relative overflow-hidden rounded-3xl border border-brand-100/80 bg-white/95 backdrop-blur-sm p-10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-200">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Decorative Corner Element */}
              <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 transition-all duration-700 group-hover:scale-150 group-hover:from-brand-500/20"></div>
              
              <div className="relative">
                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-600 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
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
                    <li 
                      key={item} 
                      className="flex gap-4 group/item"
                    >
                      <div className="flex-shrink-0 mt-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-brand-500 group-hover/item:scale-150 transition-transform duration-300"></div>
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

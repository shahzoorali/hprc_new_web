import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { membershipContent } from "@/content/membership";

export default function MembershipPageRedesign() {
  return (
    <div className="space-y-24 pb-24">
      {/* Sophisticated Hero Section */}
      <div className="container pt-16">
        <PageHero
          eyebrow={membershipContent.hero.eyebrow}
          title={membershipContent.hero.title}
          description={membershipContent.hero.description}
          actions={[
            { label: "Apply Now", href: "/membership/apply", variant: "primary" },
            { label: "Download Brochure", href: "/membership/brochure", variant: "outline" },
          ]}
          backgroundImage="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1920&q=80"
        />
      </div>

      {/* Elegant Steps Section */}
      <section className="container space-y-16">
        <SectionHeading
          eyebrow="How It Works"
          title="Three Simple Steps to Join HPRC"
          description="Our membership team guides you from enquiry to orientation, tailoring experiences to your interests."
          align="left"
        />
        <div className="grid gap-10 md:grid-cols-3">
          {membershipContent.steps.map((step, index) => {
            const stepIcons = [
              <svg key="1" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>,
              <svg key="2" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>,
              <svg key="3" className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>,
            ];
            
            return (
              <div
                key={step.title}
                className="group relative overflow-hidden rounded-[2.5rem] border border-brand-100/70 bg-white/98 backdrop-blur-sm p-10 shadow-xl transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-200"
              >
                {/* Elegant Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/4 via-transparent to-brand-500/6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 transition-all duration-700 group-hover:scale-150"></div>
                
                <div className="relative">
                  {/* Sophisticated Step Number Badge */}
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-brand-800 to-brand-900 text-2xl font-bold text-white shadow-lg shadow-brand-900/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border-2 border-white/20">
                    {index + 1}
                  </div>
                  
                  {/* Elegant Icon */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-brand-500/7 text-brand-600 transition-colors duration-300 group-hover:bg-brand-200 border border-brand-200/40 shadow-sm">
                    {stepIcons[index]}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-brand-900 mb-4 leading-tight font-display tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sophisticated Benefits Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50/40 via-white to-brand-50/30 py-24">
        {/* Elegant Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-48 -right-48 h-96 w-96 rounded-full bg-brand-500/4 blur-[120px]"></div>
          <div className="absolute -bottom-48 -left-48 h-96 w-96 rounded-full bg-brand-600/4 blur-[120px]"></div>
        </div>

        <div className="container relative space-y-12">
          <SectionHeading
            eyebrow="Privileges"
            title="Membership Benefits"
            description="Unlock access across riding, sports, hospitality, and exclusive events."
            align="left"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {membershipContent.benefits.map((benefit, index) => (
              <div
                key={benefit}
                className="group relative overflow-hidden rounded-2xl border border-brand-100/70 bg-white/98 backdrop-blur-sm p-8 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-brand-200"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex gap-5">
                  <div className="flex-shrink-0 mt-1.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-brand-500/7 text-brand-600 transition-transform duration-300 group-hover:scale-110 border border-brand-200/40 shadow-sm">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed flex-1 font-medium font-light">
                    {benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sophisticated Quick Links Section */}
      <section className="container space-y-12">
        <SectionHeading
          eyebrow="Member Services"
          title="Quick Links"
          description="Access member tools, make payments, or download resources."
          align="left"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {membershipContent.services.map((service, index) => {
            const serviceIcons = [
              <svg key="login" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>,
              <svg key="apply" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>,
              <svg key="pay" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>,
              <svg key="brochure" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>,
            ];
            
            return (
              <Link
                key={service.label}
                href={service.href}
                className="group relative overflow-hidden rounded-2xl border border-brand-100/70 bg-white/98 backdrop-blur-sm p-8 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-4"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/4 via-transparent to-brand-500/6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex flex-col items-start gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-brand-500/7 text-brand-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border border-brand-200/40 shadow-md">
                    {serviceIcons[index]}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-900 mb-2 font-display tracking-tight">
                      {service.label}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="font-medium tracking-wide">Learn more</span>
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Sophisticated FAQ Section */}
      <section className="container space-y-12">
        <SectionHeading
          eyebrow="FAQs"
          title="Frequently Asked Questions"
          description="Have more queries? Reach out to membership@hprc.co.in for personalised assistance."
          align="left"
        />
        <div className="space-y-5">
          {membershipContent.faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="group relative overflow-hidden rounded-[2rem] border border-brand-100/70 bg-white/98 backdrop-blur-sm shadow-lg transition-all duration-500 hover:shadow-xl hover:border-brand-200 [&[open]]:border-brand-200 [&[open]]:shadow-xl"
            >
              <summary className="cursor-pointer p-8 pr-14 text-lg font-bold text-brand-900 list-none transition-all duration-300 hover:text-brand-800 [&::-webkit-details-marker]:hidden font-display tracking-tight">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 mt-1 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-brand-500/7 text-brand-600 text-sm font-bold border border-brand-200/40 shadow-sm">
                    Q{index + 1}
                  </div>
                  <span className="flex-1 leading-relaxed">{faq.question}</span>
                  <svg 
                    className="absolute right-8 top-8 h-6 w-6 text-brand-600 transition-transform duration-500 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </summary>
              <div className="px-8 pb-8 pl-20">
                <div className="relative pl-8 border-l-2 border-brand-200">
                  <div className="absolute -left-2.5 top-0 h-5 w-5 rounded-full bg-brand-500 shadow-md"></div>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed pt-3 font-light">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}


import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { PricingTable } from "@/components/ui/pricing-table";

export default function BeginnersRidingProgrammePage() {
  return (
    <div className="space-y-16 sm:space-y-20 pb-16 sm:pb-20">
      <div className="container pt-12 sm:pt-16">
        <PageHero
          eyebrow="Start Riding"
          title="Beginners Riding Programme"
          description="Our Beginner Riding Programme is designed to introduce new riders to fundamentals of horseback riding in a safe and supportive environment. This package includes personalized lessons from experienced instructors, focusing on essential skills such as mounting, steering, and basic riding techniques."
          actions={[{ label: "Apply for Membership", href: "/membership", variant: "primary" }]}
        />
      </div>

      {/* Programme Details */}
      <section className="container space-y-8 sm:space-y-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 sm:space-y-8">
            <SectionHeading
              eyebrow="Programme Overview"
              title="Start Your Equestrian Journey"
              description="Whether you're looking to start a new hobby or build a foundation for advanced riding, our programme ensures a fun and educational experience for all ages. Join us to embark on your equestrian journey with confidence and joy."
              align="center"
            />

            {/* Timings */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-3 sm:gap-4 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 sm:px-8 py-4 sm:py-5 shadow-xl">
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6 text-white"
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
                <div className="text-white">
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide opacity-90 mb-1">Operating Hours</p>
                  <p className="text-base sm:text-lg font-bold">6:00am - 10:00am & 4:00pm - 9:00pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container">
        <div className="max-w-5xl mx-auto space-y-10 sm:space-y-14">
          <SectionHeading
            eyebrow="Pricing"
            title="Course Packages"
            description="Choose the package that suits you best"
            align="center"
          />

          {/* Basic Level Riding Course */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-900 text-center font-display">
              Basic Level Riding Course
            </h3>
            <PricingTable
              heading="Basic Level Riding Course"
              rows={[
                {
                  label: "24 Riding Coupon",
                  price: "Rs. 6,000",
                  gst: "Rs. 1,080",
                  total: "Rs. 7,080"
                },
                {
                  label: "Coaching",
                  price: "Rs. 2,000",
                  gst: "Rs. 360",
                  total: "Rs. 2,360"
                }
              ]}
            />
          </div>

          {/* Basic Level Riding Course - GUEST */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-900 text-center font-display">
              Basic Level Riding Course - GUEST
            </h3>
            <PricingTable
              heading="Basic Level Riding Course - GUEST"
              rows={[
                {
                  label: "24 Riding Coupon",
                  price: "Rs. 12,000",
                  gst: "Rs. 2,160",
                  total: "Rs. 14,160"
                },
                {
                  label: "Coaching",
                  price: "Rs. 2,400",
                  gst: "Rs. 432",
                  total: "Rs. 2,832"
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl bg-gradient-to-br from-brand-50 to-brand-100/50 p-8 sm:p-12 border border-brand-200/60 shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-900 mb-4 sm:mb-6 font-display">
              Ready to Start Your Journey?
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              Apply for membership today and begin your equestrian adventure at HPRC.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/membership"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-brand-500/30 transition-all duration-300 hover:from-brand-600 hover:to-brand-700 hover:shadow-2xl hover:-translate-y-1"
              >
                Apply for Membership
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-brand-500 bg-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-brand-600 shadow-lg transition-all duration-300 hover:bg-brand-50 hover:border-brand-600"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactContent } from "@/content/contact";

export default function ContactPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-12 sm:pb-24">
      {/* Sophisticated Hero Section */}
      <div className="container pt-16">
        <PageHero
          eyebrow={contactContent.hero.eyebrow}
          title={contactContent.hero.title}
          description={contactContent.hero.description}
          actions={[
            { label: "Start Membership Enquiry", href: "/membership/apply", variant: "primary" },
          ]}
          backgroundImage="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1920&q=80"
        />
      </div>

      {/* Elegant Information Cards */}
      <section className="container space-y-8 sm:space-y-12">
        <div className="grid gap-6 sm:gap-10 grid-cols-1 lg:grid-cols-2">
          {/* Contact Details Card */}
          <div className="space-y-4 sm:space-y-6 rounded-[1.5rem] sm:rounded-[2.5rem] border border-brand-100/60 bg-gradient-to-br from-brand-50/60 via-white to-brand-50/40 p-6 sm:p-10 shadow-xl">
            <SectionHeading
              eyebrow="Visit"
              title="Club Coordinates"
              description="Reach us during operating hours or schedule a guided tour."
              align="left"
              className="!mb-6"
            />
            <div className="space-y-4 sm:space-y-5 text-sm sm:text-base text-gray-700">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex h-8 w-8 items-center justify-center  bg-gradient-to-br from-brand-500/15 to-brand-500/7 text-brand-600 shadow-md transition-transform duration-300 hover:scale-110">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-brand-900 mb-1">Address</p>
                  <Link
                    href={contactContent.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-gray-700 hover:text-brand-600 transition-colors"
                  >
                    {contactContent.address}
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex h-8 w-8 items-center justify-center  bg-gradient-to-br from-brand-500/15 to-brand-500/7 text-brand-600 shadow-md transition-transform duration-300 hover:scale-110">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-brand-900 mb-1">Phone</p>
                  <a
                    href={`tel:${contactContent.phone.replace(/\s/g, "")}`}
                    className="font-medium text-gray-700 hover:text-brand-600 transition-colors"
                  >
                    {contactContent.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex h-8 w-8 items-center justify-center  bg-gradient-to-br from-brand-500/15 to-brand-500/7 text-brand-600 shadow-md transition-transform duration-300 hover:scale-110">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002-2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-brand-900 mb-1">Email</p>
                  <a
                    href={`mailto:${contactContent.email}`}
                    className="font-medium text-gray-700 hover:text-brand-600 transition-colors"
                  >
                    {contactContent.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex h-8 w-8 items-center justify-center  bg-gradient-to-br from-brand-500/15 to-brand-500/7 text-brand-600 shadow-md transition-transform duration-300 hover:scale-110">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-brand-900 mb-1">Membership</p>
                  <a
                    href={`mailto:${contactContent.membershipEmail}`}
                    className="font-medium text-gray-700 hover:text-brand-600 transition-colors"
                  >
                    {contactContent.membershipEmail}
                  </a>
                </div>
              </div>
            </div>
            <Link
              href={contactContent.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-sm font-bold text-brand-800 hover:text-brand-900 transition-colors mt-4 font-display tracking-wide"
            >
              View on Google Maps
              <svg
                className="ml-2 h-4 w-4 transition-transform duration-300 hover:translate-x-1"
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
          </div>

          {/* Timings Card */}
          <div className="space-y-4 sm:space-y-6 rounded-[1.5rem] sm:rounded-[2.5rem] border border-brand-100/60 bg-gradient-to-br from-brand-50/60 via-white to-brand-50/40 p-6 sm:p-10 shadow-xl">
            <SectionHeading
              eyebrow="Hours"
              title="Operating Hours"
              description=""
              align="left"
              className="!mb-4 sm:!mb-6"
            />
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700">
              {contactContent.hours.map((entry) => (
                <li key={entry.label} className="flex items-start gap-3 sm:gap-4 group">
                  <div className="flex-shrink-0 mt-1.5 sm:mt-2">
                    <div className="h-2.5 w-2.5 sm:h-3 sm:w-3  bg-brand-500 group-hover:scale-125 transition-transform duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-brand-900 mb-0.5 sm:mb-1 font-display">{entry.label}</p>
                    <p className="font-medium text-gray-700">{entry.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Elegant Enquiry Notes Section */}
      <section className="container space-y-8 sm:space-y-12">
        <SectionHeading
          eyebrow="Plan Ahead"
          title="Helpful Notes for Enquiries"
          description="Share details about your visit, group size, and expectations so our team can craft perfect itinerary."
          align="left"
        />
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
          {contactContent.enquiryNotes.map((note) => (
            <div
              key={note}
              className="group relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-brand-100/60 bg-gradient-to-br from-white to-brand-50/30 p-5 sm:p-8 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-brand-200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/4 via-transparent to-brand-500/6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute right-0 top-0 h-20 w-20 sm:h-24 sm:w-24  bg-gradient-to-br from-brand-500/10 to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <p className="relative text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-light">
                {note}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

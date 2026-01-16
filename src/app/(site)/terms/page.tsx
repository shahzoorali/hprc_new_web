import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";

export default function TermsPage() {
  return (
    <div className="space-y-16 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Policies"
          title="Terms & conditions"
          description="The following terms outline usage of Hyderabad Polo & Riding Club's facilities, website, and membership services."
        />
      </div>

      <section className="container space-y-10">
        <div className="prose prose-sm max-w-none">
          <p className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Membership Terms */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Membership"
            title="Membership terms and conditions"
            align="left"
          />
          <div className="rounded-2xl border border-brand-100/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="space-y-6 text-sm text-gray-700">
              <div>
                <h3 className="mb-3 text-base font-semibold text-brand-900">Membership Categories</h3>
                <ul className="space-y-2">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      Membership is available in individual, family, and corporate categories. Each category has
                      specific privileges and access rights as outlined in the membership agreement.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      Membership fees, renewal charges, and applicable taxes are detailed in the membership
                      agreement and are subject to change with prior notice.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      All members must complete the onboarding process, including signing liability waivers and
                      understanding club policies.
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-base font-semibold text-brand-900">Membership Obligations</h3>
                <ul className="space-y-2">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      Members are responsible for maintaining accurate contact information and updating the club
                      of any changes.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      Membership is non-transferable without written consent from the club management.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      Members must comply with all club rules, regulations, and code of conduct as outlined
                      during onboarding.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Facility Usage */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Facilities"
            title="Facility usage and access"
            align="left"
          />
          <div className="rounded-2xl border border-brand-100/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="space-y-6 text-sm text-gray-700">
              <div>
                <h3 className="mb-3 text-base font-semibold text-brand-900">Operating Hours</h3>
                <ul className="space-y-2">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      Riding and equestrian facilities operate from 6:00 AM to 10:00 AM and 4:00 PM to 9:00 PM,
                      Monday through Sunday.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      Sports centre facilities have varying hours. Members should check with facility managers
                      for specific timings.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      Restaurant and hospitality services operate as per their published schedules.
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-base font-semibold text-brand-900">Booking and Reservations</h3>
                <ul className="space-y-2">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      Facility bookings, including courts, pools, and event spaces, must be made in advance
                      through the club's booking system or membership office.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      Cancellation policies vary by facility. Members are advised to review cancellation terms
                      at the time of booking.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      No-show policies apply. Repeated no-shows may result in restricted booking privileges.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Guest Policies */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Guests"
            title="Guest policies"
            align="left"
          />
          <div className="rounded-2xl border border-brand-100/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="space-y-6 text-sm text-gray-700">
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Members may bring guests to the club, subject to guest policies and applicable charges.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    All guests must be registered at the reception and sign liability waivers before accessing
                    facilities.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Members are responsible for their guests' conduct and compliance with club rules.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Guest access to certain facilities may be restricted during peak hours or special events.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Liability and Safety */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Safety"
            title="Liability and safety"
            align="left"
          />
          <div className="rounded-2xl border border-brand-100/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="space-y-6 text-sm text-gray-700">
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Participation in riding, polo, and sports activities involves inherent risks. Members and
                    guests participate at their own risk.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    All members and guests must sign liability waivers before accessing equestrian and sports
                    facilities.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    The club maintains insurance coverage, but members are encouraged to maintain personal
                    accident and health insurance.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Members must follow all safety protocols, wear appropriate safety equipment, and comply with
                    instructor guidance.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code of Conduct */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Conduct"
            title="Code of conduct"
            align="left"
          />
          <div className="rounded-2xl border border-brand-100/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="space-y-6 text-sm text-gray-700">
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Members and guests must treat all staff, instructors, and fellow members with respect and
                    courtesy.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Appropriate dress code must be followed in all facilities, especially in equestrian areas
                    and restaurants.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Smoking is restricted to designated areas only. Alcohol consumption must comply with club
                    policies and local regulations.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Violation of club rules or misconduct may result in warnings, suspension, or termination of
                    membership.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Event Bookings */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Events"
            title="Event bookings and cancellations"
            align="left"
          />
          <div className="rounded-2xl border border-brand-100/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="space-y-6 text-sm text-gray-700">
              <div>
                <h3 className="mb-3 text-base font-semibold text-brand-900">Banquet and Event Bookings</h3>
                <ul className="space-y-2">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      Event bookings require advance confirmation and payment as per the booking terms.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      Cancellation policies vary by event type and notice period. Members should review terms at
                      booking.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      Outside food and beverages are not permitted. All catering must be arranged through club
                      facilities.
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-base font-semibold text-brand-900">Refund Policy</h3>
                <ul className="space-y-2">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      Membership fees are generally non-refundable, except as specified in the membership
                      agreement.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      Programme and service fees may be refundable subject to cancellation policies and notice
                      periods.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      Refund requests must be submitted in writing to the membership office with appropriate
                      documentation.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Website Usage */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Website"
            title="Website terms of use"
            align="left"
          />
          <div className="rounded-2xl border border-brand-100/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="space-y-6 text-sm text-gray-700">
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    The website content, including text, images, and logos, is the property of Hyderabad Polo &
                    Riding Club and protected by copyright.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Users may not reproduce, distribute, or use website content for commercial purposes without
                    written permission.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    The club strives to maintain accurate information but reserves the right to update content
                    without prior notice.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Links to external websites are provided for convenience. The club is not responsible for
                    external site content or policies.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* General Terms */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="General"
            title="General terms"
            align="left"
          />
          <div className="rounded-2xl border border-brand-100/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="space-y-6 text-sm text-gray-700">
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    The club reserves the right to modify these terms and conditions with reasonable notice to
                    members.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    These terms are governed by the laws of India and subject to the jurisdiction of courts in
                    Hyderabad, Telangana.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    If any provision of these terms is found to be invalid, the remaining provisions shall
                    continue in full force and effect.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    The club may temporarily close facilities for maintenance, events, or emergencies without
                    liability for service interruption.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="rounded-2xl border border-brand-100/80 bg-brand-50/50 p-6 sm:p-8">
          <SectionHeading
            eyebrow="Questions"
            title="Contact us"
            description="For questions about these terms, membership policies, or facility usage, please contact our team."
            align="left"
          />
          <div className="mt-6 space-y-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold text-brand-900">Membership Office</p>
              <p className="mt-1">{siteConfig.contact.address}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
              <a
                href={`mailto:${siteConfig.contact.membershipEmail}`}
                className="font-medium text-brand-700 hover:text-brand-900"
              >
                {siteConfig.contact.membershipEmail}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-medium text-brand-700 hover:text-brand-900"
              >
                {siteConfig.contact.email}
              </a>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                className="font-medium text-brand-700 hover:text-brand-900"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Contact Form
            </Link>
            <Link
              href="/membership/apply"
              className="inline-flex items-center justify-center rounded-full border border-brand-300 bg-white px-6 py-2.5 text-sm font-semibold text-brand-700 transition hover:border-brand-400"
            >
              Apply for Membership
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactContent } from "@/content/contact";

export default function ContactPage() {
  return (
    <div className="space-y-16 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow={contactContent.hero.eyebrow}
          title={contactContent.hero.title}
          description={contactContent.hero.description}
          actions={[
            { label: "Start Membership Enquiry", href: "/membership/apply", variant: "primary" },
          ]}
        />
      </div>

      <section className="container grid gap-10 lg:grid-cols-2">
        <div className="space-y-6 rounded-[2.5rem] border border-brand-100 bg-white/95 p-8 shadow-[var(--shadow-elevated)]">
          <SectionHeading
            eyebrow="Visit"
            title="Club coordinates"
            description="Reach us during operating hours or schedule a guided tour."
            align="left"
          />
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              <strong>Address:</strong> {contactContent.address}
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a href={`tel:${contactContent.phone}`}>{contactContent.phone}</a>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${contactContent.email}`}>{contactContent.email}</a>
            </p>
            <p>
              <strong>Membership:</strong>{" "}
              <a href={`mailto:${contactContent.membershipEmail}`}>
                {contactContent.membershipEmail}
              </a>
            </p>
            <Link
              href={contactContent.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex text-sm font-semibold text-brand-800 hover:text-brand-900"
            >
              View on Google Maps &rarr;
            </Link>
          </div>
        </div>

        <div className="space-y-6 rounded-[2.5rem] border border-brand-100 bg-white/95 p-8 shadow-[var(--shadow-elevated)]">
          <SectionHeading eyebrow="Hours" title="Timings" description="" align="left" />
          <ul className="space-y-3 text-sm text-gray-700">
            {contactContent.hours.map((entry) => (
              <li key={entry.label} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-brand-900">{entry.label}</p>
                  <p>{entry.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container space-y-6">
        <SectionHeading
          eyebrow="Plan Ahead"
          title="Helpful notes for enquiries"
          description="Share details about your visit, group size, and expectations so our team can craft the perfect itinerary."
          align="left"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {contactContent.enquiryNotes.map((note) => (
            <div
              key={note}
              className="rounded-3xl border border-brand-100 bg-white/95 p-6 text-sm text-gray-700 shadow-[var(--shadow-elevated)]"
            >
              {note}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

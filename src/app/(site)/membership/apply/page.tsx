import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteConfig } from "@/lib/site";

export default async function MembershipApplyPage() {
  const siteConfig = await getSiteConfig();
  return (
    <div className="space-y-16 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Membership"
          title="Apply for membership"
          description="Tell us about your riding interests, family members, and preferred facilities. Our team will schedule a personal interaction to guide you through the next steps."
          actions={[
            {
              label: "Contact Membership Team",
              href: `mailto:${siteConfig.contact.membershipEmail}`,
              variant: "primary",
            },
            {
              label: "Download e-Brochure",
              href: "/membership/brochure",
              variant: "outline",
            },
          ]}
        />
      </div>

      <section className="container space-y-10">
        <SectionHeading
          eyebrow="Get Started"
          title="Membership application at a glance"
          description="Share a few details and we will take care of the rest, from your club visit to final onboarding."
          align="left"
        />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Submit your enquiry",
                  description:
                    "Send your details and preferences to the membership team for initial review.",
                },
                {
                  title: "Schedule a club visit",
                  description:
                    "We will plan a visit to walk you through facilities, stables, and programme options.",
                },
                {
                  title: "Choose your category",
                  description:
                    "Select the membership type that fits your household or corporate group.",
                },
                {
                  title: "Onboarding & activation",
                  description:
                    "Complete documentation and receive guidance on club services and etiquette.",
                },
              ].map((step, idx) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-brand-100/70 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                      {idx + 1}
                    </span>
                    <h3 className="text-base font-semibold text-brand-900">{step.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-brand-100/80 bg-brand-50/50 p-6">
              <h3 className="text-base font-semibold text-brand-900">What to include</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-700">
                {[
                  "Full name, contact number, and email address",
                  "Riding and sports interests for yourself and family members",
                  "Preferred membership category (individual, family, corporate)",
                  "Requested start date and any sponsor references",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Once we receive your application, the membership team will reach out within two
                business days to plan your club visit and onboarding.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-brand-100/80 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-brand-900">Membership support</h3>
              <div className="mt-4 space-y-3 text-sm text-gray-700">
                <p>{siteConfig.contact.address}</p>
                <div className="space-y-2">
                  <a
                    href={`mailto:${siteConfig.contact.membershipEmail}`}
                    className="block font-medium text-brand-700 hover:text-brand-900"
                  >
                    {siteConfig.contact.membershipEmail}
                  </a>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                    className="block font-medium text-brand-700 hover:text-brand-900"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-brand-900 p-6 text-white">
              <h3 className="text-base font-semibold">Need help deciding?</h3>
              <p className="mt-3 text-sm text-white/80">
                Speak with our membership specialists about programmes, sports centre access, and
                family add-ons.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white/20"
                >
                  Request a Call
                </Link>
                <Link
                  href="/membership"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:border-white/60"
                >
                  View Memberships
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

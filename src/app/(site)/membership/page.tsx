import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { membershipContent } from "@/content/membership";

export default function MembershipPage() {
  return (
    <div className="space-y-16 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow={membershipContent.hero.eyebrow}
          title={membershipContent.hero.title}
          description={membershipContent.hero.description}
          actions={[
            { label: "Apply Now", href: "/membership/apply", variant: "primary" },
            { label: "Download Brochure", href: "/membership/brochure", variant: "outline" },
          ]}
        />
      </div>

      <section className="container space-y-8">
        <SectionHeading
          eyebrow="How it works"
          title="Three simple steps to join HPRC"
          description="Our membership team guides you from enquiry to orientation, tailoring experiences to your interests."
          align="left"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {membershipContent.steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-3xl border border-brand-100 bg-white/95 p-6 shadow-[var(--shadow-elevated)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 text-sm font-semibold text-white">
                {index + 1}
              </div>
              <h3 className="mt-4 text-base font-semibold text-brand-900">{step.title}</h3>
              <p className="mt-3 text-sm text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container space-y-6">
        <SectionHeading
          eyebrow="Privileges"
          title="Membership benefits"
          description="Unlock access across riding, sports, hospitality, and exclusive events."
          align="left"
        />
        <ul className="grid gap-4 text-sm text-gray-700 md:grid-cols-2">
          {membershipContent.benefits.map((benefit) => (
            <li key={benefit} className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="container space-y-6">
        <SectionHeading
          eyebrow="Member Services"
          title="Quick links"
          description="Access member tools, make payments, or download resources."
          align="left"
        />
        <div className="flex flex-wrap gap-4">
          {membershipContent.services.map((service) => (
            <Link
              key={service.label}
              href={service.href}
              className="inline-flex items-center rounded-full border border-brand-200 px-6 py-3 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
            >
              {service.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="container space-y-6">
        <SectionHeading
          eyebrow="FAQs"
          title="Frequently asked questions"
          description="Have more queries? Reach out to membership@hprc.co.in for personalised assistance."
          align="left"
        />
        <div className="space-y-4">
          {membershipContent.faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-3xl border border-brand-100 bg-white/95 p-6 shadow-[var(--shadow-elevated)]"
            >
              <summary className="cursor-pointer text-sm font-semibold text-brand-900">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm text-gray-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

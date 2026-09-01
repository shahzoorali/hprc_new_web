import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSiteConfig } from "@/lib/site";

export default async function PrivacyPage() {
  const siteConfig = await getSiteConfig();
  return (
    <div className="space-y-16 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Policies"
          title="Privacy policy"
          description="HPRC respects your privacy and safeguards personal information shared through membership applications, bookings, and digital interactions."
        />
      </div>

      <section className="container space-y-10">
        <div className="prose prose-sm max-w-none">
          <p className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          <p className="mt-4 text-sm text-gray-700">
            Hyderabad Polo & Riding Club ("HPRC", "we", "us", or "our") is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
            visit our website, use our services, or interact with us as a member or guest.
          </p>
        </div>

        {/* Information We Collect */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Collection"
            title="Information we collect"
            align="left"
          />
          <div className="rounded-2xl border border-brand-100/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="space-y-6 text-sm text-gray-700">
              <div>
                <h3 className="mb-3 text-base font-semibold text-brand-900">Personal Information</h3>
                <ul className="space-y-2">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      <strong>Membership Applications:</strong> Name, contact details (phone, email, address),
                      date of birth, emergency contacts, family member information, and sponsor references.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      <strong>Booking Information:</strong> Event details, guest lists, dietary preferences, and
                      special requirements.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      <strong>Financial Information:</strong> Payment details, billing addresses, and
                      transaction history (processed securely through payment gateways).
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      <strong>Health and Safety:</strong> Medical information, liability waivers, and safety
                      certifications relevant to equestrian and sports activities.
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-base font-semibold text-brand-900">Automatically Collected Information</h3>
                <ul className="space-y-2">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      Website usage data, including IP address, browser type, device information, pages visited,
                      and time spent on pages.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                    <span>
                      Cookies and similar tracking technologies to enhance user experience and analyze website
                      performance.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* How We Use Information */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Usage"
            title="How we use your information"
            align="left"
          />
          <div className="rounded-2xl border border-brand-100/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="space-y-6 text-sm text-gray-700">
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    <strong>Membership Management:</strong> Process applications, manage memberships, provide
                    access to facilities, and maintain membership records.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    <strong>Service Delivery:</strong> Facilitate bookings, reservations, programme enrollments,
                    and event management.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    <strong>Communication:</strong> Send updates, newsletters, event notifications, and respond to
                    inquiries.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    <strong>Safety and Security:</strong> Ensure facility safety, manage liability waivers, and
                    comply with health and safety regulations.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    <strong>Legal Compliance:</strong> Meet legal obligations, enforce terms and conditions, and
                    protect club and member interests.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    <strong>Website Improvement:</strong> Analyze usage patterns, improve website functionality,
                    and enhance user experience.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Sharing */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Sharing"
            title="Data sharing and disclosure"
            align="left"
          />
          <div className="rounded-2xl border border-brand-100/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="space-y-6 text-sm text-gray-700">
              <p>
                We do not sell your personal information. We may share your information in the following
                circumstances:
              </p>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    <strong>Service Providers:</strong> With trusted third-party service providers who assist in
                    operations (payment processing, IT services, event management) under strict confidentiality
                    agreements.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    <strong>Legal Requirements:</strong> When required by law, court order, or government
                    regulations, or to protect rights, property, or safety.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    <strong>Business Transfers:</strong> In connection with mergers, acquisitions, or sale of
                    assets, with notice to affected members.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    <strong>With Consent:</strong> When you explicitly consent to sharing information for
                    specific purposes.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Security */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Security"
            title="Data security"
            align="left"
          />
          <div className="rounded-2xl border border-brand-100/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="space-y-6 text-sm text-gray-700">
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    We implement appropriate technical and organizational measures to protect your personal
                    information against unauthorized access, alteration, disclosure, or destruction.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Sensitive data, including payment information, is encrypted using industry-standard
                    encryption protocols.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Access to personal information is restricted to authorized personnel who require it for
                    legitimate business purposes.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    While we strive to protect your information, no method of transmission over the internet is
                    100% secure. We cannot guarantee absolute security.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Retention"
            title="Data retention"
            align="left"
          />
          <div className="rounded-2xl border border-brand-100/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="space-y-6 text-sm text-gray-700">
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    We retain personal information for as long as necessary to fulfill the purposes outlined in
                    this policy, unless a longer retention period is required by law.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Membership records are retained for the duration of membership and for a reasonable period
                    thereafter for legal and business purposes.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Financial records are retained as required by applicable accounting and tax regulations.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    When data is no longer needed, we securely delete or anonymize it in accordance with our
                    data retention policies.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Your Rights"
            title="Your privacy rights"
            align="left"
          />
          <div className="rounded-2xl border border-brand-100/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="space-y-6 text-sm text-gray-700">
              <p>You have the following rights regarding your personal information:</p>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    <strong>Access:</strong> Request access to your personal information and receive a copy of
                    the data we hold about you.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    <strong>Correction:</strong> Request correction of inaccurate or incomplete information.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    <strong>Deletion:</strong> Request deletion of your personal information, subject to legal
                    and contractual obligations.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    <strong>Objection:</strong> Object to processing of your information for certain purposes,
                    where legally permissible.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    <strong>Withdrawal of Consent:</strong> Withdraw consent for data processing where consent is
                    the legal basis.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    <strong>Data Portability:</strong> Request transfer of your data to another service
                    provider, where applicable.
                  </span>
                </li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us using the information provided in the Contact
                section below. We will respond to your request within a reasonable timeframe.
              </p>
            </div>
          </div>
        </div>

        {/* Cookies */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Cookies"
            title="Cookies and tracking technologies"
            align="left"
          />
          <div className="rounded-2xl border border-brand-100/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="space-y-6 text-sm text-gray-700">
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Our website uses cookies and similar technologies to enhance user experience, analyze usage
                    patterns, and improve functionality.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Essential cookies are necessary for website functionality and cannot be disabled. You can
                    manage or disable non-essential cookies through your browser settings.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Third-party services, such as analytics providers, may use cookies. We do not control these
                    cookies, and you should review their privacy policies.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Third-Party Services */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Third Parties"
            title="Third-party services"
            align="left"
          />
          <div className="rounded-2xl border border-brand-100/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="space-y-6 text-sm text-gray-700">
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Our website may contain links to third-party websites, services, or applications. We are not
                    responsible for the privacy practices of these third parties.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    We encourage you to review the privacy policies of any third-party services you access
                    through our website.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Payment processing is handled by secure third-party payment gateways. We do not store
                    complete payment card information.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Children's Privacy */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Children"
            title="Children's privacy"
            align="left"
          />
          <div className="rounded-2xl border border-brand-100/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="space-y-6 text-sm text-gray-700">
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Our services are available to children aged 6 years and above for riding and equestrian
                    programmes, with appropriate parental consent and supervision.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    We collect information about children only with parental or guardian consent and use it
                    solely for programme participation and safety purposes.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Parents or guardians may request access, correction, or deletion of their child's
                    information at any time.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Policy Updates */}
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Updates"
            title="Updates to this policy"
            align="left"
          />
          <div className="rounded-2xl border border-brand-100/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="space-y-6 text-sm text-gray-700">
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or
                    legal requirements.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    Material changes will be communicated to members through email or prominent notice on our
                    website.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                  <span>
                    The "Last updated" date at the top of this policy indicates when revisions were made. We
                    encourage you to review this policy periodically.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="rounded-2xl border border-brand-100/80 bg-brand-50/50 p-6 sm:p-8">
          <SectionHeading
            eyebrow="Contact"
            title="Contact us"
            description="For questions, concerns, or requests regarding your privacy or this policy, please contact our privacy team."
            align="left"
          />
          <div className="mt-6 space-y-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold text-brand-900">Privacy & Data Protection</p>
              <p className="mt-1">Hyderabad Polo & Riding Club</p>
              <p className="mt-1">{siteConfig.contact.address}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
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
            <p className="mt-4 text-sm text-gray-600">
              We will respond to your privacy inquiries within 30 days of receipt.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Contact Form
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center justify-center rounded-full border border-brand-300 bg-white px-6 py-2.5 text-sm font-semibold text-brand-700 transition hover:border-brand-400"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

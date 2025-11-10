import { PageHero } from "@/components/ui/page-hero";

export default function TermsPage() {
  return (
    <div className="space-y-12 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Policies"
          title="Terms & conditions"
          description="The following terms outline usage of Hyderabad Polo & Riding Club’s facilities, website, and membership services."
        />
      </div>
      <section className="container space-y-6 text-sm text-gray-700">
        <p>
          Detailed legal documentation is being reviewed and will be published soon. In the interim,
          membership agreements, guest policies, and liability waivers provided during onboarding
          remain fully applicable.
        </p>
        <p>
          For questions about facility usage, cancellations, or event bookings, contact{" "}
          <a href="mailto:info@hprc.co.in">info@hprc.co.in</a>. Members will receive notifications
          whenever policy updates take effect.
        </p>
      </section>
    </div>
  );
}

import { PageHero } from "@/components/ui/page-hero";

export default function PrivacyPage() {
  return (
    <div className="space-y-12 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Policies"
          title="Privacy policy"
          description="HPRC respects your privacy and safeguards personal information shared through membership applications, bookings, and digital interactions."
        />
      </div>
      <section className="container space-y-6 text-sm text-gray-700">
        <p>
          The finalised privacy policy, aligned with applicable Indian data protection guidelines,
          will be published shortly. It will cover data collection, usage, storage, and rights of
          members and guests.
        </p>
        <p>
          Until then, personal data submitted via email or forms is used solely for club
          communications. For removal or updates, please write to{" "}
          <a href="mailto:info@hprc.co.in">info@hprc.co.in</a>.
        </p>
      </section>
    </div>
  );
}

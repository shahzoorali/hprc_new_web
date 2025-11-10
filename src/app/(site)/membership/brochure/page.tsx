import { PageHero } from "@/components/ui/page-hero";

export default function MembershipBrochurePage() {
  return (
    <div className="space-y-12 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Membership"
          title="Download brochure"
          description="Our digital brochure featuring programmes, facilities, and membership tiers is being refreshed. Request a copy and we will send it to your inbox."
          actions={[
            { label: "Request Brochure", href: "mailto:info@hprc.co.in", variant: "primary" },
          ]}
        />
      </div>
      <section className="container space-y-4 text-sm text-gray-700">
        <p>
          Prefer a physical copy? Visit the club reception or include your mailing address in the
          request email. We will ensure you receive the latest edition.
        </p>
      </section>
    </div>
  );
}

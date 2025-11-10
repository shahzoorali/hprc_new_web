import { PageHero } from "@/components/ui/page-hero";

export default function MembershipApplyPage() {
  return (
    <div className="space-y-12 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Membership"
          title="Apply for membership"
          description="Tell us about your riding interests, family members, and preferred facilities. Our team will schedule a personal interaction to guide you through the next steps."
          actions={[
            {
              label: "Contact Membership Team",
              href: "mailto:reaz@hprc.co.in",
              variant: "primary",
            },
          ]}
        />
      </div>
      <section className="container space-y-6 text-sm text-gray-700">
        <p>Please include the following information in your enquiry:</p>
        <ul className="space-y-3">
          <li>• Full name, contact number, and email address</li>
          <li>• Riding and sports interests for yourself and family members</li>
          <li>• Preferred membership category (individual, family, corporate)</li>
          <li>• Requested start date and any sponsor references</li>
        </ul>
        <p>
          Once we receive your application, the membership team will reach out within two business
          days to plan your club visit and onboarding.
        </p>
      </section>
    </div>
  );
}

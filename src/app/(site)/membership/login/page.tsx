import { PageHero } from "@/components/ui/page-hero";

export default function MemberLoginPage() {
  return (
    <div className="space-y-12 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Member Services"
          title="Member login"
          description="Access the member portal to manage bookings, statements, and event registrations. Portal credentials are issued upon successful onboarding."
          actions={[
            { label: "Reset Password", href: "mailto:info@hprc.co.in", variant: "outline" },
            { label: "Contact Support", href: "/contact", variant: "primary" },
          ]}
        />
      </div>
      <section className="container space-y-4 text-sm text-gray-700">
        <p>
          The online member portal is currently being refreshed. For immediate assistance with
          bookings or statements, please reach out to the membership desk at{" "}
          <a href="mailto:info@hprc.co.in">info@hprc.co.in</a> or call{" "}
          <a href="tel:+919177000056">+91 9177 00 00 56</a>.
        </p>
      </section>
    </div>
  );
}

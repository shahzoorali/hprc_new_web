import { PageHero } from "@/components/ui/page-hero";

export default function PayNowPage() {
  return (
    <div className="space-y-12 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Member Services"
          title="Online payments"
          description="Settle invoices for riding programmes, sports bookings, or hospitality events through the secure payment link provided by the accounts desk."
          actions={[
            { label: "Request Payment Link", href: "mailto:info@hprc.co.in", variant: "primary" },
          ]}
        />
      </div>
      <section className="container space-y-4 text-sm text-gray-700">
        <p>
          For now, payments can be made via bank transfer or UPI using the details shared on your
          invoice. Please send the transaction reference to{" "}
          <a href="mailto:info@hprc.co.in">info@hprc.co.in</a> to receive a confirmation receipt.
        </p>
      </section>
    </div>
  );
}

import { notFound } from "next/navigation";

import { PageHero } from "@/components/ui/page-hero";
import { PricingTable } from "@/components/ui/pricing-table";
import { programmesContent } from "@/content/programmes";

type ProgrammePageProps = {
  params: Promise<{ programmeId: string }>;
};

export default async function ProgrammeDetailPage({ params }: ProgrammePageProps) {
  const { programmeId } = await params;
  const programme = programmesContent.programmes.find((item) => item.id === programmeId);

  if (!programme) {
    notFound();
  }

  return (
    <div className="space-y-16 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Programme"
          title={programme.title}
          description={programme.excerpt}
          actions={[
            { label: "Enquire Now", href: "/contact", variant: "primary" },
            { label: "View All Programmes", href: "/programmes", variant: "outline" },
          ]}
        />
      </div>

      <section className="container space-y-6 text-sm text-gray-700">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
          {programme.schedule}
        </p>
        <ul className="space-y-3">
          {programme.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </section>

      {programme.pricingTables?.length ? (
        <section className="container grid gap-6 md:grid-cols-2">
          {programme.pricingTables.map((table) => (
            <PricingTable key={table.heading} heading={table.heading} rows={table.rows} />
          ))}
        </section>
      ) : null}
    </div>
  );
}

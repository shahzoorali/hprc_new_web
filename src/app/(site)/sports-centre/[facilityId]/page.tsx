import { notFound } from "next/navigation";

import { PageHero } from "@/components/ui/page-hero";
import { sportsContent } from "@/content/sports";

type FacilityPageProps = {
  params: { facilityId: string };
};

export default function FacilityPage({ params }: FacilityPageProps) {
  const facility = sportsContent.facilities.find((item) => item.id === params.facilityId);

  if (!facility) {
    notFound();
  }

  return (
    <div className="space-y-16 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Sports Centre"
          title={facility.name}
          description={facility.description}
          actions={[
            { label: "Book a Session", href: "/contact", variant: "primary" },
            { label: "View All Facilities", href: "/sports-centre", variant: "outline" },
          ]}
        />
      </div>

      <section className="container space-y-4 text-sm text-gray-700">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">
          {facility.timings}
        </p>
        <ul className="space-y-3">
          {facility.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

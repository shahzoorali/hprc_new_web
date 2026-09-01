import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FacilityPageView } from "@/components/facility-page-view";
import { getFacility, getFacilitySlugs } from "@/lib/facilities";

// Every sports-centre facility page. Replaces the eight hand-written pages that
// used to sit alongside this route — they had an identical structure and are now
// one component reading CMS data, so adding a facility is a CMS record.

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getFacilitySlugs();
  return slugs.map((facilityId) => ({ facilityId }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ facilityId: string }>;
}): Promise<Metadata> {
  const { facilityId } = await params;
  const facility = await getFacility(facilityId);
  if (!facility) return {};
  return {
    title: facility.hero.title,
    description: facility.hero.description,
  };
}

export default async function FacilityPage({
  params,
}: {
  params: Promise<{ facilityId: string }>;
}) {
  const { facilityId } = await params;
  const facility = await getFacility(facilityId);

  if (!facility) {
    notFound();
  }

  return <FacilityPageView facility={facility} />;
}

import { PageHero } from "@/components/ui/page-hero";

export default function PhotoGalleryPage() {
  return (
    <div className="space-y-12 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Media"
          title="Photo gallery"
          description="Browse curated albums of tournaments, training camps, hospitality experiences, and member socials."
          actions={[
            { label: "Share Your Photos", href: "mailto:info@hprc.co.in", variant: "outline" },
          ]}
        />
      </div>
      <section className="container space-y-4 text-sm text-gray-700">
        <p>
          High-resolution photo albums will be published shortly. Meanwhile, connect with our media
          desk to request images for press or personal use.
        </p>
      </section>
    </div>
  );
}

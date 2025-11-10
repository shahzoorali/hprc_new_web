import { PageHero } from "@/components/ui/page-hero";

export default function VideoGalleryPage() {
  return (
    <div className="space-y-12 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Media"
          title="Video gallery"
          description="Match highlights, rider spotlights, and behind-the-scenes footage from the Hyderabad Polo & Riding Club."
          actions={[
            {
              label: "Watch on YouTube",
              href: "https://www.youtube.com/channel/UC40silYJ07LvOjP4bnuRTqg",
              variant: "primary",
            },
          ]}
        />
      </div>
      <section className="container space-y-4 text-sm text-gray-700">
        <p>
          Our digital archive is being enhanced with playlists featuring arena polo chukkers, show
          jumping rounds, and hospitality experiences. Subscribe to our YouTube channel for the
          latest uploads.
        </p>
      </section>
    </div>
  );
}

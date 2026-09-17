"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Extract YouTube video ID from various YouTube URL formats
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

type HeroVideoProps = {
  videoUrl: string;
  fallbackImage?: string;
  imageAlt?: string;
};

export function HeroVideo({ videoUrl, fallbackImage, imageAlt = "Hero video" }: HeroVideoProps) {
  const videoId = extractYouTubeId(videoUrl);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    if (!videoId) return;

    // Skip the YouTube embed entirely on small viewports: it's a muted,
    // control-less decorative loop, and on mobile it's pure bandwidth/CPU
    // cost (~845 KiB of YouTube JS/CSS) for something users can't interact
    // with anyway. The fallback image stays as the permanent background.
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    // Defer the YouTube embed until after the page has become interactive
    // so it doesn't compete with LCP/critical rendering.
    const ric = (window as typeof window & { requestIdleCallback?: typeof requestIdleCallback })
      .requestIdleCallback;
    if (ric) {
      const id = ric(() => setShouldLoadVideo(true), { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(() => setShouldLoadVideo(true), 1500);
    return () => window.clearTimeout(timer);
  }, [videoId]);

  return (
    <section className="relative min-h-[74vh] w-full overflow-hidden" aria-label="Hero section">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {/* Fallback Image - always show as background/loading state */}
        {fallbackImage && (
          <Image
            src={fallbackImage}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            quality={75}
          />
        )}

        {/* YouTube Video Background - mounted after idle to keep it off the critical path */}
        {videoId && shouldLoadVideo && (
          <div className="absolute inset-0 h-full w-full overflow-hidden">
            <iframe
              className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&loop=1&mute=1&controls=0&playlist=${videoId}&playsinline=1&modestbranding=1&rel=0&showinfo=0&enablejsapi=1&iv_load_policy=3`}
              title={imageAlt}
              allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
              allowFullScreen={false}
              style={{ pointerEvents: "none" }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

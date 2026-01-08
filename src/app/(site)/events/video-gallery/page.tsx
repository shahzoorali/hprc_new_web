"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Real videos from HPRC YouTube Channel
// https://www.youtube.com/channel/UC40silYJ07LvOjP4bnuRTqg
const featuredVideos = [
  {
    id: "featured-1",
    title: "International Arena Polo Tournament 2024 - Full Documentary",
    description:
      "Complete documentary coverage of the International Arena Polo Tournament 2024 at Hyderabad Polo & Riding Club featuring teams from around the world.",
    youtubeId: "YkVZu02zy8o",
    duration: "31:00",
    category: "Polo",
    featured: true,
  },
];

const videoCategories = [
  {
    id: "polo",
    name: "Polo Matches",
    icon: "🏇",
    videos: [
      {
        id: "polo-1",
        title: "USA vs INDIA HPRC 2 - Final Match",
        description:
          "Full coverage of the thrilling USA vs India final match at HPRC Arena Polo Championship.",
        youtubeId: "OqYb2gZm0lk",
        duration: "1:07:00",
        views: "2.4K",
      },
      {
        id: "polo-2",
        title: "HPRC World Arena Polo Championship 2025",
        description:
          "Highlights from the prestigious World Arena Polo Championship 2025 held at HPRC.",
        youtubeId: "-N4h3tTNhKo",
        duration: "2:55",
        views: "1.8K",
      },
      {
        id: "polo-3",
        title: "MSN Realty Arena Polo Championship 2025",
        description:
          "Complete coverage of the MSN Realty Arena Polo Championship at Hyderabad Polo Riding Club.",
        youtubeId: "FLlUj7-ITb4",
        duration: "39:00",
        views: "3.2K",
      },
      {
        id: "polo-4",
        title: "International Arena Polo 2024 - Short Documentary",
        description:
          "Short documentary capturing the best moments from International Arena Polo 2024.",
        youtubeId: "YkVZu02zy8o",
        duration: "31:00",
        views: "1.5K",
      },
    ],
  },
  {
    id: "equestrian",
    name: "Equestrian Events",
    icon: "🐴",
    videos: [
      {
        id: "equestrian-1",
        title: "Telangana State Equestrian Competition 2025",
        description:
          "Coverage of the Telangana State Equestrian Competition 2025 and the Regional Equestrian League at HPRC.",
        youtubeId: "y7TG7VDBLDc",
        duration: "2:32",
        views: "4.1K",
      },
      {
        id: "equestrian-2",
        title: "National Equestrian Championship 2016 - HPRC",
        description:
          "Exclusive coverage of the National Equestrian Championship 2016 held at Hyderabad Polo & Riding Club.",
        youtubeId: "siiKeyoFYBw",
        duration: "1:43",
        views: "2.8K",
      },
      {
        id: "equestrian-3",
        title: "6th Hyderabad Horse Show",
        description:
          "Highlights from the 6th Hyderabad Horse Show at Hyderabad Polo and Riding Club.",
        youtubeId: "h9-IKl5QLzA",
        duration: "2:29",
        views: "3.5K",
      },
      {
        id: "equestrian-4",
        title: "Cross Country Ride at HPRC",
        description:
          "Experience the thrill of cross country riding at Hyderabad Polo & Riding Club.",
        youtubeId: "VuMXovWsygY",
        duration: "0:21",
        views: "1.9K",
      },
    ],
  },
  {
    id: "training",
    name: "Training & Tutorials",
    icon: "📚",
    videos: [
      {
        id: "training-1",
        title: "Learn Riding @ HPRC with Asu Singh",
        description:
          "Professional horse riding lessons with expert coach Asu Singh at HPRC.",
        youtubeId: "R_HXpHNhg_k",
        duration: "5:30",
        views: "5.6K",
      },
      {
        id: "training-2",
        title: "Learn Riding at HPRC with Expert Coach",
        description:
          "Beginner-friendly riding lessons at Hyderabad Polo & Riding Club with our expert coaches.",
        youtubeId: "R_HXpHNhg_k",
        duration: "5:30",
        views: "3.2K",
      },
      {
        id: "training-3",
        title: "Sports - Hyderabad Polo & Riding Club",
        description:
          "Overview of sports activities and training programs available at HPRC.",
        youtubeId: "C6eJosttdGQ",
        duration: "4:37",
        views: "2.1K",
      },
    ],
  },
  {
    id: "facilities",
    name: "Club & Facilities",
    icon: "🏛️",
    videos: [
      {
        id: "facilities-1",
        title: "Sports - Hyderabad Polo & Riding Club Overview",
        description:
          "Comprehensive overview of the world-class sports facilities at HPRC.",
        youtubeId: "C6eJosttdGQ",
        duration: "4:37",
        views: "4.8K",
      },
      {
        id: "facilities-2",
        title: "HPRC World Arena Polo Championship Venue",
        description:
          "Tour of the arena polo championship venue and facilities at HPRC.",
        youtubeId: "-N4h3tTNhKo",
        duration: "2:55",
        views: "1.4K",
      },
      {
        id: "facilities-3",
        title: "Telangana State Competition at HPRC",
        description:
          "Experience the competition-ready facilities at Hyderabad Polo & Riding Club.",
        youtubeId: "y7TG7VDBLDc",
        duration: "2:32",
        views: "2.3K",
      },
    ],
  },
];

export default function VideoGalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const allVideos = videoCategories.flatMap((cat) =>
    cat.videos.map((video) => ({
      ...video,
      categoryId: cat.id,
      categoryName: cat.name,
    }))
  );

  const filteredVideos =
    activeCategory === "all"
      ? allVideos
      : allVideos.filter((video) => video.categoryId === activeCategory);

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-[#0f0f0f] to-[#0f0f0f]" />
          {/* YouTube-style grid pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* YouTube-style badge */}
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-8">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              HPRC Official Channel
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Video <span className="text-red-500">Gallery</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
              Match highlights, rider spotlights, training tutorials, and
              behind-the-scenes footage from Hyderabad Polo & Riding Club.
            </p>

            <a
              href="https://www.youtube.com/channel/UC40silYJ07LvOjP4bnuRTqg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Featured Video */}
      {featuredVideos.length > 0 && (
        <section className="py-12 border-b border-white/10">
          <div className="container px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-6 bg-red-600 rounded-full" />
              <h2 className="text-xl font-bold text-white">Featured Video</h2>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
              {/* Main Video Player */}
              <div className="lg:col-span-3">
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                  {playingVideo === featuredVideos[0].id ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${featuredVideos[0].youtubeId}?autoplay=1`}
                      title={featuredVideos[0].title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : (
                    <button
                      onClick={() => setPlayingVideo(featuredVideos[0].id)}
                      className="group absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={`https://img.youtube.com/vi/${featuredVideos[0].youtubeId}/maxresdefault.jpg`}
                        alt={featuredVideos[0].title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                          <svg
                            className="h-10 w-10 text-white ml-1"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/80 text-white text-sm px-2 py-1 rounded">
                        {featuredVideos[0].duration}
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* Video Info */}
              <div className="lg:col-span-2 flex flex-col justify-center">
                <span className="inline-flex items-center gap-2 text-red-500 text-sm font-semibold mb-3">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  FEATURED
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                  {featuredVideos[0].title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {featuredVideos[0].description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                      />
                    </svg>
                    {featuredVideos[0].category}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {featuredVideos[0].duration}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="sticky top-0 z-40 bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/10">
        <div className="container px-4">
          <div className="flex items-center gap-2 py-4 overflow-x-auto">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === "all"
                  ? "bg-white text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              All Videos
            </button>
            {videoCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeCategory === category.id
                    ? "bg-white text-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-12">
        <div className="container px-4">
          {activeCategory === "all" ? (
            // Show by category
            videoCategories.map((category) => (
              <div key={category.id} className="mb-16">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h2 className="text-xl font-bold text-white">
                      {category.name}
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveCategory(category.id)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    View All →
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.videos.map((video) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      isPlaying={playingVideo === video.id}
                      onPlay={() => setPlayingVideo(video.id)}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Show filtered videos
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  isPlaying={playingVideo === video.id}
                  onPlay={() => setPlayingVideo(video.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {playingVideo && playingVideo !== featuredVideos[0]?.id && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setPlayingVideo(null)}
        >
          <button
            onClick={() => setPlayingVideo(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${
                allVideos.find((v) => v.id === playingVideo)?.youtubeId
              }?autoplay=1`}
              title="Video Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-xl"
            />
          </div>
        </div>
      )}

      {/* Subscribe CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-t from-red-950/20 to-transparent">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-full mb-8">
              <svg
                className="h-10 w-10 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Never Miss an Update
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Subscribe to our YouTube channel for the latest match highlights,
              training videos, and exclusive behind-the-scenes content.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.youtube.com/channel/UC40silYJ07LvOjP4bnuRTqg?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Subscribe Now
              </a>
              <Link
                href="/events/photo-gallery"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white hover:bg-white/5 px-8 py-4 rounded-full font-semibold transition-all"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                View Photo Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Video Card Component
function VideoCard({
  video,
  isPlaying,
  onPlay,
}: {
  video: {
    id: string;
    title: string;
    description: string;
    youtubeId: string;
    duration: string;
    views?: string;
  };
  isPlaying: boolean;
  onPlay: () => void;
}) {
  return (
    <button onClick={onPlay} className="group text-left w-full">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden mb-3">
        <Image
          src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="h-6 w-6 text-white ml-0.5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duration */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
          {video.duration}
        </div>
      </div>

      {/* Info */}
      <h3 className="text-white font-medium text-sm leading-snug line-clamp-2 group-hover:text-red-400 transition-colors mb-1">
        {video.title}
      </h3>
      {video.views && <p className="text-gray-500 text-xs">{video.views} views</p>}
    </button>
  );
}

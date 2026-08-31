"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { LegacyGalleryCategory } from "@/lib/galleries";

// Type definitions
type Album = {
  id: string;
  title: string;
  coverImage: string;
  images: string[];
  year?: string;
  date?: string;
};

type AlbumWithCategory = Album & {
  category: string;
};

// Data comes from the CMS — see src/lib/galleries.ts

export function PhotoGalleryClient({
  galleryCategories,
}: {
  galleryCategories: LegacyGalleryCategory[];
}) {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const allAlbums: AlbumWithCategory[] = galleryCategories.flatMap((cat) =>
    cat.albums.map((album) => ({ ...album, category: cat.id })),
  );

  const filteredAlbums =
    activeCategory === "all"
      ? allAlbums
      : allAlbums.filter((album) => album.category === activeCategory);

  const currentAlbum: AlbumWithCategory | undefined = selectedAlbum
    ? allAlbums.find((a) => a.id === selectedAlbum)
    : undefined;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container px-4 relative">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-brand-500" />
              <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">
                Media
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Photo{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-cyan-400">
                Gallery
              </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed mb-8">
              Browse curated albums of our world-class facilities, tournaments, training camps, and
              memorable events at Hyderabad Polo & Riding Club.
            </p>

            <a
              href="mailto:info@hprc.co.in"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white hover:bg-white/5 px-6 py-3 rounded-full text-sm font-medium transition-all"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Request High-Res Images
            </a>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
        <div className="container px-4">
          <div className="flex items-center gap-2 py-4 overflow-x-auto">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === "all"
                  ? "bg-brand-500 text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              All Albums
            </button>
            {galleryCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? "bg-brand-500 text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Albums Grid */}
      <section className="py-12 sm:py-16">
        <div className="container px-4">
          {/* Category Headers */}
          {activeCategory === "all" ? (
            galleryCategories.map((category) => (
              <div key={category.id} className="mb-16">
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {category.name}
                  </h2>
                  <p className="text-slate-400">{category.description}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {category.albums.map((album) => (
                    <AlbumCard
                      key={album.id}
                      album={album}
                      onClick={() => album.images.length > 0 && setSelectedAlbum(album.id)}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredAlbums.map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  onClick={() => album.images.length > 0 && setSelectedAlbum(album.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Album Modal */}
      {selectedAlbum && currentAlbum && (
        <div className="fixed inset-0 z-50 bg-black/95 overflow-y-auto">
          <div className="min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10">
              <div className="container px-4 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">{currentAlbum.title}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    {(currentAlbum.date || currentAlbum.year) && (
                      <p className="text-sm text-brand-400 font-medium">
                        {currentAlbum.date || currentAlbum.year}
                      </p>
                    )}
                    <p className="text-sm text-slate-400">{currentAlbum.images.length} photos</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Images Grid */}
            <div className="container px-4 py-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentAlbum.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setLightboxImage(image)}
                    className="group relative aspect-square overflow-hidden rounded-lg bg-slate-800"
                  >
                    <Image
                      src={image}
                      alt={`${currentAlbum.title} - Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg
                          className="h-8 w-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={lightboxImage}
              alt="Full size image"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-t from-slate-900 to-slate-950">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Want to Share Your Photos?
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              If you have photos from HPRC events that you&apos;d like to share, or need
              high-resolution images for press or personal use, get in touch with our media team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:info@hprc.co.in"
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-full font-semibold transition-all"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Media Team
              </a>
              <Link
                href="/events/video-gallery"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white hover:bg-white/5 px-6 py-3 rounded-full font-semibold transition-all"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                View Video Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Album Card Component
function AlbumCard({
  album,
  onClick,
}: {
  album: {
    id: string;
    title: string;
    coverImage: string;
    images: string[];
    year?: string;
    date?: string;
  };
  onClick: () => void;
}) {
  const hasImages = album.images.length > 0;
  const displayDate = album.date || album.year || "";

  return (
    <button
      onClick={onClick}
      disabled={!hasImages}
      className={`group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-800 text-left ${
        hasImages ? "cursor-pointer" : "cursor-default opacity-75"
      }`}
    >
      <Image
        src={album.coverImage}
        alt={album.title}
        fill
        className={`object-cover transition-transform duration-700 ${
          hasImages ? "group-hover:scale-110" : ""
        }`}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent ${
          hasImages ? "group-hover:from-black/90" : ""
        } transition-colors duration-300`}
      />

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        {displayDate && (
          <span className="text-brand-400 text-xs font-medium mb-1">{displayDate}</span>
        )}
        <h3 className="text-white font-semibold text-sm sm:text-base leading-tight line-clamp-2">
          {album.title}
        </h3>
        {hasImages && (
          <span className="text-white/60 text-xs mt-1">{album.images.length} photos</span>
        )}
        {!hasImages && <span className="text-white/40 text-xs mt-1 italic">Coming soon</span>}
      </div>

      {/* Hover Icon */}
      {hasImages && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </div>
        </div>
      )}
    </button>
  );
}

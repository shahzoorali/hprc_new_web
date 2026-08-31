"use client";

import Image from "next/image";
import { useState } from "react";

import { ImageLightbox } from "@/components/ui/image-lightbox";

// Renders an imageGallery block using the site's existing lightbox — the same
// interaction the hand-built news pages already use.
export function BlockGallery({
  heading,
  columns,
  images,
}: {
  heading?: string;
  columns: string;
  images: Array<{ src: string; alt: string }>;
}) {
  const [openAt, setOpenAt] = useState<number | null>(null);

  if (images.length === 0) return null;

  const cols =
    columns === "2"
      ? "sm:grid-cols-2"
      : columns === "4"
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="my-10">
      {heading ? (
        <h2 className="font-display mb-4 text-2xl font-bold text-neutral-900">{heading}</h2>
      ) : null}
      <div className={`grid grid-cols-1 gap-3 ${cols}`}>
        {images.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            type="button"
            onClick={() => setOpenAt(i)}
            className="group relative aspect-[4/3] overflow-hidden bg-neutral-100"
            aria-label={`Open image: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      <ImageLightbox
        images={images}
        initialIndex={openAt ?? 0}
        isOpen={openAt !== null}
        onClose={() => setOpenAt(null)}
      />
    </div>
  );
}

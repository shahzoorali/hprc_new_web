"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export type HeroSlide = {
  image?: string;
  video?: string; // YouTube URL or video URL
  imageAlt: string;
  title: string;
  titleHighlight?: string;
  description: string;
  actions?: Array<{
    label: string;
    href: string;
    variant?: "primary" | "outline";
  }>;
};

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

type HeroSliderProps = {
  slides: HeroSlide[];
  autoPlayInterval?: number;
};

export function HeroSlider({ slides, autoPlayInterval = 5000 }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Pause auto-play when user manually navigates
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center px-4 py-20 sm:py-28 overflow-hidden"
      aria-label="Hero section"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Images/Videos with Fade Transition */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          const videoId = slide.video ? extractYouTubeId(slide.video) : null;

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Image Background - always show as fallback/background */}
              {slide.image && (
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  quality={90}
                />
              )}

              {/* Video Background - render on top when active */}
              {videoId && isActive && (
                <div className="absolute inset-0 h-full w-full overflow-hidden z-10">
                  <iframe
                    className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&mute=1&controls=0&playlist=${videoId}&playsinline=1&modestbranding=1&rel=0&showinfo=0&enablejsapi=1&iv_load_policy=3`}
                    title={slide.imageAlt}
                    allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
                    allowFullScreen={false}
                    style={{ pointerEvents: "none" }}
                  />
                </div>
              )}

              {/* Overlay Gradients - above video */}
              <div className="absolute inset-0 z-20 bg-gradient-to-br from-white/85 via-brand-50/40 to-white/90"></div>
              <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_50%,rgba(227,30,36,0.05),transparent_60%)]"></div>
            </div>
          );
        })}
      </div>

      {/* Content with Fade Transition */}
      <div className="mx-auto max-w-7xl text-center relative z-10">
        <div key={currentSlide} className="animate-fade-in">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1]">
            {currentSlideData.titleHighlight ? (
              <>
                {currentSlideData.title}
                <br />
                <span className="text-brand-500">{currentSlideData.titleHighlight}</span>
              </>
            ) : (
              currentSlideData.title
            )}
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-lg text-gray-600 sm:text-xl md:text-2xl leading-relaxed font-normal">
            {currentSlideData.description}
          </p>
          {currentSlideData.actions && currentSlideData.actions.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {currentSlideData.actions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className={
                    action.variant === "primary"
                      ? "inline-flex items-center justify-center bg-brand-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-brand-500/40 transition-all duration-300 hover:bg-brand-600 hover:shadow-2xl hover:shadow-brand-500/50 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-brand-500/50 focus:ring-offset-2"
                      : "inline-flex items-center justify-center border-2 border-gray-300 bg-white px-8 py-4 text-base font-bold text-gray-900 transition-all duration-300 hover:border-brand-500 hover:text-brand-500 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-500/50 focus:ring-offset-2"
                  }
                >
                  {action.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center bg-white/90 backdrop-blur-sm text-gray-900 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 focus:outline-none focus:ring-4 focus:ring-brand-500/50 focus:ring-offset-2"
            aria-label="Previous slide"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center bg-white/90 backdrop-blur-sm text-gray-900 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 focus:outline-none focus:ring-4 focus:ring-brand-500/50 focus:ring-offset-2"
            aria-label="Next slide"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-transparent ${
                index === currentSlide ? "w-8 bg-brand-500" : "w-3 bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

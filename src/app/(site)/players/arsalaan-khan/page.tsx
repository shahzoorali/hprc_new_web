"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { arsalaanKhan as player } from "@/content/players/arsalaan-khan";

function CarouselSection({ gallery, onImageClick }: { gallery: any[], onImageClick: (url: string) => void }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isDraggingRef = React.useRef(false);
  const startXRef = React.useRef(0);
  const scrollLeftRef = React.useRef(0);
  const [isHovered, setIsHovered] = React.useState(false);

  // Triple items for seamless loop
  const scrollItems = [...gallery, ...gallery, ...gallery];

  // Continuous drift logic
  React.useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    let animationFrameId: number;
    const scroll = () => {
      if (!isHovered && !isDraggingRef.current) {
        slider.scrollLeft += 0.8; // Slower, smoother drift
        if (slider.scrollLeft >= slider.scrollWidth / 1.5) {
          slider.scrollLeft = slider.scrollWidth / 3;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  // Initial scroll
  React.useEffect(() => {
    const slider = scrollRef.current;
    if (slider) {
      slider.scrollLeft = slider.scrollWidth / 3;
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeftRef.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startXRef.current); // 1:1 movement for smoothness
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeftRef.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const x = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startXRef.current);
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <section className="py-20 sm:py-32 overflow-hidden bg-[#0c0c0c]">
      <div className="container mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500 mb-4">Capturing the Moment</p>
            <h2 className="text-4xl sm:text-6xl font-extrabold font-display uppercase tracking-tighter">Gallery</h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm italic hidden sm:block font-light">
            Interact to explore. Moments captured in motion.
          </p>
        </div>
      </div>

      <div 
        className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); isDraggingRef.current = false; }}
      >
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden whitespace-nowrap"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {scrollItems.map((item, index) => (
            <div
              key={index}
              className="relative flex-none w-[280px] sm:w-[350px] lg:w-[450px] aspect-[4/5] group overflow-hidden"
              onClick={() => !isDraggingRef.current && onImageClick(item.url)}
            >
              <Image
                src={item.url}
                alt={item.caption}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400 mb-2">HPRC Exclusive</p>
                <p className="text-lg font-bold font-display uppercase tracking-tight leading-tight">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PlayerProfilePage() {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  return (
    <div className="bg-[#0c0c0c] text-white min-h-screen">
      {/* ═══════════════════════════════════════════════════════════ LIGHTBOX */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10 cursor-zoom-out animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full">
            <Image 
              src={selectedImage} 
              alt="Enlarged view" 
              fill 
              className="object-contain" 
            />
            <button 
              className="absolute top-0 right-0 p-4 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ HERO SECTION */}
      <section className="relative h-[90vh] min-h-[700px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 cursor-zoom-in" onClick={() => setSelectedImage("/images/arsalan-khan.png")}>
          <Image
            src="/images/arsalan-khan.png"
            alt={player.name}
            fill
            className="object-cover object-top opacity-60 grayscale hover:grayscale-0 transition-all duration-1000 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0c] via-transparent to-transparent opacity-80" />
        </div>
        {/* ... Rest of Hero ... */}


        {/* Hero Content */}
        <div className="container relative h-full flex flex-col justify-end pb-20 z-10">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-brand-500 text-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
              <span className="h-2 w-2 bg-white animate-pulse" />
              {player.club}
            </div>
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold font-display leading-[0.85] tracking-tighter mb-6">
              {player.name.split(" ")[0]}
              <br />
              <span className="text-brand-500">{player.name.split(" ")[1]}</span>
            </h1>

            <Link 
              href="https://www.instagram.com/khan_arsalaan/" 
              target="_blank" 
              className="inline-flex items-center gap-2 text-white/40 hover:text-brand-400 transition-colors mb-8 group"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.947.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.279.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="text-xs font-bold uppercase tracking-[0.2em]">@khan_arsalan</span>
            </Link>
            
            <div className="flex flex-wrap gap-x-12 gap-y-6 mt-10">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Handicap</p>
                <p className="text-3xl font-bold font-display">{player.handicap}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Position</p>
                <p className="text-3xl font-bold font-display">{player.position}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Playing Hand</p>
                <p className="text-3xl font-bold font-display">{player.hand}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Side Badge */}
        <div className="absolute top-1/2 right-4 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <p className="text-[10px] font-bold uppercase tracking-[1em] text-white/20 whitespace-nowrap">
            ELITE POLO PLAYER · HYDERABAD · INDIA
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ LEGACY SECTION */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-500/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500 mb-4">{player.legacy.title}</p>
                <h2 className="text-4xl sm:text-5xl font-extrabold font-display leading-tight italic">
                  &ldquo;Stirring the soul of Polo since 1926.&rdquo;
                </h2>
              </div>
              <div className="space-y-6 text-lg text-white/70 font-light leading-relaxed max-w-xl">
                <p>{player.bio.split("\n\n")[0]}</p>
                <p className="text-sm border-l-2 border-brand-500 pl-6 italic text-white/50">
                   Hon. Polo Secretary · HPRC
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 border border-white/10 translate-x-4 translate-y-4" />
              <div className="relative aspect-[4/5] bg-neutral-900 border border-white/20">
                <Image 
                  src="/images/players/arsalaan-khan/arsalaan-action-1.jpg" 
                  alt="Legacy Action" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute bottom-10 -left-10 bg-brand-600 p-8 shadow-2xl hidden md:block">
                <p className="text-4xl font-extrabold font-display">15+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold">Years Playing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ STATS GRID */}
      <section className="bg-neutral-900 py-24">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {player.stats.map((stat, i) => (
              <div key={i} className="text-center p-8 border border-white/5 hover:border-brand-500/30 transition-colors group">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-hover:text-brand-400 transition-colors mb-4">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold font-display">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ GALLERY CAROUSEL */}
      <CarouselSection gallery={player.gallery} onImageClick={setSelectedImage} />

      {/* ═══════════════════════════════════════════════════════════ IN PRESS SECTION */}
      <section className="bg-[#080808] py-32 border-y border-white/5">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500 mb-4">Digital Presence</p>
              <h2 className="text-4xl font-extrabold font-display uppercase tracking-tighter mb-8 leading-none">In The<br/><span className="text-white/20 underline decoration-brand-500/40">Press</span></h2>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Featured insights and news coverage from leading publications across the globe.
              </p>
            </div>
            <div className="lg:col-span-8 flex flex-col divide-y divide-white/10">
              {player.press.map((item, i) => (
                <Link key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="group py-8 flex items-center justify-between hover:px-6 transition-all duration-500">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-500 font-bold">{item.source} · {item.date}</p>
                    <h3 className="text-xl sm:text-2xl font-bold font-display group-hover:text-brand-400 transition-colors uppercase tracking-tight">{item.title}</h3>
                  </div>
                  <div className="h-12 w-12 flex items-center justify-center border border-white/20 group-hover:bg-brand-500 group-hover:border-brand-500 transition-all">
                    <svg className="h-5 w-5 rotate-45 group-hover:rotate-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ LIFESTYLE SECTION */}
      <section className="py-20 sm:py-32 relative overflow-hidden">
        <div className="container">
          <div className="bg-neutral-900 p-8 sm:p-12 lg:p-20 relative">
             <div className="absolute top-0 left-0 w-1 sm:w-2 h-full bg-brand-500" />
             <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500 mb-6">Beyond the Field</p>
                <h2 className="text-3xl sm:text-4xl xl:text-6xl font-extrabold font-display leading-[1.1] sm:leading-[0.9] mb-8 sm:mb-10 tracking-tighter uppercase">Entrepreneurship &amp;<br/>Hospitality</h2>
                <p className="text-white/60 text-base sm:text-lg leading-relaxed font-light mb-8">
                  {player.bio.split("\n\n")[1]}
                </p>
                <div className="flex gap-4">
                  <Link href="https://www.instagram.com/khan_arsalaan/" target="_blank" rel="noopener noreferrer" className="bg-white !text-brand-500 px-6 sm:px-8 py-3 font-bold uppercase text-[10px] sm:text-xs tracking-widest hover:bg-brand-500 hover:!text-white transition-colors">Collaborate</Link>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ CTA SECTION */}
      <section className="bg-brand-500 py-16">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display uppercase tracking-tighter text-white">Watch matches live at HPRC</h2>
          <Link href="/events" className="px-10 py-4 border-2 border-white text-white font-bold uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-brand-500 transition-all">View Event Schedule</Link>
        </div>
      </section>
    </div>
  );
}

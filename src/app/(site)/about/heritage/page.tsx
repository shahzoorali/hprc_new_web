import Image from "next/image";
import Link from "next/link";

import { aboutContent } from "@/content/about";

export default function HeritagePage() {
  // Group heritage items by era for visual storytelling
  const eras = [
    { name: "The Golden Age", range: "1877-1896", items: aboutContent.heritage.slice(0, 3) },
    { name: "Challenges & Revival", range: "1949-1976", items: aboutContent.heritage.slice(3, 7) },
    { name: "Modern Renaissance", range: "2005-Present", items: aboutContent.heritage.slice(7) },
  ];

  return (
    <div className="bg-stone-950">
      {/* Immersive Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background with vintage texture */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80')] bg-cover bg-center bg-fixed" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/60 to-stone-950" />
          {/* Decorative grain overlay */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Decorative element */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/70" />
              <svg className="h-8 w-8 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
              </svg>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/70" />
            </div>

            <span className="inline-block text-amber-500 text-sm sm:text-base font-semibold tracking-[0.3em] uppercase mb-4">
              Est. 1877
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              A Legacy of
              <span className="block text-amber-400 italic">Equestrian Excellence</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed mb-10">
              From the Paigah nobles to modern-day championships, Hyderabad&apos;s polo story 
              is woven into every stride at HPRC—a journey spanning nearly 150 years.
            </p>

            {/* Scroll indicator */}
            <div className="animate-bounce">
              <svg className="h-8 w-8 mx-auto text-amber-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-amber-500/30" />
        <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-amber-500/30" />
      </section>

      {/* Opening Quote Section */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-stone-950 to-stone-900">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <svg className="h-12 w-12 mx-auto text-amber-500/40 mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-200 italic leading-relaxed mb-6">
              &ldquo;The game of polo is like life itself—it requires courage, skill, and an 
              unwavering bond between horse and rider.&rdquo;
            </blockquote>
            <cite className="text-amber-500 font-medium not-italic">
              — Sir Vicar-ul-Umar Bahadur, 1877
            </cite>
          </div>
        </div>
      </section>

      {/* Timeline Eras */}
      {eras.map((era, eraIndex) => (
        <section 
          key={era.name}
          className={`relative py-20 sm:py-28 ${
            eraIndex % 2 === 0 
              ? "bg-stone-900" 
              : "bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900"
          }`}
        >
          {/* Era Header */}
          <div className="container px-4 mb-12 sm:mb-16">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-500/50 hidden sm:block" />
              <div className="text-center">
                <span className="block text-amber-500 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-2">
                  {era.range}
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white">
                  {era.name}
                </h2>
              </div>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-500/50 hidden sm:block" />
            </div>
          </div>

          {/* Era Timeline Items */}
          <div className="container px-4">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/0 via-amber-500/50 to-amber-500/0 sm:-translate-x-1/2" />

              <div className="space-y-12 sm:space-y-16">
                {era.items.map((item, index) => (
                  <div
                    key={`${item.year}-${index}`}
                    className={`relative flex flex-col sm:flex-row items-start gap-8 ${
                      index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    {/* Year Badge - Mobile */}
                    <div className="sm:hidden absolute left-0 top-0">
                      <div className="relative">
                        <div className="absolute inset-0 bg-amber-500 blur-lg opacity-30" />
                        <div className="relative bg-gradient-to-br from-amber-500 to-amber-600 text-stone-950 px-4 py-2 font-bold text-lg shadow-xl">
                          {item.year}
                        </div>
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className={`flex-1 pl-20 sm:pl-0 ${index % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12 sm:text-left"}`}>
                      <div className="group relative">
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative bg-stone-800/80 backdrop-blur-sm border border-stone-700/50 rounded-lg p-6 sm:p-8 hover:border-amber-500/30 transition-all duration-500">
                          {/* Year - Desktop */}
                          <div className={`hidden sm:block mb-4 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                            <span className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 px-4 py-1.5 font-bold text-sm rounded">
                              {item.year}
                            </span>
                          </div>
                          
                          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
                            {item.summary}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="hidden sm:flex absolute left-1/2 top-8 -translate-x-1/2 items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-amber-500 rounded-full blur-md opacity-50 animate-pulse" />
                        <div className="relative h-4 w-4 bg-amber-500 rounded-full border-4 border-stone-900" />
                      </div>
                    </div>

                    {/* Empty space for alternating layout */}
                    <div className="hidden sm:block flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Statistics Section */}
      <section className="relative py-20 sm:py-28 bg-stone-950 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }} />
        </div>

        <div className="container px-4 relative">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-amber-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3 block">
              By The Numbers
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Our Legacy in Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              { number: "147+", label: "Years of Heritage" },
              { number: "50+", label: "Trained Horses" },
              { number: "10", label: "Acres of Estate" },
              { number: "2005", label: "HPRC Founded" },
            ].map((stat, index) => (
              <div 
                key={index}
                className="group relative text-center p-6 sm:p-8"
              >
                <div className="absolute inset-0 border border-amber-500/20 rounded-lg group-hover:border-amber-500/40 group-hover:bg-amber-500/5 transition-all duration-500" />
                <div className="relative">
                  <span className="block text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-2">
                    {stat.number}
                  </span>
                  <span className="text-stone-400 text-sm sm:text-base font-medium">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Teaser */}
      <section className="relative py-20 sm:py-28 bg-stone-900">
        <div className="container px-4">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-amber-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3 block">
              Memories
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
              Moments Through Time
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto">
              A visual journey through the decades of polo excellence in Hyderabad
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
              "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80",
              "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80",
              "https://images.unsplash.com/photo-1534307671554-9a6d81f4d629?w=600&q=80",
            ].map((src, index) => (
              <div 
                key={index}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={src}
                  alt={`Heritage gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/20 transition-colors duration-500" />
                <div className="absolute inset-0 border border-amber-500/0 group-hover:border-amber-500/50 rounded-lg transition-colors duration-500" />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/events/photo-gallery"
              className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-medium transition-colors"
            >
              View Full Gallery
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-stone-900 to-stone-950">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Be Part of Our
              <span className="text-amber-500"> Continuing Legacy</span>
            </h2>
            <p className="text-stone-300 text-lg mb-10 max-w-xl mx-auto">
              Experience the tradition, passion, and excellence that has defined 
              Hyderabad&apos;s equestrian heritage for over a century.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-stone-950 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30"
              >
                Plan Your Visit
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/membership"
                className="inline-flex items-center gap-2 border-2 border-amber-500/50 hover:border-amber-500 text-amber-500 hover:bg-amber-500/10 px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                Explore Membership
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

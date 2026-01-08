import Image from "next/image";
import Link from "next/link";

import { aboutContent } from "@/content/about";

export default function AboutPage() {
  return (
    <div className="bg-[#0a0a0a]">
      {/* Hero - Cinematic Split Screen */}
      <section className="relative min-h-screen">
        <div className="grid lg:grid-cols-2 min-h-screen">
          {/* Left - Dark Content Panel */}
          <div className="relative flex items-center justify-center p-8 sm:p-12 lg:p-20 order-2 lg:order-1 bg-[#0a0a0a]">
            {/* Subtle Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                backgroundSize: '60px 60px'
              }}
            />
            
            <div className="relative max-w-xl">
              {/* Accent Line */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-400" />
                <span className="text-emerald-400 text-xs font-mono tracking-[0.3em] uppercase">
                  Since 2005
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-6 leading-[1.1] tracking-tight">
                Hyderabad
                <span className="block font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Polo & Riding
                </span>
                <span className="block text-white/40">Club</span>
              </h1>

              <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-md">
                {aboutContent.hero.description}
              </p>

              {/* Minimal Stats */}
              <div className="grid grid-cols-4 gap-6 mb-10 pb-10 border-b border-white/10">
                {[
                  { value: "20", label: "Years" },
                  { value: "50+", label: "Horses" },
                  { value: "10", label: "Acres" },
                  { value: "25+", label: "Titles" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl sm:text-3xl font-light text-white">{stat.value}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/about/heritage"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-black px-6 py-3 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
                >
                  Explore Heritage
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/about/leadership"
                  className="inline-flex items-center gap-3 border border-white/20 text-white/80 hover:text-white hover:border-white/40 px-6 py-3 text-sm font-medium transition-all duration-300"
                >
                  Meet The Team
                </Link>
              </div>
            </div>
          </div>

          {/* Right - Image Panel */}
          <div className="relative h-[50vh] lg:h-auto order-1 lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&q=80"
              alt="HPRC Polo"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent lg:bg-gradient-to-l" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent lg:hidden" />
            
            {/* Floating Label */}
            <div className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2">
              <span className="text-white/60 text-xs font-mono">HPRC Arena</span>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - Editorial Layout */}
      <section className="py-32 border-t border-white/5">
        <div className="container px-4">
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-emerald-400 text-xs font-mono tracking-[0.2em] uppercase">01</span>
            <div className="w-12 h-[1px] bg-white/20" />
            <span className="text-white/40 text-xs font-mono tracking-[0.2em] uppercase">Our Story</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Main Content */}
            <div className="lg:col-span-7">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-12 leading-[1.1]">
                Where passion for{" "}
                <span className="font-bold text-emerald-400">equestrian excellence</span>{" "}
                meets heritage
              </h2>

              <div className="space-y-8 text-white/60 text-lg leading-relaxed">
                {aboutContent.overview.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Side Images */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                  alt="Polo Match"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1534307671554-9a6d81f4d629?w=600&q=80"
                    alt="Horses"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="text-5xl font-light text-white mb-2">147</div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Years of Polo Heritage</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Asymmetric Cards */}
      <section className="py-32 bg-[#111]">
        <div className="container px-4">
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-emerald-400 text-xs font-mono tracking-[0.2em] uppercase">02</span>
            <div className="w-12 h-[1px] bg-white/20" />
            <span className="text-white/40 text-xs font-mono tracking-[0.2em] uppercase">Purpose</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="group relative bg-white/[0.02] border border-white/5 p-10 sm:p-14 hover:border-emerald-500/30 transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 border border-emerald-500/30 flex items-center justify-center">
                  <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xs font-mono text-white/40 uppercase tracking-[0.2em]">Mission</h3>
              </div>
              
              <p className="text-xl sm:text-2xl text-white/80 leading-relaxed font-light">
                {aboutContent.mission}
              </p>
            </div>

            {/* Vision */}
            <div className="group relative bg-white/[0.02] border border-white/5 p-10 sm:p-14 hover:border-emerald-500/30 transition-all duration-500 lg:mt-20">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 border border-emerald-500/30 flex items-center justify-center">
                  <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xs font-mono text-white/40 uppercase tracking-[0.2em]">Vision</h3>
              </div>
              
              <p className="text-xl sm:text-2xl text-white/80 leading-relaxed font-light">
                {aboutContent.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values - Horizontal Scroll Feel */}
      <section className="py-32 border-t border-white/5">
        <div className="container px-4">
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-emerald-400 text-xs font-mono tracking-[0.2em] uppercase">03</span>
            <div className="w-12 h-[1px] bg-white/20" />
            <span className="text-white/40 text-xs font-mono tracking-[0.2em] uppercase">Values</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-light text-white mb-16 max-w-2xl">
            The principles that{" "}
            <span className="text-emerald-400">define us</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/5">
            {aboutContent.values.map((value, index) => (
              <div
                key={value.title}
                className="group bg-[#0a0a0a] p-8 hover:bg-white/[0.02] transition-colors duration-300"
              >
                <div className="text-emerald-400/40 text-6xl font-light mb-6">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-medium text-white mb-3">{value.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities - Minimal List */}
      <section className="py-32 bg-[#111]">
        <div className="container px-4">
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-emerald-400 text-xs font-mono tracking-[0.2em] uppercase">04</span>
            <div className="w-12 h-[1px] bg-white/20" />
            <span className="text-white/40 text-xs font-mono tracking-[0.2em] uppercase">Facilities</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl sm:text-5xl font-light text-white mb-8">
                World-class{" "}
                <span className="text-emerald-400">amenities</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-10">
                Every detail crafted for extraordinary experiences across our 10-acre estate.
              </p>
              <Link
                href="/sports-centre"
                className="group inline-flex items-center gap-3 text-emerald-400 text-sm font-medium"
              >
                Explore Sports Centre
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {aboutContent.facilities.map((facility, index) => {
                // Map facilities to their respective pages
                const facilityLinks: Record<string, string> = {
                  "Snaffles Bistro – air-conditioned café": "/hospitality/snaffles-bistro",
                  "Chukkers Lounge – bar & restaurant": "/hospitality/chukkers",
                  "Outdoor banquet lawns": "/hospitality/banquets",
                  "Air-conditioned gym": "/sports-centre/gym",
                  "Synthetic tennis courts and basketball court": "/sports-centre/tennis",
                  "Indoor badminton and squash courts": "/sports-centre/badminton",
                  "Futsal surface adaptable for cricket and soccer": "/sports-centre/futsal",
                  "Covered swimming pool": "/sports-centre/swimming",
                  "Showers with steam facilities": "/sports-centre/sauna",
                };
                
                const link = facilityLinks[facility];
                
                return link ? (
                  <Link
                    key={facility}
                    href={link}
                    className="group flex items-center gap-3 py-3 border-b border-white/5 hover:border-emerald-500/30 transition-colors"
                  >
                    <span className="text-emerald-500/50 text-xs font-mono">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-white/70 text-sm group-hover:text-emerald-400 transition-colors">{facility}</span>
                    <svg className="h-3 w-3 text-emerald-500/50 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <div
                    key={facility}
                    className="group flex items-center gap-3 py-3 border-b border-white/5"
                  >
                    <span className="text-emerald-500/50 text-xs font-mono">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-white/50 text-sm">{facility}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Preview - Minimal Cards */}
      <section className="py-32 border-t border-white/5">
        <div className="container px-4">
          {/* Section Label */}
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-4">
              <span className="text-emerald-400 text-xs font-mono tracking-[0.2em] uppercase">05</span>
              <div className="w-12 h-[1px] bg-white/20" />
              <span className="text-white/40 text-xs font-mono tracking-[0.2em] uppercase">Leadership</span>
            </div>
            <Link
              href="/about/leadership"
              className="group hidden sm:inline-flex items-center gap-2 text-white/40 hover:text-emerald-400 text-sm transition-colors"
            >
              View All
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutContent.leadership.slice(0, 3).map((leader, index) => {
              // Get image path for leader
              const getImagePath = (name: string) => {
                if (name === "Chaitanya R. Kumar") return "/images/chaitania.jpg";
                if (name === "Kunwar Sai Vijender Singh") return "/images/kunwar.jpg";
                if (name === "C. Sanjay Reddy") return "/images/sanjay.jpg";
                if (name === "Rupesh Y. Shah") return "/images/rupesh.jpg";
                if (name === "Syed Ahmed (Shahbaz)") return "/images/syed.jpg";
                if (name === "Sanjeev Kumar Agarwal") return "/images/madhu.jpg";
                if (name === "Mohammed Nayeem Uddin") return "/images/mohammed.jpg";
                return null;
              };
              
              const imagePath = getImagePath(leader.name);
              
              return (
              <div
                key={leader.name}
                className="group relative"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] bg-gradient-to-br from-white/5 to-white/[0.02] mb-6 overflow-hidden rounded-lg">
                  {imagePath ? (
                    <>
                      <Image
                        src={imagePath}
                        alt={leader.name}
                        fill
                        className="object-cover object-top"
                        quality={90}
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-light text-white/10">
                          {leader.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </>
                  )}
                </div>
                
                <div>
                  <h3 className="text-xl text-white mb-1">{leader.name}</h3>
                  <p className="text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">{leader.role}</p>
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{leader.bio}</p>
                </div>
              </div>
              );
            })}
          </div>

          <div className="mt-12 sm:hidden">
            <Link
              href="/about/leadership"
              className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium"
            >
              View Full Team
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Heritage Preview - Timeline Dots */}
      <section className="py-32 bg-gradient-to-b from-[#111] to-[#0a0a0a]">
        <div className="container px-4">
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-16">
            <span className="text-emerald-400 text-xs font-mono tracking-[0.2em] uppercase">06</span>
            <div className="w-12 h-[1px] bg-white/20" />
            <span className="text-white/40 text-xs font-mono tracking-[0.2em] uppercase">Heritage</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-light text-white mb-8">
                Nearly 150 years of{" "}
                <span className="text-emerald-400">polo excellence</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-10">
                From the Paigah nobles of 1877 to modern-day championships, Hyderabad&apos;s 
                equestrian journey is woven into every stride at HPRC.
              </p>
              <Link
                href="/about/heritage"
                className="group inline-flex items-center gap-3 bg-emerald-500 text-black px-6 py-3 text-sm font-medium hover:bg-emerald-400 transition-colors"
              >
                Explore Full Timeline
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Timeline Preview */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent" />
              
              <div className="space-y-8">
                {aboutContent.heritage.slice(0, 4).map((item, index) => (
                  <div key={item.year} className="relative pl-12">
                    {/* Dot */}
                    <div className="absolute left-0 top-1 w-8 h-8 border border-emerald-500/30 flex items-center justify-center bg-[#0a0a0a]">
                      <div className="w-2 h-2 bg-emerald-500" />
                    </div>
                    
                    <div className="text-emerald-400 text-sm font-mono mb-1">{item.year}</div>
                    <p className="text-white/60 text-sm leading-relaxed">{item.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Minimal */}
      <section className="py-32 border-t border-white/5">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-8">
              Ready to experience{" "}
              <span className="block text-emerald-400">HPRC?</span>
            </h2>
            <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto">
              Join a community that celebrates heritage, champions excellence, 
              and creates unforgettable experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/membership/apply"
                className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-medium hover:bg-emerald-400 transition-colors"
              >
                Apply for Membership
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 font-medium hover:border-white/40 hover:bg-white/5 transition-all"
              >
                Schedule a Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

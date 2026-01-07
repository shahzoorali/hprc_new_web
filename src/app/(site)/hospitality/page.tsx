import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { hospitalityContent } from "@/content/hospitality";

export default function HospitalityPage() {
  return (
    <div className="space-y-16 sm:space-y-20 pb-16 sm:pb-20">
      <div className="container pt-12 sm:pt-16">
        <PageHero
          eyebrow={hospitalityContent.hero.eyebrow}
          title={hospitalityContent.hero.title}
          description={hospitalityContent.hero.description}
          actions={[{ label: "Plan an Event", href: "/contact", variant: "primary" }]}
        />
      </div>

      {/* Restaurants Section - Creative Layout */}
      <section className="container space-y-12 sm:space-y-16">
        <SectionHeading
          eyebrow="Our Restaurants"
          title="Exquisite dining experiences"
          description="Choose from our two premier dining venues, each offering a unique atmosphere and exceptional cuisine."
          align="center"
        />

        {/* Chukkers Restaurant - Featured */}
        <article className="group relative overflow-hidden  sm: border border-brand-200/50 bg-white shadow-xl">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative h-72 sm:h-80 lg:h-auto overflow-hidden order-2 lg:order-1">
              <Image
                src={
                  hospitalityContent.venues[0].image ||
                  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80"
                }
                alt={hospitalityContent.venues[0].name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-black/60 lg:via-transparent lg:to-transparent"></div>
            </div>
            <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2 bg-gradient-to-br from-brand-50/30 to-white">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                {"logo" in hospitalityContent.venues[0] && hospitalityContent.venues[0].logo && (
                  <div className="relative h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0">
                    <Image
                      src={hospitalityContent.venues[0].logo as string}
                      alt={`${hospitalityContent.venues[0].name} Logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 48px, 64px"
                    />
                  </div>
                )}
                <Link href="/hospitality/chukkers" className="hover:text-brand-600 transition-colors">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
                    {hospitalityContent.venues[0].name}
                  </h2>
                </Link>
              </div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
                {hospitalityContent.venues[0].description}
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                {hospitalityContent.venues[0].fullDescription}
              </p>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {hospitalityContent.venues[0].highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-brand-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
              {hospitalityContent.venues[0].menuLinks && (
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {hospitalityContent.venues[0].menuLinks.map((menu, idx) => (
                    <Link
                      key={idx}
                      href={menu.href}
                      target={menu.href.startsWith('http') || menu.href.endsWith('.pdf') ? '_blank' : undefined}
                      className="inline-flex items-center  border-2 border-brand-500 bg-white px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-brand-600 transition-all duration-300 hover:bg-brand-500 hover:text-white hover:shadow-lg"
                    >
                      {menu.label}
                      <svg
                        className="ml-1.5 sm:ml-2 h-3 sm:h-4 w-3 sm:w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </article>

        {/* Snaffles Bistro - Featured (Reversed) */}
        <article className="group relative overflow-hidden  sm: border border-brand-200/50 bg-white shadow-xl">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative h-72 sm:h-80 lg:h-auto overflow-hidden order-1 lg:order-2">
              <Image
                src={
                  hospitalityContent.venues[1].image ||
                  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80"
                }
                alt={hospitalityContent.venues[1].name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-l lg:from-black/60 lg:via-transparent lg:to-transparent"></div>
            </div>
            <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1 bg-gradient-to-br from-white to-brand-50/30">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                {"logo" in hospitalityContent.venues[1] && hospitalityContent.venues[1].logo && (
                  <div className="relative h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0">
                    <Image
                      src={hospitalityContent.venues[1].logo as string}
                      alt={`${hospitalityContent.venues[1].name} Logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 48px, 64px"
                    />
                  </div>
                )}
                <Link href="/hospitality/snaffles-bistro" className="hover:text-brand-600 transition-colors">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
                    {hospitalityContent.venues[1].name}
                  </h2>
                </Link>
              </div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
                {hospitalityContent.venues[1].description}
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                {hospitalityContent.venues[1].fullDescription}
              </p>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {hospitalityContent.venues[1].highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-brand-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm sm:text-base text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
              {hospitalityContent.venues[1].menuLinks && (
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {hospitalityContent.venues[1].menuLinks.map((menu, idx) => (
                    <Link
                      key={idx}
                      href={menu.href}
                      target={menu.href.startsWith('http') || menu.href.endsWith('.pdf') ? '_blank' : undefined}
                      className="inline-flex items-center  border-2 border-brand-500 bg-white px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-brand-600 transition-all duration-300 hover:bg-brand-500 hover:text-white hover:shadow-lg"
                    >
                      {menu.label}
                      <svg
                        className="ml-1.5 sm:ml-2 h-3 sm:h-4 w-3 sm:w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </article>
      </section>

      {/* Banquets Section with Packages - Redesigned */}
      {hospitalityContent.venues[2] && (
        <section className="relative overflow-hidden">
          {/* Hero Banner with Full-width Image */}
          <div className="relative h-[50vh] min-h-[400px] sm:min-h-[500px]">
            <Image
              src={
                hospitalityContent.venues[2].image ||
                "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80"
              }
              alt={hospitalityContent.venues[2].name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
            
            {/* Floating Content Over Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container text-center text-white px-4">
                <span className="inline-block px-4 py-1.5 bg-brand-500/90 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-full mb-4">
                  Banquets & Events
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg">
                  {hospitalityContent.venues[2].name}
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  {hospitalityContent.venues[2].fullDescription ||
                    hospitalityContent.venues[2].description}
                </p>
              </div>
            </div>
          </div>

          {/* Features & Highlights Grid */}
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-12 sm:py-16">
            <div className="container">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {hospitalityContent.venues[2].highlights.slice(0, 4).map((highlight, idx) => {
                  const icons = [
                    <svg key="icon1" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
                    <svg key="icon2" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>,
                    <svg key="icon3" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
                    <svg key="icon4" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
                  ];
                  return (
                    <div
                      key={idx}
                      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105"
                    >
                      <div className="text-brand-400 mb-3 flex justify-center">
                        {icons[idx]}
                      </div>
                      <p className="text-white/90 text-xs sm:text-sm font-medium leading-snug">{highlight}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Menu Packages - Premium Cards */}
          {hospitalityContent.venues[2].menuPackages && (
            <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black py-16 sm:py-20">
              <div className="container">
                <div className="text-center mb-10 sm:mb-14">
                  <span className="inline-block px-3 py-1 bg-brand-500/20 text-brand-400 text-xs font-semibold tracking-wider uppercase rounded-full mb-3">
                    Pricing
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3">
                    Menu Packages
                  </h3>
                  <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
                    Choose the perfect package for your celebration
                  </p>
                </div>

                <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto">
                  {hospitalityContent.venues[2].menuPackages.map((pkg, idx) => (
                    <div
                      key={idx}
                      className={`relative group ${
                        idx === 1 ? "md:-mt-4 md:mb-4" : ""
                      }`}
                    >
                      {idx === 1 && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                          <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                            ★ MOST POPULAR
                          </span>
                        </div>
                      )}
                      <div
                        className={`relative h-full overflow-hidden rounded-2xl ${
                          idx === 1
                            ? "bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 shadow-2xl shadow-brand-500/30 ring-2 ring-brand-400"
                            : "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 hover:border-gray-600"
                        } transition-all duration-500 hover:shadow-xl hover:-translate-y-1`}
                      >
                        <div className="p-6 sm:p-8">
                          <h4 className={`text-xl sm:text-2xl font-bold mb-1 ${idx === 1 ? "text-white" : "text-white"}`}>
                            {pkg.name}
                          </h4>
                          <div className="mb-6 pb-6 border-b border-white/20">
                            <span className={`text-4xl sm:text-5xl font-extrabold ${idx === 1 ? "text-white" : "text-brand-400"}`}>
                              {pkg.price}
                            </span>
                            <span className={`text-sm ml-1 ${idx === 1 ? "text-white/70" : "text-gray-500"}`}>
                              {pkg.gst}
                            </span>
                          </div>
                          <ul className="space-y-3">
                            {pkg.features.map((feature, featureIdx) => (
                              <li
                                key={featureIdx}
                                className={`flex items-start gap-3 text-sm ${idx === 1 ? "text-white/90" : "text-gray-300"}`}
                              >
                                <svg
                                  className={`h-5 w-5 flex-shrink-0 ${idx === 1 ? "text-white" : "text-brand-400"}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {idx === 1 && (
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 sm:mt-12 text-center">
                  <p className="inline-flex items-center gap-2 text-gray-400 text-xs sm:text-sm bg-white/5 px-4 py-2 rounded-full">
                    <svg className="h-4 w-4 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      <strong className="text-gray-300">Note:</strong> Plain rice, Sambar, Mirchi ka salan, Raitha, Curd, Papad, pickles are accompaniments.
                    </span>
                  </p>
                </div>

                {/* CTA Button */}
                <div className="mt-8 sm:mt-10 text-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/30 hover:-translate-y-0.5"
                  >
                    Plan Your Event
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Experiences Section */}
      <section className="container space-y-8 sm:space-y-10">
        <SectionHeading
          eyebrow="Experiences"
          title="Curated hospitality for members and guests"
          description="Personalise your visit with culinary journeys, wellness add-ons, and signature celebrations."
          align="center"
        />
        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {hospitalityContent.experiences.map((experience, index) => {
            const experienceImages = [
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
              "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
            ];
            return (
              <div
                key={experience.title}
                className="group relative overflow-hidden  border border-brand-200/50 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={experienceImages[index % experienceImages.length]}
                    alt={experience.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>
                <div className="p-4 sm:p-6 bg-white">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{experience.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{experience.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

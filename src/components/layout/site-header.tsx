import Image from "next/image";
import Link from "next/link";

import { MainNav } from "@/components/navigation/main-nav";
import { siteConfig } from "@/config/site";
import { utilityNavigation } from "@/content/navigation";

export function SiteHeader() {
  return (
    <header className="relative z-50 w-full transition-all duration-500">
      {/* Elegant Top Bar with Gradient */}
      <div className="border-b border-brand-100/40 bg-gradient-to-r from-brand-50/90 via-white/95 to-brand-50/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-row flex-wrap items-center justify-between gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-4 text-[10px] sm:text-xs font-medium text-gray-700 lg:px-8 lg:gap-8">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 lg:gap-8">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              className="group flex items-center gap-1.5 sm:gap-2.5 transition-all duration-300 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-2 px-1.5 sm:px-2 py-0.5 sm:py-1"
              aria-label={`Call ${siteConfig.contact.phone}`}
            >
              <svg
                className="h-3 w-3 sm:h-4 sm:w-4 text-brand-500 transition-all duration-300 group-hover:scale-110 group-hover:text-brand-600 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="font-display font-semibold tracking-wide whitespace-nowrap">{siteConfig.contact.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="group flex items-center gap-1.5 sm:gap-2.5 transition-all duration-300 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-2 px-1.5 sm:px-2 py-0.5 sm:py-1"
              aria-label={`Email ${siteConfig.contact.email}`}
            >
              <svg
                className="h-3 w-3 sm:h-4 sm:w-4 text-brand-500 transition-all duration-300 group-hover:scale-110 group-hover:text-brand-600 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="hidden lg:inline font-display font-semibold tracking-wide whitespace-nowrap">{siteConfig.contact.email}</span>
              <span className="lg:hidden font-display font-semibold tracking-wide whitespace-nowrap">Email</span>
            </a>
          </div>
          <nav aria-label="Utility navigation" className="flex flex-wrap items-center gap-2 sm:gap-4 lg:gap-6">
            {utilityNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative font-display font-semibold tracking-wide transition-all duration-300 hover:text-brand-600 hover:after:w-full focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-2 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand-500 after:transition-all after:duration-300 whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Elegant Logo Section */}
      <div className="mx-auto flex max-w-7xl justify-center px-6 py-5 sm:px-8 lg:py-6">
        <Link
          href="/"
          className="group relative flex flex-col items-center gap-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:ring-offset-4 p-3 -m-3"
          aria-label="HPRC Home"
        >
          {/* Elegant Logo Container */}
          <div className="relative h-20 w-20 flex-shrink-0 sm:h-24 sm:w-24 lg:h-28 lg:w-28 transition-all duration-500 group-hover:scale-105 group-focus:scale-105">
            <Image
              src="/hprc_logo.png"
              alt="HPRC Logo"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 112px"
            />
          </div>
          
          {/* Elegant Typography */}
          <div className="text-center space-y-1">
            <span className="block text-sm font-bold uppercase tracking-[0.25em] text-brand-600 sm:text-base lg:text-lg font-display transition-all duration-300 group-hover:text-brand-700">
              Hyderabad Polo & Riding Club
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-brand-300"></span>
              <span className="text-[11px] font-medium tracking-[0.15em] text-gray-500 sm:text-xs uppercase font-body transition-all duration-300 group-hover:text-gray-600">
                Equestrian • Sports • Lifestyle
              </span>
              <span className="h-px w-8 bg-brand-300"></span>
            </div>
          </div>
        </Link>
      </div>

      {/* Sophisticated Main Navigation */}
      <div className="border-t border-brand-100/50 bg-white/98 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4 sm:px-8 lg:py-5">
          {/* Centered Navigation */}
          <div className="flex-1">
            <MainNav />
          </div>

          {/* Elegant Action Buttons - Desktop */}
          <div className="hidden items-center gap-4 lg:flex">
            {siteConfig.primaryActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`group relative inline-flex items-center justify-center gap-2 whitespace-nowrap px-7 py-3 text-sm font-bold tracking-wide transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-2 font-display ${
                  action.variant === "primary"
                    ? "bg-white text-red-600 border-2 border-red-600 shadow-xl shadow-red-600/30 hover:bg-red-50 hover:shadow-2xl hover:shadow-red-600/40"
                    : "border-2 border-brand-300 bg-white text-brand-700 hover:border-brand-400 hover:bg-brand-50"
                }`}
              >
                {action.label}
                {action.variant === "primary" && (
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                )}
              </Link>
            ))}
          </div>

          {/* Primary Action Button - Mobile */}
          <div className="hidden">
            {siteConfig.primaryActions
              .filter((action) => action.variant === "primary")
              .map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="inline-flex items-center justify-center gap-2 bg-white px-5 py-2.5 text-xs font-bold tracking-wide text-red-600 border-2 border-red-600 shadow-xl shadow-red-600/30 transition-all duration-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-2 font-display"
                  aria-label="Apply for Membership"
                >
                  Apply
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </header>
  );
}

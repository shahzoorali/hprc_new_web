"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import { MainNav } from "@/components/navigation/main-nav";
import { siteConfig } from "@/config/site";
import { utilityNavigation } from "@/content/navigation";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "border-brand-200/60 bg-white/98 backdrop-blur-lg shadow-md"
          : "border-brand-200/30 bg-white/95 backdrop-blur-md shadow-sm"
      }`}
    >
      {/* Top Bar - Contact Information */}
      <div className="border-b border-brand-100/40 bg-gradient-to-r from-brand-50/70 via-white to-brand-50/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-2.5 px-4 py-3 text-xs font-medium text-gray-700 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-5 sm:gap-7">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              className="group flex items-center gap-2 transition-all duration-200 hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-md px-1"
              aria-label={`Call ${siteConfig.contact.phone}`}
            >
              <svg
                className="h-4 w-4 text-brand-500 transition-transform duration-200 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="font-medium">{siteConfig.contact.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="group flex items-center gap-2 transition-all duration-200 hover:text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-md px-1"
              aria-label={`Email ${siteConfig.contact.email}`}
            >
              <svg
                className="h-4 w-4 text-brand-500 transition-transform duration-200 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="hidden lg:inline font-medium">{siteConfig.contact.email}</span>
              <span className="lg:hidden font-medium">Email</span>
            </a>
          </div>
          <nav aria-label="Utility navigation" className="flex items-center gap-4 sm:gap-5">
            {utilityNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium transition-all duration-200 hover:text-brand-500 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-md px-1"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Logo - Centered Above Menu */}
      <div className="mx-auto flex max-w-7xl justify-center px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex flex-col items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-lg p-2 -m-2"
          aria-label="HPRC Home"
        >
          <div className="relative h-16 w-16 flex-shrink-0 sm:h-20 sm:w-20 lg:h-24 lg:w-24 transition-all duration-300 group-hover:scale-105 group-focus:scale-105">
            <Image
              src="/hprc_logo.png"
              alt="HPRC Logo"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
            />
          </div>
          <div className="text-center">
            <span className="block text-xs font-extrabold uppercase tracking-wide text-brand-500 sm:text-sm lg:text-base leading-tight">
              Hyderabad Polo & Riding Club
            </span>
            <span className="text-[10px] text-gray-600 sm:text-xs leading-tight">
              Equestrian • Sports • Lifestyle
            </span>
          </div>
        </Link>
      </div>

      {/* Main Header - Navigation and Actions */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6 sm:py-3 lg:px-8 border-t border-brand-100/50">
        {/* Navigation */}
        <div className="flex flex-1 items-center justify-center gap-2 sm:gap-3 lg:gap-4">
          <MainNav />
        </div>

        {/* Action Buttons - Desktop */}
        <div className="hidden items-center gap-2.5 lg:flex">
          {siteConfig.primaryActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={
                action.variant === "primary"
                  ? "whitespace-nowrap rounded-full bg-brand-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-brand-500/30 transition-all duration-200 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 xl:px-6 xl:py-3 xl:text-sm"
                  : "whitespace-nowrap rounded-full border-2 border-brand-300 bg-white px-5 py-2.5 text-xs font-bold text-brand-600 transition-all duration-200 hover:bg-brand-50 hover:border-brand-400 hover:text-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 xl:px-6 xl:py-3 xl:text-sm"
              }
            >
              {action.label}
            </Link>
          ))}
        </div>

        {/* Primary Action Button - Mobile */}
        <div className="lg:hidden">
          {siteConfig.primaryActions
            .filter((action) => action.variant === "primary")
            .map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="rounded-full bg-brand-500 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-brand-500/30 transition-all duration-200 hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                aria-label="Apply for Membership"
              >
                Apply
              </Link>
            ))}
        </div>
      </div>
    </header>
  );
}

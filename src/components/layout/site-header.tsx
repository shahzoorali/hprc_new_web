"use client";

import Link from "next/link";

import { MainNav } from "@/components/navigation/main-nav";
import { siteConfig } from "@/config/site";
import { utilityNavigation } from "@/content/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto hidden max-w-6xl items-center justify-between px-4 py-2 text-xs font-medium text-gray-600 md:flex">
        <div className="space-x-6">
          <span>{siteConfig.contact.phone}</span>
          <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-brand-900">
            {siteConfig.contact.email}
          </a>
          <a href={`mailto:${siteConfig.contact.membershipEmail}`} className="hover:text-brand-900">
            {siteConfig.contact.membershipEmail}
          </a>
        </div>
        <nav aria-label="Utility" className="space-x-4">
          {utilityNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand-900">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-800 text-lg font-semibold text-white shadow-md shadow-brand-900/20">
            HP
          </div>
          <div>
            <span className="block text-sm font-semibold uppercase tracking-widest text-brand-900">
              Hyderabad Polo & Riding Club
            </span>
            <span className="text-xs text-gray-500">Equestrian • Sports • Lifestyle</span>
          </div>
        </Link>
        <MainNav />
        <div className="hidden items-center gap-3 lg:flex">
          {siteConfig.primaryActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={
                action.variant === "primary"
                  ? "rounded-full bg-brand-800 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-900/30 transition hover:bg-brand-900"
                  : "rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-900 transition hover:bg-brand-50"
              }
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

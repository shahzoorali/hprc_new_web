"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect, useCallback } from "react";

import type { NavChild, NavItem } from "@/content/navigation";

import { MegaMenu } from "./mega-menu";

function NavLink({ href, label, isActive }: { href: string; label: string; isActive?: boolean }) {
  return (
    <Link
      href={href}
      className={`whitespace-nowrap px-2.5 py-1.5 text-xs font-semibold transition-all lg:px-3 lg:py-2 lg:text-sm ${
        isActive
          ? "bg-brand-600 text-white shadow-sm"
          : "text-gray-800 hover:bg-brand-50 hover:text-brand-700"
      }`}
    >
      {label}
    </Link>
  );
}

function Submenu({ items }: { items: NavChild[] }) {
  const pathname = usePathname();
  return (
    <ul className="grid gap-1 p-3 sm:min-w-[220px]">
      {items.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              className={`block px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-brand-50 text-brand-700 font-medium"
                  : "text-gray-700 hover:bg-brand-50 hover:text-brand-700"
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function DesktopNav({ primaryNavigation }: { primaryNavigation: NavItem[] }) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (itemHref: string) => {
    // Cancel any pending close operations
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    // Immediately open the new menu
    setHoveredItem(itemHref);
  };

  const handleMouseLeave = (e: React.MouseEvent, itemHref: string) => {
    // Check if mouse is moving to mega menu or another menu item
    const relatedTarget = e.relatedTarget as HTMLElement;
    const megaMenu = relatedTarget?.closest("[data-mega-menu]");
    const anotherMenuItem = relatedTarget?.closest("li[class*='group']");

    // If moving to mega menu or another menu item, don't close
    if (megaMenu || anotherMenuItem) {
      return;
    }

    // Clear any existing timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    // Small delay to allow mouse to reach mega menu or another menu item
    closeTimeoutRef.current = setTimeout(() => {
      // Double-check that we're not hovering over any menu or menu item
      const isHoveringMenu = document.querySelector("[data-mega-menu]:hover");
      const isHoveringMenuItem = document.querySelector("li[class*='group']:hover");

      if (!isHoveringMenu && !isHoveringMenuItem && hoveredItem === itemHref) {
        setHoveredItem(null);
      }
      closeTimeoutRef.current = null;
    }, 100);
  };

  return (
    <ul className="hidden items-center gap-1 lg:gap-1.5 xl:gap-2 lg:flex" role="list">
      {primaryNavigation.map((item) => {
        const isActive = pathname === item.href;
        const hasMegaMenu = item.sections || item.featured;

        if (!hasMegaMenu && !item.children?.length) {
          return (
            <li key={item.href}>
              <NavLink href={item.href} label={item.label} isActive={isActive} />
            </li>
          );
        }

        // Show mega menu if sections or featured item exist
        if (hasMegaMenu) {
          const menuId = `mega-menu-${item.href.replace(/\//g, "-")}`;
          return (
            <li
              key={item.href}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(item.href)}
              onMouseLeave={(e) => handleMouseLeave(e, item.href)}
            >
              <Link
                href={item.href}
                aria-haspopup="true"
                aria-expanded={hoveredItem === item.href}
                aria-controls={menuId}
                className={`whitespace-nowrap px-2.5 py-1.5 text-xs font-semibold transition-all lg:px-3 lg:py-2 lg:text-sm ${
                  isActive
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-gray-800 hover:bg-brand-50 hover:text-brand-700"
                }`}
              >
                {item.label}
              </Link>
              <MegaMenu
                item={item}
                isOpen={hoveredItem === item.href}
                onMouseEnter={() => handleMouseEnter(item.href)}
                onMouseLeave={() => {
                  if (closeTimeoutRef.current) {
                    clearTimeout(closeTimeoutRef.current);
                  }
                  closeTimeoutRef.current = setTimeout(() => {
                    if (
                      !document.querySelector("[data-mega-menu]:hover") &&
                      !document.querySelector("li[class*='group']:hover")
                    ) {
                      setHoveredItem(null);
                    }
                    closeTimeoutRef.current = null;
                  }, 100);
                }}
              />
            </li>
          );
        }

        // Fallback to regular submenu
        return (
          <li key={item.href} className="group relative">
            <NavLink href={item.href} label={item.label} isActive={isActive} />
            <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 w-max opacity-0 shadow-xl transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="border border-brand-200/50 bg-white/98 backdrop-blur-md shadow-lg">
                <Submenu items={item.children || []} />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

// Helper function to get initials from label (fallback)
function getInitials(label: string): string {
  const words = label.split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
  return label.slice(0, 2).toUpperCase();
}

// Icon component mapping
function MenuIcon({ name, className }: { name: string; className?: string }) {
  const normalizedName = name.toLowerCase().trim();
  
  const iconMap: Record<string, React.ReactNode> = {
    // Primary navigation
    home: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    about: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    programmes: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    "sports centre": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    "sports center": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    hospitality: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    membership: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    "events & media": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    events: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    contact: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    // Sports
    tennis: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    badminton: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    squash: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    swimming: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    "swimming pool": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    basketball: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    futsal: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    gym: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    sauna: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    // Programmes
    riding: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
    polo: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    equestrian: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
    "start riding": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
    "beginners programme": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    "intermediate programme": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    "advanced polo": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    "stick & ball": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
    chukkers: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    // About
    history: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    "the committee": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    "the club": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    // Hospitality
    dining: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    // Packages
    "gold package": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    "platinum package": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  };

  // Try exact match first
  if (iconMap[normalizedName]) {
    return <>{iconMap[normalizedName]}</>;
  }

  // Try partial matches for common variations (prioritize longer matches)
  const matches = Object.entries(iconMap)
    .filter(([key]) => normalizedName.includes(key) || key.includes(normalizedName))
    .sort(([a], [b]) => b.length - a.length); // Sort by length, longest first

  if (matches.length > 0) {
    return <>{matches[0][1]}</>;
  }

  // Special handling for swimming-related items
  if (normalizedName.includes('swim')) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    );
  }

  // Fallback to initials
  return <span className="text-lg font-bold">{getInitials(name)}</span>;
}

function MobileNav({ primaryNavigation }: { primaryNavigation: NavItem[] }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<NavItem | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setSelectedItem(null);
    // Return focus to menu button
    setTimeout(() => {
      menuButtonRef.current?.focus();
    }, 100);
  }, []);

  const openMenu = () => {
    setIsOpen(true);
    setSelectedItem(null);
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle keyboard navigation and focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    // Focus trap: keep focus within modal when tabbing
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0] as HTMLElement;
      const lastFocusable = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTabKey);
    document.addEventListener("mousedown", handleClickOutside);

    // Focus the first focusable element when modal opens
    const firstFocusable = modalRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    firstFocusable?.focus();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTabKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  const handleLinkClick = () => {
    closeMenu();
  };

  const handleTileClick = (item: NavItem) => {
    // If item has sections or children, show secondary panel
    if (item.sections?.length || item.children?.length) {
      setSelectedItem(item);
    } else {
      // No subitems, navigate directly
      handleLinkClick();
    }
  };

  const handleBackToGrid = () => {
    setSelectedItem(null);
    // Ensure focus is maintained
    requestAnimationFrame(() => {
      const firstTile = modalRef.current?.querySelector(
        'button[aria-label*="has submenu"], button[aria-label]:not([aria-label="Back to menu"])'
      ) as HTMLElement;
      firstTile?.focus();
    });
  };

  // Get items to display in secondary panel
  const getSecondaryItems = () => {
    if (!selectedItem) return null;

    if (selectedItem.sections?.length) {
      return selectedItem.sections;
    }

    if (selectedItem.children?.length) {
      return [
        {
          title: selectedItem.label,
          items: selectedItem.children,
        },
      ];
    }

    return null;
  };

  const secondaryItems = getSecondaryItems();

  return (
    <nav className="relative lg:hidden">
      <button
        ref={menuButtonRef}
        onClick={openMenu}
        aria-label="Open menu"
        aria-expanded={isOpen}
        className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-2"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <span>Menu</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeMenu} />

          {/* Modal Content */}
          <div
            ref={modalRef}
            className="relative w-full max-w-[420px] max-h-[85vh] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 flex flex-col"
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 py-4 relative z-20 shrink-0 sticky top-0">
              {/* Always show back button when selectedItem exists */}
              {selectedItem !== null ? (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleBackToGrid();
                    }}
                    type="button"
                    className="flex items-center justify-center gap-2 text-base font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 rounded-xl px-5 py-3 transition-all active:scale-95 shadow-lg hover:shadow-xl flex-shrink-0 cursor-pointer min-h-[48px] min-w-[100px] z-30"
                    aria-label="Back to menu"
                    tabIndex={0}
                  >
                    <svg
                      className="h-6 w-6 flex-shrink-0 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span className="whitespace-nowrap font-bold pointer-events-none">Back</span>
                  </button>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 flex-1 text-center px-2 truncate">
                    {selectedItem?.label || 'Menu'}
                  </h2>
                  {/* Spacer to balance the back button */}
                  <div className="w-[100px] flex-shrink-0" aria-hidden="true" />
                </>
              ) : (
                <>
                  <h2 className="text-lg font-bold text-gray-900 flex-1">Menu</h2>
                  <button
                    onClick={closeMenu}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-2"
                    aria-label="Close menu"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Content Area - Scrollable */}
            <div className="flex-1 overflow-y-auto overscroll-contain relative">
              {selectedItem && secondaryItems ? (
                /* Secondary Panel - iOS-style Grid */
                <div className="p-6 space-y-8">
                  {secondaryItems.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="space-y-4">
                      {section.title && (
                        <h3 className="text-sm font-bold uppercase tracking-wider text-brand-900 px-2">
                          {section.title}
                        </h3>
                      )}
                      {/* iOS-style grid for section items */}
                      <div className="grid grid-cols-3 gap-4 auto-rows-fr">
                        {section.items.map((child) => {
                          const isChildActive = pathname === child.href;

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={handleLinkClick}
                              className={`group flex flex-col items-center justify-center gap-2 rounded-xl p-4 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-2 aspect-square ${
                                isChildActive
                                  ? "bg-brand-100 ring-2 ring-brand-500"
                                  : "bg-gray-50 hover:bg-brand-50 hover:scale-105 active:scale-95"
                              }`}
                              aria-label={child.label}
                            >
                              {/* Icon with SVG */}
                              <div
                                className={`flex h-14 w-14 items-center justify-center rounded-xl transition-colors flex-shrink-0 ${
                                  isChildActive
                                    ? "bg-brand-500 text-white"
                                    : "bg-white text-brand-600 group-hover:bg-brand-100 group-hover:text-brand-700 shadow-md"
                                }`}
                              >
                                <MenuIcon name={child.label} className="h-7 w-7" />
                              </div>

                              {/* Label */}
                              <span
                                className={`text-xs font-semibold text-center leading-tight line-clamp-2 ${
                                  isChildActive
                                    ? "text-brand-700"
                                    : "text-gray-700 group-hover:text-brand-700"
                                }`}
                              >
                                {child.label}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Featured item if available - Full width card */}
                  {selectedItem.featured && (
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <Link
                        href={selectedItem.featured.href}
                        onClick={handleLinkClick}
                        className="group block rounded-xl overflow-hidden bg-gradient-to-br from-brand-50 via-brand-100/50 to-brand-50 transition-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-2"
                      >
                        {selectedItem.featured.image && (
                          <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                            <Image
                              src={selectedItem.featured.image}
                              alt={selectedItem.featured.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 420px) 100vw, 420px"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h4 className="mb-1 text-base font-bold text-gray-900 group-hover:text-brand-700 transition-colors">
                            {selectedItem.featured.title}
                          </h4>
                          {selectedItem.featured.description && (
                            <p className="mb-3 text-xs text-gray-600 line-clamp-2 leading-relaxed">
                              {selectedItem.featured.description}
                            </p>
                          )}
                          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:gap-2 transition-all">
                            {selectedItem.featured.label || "Learn More"}
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>
                        </div>
                      </Link>
                    </div>
                  )}

                  {/* Direct link to main page if item has href - Full width button */}
                  {selectedItem.href && (
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <Link
                        href={selectedItem.href}
                        onClick={handleLinkClick}
                        className={`block rounded-xl px-6 py-4 text-sm font-semibold text-center transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-2 ${
                          pathname === selectedItem.href
                            ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                            : "bg-brand-500 text-white hover:bg-brand-600 shadow-md shadow-brand-500/30"
                        }`}
                      >
                        <span className="flex items-center justify-center gap-2">
                          Visit {selectedItem.label}
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                /* Primary Grid - iOS Style */
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
                    {primaryNavigation.map((item) => {
                      const isActive = pathname === item.href;
                      const hasSubitems =
                        item.sections?.length || item.children?.length;
                      const initials = getInitials(item.label);

                      return (
                        <button
                          key={item.href}
                          onClick={() => handleTileClick(item)}
                          className={`group flex flex-col items-center justify-center gap-2 rounded-xl p-4 transition-all aspect-square ${
                            isActive
                              ? "bg-brand-100 ring-2 ring-brand-500"
                              : "bg-gray-50 hover:bg-brand-50 hover:scale-105 active:scale-95"
                          }`}
                          aria-label={`${item.label}${hasSubitems ? " - has submenu" : ""}`}
                        >
                          {/* Icon with SVG */}
                          <div
                            className={`flex h-14 w-14 items-center justify-center rounded-xl transition-colors ${
                              isActive
                                ? "bg-brand-500 text-white"
                                : "bg-white text-brand-600 group-hover:bg-brand-100 group-hover:text-brand-700 shadow-md"
                            }`}
                          >
                            <MenuIcon name={item.label} className="h-7 w-7" />
                          </div>

                          {/* Label */}
                          <span
                            className={`text-xs font-semibold text-center leading-tight line-clamp-2 ${
                              isActive
                                ? "text-brand-700"
                                : "text-gray-700 group-hover:text-brand-700"
                            }`}
                          >
                            {item.label}
                          </span>

                          {/* Indicator for items with subitems */}
                          {hasSubitems && (
                            <svg
                              className="h-3 w-3 text-brand-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export function MainNav({ primaryNavigation }: { primaryNavigation: NavItem[] }) {
  return (
    <div className="flex w-full items-center justify-end gap-4">
      <DesktopNav primaryNavigation={primaryNavigation} />
      <MobileNav primaryNavigation={primaryNavigation} />
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";

import type { NavItem } from "@/content/navigation";

type MegaMenuProps = {
  item: NavItem;
  isOpen: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export function MegaMenu({ item, isOpen, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuTop, setMenuTop] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Track mount state for portal (avoid SSR hydration issues)
  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  const calculatePosition = useCallback(() => {
    // Find the navigation container div (the one with border-t) to position menu directly below it
    const navContainer = document.querySelector("header > div:last-child") as HTMLElement;
    if (navContainer) {
      const rect = navContainer.getBoundingClientRect();
      // Position directly at the bottom of the nav container - use Math.ceil for precise positioning
      setMenuTop(Math.ceil(rect.bottom));
    } else {
      // Fallback: use header if nav container not found
      const header = document.querySelector("header") as HTMLElement;
      if (header) {
        const rect = header.getBoundingClientRect();
        setMenuTop(Math.ceil(rect.bottom));
      }
    }
  }, []);

  useEffect(() => {
    // Calculate position when component mounts and when menu opens
    if (isOpen) {
      // Calculate with RAF to avoid synchronous setState
      requestAnimationFrame(() => {
        calculatePosition();
        // Recalculate with double RAF for accuracy after layout completes
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            calculatePosition();
          });
        });
      });

      // Recalculate on resize
      const handleResize = () => {
        requestAnimationFrame(calculatePosition);
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("load", calculatePosition);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("load", calculatePosition);
      };
    }
  }, [isOpen, calculatePosition]);

  if (!item.sections && !item.featured) {
    return null;
  }

  // Determine grid columns based on number of sections
  const sectionsCount = item.sections?.length || 0;
  const gridCols = sectionsCount > 1 ? "md:grid-cols-2 lg:grid-cols-2" : "lg:grid-cols-1";
  const featuredCols = item.featured ? "lg:grid-cols-[2fr_1fr]" : gridCols;

  const menuId = `mega-menu-${item.href.replace(/\//g, "-")}`;

  const menuContent = (
    <div
      ref={menuRef}
      data-mega-menu
      id={menuId}
      role="dialog"
      aria-label={`${item.label} submenu`}
      aria-modal="false"
      className={`fixed left-1/2 z-[9999] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      style={{
        // Center on viewport horizontally
        transform: "translateX(-50%)",
        // Position directly flush with header - no gap
        top: menuTop > 0 ? `${menuTop}px` : "0px",
        // Constrain to viewport width with padding
        width: "min(90vw, 1200px)",
        maxWidth: "min(90vw, 1200px)",
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? "visible" : "hidden",
        transition:
          "opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Invisible bridge area - zero height to eliminate gap */}
      <div
        className="absolute inset-x-0 bottom-full"
        style={{
          height: "0px",
          pointerEvents: isOpen ? "auto" : "none",
        }}
        onMouseEnter={onMouseEnter}
        aria-hidden="true"
      />
      {/* Menu container - no top border, starts flush with header */}
      <div
        className="mx-auto overflow-hidden border-x border-b border-brand-200/50 bg-white/98 backdrop-blur-md shadow-2xl ring-1 ring-black/5"
        style={{ marginTop: "0", paddingTop: "0" }}
      >
        <div className={`grid grid-cols-1 gap-8 p-8 ${featuredCols}`}>
          {/* Left Column(s) - Navigation Sections */}
          <div
            className={`space-y-8 ${sectionsCount > 1 ? "lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0" : ""}`}
          >
            {item.sections?.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {section.image && (
                  <div className="relative aspect-[32/9] w-full mb-4 overflow-hidden bg-gray-100">
                    <Image
                      src={section.image}
                      alt={section.title || "Section image"}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                {section.title && (
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-900">
                    {section.title}
                  </h3>
                )}
                {section.description && (
                  <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-2">
                    {section.description}
                  </p>
                )}
                <ul className="space-y-1">
                  {section.items.map((child) => {
                    const isActive = pathname === child.href;
                    return (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={isActive ? "page" : undefined}
                          className={`block px-3 py-2.5 text-sm font-medium transition-colors duration-150 ease-in-out ${
                            isActive
                              ? "bg-brand-100 text-brand-800 font-semibold"
                              : "text-gray-700 hover:bg-brand-100 hover:text-brand-800"
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Column - Featured Item */}
          {item.featured && (
            <div className="border-l-2 border-brand-400 bg-gradient-to-br from-brand-50 to-brand-50/50 p-8 lg:pl-8 lg:pt-8">
              {item.featured.image && (
                <div className="relative aspect-video w-full mb-4 overflow-hidden bg-gray-100">
                  <Image
                    src={item.featured.image}
                    alt={item.featured.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <h3 className="mb-3 text-xl font-extrabold text-gray-900 leading-tight">
                {item.featured.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-600 line-clamp-3">
                {item.featured.description}
              </p>
              <Link
                href={item.featured.href}
                className="group inline-flex items-center bg-brand-500 px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-brand-600 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              >
                {item.featured.label || "Learn More"}
                <svg
                  className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
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
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Use portal to render at body level to avoid stacking context issues
  if (!mounted) {
    return null;
  }

  return createPortal(menuContent, document.body);
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import type { NavItem } from "@/content/navigation";

type MegaMenuProps = {
  item: NavItem;
  isOpen: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export function MegaMenu({ item, isOpen, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const pathname = usePathname();
  const [navigationTop, setNavigationTop] = useState(0);
  
  const calculatePosition = () => {
    // Find the sticky navigation bar using data attribute
    const stickyNav = document.querySelector('[data-sticky-nav]') as HTMLElement;
    if (stickyNav) {
      const rect = stickyNav.getBoundingClientRect();
      // Position directly at the bottom of the sticky navigation bar with no gap
      // Use ceiling to ensure it's flush against the nav bar
      setNavigationTop(Math.ceil(rect.bottom));
    }
  };
  
  useEffect(() => {
    // Calculate position when menu opens
    if (isOpen) {
      // Recalculate immediately with double RAF for accuracy
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          calculatePosition();
        });
      });
      
      // Update position on scroll and resize
      const handleScroll = () => {
        requestAnimationFrame(calculatePosition);
      };
      
      const handleResize = () => {
        requestAnimationFrame(calculatePosition);
      };
      
      // Also update on any layout changes
      const handleLoad = () => {
        calculatePosition();
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize);
      window.addEventListener('load', handleLoad);
      
      // Initial calculation
      calculatePosition();
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('load', handleLoad);
      };
    }
  }, [isOpen]);

  if (!item.sections && !item.featured) {
    return null;
  }

  // Determine grid columns based on number of sections
  const sectionsCount = item.sections?.length || 0;
  const gridCols = sectionsCount > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1";
  const featuredCols = item.featured ? "lg:grid-cols-[2fr_1fr]" : gridCols;

  return (
    <div
      data-mega-menu
      className={`fixed z-[60] ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{
        // Center on viewport horizontally
        left: "50%",
        transform: isOpen ? "translateX(-50%)" : "translateX(-50%) translateY(-8px)",
        // Position directly flush with sticky navigation bar (no gap)
        top: navigationTop > 0 ? `${navigationTop}px` : '0',
        // Constrain to viewport width with padding - make it more compact
        width: "min(85vw, 960px)",
        maxWidth: "min(85vw, 960px)",
        opacity: isOpen ? 1 : 0,
        transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Invisible bridge area to catch mouse movement when moving from menu item to mega menu */}
      <div 
        className="absolute inset-x-0 bottom-full h-2"
        style={{
          pointerEvents: isOpen ? "auto" : "none",
        }}
        onMouseEnter={onMouseEnter}
      />
      <div className="mx-auto overflow-hidden rounded-b-xl border-x border-b border-brand-200/50 bg-white/98 backdrop-blur-md shadow-xl">
        <div className={`grid grid-cols-1 gap-6 p-6 ${featuredCols}`}>
          {/* Left Column(s) - Navigation Sections */}
          <div className={`space-y-6 ${sectionsCount > 1 ? "lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0" : ""}`}>
            {item.sections?.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {section.image && (
                  <div className="relative h-24 w-full mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={section.image}
                      alt={section.title || "Section image"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                {section.title && (
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-900">
                    {section.title}
                  </h3>
                )}
                {section.description && (
                  <p className="mb-3 text-xs leading-relaxed text-gray-600 line-clamp-2">{section.description}</p>
                )}
                <ul className="space-y-1.5">
                  {section.items.map((child) => {
                    const isActive = pathname === child.href;
                    return (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={`block rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                            isActive
                              ? "bg-brand-50 text-brand-700 font-medium"
                              : "text-gray-700 hover:bg-brand-50 hover:text-brand-700"
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
            <div className="border-t border-brand-100 bg-gradient-to-br from-brand-50/30 to-white p-5 rounded-lg lg:border-l lg:border-t-0 lg:pl-6 pt-5 lg:pt-5">
              {item.featured.image && (
                <div className="relative h-32 w-full mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={item.featured.image}
                    alt={item.featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <h3 className="mb-2 text-lg font-extrabold text-gray-900 leading-tight">
                {item.featured.title}
              </h3>
              <p className="mb-4 text-xs leading-relaxed text-gray-600 line-clamp-3">
                {item.featured.description}
              </p>
              <Link
                href={item.featured.href}
                className="group inline-flex items-center rounded-full bg-brand-500 px-5 py-2 text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-brand-600 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              >
                {item.featured.label || "Learn More"}
                <svg
                  className="ml-2 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
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
}


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

import { primaryNavigation, type NavChild } from "@/content/navigation";

import { MegaMenu } from "./mega-menu";

function NavLink({ href, label, isActive }: { href: string; label: string; isActive?: boolean }) {
  return (
    <Link
      href={href}
      className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-semibold transition-all lg:px-3 lg:py-2 lg:text-sm ${
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
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
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

function DesktopNav() {
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
                className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-semibold transition-all lg:px-3 lg:py-2 lg:text-sm ${
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
                    if (!document.querySelector("[data-mega-menu]:hover") && 
                        !document.querySelector("li[class*='group']:hover")) {
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
              <div className="rounded-2xl border border-brand-200/50 bg-white/98 backdrop-blur-md shadow-lg">
                <Submenu items={item.children || []} />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // Ensure menu is closed on mount
  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
      setIsOpen(false);
    }
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  };

  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <nav className="relative lg:hidden">
      <details 
        ref={detailsRef}
        className="group"
        onToggle={(e) => {
          const target = e.target as HTMLDetailsElement;
          setIsOpen(target.open);
        }}
      >
        <summary className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-700">
          <svg
            className={`h-5 w-5 transition-transform ${isOpen ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span>Menu</span>
        </summary>
        <div className="absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-brand-200/50 bg-white/98 p-4 shadow-xl backdrop-blur-md z-50">
          <div className="space-y-1">
            {primaryNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`block rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-brand-50 text-brand-700"
                        : "text-gray-800 hover:bg-brand-50 hover:text-brand-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {/* Show sections if available, otherwise fall back to children */}
                  {item.sections?.length ? (
                    <div className="mt-1 space-y-2 pl-4">
                      {item.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                          {section.title && (
                            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-900">
                              {section.title}
                            </div>
                          )}
                          <ul className="space-y-0.5">
                            {section.items.map((child) => {
                              const isChildActive = pathname === child.href;
                              return (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={handleLinkClick}
                                    className={`block rounded-lg px-3 py-1.5 text-xs transition-colors ${
                                      isChildActive
                                        ? "bg-brand-50 text-brand-700 font-medium"
                                        : "text-gray-600 hover:bg-brand-50/50 hover:text-brand-700"
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
                  ) : item.children?.length ? (
                    <ul className="mt-1 space-y-0.5 pl-4">
                      {item.children.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={handleLinkClick}
                              className={`block rounded-lg px-3 py-1.5 text-xs transition-colors ${
                                isChildActive
                                  ? "bg-brand-50 text-brand-700 font-medium"
                                  : "text-gray-600 hover:bg-brand-50/50 hover:text-brand-700"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                  {/* Show featured item on mobile */}
                  {item.featured && (
                    <div className="mt-2 pl-4 border-t border-brand-100 pt-2">
                      <Link
                        href={item.featured.href}
                        onClick={handleLinkClick}
                        className="block rounded-lg bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100"
                      >
                        {item.featured.title}
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </details>
    </nav>
  );
}

export function MainNav() {
  return (
    <div className="flex w-full items-center justify-end gap-4">
      <DesktopNav />
      <MobileNav />
    </div>
  );
}

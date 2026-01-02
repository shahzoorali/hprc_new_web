import React from "react";
import type { Country } from "@/content/world-arena-polo-championship-2026";
import US from "country-flag-icons/react/3x2/US";
import IN from "country-flag-icons/react/3x2/IN";
import DE from "country-flag-icons/react/3x2/DE";
import FR from "country-flag-icons/react/3x2/FR";
import LU from "country-flag-icons/react/3x2/LU";

type CountryBadgeProps = {
  country: Country;
  size?: "sm" | "md" | "lg";
};

const countryFlagComponents: Record<string, React.ComponentType<{ className?: string; title?: string }>> = {
  USA: US,
  IND: IN,
  GER: DE,
  FRA: FR,
  LUX: LU,
};

export function CountryBadge({ country, size = "md" }: CountryBadgeProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const flagSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const FlagComponent = countryFlagComponents[country.code];

  return (
    <div
      className={`group inline-flex items-center gap-3 border border-brand-200 bg-gradient-to-br from-white to-brand-50/50 px-4 py-2 text-sm font-semibold text-brand-900 shadow-sm transition-all duration-300 hover:border-brand-300 hover:shadow-md hover:-translate-y-0.5 ${sizeClasses[size]}`}
    >
      {FlagComponent ? (
        <FlagComponent
          className={`${flagSizes[size]} transition-transform duration-300 group-hover:scale-110`}
          title={`${country.name} flag`}
        />
      ) : (
        <span className="text-xs">🏳️</span>
      )}
      <span className="font-bold">{country.code}</span>
      <span className="hidden sm:inline text-gray-600">{country.name}</span>
    </div>
  );
}


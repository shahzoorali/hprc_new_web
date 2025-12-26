import type { Country } from "@/content/world-arena-polo-championship-2026";

type CountryBadgeProps = {
  country: Country;
  size?: "sm" | "md" | "lg";
};

const countryFlags: Record<string, string> = {
  USA: "🇺🇸",
  IND: "🇮🇳",
  GER: "🇩🇪",
  FRA: "🇫🇷",
  LUX: "🇱🇺",
};

export function CountryBadge({ country, size = "md" }: CountryBadgeProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const flagEmojiSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const flag = countryFlags[country.code] || "🏳️";

  return (
    <div
      className={`group inline-flex items-center gap-3 rounded-full border border-brand-200 bg-gradient-to-br from-white to-brand-50/50 px-4 py-2 text-sm font-semibold text-brand-900 shadow-sm transition-all duration-300 hover:border-brand-300 hover:shadow-md hover:-translate-y-0.5 ${sizeClasses[size]}`}
    >
      <span
        className={`${flagEmojiSizes[size]} transition-transform duration-300 group-hover:scale-110 inline-block leading-none`}
        style={{
          fontFamily: 'system-ui, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          fontFeatureSettings: '"liga"',
          WebkitFontSmoothing: "antialiased",
          display: "inline-block",
          verticalAlign: "middle",
        }}
        role="img"
        aria-label={`${country.name} flag`}
      >
        {flag}
      </span>
      <span className="font-bold">{country.code}</span>
      <span className="hidden sm:inline text-gray-600">{country.name}</span>
    </div>
  );
}


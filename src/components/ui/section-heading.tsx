type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  // Check if dark/white theme is applied via className
  const isWhiteTheme = className.includes("text-white");

  const eyebrowColor = isWhiteTheme ? "text-white/70" : "text-brand-600";
  const titleColor = isWhiteTheme ? "text-white" : "text-brand-900";
  const descriptionColor = isWhiteTheme ? "text-white/80" : "text-gray-600";

  return (
    <div className={`max-w-3xl ${alignment} space-y-3 ${className}`}>
      {eyebrow ? (
        <p
          className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] ${eyebrowColor}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-semibold ${titleColor}`}>{title}</h2>
      {description ? (
        <p className={`text-sm sm:text-base ${descriptionColor}`}>{description}</p>
      ) : null}
    </div>
  );
}

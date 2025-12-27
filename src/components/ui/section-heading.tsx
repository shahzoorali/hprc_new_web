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
  className,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignment} space-y-3 ${className || ""}`}>
      {eyebrow ? (
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-brand-600">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-brand-900">{title}</h2>
      {description ? <p className="text-sm sm:text-base text-gray-600">{description}</p> : null}
    </div>
  );
}

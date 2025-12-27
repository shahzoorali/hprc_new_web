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
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold text-brand-900 md:text-4xl">{title}</h2>
      {description ? <p className="text-base text-gray-600">{description}</p> : null}
    </div>
  );
}

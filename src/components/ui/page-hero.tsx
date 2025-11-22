import Image from "next/image";
import Link from "next/link";

export type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "outline";
};

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: HeroAction[];
  backgroundClassName?: string;
  backgroundImage?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  actions = [],
  backgroundClassName,
  backgroundImage,
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden rounded-[2.5rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-white px-6 py-20 shadow-[var(--shadow-elevated)] lg:px-16 ${backgroundClassName ?? ""}`}
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image src={backgroundImage} alt="" fill className="object-cover" quality={90} priority />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50/90 via-brand-50/80 to-white/90"></div>
        </div>
      )}
      <div className="mx-auto max-w-3xl text-center text-brand-900 relative z-10">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-600">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 text-4xl font-semibold md:text-5xl">{title}</h1>
        <p className="mt-4 text-base text-gray-700 md:text-lg">{description}</p>
        {actions.length ? (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={
                  action.variant === "outline"
                    ? "rounded-full border border-brand-300 px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-brand-50"
                    : "rounded-full bg-brand-800 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-900/30 transition hover:bg-brand-900"
                }
              >
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

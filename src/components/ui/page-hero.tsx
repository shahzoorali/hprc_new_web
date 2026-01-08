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
      className={`relative overflow-hidden border border-brand-100/60 shadow-[0_30px_60px_-15px_rgba(227,30,36,0.15)] ${
        backgroundImage ? "" : "bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900"
      } ${backgroundClassName ?? ""}`}
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image src={backgroundImage} alt="" fill className="object-cover" quality={90} priority />
          {/* Darker overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900/70 via-brand-800/75 to-brand-900/70"></div>
        </div>
      )}

      <div className="relative z-10 px-4 sm:px-6 md:px-16 lg:px-20 py-10 sm:py-12 md:py-20 lg:py-24 pb-12 sm:pb-16 md:pb-24 lg:pb-28">
        <div className="mx-auto max-w-4xl text-center space-y-4 sm:space-y-6 md:space-y-8">
          {eyebrow && (
            <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-md border-2 border-white/30 px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white drop-shadow-lg">
                {eyebrow}
              </p>
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight drop-shadow-2xl">
            {title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 leading-relaxed font-light max-w-3xl mx-auto drop-shadow-lg">
            {description}
          </p>

          {actions.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4">
              {actions.map((action, index) => (
                <Link
                  key={`${action.href}-${index}`}
                  href={action.href}
                  className={`inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm lg:text-base font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-0.5 rounded-lg sm:rounded-xl ${
                    action.variant === "outline"
                      ? "border-2 border-white bg-white text-brand-700 hover:bg-brand-50"
                      : "bg-gradient-to-r from-brand-600 to-brand-700 text-white hover:from-brand-700 hover:to-brand-800"
                  }`}
                >
                  {action.label}
                  <svg
                    className="h-3.5 sm:h-4 w-3.5 sm:w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

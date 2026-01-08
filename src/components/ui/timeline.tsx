type TimelineItem = {
  year: string;
  summary: string;
};

type TimelineProps = {
  items: TimelineItem[];
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Simple gradient line for timeline */}
      <div
        className="absolute left-6 sm:left-8 md:left-12 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-200 via-brand-400 to-brand-200 lg:-translate-x-1/2"
        aria-hidden="true"
      />

      {/* Timeline items */}
      <div className="space-y-8 sm:space-y-10 md:space-y-12">
        {items.map((item, index) => (
          <div
            key={`${item.year}-${index}`}
            className="relative pl-16 sm:pl-20 md:pl-24 lg:pl-0 lg:w-1/2"
            style={{
              marginLeft: index % 2 === 0 ? "0" : "auto",
              marginRight: index % 2 === 0 ? "auto" : "0",
              textAlign: index % 2 === 0 ? "left" : "right",
            }}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 sm:left-5 md:left-6 lg:left-1/2 top-6 sm:top-8 md:top-10 lg:top-0 lg:-translate-x-1/2 z-10">
              <div className="relative">
                {/* Outer ring */}
                <div className="absolute -inset-2 bg-brand-200/40 blur-sm" />
                {/* Dot */}
                <div className="relative h-5 w-5 sm:h-6 sm:w-6 bg-gradient-to-br from-brand-500 to-brand-600 border-2 border-white shadow-lg ring-2 ring-brand-100" />
              </div>
            </div>

            {/* Timeline card */}
            <div className="relative group">
              {/* Background card */}
              <div className="relative overflow-hidden border border-brand-100 bg-white p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Year badge */}
                <div className="mb-3 sm:mb-4">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-700 px-3 sm:px-4 py-1.5 sm:py-2 shadow-md">
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white/90" />
                    <span className="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide">
                      {item.year}
                    </span>
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white/90" />
                  </div>
                </div>

                {/* Content */}
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-normal">
                  {item.summary}
                </p>

                {/* Subtle hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-50/0 to-brand-50/0 group-hover:from-brand-50/50 group-hover:to-brand-50/30 transition-colors duration-300 pointer-events-none" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative start/end caps for the line */}
      <div
        className="absolute left-4 sm:left-5 md:left-6 lg:left-1/2 lg:-translate-x-1/2 top-0 h-3 w-3 sm:h-4 sm:w-4 bg-brand-300"
        aria-hidden="true"
      />
      <div
        className="absolute left-4 sm:left-5 md:left-6 lg:left-1/2 lg:-translate-x-1/2 bottom-0 h-3 w-3 sm:h-4 sm:w-4 bg-brand-300"
        aria-hidden="true"
      />
    </div>
  );
}

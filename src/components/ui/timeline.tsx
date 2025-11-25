type TimelineItem = {
  year: string;
  summary: string;
};

type TimelineProps = {
  items: TimelineItem[];
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative mt-10">
      {/* Enhanced Timeline Line */}
      <div
        className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-brand-300 via-brand-400 to-brand-300 sm:left-1/2"
        aria-hidden="true"
      />
      <div className="space-y-12">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={`${item.year}-${index}`}
              className="group relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10"
            >
              {/* Year Badge */}
              <div className={`flex items-center gap-3 sm:w-1/3 ${isEven ? 'sm:justify-end sm:text-right' : 'sm:justify-start sm:text-left'}`}>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-800 to-brand-900 text-sm font-bold text-white shadow-lg shadow-brand-900/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {item.year}
                </div>
                <span className="hidden rounded-full bg-gradient-to-r from-brand-700 to-brand-800 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md sm:inline-flex">
                  Milestone
                </span>
              </div>
              
              {/* Content Card */}
              <div className={`relative sm:w-2/3 ${isEven ? '' : 'sm:order-first'}`}>
                <span className="absolute left-4 top-4 block h-4 w-4 rounded-full border-2 border-white bg-brand-600 shadow-lg transition-all duration-300 group-hover:scale-150 group-hover:bg-brand-500 sm:left-0" />
                <div className="ml-10 rounded-2xl border border-brand-100/80 bg-white/95 backdrop-blur-sm p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-brand-200 sm:ml-12">
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">{item.summary}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

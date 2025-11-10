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
      <div
        className="absolute left-4 top-0 h-full w-px bg-brand-200 sm:left-1/2"
        aria-hidden="true"
      />
      <div className="space-y-10">
        {items.map((item, index) => (
          <div
            key={`${item.year}-${index}`}
            className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-10"
          >
            <div className="flex items-center gap-3 sm:w-1/3 sm:justify-end sm:text-right">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-300 bg-white text-sm font-semibold text-brand-800 shadow-sm">
                {item.year}
              </div>
              <span className="hidden rounded-full bg-brand-800 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white sm:inline-flex">
                Milestone
              </span>
            </div>
            <div className="relative sm:w-2/3">
              <span className="absolute left-4 top-3 block h-3 w-3 rounded-full border border-white bg-brand-600 shadow-sm sm:left-0" />
              <div className="ml-10 rounded-3xl border border-brand-100 bg-white/90 p-6 shadow-[var(--shadow-elevated)] sm:ml-12">
                <p className="text-sm text-gray-700">{item.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

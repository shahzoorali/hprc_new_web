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
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-[150px]"></div>
      </div>

      {/* Sophisticated Timeline Line */}
      <div className="relative">
        {/* Main Gradient Line */}
        <div
          className="absolute left-8 top-0 h-full w-1 bg-gradient-to-b from-brand-300 via-brand-500 to-brand-300 sm:left-1/2 sm:-translate-x-1/2"
          aria-hidden="true"
        />
        {/* Animated Glow Effect */}
        <div
          className="absolute left-8 top-0 h-full w-2 bg-gradient-to-b from-brand-400/30 via-brand-500/50 to-brand-400/30 blur-[4px] sm:left-1/2 sm:-translate-x-1/2 animate-pulse"
          aria-hidden="true"
        />
        {/* Inner Bright Line */}
        <div
          className="absolute left-8 top-0 h-full w-[3px] bg-gradient-to-b from-brand-200/50 via-brand-300/70 to-brand-200/50 sm:left-1/2 sm:-translate-x-1/2"
          aria-hidden="true"
        />
      </div>

      {/* Timeline Items */}
      <div className="space-y-20">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          const isLast = index === items.length - 1;
          
          return (
            <div
              key={`${item.year}-${index}`}
              className="group relative flex flex-col gap-10 md:gap-12 lg:flex-row lg:items-center"
            >
              {/* Year Badge Section */}
              <div className={`flex items-center gap-6 lg:w-[45%] ${isEven ? 'lg:justify-end lg:flex-row-reverse' : 'lg:justify-start'}`}>
                {/* Sophisticated Year Badge */}
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 scale-125"></div>
                  
                  {/* Year Badge */}
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-2xl font-extrabold text-white shadow-2xl shadow-brand-900/50 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 ring-4 ring-brand-500/30 group-hover:ring-brand-400/50">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/20"></div>
                    <span className="relative z-10">{item.year}</span>
                  </div>
                </div>

                {/* Milestone Badge */}
                <div className="hidden lg:block">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-3 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-brand-600/20"></div>
                    <div className="relative flex items-center gap-2.5">
                      <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                      <span className="text-xs font-bold uppercase tracking-[0.25em] text-white">
                        Milestone
                      </span>
                      <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className={`relative lg:w-[55%] ${isEven ? '' : 'lg:order-first'}`}>
                {/* Connector Dot */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 lg:left-1/2 lg:translate-x-0">
                  <div className="relative">
                    {/* Outer Glow */}
                    <div className="absolute inset-0 rounded-full bg-brand-500 blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 scale-150"></div>
                    
                    {/* Connector Dot */}
                    <div className="relative h-10 w-10 rounded-full border-4 border-white bg-gradient-to-br from-brand-400 via-brand-500 to-brand-600 shadow-2xl transition-all duration-500 group-hover:scale-125 group-hover:shadow-brand-500/50 ring-3 ring-brand-500/30">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
                      <div className="absolute inset-2 rounded-full bg-white/80"></div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-200 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <div className="ml-12 lg:ml-0 lg:mr-12">
                  <div className="group/card relative overflow-hidden rounded-[2.5rem] border-2 border-brand-100/80 bg-gradient-to-br from-white via-white to-brand-50/50 p-12 shadow-2xl backdrop-blur-sm transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(227,30,36,0.25)] hover:-translate-y-4 hover:border-brand-200 hover:scale-[1.01]">
                    {/* Decorative Background */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
                      <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-gradient-to-br from-brand-500/15 to-brand-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 group-hover/card:scale-150"></div>
                      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-tr-full bg-gradient-to-tr from-brand-500/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 group-hover/card:scale-125"></div>
                    </div>

                    {/* Card Content */}
                    <div className="relative">
                      {/* Mobile Year Badge */}
                      <div className="mb-6 flex items-center gap-3 lg:hidden">
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-4 py-2 shadow-lg">
                          <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 to-brand-600/20"></div>
                          <div className="relative flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></div>
                            <span className="text-sm font-bold uppercase tracking-[0.15em] text-white">
                              {item.year}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Year Label on Desktop */}
                      <div className="mb-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-300 to-brand-300"></div>
                        <div className="flex items-center gap-2.5 rounded-full bg-brand-100/80 px-4 py-1.5 border border-brand-200">
                          <div className="h-2 w-2 rounded-full bg-brand-500 animate-pulse"></div>
                          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
                            {item.year}
                          </span>
                          <div className="h-2 w-2 rounded-full bg-brand-500 animate-pulse"></div>
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-brand-300 via-brand-300 to-transparent"></div>
                      </div>

                      {/* Milestone Content */}
                      <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-light">
                        {item.summary}
                      </p>

                      {/* Decorative Elements */}
                      <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700">
                        <div className="h-2 w-2 rounded-full bg-brand-300"></div>
                        <div className="h-2 w-2 rounded-full bg-brand-400"></div>
                        <div className="h-2 w-2 rounded-full bg-brand-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Timeline Start/End Decorations */}
      <div className="absolute left-8 top-0 h-8 w-8 rounded-full border-4 border-white bg-gradient-to-br from-brand-300 to-brand-400 shadow-xl sm:left-1/2 sm:-translate-x-1/2 sm:h-10 sm:w-10"></div>
      <div className="absolute left-8 bottom-0 h-8 w-8 rounded-full border-4 border-white bg-gradient-to-br from-brand-300 to-brand-400 shadow-xl sm:left-1/2 sm:-translate-x-1/2 sm:h-10 sm:w-10"></div>
    </div>
  );
}

type TimelineItem = {
  year: string;
  summary: string;
};

type TimelineProps = {
  items: TimelineItem[];
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative mt-12">
      {/* Enhanced Timeline Line with Gradient - VERY VISIBLE */}
      <div className="relative">
        <div
          className="absolute left-8 top-0 h-full w-1.5 bg-gradient-to-b from-brand-300 via-brand-500 to-brand-300 sm:left-1/2 sm:-translate-x-1/2"
          aria-hidden="true"
        />
        {/* Animated glow effect - VERY VISIBLE */}
        <div
          className="absolute left-8 top-0 h-full w-2 bg-gradient-to-b from-brand-500/40 via-brand-500/60 to-brand-500/40 blur-md sm:left-1/2 sm:-translate-x-1/2"
          aria-hidden="true"
        />
      </div>

      <div className="space-y-16">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          const isLast = index === items.length - 1;
          
          // Different icons for variety
          const timelineIcons = [
            <svg key="star" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>,
            <svg key="trophy" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>,
            <svg key="flag" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>,
          ];

          return (
            <div
              key={`${item.year}-${index}`}
              className="group relative flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12"
            >
              {/* Year Section - Enhanced Design */}
              <div className={`flex items-center gap-4 sm:w-2/5 ${isEven ? 'sm:justify-end sm:flex-row-reverse' : 'sm:justify-start'}`}>
                {/* Year Badge with Icon - VERY LARGE AND VISIBLE */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 blur-lg opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-xl font-extrabold text-white shadow-2xl shadow-brand-900/50 transition-all duration-500 group-hover:scale-115 group-hover:rotate-6 group-hover:shadow-brand-900/70 ring-4 ring-brand-500/20">
                    <span className="relative z-10">{item.year}</span>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent"></div>
                  </div>
                </div>
                
                {/* Milestone Badge */}
                <div className="hidden sm:block">
                  <div className="rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 px-5 py-2.5 shadow-lg">
                    <div className="flex items-center gap-2">
                      {timelineIcons[index % timelineIcons.length]}
                      <span className="text-xs font-bold uppercase tracking-widest text-white">
                        Milestone
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content Card - Enhanced Design */}
              <div className={`relative sm:w-3/5 ${isEven ? '' : 'sm:order-first'}`}>
                {/* Connecting Line Dot - VERY LARGE AND VISIBLE */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 sm:left-1/2 sm:translate-x-0 z-10">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-brand-500 blur-lg opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
                    <div className="relative h-8 w-8 rounded-full border-4 border-white bg-gradient-to-br from-brand-500 to-brand-600 shadow-2xl transition-all duration-300 group-hover:scale-150 group-hover:bg-brand-400 ring-2 ring-brand-500/30"></div>
                  </div>
                </div>

                {/* Content Card - VERY LARGE AND VISIBLE */}
                <div className="ml-8 sm:ml-0 sm:mr-8">
                  <div className="group/card relative overflow-hidden rounded-[2rem] border-2 border-brand-200/80 bg-gradient-to-br from-white via-white to-brand-50/40 p-10 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:shadow-3xl hover:-translate-y-3 hover:border-brand-300 hover:scale-[1.02]">
                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Year Badge on Mobile */}
                    <div className="mb-4 flex items-center gap-3 sm:hidden">
                      <div className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-4 py-1.5 shadow-md">
                        <div className="flex items-center gap-2">
                          {timelineIcons[index % timelineIcons.length]}
                          <span className="text-xs font-bold uppercase tracking-wider text-white">
                            {item.year}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <div className="mb-3 flex items-center gap-2 text-brand-600">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-500"></div>
                        <span className="text-xs font-bold uppercase tracking-widest">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                        {item.summary}
                      </p>
                    </div>

                    {/* Decorative Corner Accent */}
                    <div className="absolute bottom-0 right-0 h-24 w-24 rounded-tl-full bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

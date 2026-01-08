import Image from "next/image";
import type { ReactElement } from "react";

import type { ScheduleDay } from "@/content/world-arena-polo-championship-2026";

type EventScheduleProps = {
  schedule: ScheduleDay[];
};

// Stock images for each day based on activities - Using relevant polo/equestrian images
const dayImages: Record<string, string> = {
  "Day 1": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&q=80", // Horse training/practice - equestrian
  "Day 2": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80", // Opening ceremony/banquet - elegant event
  "Day 3": "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=1200&q=80", // Polo match action - polo players
  "Day 4": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80", // Women's polo/exhibition - women equestrian
  "Day 5": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80", // Final match/trophy - sports trophy
  "Day 6": "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=1200&q=80", // Polo match - polo action
  "Day 7": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&q=80", // Polo match - horse riding
  "Day 8": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80", // Closing ceremony - celebration
};

const activityTypeStyles: Record<
  string,
  {
    bg: string;
    borderColor: string;
    iconBg: string;
    iconColor: string;
    icon: ReactElement;
    badge?: string;
  }
> = {
  arrival: {
    bg: "bg-gradient-to-br from-blue-50 to-blue-100/50",
    borderColor: "border-blue-300/60",
    iconBg: "bg-blue-500",
    iconColor: "text-blue-600",
    badge: "Arrival",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  practice: {
    bg: "bg-gradient-to-br from-purple-50 to-purple-100/50",
    borderColor: "border-purple-300/60",
    iconBg: "bg-purple-500",
    iconColor: "text-purple-600",
    badge: "Practice",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
    ),
  },
  match: {
    bg: "bg-gradient-to-br from-green-50 to-emerald-100/50",
    borderColor: "border-green-300/60",
    iconBg: "bg-green-500",
    iconColor: "text-green-600",
    badge: "Match",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  ceremony: {
    bg: "bg-gradient-to-br from-amber-50 to-yellow-100/50",
    borderColor: "border-amber-300/60",
    iconBg: "bg-amber-500",
    iconColor: "text-amber-600",
    badge: "Ceremony",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
  hospitality: {
    bg: "bg-gradient-to-br from-rose-50 to-pink-100/50",
    borderColor: "border-rose-300/60",
    iconBg: "bg-rose-500",
    iconColor: "text-rose-600",
    badge: "Hospitality",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  media: {
    bg: "bg-gradient-to-br from-indigo-50 to-indigo-100/50",
    borderColor: "border-indigo-300/60",
    iconBg: "bg-indigo-500",
    iconColor: "text-indigo-600",
    badge: "Media",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
    ),
  },
  final: {
    bg: "bg-gradient-to-br from-brand-50 to-brand-100/50",
    borderColor: "border-brand-400/60",
    iconBg: "bg-brand-500",
    iconColor: "text-brand-600",
    badge: "Final",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
  },
};

export function EventSchedule({ schedule }: EventScheduleProps) {
  // Check if day has special events (finals, ceremonies)
  const getDaySpecialBadge = (day: ScheduleDay) => {
    const hasFinal = day.activities.some((a) => a.type === "final");
    const hasCeremony = day.activities.some((a) => a.type === "ceremony");
    if (hasFinal) return { text: "Final Day", color: "bg-brand-500 text-white" };
    if (hasCeremony && day.activities.some((a) => a.activity.includes("Opening")))
      return { text: "Opening Day", color: "bg-amber-500 text-white" };
    if (hasCeremony && day.activities.some((a) => a.activity.includes("Closing")))
      return { text: "Closing Day", color: "bg-brand-600 text-white" };
    return null;
  };

  return (
    <div className="relative py-8">
      {/* Enhanced Timeline Line with animated gradient */}
      <div className="absolute left-8 top-0 h-full w-1.5 bg-gradient-to-b from-brand-300 via-brand-500 to-brand-300 sm:left-1/2 sm:-translate-x-1/2 shadow-lg"></div>
      <div className="absolute left-8 top-0 h-full w-3 bg-gradient-to-b from-brand-500/30 via-brand-500/50 to-brand-500/30 blur-lg sm:left-1/2 sm:-translate-x-1/2"></div>

      {/* Animated pulse effect on timeline */}
      <div className="absolute left-8 top-0 h-full w-1.5 bg-brand-500/20 animate-pulse sm:left-1/2 sm:-translate-x-1/2"></div>

      <div className="space-y-16">
        {schedule.map((day, index) => {
          const isEven = index % 2 === 0;
          const specialBadge = getDaySpecialBadge(day);
          const isSpecialDay = !!specialBadge;

          return (
            <div
              key={day.date}
              className="group relative flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Enhanced Date Section */}
              <div
                className={`flex items-start gap-4 sm:w-2/5 ${isEven ? "sm:justify-end sm:flex-row-reverse" : "sm:justify-start"}`}
              >
                <div className="relative flex-shrink-0">
                  {/* Multi-layer glow effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-400 via-brand-600 to-brand-800 blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-700 -z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-brand-700 blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 -z-10"></div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-brand-300/30 via-brand-500/30 to-brand-700/30 blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                  {/* Date Badge */}
                  <div
                    className={`relative flex h-28 w-28 flex-col items-center justify-center bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white shadow-2xl shadow-brand-900/60 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ring-4 ring-brand-500/40 overflow-hidden ${
                      isSpecialDay ? "ring-brand-400/60 ring-4 shadow-brand-500/40" : ""
                    }`}
                  >
                    {/* Base gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900"></div>

                    {/* Inner glow layer */}
                    <div className="absolute inset-[2px] bg-gradient-to-br from-brand-500/20 via-transparent to-brand-800/20 pointer-events-none"></div>

                    {/* Refined pattern overlay - better integrated */}
                    <div
                      className="absolute inset-0 opacity-[0.08] pointer-events-none"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 1px, transparent 1px)",
                        backgroundSize: "6px 6px",
                        backgroundPosition: "center",
                      }}
                    ></div>

                    {/* Animated shine effects - properly layered */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {/* Primary shine */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/8 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

                      {/* Secondary diagonal shine */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/6 to-white/15 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>

                      {/* Animated shimmer sweep */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500"
                        style={{
                          transform: "translateX(-100%) translateY(-100%) rotate(45deg)",
                          width: "200%",
                          height: "200%",
                        }}
                      ></div>
                    </div>

                    {/* Content wrapper with proper z-index */}
                    <div className="relative z-20 flex flex-col items-center justify-center gap-1 pointer-events-none">
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                        {day.day}
                      </span>
                      <span className="text-2xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] leading-none">
                        {day.date}
                      </span>
                    </div>

                    {/* Corner accent for special days - properly positioned */}
                    {isSpecialDay && (
                      <div className="absolute -top-2 -right-2 z-30 pointer-events-none">
                        <div className="relative">
                          <div className="absolute inset-0 h-7 w-7 bg-gradient-to-br from-brand-400 to-brand-600 ring-3 ring-white shadow-xl animate-pulse"></div>
                          <div className="absolute inset-0 h-5 w-5 bg-white/40 blur-sm animate-ping -top-1 -right-1"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Enhanced special badge */}
                  {specialBadge && (
                    <div
                      className={`absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 text-xs font-bold shadow-xl ring-2 ring-white/30 backdrop-blur-sm ${specialBadge.color} transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl whitespace-nowrap`}
                    >
                      <span className="relative z-10 inline-block">{specialBadge.text}</span>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Content Card */}
              <div className={`relative sm:w-3/5 ${isEven ? "" : "sm:order-first"}`}>
                {/* Content Card */}
                <div className="sm:mr-10">
                  <div
                    className={`group/card relative overflow-hidden border-2 ${
                      isSpecialDay
                        ? "border-brand-300 bg-gradient-to-br from-brand-50/50 via-white to-brand-50/30"
                        : "border-brand-200/80 bg-gradient-to-br from-white via-white to-brand-50/40"
                    } shadow-2xl backdrop-blur-sm transition-all duration-500 hover:shadow-3xl hover:-translate-y-3 hover:border-brand-300`}
                  >
                    {/* Hero Image for the Day */}
                    {dayImages[day.day] && (
                      <div className="relative h-56 md:h-64 overflow-hidden">
                        <Image
                          src={dayImages[day.day]}
                          alt={`${day.day} - ${day.dateFull}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                          sizes="(max-width: 768px) 100vw, 60vw"
                          priority={index < 2}
                        />
                        {/* Gradient overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>

                        {/* Decorative overlay pattern */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.1)_100%)]"></div>

                        {/* Content overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                          <div className="flex items-center justify-between flex-wrap gap-3">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-1">
                                {day.day}
                              </p>
                              <p className="text-base md:text-lg font-bold uppercase tracking-wider text-white">
                                {day.dateFull}
                              </p>
                            </div>
                            {isSpecialDay && (
                              <span className="bg-brand-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-xl ring-2 ring-white/20">
                                ⭐ Special Day
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Corner accent */}
                        <div className="absolute top-4 right-4 h-16 w-16 bg-brand-500/20 blur-2xl"></div>
                      </div>
                    )}

                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                    {/* Decorative corner elements */}
                    <div className="absolute right-0 top-0 h-40 w-40 bg-gradient-to-br from-brand-500/10 to-brand-500/5 opacity-0 group-hover/card:opacity-100 transition-all duration-700 group-hover/card:scale-150 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 h-32 w-32 bg-gradient-to-tl from-brand-500/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-700 pointer-events-none"></div>

                    <div
                      className={`relative ${dayImages[day.day] ? "p-6 md:p-8 pt-6" : "p-8 md:p-10"}`}
                    >
                      {/* Date Header (shown only if no image) */}
                      {!dayImages[day.day] && (
                        <div className="mb-6 flex items-center justify-between">
                          <p className="text-sm font-bold uppercase tracking-widest text-brand-600">
                            {day.dateFull}
                          </p>
                          {isSpecialDay && (
                            <span className="bg-brand-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
                              ⭐ Special
                            </span>
                          )}
                        </div>
                      )}

                      {/* Activities */}
                      <div className={`space-y-4 ${dayImages[day.day] ? "mt-2" : ""}`}>
                        {day.activities.map((activity, actIndex) => {
                          const style =
                            activityTypeStyles[activity.type] || activityTypeStyles.match;
                          return (
                            <div
                              key={actIndex}
                              className={`group/activity relative flex gap-4 border-2 ${style.borderColor} ${style.bg} p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-opacity-100`}
                            >
                              {/* Icon Container */}
                              <div className="flex-shrink-0">
                                <div
                                  className={`flex h-12 w-12 items-center justify-center ${style.iconBg} text-white shadow-lg transition-all duration-300 group-hover/activity:scale-110 group-hover/activity:rotate-3`}
                                >
                                  {style.icon}
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="mb-2 flex items-center gap-2 flex-wrap">
                                  {style.badge && (
                                    <span
                                      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${style.iconColor} bg-white/80`}
                                    >
                                      {style.badge}
                                    </span>
                                  )}
                                  {activity.time && (
                                    <span className="text-xs font-semibold text-gray-600">
                                      🕐 {activity.time}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm md:text-base font-semibold text-gray-900 leading-relaxed">
                                  {activity.activity}
                                </p>
                              </div>

                              {/* Hover arrow indicator */}
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/activity:opacity-100 transition-opacity duration-300">
                                <svg
                                  className="h-5 w-5 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
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

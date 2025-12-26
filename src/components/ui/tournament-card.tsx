import type { Tournament } from "@/content/world-arena-polo-championship-2026";
import type { ReactElement } from "react";

type TournamentCardProps = {
  tournament: Tournament;
};

const activityTypeIcons: Record<string, ReactElement> = {
  "4 Goal": (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  ),
  "6 Goal": (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  ),
  Exhibition: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  ),
};

export function TournamentCard({ tournament }: TournamentCardProps) {
  const icon = activityTypeIcons[tournament.goal] || activityTypeIcons.Exhibition;

  return (
    <article className="group relative overflow-hidden rounded-[2.5rem] border border-brand-100 bg-gradient-to-br from-white via-white to-brand-50/30 p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-200">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-brand-500/10 to-brand-500/5 transition-all duration-700 group-hover:scale-150"></div>

      {/* Header */}
      <div className="relative mb-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-brand-500/5 text-brand-600 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            {icon}
          </div>
          <div className="rounded-full bg-brand-100 px-3 py-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              {tournament.goal}
            </span>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-brand-900 leading-tight">{tournament.name}</h3>
        <p className="mt-2 text-sm font-semibold text-brand-600">{tournament.dates}</p>
      </div>

      {/* Description */}
      <p className="relative mb-6 text-sm leading-relaxed text-gray-700">{tournament.description}</p>

      {/* Format */}
      <div className="relative mb-6 rounded-xl bg-brand-50/50 p-4 border border-brand-100">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 mb-2">Format</p>
        <p className="text-sm text-gray-700">{tournament.format}</p>
      </div>

      {/* Teams */}
      <div className="relative">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-600">
          Participating Teams
        </p>
        <div className="flex flex-wrap gap-2">
          {tournament.teams.map((team) => (
            <span
              key={team}
              className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700"
            >
              {team}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}


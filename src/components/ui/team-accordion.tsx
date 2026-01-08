'use client';

import { useState } from 'react';

type Player = {
  name: string;
  number?: string;
  role?: string;
};

type TeamData = {
  country: string;
  flag: string;
  players: Player[];
};

interface TeamAccordionProps {
  team: TeamData;
  tournament?: string;
  isOpen?: boolean;
}

export function TeamAccordion({ team, tournament, isOpen = false }: TeamAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-slate-200 overflow-hidden">
      {/* Team Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-2"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl">{team.flag}</span>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900">{team.country} Team</h3>
            {tournament && (
              <span className="ml-3 inline-flex items-center bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-semibold">
                {tournament}
              </span>
            )}
          </div>
        </div>
        <svg
          className={`h-6 w-6 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7 7" />
        </svg>
      </button>

      {/* Players List */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <ul className="p-6 space-y-3">
          {team.players.map((player, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="font-semibold text-slate-800">{player.name}</span>
              {player.number && (
                <span className="text-sm text-slate-500">({player.number})</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

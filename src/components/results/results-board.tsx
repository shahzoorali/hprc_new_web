"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ResultClass, ResultEntry } from "@/content/results-types";

const MEDAL = ["🥇", "🥈", "🥉"];

/** Leading ordinal from "1st" / "Joint 3rd" → 1 / 3. Falls back to list order. */
function tier(entry: ResultEntry, index: number) {
  const match = entry.pos?.match(/(\d+)/);
  return match ? Number(match[1]) : index + 1;
}

function metricLabel(cls: ResultClass) {
  if (cls.metric === "score") return "Avg Score";
  if (cls.metric === "penalties") return "Penalties";
  return null;
}

function metricValue(cls: ResultClass, entry: ResultEntry) {
  if (cls.metric === "score" && entry.score) {
    return `${(Number(entry.score) * 100).toFixed(2)}%`;
  }
  if (cls.metric === "penalties" && entry.penalties) {
    return entry.penalties;
  }
  return "—";
}

function positionLabel(entry: ResultEntry, index: number) {
  if (entry.pos) return entry.pos;
  return `${index + 1}${["st", "nd", "rd"][index] ?? "th"}`;
}

function PodiumCard({
  cls,
  entry,
  index,
  showPhotos,
}: {
  cls: ResultClass;
  entry: ResultEntry;
  index: number;
  showPhotos: boolean;
}) {
  const rank = tier(entry, index);
  const medal = MEDAL[rank - 1] ?? "🏅";

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border-2 border-brand-100 bg-white shadow-md transition-shadow hover:shadow-xl">
      {showPhotos && (
        <div className="relative aspect-[4/5] w-full bg-brand-50">
          {entry.photo ? (
            <Image
              src={entry.photo}
              alt={`${entry.rider} — ${positionLabel(entry, index)}, ${cls.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-brand-50">
              <Image src="/hprc_logo.png" alt="HPRC" width={110} height={110} className="opacity-70" />
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-brand-900 shadow">
            {medal} {positionLabel(entry, index)}
          </span>
        </div>
      )}

      <div className="space-y-1 p-5">
        {!showPhotos && (
          <span className="text-sm font-bold text-brand-700">
            {medal} {positionLabel(entry, index)}
          </span>
        )}
        <p className="text-lg font-bold leading-snug text-gray-900">{entry.rider}</p>
        <p className="italic text-gray-700">{entry.horse}</p>
        {entry.club && <p className="text-sm text-gray-600">{entry.club}</p>}

        <div className="flex flex-wrap gap-2 pt-2">
          {entry.ageGroup && (
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
              {entry.ageGroup}
            </span>
          )}
          {cls.metric && (
            <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-800">
              {metricLabel(cls)}: {metricValue(cls, entry)}
            </span>
          )}
          {entry.prize && (
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
              {entry.prize}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function ResultsBoard({
  classes,
  showPhotos = true,
}: {
  classes: ResultClass[];
  showPhotos?: boolean;
}) {
  const disciplines = useMemo(() => Array.from(new Set(classes.map((c) => c.discipline))), [classes]);
  const [active, setActive] = useState<string>("All");

  const visible = active === "All" ? classes : classes.filter((c) => c.discipline === active);

  return (
    <div className="space-y-10">
      {/* Discipline filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {["All", ...disciplines].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setActive(d)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              active === d
                ? "bg-brand-500 text-white shadow"
                : "bg-white text-brand-800 ring-1 ring-brand-200 hover:bg-brand-50"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {visible.map((cls) => {
        const podium = cls.entries.slice(0, 3);
        const rest = cls.entries.slice(3);
        const hasPrize = cls.entries.some((e) => e.prize);

        return (
          <section
            key={cls.slug}
            id={cls.slug}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-brand-100 shadow-md"
          >
            <header className="flex flex-wrap items-baseline justify-between gap-2 bg-brand-900 px-6 py-4">
              <h2 className="text-lg font-bold tracking-wide text-white">{cls.title}</h2>
              <span className="text-sm text-brand-200">
                {cls.entries.length} {cls.entries.length === 1 ? "placing" : "placings"}
              </span>
            </header>

            <div className="space-y-6 bg-white p-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {podium.map((entry, i) => (
                  <PodiumCard
                    key={`${entry.rider}-${entry.horse}-${i}`}
                    cls={cls}
                    entry={entry}
                    index={i}
                    showPhotos={showPhotos}
                  />
                ))}
              </div>

              {rest.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-brand-100 bg-brand-50">
                        <th className="w-32 px-5 py-3 text-left font-semibold text-brand-800">Position</th>
                        <th className="px-5 py-3 text-left font-semibold text-brand-800">Rider</th>
                        <th className="px-5 py-3 text-left font-semibold text-brand-800">Horse</th>
                        <th className="px-5 py-3 text-left font-semibold text-brand-800">Club</th>
                        {cls.metric && (
                          <th className="px-5 py-3 text-left font-semibold text-brand-800">{metricLabel(cls)}</th>
                        )}
                        {hasPrize && <th className="px-5 py-3 text-left font-semibold text-brand-800">Prize</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {rest.map((entry, i) => (
                        <tr
                          key={`${entry.rider}-${entry.horse}-${i}`}
                          className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}
                        >
                          <td className="px-5 py-3 font-medium text-gray-800">{positionLabel(entry, i + 3)}</td>
                          <td className="px-5 py-3 font-semibold text-gray-900">{entry.rider}</td>
                          <td className="px-5 py-3 italic text-gray-700">{entry.horse}</td>
                          <td className="px-5 py-3 text-gray-600">{entry.club ?? "—"}</td>
                          {cls.metric && (
                            <td className="px-5 py-3 font-medium text-gray-800">{metricValue(cls, entry)}</td>
                          )}
                          {hasPrize && <td className="px-5 py-3 text-gray-700">{entry.prize ?? "—"}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

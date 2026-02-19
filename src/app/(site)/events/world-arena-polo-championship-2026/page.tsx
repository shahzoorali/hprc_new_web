import DE from "country-flag-icons/react/3x2/DE";
import FR from "country-flag-icons/react/3x2/FR";
import IN from "country-flag-icons/react/3x2/IN";
import LU from "country-flag-icons/react/3x2/LU";
import US from "country-flag-icons/react/3x2/US";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { CountdownTimer } from "@/components/ui/countdown-timer";
import { CountryBadge } from "@/components/ui/country-badge";
import { EventContactForm } from "@/components/ui/event-contact-form";
import { EventSchedule } from "@/components/ui/event-schedule";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { TournamentCard } from "@/components/ui/tournament-card";
import { worldArenaPoloChampionship2026 } from "@/content/world-arena-polo-championship-2026";

export const metadata = {
  title: "HPRC World Arena Polo Championship 2026 | Hyderabad Polo & Riding Club",
  description:
    "Relive the HPRC World Arena Polo Championship 2026. India won both the Radha TMT (4-Goal) and Telangana Tourism (6-Goal) cups. Full results, schedule, and coverage.",
};

const countryFlagComponents: Record<
  string,
  React.ComponentType<{ className?: string; title?: string }>
> = {
  USA: US,
  IND: IN,
  GER: DE,
  FRA: FR,
  LUX: LU,
};

export default function WorldArenaPoloChampionship2026Page() {
  const {
    eventStatus,
    hero,
    overview,
    keyInfo,
    countries,
    tournaments,
    schedule,
    results,
    pressCoverage,
    officials,
    hospitality,
    media,
    objectives,
    legacy,
  } = worldArenaPoloChampionship2026;

  const isCompleted = eventStatus === "completed";

  // Event started on February 11, 2026 at 00:00 IST (UTC+5:30)
  const targetDate = new Date("2026-02-11T00:00:00+05:30");
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const difference = target - now;
  const daysRemaining = Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24)));

  return (
    <div className="space-y-20 pb-20">
      {/* 🎉 Energetic Hero Section with Countdown */}
      <div className="relative overflow-hidden">
        <div className="container pt-12">
          <div className="relative overflow-hidden  border-2 border-brand-200/50 shadow-[0_40px_80px_-20px_rgba(227,30,36,0.3)]">
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=1920&q=80"
                alt="Polo Championship"
                fill
                className="object-cover"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-900/85 via-brand-800/80 to-brand-900/85"></div>
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-64 h-64 bg-brand-500/20  blur-[100px]"></div>
              <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-400/20  blur-[120px]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/10  blur-[150px]"></div>
            </div>

            <div className="relative z-10 p-12 md:p-20">
              <div className="space-y-8 text-center">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-3 shadow-2xl shadow-brand-500/50 mt-16 md:mt-20">
                  <div className="h-2 w-2  bg-white"></div>
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                    World-Class Championship
                  </span>
                  <div className="h-2 w-2  bg-white"></div>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white font-display tracking-tight leading-tight">
                  World Arena Polo
                  <br />
                  <span className="text-white">Championship 2026</span>
                </h1>

                <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
                  {isCompleted
                    ? "India won both the Radha TMT and Telangana Tourism cups. Relive the championship."
                    : "Experience the pinnacle of international arena polo in Hyderabad"}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-6 w-6 text-brand-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-semibold text-lg">{hero.dates}</span>
                  </div>
                  <div className="h-6 w-px bg-white/30"></div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-6 w-6 text-brand-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    <span className="font-semibold text-lg">{hero.venue}</span>
                  </div>
                </div>

                {isCompleted ? (
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 px-6 py-4 text-white font-semibold">
                    <span>Event concluded 18 February 2026</span>
                  </div>
                ) : (
                  <CountdownTimer targetDate={targetDate} />
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href={isCompleted ? "#results" : "#contact"}
                    className="inline-flex items-center justify-center gap-3  bg-gradient-to-r from-white to-gray-100 px-10 py-5 text-lg font-bold text-brand-900 shadow-2xl"
                  >
                    <span>{isCompleted ? "View Results" : "Register Now"}</span>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="#schedule"
                    className="inline-flex items-center justify-center gap-3  border-2 border-white px-10 py-5 text-lg font-bold text-white shadow-2xl"
                  >
                    <span>{isCompleted ? "View Schedule & Results" : "View Schedule"}</span>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Governing body logos */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-white/60 px-6 py-4 shadow-2xl">
              <Image
                src="/logos/fip-logo.svg"
                alt="Federation of International Polo"
                width={72}
                height={72}
                className="h-16 w-auto"
              />
              <Image
                src="/logos/ipa-logo.png"
                alt="Indian Polo Association"
                width={72}
                height={72}
                className="h-16 w-auto"
              />
            </div>
            <div className="absolute bottom-8 left-8 flex h-16 w-16 items-center justify-center  bg-brand-500/20 backdrop-blur-sm border border-brand-400/30 shadow-xl">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 📊 Stats Bar */}
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-brand-600 via-brand-700 to-brand-600 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15),transparent_70%)]"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 md:p-12 relative">
            {[
              { value: "5", label: "Countries" },
              { value: "12", label: "Teams" },
              { value: "7", label: "Days" },
              { value: "20+", label: "Matches" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center space-y-2">
                <p className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-display">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-brand-200">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🎯 Event Overview */}
      <section className="container">
        <div className="relative overflow-hidden  bg-gradient-to-br from-brand-50/80 via-white to-brand-50/60 p-10 md:p-16 border-2 border-brand-100/70 shadow-[0_30px_60px_-15px_rgba(227,30,36,0.15)]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5  blur-[150px]"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-600/5  blur-[120px]"></div>
          </div>

          <div className="relative space-y-8">
            <SectionHeading
              eyebrow="About The Championship"
              title="A Global Arena Polo Spectacular"
              description="The world's finest arena polo teams converge for an unforgettable week of competition and celebration"
              align="center"
            />
            <div className="flex items-center justify-center gap-8">
              <Image
                src="/logos/fip-logo.svg"
                alt="Federation of International Polo"
                width={56}
                height={56}
                className="h-14 w-auto"
              />
              <Image
                src="/logos/ipa-logo.png"
                alt="Indian Polo Association"
                width={56}
                height={56}
                className="h-14 w-auto"
              />
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="relative overflow-hidden  bg-gradient-to-br from-white to-brand-50/40 p-8 border border-brand-100/60 shadow-xl">
                <h3 className="text-2xl font-bold text-brand-900 mb-4 font-display">Background</h3>
                <p className="text-lg text-gray-700 leading-relaxed font-light">
                  {overview.background}
                </p>
              </div>
              <div className="relative overflow-hidden  bg-gradient-to-br from-white to-brand-50/40 p-8 border border-brand-100/60 shadow-xl">
                <h3 className="text-2xl font-bold text-brand-900 mb-4 font-display">Rationale</h3>
                <p className="text-lg text-gray-700 leading-relaxed font-light">
                  {overview.rationale}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌍 Participating Countries */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/15  blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-400/15  blur-[150px]"></div>
        </div>

        <div className="container relative">
          <SectionHeading
            eyebrow="International Glory"
            title="Participating Nations"
            description="Elite arena polo teams from across the globe compete for the title"
            align="center"
            className="text-white"
          />

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            {countries.map((country) => {
              const FlagComponent = countryFlagComponents[country.code];
              return (
                <div key={country.code} className="flex flex-col items-center gap-3">
                  <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 p-6">
                    {FlagComponent ? (
                      <FlagComponent
                        className="w-12 h-12 md:w-16 md:h-16"
                        title={`${country.name} flag`}
                      />
                    ) : (
                      <div
                        className="relative text-4xl leading-none"
                        role="img"
                        aria-label={`${country.name} flag`}
                      >
                        🏳️
                      </div>
                    )}
                  </div>
                  <span className="text-white text-sm font-semibold text-center">
                    {country.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🏆 Tournament Structure */}
      <section className="container" id="tournaments">
        <SectionHeading
          eyebrow="Championship Format"
          title="Four Exciting Tournaments"
          description="Multiple tournament formats showcasing the best of international arena polo"
          align="center"
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {tournaments.map((tournament, index) => (
            <div
              key={tournament.id}
              className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand-100/80 bg-gradient-to-br from-white via-white to-brand-50/50 p-10 shadow-2xl"
            >
              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center  bg-gradient-to-br from-brand-500 to-brand-600 text-3xl shadow-2xl shadow-brand-900/30">
                  <span className="font-extrabold text-white font-display">{index + 1}</span>
                </div>
                <h3 className="text-3xl font-bold text-brand-900 mb-4 font-display tracking-tight">
                  {tournament.name}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed font-light mb-6">
                  {tournament.description}
                </p>
                <div className="flex items-center gap-3  bg-brand-100/80 px-5 py-2.5 w-fit border border-brand-200/60">
                  <svg
                    className="h-5 w-5 text-brand-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-brand-800">{tournament.dates}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🏆 Championship Results */}
      <section className="container" id="results">
        <SectionHeading
          eyebrow="Final Standings"
          title="Championship Results"
          description="Official results from the 2026 Hyderabad International Polo Cup. India claimed both the Radha TMT (4-Goal) and Telangana Tourism (6-Goal) championships."
          align="center"
        />
        <div className="mt-12 relative overflow-hidden rounded-[2.5rem] border-2 border-brand-100/80 bg-white shadow-2xl">
          <div className="relative aspect-[16/9] max-h-[420px] w-full">
            <Image
              src="/images/india-team-trophy-2026.png"
              alt="Indian team with trophy at International Arena Polo Championship 2026 – HPRC"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-white font-semibold text-lg drop-shadow-lg">
                Team India — Champions, Radha TMT & Telangana Tourism cups
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 space-y-12">
          {results.map((cup) => (
            <div
              key={cup.tournamentId}
              className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand-100/80 bg-gradient-to-br from-white via-white to-brand-50/50 p-8 md:p-10 shadow-2xl"
            >
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-2xl md:text-3xl font-bold text-brand-900 font-display tracking-tight">
                  {cup.tournamentName}
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 bg-brand-100 px-4 py-2 text-brand-800 font-bold">
                    🏆 Champion: {cup.champion}
                  </span>
                  {cup.mvp && (
                    <span className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 text-amber-800 font-semibold">
                      MVP: {cup.mvp}
                    </span>
                  )}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-brand-200 bg-brand-50/80">
                      <th className="py-3 px-4 font-semibold text-brand-900">Date</th>
                      <th className="py-3 px-4 font-semibold text-brand-900">Round</th>
                      <th className="py-3 px-4 font-semibold text-brand-900 text-right">Team</th>
                      <th className="py-3 px-4 font-semibold text-brand-900 text-center">Goals</th>
                      <th className="py-3 px-4 font-semibold text-brand-900 text-center">—</th>
                      <th className="py-3 px-4 font-semibold text-brand-900 text-center">Goals</th>
                      <th className="py-3 px-4 font-semibold text-brand-900 text-left">Team</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cup.matches.map((m, i) => (
                      <tr key={i} className="border-b border-brand-100 hover:bg-brand-50/50">
                        <td className="py-3 px-4 text-gray-700">{m.dateLabel}</td>
                        <td className="py-3 px-4 font-medium text-brand-800">{m.round}</td>
                        <td className="py-3 px-4 text-right font-medium">{m.teamA}</td>
                        <td className="py-3 px-4 text-center font-bold text-brand-700">{m.goalsA}</td>
                        <td className="py-3 px-2 text-gray-400">vs</td>
                        <td className="py-3 px-4 text-center font-bold text-brand-700">{m.goalsB}</td>
                        <td className="py-3 px-4 text-left font-medium">{m.teamB}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
        {pressCoverage && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-3">Coverage</p>
            <a
              href={pressCoverage.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-brand-600 font-semibold hover:underline"
            >
              <Image
                src="https://lapoloin.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/09/lapolo-logo-retina.png"
                alt="LA POLO"
                width={120}
                height={36}
                className="h-8 w-auto object-contain"
              />
              <span>
                {pressCoverage.title} — {pressCoverage.source}
              </span>
              <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
      </section>

      {/* 📅 Day-wise Programme */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-brand-50/60 via-white to-brand-50/40 py-20"
        id="schedule"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-96 w-96 bg-brand-500/8  blur-[150px]"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 bg-brand-600/8  blur-[120px]"></div>
        </div>

        <div className="container relative">
          <SectionHeading
            eyebrow="Event Timeline"
            title="Complete Championship Schedule"
            description="Day-by-day breakdown of matches, ceremonies, and special events"
            align="center"
          />
          <div className="mt-16">
            <EventSchedule schedule={schedule} />
          </div>
        </div>
      </section>

      {/* 👨‍⚖️ Technical Officials */}
      <section className="container">
        <SectionHeading
          eyebrow="World-Class Governance"
          title="Technical Officials & Committee"
          description="Internationally recognized officials ensuring fair play and excellence"
          align="center"
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div
            className="relative overflow-hidden rounded-[2.5rem] border-2 border-gray-800/80 p-10 shadow-2xl"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #000 0px, #000 25px, #fff 25px, #fff 50px)",
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative">
              <div className="mb-6 relative w-full aspect-[3/4] overflow-hidden rounded-xl border-2 border-white/20 ring-2 ring-white/10">
                <Image
                  src="/images/robin-sanchez.jpg"
                  alt={officials.chiefUmpire.name}
                  fill
                  className="object-cover"
                  quality={90}
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                {officials.chiefUmpire.name}
              </h3>
              <p className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                {officials.chiefUmpire.role}
              </p>
            </div>
          </div>

          {officials.committee.slice(0, 3).map((member, index) => {
            const isArsalanKhan = member.name === "Arsalan Khan";
            const isChaitaniaKumar = member.name === "Chaitania Kumar";
            return (
              <div
                key={index}
                className={`relative overflow-hidden rounded-[2.5rem] border-2 p-10 shadow-2xl ${
                  isArsalanKhan
                    ? "border-blue-800/80 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900"
                    : isChaitaniaKumar
                      ? "border-emerald-800/80 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900"
                      : "border-brand-200/80 bg-gradient-to-br from-white to-brand-50/40"
                }`}
              >
                <div className="relative">
                  {isArsalanKhan ? (
                    <div className="mb-6 relative w-full aspect-[3/4] overflow-hidden rounded-xl border-2 border-white/20 ring-2 ring-white/10">
                      <Image
                        src="/images/arsalan-khan.jpeg"
                        alt={member.name}
                        fill
                        className="object-cover"
                        quality={90}
                      />
                    </div>
                  ) : isChaitaniaKumar ? (
                    <div className="mb-6 relative w-full aspect-[3/4] overflow-hidden rounded-xl border-2 border-white/20 ring-2 ring-white/10">
                      <Image
                        src="/images/chaitania-kumar.jpg"
                        alt={member.name}
                        fill
                        className="object-cover"
                        quality={90}
                      />
                    </div>
                  ) : (
                    <div className="mb-6 flex h-20 w-20 items-center justify-center  bg-gradient-to-br from-brand-500 to-brand-600 text-3xl shadow-2xl">
                      <span className="font-extrabold text-white font-display">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  )}
                  <h3
                    className={`text-xl font-bold mb-2 font-display ${
                      isArsalanKhan || isChaitaniaKumar ? "text-white" : "text-brand-900"
                    }`}
                  >
                    {member.name}
                  </h3>
                  <p
                    className={`text-sm font-semibold uppercase tracking-wider ${
                      isArsalanKhan
                        ? "text-blue-200"
                        : isChaitaniaKumar
                          ? "text-emerald-200"
                          : "text-brand-600"
                    }`}
                  >
                    {member.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 🎉 Hospitality & Experience */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/20  blur-[200px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-600/20  blur-[150px]"></div>
        </div>

        <div className="container relative">
          <SectionHeading
            eyebrow="Premium Hospitality"
            title="World-Class Experience"
            description="Exceptional experiences for guests, sponsors, and spectators"
            align="center"
            className="text-white [&_p]:text-white/80 [&_h3]:text-white"
          />

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {hospitality.features.map((feature, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-[2.5rem] border-2 border-white/20 bg-white/10 backdrop-blur-md p-10"
              >
                <div className="relative">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center  bg-gradient-to-br from-brand-400 to-brand-500 text-3xl shadow-xl">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5 16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714 2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 font-display">
                    {feature.title}
                  </h3>
                  <p className="text-base text-white/90 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📺 Media & Branding */}
      <section className="container">
        <SectionHeading
          eyebrow="Partnership"
          title="Sponsorship & Media Opportunities"
          description="Comprehensive branding and media coverage for sponsors and partners"
          align="center"
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {media.opportunities.map((opportunity, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand-200/80 bg-gradient-to-br from-white via-white to-brand-50/60 p-10 shadow-2xl"
            >
              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center  bg-gradient-to-br from-brand-500 to-brand-600 text-3xl shadow-xl">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-900 mb-4 font-display">
                  {opportunity.title}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed font-light">
                  {opportunity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🎯 Objectives & Legacy */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50/60 via-white to-brand-50/40 py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-96 w-96 bg-brand-500/8  blur-[150px]"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 bg-brand-600/8  blur-[120px]"></div>
        </div>

        <div className="container relative">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Our Goals" title="Championship Objectives" align="left" />
              <ul className="mt-8 space-y-5">
                {objectives.map((objective, index) => (
                  <li key={index} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="relative h-6 w-6  bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg">
                        <div className="absolute inset-1  bg-white"></div>
                      </div>
                    </div>
                    <span className="text-base md:text-lg text-gray-700 leading-relaxed font-light">
                      {objective}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading eyebrow="Long-term Impact" title="Expected Legacy" align="left" />
              <ul className="mt-8 space-y-5">
                {legacy.map((item, index) => (
                  <li key={index} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="relative h-6 w-6  bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg">
                        <div className="absolute inset-1  bg-white"></div>
                      </div>
                    </div>
                    <span className="text-base md:text-lg text-gray-700 leading-relaxed font-light">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 📝 Contact Form Section */}
      <section className="container" id="contact">
        <div className="relative overflow-hidden  bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 shadow-[0_50px_100px_-25px_rgba(227,30,36,0.3)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.15),transparent_70%)]"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20  blur-[150px]"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-400/20  blur-[120px]"></div>
          </div>

          <div className="relative p-6 sm:p-8 md:p-12 lg:p-16">
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-12">
              <div className="space-y-4 sm:space-y-6 text-white text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight">
                  Ready to Join the Action?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-light">
                  Whether you're interested in sponsorship, tickets, or media coverage, we'd love to
                  hear from you.
                </p>
                <div className="flex flex-col gap-3 sm:gap-4 items-center">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center bg-white/20 backdrop-blur-sm">
                      <svg
                        className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-white/70 uppercase tracking-wider">
                        Email
                      </p>
                      <p className="text-base sm:text-lg font-medium break-all">
                        championship@hprc.in
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center bg-white/20 backdrop-blur-sm">
                      <svg
                        className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-white/70 uppercase tracking-wider">
                        Phone
                      </p>
                      <p className="text-base sm:text-lg font-medium">+91 98765 43210</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 p-4 sm:p-6 md:p-8">
                <EventContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Final Energetic CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=1920&q=80"
            alt="Polo championship"
            fill
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/95 via-brand-700/95 to-brand-600/95"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10  blur-[200px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-500/20  blur-[150px]"></div>
        </div>

        <div className="container relative z-10 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3  bg-white/20 backdrop-blur-sm border-2 border-white/30 px-6 py-3">
              <div className="h-3 w-3  bg-green-400"></div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                Registration Open
              </span>
              <div className="h-3 w-3  bg-green-400"></div>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white font-display tracking-tight leading-tight">
              Join Us for the
              <br />
              <span className="bg-gradient-to-r from-brand-300 via-white to-brand-300 bg-clip-text text-transparent">
                World Arena Polo Championship 2026
              </span>
            </h2>

            <p className="mx-auto max-w-4xl text-xl md:text-2xl text-white/95 leading-relaxed font-light">
              Secure your place at the most anticipated arena polo championship of 2026. World-class
              competition, exceptional hospitality, and unforgettable experiences await in
              Hyderabad.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-3  bg-gradient-to-r from-white to-gray-100 px-12 py-6 text-xl font-bold text-brand-900 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)]"
              >
                <span>Register Now</span>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3  border-4 border-white px-12 py-6 text-xl font-bold text-white shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]"
              >
                <span>Learn More</span>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-extrabold text-white font-display">
                  {daysRemaining}+
                </p>
                <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                  Days Left
                </p>
              </div>
              <div className="h-16 w-px bg-white/30"></div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-extrabold text-white font-display">50+</p>
                <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                  Registered
                </p>
              </div>
              <div className="h-16 w-px bg-white/30"></div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-extrabold text-white font-display">10+</p>
                <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                  Sponsors
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

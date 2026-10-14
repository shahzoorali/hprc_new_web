"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useMemo, useState } from "react";

import { ImageLightbox } from "@/components/ui/image-lightbox";
import { SectionHeading } from "@/components/ui/section-heading";

const BASE = "/events/polo-passport";

type Photo = { file: string; alt: string; caption: string };

const OpenPhoto = createContext<(p: Photo) => void>(() => {});

const hero: Photo = {
  file: "hero_madrid.jpg",
  alt: "HPRC and Madrid Polo Club at San Fernando de Henares",
  caption: "",
};

const madrid: Photo[] = [
  {
    file: "madrid_white.jpg",
    alt: "The White team of the Friendship Cup on Madrid Polo Club horses",
    caption:
      "The Friendship Cup, Saturday 26 September — the winning White team, two clubs on one side.",
  },
  {
    file: "madrid_cup.jpg",
    alt: "Madrid Polo Club lift the Clubs Cup",
    caption:
      "Madrid Polo Club lift the Clubs Cup, 4–3, decided in the last minutes of the final chukker.",
  },
  {
    file: "madrid_india.jpg",
    alt: "Team India HPRC at the prize giving",
    caption:
      "Team India — Akash Reddy, Arsalan Khan, Saif Attari and Chaitania Kumar — at the prize giving.",
  },
  {
    file: "madrid_flamenco.jpg",
    alt: "Both clubs with the flamenco performers",
    caption:
      "Both clubs and their families with the performers after the flamenco on Calle del Pez.",
  },
];

const kentucky: Photo[] = [
  {
    file: "ky_flags.jpg",
    alt: "India and the USA with their flags before the final",
    caption:
      "India and the USA with their flags before the final, Commonwealth Polo Club, Paris, Kentucky.",
  },
  {
    file: "ky_rideoff.jpg",
    alt: "Chaitania Kumar rides off a Commonwealth player",
    caption:
      "Chaitania Kumar, four goals on the night, rides off a Commonwealth player under the lights.",
  },
  {
    file: "ky_shoulder.jpg",
    alt: "Shoulder to shoulder in the arena",
    caption: "Shoulder to shoulder — the match was never more than a goal apart.",
  },
  {
    file: "ky_winners.jpg",
    alt: "HPRC party in the Keeneland winner's circle",
    caption: "The winner’s circle at Keeneland after Emphatic’s Grade 1 Darley Alcibiades.",
  },
];

const kyMore: Photo[] = [
  {
    file: "ky_tapit.jpg",
    alt: "Tapit at Gainesway Farm",
    caption: "With Tapit at Gainesway Farm, on the Paris Pike.",
  },
  { file: "ky_barn.jpg", alt: "Gainesway stallion barn", caption: "Gainesway’s stallion barns." },
  { file: "ky_codys.jpg", alt: "Cody's Wish at Darley", caption: "Cody’s Wish at Darley." },
  {
    file: "ky_shirts.jpg",
    alt: "Commemorative shirts exchanged with Jorge Vasquez",
    caption: "The commemorative shirts, exchanged with Jorge Vasquez after the final.",
  },
];

const arena: Photo[] = [
  {
    file: "hprc_arena_team.jpg",
    alt: "Team India in the HPRC arena under lights",
    caption: "Team India in the HPRC arena at Aziznagar, under lights.",
  },
  {
    file: "hprc_arena_action.jpg",
    alt: "Arena polo action at HPRC",
    caption: "Arena polo at HPRC — three a side, a horse for every chukker, floodlit.",
  },
];

const score = [
  { value: "4–3", label: "Friendship Cup, Madrid · mixed teams" },
  { value: "3–4", label: "Clubs Cup, Madrid · India v Spain" },
  { value: "10–10", label: "The Final, Kentucky · India v USA, after overtime" },
];

const purposes = [
  {
    title: "Represent",
    text: "To carry Hyderabad and India onto established clubs’ home grounds, and to conduct ourselves there in a way that does credit to both.",
  },
  {
    title: "Develop",
    text: "Competitive polo on unfamiliar horses, against a different style of play, is the fastest education a player can get.",
  },
  {
    title: "Connect",
    text: "To make friends who will come back to us. Every club we visit is a club we intend to host.",
  },
];

const numbers = [
  { value: "2005", label: "Club established, Aziznagar, Hyderabad" },
  { value: "140+", label: "Horses stabled, 95 club-owned" },
  { value: "2,000", label: "Members, with families and guests" },
  { value: "2 ×", label: "Arena Polo Club of the Season, 2025 and 2026" },
  { value: "6", label: "Nations at the International Arena Polo Championship 2027" },
  { value: "50", label: "Rooms in the hotel now being built at the club" },
];

const tourism = [
  {
    title: "Polo weekends",
    text: "A long weekend or a week of chukkers, coaching and a tournament on club horses — with Hyderabad’s forts, palaces and food in the afternoons.",
  },
  {
    title: "Training residencies",
    text: "A month or a season on a string of HPRC horses under the club’s coaches, for players who want to go up a goal and teams who want a winter base in the sun.",
  },
  {
    title: "Tournament packages",
    text: "Whole clubs mounted from the HPRC string, housed on the grounds and entered in the International Arena Polo Championship or the club’s own cups.",
  },
];

function Fig({ p, h }: { p: Photo; h?: string }) {
  const open = useContext(OpenPhoto);
  return (
    <figure>
      <div
        className={`group relative cursor-pointer overflow-hidden rounded-2xl ${h ?? "h-56 sm:h-72"}`}
        onClick={() => open(p)}
      >
        <Image
          src={`${BASE}/${p.file}`}
          alt={p.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 400px"
        />
      </div>
      <figcaption className="font-body mt-3 text-center text-sm text-gray-500">
        {p.caption}
      </figcaption>
    </figure>
  );
}

function Grid({ photos, h }: { photos: Photo[]; h?: string }) {
  return (
    <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
      {photos.map((p) => (
        <Fig key={p.file} p={p} h={h} />
      ))}
    </div>
  );
}

function Quote({ children, who }: { children: React.ReactNode; who: string }) {
  return (
    <div className="bg-brand-900 shadow-luxury border-brand-800 group relative my-10 overflow-hidden rounded-2xl border p-8 text-white">
      <div className="bg-brand-500/10 group-hover:bg-brand-500/20 absolute -right-8 -bottom-8 h-32 w-32 rounded-full blur-2xl transition-all duration-500" />
      <p className="relative z-10 mb-4 text-xl font-light text-white/90 italic md:text-2xl">
        &ldquo;{children}&rdquo;
      </p>
      <p className="text-brand-400 relative z-10 text-sm font-bold tracking-widest uppercase">
        — {who}
      </p>
    </div>
  );
}

const h2 = "text-2xl font-bold text-brand-900 font-display tracking-tight !mb-3 !mt-10";
const eyebrow = "text-brand-600 font-body !mb-0 !mt-10 text-xs font-bold tracking-widest uppercase";
const prose = "prose prose-lg max-w-none space-y-4 leading-relaxed text-gray-700";

export default function PoloPassportPage() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const all = useMemo(() => [hero, ...madrid, ...kentucky, ...kyMore, ...arena], []);
  const lightboxImages = useMemo(
    () => all.map((p) => ({ src: `${BASE}/${p.file}`, alt: p.alt })),
    [all],
  );
  const openPhoto = (p: Photo) => {
    setIndex(all.indexOf(p));
    setOpen(true);
  };

  return (
    <OpenPhoto.Provider value={openPhoto}>
      <div className="space-y-16 pb-16">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="container pt-12">
            <div className="border-brand-200/50 relative overflow-hidden rounded-[2.5rem] border-2 shadow-[0_40px_80px_-20px_rgba(227,30,36,0.3)]">
              <div className="absolute inset-0">
                <Image
                  src={`${BASE}/${hero.file}`}
                  alt={hero.alt}
                  fill
                  className="object-cover object-center"
                  quality={90}
                  priority
                />
                <div className="from-brand-900/85 via-brand-800/80 to-brand-900/85 absolute inset-0 bg-gradient-to-br" />
              </div>
              <div className="relative z-10 p-8 md:p-16 lg:p-20">
                <div className="space-y-6 text-center">
                  <div className="bg-brand-500/20 mb-4 inline-block rounded-full border border-white/20 px-4 py-2 backdrop-blur-md">
                    <span className="text-xs font-bold tracking-widest text-white uppercase">
                      HPRC International Polo Tour 2026 · Madrid · Lexington
                    </span>
                  </div>
                  <h1 className="font-display text-3xl leading-tight font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                    Polo is the Passport to the World
                  </h1>
                  <p className="mx-auto max-w-3xl text-lg leading-relaxed font-light text-white/90 md:text-xl">
                    Spain on grass, by one goal. The United States under lights, 10–10 after
                    overtime. In twelve days this autumn a team from Hyderabad played two of the
                    world’s most welcoming clubs on their own grounds and horses — and came home
                    with two invitations to return the favour.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixture crests */}
        <section className="container">
          <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
            {[
              { f: "fx_spain.png", a: "HPRC Polo v Madrid Polo Club" },
              { f: "fx_usa.png", a: "HPRC Polo v Commonwealth Polo Club" },
            ].map((c) => (
              <div key={c.f} className="relative h-48 w-64 sm:h-56 sm:w-72">
                <Image
                  src={`${BASE}/${c.f}`}
                  alt={c.a}
                  fill
                  className="object-contain"
                  sizes="300px"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Body */}
        <section className="container">
          <div className="from-brand-50/80 border-brand-100/70 to-brand-50/60 relative overflow-hidden rounded-[2.5rem] border-2 bg-gradient-to-br via-white p-8 shadow-xl md:p-12 lg:p-16">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="October 2026 · HPRC News · 9 minute read"
                title="Polo is the Passport to the World"
                description=""
                align="center"
              />

              <div className={`${prose} mt-8 space-y-6`}>
                <p className="font-display text-brand-900 text-xl leading-relaxed md:text-2xl">
                  Every club that has ever hosted HPRC has become a friend of Hyderabad. That is the
                  whole idea.
                </p>
                <p>
                  On 23 September four HPRC players, their families and a small band of supporters
                  left Hyderabad for Madrid. Over the next twelve days they rode twelve borrowed
                  horses in Spain and three each in Kentucky, played three matches as India against
                  two established clubs, stood in a Grade 1 winner’s circle at Keeneland, and came
                  home with the scores that matter least and the friendships that matter most.
                </p>
                <p>
                  It was the club’s third international tour, after Hawaii and San Diego in 2024. It
                  was also the clearest expression yet of the idea that now shapes everything HPRC
                  does: polo is a passport. A polo ball is the same size in Madrid, Lexington and
                  Aziznagar; the rules are the same; the handshake after the final bell is the same.
                  Play the game abroad and you are not a tourist — you are, for a weekend, a member
                  of someone else’s club. Host the game at home and the world comes to you.
                </p>
              </div>

              {/* Madrid */}
              <div className={prose}>
                <p className={eyebrow}>Madrid · 23–27 September</p>
                <h2 className={`${h2} !mt-2`}>Spain on grass, by one goal</h2>
                <p>
                  Madrid Polo Club, at San Fernando de Henares east of the city, had the horses
                  ready before the team had unpacked — three for every visiting player, tacked and
                  turned out. Saturday was the Friendship Cup, played in mixed teams with two HPRC
                  players and two Madrid members on each side. The White team of MGV, Ivan Davila,
                  Chaitania Kumar and Arsalan Khan took it 4–3, and both clubs sat down together
                  that evening for the Teams Dinner. Another night brought flamenco in the old town,
                  both clubs and their families in the front rows.
                </p>
                <p>
                  Sunday was the Clubs Cup, India against Spain. Chaitania Kumar opened the scoring
                  and Arsalan Khan added two; at 3–3 India defended with discipline until Madrid
                  converted the winner in the last minutes of the final chukker. Spain 4, India 3 —
                  a home side on its own horses taken to the final minutes by four players who had
                  first sat on those horses three days earlier.
                </p>
              </div>

              <Grid photos={madrid} />

              <Quote who="Chaitania R. Kumar, President, HPRC">
                Madrid Polo Club opened their club, their horses and their city to us. We lost the
                Cup by a goal in the last minutes and nobody minded. That is what the tour was for.
              </Quote>

              <div className={prose}>
                <p>
                  The story travelled home within a day — the Clubs Cup was reported in the Indian
                  press the next morning. More importantly, it travelled forward: Madrid Polo Club
                  has been invited to bring a team to Hyderabad, and HPRC expects to welcome them at
                  Aziznagar.
                </p>

                {/* Kentucky */}
                <p className={eyebrow}>Kentucky · 29 September – 4 October</p>
                <h2 className={`${h2} !mt-2`}>The United States under lights, 10–10</h2>
                <p>
                  From Madrid the team flew to Lexington, the horse capital of the world, as guests
                  of Commonwealth Polo Club at Paris, Kentucky. The week began with practice
                  chukkers on Commonwealth’s horses and a morning at Gainesway Farm, where the party
                  met Tapit — the grey who sired a generation of champions — in the stallion barns
                  that architects travel to see. At Darley they met Cody’s Wish and heard the story
                  behind his name. On Friday, opening day of the Keeneland Fall Meet, Gainesway’s
                  own Emphatic won the Grade 1 Darley Alcibiades by a couple of lengths, and the
                  HPRC party was invited into the winner’s circle for the trophy presentation.
                </p>
                <p>
                  Saturday night was the final: Commonwealth Polo Club against HPRC, arena polo,
                  three a side, under lights. It was neck and neck through four chukkers and into
                  overtime. Chaitania Kumar scored four, Arsalan Khan four, Saif Attari two, and
                  when the last bell rang the scoreboard read USA 10, India 10. Nobody deserved to
                  lose it, and nobody did. A barbecue at the club and the exchange of commemorative
                  shirts with Jorge Vasquez and his members closed the week.
                </p>
              </div>

              <div className="mx-auto my-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
                {score.map((s) => (
                  <div
                    key={s.value}
                    className="border-brand-100 rounded-2xl border bg-white p-5 text-center shadow-sm"
                  >
                    <div className="font-display text-brand-700 text-4xl font-extrabold">
                      {s.value}
                    </div>
                    <div className="font-body mt-2 text-xs leading-snug font-semibold text-gray-500">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <Grid photos={kentucky} />
              <Grid photos={kyMore} h="h-56 sm:h-64" />

              <Quote who="Chaitania R. Kumar">
                That was as hard a game of arena polo as any of us have played. Commonwealth gave us
                their horses, their arena and a very good side, and then fed us all at the barbecue.
                That is polo, and that is Kentucky.
              </Quote>

              {/* Why HPRC tours */}
              <div className={prose}>
                <p className={eyebrow}>Why HPRC tours</p>
                <h2 className={`${h2} !mt-2`}>Bridges, built one weekend at a time</h2>
                <p>
                  A tour is not a holiday with horses. Each one is a deliberate piece of
                  club-building, with three purposes.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {purposes.map((c) => (
                  <div
                    key={c.title}
                    className="border-brand-100 rounded-2xl border border-t-4 border-t-brand-600 bg-white p-6 shadow-sm"
                  >
                    <h3 className="font-display text-brand-900 mb-2 text-lg font-bold">
                      {c.title}
                    </h3>
                    <p className="font-body text-[15px] leading-relaxed text-gray-600">{c.text}</p>
                  </div>
                ))}
              </div>
              <div className={prose}>
                <p>
                  Hawaii and San Diego came first. Madrid Polo Club and Commonwealth Polo Club have
                  now both been invited to Hyderabad. Each is a bridge, and HPRC stands at one end
                  of all of them.
                </p>

                {/* Arena polo */}
                <p className={eyebrow}>Arena polo in Hyderabad</p>
                <h2 className={`${h2} !mt-2`}>The game that brings the world to Aziznagar</h2>
                <p>
                  The bridges carry traffic in both directions because of what has been built at
                  home. HPRC is the only polo club in Telangana and the Hyderabad home of the Indian
                  Polo Team’s international fixtures. Its floodlit arena at Aziznagar, twenty
                  minutes from the city, is where India plays visiting nations and where the club’s
                  own cups are decided — the Radha TMT Cup and the Telangana Tourism Cup in 2026, in
                  handicap brackets from 2–4 goals to 6–8.
                </p>
                <p>
                  With more than 140 horses stabled, 95 of them club-owned, HPRC can mount a
                  visiting team the way Madrid and Commonwealth mounted us: three or four horses a
                  player, one for every chukker, tacked and waiting. The Indian Polo Awards have
                  named HPRC Arena Polo Club of the Season in both 2025 and 2026 — the first and
                  only club to win it twice.
                </p>
              </div>

              <Grid photos={arena} h="h-56 sm:h-80" />

              <div className={prose}>
                <p className={eyebrow}>
                  International Arena Polo Championship · 17–24 January 2027
                </p>
                <h2 className={`${h2} !mt-2`}>Six nations, one arena</h2>
                <p>
                  In January the traffic flows the other way. The International Arena Polo
                  Championship 2027 brings six nations to the HPRC Arena for eight days: the United
                  States, Canada, Spain, India, Italy and Germany. A low-goal tournament opens the
                  week; the Best of the Best and a women’s exhibition match follow on the Friday;
                  the high-goal league runs into a Saturday low-goal final and a Sunday high-goal
                  final. Robin Sanchez, international player, leads the technical committee as Chief
                  Umpire, and <em>The Great Indian Chukker</em>, the club’s own magazine, publishes
                  its 2027 edition for the week.
                </p>
                <p>
                  Some of the players HPRC met this autumn in Madrid and Kentucky will be on that
                  list. That is how the passport works.
                </p>
              </div>

              {/* Numbers */}
              <div className="bg-brand-900 rounded-2xl p-8 md:p-10">
                <h3 className="text-brand-300 font-body mb-6 text-xs font-bold tracking-widest uppercase">
                  HPRC in numbers
                </h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
                  {numbers.map((n) => (
                    <div key={n.value + n.label}>
                      <div className="font-display text-3xl font-extrabold text-white md:text-4xl">
                        {n.value}
                      </div>
                      <div className="font-body mt-2 text-sm leading-snug text-white/70">
                        {n.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Polo tourism */}
              <div className={prose}>
                <p className={eyebrow}>Polo tourism</p>
                <h2 className={`${h2} !mt-2`}>Come and play. Stay a week, or a season.</h2>
                <p>
                  The next stage turns visiting teams into visiting guests. HPRC is building a
                  50-room hotel on the club grounds at Aziznagar. When it opens, a player from
                  Madrid, Lexington, Munich or Toronto will be able to do at Hyderabad exactly what
                  HPRC did this autumn in Spain and Kentucky — arrive, find the horses ready, and
                  play — and then walk back to a room on the club, with the stables, the arena and
                  the grass field outside the door.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {tourism.map((c) => (
                  <div
                    key={c.title}
                    className="border-brand-100 rounded-2xl border border-t-4 border-t-brand-600 bg-white p-6 shadow-sm"
                  >
                    <h3 className="font-display text-brand-900 mb-2 text-lg font-bold">
                      {c.title}
                    </h3>
                    <p className="font-body text-[15px] leading-relaxed text-gray-600">{c.text}</p>
                  </div>
                ))}
              </div>
              <div className={prose}>
                <p>
                  Madrid lent HPRC twelve horses and a city. Kentucky gave it an arena, a winner’s
                  circle and a barbecue. Hyderabad will give the world a club to stay in. Polo is
                  the passport; HPRC intends to be one of the places it is stamped most often.
                </p>
              </div>

              {/* CTA */}
              <div className="border-brand-100 rounded-2xl border bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-brand-900 font-display mb-3 text-xl font-bold tracking-tight">
                  Play at HPRC
                </h2>
                <p className="font-body leading-relaxed text-gray-600">
                  Teams and players interested in the International Arena Polo Championship 2027, a
                  polo weekend or a training residency can write to{" "}
                  <a href="mailto:polo@hprc.co.in" className="text-brand-700 font-semibold">
                    polo@hprc.co.in
                  </a>
                  , or to the President at{" "}
                  <a href="mailto:chaitania@hprc.in" className="text-brand-700 font-semibold">
                    chaitania@hprc.in
                  </a>
                  . Follow the club on Instagram at{" "}
                  <a
                    href="https://instagram.com/hydprc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 font-semibold"
                  >
                    @hydprc
                  </a>
                  .
                </p>
              </div>

              <p className="font-body border-t border-gray-100 pt-5 text-[15px] text-gray-500">
                With thanks to Madrid Polo Club — Ivan, Mario and Lorenzo — and to Commonwealth Polo
                Club — Jorge Vasquez and his members — for the horses, the grounds, the welcome and
                the memories. Photographs: HPRC, Madrid Polo Club and Commonwealth Polo Club.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="container">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/events/news"
              className="bg-brand-600 hover:bg-brand-700 shadow-brand-200 inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-1"
            >
              Explore More News
            </Link>
            <Link
              href="/events/news/hprc-tour-2026-highlights-madrid-kentucky"
              className="border-brand-900 text-brand-900 hover:bg-brand-900 inline-flex items-center gap-2 rounded-full border-2 px-8 py-4 font-bold transition-all hover:text-white"
            >
              Tour in Pictures
            </Link>
          </div>
        </section>
      </div>

      <ImageLightbox
        images={lightboxImages}
        initialIndex={index}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </OpenPhoto.Provider>
  );
}

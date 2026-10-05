"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useMemo, useState } from "react";

import { ImageLightbox } from "@/components/ui/image-lightbox";
import { SectionHeading } from "@/components/ui/section-heading";

const BASE = "/events/tour2026-highlights";

const OpenPhoto = createContext<(p: Photo) => void>(() => {});

type Photo = { file: string; alt: string; caption: string };

const hero: Photo = {
  file: "hero-clubs-cup-lineup",
  alt: "India in blue and Spain in red line up before the Clubs Cup at Madrid Polo Club",
  caption:
    "India (blue) and Spain (red) line up before the Clubs Cup at San Fernando de Henares, Sunday 27 September.",
};

const friendship: Photo[] = [
  {
    file: "friendship-white-team",
    alt: "The winning White team of the Friendship Cup on Madrid Polo Club horses",
    caption:
      "The winning White side of the Friendship Cup: MGV, Ivan Davila, Chaitania Kumar and Arsalan Khan, mounted on Madrid Polo Club horses.",
  },
  {
    file: "friendship-blue-team",
    alt: "The Blue team of the Friendship Cup mounted on the grass field",
    caption:
      "The Blue side: Akash Reddy, Saif Attari, Mateo and Nacho. Two clubs, one team on each side.",
  },
];

const clubsCup: Photo[] = [
  {
    file: "clubs-cup-madrid-trophy",
    alt: "Madrid Polo Club players lift the Clubs Cup",
    caption: "Madrid Polo Club lift the Clubs Cup after a 4–3 win decided in the closing minutes.",
  },
  {
    file: "team-india-prizegiving",
    alt: "Team India at the prize giving with the HPRC pennant and commemorative shirts",
    caption:
      "Team India at the prize giving: Akash Reddy, Arsalan Khan, Saif Attari and Chaitania Kumar with the HPRC pennant and commemorative shirts.",
  },
];

const madridOff: Photo[] = [
  {
    file: "arsalan-khan-clubs-cup",
    alt: "Arsalan Khan chasing the ball in the Clubs Cup",
    caption: "Arsalan Khan, who scored two of India's three goals, leads the chase.",
  },
  {
    file: "chaitania-kumar-horse",
    alt: "Chaitania Kumar on a Madrid Polo Club horse",
    caption:
      "Chaitania Kumar, who opened the scoring, on one of three horses Madrid put under each visitor.",
  },
  {
    file: "indian-press-coverage",
    alt: "Indian newspaper coverage of the Clubs Cup in Madrid",
    caption: "The story goes home: the Clubs Cup reported in the Indian press the next day.",
  },
  {
    file: "flamenco-group",
    alt: "Both clubs and their families with the performers after the flamenco show",
    caption: "Both clubs and their families with the performers at the Teatro on Calle del Pez.",
  },
  {
    file: "flamenco-stage",
    alt: "Flamenco performance at the Teatro Flamenco in Madrid",
    caption: "On stage at the Teatro Flamenco, the night out arranged by Madrid Polo Club.",
  },
  {
    file: "teams-dinner",
    alt: "Chaitania Kumar with Madrid Polo Club members at the teams dinner",
    caption: "Chaitania Kumar with Madrid Polo Club members at the teams dinner.",
  },
];

const madridCulture: Photo[] = [
  {
    file: "royal-carriages",
    alt: "Neeta Kumar with gilded royal carriages in the Galería de las Colecciones Reales",
    caption:
      "Neeta Kumar among the gilded carriages at the Galería de las Colecciones Reales, beside the Royal Palace.",
  },
  {
    file: "knight-armour",
    alt: "A knight and horse in full tilting armour before Spanish court tapestries",
    caption:
      "A knight and horse in full tilting armour, lance in hand, before the tapestries of the Spanish court.",
  },
  {
    file: "restoration-gallery",
    alt: "Neeta Kumar in the Patrimonio Nacional restoration gallery",
    caption:
      "In the Patrimonio Nacional restoration gallery, where the royal collections are conserved.",
  },
  {
    file: "jousting-saddles",
    alt: "Armoured and embroidered jousting saddles of the Spanish court",
    caption: "The jousting saddles of the Spanish court: armoured, padded and embroidered.",
  },
  {
    file: "las-ventas",
    alt: "Las Ventas bullring in Madrid",
    caption: "An afternoon at Las Ventas, Madrid's great bullring.",
  },
];

const finalHero: Photo = {
  file: "final-flags",
  alt: "India and the USA with their flags before the final at Commonwealth Polo Club",
  caption:
    "India and the USA with their flags before the final at Commonwealth Polo Club, Paris, Kentucky, Saturday 3 October.",
};

const finalPhotos: Photo[] = [
  {
    file: "final-kumar-rides-off",
    alt: "Chaitania Kumar rides off a Commonwealth player under arena lights",
    caption:
      "Chaitania Kumar, four goals on the night, rides off a Commonwealth player under the lights.",
  },
  {
    file: "final-contest",
    alt: "India in blue and the USA in white contest the line of the ball",
    caption: "Shoulder to shoulder: the match was never more than a goal apart.",
  },
  {
    file: "final-anthems",
    alt: "Team India before the anthems at Commonwealth Polo Club",
    caption: "Team India before the anthems, on horses provided by Commonwealth Polo Club.",
  },
  {
    file: "final-tricolour",
    alt: "The Indian tricolour carried into the arena",
    caption: "The tricolour carried into the arena.",
  },
];

const horseCountry: Photo[] = [
  {
    file: "tapit",
    alt: "The HPRC party with the stallion Tapit at Gainesway Farm",
    caption: "With Tapit at Gainesway Farm, the grey who sired a generation of champions.",
  },
  {
    file: "gainesway-barns",
    alt: "Gainesway Farm stallion barn exterior",
    caption: "Gainesway's stallion barns, designed by Theodore Ceraldi in the 1980s.",
  },
  {
    file: "gainesway-barn-interior",
    alt: "Inside a Gainesway stallion barn",
    caption:
      "Inside a stallion barn: brick, timber and iron, with light, air and a door to the paddock for every horse.",
  },
  {
    file: "codys-wish",
    alt: "Cody's Wish at Darley's Jonabell Farm",
    caption: "Cody's Wish at Darley's Jonabell Farm, named for the young fan Cody Dorman.",
  },
  {
    file: "darley-trophy-room",
    alt: "Chaitania and Neeta Kumar in Darley's trophy room",
    caption:
      "Chaitania and Neeta Kumar in Darley's trophy room, among the silver of Godolphin's American classics.",
  },
  {
    file: "kentucky-derby-trophy",
    alt: "The Kentucky Derby trophy in Darley's trophy room",
    caption: "The Kentucky Derby trophy, the gold cup with its horseshoe and jockey.",
  },
  {
    file: "equipoise-grave",
    alt: "The grave of Equipoise in the stallion cemetery",
    caption: "The grave of Equipoise, the great chestnut of 1928, in the stallion cemetery.",
  },
  {
    file: "winning-garlands",
    alt: "Preserved winning garlands under glass at Darley",
    caption:
      "Winning garlands preserved under glass: the Belmont Stakes, the Travers and the Breeders' Cup Dirt Mile.",
  },
  {
    file: "darley-stallion-gallery",
    alt: "The stallion gallery on the stair at Darley",
    caption:
      "The stallion gallery: every horse that has stood at the farm, on the stair to the offices.",
  },
];

const keeneland: Photo[] = [
  {
    file: "keeneland-party",
    alt: "The HPRC party with Jorge Vasquez at Keeneland",
    caption:
      "The HPRC party with Jorge Vasquez on opening day: Arsalan Khan, Mrs Khan, Neeta Kumar, Chaitania Kumar, Priyanka, Prem and Jorge.",
  },
  {
    file: "winners-circle",
    alt: "The HPRC party in the winner's circle with the Gainesway team after the Alcibiades",
    caption:
      "The highlight of the tour: in the winner's circle with the Gainesway team after Emphatic's win.",
  },
  {
    file: "emphatic-paddock",
    alt: "Emphatic in the Keeneland paddock before the Alcibiades",
    caption:
      "Emphatic in the paddock before the Alcibiades, a Gainesway horse and the day after our farm visit.",
  },
  {
    file: "alcibiades-field",
    alt: "The field turns for home in the Darley Alcibiades at Keeneland",
    caption: "The field turns for home in the Grade 1 Alcibiades, the main race of opening day.",
  },
  {
    file: "keeneland-trackside",
    alt: "Chaitania Kumar and Arsalan Khan trackside at Keeneland",
    caption:
      "Chaitania Kumar and Arsalan Khan trackside, in suits and hats for a day at the races.",
  },
];

const friends: Photo[] = [
  {
    file: "horse-park",
    alt: "Chaitania and Neeta Kumar at the Kentucky Horse Park",
    caption: "Chaitania and Neeta Kumar at the Kentucky Horse Park on the morning of the final.",
  },
  {
    file: "museum-of-the-horse",
    alt: "The ladies of the party with a carriage at the International Museum of the Horse",
    caption: "The ladies of the party with a carriage at the International Museum of the Horse.",
  },
  {
    file: "friends-horse-country",
    alt: "Imran Hakeem and Veerendra with the party at the Kentucky Horse Park",
    caption:
      "Friends in horse country: Imran Hakeem from Florida and Veerendra, who drove down from Columbus, Ohio.",
  },
  {
    file: "griffin-gate",
    alt: "Chaitania Kumar, Arsalan Khan and Prem dressed for the races in the Griffin Gate lobby",
    caption:
      "Dressed for the races in the Griffin Gate lobby, with Prem, who celebrated his birthday on 4 October.",
  },
  {
    file: "keeneland-hats",
    alt: "Priyanka and Neeta Kumar in hats at Keeneland",
    caption: "Priyanka and Neeta Kumar in hats for Keeneland, as the tradition demands.",
  },
  {
    file: "shirts-exchanged",
    alt: "Commemorative shirts exchanged with Jorge Vasquez and Commonwealth Polo Club",
    caption:
      "Commemorative shirts exchanged with Jorge Vasquez and Commonwealth Polo Club after the final.",
  },
];

const shirts: Photo[] = [
  {
    file: "shirt-madrid",
    alt: "The HPRC v Madrid Polo Club commemorative shirt",
    caption:
      "The HPRC v Madrid Polo Club shirt, presented to the Madrid players after the Clubs Cup.",
  },
  {
    file: "shirt-commonwealth",
    alt: "The HPRC v Commonwealth Polo Club commemorative shirt",
    caption:
      "The HPRC v Commonwealth Polo Club shirt, presented after the final at Paris, Kentucky.",
  },
];

const stats = [
  { value: "2", label: "Countries" },
  { value: "2", label: "Host clubs" },
  { value: "3", label: "Matches" },
  { value: "12", label: "Days" },
];

function Fig({ p, wide, h }: { p: Photo; wide?: boolean; h?: string }) {
  const open = useContext(OpenPhoto);
  return (
    <figure>
      <div
        className={`group relative cursor-pointer overflow-hidden rounded-2xl ${
          h ?? (wide ? "h-64 sm:h-80 lg:h-[450px]" : "h-56 sm:h-72")
        }`}
        onClick={() => open(p)}
      >
        <Image
          src={`${BASE}/${p.file}.jpg`}
          alt={p.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={wide ? "(max-width: 768px) 100vw, 800px" : "(max-width: 640px) 100vw, 400px"}
        />
      </div>
      <figcaption className="font-body mt-3 text-center text-sm text-gray-500">
        {p.caption}
      </figcaption>
    </figure>
  );
}

function Grid({ photos, cols = 2, h }: { photos: Photo[]; cols?: 2 | 3; h?: string }) {
  return (
    <div
      className={`my-8 grid grid-cols-1 gap-4 sm:gap-6 ${cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
    >
      {photos.map((p) => (
        <Fig key={p.file} p={p} h={h} />
      ))}
    </div>
  );
}

const h2 = "text-2xl font-bold text-brand-900 font-display tracking-tight !mb-3 !mt-10";

export default function TourHighlightsPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const all = useMemo(
    () => [
      hero,
      ...friendship,
      ...clubsCup,
      ...madridOff,
      ...madridCulture,
      finalHero,
      ...finalPhotos,
      ...horseCountry,
      ...keeneland,
      ...friends,
      ...shirts,
    ],
    [],
  );
  const lightboxImages = useMemo(
    () => all.map((p) => ({ src: `${BASE}/${p.file}.jpg`, alt: p.alt })),
    [all],
  );

  const open = (p: Photo) => {
    setLightboxIndex(all.indexOf(p));
    setLightboxOpen(true);
  };

  return (
    <OpenPhoto.Provider value={open}>
      <div className="space-y-16 pb-16">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="container pt-12">
            <div className="border-brand-200/50 relative overflow-hidden rounded-[2.5rem] border-2 shadow-[0_40px_80px_-20px_rgba(227,30,36,0.3)]">
              <div className="absolute inset-0">
                <Image
                  src={`${BASE}/${hero.file}.jpg`}
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
                      International · Tour Highlights
                    </span>
                  </div>
                  <h1 className="font-display text-3xl leading-tight font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                    Madrid and Kentucky: HPRC&apos;s 2026 tour in pictures
                  </h1>
                  <p className="mx-auto max-w-3xl text-lg leading-relaxed font-light text-white/90 md:text-xl">
                    A mixed-teams win in Spain, a one-goal defeat in the Clubs Cup, a 10–10 draw
                    under lights in Kentucky, and a Grade 1 trophy presentation at Keeneland. Twelve
                    days, two continents, three matches played as India.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <section className="container">
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="border-brand-100 rounded-2xl border bg-white p-5 text-center shadow-sm"
              >
                <div className="font-display text-brand-700 text-4xl font-extrabold">{s.value}</div>
                <div className="font-body mt-1 text-xs font-semibold tracking-widest text-gray-500 uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Body */}
        <section className="container">
          <div className="from-brand-50/80 border-brand-100/70 relative overflow-hidden rounded-[2.5rem] border-2 bg-gradient-to-br via-white to-brand-50/60 p-8 shadow-xl md:p-12 lg:p-16">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="5 October 2026 · HPRC News"
                title="Tour Highlights: Madrid and Kentucky"
                description=""
                align="center"
              />

              <div className="prose prose-lg mt-8 max-w-none space-y-6 leading-relaxed text-gray-700">
                <p>
                  <strong className="font-display">Hyderabad, 5 October 2026 —</strong> The Madrid
                  and Kentucky legs of the HPRC International Polo Tour 2026 are done. Between 23
                  September and 4 October the club&apos;s side played three matches as India, two on
                  the grass at Madrid Polo Club and one in the arena at Commonwealth Polo Club, and
                  was hosted at every turn: horses, grounds, dinners, flamenco, a trophy
                  presentation in the Keeneland winner&apos;s circle and a Kentucky barbecue.
                  Friends flew and drove in to join the party along the way. Here is the tour so
                  far.
                </p>
              </div>

              {/* Results table */}
              <div className="my-10">
                <h2 className="text-brand-900 font-display mb-6 text-2xl font-bold tracking-tight">
                  The results
                </h2>
                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                  <table className="font-body w-full text-sm">
                    <thead className="bg-gray-50 text-left">
                      <tr className="text-brand-900 font-display">
                        <th className="px-5 py-3">Date</th>
                        <th className="px-5 py-3">Fixture</th>
                        <th className="px-5 py-3">Result</th>
                        <th className="px-5 py-3">India scorers</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-t border-gray-100">
                        <td className="px-5 py-4 whitespace-nowrap">Sat 26 Sep</td>
                        <td className="px-5 py-4">
                          Friendship Cup, Madrid Polo Club (grass, mixed teams)
                        </td>
                        <td className="px-5 py-4 font-semibold">White 4 – 3 Blue</td>
                        <td className="px-5 py-4">HPRC players in both teams</td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="px-5 py-4 whitespace-nowrap">Sun 27 Sep</td>
                        <td className="px-5 py-4">
                          Clubs Cup, Madrid Polo Club (grass): Spain v India
                        </td>
                        <td className="px-5 py-4 font-semibold">Spain 4 – 3 India</td>
                        <td className="px-5 py-4">Kumar 1, Khan 2</td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="px-5 py-4 whitespace-nowrap">Sat 3 Oct</td>
                        <td className="px-5 py-4">
                          The Final, Commonwealth Polo Club (arena, under lights): USA v India
                        </td>
                        <td className="px-5 py-4 font-semibold">
                          USA 10 – 10 India, after overtime
                        </td>
                        <td className="px-5 py-4">Kumar 4, Khan 4, Attari 2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="font-body mt-3 text-sm text-gray-500">
                  Played 3, won 1, drawn 1, lost 1. Every match was played on the host club&apos;s
                  horses and ground.
                </p>
              </div>

              {/* Madrid */}
              <div className="prose prose-lg max-w-none space-y-4 leading-relaxed text-gray-700">
                <h2 className={h2}>Madrid: the Friendship Cup and the Clubs Cup</h2>
                <p>
                  The Friendship Cup on Saturday 26 September was played in mixed teams, with two
                  HPRC players and two Madrid members on each side. White (MGV, Ivan Davila,
                  Chaitania Kumar and Arsalan Khan) beat Blue (Akash Reddy, Saif Attari, Mateo and
                  Nacho) 4–3.
                </p>
              </div>
              <Grid photos={friendship} />

              <div className="prose prose-lg max-w-none space-y-4 leading-relaxed text-gray-700">
                <p>
                  Sunday&apos;s Clubs Cup pitted Spain against India: Akash Reddy, Arsalan Khan,
                  Saif Attari and Chaitania Kumar. Kumar opened the scoring and Khan added two. At
                  3–3 India held the home side until Madrid converted the winner in the closing
                  minutes of the final chukker, and took the Cup 4–3.
                </p>
              </div>
              <Grid photos={clubsCup} h="h-64 sm:h-80" />

              <div className="prose prose-lg max-w-none space-y-4 leading-relaxed text-gray-700">
                <h2 className={h2}>Madrid, on and off the field</h2>
                <p>
                  Madrid Polo Club lent twelve horses, three to each visiting player. There was a
                  teams dinner, an evening of flamenco at the Teatro on Calle del Pez with both
                  clubs and their families, and a party after the Cup. Our thanks to Ivan, Mario and
                  Lorenzo, and an invitation to Madrid Polo Club to come and play in Hyderabad. The
                  Clubs Cup was in the Indian press within a day.
                </p>
              </div>
              <Grid photos={madridOff} cols={3} h="h-56 sm:h-64" />

              <div className="prose prose-lg max-w-none space-y-4 leading-relaxed text-gray-700">
                <h2 className={h2}>The Royal Collections and Las Ventas</h2>
                <p>
                  Between matches, Madrid itself. The Galería de las Colecciones Reales beside the
                  Royal Palace holds royal carriages, armour, tapestries and, for an equestrian
                  club, the horse armour and jousting saddles of the Spanish court. An afternoon at
                  Las Ventas, the great bullring, showed the other side of Spain&apos;s long
                  relationship with the horse and the bull.
                </p>
              </div>
              <Grid photos={madridCulture.slice(0, 3)} cols={3} h="h-56 sm:h-64" />
              <Grid photos={madridCulture.slice(3)} />

              {/* Kentucky */}
              <div className="prose prose-lg max-w-none space-y-4 leading-relaxed text-gray-700">
                <h2 className={h2}>Kentucky: the final, USA v India</h2>
                <p>
                  The final at Commonwealth Polo Club in Paris, Kentucky, on Saturday 3 October was
                  arena polo under lights: three a side, four chukkers and overtime, and neck and
                  neck to the last bell. USA 10, India 10. Chaitania Kumar scored four, Arsalan Khan
                  four and Saif Attari two, and the match was never more than a goal apart. It was
                  India&apos;s first polo match in the United States since the club&apos;s San Diego
                  tour.
                </p>
              </div>
              <Fig p={finalHero} wide />
              <Grid photos={finalPhotos} />

              <div className="prose prose-lg max-w-none space-y-4 leading-relaxed text-gray-700">
                <p>
                  The week also took in practice chukkers on Commonwealth&apos;s horses, the
                  Kentucky Horse Park, and a barbecue at the club after the final, where
                  commemorative shirts were exchanged with Jorge Vasquez and his members.
                </p>
                <h2 className={h2}>Horse country: Gainesway and Darley</h2>
                <p>
                  Two mornings among the stallions. At Gainesway Farm on the Paris Pike we met
                  Tapit, the grey who sired a generation, and toured the farm&apos;s renowned
                  stallion barns. At Darley&apos;s Jonabell Farm we met Cody&apos;s Wish and heard
                  how he got his name: Cody Dorman, a young fan, met him as a foal and followed him
                  to two Breeders&apos; Cup wins. In Darley&apos;s trophy room we saw the Kentucky
                  Derby trophy, and in the stallion cemetery the grave of Equipoise, the great
                  chestnut of 1928.
                </p>
              </div>
              <Grid photos={horseCountry.slice(0, 3)} cols={3} h="h-56 sm:h-64" />
              <Grid photos={horseCountry.slice(3, 6)} cols={3} h="h-56 sm:h-64" />
              <Grid photos={horseCountry.slice(6)} cols={3} h="h-56 sm:h-64" />

              <div className="prose prose-lg max-w-none space-y-4 leading-relaxed text-gray-700">
                <h2 className={h2}>Keeneland: the winner&apos;s circle</h2>
                <p>
                  The highlight of the tour. On Friday 2 October, opening day of the Fall Meet, the
                  party dressed up for the races with Jorge Vasquez. The day after our tour of
                  Gainesway Farm, Gainesway&apos;s own Emphatic won the main race of the day, the
                  Grade 1 Darley Alcibiades, by a couple of lengths, and the HPRC party was invited
                  into the winner&apos;s circle for the trophy presentation.
                </p>
              </div>
              <Fig p={keeneland[0]} wide />
              <Fig p={keeneland[1]} wide />
              <Grid photos={keeneland.slice(2)} cols={3} h="h-56 sm:h-64" />

              <div className="prose prose-lg max-w-none space-y-4 leading-relaxed text-gray-700">
                <h2 className={h2}>Friends, the Horse Park and a birthday</h2>
                <p>
                  Imran Hakeem flew in from Florida, Prem and Priyanka came from New Jersey (Prem
                  celebrated his birthday with us on 4 October) and Veerendra drove down from
                  Columbus, Ohio, to spend a day at the Kentucky Horse Park.
                </p>
              </div>
              <Grid photos={friends.slice(0, 3)} cols={3} h="h-56 sm:h-64" />
              <Grid photos={friends.slice(3)} cols={3} h="h-56 sm:h-64" />

              <div className="prose prose-lg max-w-none space-y-4 leading-relaxed text-gray-700">
                <h2 className={h2}>The commemorative shirts</h2>
                <p>
                  Each match came with its own shirt: one for the Madrid players after the Clubs
                  Cup, one for Commonwealth after the final.
                </p>
              </div>
              <Grid photos={shirts} h="h-64 sm:h-80" />

              {/* Thanks */}
              <div className="bg-brand-900 shadow-luxury border-brand-800 group relative my-10 overflow-hidden rounded-2xl border p-8 text-white">
                <div className="bg-brand-500/10 group-hover:bg-brand-500/20 absolute -right-8 -bottom-8 h-32 w-32 rounded-full blur-2xl transition-all duration-500" />
                <p className="relative z-10 mb-4 text-xl leading-relaxed font-light text-white/90 md:text-2xl">
                  Our thanks to Madrid Polo Club (Ivan, Mario and Lorenzo) and to Commonwealth Polo
                  Club (Jorge Vasquez and his members) for the horses, the grounds, the welcome and
                  the memories. Both clubs have been invited to bring teams to Hyderabad for return
                  fixtures at HPRC.
                </p>
                <p className="text-brand-400 relative z-10 text-sm font-bold tracking-widest uppercase">
                  Chaitania R. Kumar, President, Hyderabad Polo and Riding Club
                </p>
              </div>

              <div className="prose prose-lg max-w-none leading-relaxed text-gray-700">
                <p>
                  <strong>Still to come:</strong> Atlanta, then London, and home to Hyderabad on 11
                  October. A full tour report and the complete photo album will follow.
                </p>
                <p>
                  <Link
                    href="/events/news/hprc-international-tour-2026-spain-usa"
                    className="text-brand-700 font-semibold"
                  >
                    Read the original tour announcement →
                  </Link>
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8">
                <h2 className="text-brand-900 font-display mb-4 text-xl font-bold tracking-tight">
                  About HPRC
                </h2>
                <p className="font-body text-[15px] leading-relaxed text-gray-600">
                  Established in 2005 at Aziznagar, Gandipet, on the western edge of Hyderabad, HPRC
                  is a multi-discipline equestrian club running polo, show jumping, dressage and
                  riding instruction, with a floodlit arena polo field and stabling for over a
                  hundred horses. The club hosts national qualifiers and the annual International
                  Arena Polo Championship.
                </p>
                <p className="font-body mt-3 text-sm text-gray-400">
                  Media: info@hprc.co.in · +91 9177 00 00 56 · www.hprc.in
                </p>
              </div>
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
              href="/about"
              className="border-brand-900 text-brand-900 hover:bg-brand-900 inline-flex items-center gap-2 rounded-full border-2 px-8 py-4 font-bold transition-all hover:text-white"
            >
              Learn About HPRC
            </Link>
          </div>
        </section>
      </div>

      <ImageLightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </OpenPhoto.Provider>
  );
}

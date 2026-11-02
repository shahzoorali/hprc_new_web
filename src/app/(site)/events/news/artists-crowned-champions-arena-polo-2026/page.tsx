import Image from "next/image";

import { SectionHeading } from "@/components/ui/section-heading";

const BASE = "/events/arena-polo-2026";

export const metadata = {
  title: "Artists crowned champions as arena polo comes of age at HPRC | Hyderabad Polo & Riding Club",
  description:
    "HPRC Arena Polo Tournament 2026: how it unfolded, the Final, the awards, and the way forward for arena polo at the Hyderabad Polo & Riding Club.",
};

const stats = [
  { value: "6", label: "Teams" },
  { value: "7", label: "Matches" },
  { value: "92", label: "Goals" },
  { value: "4", label: "Evenings" },
  { value: "6", label: "First-timers" },
  { value: "20", label: "Goals · top scorer" },
];

const poolCards = [
  {
    title: "Pool A",
    results: "Tigers 10–7 Warriors · Warriors 3–1 Chargers · Tigers 4–2 Chargers",
    table: "Tigers 4 pts · Warriors 2 · Chargers 0",
  },
  {
    title: "Pool B",
    results: "Artists 11–5 Devils · Devils 5–5 Titans · Artists 9–6 Titans",
    table: "Artists 4 pts · Devils 1 · Titans 1",
  },
  {
    title: "Officials",
    results: "Umpire Surya Bahadur · Scorer Asu Singh",
    table: "Commentary and MC Saif ur Rehman",
  },
];

const finalScorers: { who: string; q: number[]; total: number; hl?: boolean }[] = [
  { who: "Artists · Arsalan Khan", q: [4, 1, 3, 3], total: 11, hl: true },
  { who: "Artists · Shehzad Khan", q: [0, 2, 0, 0], total: 2 },
  { who: "Artists · Vedanth Lohia", q: [0, 1, 0, 0], total: 1 },
  { who: "Tigers · Chaitania Kumar", q: [3, 1, 0, 2], total: 6 },
  { who: "Tigers · Vishal Singh", q: [0, 2, 1, 0], total: 3 },
  { who: "Tigers · Sri", q: [0, 0, 1, 0], total: 1 },
];

const awards = [
  {
    file: "vedanth",
    alt: "Vedanth Lohia",
    title: "Most Valuable Player",
    name: "Vedanth Lohia · HPRC Artists",
    body: "Not the top scorer, but the man who made the top scorer possible. Exemplary, consistent marking, tireless work at the back and unselfish backing of his captain gave Arsalan Khan the platform for twenty goals. Five goals of his own across three matches.",
  },
  {
    file: "shehzad",
    alt: "Shehzad Alam Khan",
    title: "Most Promising Young Player",
    name: "Shehzad Alam Khan · HPRC Artists",
    body: "Eight goals in his first tournament: two on opening night, four in the pool decider against Titans, and two in the Final when Artists needed an answer. A product of the HPRC training programme.",
  },
  {
    file: "salar",
    alt: "Salar with his grooms",
    title: "Best Polo Pony of the Club",
    name: "Salar · Dark bay · Owned by HPRC",
    body: "Four evenings, several riders, not a step out of place. The award was received by his groom, and stands for every groom and stable hand who had the ponies ready night after night.",
  },
];

const scorers = [
  ["Arsalan Khan · Artists", "3", "20", "Top scorer · 11 in the Final", true],
  ["Chaitania Kumar · Tigers", "3", "13", "6 in the Final"],
  ["Saif Attari · Warriors", "2", "10", "Every Warriors goal"],
  ["Arun Jupally · Titans", "2", "10", "10 in one evening"],
  ["Vishal Singh · Tigers", "3", "9", "6 on opening night"],
  ["Shahbaz · Devils", "2", "8", "4 in each match"],
  ["Shehzad Khan · Artists", "3", "8", "First tournament"],
  ["Vedanth Lohia · Artists", "3", "5", "MVP"],
] as const;

const newPlayers = [
  { file: "sri", name: "Sri", team: "Devils · Tigers", note: "Scored in his 2nd match and the Final" },
  { file: "amogh", name: "Amogh", team: "Devils", note: "First season of polo" },
  { file: "vamsi", name: "Vamsi", team: "Chargers", note: "Both Chargers matches" },
];

const teamLogos = ["tigers", "warriors", "chargers", "artists", "devils", "titans"];

const h2 = "text-brand-900 font-display mt-10 mb-4 text-2xl font-bold tracking-tight";
const h3 = "text-brand-900 font-display mb-3 text-lg font-bold tracking-wide uppercase";
const th = "px-4 py-3";
const td = "px-4 py-3";

function Photo({ file, alt, caption }: { file: string; alt: string; caption: string }) {
  return (
    <figure>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <Image
          src={`${BASE}/${file}.jpg`}
          alt={alt}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-2 text-sm text-gray-500">{caption}</figcaption>
    </figure>
  );
}

export default function ArtistsCrownedChampionsPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <div className="container pt-12">
        <div className="border-brand-200/50 relative overflow-hidden rounded-[2.5rem] border-2 shadow-[0_40px_80px_-20px_rgba(227,30,36,0.3)]">
          <div className="absolute inset-0">
            <Image
              src={`${BASE}/hero.jpg`}
              alt="The finalists line up under the arena lights"
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
                  HPRC Arena Polo Tournament 2026 · Tournament Report
                </span>
              </div>
              <h1 className="font-display text-3xl leading-tight font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                Artists crowned champions as arena polo comes of age at HPRC
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed font-light text-white/90 md:text-xl">
                HPRC Artists 14 – 10 HPRC Tigers in the Final · Sunday 1 November 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <section className="container">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="border-brand-100 rounded-2xl border bg-white p-4 text-center shadow-sm"
            >
              <div className="font-display text-brand-700 text-4xl font-extrabold">{s.value}</div>
              <div className="font-body mt-1 text-[10px] font-semibold tracking-widest text-gray-500 uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Body */}
      <section className="container">
        <div className="from-brand-50/80 border-brand-100/70 to-brand-50/60 relative overflow-hidden rounded-[2.5rem] border-2 bg-gradient-to-br via-white p-8 shadow-xl md:p-12 lg:p-16">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="2 November 2026 · Presented by Inhabit – The Inside Story"
              title="HPRC Arena Polo Tournament 2026"
              description=""
              align="center"
            />

            <div className="prose prose-lg max-w-none leading-relaxed text-gray-700">
              <p className="text-xl font-medium">
                Six teams of club members, four evenings under lights, ninety-two goals, a
                washed-out Friday, a four-chukker Final and a prize night graced by the Commissioner
                of Police, Cyberabad. The HPRC Arena Polo Tournament 2026, presented by Inhabit –
                The Inside Story, ended on Sunday with HPRC Artists lifting the trophy unbeaten, and
                with the clearest sign yet that arena polo belongs at the Hyderabad Polo &amp;
                Riding Club every season.
              </p>

              <h2 className={h2}>How it unfolded</h2>
              <div className="grid gap-8 md:grid-cols-[1.1fr_.9fr]">
                <div className="space-y-4">
                  <p>
                    Six teams (Tigers, Warriors, Chargers, Artists, Devils and Titans) were drawn
                    by the Committee into two pools of three, each side made up entirely of HPRC
                    members, with the pool winners to meet in the Final.
                  </p>
                  <p>
                    <strong>Thursday 29 October</strong> opened with thirty-three goals in two
                    matches. Tigers and Warriors were level at 2–2 before Tigers struck six times in
                    the second chukker, three from Vishal Singh, on the way to a 10–7 win, Saif
                    Attari scoring every one of Warriors&apos; seven. Artists then beat Devils 11–5,
                    Arsalan Khan scoring six, four of them in a single chukker.
                  </p>
                  <p>
                    <strong>Friday</strong> was lost to an evening downpour. Rather than drop two
                    matches, the Committee moved all four remaining pool games to Saturday, cut to
                    two chukkers of five minutes each, from 6 PM.
                  </p>
                  <p>
                    <strong>Saturday 31 October</strong> delivered four matches and thirty-five
                    goals in one evening: Warriors 3–1 Chargers, a 5–5 draw between Devils and
                    Titans that was the match of the pools, Tigers 4–2 Chargers, and Artists 9–6
                    Titans, in which Arun Jupally scored six, taking his evening&apos;s tally to
                    ten. Tigers took Pool A and Artists Pool B, both unbeaten.
                  </p>
                </div>
                <div className="space-y-4">
                  <Photo
                    file="action1"
                    alt="Tigers and Chargers riding off along the boards"
                    caption="Tigers and Chargers on the boards. Opening night set the tone: 33 goals in two matches."
                  />
                  <Photo
                    file="action2"
                    alt="Devils and Titans contest the ball"
                    caption="Devils and Titans fought out the pools' only draw, 5–5, on Saturday."
                  />
                </div>
              </div>

              <div className="my-6 grid gap-4 md:grid-cols-3">
                {poolCards.map((c) => (
                  <div
                    key={c.title}
                    className="border-brand-100 rounded-xl border-l-4 bg-white p-4 shadow-sm"
                  >
                    <div className="font-display text-brand-700 text-sm font-bold tracking-widest uppercase">
                      {c.title}
                    </div>
                    <p className="mt-2 mb-0 text-sm">{c.results}</p>
                    <p className="mt-1 mb-0 text-sm font-semibold">{c.table}</p>
                  </div>
                ))}
              </div>

              <h2 className={h2}>The Final: every chukker by one</h2>
              <div className="my-6 flex items-center justify-center gap-4">
                <Image
                  src={`${BASE}/artists.png`}
                  alt="HPRC Artists"
                  width={120}
                  height={120}
                  className="h-16 w-auto"
                />
                <span className="font-display text-5xl font-extrabold text-pink-600">14</span>
                <span className="font-display text-5xl font-extrabold text-gray-400">–</span>
                <span className="font-display text-5xl font-extrabold text-orange-500">10</span>
                <Image
                  src={`${BASE}/tigers.png`}
                  alt="HPRC Tigers"
                  width={120}
                  height={120}
                  className="h-16 w-auto"
                />
              </div>
              <div className="grid gap-8 md:grid-cols-[1.1fr_.9fr]">
                <div className="space-y-4">
                  <p>
                    Artists led from the first chukker and were never headed, but Tigers made them
                    earn all four periods. Arsalan Khan opened with four goals against three from
                    Chaitania Kumar, and the pattern was set: Artists took each chukker by a single
                    goal (4–3, 4–3, 3–2, 3–2) and the margin grew by one each time. Kumar&apos;s
                    six, Vishal Singh&apos;s three and one from Sri, who came in for Arjun Reddy
                    after the first chukker, kept Tigers within reach until Khan&apos;s two late
                    goals settled it.
                  </p>
                  <p>
                    Khan&apos;s eleven in the Final took him to twenty goals in three matches, the
                    most by any player in the tournament. Vedanth Lohia and Shehzad Khan added one
                    and two for Artists, whose 20–11 pool record and 14–10 Final made them the only
                    team to win every match they played.
                  </p>
                  <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                    <table className="font-body w-full text-sm">
                      <thead className="bg-gray-50 text-left">
                        <tr className="text-brand-900 font-display">
                          <th className={th}>Scorer</th>
                          {[1, 2, 3, 4].map((n) => (
                            <th key={n} className={`${th} text-center`}>
                              {n}
                            </th>
                          ))}
                          <th className={`${th} text-center`}>Total</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700">
                        {finalScorers.map((r) => (
                          <tr
                            key={r.who}
                            className={`border-t border-gray-100 ${r.hl ? "bg-amber-50 font-semibold" : ""}`}
                          >
                            <td className={td}>{r.who}</td>
                            {r.q.map((g, i) => (
                              <td key={i} className={`${td} text-center`}>
                                {g}
                              </td>
                            ))}
                            <td className={`${td} text-center`}>{r.total}</td>
                          </tr>
                        ))}
                        <tr className="border-t border-gray-200 font-bold">
                          <td className={td}>Chukker score</td>
                          {["4–3", "4–3", "3–2", "3–2"].map((s, i) => (
                            <td key={i} className={`${td} text-center`}>
                              {s}
                            </td>
                          ))}
                          <td className={`${td} text-brand-700 text-center`}>14–10</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="space-y-4">
                  <Photo
                    file="champions"
                    alt="HPRC Artists: Arsalan Khan, Vedanth Lohia and Shehzad Khan"
                    caption="Champions: HPRC Artists (Arsalan Khan, Vedanth Lohia, Shehzad Khan) before the throw-in."
                  />
                  <Photo
                    file="runnersup"
                    alt="HPRC Tigers: Chaitania Kumar, Vishal Singh and Arjun Reddy"
                    caption="Runners-up: HPRC Tigers (Chaitania Kumar, Vishal Singh, Arjun Reddy, with Sri from the second chukker)."
                  />
                </div>
              </div>

              <h2 className={h2}>The awards</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {awards.map((a) => (
                  <div key={a.file}>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                      <Image
                        src={`${BASE}/${a.file}.jpg`}
                        alt={a.alt}
                        fill
                        sizes="(min-width: 768px) 30vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="text-brand-700 font-display mt-3 text-sm font-bold tracking-widest uppercase">
                      {a.title}
                    </div>
                    <div className="font-display text-lg font-bold text-gray-900">{a.name}</div>
                    <p className="mt-2 text-sm">{a.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_.9fr]">
                <div>
                  <h3 className={h3}>Leading scorers</h3>
                  <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                    <table className="font-body w-full text-sm">
                      <thead className="bg-gray-50 text-left">
                        <tr className="text-brand-900 font-display">
                          <th className={th}>Player</th>
                          <th className={`${th} text-center`}>M</th>
                          <th className={`${th} text-center`}>Goals</th>
                          <th className={th}>Note</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700">
                        {scorers.map(([p, m, g, n, hl]) => (
                          <tr
                            key={p}
                            className={`border-t border-gray-100 ${hl ? "bg-amber-50 font-semibold" : ""}`}
                          >
                            <td className={td}>{p}</td>
                            <td className={`${td} text-center`}>{m}</td>
                            <td className={`${td} text-center`}>{g}</td>
                            <td className={td}>{n}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 grid grid-cols-[110px_1fr] items-start gap-4">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                      <Image
                        src={`${BASE}/vishal.jpg`}
                        alt="Vishal Singh"
                        fill
                        sizes="110px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className={`${h3} !mb-1`}>Special mention · Vishal Singh</h3>
                      <p className="text-sm">
                        An excellent tournament from first chukker to last for the Tigers striker:
                        six goals on opening night, nine in all, and his side&apos;s most
                        consistent performer through the pools and the Final.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className={h3}>The new generation</h3>
                  <p>
                    Six players took the field in their first tournament, more than in any HPRC
                    event before it. Alongside Shehzad: <strong>Sri</strong> (Devils, then Tigers in
                    the Final), on the scoresheet in only his second match and in the Final itself;{" "}
                    <strong>Qutub Ansari</strong>, every chukker for Warriors; <strong>Vamsi</strong>
                    , the steady hand at the back for Chargers; <strong>Amogh</strong>, a lifelong
                    horseman who took up polo this season; and <strong>Arjun Reddy</strong>, who
                    scored for Tigers on opening night.
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {newPlayers.map((p) => (
                      <div
                        key={p.file}
                        className="relative aspect-square overflow-hidden rounded-xl bg-gray-900"
                      >
                        <Image
                          src={`${BASE}/${p.file}.jpg`}
                          alt={p.name}
                          fill
                          sizes="15vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-2 pt-8 text-white">
                          <div className="font-display text-sm font-bold uppercase">{p.name}</div>
                          <div className="text-[9px] font-bold tracking-widest text-green-400 uppercase">
                            {p.team}
                          </div>
                          <div className="text-[10px] leading-tight text-gray-300">{p.note}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <h2 className={h2}>Prize night on the lawns</h2>
              <div className="grid gap-8 md:grid-cols-[1.1fr_.9fr]">
                <div className="space-y-4">
                  <p>
                    The trophy was presented by{" "}
                    <strong>Dr. Ramesh, IPS, Commissioner of Police, Cyberabad</strong>, the Chief
                    Guest, joined by <strong>Shri Gowtham Potru, IAS</strong>, Director (Personnel,
                    Administration &amp; Welfare), Singareni Collieries Company Limited and until
                    June the Collector of Medchal-Malkajgiri; <strong>Shri Siraj Attari</strong>,
                    Vice President of the Telangana State Equestrian Association; and{" "}
                    <strong>Shri Ali Khusru Jung Bahadur</strong>, a founding member of the
                    erstwhile Andhra Pradesh Riding Club, who at over eighty-five received a
                    standing ovation from the gallery.
                  </p>
                  <p>
                    Mementos went to umpire <strong>Surya Bahadur</strong> and to commentator and
                    master of ceremonies <strong>Saif ur Rehman</strong>, whose voice carried every
                    goal of the week to the stands. Cocktails and dinner on the HPRC Lawns followed.
                  </p>
                </div>
                <Photo
                  file="action3"
                  alt="Devils in action"
                  caption="Devils in the pools, in the thick of it all week."
                />
              </div>

              <h2 className={h2}>What the week told us</h2>
              <ul>
                <li>
                  <strong>Arena polo works for Hyderabad.</strong> Three a side, a ground this size,
                  evening play under lights: members came, families came, and the gallery stayed to
                  the end.
                </li>
                <li>
                  <strong>Our new players are ready.</strong> Six first-timers, none of them out of
                  place, and the young-player award went to one of them with eight goals.
                </li>
                <li>
                  <strong>Rain is a schedule problem, not a season-ender.</strong> Four matches in
                  one evening worked; the two-chukker format kept the ponies fresh.
                </li>
                <li>
                  <strong>Horse welfare sets the format.</strong> The Final&apos;s chukker length
                  was decided on the day by pony availability, and that is the right way round.
                </li>
              </ul>

              <h2 className={h2}>The way forward: arena polo at HPRC</h2>
              <blockquote className="border-brand-600 border-l-4 pl-4 text-xl font-medium italic">
                &ldquo;This tournament becomes a regular feature of the HPRC calendar, played every
                season, with the club&apos;s own teams, so that members always have something to
                train for.&rdquo;
                <cite className="mt-2 block text-sm text-gray-500 not-italic">
                  — Saif Attari, addressing the prize distribution
                </cite>
              </blockquote>
              <ul>
                <li>
                  <strong>A structured pathway</strong> from riding, to stick-and-ball, to practice
                  chukkers, so any member who can ride is playing arena polo within a season.
                </li>
                <li>
                  <strong>Weekly practice chukkers</strong> through the year, with coaching on the
                  ground, not only in the weeks before a tournament.
                </li>
                <li>
                  <strong>Club ponies and grooms</strong> available to new players, so owning a
                  horse is never the barrier to starting.
                </li>
                <li>
                  <strong>Developing players on every team</strong> in the next edition: the
                  tournament as both a competition and a classroom.
                </li>
              </ul>

              <div className="not-prose my-8 rounded-2xl bg-gray-900 p-6 text-white">
                <div className="font-display text-xl font-bold tracking-wide text-amber-400 uppercase">
                  Next up · December 2026
                </div>
                <p className="mt-2 mb-0 text-gray-300">
                  The next HPRC Arena Polo Tournament will be played in <strong>December 2026</strong>
                  , dates to be announced shortly. Members who ride and would like to try polo before
                  then: write to{" "}
                  <a className="font-bold text-white underline" href="mailto:info@hprc.co.in">
                    info@hprc.co.in
                  </a>{" "}
                  or speak to the polo office. We will put you on a horse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gray-900">
          <Image
            src={`${BASE}/closing.jpg`}
            alt=""
            width={1600}
            height={600}
            className="h-[380px] w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
            <div className="text-xs font-bold tracking-[0.3em] text-amber-400 uppercase">
              Thank you to all six teams
            </div>
            <div className="my-3 flex flex-wrap items-center justify-center gap-4">
              {teamLogos.map((t) => (
                <Image
                  key={t}
                  src={`${BASE}/${t}.png`}
                  alt={t}
                  width={80}
                  height={80}
                  className="h-12 w-auto"
                />
              ))}
            </div>
            <div className="font-display text-4xl font-extrabold tracking-wide uppercase md:text-5xl">
              See you in December
            </div>
            <p className="mt-3 max-w-2xl text-sm text-gray-300">
              With thanks to Inhabit – The Inside Story, our presenting partner; our chief guests;
              the officials; the grooms, arena and F&amp;B teams of HPRC; and every member, family
              and guest who came out to cheer.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

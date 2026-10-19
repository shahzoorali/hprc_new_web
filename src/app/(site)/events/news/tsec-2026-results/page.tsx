import Link from "next/link";

import { ResultsBoard } from "@/components/results/results-board";
import { SectionHeading } from "@/components/ui/section-heading";
import { getResultSet } from "@/lib/results";

export const metadata = {
  title:
    "Results — II Telangana State Equestrian Championship 2026 | Hyderabad Polo & Riding Club",
  description:
    "Pothuraju Sridhar wins the 110–115 cm Open as the 2nd Telangana State Equestrian Championship closes at HPRC. Official results of all classes across Hacks, Dressage and Show Jumping, 17–18 October 2026.",
};

// Saturday 17 Oct runs the first seven classes in the results set, Sunday 18 Oct the rest.
const SATURDAY_CLASSES = 7;

const highlights = [
  {
    title: "Championship class",
    body: "Pothuraju Sridhar on Dilano wins the 110–115 cm Open and the ₹20,000 first prize, ahead of Sauryaram Indukuri on Happyness and Mohammed Amaan Ali on Flying Champ.",
  },
  {
    title: "Rider of the Championship",
    body: "Sauryaram Indukuri: state titles in the 100–105 cm Under 18 and 80–90 cm Under 14, second in the 110–115 cm Open, and third in the 60 cm Open.",
  },
  {
    title: "Horse of the week",
    body: "Dilano, ridden by three different riders, won the 100–105 cm Open, the 80–90 cm Open and the 110–115 cm Open.",
  },
  {
    title: "Host club medals",
    body: "HPRC's Ananya Gupta won four medals, and Gautam Sanjay Sujanaani took the Junior Dressage title on Airstrike.",
  },
];

export default async function TSEC2026ResultsPage() {
  const resultSet = await getResultSet("tsec-2026");
  const classes = resultSet?.classes ?? [];
  const saturday = classes.slice(0, SATURDAY_CLASSES);
  const sunday = classes.slice(SATURDAY_CLASSES);

  const riders = new Set(classes.flatMap((c) => c.entries.map((e) => e.rider)));
  const clubs = new Set(
    classes.flatMap((c) => c.entries.map((e) => e.club).filter(Boolean) as string[]),
  );

  const stats = [
    { value: String(classes.length), label: "Classes" },
    { value: String(riders.size), label: "Placed riders" },
    { value: String(clubs.size), label: "Clubs" },
    { value: "₹1,02,500", label: "Cash prizes" },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <div className="container pt-12">
        <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 p-8 shadow-[0_40px_80px_-20px_rgba(227,30,36,0.3)] md:p-16">
          <div className="space-y-4 text-center">
            <span className="inline-block rounded-full bg-brand-800/60 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-brand-200">
              Official Results · 17–18 October 2026
            </span>
            <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              II Telangana State Equestrian Championship
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-white/90 md:text-xl">
              Hacks, Dressage and Show Jumping · Presented by Phoenix Group
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white/10 px-4 py-5 text-center backdrop-blur"
              >
                <p className="text-2xl font-extrabold text-white md:text-3xl">{s.value}</p>
                <p className="mt-1 text-sm text-brand-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Press note */}
      <section className="container">
        <div className="rounded-[2.5rem] border-2 border-brand-100/70 bg-gradient-to-br from-brand-50/80 via-white to-brand-50/60 p-8 shadow-xl md:p-12">
          <SectionHeading
            eyebrow="Press Note · 18 October 2026 · Hyderabad"
            title="Pothuraju Sridhar wins the 110–115 cm Open as the 2nd Telangana State Equestrian Championship closes at HPRC"
            description="TPCC President Sri B. Mahesh Kumar Goud presents the state medals. Sixteen state titles decided over two days across Hacks, Dressage and Show Jumping."
            align="center"
          />
          <div className="mx-auto mt-8 max-w-3xl space-y-4 text-gray-700">
            <p>
              The 2nd Telangana State Equestrian Championship, presented by Phoenix Group,
              concluded on the evening of 18 October at the Hyderabad Polo &amp; Riding Club
              (HPRC), Gandipet, with the 110–115 cm Open Show Jumping under lights and a Closing
              Ceremony on the club lawns. Sri B. Mahesh Kumar Goud, MLC, President of the
              Telangana Pradesh Congress Committee, Sri P. Uday Kumar, IAS, Zonal Commissioner,
              Greater Hyderabad Municipal Corporation, and Sri Ch. Srinivas, IPS, Deputy
              Commissioner of Police, Serilingampally Zone, Cyberabad, presented the state
              medals. The Championship was conducted in association with the Telangana State
              Equestrian Association (TSEA) and followed directly on the second National
              Qualifier of the season, giving HPRC five consecutive days of competitive
              equestrian sport.
            </p>
            <p>
              The titles ranged from the Under 12 Hacks and the 40 cm entry classes, kept
              deliberately affordable so that beginners on club horses can compete for a state
              medal, to the 110–115 cm Open, the Championship&apos;s premier class.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm"
              >
                <h3 className="font-display text-lg font-bold text-brand-800">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{h.body}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-3xl space-y-4 text-gray-700">
            <h3 className="font-display text-xl font-bold text-brand-800">Closing Ceremony</h3>
            <p>
              Sri B. Mahesh Kumar Goud presented the medals of the 110–115 cm Open and the Young
              Rider Dressage, and the Championship trophy. Sri P. Uday Kumar presented the
              Children II Dressage and the 80–90 cm Under 14 and Open classes, and Sri Ch.
              Srinivas presented the 60 cm Under 12 and Open and the 80–90 cm Under 12 classes.
              The Championship&apos;s cash prizes, ₹1,02,500 across the 110–115 cm, 100–105 cm
              and 80–90 cm Open classes, were presented on behalf of Title Partner Phoenix
              Group, Hyderabad, by Sri Chandra Rama Rao, Committee Member of HPRC. Mr. Chaitania
              R. Kumar, President, HPRC, assisted the Chief Guests on stage. Saturday&apos;s
              medals were presented by Sri Siraj Attari, Vice President, and Sri Raghu
              Panchakarla, Honorary Secretary, of TSEA.
            </p>
            <blockquote className="rounded-2xl border-l-4 border-brand-500 bg-white p-6 italic shadow-sm">
              &ldquo;Two years ago Telangana&apos;s riders had to travel out of the state to be
              ranked. This weekend sixteen state titles were decided at home, in front of their
              families, and the youngest medallist was in the Under 12 Hacks. We are grateful to
              Sri Mahesh Kumar Goud, Sri Uday Kumar and Sri Srinivas for giving the riders their
              evening, to TSEA and our judges and officials, and to Phoenix Group, whose support
              put real prize money behind an Olympic sport for the children of Hyderabad and
              Telangana. The Championship will be back at HPRC next October.&rdquo;
              <footer className="mt-3 text-sm not-italic font-semibold text-brand-800">
                Mr. Chaitania R. Kumar, President, HPRC
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Results */}
      {classes.length > 0 && (
        <>
          <section className="container space-y-10">
            <SectionHeading
              eyebrow="Saturday 17 October"
              title="Day One Results"
              description="Results are as published by the Ground Jury."
              align="center"
            />
            <ResultsBoard classes={saturday} showPhotos showRanking />
          </section>

          <section className="container space-y-10">
            <SectionHeading
              eyebrow="Sunday 18 October"
              title="Day Two Results"
              description="Including the Championship class, the 110–115 cm Open."
              align="center"
            />
            <ResultsBoard classes={sunday} showPhotos showRanking />
            <p className="mx-auto max-w-3xl text-center text-sm text-gray-600">
              Judges — Dressage: Col. S.L. Reddy (Retd.) and Dr. KCS Reddy · Show Jumping:
              Kishore Futnani and Dr. KCS Reddy.
            </p>
          </section>
        </>
      )}

      {/* Closing */}
      <section className="container">
        <div className="space-y-4 rounded-[2rem] bg-brand-900 p-8 text-center md:p-12">
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/90">
            HPRC congratulates every rider who competed and thanks TSEA, the judges and officials,
            and Title Partner Phoenix Group. The Championship will be back at HPRC next October.
            The club&apos;s next fixture is the Club Arena Polo Championship on 30 and 31 October.
          </p>
          <div className="space-y-1 pt-4">
            <p className="font-semibold text-brand-200">Hyderabad Polo &amp; Riding Club</p>
            <p className="text-sm text-white/70">+91 9177000056 · info@hprc.co.in</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link
              href="/events/telangana-state-championship-2026"
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-400"
            >
              ← Event page
            </Link>
            <Link
              href="/events/news/nq-2026-results"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/20"
            >
              NQ 2026 results →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

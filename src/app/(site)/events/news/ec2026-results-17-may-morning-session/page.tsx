import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = {
  title: "EC2026 Results — 17 May Morning Session | HPRC Equestrian Challenge 2026",
  description:
    "Official results of the HPRC Equestrian Challenge 2026 morning session held on 17 May 2026. Winners across Jumping 90cm CH-I and 105cm Junior categories.",
};

const results = [
  {
    category: "Jumping CH-I — 90 CM",
    rows: [
      { pos: "🥇 1st Place", rider: "Sauryaram Varma Indukuri", horse: "Happyness", club: "Archi Horse Riding Academy" },
      { pos: "🥈 2nd Place", rider: "Samara", horse: "Star", club: "Billionaire Polo & Riding Club" },
    ],
  },
  {
    category: "Jumping CH-I — 90 CM Open",
    rows: [
      { pos: "🥇 1st Place", rider: "Ayaan Varma Nadimaplli", horse: "Darcy", club: "HPRC" },
      { pos: "🥈 2nd Place", rider: "Jagadeesh", horse: "Peterbolt", club: "Archi Horse Riding Academy" },
      { pos: "🥉 3rd Place", rider: "Dhanvi Cheruvu", horse: "Bhima", club: "Flying Sea Stallion" },
    ],
  },
  {
    category: "Jumping Junior — 105 CM",
    rows: [
      { pos: "🥇 1st Place", rider: "Khaled Ali", horse: "Moonstone", club: "Royal Caballo Club" },
      { pos: "🥈 2nd Place", rider: "Sauryaram Varma Indukuri", horse: "Happyness", club: "Archi Horse Riding Academy" },
    ],
  },
  {
    category: "Jumping Junior — 105 CM Open",
    rows: [
      { pos: "🥇 1st Place", rider: "Aamir Shahnawaz", horse: "Darcy", club: "HPRC" },
      { pos: "🥈 2nd Place", rider: "Mohammed Amaan Ali", horse: "Flying Champ", club: "Rancho De Caballos" },
      { pos: "🥉 3rd Place", rider: "Shiva Sai", horse: "Tyson", club: "Ruta" },
    ],
  },
];

export default function EC2026Results17MayMorningPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="container pt-12">
          <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand-200/50 shadow-[0_40px_80px_-20px_rgba(227,30,36,0.3)]">
            <div className="absolute inset-0">
              <Image
                src="/images/ec2026/aamir-shahnawaz-1.jpg"
                alt="Aamir Shahnawaz on Darcy clearing a 105cm jump — 1st Place, HPRC Equestrian Challenge 2026"
                fill
                className="object-cover object-center"
                quality={90}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-900/85 via-brand-800/75 to-brand-900/85" />
            </div>
            <div className="relative z-10 p-8 md:p-16 lg:p-20">
              <div className="space-y-4 text-center">
                <span className="inline-block text-sm font-semibold uppercase tracking-widest text-brand-200 bg-brand-800/60 px-4 py-1.5 rounded-full">
                  Press Release · 17 May 2026
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
                  HPRC Equestrian Challenge 2026
                </h1>
                <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
                  Results — Morning Session Competitions · 17 May 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-50/80 via-white to-brand-50/60 p-8 md:p-12 lg:p-16 border-2 border-brand-100/70 shadow-xl">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Morning Session · 17 May 2026"
              title="Official Competition Results"
              description="The Hyderabad Polo & Riding Club (HPRC), established in 2005, proudly announces the results of the Morning Session competitions held on 17th May 2026 as part of the ongoing HPRC Equestrian Challenge 2026."
              align="center"
            />

            <div className="prose prose-lg max-w-none space-y-4 text-gray-700">
              <p>
                The event continued to witness exceptional participation from talented riders representing prominent
                equestrian academies and clubs from across the region. The morning session featured exciting
                competitions in the <strong>CH-I 90 CM</strong> and <strong>Junior 105 CM</strong> jumping categories,
                where riders demonstrated remarkable control, precision, and confidence over technically challenging
                courses.
              </p>
              <p>
                Riders from <strong>HPRC</strong>, <strong>Royal Caballo Club</strong>,{" "}
                <strong>Archi Horse Riding Academy</strong>, <strong>Flying Sea Stallion</strong>,{" "}
                <strong>Billionaire Polo &amp; Riding Club</strong>, <strong>Rancho De Caballos</strong>, and{" "}
                <strong>Ruta</strong> delivered commendable performances throughout the morning session.
              </p>
              <p className="font-semibold text-brand-700">
                Official Judges: Dr. KCS Reddy &amp; Mr. Kishore Futnani
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Tables */}
      <section className="container">
        <div className="space-y-10">
          {results.map((section) => (
            <div key={section.category} className="rounded-2xl border border-brand-100 overflow-hidden shadow-md">
              <div className="bg-brand-900 px-6 py-4">
                <h2 className="text-lg font-bold text-white tracking-wide">{section.category}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-50 border-b border-brand-100">
                      <th className="text-left px-5 py-3 font-semibold text-brand-800 w-44">Position</th>
                      <th className="text-left px-5 py-3 font-semibold text-brand-800">Rider</th>
                      <th className="text-left px-5 py-3 font-semibold text-brand-800">Horse</th>
                      <th className="text-left px-5 py-3 font-semibold text-brand-800">Club</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}
                      >
                        <td className="px-5 py-3 font-medium text-gray-800">{row.pos}</td>
                        <td className="px-5 py-3 text-gray-900 font-semibold">{row.rider}</td>
                        <td className="px-5 py-3 text-gray-700 italic">{row.horse}</td>
                        <td className="px-5 py-3 text-gray-600">{row.club}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="container">
        <div className="rounded-[2rem] bg-gradient-to-br from-brand-50/80 via-white to-brand-50/60 border-2 border-brand-100/70 shadow-xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-brand-900 mb-8 text-center">Competition Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/ec2026/aamir-shahnawaz-1.jpg"
                alt="Aamir Shahnawaz on Darcy — 1st Place, Jumping 105cm Open"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-semibold">Aamir Shahnawaz · Darcy</p>
                <p className="text-white/80 text-xs">🥇 105cm Open · HPRC</p>
              </div>
            </div>
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/ec2026/aamir-shahnawaz-2.jpg"
                alt="Aamir Shahnawaz competing at HPRC Equestrian Challenge 2026"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-semibold">Aamir Shahnawaz · Darcy</p>
                <p className="text-white/80 text-xs">HPRC Equestrian Challenge 2026</p>
              </div>
            </div>
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/ec2026/action-1.jpg"
                alt="Show jumping action at HPRC Equestrian Challenge 2026 — 17 May Morning Session"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-semibold">Morning Session Action</p>
                <p className="text-white/80 text-xs">17 May 2026</p>
              </div>
            </div>
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/ec2026/action-2.jpg"
                alt="Show jumping action at HPRC Equestrian Challenge 2026 — 17 May Morning Session"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-semibold">Morning Session Action</p>
                <p className="text-white/80 text-xs">17 May 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Note */}
      <section className="container">
        <div className="rounded-[2rem] bg-brand-900 p-8 md:p-12 text-center space-y-4">
          <p className="text-white/90 text-lg leading-relaxed max-w-3xl mx-auto">
            HPRC congratulates all winners and participants for their excellent performances and sportsmanship.
            The club remains committed to promoting equestrian excellence and creating opportunities for emerging
            riders to compete at high standards.
          </p>
          <div className="pt-4 space-y-1">
            <p className="text-brand-200 font-semibold">Hyderabad Polo &amp; Riding Club</p>
            <p className="text-white/70 text-sm">+91 9177000056 · info@hprc.co.in</p>
          </div>
          <div className="pt-4">
            <Link
              href="/events/news/ec2026-results-16-may-evening-session"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              ← View 16 May Evening Session Results
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

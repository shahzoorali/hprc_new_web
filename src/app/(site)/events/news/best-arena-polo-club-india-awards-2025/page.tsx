import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = {
  title: "HPRC Wins 'Best Arena Polo Club' in India at The Indian Polo Awards 2025 | HPRC News",
  description: "Hyderabad Polo & Riding Club (HPRC) was recognized as the best Arena Polo Club in India at the Indian Polo Awards 2025 in Jaipur.",
};

export default function BestArenaPoloClubAward2025Page() {
  return (
    <div className="space-y-16 pb-16">
      <div className="relative overflow-hidden">
        <div className="container pt-12">
          <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand-200/50 shadow-[0_40px_80px_-20px_rgba(227,30,36,0.3)]">
            <div className="absolute inset-0">
              <Image
                src="/images/hprc-tipa-award2025.jpeg"
                alt="HPRC receiving Best Arena Polo Club award at The Indian Polo Awards 2025"
                fill
                className="object-cover object-center"
                quality={90}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-900/85 via-brand-800/80 to-brand-900/85" />
            </div>
            <div className="relative z-10 p-8 md:p-16 lg:p-20">
              <div className="space-y-6 text-center">
                <div className="inline-block bg-brand-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-4">
                   <span className="text-white text-xs font-bold uppercase tracking-widest">Historical Milestone</span>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
                  The Best Arena Polo Club in India
                </h1>
                <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
                  HPRC recognized as the pioneer and winner of the first-ever 'Arena Polo Club of the Season' at The Indian Polo Awards 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-50/80 via-white to-brand-50/60 p-8 md:p-12 lg:p-16 border-2 border-brand-100/70 shadow-xl">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="22 February, 2025 • Jaipur"
              title="A Testament to Excellence"
              description="At the Indian Polo Awards function held at the historic City Palace, Jaipur, a new category was introduced to celebrate the format making the sport more accessible: Arena Polo."
              align="center"
            />
            <div className="prose prose-lg max-w-none mt-8 space-y-6 text-gray-700 leading-relaxed">
              <p>
                As new Polo centres emerge across the world, promoting and elevating the sport in innovative ways, Arena Polo has become a dynamic extension of traditional Polo, making the game more accessible and exciting.
              </p>
              <p>
                Arena Polo is rapidly growing in our country and increasing the spread of this beautiful sport, especially in urban areas, where it is difficult to have a full sized Polo field. Arena Polo has also made it possible to play Polo during warmer months, having the Polo matches in the evening hours under flood lights.
              </p>
              <div className="bg-brand-900 text-white p-8 rounded-2xl shadow-luxury my-10 border border-brand-800 relative overflow-hidden group">
                 <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl group-hover:bg-brand-500/20 transition-all duration-500" />
                 <p className="relative z-10 italic text-xl md:text-2xl font-light mb-4 text-white/90">
                   "This award category celebrates the best Arena Polo Club in India that has been at the forefront of this evolution, fostering talent and expanding the reach of Polo across the country."
                 </p>
                 <p className="relative z-10 font-bold uppercase tracking-widest text-brand-400 text-sm">
                   — LA POLO, The Indian Polo Awards
                 </p>
              </div>
              <p>
                As the first winner of this award category, the <strong>Hyderabad Polo & Riding Club (HPRC)</strong> was awarded as the <strong>ARENA POLO CLUB of the Season</strong>.
              </p>
              <p>
                A pioneer of Arena Polo in India, HPRC has been deservingly recognised as the <strong>BEST ARENA POLO CLUB</strong> in India, highlighting its contribution to fostering talent and expanding the reach of the sport.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl">
          <div className="aspect-[4/5] relative md:aspect-[3/4] lg:aspect-auto lg:h-[800px]">
            <Image
              src="/images/hprc-tipa-award2025.jpeg"
              alt="HPRC at The Indian Polo Awards 2025 - Full Photograph"
              fill
              className="object-contain"
              quality={100}
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-center">
            <p className="text-white/60 text-sm font-medium tracking-widest uppercase">
              Official Award Ceremony Photograph • City Palace, Jaipur
            </p>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/events/news"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-brand-200 transition-all hover:-translate-y-1"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Explore More News
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 border-2 border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-white px-8 py-4 rounded-full font-bold transition-all"
          >
            Learn About HPRC
          </Link>
        </div>
      </section>
    </div>
  );
}

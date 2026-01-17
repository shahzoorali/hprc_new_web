"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ImageLightbox } from "@/components/ui/image-lightbox";
import { SectionHeading } from "@/components/ui/section-heading";

const galleryImages = [
  {
    src: "/documents/news/hawaii-2024/DayPoloAction01.jpeg",
    alt: "HPRC San Diego 2024 - day polo action",
  },
  {
    src: "/documents/news/hawaii-2024/DayPoloStrike01.jpeg",
    alt: "HPRC San Diego 2024 - day polo strike",
  },
  {
    src: "/documents/news/hawaii-2024/DayRideDuel01.jpeg",
    alt: "HPRC San Diego 2024 - day ride duel",
  },
  {
    src: "/documents/news/hawaii-2024/DayRiderWithBall01.jpeg",
    alt: "HPRC San Diego 2024 - rider with ball",
  },
  {
    src: "/documents/news/hawaii-2024/DayRiderMalletUp01.jpeg",
    alt: "HPRC San Diego 2024 - rider with mallet raised",
  },
  {
    src: "/documents/news/hawaii-2024/DayBallChase01.jpeg",
    alt: "HPRC San Diego 2024 - day ball chase",
  },
  {
    src: "/documents/news/hawaii-2024/DayBallChase02.jpeg",
    alt: "HPRC San Diego 2024 - day ball chase",
  },
  {
    src: "/documents/news/hawaii-2024/DayRiderLineup01.jpeg",
    alt: "HPRC San Diego 2024 - riders in lineup",
  },
  {
    src: "/documents/news/hawaii-2024/DayRiderRedShirt01.jpeg",
    alt: "HPRC San Diego 2024 - rider in red shirt",
  },
  {
    src: "/documents/news/hawaii-2024/DayRiderRedShirt02.jpeg",
    alt: "HPRC San Diego 2024 - rider in red shirt",
  },
  {
    src: "/documents/news/hawaii-2024/DayRiderRedShirt03.jpeg",
    alt: "HPRC San Diego 2024 - rider in red shirt",
  },
  {
    src: "/documents/news/hawaii-2024/DayRiderBrownHorse01.jpeg",
    alt: "HPRC San Diego 2024 - rider on brown horse",
  },
  {
    src: "/documents/news/hawaii-2024/IndiaFlagGroup01.jpeg",
    alt: "HPRC San Diego 2024 - India flag group photo",
  },
  {
    src: "/documents/news/hawaii-2024/IndiaFlagTeam01.jpeg",
    alt: "HPRC San Diego 2024 - India flag team photo",
  },
  {
    src: "/documents/news/hawaii-2024/IndiaFlagWithGuest01.jpeg",
    alt: "HPRC San Diego 2024 - India flag with guest",
  },
  {
    src: "/documents/news/hawaii-2024/TeamLineup01.jpeg",
    alt: "HPRC San Diego 2024 - team lineup",
  },
  {
    src: "/documents/news/hawaii-2024/TeamDinner01.jpeg",
    alt: "HPRC San Diego 2024 - team dinner",
  },
  {
    src: "/documents/news/hawaii-2024/LakesidePoloSelfie01.jpeg",
    alt: "HPRC San Diego 2024 - Lakeside Polo Club selfie",
  },
  {
    src: "/documents/news/hawaii-2024/LakesidePoloSelfie02.jpeg",
    alt: "HPRC San Diego 2024 - Lakeside Polo Club selfie",
  },
  {
    src: "/documents/news/hawaii-2024/LakesidePoloTrio01.jpeg",
    alt: "HPRC San Diego 2024 - Lakeside Polo Club trio",
  },
  {
    src: "/documents/news/hawaii-2024/PlayerPortraitWithHorse01.jpeg",
    alt: "HPRC San Diego 2024 - player portrait with horse",
  },
  {
    src: "/documents/news/hawaii-2024/AwardPresentation01.jpeg",
    alt: "HPRC San Diego 2024 - award presentation",
  },
  {
    src: "/documents/news/hawaii-2024/PoloPrizeBag01.jpeg",
    alt: "HPRC San Diego 2024 - polo prize bag",
  },
  {
    src: "/documents/news/hawaii-2024/SidelineOfficials01.jpeg",
    alt: "HPRC San Diego 2024 - sideline officials",
  },
  {
    src: "/documents/news/hawaii-2024/NightRidersSideBySide01.jpeg",
    alt: "HPRC San Diego 2024 - night riders side by side",
  },
  {
    src: "/documents/news/hawaii-2024/NightFourRiders01.jpeg",
    alt: "HPRC San Diego 2024 - night four riders",
  },
  {
    src: "/documents/news/hawaii-2024/NightPoloScrum01.jpeg",
    alt: "HPRC San Diego 2024 - night polo scrum",
  },
  {
    src: "/documents/news/hawaii-2024/NightBallChase01.jpeg",
    alt: "HPRC San Diego 2024 - night ball chase",
  },
  {
    src: "/documents/news/hawaii-2024/NightBallChase02.jpeg",
    alt: "HPRC San Diego 2024 - night ball chase",
  },
  {
    src: "/documents/news/hawaii-2024/NightBallChase03.jpeg",
    alt: "HPRC San Diego 2024 - night ball chase",
  },
  {
    src: "/documents/news/hawaii-2024/NightPlayChase03.jpeg",
    alt: "HPRC San Diego 2024 - night play chase",
  },
  {
    src: "/documents/news/hawaii-2024/NightPlayChase04.jpeg",
    alt: "HPRC San Diego 2024 - night play chase",
  },
  {
    src: "/documents/news/hawaii-2024/NightRideDuel01.jpeg",
    alt: "HPRC San Diego 2024 - night ride duel",
  },
  {
    src: "/documents/news/hawaii-2024/NightRiderCloseup01.jpeg",
    alt: "HPRC San Diego 2024 - night rider closeup",
  },
  {
    src: "/documents/news/hawaii-2024/NightRiderCloseup02.jpeg",
    alt: "HPRC San Diego 2024 - night rider closeup",
  },
  {
    src: "/documents/news/hawaii-2024/NightRiderPortrait01.jpeg",
    alt: "HPRC San Diego 2024 - night rider portrait",
  },
  {
    src: "/documents/news/hawaii-2024/NightTeamHuddle01.jpeg",
    alt: "HPRC San Diego 2024 - night team huddle",
  },
];

export default function HprcSanDiegoMatch2024Page() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return (
    <>
      <div className="space-y-16 pb-16">
        <div className="relative overflow-hidden">
          <div className="container pt-12">
            <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand-200/50 shadow-[0_40px_80px_-20px_rgba(227,30,36,0.3)]">
              <div className="absolute inset-0">
                <Image
                  src="/documents/news/hawaii-2024/DayPoloAction01.jpeg"
                  alt="HPRC at the 2024 USA-India arena polo challenge"
                  fill
                  className="object-cover"
                  quality={90}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-900/85 via-brand-800/80 to-brand-900/85"></div>
              </div>
              <div className="relative z-10 p-8 md:p-16 lg:p-20">
                <div className="space-y-6 text-center">
                  <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-white/80 font-display">
                    Newsroom
                  </p>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
                    HPRC represents India at the 2024 USA-India arena polo challenge
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
                    Arsalan Khan named MVP as Team USA edges India 14-12 at the Buddy Combs
                    International Arena Challenge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="container">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-50/80 via-white to-brand-50/60 p-8 md:p-12 lg:p-16 border-2 border-brand-100/70 shadow-xl">
            <div className="space-y-10">
              <SectionHeading
                eyebrow="Match Recap"
                title="India battles to a thrilling finish at Lakeside Polo Club, San Diego"
                description="A dramatic four-chukker contest featured sustained leads, a late tie, and standout individual honors."
                align="center"
              />
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  HPRC riders represented India at the Buddy Combs International Arena Challenge in
                  2024, taking on a strong USA side at the Lakeside Polo Club in San Diego,
                  California. Team India featured Arsalan Khan, Chaitania R. Kumar, and Prithvi
                  Rathore, while the hosts fielded Nicole Bankhead, Robbie Pizarro, and David
                  Brooks.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  India opened with a four-goal handicap advantage and held a 9-7 lead after two
                  chukkers. The momentum swung repeatedly as both sides traded goals and defensive
                  stands, with the scoreboard locked at 11-11 at the end of the third.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Team USA sealed the contest 14-12 in the final chukker. Chaitania Kumar delivered
                  five goals for India, while Robbie Pizarro completed a hat-trick for the hosts.
                  Arsalan Khan earned the MVP honor for his balanced defense and attacking play, and
                  Marco 2 was recognized as Best Pony.
                </p>
              </div>
              <div className="grid gap-6 lg:grid-cols-3 text-center">
                <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-lg">
                  <p className="text-xs uppercase tracking-[0.3em] text-brand-500 font-display">
                    Final Score
                  </p>
                  <p className="mt-3 text-2xl font-bold text-brand-900 font-display">
                    USA 14 - 12 India
                  </p>
                </div>
                <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-lg">
                  <p className="text-xs uppercase tracking-[0.3em] text-brand-500 font-display">
                    MVP
                  </p>
                  <p className="mt-3 text-2xl font-bold text-brand-900 font-display">
                    Arsalan Khan
                  </p>
                </div>
                <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-lg">
                  <p className="text-xs uppercase tracking-[0.3em] text-brand-500 font-display">
                    Best Pony
                  </p>
                  <p className="mt-3 text-2xl font-bold text-brand-900 font-display">Marco 2</p>
                </div>
              </div>
              <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-lg">
                <p className="text-gray-700 leading-relaxed">
                  USPA Arena Chairman Robin Sanchez noted the historic significance of the
                  challenge, highlighting India&apos;s role in shaping modern polo and the USA&apos;s
                  contribution to arena polo. The event was supported by the American International
                  Polo Foundation and the Indian Polo Association.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Press Coverage Section */}
        <section className="container">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-50/80 via-white to-brand-50/60 p-8 md:p-12 lg:p-16 border-2 border-brand-100/70 shadow-xl">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="Press Coverage"
                title="Deccan Chronicle Feature"
                description="The match received prominent coverage in the Deccan Chronicle, highlighting Arsalan Khan's MVP performance and the thrilling contest."
                align="center"
              />
              <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-brand-200/50">
                <Image
                  src="/documents/news/hawaii-2024/DC-news.jpeg"
                  alt="Deccan Chronicle newspaper article - Arsalan is MVP as USA edge India"
                  width={1200}
                  height={1600}
                  className="w-full h-auto object-contain"
                  quality={95}
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 italic">
                  Deccan Chronicle | Monday, 7 October 2024
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container">
          <div className="space-y-8 text-center">
            <SectionHeading
              eyebrow="Photo Gallery"
              title="HPRC at Lakeside Polo Club, San Diego 2024"
              description="On-field action, team moments, and celebrations from the USA-India arena polo clash."
              align="center"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {galleryImages.map((image, index) => (
                <div
                  key={image.src}
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                  className="relative h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="rounded-full bg-white/20 backdrop-blur-sm p-3">
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
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container">
          <div className="text-center">
            <Link
              href="/events/news"
              className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to News</span>
            </Link>
          </div>
        </section>
      </div>

      <ImageLightbox
        images={galleryImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ImageLightbox } from "@/components/ui/image-lightbox";
import { SectionHeading } from "@/components/ui/section-heading";

const S3 = "https://s3.ap-south-1.amazonaws.com/hprc.in/media/gallery/tour2026";

// All gallery images for lightbox (unique list)
const galleryImages = [
  { src: `${S3}/team_mounted.jpg`, alt: "The touring side under lights at HPRC: Saif Attari, Chaitania R. Kumar and Arsalan Khan" },
  { src: `${S3}/team_standing.jpg`, alt: "Saif Attari, Chaitania R. Kumar and Arsalan Khan in HPRC India kit" },
  { src: `${S3}/team_san_diego.jpg`, alt: "HPRC riders in India colours with Col Vikram Kahlon at Lakeside Polo Club, San Diego" },
  { src: `${S3}/action_san_diego.jpg`, alt: "India and USA riders contest the ball under floodlights at Lakeside Polo Club" },
  { src: `${S3}/flags_san_diego.jpg`, alt: "Riders carry the Indian and American flags into the arena" },
  { src: `${S3}/hawaii.jpg`, alt: "Riders with flags on a grass polo field in Hawaii" },
  { src: `${S3}/kumar_flag.jpg`, alt: "Chaitania R. Kumar holding the Indian flag at Lakeside Polo Club" },
  { src: `${S3}/AFI09696.jpg`, alt: "HPRC International Tour 2026 — team photo" },
  { src: `${S3}/AFI09724.jpg`, alt: "HPRC International Tour 2026 — riders preparing" },
  { src: `${S3}/AFI09755-3.jpg`, alt: "HPRC International Tour 2026 — action shot" },
  { src: `${S3}/AFI09866.jpg`, alt: "HPRC International Tour 2026 — group photograph" },
];

export default function HPRCInternationalTour2026Page() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="space-y-16 pb-16">
        {/* ─── Hero ─── */}
        <div className="relative overflow-hidden">
          <div className="container pt-12">
            <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand-200/50 shadow-[0_40px_80px_-20px_rgba(227,30,36,0.3)]">
              <div className="absolute inset-0">
                <Image
                  src={`${S3}/team_mounted.jpg`}
                  alt="Three HPRC riders in India kit mounted under floodlights at the HPRC arena"
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
                    <span className="text-white text-xs font-bold uppercase tracking-widest">International</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
                    HPRC to fly the flag for Indian polo in Spain and the United States
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
                    HPRC India takes on Madrid Polo Club and Commonwealth Polo Club, Kentucky, in a two-country tour this September and October — the club&apos;s third international outing after Hawaii and San Diego, and the latest step in its drive to make Hyderabad a polo destination for the world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Fixture Crests ─── */}
        <section className="container">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16">
            <div className="relative w-64 h-48 sm:w-72 sm:h-56">
              <Image
                src={`${S3}/fx_spain.png`}
                alt="HPRC India vs Madrid Polo Club"
                fill
                className="object-contain"
                sizes="300px"
              />
            </div>
            <div className="relative w-64 h-48 sm:w-72 sm:h-56">
              <Image
                src={`${S3}/fx_usa.png`}
                alt="HPRC Polo vs Commonwealth Polo"
                fill
                className="object-contain"
                sizes="300px"
              />
            </div>
          </div>
        </section>

        {/* ─── Article Body ─── */}
        <section className="container">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-50/80 via-white to-brand-50/60 p-8 md:p-12 lg:p-16 border-2 border-brand-100/70 shadow-xl">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="21 September 2026 · HPRC News"
                title="Flying the Flag for Indian Polo"
                description=""
                align="center"
              />

              <div className="prose prose-lg max-w-none mt-8 space-y-6 text-gray-700 leading-relaxed">
                <p>
                  <strong className="font-display">Hyderabad, 21 September 2026 —</strong> A team from the Hyderabad Polo and Riding Club (HPRC) leaves this week for a fortnight of international polo across two continents, playing club-to-club friendlies against Madrid Polo Club in Spain and Commonwealth Polo Club in Lexington, Kentucky. The tour runs from 23 September to 4 October and continues the club&apos;s programme of taking Indian polo abroad — as sportsmen, and as ambassadors for the game in the country where it was first played.
                </p>

                <p>
                  The touring side is led by Chaitania R. Kumar, President of HPRC, with Arsalan Khan, Saif Attari and Akash Reddy. All four are products of the club&apos;s own polo programme at Aziznagar, and Kumar, Khan and Attari formed the core of the HPRC side that won the MSN Realty Arena Polo Championship in November last year.
                </p>
              </div>

              {/* Team standing image */}
              <figure className="my-8">
                <div
                  className="relative h-64 sm:h-80 lg:h-[450px] rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(1)}
                >
                  <Image
                    src={`${S3}/team_standing.jpg`}
                    alt="Saif Attari, Chaitania R. Kumar and Arsalan Khan standing in HPRC India kit with helmets and mallets"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <figcaption className="text-center text-sm text-gray-500 mt-3 font-body">
                  Left to right: Saif Attari, Chaitania R. Kumar and Arsalan Khan in HPRC&apos;s India kit.
                </figcaption>
              </figure>

              {/* Madrid section */}
              <div className="prose prose-lg max-w-none space-y-4 text-gray-700 leading-relaxed">
                <h2 className="text-2xl font-bold text-brand-900 font-display tracking-tight !mb-3">
                  Madrid: two matches on grass, and a party
                </h2>
                <p>
                  The tour opens in Spain. After a day of stick-and-ball and a day of practice chukkers, HPRC India meets Madrid Polo Club in a four-a-side fixture on Saturday 26 September, followed by a mixed-teams match on Sunday 27 September in which players from both clubs are drawn together. Madrid Polo Club is hosting the visiting side throughout, providing horses, grooms and tack, and closes the weekend with a party at the club for both teams and their supporters.
                </p>

                <h2 className="text-2xl font-bold text-brand-900 font-display tracking-tight !mb-3 !mt-10">
                  Kentucky: under lights at Commonwealth Polo Club
                </h2>
                <p>
                  From Madrid the team flies to the Bluegrass. Commonwealth Polo Club at Paris, Kentucky — one of the leading arena polo clubs in the United States and home to the University of Kentucky polo programme — hosts two days of practice chukkers on 30 September and 1 October before the tour&apos;s final on Saturday 3 October, played three-a-side under floodlights in Commonwealth&apos;s arena.
                </p>

                <h2 className="text-2xl font-bold text-brand-900 font-display tracking-tight !mb-3 !mt-10">
                  A third international tour
                </h2>
                <p>
                  This is the third time HPRC has taken a team overseas. The club&apos;s international outreach began with a tour to Hawaii, and in October 2024 HPRC riders represented India at the Buddy Combs International Arena Challenge at Lakeside Polo Club, San Diego. In a match that finished 14-12 to the hosts after being tied 11-11 going into the final chukker, Chaitania Kumar scored five goals and Arsalan Khan was named Most Valuable Player. The side travelled with the blessing of the Indian Polo Association, whose Secretary, Col Vikram Kahlon of the 61st Cavalry, was with the team in San Diego. Robin Sanchez, Chairman of the United States Polo Association&apos;s arena committee, described the fixture as historic for bringing together the country that gave the modern game to the world and the country that shaped arena polo.
                </p>
              </div>

              {/* San Diego team image */}
              <figure className="my-8">
                <div
                  className="relative h-64 sm:h-80 lg:h-[450px] rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(2)}
                >
                  <Image
                    src={`${S3}/team_san_diego.jpg`}
                    alt="HPRC riders in India colours with Col Vikram Kahlon, Secretary of the Indian Polo Association, at Lakeside Polo Club, San Diego"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <figcaption className="text-center text-sm text-gray-500 mt-3 font-body">
                  San Diego, October 2024: HPRC riders in India colours with Col Vikram Kahlon of the 61st Cavalry, Secretary of the Indian Polo Association, at Lakeside Polo Club.
                </figcaption>
              </figure>

              {/* Action + Flags pair */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-8">
                <figure>
                  <div
                    className="relative h-56 sm:h-72 rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(3)}
                  >
                    <Image
                      src={`${S3}/action_san_diego.jpg`}
                      alt="India and USA riders contest the ball under floodlights at Lakeside Polo Club"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <figcaption className="text-center text-sm text-gray-500 mt-3 font-body">
                    Under lights at Lakeside: India against the USA in the Buddy Combs International Arena Challenge.
                  </figcaption>
                </figure>
                <figure>
                  <div
                    className="relative h-56 sm:h-72 rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(4)}
                  >
                    <Image
                      src={`${S3}/flags_san_diego.jpg`}
                      alt="Riders carry the Indian and American flags into the arena at night"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <figcaption className="text-center text-sm text-gray-500 mt-3 font-body">
                    The tricolour and the Stars and Stripes lead the teams in at San Diego.
                  </figcaption>
                </figure>
              </div>

              <div className="prose prose-lg max-w-none space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The traffic has run both ways. In February this year HPRC hosted the International Arena Polo Championship at Aziznagar, with teams from the United States, Spain, France and Luxembourg; India beat France 21-14 in the final. The club also staged the Indian national arena team&apos;s training camp ahead of the FIP Arena World Championship zone playoffs, and was named Arena Polo Club of the Season at The Indian Polo Awards in both 2025 and 2026 — the first club to receive the award, and the first to retain it.
                </p>

                <h2 className="text-2xl font-bold text-brand-900 font-display tracking-tight !mb-3 !mt-10">
                  Hyderabad as a polo destination
                </h2>
                <p>
                  Behind every tour and every visiting side is a single aim: to build polo tourism in Telangana, and to put Hyderabad on the map as a place the world comes to play, to watch and to learn the game. That is why HPRC hosts international arena polo in Hyderabad each year, why it brings teams from the United States, Europe and elsewhere to Aziznagar, and why it takes its own riders abroad — every fixture is an introduction, and every introduction is an invitation back. Visiting players find in Hyderabad a floodlit arena, a hundred horses, a structured coaching programme from stick-and-ball to competitive chukkers, and the city&apos;s hospitality at the club&apos;s door. The tours to Hawaii and San Diego have already brought players and officials from those clubs to Telangana; Madrid and Kentucky are the next two names on that list.
                </p>
              </div>

              {/* Hawaii + Kumar flag pair */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-8">
                <figure>
                  <div
                    className="relative h-56 sm:h-72 rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(5)}
                  >
                    <Image
                      src={`${S3}/hawaii.jpg`}
                      alt="Riders with the Indian and American flags on a grass polo field in Hawaii"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <figcaption className="text-center text-sm text-gray-500 mt-3 font-body">
                    Where it began: the tricolour and the Stars and Stripes on the field in Hawaii, HPRC&apos;s first international tour.
                  </figcaption>
                </figure>
                <figure>
                  <div
                    className="relative h-56 sm:h-72 rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(6)}
                  >
                    <Image
                      src={`${S3}/kumar_flag.jpg`}
                      alt="Chaitania R. Kumar holding the Indian flag in front of a U.S. Polo Assn. banner"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <figcaption className="text-center text-sm text-gray-500 mt-3 font-body">
                    Chaitania R. Kumar, President of HPRC, with the tricolour at Lakeside Polo Club, San Diego.
                  </figcaption>
                </figure>
              </div>

              {/* Blockquote */}
              <div className="bg-brand-900 text-white p-8 rounded-2xl shadow-luxury my-10 border border-brand-800 relative overflow-hidden group">
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl group-hover:bg-brand-500/20 transition-all duration-500" />
                <p className="relative z-10 italic text-xl md:text-2xl font-light mb-4 text-white/90">
                  &ldquo;Polo began in India, and Indian polo should be seen in the world. Every time we travel we learn something about the way the game is played elsewhere, and every time we host we show our guests something of how it is played here. Madrid and Kentucky are two of the most welcoming clubs we have dealt with, and we go as their guests first and their opponents second. We will bring the results home, and we hope to bring both clubs to Hyderabad — because the point of all of this is that Telangana becomes a place the polo world thinks of, for playing and for learning the game.&rdquo;
                </p>
                <p className="relative z-10 font-bold uppercase tracking-widest text-brand-400 text-sm">
                  — Chaitania R. Kumar, President, Hyderabad Polo and Riding Club
                </p>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p>
                  Match reports and photographs from both legs will be published here and on the club&apos;s social channels as the tour progresses.
                </p>
              </div>

              {/* Tour at a glance */}
              <div className="my-10">
                <h2 className="text-2xl font-bold text-brand-900 font-display tracking-tight mb-6">
                  Tour at a glance
                </h2>
                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <th className="text-left bg-gray-50 px-5 py-4 font-semibold text-brand-900 w-1/4 align-top font-display">Tour dates</th>
                        <td className="px-5 py-4 text-gray-700 font-body">23 September – 4 October 2026</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <th className="text-left bg-gray-50 px-5 py-4 font-semibold text-brand-900 align-top font-display">Madrid fixtures</th>
                        <td className="px-5 py-4 text-gray-700 font-body">
                          Saturday 26 September, HPRC India v Madrid Polo Club, four a side, 11:00<br />
                          Sunday 27 September, mixed teams, 11:00<br />
                          Madrid Polo Club, San Fernando de Henares
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <th className="text-left bg-gray-50 px-5 py-4 font-semibold text-brand-900 align-top font-display">Kentucky fixture</th>
                        <td className="px-5 py-4 text-gray-700 font-body">
                          Saturday 3 October, Commonwealth Polo Club v HPRC, three a side under lights<br />
                          Commonwealth Polo Club, Paris, Kentucky
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <th className="text-left bg-gray-50 px-5 py-4 font-semibold text-brand-900 align-top font-display">HPRC India</th>
                        <td className="px-5 py-4 text-gray-700 font-body">Chaitania R. Kumar, Arsalan Khan, Saif Attari, Akash Reddy (Madrid)</td>
                      </tr>
                      <tr>
                        <th className="text-left bg-gray-50 px-5 py-4 font-semibold text-brand-900 align-top font-display">Previous tours</th>
                        <td className="px-5 py-4 text-gray-700 font-body">
                          Hawaii; Lakeside Polo Club, San Diego, October 2024 — Buddy Combs International Arena Challenge, USA 14-12 India, MVP Arsalan Khan
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* About HPRC */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                <h2 className="text-xl font-bold text-brand-900 font-display tracking-tight mb-4">About HPRC</h2>
                <p className="text-gray-600 leading-relaxed text-[15px] font-body">
                  Established in 2005 at Aziznagar, Gandipet, on the western edge of Hyderabad, HPRC is a multi-discipline equestrian club running polo, show jumping, dressage and riding instruction on a ten-acre estate, with a floodlit arena polo field, stabling for over a hundred horses, a sports centre and hospitality. The club hosts national qualifiers and the annual International Arena Polo Championship, and was named Arena Polo Club of the Season at The Indian Polo Awards in 2025 and 2026.
                </p>
                <p className="text-gray-400 text-sm mt-3 font-body">
                  Media: info@hprc.co.in · +91 9177 00 00 56 · www.hprc.in
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Photo Gallery ─── */}
        <section className="container">
          <SectionHeading
            eyebrow="Gallery"
            title="Tour 2026 Photography"
            description="Additional photographs from the team and international tour archive"
            align="center"
          />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {galleryImages.slice(7).map((image, index) => {
              const globalIndex = index + 7;
              return (
                <div
                  key={globalIndex}
                  onClick={() => openLightbox(globalIndex)}
                  className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="rounded-full bg-white/20 backdrop-blur-sm p-3">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── Navigation ─── */}
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

      {/* Image Lightbox */}
      <ImageLightbox
        images={galleryImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}

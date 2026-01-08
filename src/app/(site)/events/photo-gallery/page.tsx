"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Gallery categories based on HPRC website
const galleryCategories = [
  {
    id: "facilities",
    name: "Facilities",
    description: "Our world-class amenities and infrastructure",
    albums: [
      {
        id: "interior",
        title: "HPRC Interior",
        coverImage: "/documents/gallery/chukkers/cha01.jpeg",
        images: [
          "/documents/gallery/chukkers/cha01.jpeg",
          "/documents/gallery/chukkers/cha4.jpeg",
          "/documents/gallery/chukkers/cha5.jpeg",
          "/documents/gallery/snaffles/bis01.jpeg",
          "/documents/gallery/snaffles/bis02.jpeg",
          "/documents/gallery/snaffles/bis03.jpeg",
        ],
      },
      {
        id: "tennis",
        title: "Tennis Courts",
        coverImage: "/documents/gallery/tennis/TennisCourt01.jpg",
        images: [
          "/documents/gallery/tennis/TennisCourt01.jpg",
          "/documents/gallery/tennis/001.jpeg",
          "/documents/gallery/tennis/002.jpg",
          "/documents/gallery/tennis/003.jpg",
          "/documents/gallery/tennis/004.jpg",
        ],
      },
      {
        id: "badminton",
        title: "Badminton",
        coverImage: "/documents/gallery/badminton/bad.jpg",
        images: [
          "/documents/gallery/badminton/bad.jpg",
          "/documents/gallery/badminton/bad1.jpeg",
          "/documents/gallery/badminton/bad2.jpg",
        ],
      },
      {
        id: "squash",
        title: "Squash",
        coverImage: "/documents/gallery/squash/Bg-Home-015.jpg",
        images: [
          "/documents/gallery/squash/Bg-Home-015.jpg",
          "/documents/gallery/squash/squ1.jpeg",
          "/documents/gallery/squash/squ2.jpeg",
          "/documents/gallery/squash/squ3.jpeg",
          "/documents/gallery/squash/squ4.jpeg",
        ],
      },
      {
        id: "basketball",
        title: "Basketball Courts",
        coverImage: "/documents/gallery/basketball/Bg-Home-017.jpg",
        images: [
          "/documents/gallery/basketball/Bg-Home-017.jpg",
          "/documents/gallery/basketball/ball1.jpeg",
          "/documents/gallery/basketball/ball2.jpeg",
          "/documents/gallery/basketball/ball3.jpeg",
          "/documents/gallery/basketball/ball4.jpeg",
          "/documents/gallery/basketball/ball5.jpeg",
        ],
      },
      {
        id: "swimming",
        title: "Swimming Pool",
        coverImage: "/documents/gallery/swimming/pool1.jpg",
        images: [
          "/documents/gallery/swimming/pool1.jpg",
          "/documents/gallery/swimming/pool2.jpg",
          "/documents/gallery/swimming/pool3.jpg",
          "/documents/gallery/swimming/pool4.jpg",
        ],
      },
      {
        id: "futsal",
        title: "Futsal",
        coverImage: "/documents/gallery/futsal/Bg-Home-018.jpg",
        images: [
          "/documents/gallery/futsal/Bg-Home-018.jpg",
          "/documents/gallery/futsal/f01.jpeg",
          "/documents/gallery/futsal/f02.jpeg",
          "/documents/gallery/futsal/f03.jpeg",
          "/documents/gallery/futsal/f04.jpg",
        ],
      },
      {
        id: "gym",
        title: "Gym",
        coverImage: "/documents/gallery/gym/Bg-Home-019.jpg",
        images: [
          "/documents/gallery/gym/Bg-Home-019.jpg",
          "/documents/gallery/gym/gym.jpg",
          "/documents/gallery/gym/g01.jpeg",
          "/documents/gallery/gym/g02.jpeg",
          "/documents/gallery/gym/g03.jpeg",
          "/documents/gallery/gym/g04.jpeg",
        ],
      },
      {
        id: "sauna",
        title: "Sauna",
        coverImage: "/documents/gallery/sauna/Bg-Home-020.jpg",
        images: [
          "/documents/gallery/sauna/Bg-Home-020.jpg",
          "/documents/gallery/sauna/Sauna.jpg",
          "/documents/gallery/sauna/Sauna_2.jpg",
        ],
      },
    ],
  },
  {
    id: "events",
    name: "Events & Championships",
    description: "Memorable moments from our tournaments and celebrations",
    albums: [
      {
        id: "nec-2016",
        title: "National Equestrian Championship 2016",
        coverImage: "/documents/gallery/events/nec-2016/001.jpg",
        year: "2016",
        date: "2016",
        images: [
          "/documents/gallery/events/nec-2016/001.jpg",
          "/documents/gallery/events/nec-2016/002.jpg",
          "/documents/gallery/events/nec-2016/003.jpg",
          "/documents/gallery/events/nec-2016/004.jpg",
          "/documents/gallery/events/nec-2016/005.jpg",
          "/documents/gallery/events/nec-2016/006.jpg",
          "/documents/gallery/events/nec-2016/007.jpg",
          "/documents/gallery/events/nec-2016/008.jpg",
          "/documents/gallery/events/nec-2016/009.jpg",
          "/documents/gallery/events/nec-2016/010.jpg",
          "/documents/gallery/events/nec-2016/011.jpg",
          "/documents/gallery/events/nec-2016/012.jpg",
          "/documents/gallery/events/nec-2016/013.jpg",
          "/documents/gallery/events/nec-2016/014.jpg",
          "/documents/gallery/events/nec-2016/015.jpg",
          "/documents/gallery/events/nec-2016/016.jpg",
          "/documents/gallery/events/nec-2016/017.jpg",
          "/documents/gallery/events/nec-2016/018.jpg",
          "/documents/gallery/events/nec-2016/019.jpg",
          "/documents/gallery/events/nec-2016/020.jpg",
          "/documents/gallery/events/nec-2016/021.jpg",
          "/documents/gallery/events/nec-2016/023.jpg",
          "/documents/gallery/events/nec-2016/024.jpg",
          "/documents/gallery/events/nec-2016/025.jpg",
          "/documents/gallery/events/nec-2016/026.jpg",
          "/documents/gallery/events/nec-2016/027.jpg",
          "/documents/gallery/events/nec-2016/028.jpg",
          "/documents/gallery/events/nec-2016/029.jpg",
          "/documents/gallery/events/nec-2016/030.jpg",
          "/documents/gallery/events/nec-2016/031.jpg",
          "/documents/gallery/events/nec-2016/032.jpg",
          "/documents/gallery/events/nec-2016/033.jpg",
          "/documents/gallery/events/nec-2016/034.jpg",
        ],
      },
      {
        id: "regional-equestrian-2016",
        title: "1st Regional Equestrian League & 10th Hyderabad Horse Show",
        coverImage: "/documents/gallery/events/1st-rel/001.jpg",
        year: "2016",
        date: "2016",
        images: [
          "/documents/gallery/events/1st-rel/001.jpg",
          "/documents/gallery/events/1st-rel/002.jpg",
          "/documents/gallery/events/1st-rel/003.jpg",
          "/documents/gallery/events/1st-rel/004.jpg",
          "/documents/gallery/events/1st-rel/005.jpg",
          "/documents/gallery/events/1st-rel/006.jpg",
          "/documents/gallery/events/1st-rel/007.jpg",
          "/documents/gallery/events/1st-rel/008.jpg",
          "/documents/gallery/events/1st-rel/009.jpg",
          "/documents/gallery/events/1st-rel/010.jpg",
          "/documents/gallery/events/1st-rel/011.jpg",
          "/documents/gallery/events/1st-rel/012.jpg",
          "/documents/gallery/events/1st-rel/013.jpg",
          "/documents/gallery/events/1st-rel/014.jpg",
          "/documents/gallery/events/1st-rel/015.jpg",
          "/documents/gallery/events/1st-rel/016.jpg",
          "/documents/gallery/events/1st-rel/017.jpg",
          "/documents/gallery/events/1st-rel/018.jpg",
          "/documents/gallery/events/1st-rel/019.jpg",
          "/documents/gallery/events/1st-rel/020.jpg",
          "/documents/gallery/events/1st-rel/021.jpg",
          "/documents/gallery/events/1st-rel/023.jpg",
          "/documents/gallery/events/1st-rel/024.jpg",
          "/documents/gallery/events/1st-rel/025.jpg",
        ],
      },
      {
        id: "horse-show-4-2015",
        title: "Fourth Hyderabad Horse Show – 11 Oct 2015",
        coverImage: "/documents/gallery/events/fourth-horse-show-2015/001.jpg",
        year: "2015",
        date: "11 Oct 2015",
        images: [
          "/documents/gallery/events/fourth-horse-show-2015/001.jpg",
          "/documents/gallery/events/fourth-horse-show-2015/002.jpg",
          "/documents/gallery/events/fourth-horse-show-2015/003.jpg",
          "/documents/gallery/events/fourth-horse-show-2015/004.jpg",
          "/documents/gallery/events/fourth-horse-show-2015/005.jpg",
          "/documents/gallery/events/fourth-horse-show-2015/006.jpg",
        ],
      },
      {
        id: "independence-day-2015",
        title: "Independence Day Celebration – 15 Aug 2015",
        coverImage: "/documents/gallery/events/independence-day-2015/001.jpg",
        year: "2015",
        date: "15 Aug 2015",
        images: [
          "/documents/gallery/events/independence-day-2015/001.jpg",
          "/documents/gallery/events/independence-day-2015/002.jpg",
          "/documents/gallery/events/independence-day-2015/003.jpg",
          "/documents/gallery/events/independence-day-2015/004.jpg",
          "/documents/gallery/events/independence-day-2015/005.jpg",
        ],
      },
      {
        id: "horse-show-3-2015",
        title: "Third Hyderabad Horse Show – 03 May 2015",
        coverImage: "/documents/gallery/events/third-horse-show-2015/001.jpg",
        year: "2015",
        date: "03 May 2015",
        images: [
          "/documents/gallery/events/third-horse-show-2015/001.jpg",
          "/documents/gallery/events/third-horse-show-2015/002.jpg",
          "/documents/gallery/events/third-horse-show-2015/003.jpg",
          "/documents/gallery/events/third-horse-show-2015/004.jpg",
          "/documents/gallery/events/third-horse-show-2015/005.jpg",
          "/documents/gallery/events/third-horse-show-2015/006.jpg",
          "/documents/gallery/events/third-horse-show-2015/007.jpg",
          "/documents/gallery/events/third-horse-show-2015/008.jpg",
          "/documents/gallery/events/third-horse-show-2015/009.jpg",
          "/documents/gallery/events/third-horse-show-2015/010.jpg",
          "/documents/gallery/events/third-horse-show-2015/011.jpg",
          "/documents/gallery/events/third-horse-show-2015/012.jpg",
        ],
      },
      {
        id: "cross-country-2015",
        title: "Cross Country Riding – 18 Jan 2015",
        coverImage: "/documents/gallery/events/cross-country-2015/001.jpg",
        year: "2015",
        date: "18 Jan 2015",
        images: [
          "/documents/gallery/events/cross-country-2015/001.jpg",
          "/documents/gallery/events/cross-country-2015/002.jpg",
          "/documents/gallery/events/cross-country-2015/003.jpg",
          "/documents/gallery/events/cross-country-2015/004.jpg",
          "/documents/gallery/events/cross-country-2015/005.jpg",
          "/documents/gallery/events/cross-country-2015/006.jpg",
          "/documents/gallery/events/cross-country-2015/007.jpg",
          "/documents/gallery/events/cross-country-2015/008.jpg",
          "/documents/gallery/events/cross-country-2015/009.jpg",
          "/documents/gallery/events/cross-country-2015/010.jpg",
          "/documents/gallery/events/cross-country-2015/011.jpg",
          "/documents/gallery/events/cross-country-2015/012.jpg",
          "/documents/gallery/events/cross-country-2015/013.jpg",
          "/documents/gallery/events/cross-country-2015/014.jpg",
          "/documents/gallery/events/cross-country-2015/015.jpg",
        ],
      },
      {
        id: "horse-show-2-2014",
        title: "Second Hyderabad Horse Show – 13 Dec 2014",
        coverImage: "/documents/gallery/events/second-horse-show-2014/001.jpg",
        year: "2014",
        date: "13 Dec 2014",
        images: [
          "/documents/gallery/events/second-horse-show-2014/001.jpg",
          "/documents/gallery/events/second-horse-show-2014/002.jpg",
          "/documents/gallery/events/second-horse-show-2014/003.jpg",
          "/documents/gallery/events/second-horse-show-2014/004.jpg",
          "/documents/gallery/events/second-horse-show-2014/005.jpg",
          "/documents/gallery/events/second-horse-show-2014/006.jpg",
          "/documents/gallery/events/second-horse-show-2014/007.jpg",
          "/documents/gallery/events/second-horse-show-2014/008.jpg",
          "/documents/gallery/events/second-horse-show-2014/009.jpg",
          "/documents/gallery/events/second-horse-show-2014/010.jpg",
        ],
      },
      {
        id: "horse-show-1-2014",
        title: "First Hyderabad Horse Show – 18 Nov 2014",
        coverImage: "/documents/gallery/events/first-horse-show-2014/001.jpg",
        year: "2014",
        date: "18 Nov 2014",
        images: [
          "/documents/gallery/events/first-horse-show-2014/001.jpg",
          "/documents/gallery/events/first-horse-show-2014/002.jpg",
          "/documents/gallery/events/first-horse-show-2014/003.jpg",
          "/documents/gallery/events/first-horse-show-2014/004.jpg",
          "/documents/gallery/events/first-horse-show-2014/005.jpg",
          "/documents/gallery/events/first-horse-show-2014/006.jpg",
          "/documents/gallery/events/first-horse-show-2014/007.jpg",
          "/documents/gallery/events/first-horse-show-2014/008.jpg",
          "/documents/gallery/events/first-horse-show-2014/009.jpg",
        ],
      },
      {
        id: "arena-polo-2013-sep",
        title: "Arena Polo Championship - 22 Sep 2013",
        coverImage: "/documents/gallery/events/arena-polo-2013-sep/001.jpg",
        year: "2013",
        date: "22 Sep 2013",
        images: [
          "/documents/gallery/events/arena-polo-2013-sep/001.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/002.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/003.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/004.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/005.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/006.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/007.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/008.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/009.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/010.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/011.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/012.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/013.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/014.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/015.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/016.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/017.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/018.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/019.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/020.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/021.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/023.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/024.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/025.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/026.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/027.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/028.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/029.jpg",
          "/documents/gallery/events/arena-polo-2013-sep/030.jpg",
        ],
      },
      {
        id: "polo-art-2013",
        title: "Confluence Polo and Art – 01 June 2013",
        coverImage: "/documents/gallery/events/polo-art-2013/001.jpg",
        year: "2013",
        date: "01 June 2013",
        images: [
          "/documents/gallery/events/polo-art-2013/001.jpg",
          "/documents/gallery/events/polo-art-2013/002.jpg",
          "/documents/gallery/events/polo-art-2013/003.jpg",
          "/documents/gallery/events/polo-art-2013/004.jpg",
          "/documents/gallery/events/polo-art-2013/005.jpg",
          "/documents/gallery/events/polo-art-2013/006.jpg",
          "/documents/gallery/events/polo-art-2013/007.jpg",
          "/documents/gallery/events/polo-art-2013/008.jpg",
          "/documents/gallery/events/polo-art-2013/009.jpg",
          "/documents/gallery/events/polo-art-2013/010.jpg",
          "/documents/gallery/events/polo-art-2013/011.jpg",
          "/documents/gallery/events/polo-art-2013/012.jpg",
          "/documents/gallery/events/polo-art-2013/013.jpg",
          "/documents/gallery/events/polo-art-2013/014.jpg",
          "/documents/gallery/events/polo-art-2013/015.jpg",
        ],
      },
      {
        id: "mumbai-season-2013",
        title: "HPRC Mumbai Season 2013 – 29th Mar 2013",
        coverImage: "/documents/gallery/events/mumbai-season-2013/001.jpg",
        year: "2013",
        date: "29th Mar 2013",
        images: [
          "/documents/gallery/events/mumbai-season-2013/001.jpg",
          "/documents/gallery/events/mumbai-season-2013/002.jpg",
          "/documents/gallery/events/mumbai-season-2013/003.jpg",
          "/documents/gallery/events/mumbai-season-2013/004.jpg",
          "/documents/gallery/events/mumbai-season-2013/005.jpg",
          "/documents/gallery/events/mumbai-season-2013/006.jpg",
          "/documents/gallery/events/mumbai-season-2013/007.jpg",
          "/documents/gallery/events/mumbai-season-2013/008.jpg",
          "/documents/gallery/events/mumbai-season-2013/009.jpg",
          "/documents/gallery/events/mumbai-season-2013/010.jpg",
          "/documents/gallery/events/mumbai-season-2013/011.jpg",
          "/documents/gallery/events/mumbai-season-2013/012.jpg",
          "/documents/gallery/events/mumbai-season-2013/013.jpg",
          "/documents/gallery/events/mumbai-season-2013/014.jpg",
          "/documents/gallery/events/mumbai-season-2013/015.jpg",
          "/documents/gallery/events/mumbai-season-2013/016.jpg",
          "/documents/gallery/events/mumbai-season-2013/017.jpg",
          "/documents/gallery/events/mumbai-season-2013/018.jpg",
          "/documents/gallery/events/mumbai-season-2013/019.jpg",
          "/documents/gallery/events/mumbai-season-2013/020.jpg",
          "/documents/gallery/events/mumbai-season-2013/021.jpg",
          "/documents/gallery/events/mumbai-season-2013/023.jpg",
          "/documents/gallery/events/mumbai-season-2013/024.jpg",
        ],
      },
      {
        id: "arena-polo-2012",
        title: "Arena Polo Championship - 17 Sep 2012",
        coverImage: "/documents/gallery/events/arena-polo-2012/001.jpg",
        year: "2012",
        date: "17 Sep 2012",
        images: [
          "/documents/gallery/events/arena-polo-2012/001.jpg",
          "/documents/gallery/events/arena-polo-2012/002.jpg",
          "/documents/gallery/events/arena-polo-2012/003.jpg",
          "/documents/gallery/events/arena-polo-2012/004.jpg",
          "/documents/gallery/events/arena-polo-2012/005.jpg",
          "/documents/gallery/events/arena-polo-2012/006.jpg",
          "/documents/gallery/events/arena-polo-2012/007.jpg",
          "/documents/gallery/events/arena-polo-2012/008.jpg",
          "/documents/gallery/events/arena-polo-2012/009.jpg",
          "/documents/gallery/events/arena-polo-2012/010.jpg",
          "/documents/gallery/events/arena-polo-2012/011.jpg",
          "/documents/gallery/events/arena-polo-2012/012.jpg",
          "/documents/gallery/events/arena-polo-2012/013.jpg",
          "/documents/gallery/events/arena-polo-2012/014.jpg",
          "/documents/gallery/events/arena-polo-2012/015.jpg",
          "/documents/gallery/events/arena-polo-2012/016.jpg",
          "/documents/gallery/events/arena-polo-2012/017.jpg",
          "/documents/gallery/events/arena-polo-2012/018.jpg",
          "/documents/gallery/events/arena-polo-2012/019.jpg",
          "/documents/gallery/events/arena-polo-2012/020.jpg",
          "/documents/gallery/events/arena-polo-2012/021.jpg",
          "/documents/gallery/events/arena-polo-2012/023.jpg",
          "/documents/gallery/events/arena-polo-2012/024.jpg",
          "/documents/gallery/events/arena-polo-2012/025.jpg",
          "/documents/gallery/events/arena-polo-2012/026.jpg",
          "/documents/gallery/events/arena-polo-2012/027.jpg",
        ],
      },
      {
        id: "tennis-camp",
        title: "Tennis Camp by Sports Village at HPRC",
        coverImage: "/documents/gallery/events/tennis-camp/001.jpg",
        year: "",
        date: "",
        images: [
          "/documents/gallery/events/tennis-camp/001.jpg",
          "/documents/gallery/events/tennis-camp/002.jpg",
          "/documents/gallery/events/tennis-camp/003.jpg",
          "/documents/gallery/events/tennis-camp/004.jpg",
          "/documents/gallery/events/tennis-camp/005.jpg",
          "/documents/gallery/events/tennis-camp/006.jpg",
        ],
      },
    ],
  },
];

export default function PhotoGalleryPage() {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const allAlbums = galleryCategories.flatMap((cat) => 
    cat.albums.map((album) => ({ ...album, category: cat.id }))
  );

  const filteredAlbums = activeCategory === "all" 
    ? allAlbums 
    : allAlbums.filter((album) => album.category === activeCategory);

  const currentAlbum = selectedAlbum 
    ? allAlbums.find((a) => a.id === selectedAlbum) 
    : null;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container px-4 relative">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-brand-500" />
              <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">
                Media
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Photo{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-cyan-400">
                Gallery
              </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed mb-8">
              Browse curated albums of our world-class facilities, tournaments, training camps, 
              and memorable events at Hyderabad Polo & Riding Club.
            </p>

            <a
              href="mailto:info@hprc.co.in"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white hover:bg-white/5 px-6 py-3 rounded-full text-sm font-medium transition-all"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Request High-Res Images
            </a>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
        <div className="container px-4">
          <div className="flex items-center gap-2 py-4 overflow-x-auto">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === "all"
                  ? "bg-brand-500 text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              All Albums
            </button>
            {galleryCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? "bg-brand-500 text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Albums Grid */}
      <section className="py-12 sm:py-16">
        <div className="container px-4">
          {/* Category Headers */}
          {activeCategory === "all" ? (
            galleryCategories.map((category) => (
              <div key={category.id} className="mb-16">
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {category.name}
                  </h2>
                  <p className="text-slate-400">{category.description}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {category.albums.map((album) => (
                    <AlbumCard
                      key={album.id}
                      album={album}
                      onClick={() => album.images.length > 0 && setSelectedAlbum(album.id)}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredAlbums.map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  onClick={() => album.images.length > 0 && setSelectedAlbum(album.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Album Modal */}
      {selectedAlbum && currentAlbum && (
        <div className="fixed inset-0 z-50 bg-black/95 overflow-y-auto">
          <div className="min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10">
              <div className="container px-4 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">{currentAlbum.title}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    {(currentAlbum.date || currentAlbum.year) && (
                      <p className="text-sm text-brand-400 font-medium">
                        {currentAlbum.date || currentAlbum.year}
                      </p>
                    )}
                    <p className="text-sm text-slate-400">{currentAlbum.images.length} photos</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Images Grid */}
            <div className="container px-4 py-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentAlbum.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setLightboxImage(image)}
                    className="group relative aspect-square overflow-hidden rounded-lg bg-slate-800"
                  >
                    <Image
                      src={image}
                      alt={`${currentAlbum.title} - Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={lightboxImage}
              alt="Full size image"
              fill
              className="object-contain"
              sizes="100vw"
        />
      </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-t from-slate-900 to-slate-950">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Want to Share Your Photos?
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              If you have photos from HPRC events that you&apos;d like to share, 
              or need high-resolution images for press or personal use, get in touch with our media team.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:info@hprc.co.in"
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-full font-semibold transition-all"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Media Team
              </a>
              <Link
                href="/events/video-gallery"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white hover:bg-white/5 px-6 py-3 rounded-full font-semibold transition-all"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View Video Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Album Card Component
function AlbumCard({ 
  album, 
  onClick 
}: { 
  album: { 
    id: string; 
    title: string; 
    coverImage: string; 
    images: string[]; 
    year?: string;
    date?: string;
  }; 
  onClick: () => void;
}) {
  const hasImages = album.images.length > 0;
  const displayDate = album.date || album.year || "";
  
  return (
    <button
      onClick={onClick}
      disabled={!hasImages}
      className={`group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-800 text-left ${
        hasImages ? "cursor-pointer" : "cursor-default opacity-75"
      }`}
    >
      <Image
        src={album.coverImage}
        alt={album.title}
        fill
        className={`object-cover transition-transform duration-700 ${
          hasImages ? "group-hover:scale-110" : ""
        }`}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
      />
      
      {/* Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent ${
        hasImages ? "group-hover:from-black/90" : ""
      } transition-colors duration-300`} />
      
      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        {displayDate && (
          <span className="text-brand-400 text-xs font-medium mb-1">{displayDate}</span>
        )}
        <h3 className="text-white font-semibold text-sm sm:text-base leading-tight line-clamp-2">
          {album.title}
        </h3>
        {hasImages && (
          <span className="text-white/60 text-xs mt-1">
            {album.images.length} photos
          </span>
        )}
        {!hasImages && (
          <span className="text-white/40 text-xs mt-1 italic">
            Coming soon
          </span>
        )}
      </div>

      {/* Hover Icon */}
      {hasImages && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
        </div>
      )}
    </button>
  );
}

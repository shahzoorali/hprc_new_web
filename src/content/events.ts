export type NewsArticle = {
  title: string;
  date: string;
  source: string;
  excerpt: string;
  url: string;
  category?: string;
  imageUrl?: string;
};

export type UpcomingEvent = {
  title: string;
  date: string;
  description: string;
  link?: string;
};

export type EventHighlight = {
  title: string;
  description: string;
  link: string;
  image?: string;
};

export const eventsContent = {
  hero: {
    eyebrow: "Events & Media",
    title: "From arena polo to global collaborations",
    description:
      "HPRC hosts national and international tournaments, cultural showcases, and media collaborations that celebrate the sport, athletes, and community behind it.",
  },
  news: [
    {
      title: "HPRC Wins Arena Polo Club of the Season at The Indian Polo Awards",
      date: "March 24, 2026",
      source: "LA POLO",
      excerpt: "A season defined by precision and poise. Hyderabad Polo & Riding Club (HPRC) takes home 'Arena Polo Club of the Season' at The Indian Polo Awards Season V, with Chaitania R. Kumar receiving the honour.",
      url: "https://www.instagram.com/p/DWQf6T6COAc/",
      category: "Awards",
      imageUrl: "/documents/news/arena-polo-club-of-the-season.jpg",
    },
    {
      title: "India wins both cups at Hyderabad International Polo Cup 2026",
      date: "19 February, 2026",
      source: "LA POLO",
      excerpt:
        "India claimed the Radha TMT (4-Goal) and Telangana Tourism (6-Goal) championships. Salim Azmi was named MVP in the 6-goal final. Full results and coverage on the championship page.",
      url: "/events/news/hyderabad-international-polo-cup-2026-india-wins-both-cups",
      category: "Championship",
      imageUrl: "/images/india-team-trophy-2026.png",
    },
    {
      title: "International Arena Polo Championship 2026: HPRC Unveils Official Tournament T-Shirt",
      date: "30 January, 2026",
      source: "HPRC News",
      excerpt:
        "HPRC has advanced its preparations for the International Arena Polo Championship 2026 with the unveiling of the official tournament T-shirt and the formal presentation of the event invitation to Mohammed Azharuddin, Hon'ble Minister for Public Enterprises and Minority Affairs, Government of Telangana, at the Telangana Secretariat.",
      url: "/events/news/international-arena-polo-championship-2026-tshirt-unveiling",
      category: "Championship",
      imageUrl: "/documents/news/azharuddin-2026/tshirt-unveiling.png",
    },
    {
      title: "Championship Weekend to Feature 4-Goal Final and “Galloping Wheels” Showcase",
      date: "31 January, 2026",
      source: "HPRC News",
      excerpt:
        "HPRC has invited Ponnam Prabhakar, Hon'ble Minister for Transport & BC Welfare, Government of Telangana, as Guest of Honour for the 4-goal final on 15 February 2026. The weekend will also feature the Galloping Wheels Vintage & Super Cars Display.",
      url: "/events/news/championship-weekend-4-goal-galloping-wheels",
      category: "Championship",
      imageUrl: "/documents/news/galloping-wheels-2026/championship-weekend-chukker.png",
    },
    {
      title: "HPRC represents India at the 2024 USA-India arena polo challenge",
      date: "October 6, 2024",
      source: "Deccan Chronicle",
      excerpt:
        "HPRC riders represented India at the Buddy Combs International Arena Challenge at Lakeside Polo Club, San Diego, where Arsalan Khan earned MVP honors in a thrilling 14-12 finish.",
      url: "/events/news/hprc-hawaii-match-2024",
      category: "International",
      imageUrl: "/documents/news/hawaii-2024/DayPoloAction01.jpeg",
    },
    {
      title: "Chaitania Kumar and Arsalan Khan shine on the international stage",
      date: "2024",
      source: "HPRC News",
      excerpt:
        "Two Hyderabadis - Chaitania R. Kumar and Arsalan Khan are part of the three-member Indian Arena Polo team which will participate in international competitions.",
      url: "/events/news/chaitania-kumar-arsalan-khan-international-stage",
      category: "International",
      imageUrl: "/documents/news/dcmain.jpg",
    },
    {
      title: "HPRC to launch all inclusive Silver Spur Sports Arena",
      date: "2024",
      source: "HPRC News",
      excerpt:
        "Hyderabad Polo & Riding Club announces the launch of the all-inclusive Silver Spur Sports Arena, expanding its world-class sports facilities.",
      url: "/events/news/hprc-silver-spur-sports-arena",
      category: "Facilities",
      imageUrl: "/documents/news/news01.jpeg",
    },
    {
      title: "Academia Sports Village Certificate Distribution Ceremony",
      date: "2024",
      source: "HPRC News",
      excerpt:
        "Certificate distribution ceremony for Junior Camp Workshop participants at Academia Sports Village, celebrating the achievements of young athletes.",
      url: "/events/news/academia-sports-village-certificate-distribution",
      category: "Events",
      imageUrl: "/documents/news/academia-Sports-Village-Certificate-Distribution-Ceremony01.png",
    },
    {
      title: "HPRC joins hands with Academia Sports Village",
      date: "2024",
      source: "HPRC News",
      excerpt:
        "A strategic partnership between HPRC and Academia Sports Village to deliver year-round coaching programmes, international camps, and athlete development pathways.",
      url: "/events/news/hprc-academia-sports-village",
      category: "Partnership",
      imageUrl: "/documents/news/HPRC-joins-hands-with-Sports-Village-02.png",
    },
    {
      title: "1st Regional Equestrian League & 10th Hyderabad Horse Show",
      date: "September 22-23, 2018",
      source: "HPRC News",
      excerpt:
        "Hyderabad Polo & Riding Club hosted the 1st Regional Equestrian League in association with TSEA. Events such as Dressage, Show Jumping & Tent Pegging in different categories were conducted.",
      url: "/events/1st-rel-10th-hyd-horse-show",
      category: "Tournament",
      imageUrl: "/documents/news/News-1st-rel-Thumb01.jpg",
    },
    {
      title: "Tennis Camp by Sports Village at HPRC",
      date: "2024",
      source: "HPRC News",
      excerpt:
        "Sports Village conducted a comprehensive tennis camp at HPRC, providing training and development opportunities for tennis enthusiasts.",
      url: "/events/news/tennis-camp-sports-village-hprc",
      category: "Training",
      imageUrl: "/documents/news/Sports-Village-HPRC-02.jpg",
    },
    {
      title: "HPRC Partners with Sports Village",
      date: "2024",
      source: "HPRC News",
      excerpt:
        "Hyderabad Polo & Riding Club announces partnership with Sports Village to enhance sports training and development programs.",
      url: "/events/news/hprc-partners-sports-village",
      category: "Partnership",
      imageUrl: "/documents/news/SportsVillage01.jpg",
    },
    {
      title: "ARENA POLO TOURNAMENT 2016",
      date: "April 11-17, 2016",
      source: "HPRC News",
      excerpt:
        "Multiple exciting tournaments including HPRC Rolling Trophy (4 Goal), Telangana Cup (6 Goal), and Sponsor's Exhibition Match held at HPRC.",
      url: "/events/arena-polo-tournament-2016",
      category: "Tournament",
      imageUrl: "/documents/news/arena-polo-tournament-2016-01.jpg",
    },
    {
      title: "Press Coverage Articles - National Equestrian Championship 2016",
      date: "2016",
      source: "HPRC News",
      excerpt:
        "Comprehensive press coverage and articles highlighting the National Equestrian Championship 2016 held at HPRC.",
      url: "/events/news/press-coverage-nec-2016",
      category: "Media",
      imageUrl: "/documents/news/News-NEC-2016.jpg",
    },
    {
      title: "National Equestrian Championship, 2016",
      date: "2016",
      source: "HPRC News",
      excerpt:
        "HPRC and TSEA co-hosted a landmark national championship with 200 horses and the country's leading riders competing across five categories.",
      url: "/events/news/national-equestrian-championship-2016-news",
      category: "Championship",
      imageUrl: "/documents/news/national-equestrian-championship16.jpg",
    },
    {
      title: "All about Olympic Equestrian Sports",
      date: "2016",
      source: "HPRC News",
      excerpt:
        "An informative article covering Olympic equestrian sports, disciplines, and the journey of equestrian athletes in competitive sports.",
      url: "/events/news/all-about-olympic-equestrian-sports",
      category: "Education",
      imageUrl: "/documents/news/all-about-olympic-equestrian-sports.jpg",
    },
    {
      title: "National Equestrian Championship Kicks off!",
      date: "2016",
      source: "HPRC News",
      excerpt:
        "The National Equestrian Championship 2016 officially kicks off at HPRC, marking the beginning of an exciting competition season.",
      url: "/events/news/national-equestrian-championship-kicks-off",
      category: "Championship",
      imageUrl: "/documents/news/NewsNEC-kicks-off.jpg",
    },
    {
      title: "HPRC Wins 'Best Arena Polo Club' in India at The Indian Polo Awards 2025",
      date: "February 22, 2025",
      source: "LA POLO",
      excerpt:
        "At the historic City Palace, Jaipur, HPRC was recognized as the first-ever winner of the 'Arena Polo Club of the Season' award, a testament to the club's pioneering role in the evolution of Arena Polo in India.",
      url: "/events/news/best-arena-polo-club-india-awards-2025",
      category: "Awards",
      imageUrl: "/images/hprc-tipa-award2025.jpeg",
    },
    {
      title: "Hyderabad Polo and Riding Club clinch 14-9 win over Telangana",
      date: "November 18, 2025",
      source: "Telangana Today",
      excerpt:
        "Hyderabad Polo and Riding Club defeated Telangana Polo Club 14-9 in the MSN Realty Arena Polo Championship at HPRC. Arsalan Khan starred with six goals, while Chaitania Kumar and Saif Attari added crucial strikes to seal the victory.",
      url: "https://telanganatoday.com/hyderabad-polo-and-riding-club-clinch-14-9-win-over-telangana",
      category: "Tournament",
      imageUrl: "/documents/news/hyderabad-polo-riding-club-win.webp",
    },
    {
      title:
        "Hyderabad hosts national polo team's intensive camp for FIP world championship playoffs",
      date: "April 6, 2025",
      source: "NewsMeter",
      excerpt:
        "The Indian National Arena Polo Team has begun an intensive training camp at HPRC from April 5 to 12, ahead of the zone 'E' playoffs of the II FIP Arena Polo World Championship. The playoffs will be held in Saudi Arabia from April 21 to 26.",
      url: "https://newsmeter.in/hyderabad/hyderabad-hosts-national-polo-teams-intensive-camp-for-fip-world-championship-playoffs-from-april-21-746444",
      category: "International",
      imageUrl: "/documents/news/national-polo-team-camp.webp",
    },
    {
      title:
        "Sauryaram Varma clinches title in Jumping CH-1 80 cm at Telangana Equestrian Competition",
      date: "October 28, 2025",
      source: "Telangana Today",
      excerpt:
        "Sauryaram Varma of Archi Horse Riding School claimed the Jumping CH-1 80 cm category title at the Regional Equestrian League (REL) and Telangana State Equestrian Competition held at the Hyderabad Polo and Riding Club in Moinabad.",
      url: "https://telanganatoday.com/sauryaram-varma-clinches-title-in-jumping-ch-1-80-cm-at-telangana-equestrian-competition",
      category: "Competition",
      imageUrl: "/documents/news/sauryaram-varma-equestrian.webp",
    },
  ] satisfies NewsArticle[],
  upcoming: [
    {
      title: "HPRC Equestrian Challenge 2026 — August Season",
      date: "14–16 August 2026",
      description:
        "Hacks, Dressage & Show Jumping across all age categories at Hyderabad Polo & Riding Club, Gandipet. Morning and floodlit evening sessions over three days, with prize money up to ₹25,000 in Open Show Jumping. Entries close 13 August 2026 at 6 PM.",
      link: "/events/2nd-equestrian-challenge-2026",
    },
  ] as UpcomingEvent[],
  pastHighlights: [
    {
      title: "HPRC Equestrian Challenge 2026",
      description:
        "The inaugural HPRC Equestrian Challenge concluded with 126+ riders from 30+ clubs competing across Show Jumping, Dressage, Hacks, and Top Score. View official results from the evening (16 May) and morning (17 May) sessions.",
      link: "/events/news/ec2026-results-17-may-morning-session",
      image: "/images/ec2026/aamir-shahnawaz-1.jpg",
    },
    {
      title: "HPRC World Arena Polo Championship 2026",
      description:
        "Event concluded. India won both the Radha TMT (4-Goal) and Telangana Tourism (6-Goal) cups. Full results, schedule, and press coverage on the event page.",
      link: "/events/world-arena-polo-championship-2026",
      image: "/images/india-team-trophy-2026.png",
    },
    {
      title: "1st Regional Equestrian League & 10th Hyderabad Horse Show",
      description:
        "Hyderabad Polo & Riding Club hosted the 1st Regional Equestrian League in association with TSEA on 22nd & 23rd September, 2018. Events such as Dressage, Show Jumping & Tent Pegging in different categories were conducted with 157 participations.",
      link: "/events/1st-rel-10th-hyd-horse-show",
    },
    {
      title: "Arena Polo Tournament 2016",
      description:
        "Multiple exciting tournaments including HPRC Rolling Trophy (4 Goal), Telangana Cup (6 Goal), and Sponsor's Exhibition Match held from 11th to 17th April, 2016.",
      link: "/events/arena-polo-tournament-2016",
    },
    {
      title: "National Equestrian Championship Calendar 2016",
      description:
        "Comprehensive equestrian competitions and events throughout 2016 featuring national-level championships and tournaments.",
      link: "/events/nec-calendar-2016",
    },
    {
      title: "HPRC International Arena Polo Championship",
      description:
        "Elite international arena polo competition bringing together world-class players for an unforgettable championship experience.",
      link: "/events/hprc-international-arena-polo-championship",
    },
    {
      title: "HPRC Sport Complex",
      description:
        "World-class sports facilities featuring tennis, badminton, squash, swimming, basketball, futsal, gym, and sauna facilities.",
      link: "/events/hprc-sport-complex",
    },
    {
      title: "HPRC joins hands with Academia Sports Village",
      description:
        "A strategic partnership to deliver year-round coaching programmes, international camps, and athlete development pathways across tennis, badminton, and more.",
      link: "/events/news/hprc-academia-sports-village",
    },
    {
      title: "National Equestrian Competition 2016",
      description:
        "HPRC and TSEA co-hosted a landmark national championship with 200 horses and the country's leading riders competing across five categories.",
      link: "/events/past/national-equestrian-2016",
    },
  ] as EventHighlight[],
  media: [
    {
      category: "News",
      summary:
        "Club announcements, international tie-ups, and tournament press releases. Highlights include collaborative initiatives with global academies.",
      href: "/events/news",
    },
    {
      category: "Blogs",
      summary:
        "Insights on horse care, riding technique, sport psychology, and lifestyle articles for riders and members.",
      href: "/events/blogs",
    },
    {
      category: "Newsletters",
      summary:
        "Monthly recaps featuring member achievements, upcoming fixtures, and exclusive invitations.",
      href: "/events/newsletters",
    },
  ],
  galleries: [
    {
      type: "Photo Gallery",
      description:
        "Immersive galleries of tournaments, training camps, hospitality experiences, and member events.",
      href: "/events/photo-gallery",
    },
    {
      type: "Video Gallery",
      description:
        "Highlights from arena matches, rider spotlights, and behind-the-scenes footage of HPRC life.",
      href: "/events/video-gallery",
    },
  ],
};

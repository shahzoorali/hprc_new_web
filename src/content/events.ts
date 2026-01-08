export type NewsArticle = {
  title: string;
  date: string;
  source: string;
  excerpt: string;
  url: string;
  category?: string;
  imageUrl?: string;
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
      title: "HPRC World Arena Polo Championship 2026",
      date: "11th – 18th February 2026",
      description:
        "A week-long celebration of world-class arena polo featuring teams from USA, India, Germany, France, and Luxembourg. Multiple tournaments including 4 Goal and 6 Goal competitions, plus exhibition matches.",
      link: "/events/world-arena-polo-championship-2026",
    },
    {
      title: "International Arena Polo Cup",
      date: "4 – 10 March 2024",
      description:
        "Six elite teams from India, USA, Luxembourg, and Spain compete in a week-long spectacle featuring women's and men's fixtures, supported by Telangana Tourism, Radha TMT, Inhabit, and more.",
    },
    {
      title: "TSEA Regional Equestrian League",
      date: "October 27, 2018 (Archive Highlight)",
      description:
        "Hosted in partnership with Telangana State Equestrian Association featuring dressage, tent pegging, and show jumping categories.",
    },
  ],
  pastHighlights: [
    {
      title: "HPRC joins hands with Academia Sports Village",
      description:
        "A strategic partnership to deliver year-round coaching programmes, international camps, and athlete development pathways across tennis, badminton, and more.",
      link: "/events/news/hprc-academia-sports-village",
    },
    {
      title: "National Equestrian Competition 2016",
      description:
        "HPRC and TSEA co-hosted a landmark national championship with 200 horses and the country’s leading riders competing across five categories.",
      link: "/events/past/national-equestrian-2016",
    },
  ],
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

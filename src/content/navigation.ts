export type NavChild = {
  label: string;
  href: string;
};

export type NavSection = {
  title?: string;
  description?: string;
  image?: string;
  items: NavChild[];
};

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavChild[];
  sections?: NavSection[];
  featured?: {
    title: string;
    description: string;
    href: string;
    label?: string;
    image?: string;
  };
};

export const primaryNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    description: "The Club",
    sections: [
      {
        title: "The Club",
        image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&q=80",
        items: [
          { label: "The Club", href: "/about" },
          { label: "History", href: "/about/heritage" },
          { label: "The Committee", href: "/about/leadership" },
        ],
      },
    ],
    featured: {
      title: "The Club",
      description:
        "Hyderabad Polo & Riding Club (HPRC) is one of the premier equestrian and sports clubs in Hyderabad. Founded in 2005, the Club has a distinguished heritage and remains rich in its traditions of camaraderie and sportsmanship.",
      href: "/about",
      label: "Learn more",
      image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80",
    },
  },
  {
    label: "Programmes",
    href: "/programmes",
    description: "Riding & Polo",
    sections: [
      {
        title: "Programmes",
        image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&q=80",
        items: [
          { label: "Start Riding", href: "/programmes/start-riding" },
          { label: "Beginners Programme", href: "/programmes/beginners" },
          { label: "Intermediate Programme", href: "/programmes/intermediate" },
          { label: "Advanced Polo", href: "/programmes/polo" },
          { label: "Equestrian", href: "/programmes/equestrian" },
          { label: "Stick & Ball", href: "/programmes/stick-and-ball" },
          { label: "Chukkers", href: "/programmes/chukkers" },
        ],
      },
    ],
    featured: {
      title: "Riding Academy",
      description:
        "The Riding Academy offers premier riding and equestrian facilities in Hyderabad for riders 6 years and above. Operating hours are from 6am - 10am and 4pm - 9pm Monday to Sunday.",
      href: "/programmes",
      label: "Learn More",
      image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80",
    },
  },
  {
    label: "Sports Centre",
    href: "/sports-centre",
    description: "Sports and Recreation",
    sections: [
      {
        title: "Sports and Recreation",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
        items: [
          { label: "Tennis", href: "/sports-centre/tennis" },
          { label: "Badminton", href: "/sports-centre/badminton" },
          { label: "Squash", href: "/sports-centre/squash" },
          { label: "Swimming Pool", href: "/sports-centre/swimming" },
          { label: "Basketball", href: "/sports-centre/basketball" },
          { label: "Futsal", href: "/sports-centre/futsal" },
          { label: "Gym", href: "/sports-centre/gym" },
          { label: "Sauna", href: "/sports-centre/sauna" },
          { label: "Gold Package", href: "/sports-centre/gold-package" },
          { label: "Platinum Package", href: "/sports-centre/platinum-package" },
        ],
      },
    ],
    featured: {
      title: "Sports Centre",
      description:
        "HPRC has many options for a sports enthusiast to stay engaged. Besides Polo, equestrian and riding facilities we offer Basketball, Tennis, Squash, Badminton, Swimming and Futsal.",
      href: "/sports-centre",
      label: "Learn More",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    },
  },
  {
    label: "Hospitality",
    href: "/hospitality",
    description: "Dining & Events",
    sections: [
      {
        title: "Dining",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
        items: [
          { label: "Chukkers Restaurant", href: "/hospitality/chukkers" },
          { label: "Snaffles Bistro", href: "/hospitality/snaffles-bistro" },
        ],
      },
      {
        title: "Events",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&q=80",
        items: [
          { label: "Banquets", href: "/hospitality/banquets" },
          { label: "Luxury Rooms", href: "/hospitality/luxury-rooms" },
        ],
      },
    ],
    featured: {
      title: "Dining & Hospitality",
      description:
        "HPRC features two exquisite dining options where members can enjoy a culinary experience. Elegant dining experience at Chukkers and a more relaxed & casual atmosphere at Snaffles Bistro.",
      href: "/hospitality",
      label: "Learn More",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    },
  },
  {
    label: "Membership",
    href: "/membership",
    description: "Be a Member",
    sections: [
      {
        title: "Membership",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80",
        items: [
          { label: "Apply for Membership", href: "/membership/apply" },
          { label: "Member Login", href: "/membership/login" },
          { label: "Pay Now", href: "/membership/pay-now" },
        ],
      },
    ],
    featured: {
      title: "Be a Member",
      description: "Be part of the premium club in Hyderabad and enjoy the exclusivity!",
      href: "/membership",
      label: "Learn How",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80",
    },
  },
  {
    label: "Events & Media",
    href: "/events",
    description: "Events",
    sections: [
      {
        title: "Events",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&q=80",
        items: [
          { label: "Upcoming Events", href: "/events/upcoming" },
          { label: "Past Events", href: "/events/past" },
          { label: "Events Calendar", href: "/events" },
        ],
      },
      {
        title: "Media",
        image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&q=80",
        items: [
          { label: "Newsroom", href: "/events/news" },
          { label: "Blogs", href: "/events/blogs" },
          { label: "Newsletters", href: "/events/newsletters" },
          { label: "Photo Gallery", href: "/events/photo-gallery" },
          { label: "Video Gallery", href: "/events/video-gallery" },
        ],
      },
    ],
    featured: {
      title: "Upcoming events",
      description: "Check out a list of our exciting events coming up!",
      href: "/events",
      label: "View Calendar",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80",
    },
  },
  { label: "Contact", href: "/contact" },
];

export const utilityNavigation: NavChild[] = [
  { label: "Featured Event: World Arena Polo Championship 2026", href: "/events/world-arena-polo-championship-2026" },
];

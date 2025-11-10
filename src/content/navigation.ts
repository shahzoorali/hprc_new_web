export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const primaryNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Club Overview", href: "/about" },
      { label: "Mission, Vision & Values", href: "/about/mission-vision-values" },
      { label: "Managing Committee", href: "/about/leadership" },
      { label: "Heritage Timeline", href: "/about/heritage" },
    ],
  },
  {
    label: "Programmes",
    href: "/programmes",
    children: [
      { label: "Start Riding", href: "/programmes/start-riding" },
      { label: "Beginners Programme", href: "/programmes/beginners" },
      { label: "Intermediate Programme", href: "/programmes/intermediate" },
      { label: "Advanced Polo", href: "/programmes/polo" },
      { label: "Equestrian", href: "/programmes/equestrian" },
      { label: "Stick & Ball", href: "/programmes/stick-and-ball" },
      { label: "Chukkers", href: "/programmes/chukkers" },
    ],
  },
  {
    label: "Sports Centre",
    href: "/sports-centre",
    children: [
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
  {
    label: "Hospitality",
    href: "/hospitality",
    children: [
      { label: "Chukkers Restaurant", href: "/hospitality/chukkers" },
      { label: "Snaffles Bistro", href: "/hospitality/snaffles-bistro" },
      { label: "Banquets", href: "/hospitality/banquets" },
      { label: "Luxury Rooms", href: "/hospitality/luxury-rooms" },
    ],
  },
  {
    label: "Membership",
    href: "/membership",
    children: [
      { label: "Apply for Membership", href: "/membership/apply" },
      { label: "Member Login", href: "/membership/login" },
    ],
  },
  {
    label: "Events & Media",
    href: "/events",
    children: [
      { label: "Events Calendar", href: "/events" },
      { label: "Past Events", href: "/events/past" },
      { label: "Upcoming Events", href: "/events/upcoming" },
      { label: "Newsroom", href: "/events/news" },
      { label: "Blogs", href: "/events/blogs" },
      { label: "Newsletters", href: "/events/newsletters" },
      { label: "Photo Gallery", href: "/events/photo-gallery" },
      { label: "Video Gallery", href: "/events/video-gallery" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const utilityNavigation: NavChild[] = [
  { label: "Member Login", href: "/membership/login" },
  { label: "Pay Now", href: "/membership/pay-now" },
];

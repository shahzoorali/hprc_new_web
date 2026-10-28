// HPRC club tournaments: members-only, individual players, fixed fee, run every
// ~4 months. One entry per edition, shared by the registration form, the success
// page and the admin screens.
//
// The server side lives in payment/club_tournaments.php (same slug). `fee` and
// `registrationOpen` must match it there; the PHP copy is the source of truth for
// what is charged.
//
// To add the next edition: add an entry here and in club_tournaments.php, then add
// a thin page + success page under src/app/(site)/events/<pageSlug>/ that render
// <ClubTournamentRegistration> / <ClubTournamentSuccess> with the new slug.

export type ClubTournament = {
  /** "{sport}-{YYYY}-{MM}", used as the `tournament` key in the database. */
  slug: string;
  /** Event series name, e.g. "HPRC Club Championship". */
  name: string;
  /** What this edition is, e.g. "Polo Tournament". */
  label: string;
  sport: "polo";
  /** Short edition name for lists, e.g. "October 2026". */
  edition: string;
  dateRange: string;
  venue: string;
  /** Entry fee per player, in INR. */
  fee: number;
  registrationOpen: boolean;
  /** Public page path, without trailing slash. The success page is `${pagePath}/success`. */
  pagePath: string;
  description: string;
  heroImage: string;
};

export const clubTournaments: ClubTournament[] = [
  {
    slug: "polo-2026-10",
    name: "HPRC Club Championship",
    label: "Polo Tournament",
    sport: "polo",
    edition: "October 2026",
    dateRange: "29 October – 1 November 2026",
    venue: "Hyderabad Polo & Riding Club",
    fee: 5000,
    registrationOpen: true,
    pagePath: "/events/hprc-club-championship-oct-26",
    description:
      "A four-day polo tournament open exclusively to HPRC members. Register as an individual player; teams will be formed by the organisers.",
    heroImage: "/photo-1553531580-6520e75d0458.png",
  },
];

export function getClubTournament(slug: string): ClubTournament | undefined {
  return clubTournaments.find((t) => t.slug === slug);
}

/** "HPRC Club Championship — Polo Tournament" */
export function clubTournamentTitle(t: ClubTournament): string {
  return `${t.name} — ${t.label}`;
}

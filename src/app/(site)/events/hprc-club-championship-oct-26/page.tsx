import { ClubTournamentRegistration } from "@/components/events/club-tournament-registration";
import { getClubTournament } from "@/content/club-tournaments";

const tournament = getClubTournament("polo-2026-10")!;

export const metadata = {
  title: `${tournament.name} — ${tournament.label}, ${tournament.edition}`,
  description: tournament.description,
};

export default function Page() {
  return <ClubTournamentRegistration tournament={tournament} />;
}

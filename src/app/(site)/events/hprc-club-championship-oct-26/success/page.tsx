import { ClubTournamentSuccess } from "@/components/events/club-tournament-success";
import { getClubTournament } from "@/content/club-tournaments";

const tournament = getClubTournament("polo-2026-10")!;

export default function Page() {
  return <ClubTournamentSuccess tournament={tournament} />;
}

import { describe, it, expect } from 'vitest';
import {
  worldArenaPoloChampionship2026,
  type Country,
  type Tournament,
  type ScheduleDay,
  type MatchResult,
  type TournamentResults,
} from '../content/world-arena-polo-championship-2026';

describe('worldArenaPoloChampionship2026', () => {
  describe('hero section', () => {
    it('should have correct event title', () => {
      expect(worldArenaPoloChampionship2026.hero.title).toBe(
        'HPRC World Arena Polo Championship 2026'
      );
    });

    it('should have correct dates', () => {
      expect(worldArenaPoloChampionship2026.hero.dates).toBe('11th – 18th February 2026');
    });

    it('should have correct venue', () => {
      expect(worldArenaPoloChampionship2026.hero.venue).toContain('Hyderabad Polo & Riding Club');
    });
  });

  describe('event status', () => {
    it('should be marked as completed', () => {
      expect(worldArenaPoloChampionship2026.eventStatus).toBe('completed');
    });
  });

  describe('participating countries', () => {
    const countries = worldArenaPoloChampionship2026.countries;

    it('should have 5 participating countries', () => {
      expect(countries).toHaveLength(5);
    });

    it('should include India', () => {
      const india = countries.find((c: Country) => c.name === 'India');
      expect(india).toBeDefined();
      expect(india?.code).toBe('IND');
    });

    it('should include all expected countries', () => {
      const countryNames = countries.map((c: Country) => c.name);
      expect(countryNames).toContain('India');
      expect(countryNames).toContain('United States of America');
      expect(countryNames).toContain('Germany');
      expect(countryNames).toContain('France');
      expect(countryNames).toContain('Luxembourg');
    });

    it('should have valid country codes', () => {
      countries.forEach((country: Country) => {
        expect(country.code).toHaveLength(3);
        expect(country.code).toMatch(/^[A-Z]{3}$/);
      });
    });
  });

  describe('tournaments', () => {
    const tournaments = worldArenaPoloChampionship2026.tournaments;

    it('should have 4 tournaments', () => {
      expect(tournaments).toHaveLength(4);
    });

    it('should have 4-goal cup tournament', () => {
      const fourGoalCup = tournaments.find((t: Tournament) => t.id === '4-goal-cup');
      expect(fourGoalCup).toBeDefined();
      expect(fourGoalCup?.name).toBe('Radha TMT International Arena Polo Championship');
      expect(fourGoalCup?.goal).toBe('4 Goal');
    });

    it('should have 6-goal cup tournament', () => {
      const sixGoalCup = tournaments.find((t: Tournament) => t.id === '6-goal-cup');
      expect(sixGoalCup).toBeDefined();
      expect(sixGoalCup?.name).toBe('Telangana Tourism International Arena Polo Cup 2026');
      expect(sixGoalCup?.goal).toBe('6 Goal');
    });

    it('should have womens exhibition match', () => {
      const womensMatch = tournaments.find((t: Tournament) => t.id === 'womens-match');
      expect(womensMatch).toBeDefined();
      expect(womensMatch?.format).toBe('Exhibition match');
    });

    it('should have best-of-best exhibition match', () => {
      const bestOfBest = tournaments.find((t: Tournament) => t.id === 'best-of-best');
      expect(bestOfBest).toBeDefined();
      expect(bestOfBest?.format).toBe('Exhibition match');
    });

    it('each tournament should have required fields', () => {
      tournaments.forEach((tournament: Tournament) => {
        expect(tournament.id).toBeDefined();
        expect(tournament.name).toBeDefined();
        expect(tournament.dates).toBeDefined();
        expect(tournament.format).toBeDefined();
        expect(tournament.teams).toBeDefined();
        expect(tournament.description).toBeDefined();
      });
    });
  });

  describe('schedule', () => {
    const schedule = worldArenaPoloChampionship2026.schedule;

    it('should have 7 days of events', () => {
      expect(schedule).toHaveLength(7);
    });

    it('should start on February 12', () => {
      expect(schedule[0].date).toBe('12 Feb');
      expect(schedule[0].dateFull).toContain('12 February 2026');
    });

    it('should end on February 18', () => {
      expect(schedule[6].date).toBe('18 Feb');
      expect(schedule[6].dateFull).toContain('18 February 2026');
    });

    it('each day should have activities', () => {
      schedule.forEach((day: ScheduleDay) => {
        expect(day.activities.length).toBeGreaterThan(0);
      });
    });

    it('final day should include grand final', () => {
      const finalDay = schedule[6];
      const finalActivity = finalDay.activities.find((a) => a.type === 'final');
      expect(finalActivity).toBeDefined();
      expect(finalActivity?.activity).toContain('6-Goal Final');
    });

    it('should have valid activity types', () => {
      const validTypes = ['arrival', 'practice', 'match', 'ceremony', 'hospitality', 'media', 'final'];
      schedule.forEach((day: ScheduleDay) => {
        day.activities.forEach((activity) => {
          expect(validTypes).toContain(activity.type);
        });
      });
    });
  });

  describe('results', () => {
    const results = worldArenaPoloChampionship2026.results;

    it('should have results for both main tournaments', () => {
      expect(results).toHaveLength(2);
    });

    it('India should be champion of 4-goal tournament', () => {
      const fourGoalResults = results.find(
        (r: TournamentResults) => r.tournamentId === '4-goal-cup'
      );
      expect(fourGoalResults).toBeDefined();
      expect(fourGoalResults?.champion).toBe('India');
    });

    it('India should be champion of 6-goal tournament', () => {
      const sixGoalResults = results.find(
        (r: TournamentResults) => r.tournamentId === '6-goal-cup'
      );
      expect(sixGoalResults).toBeDefined();
      expect(sixGoalResults?.champion).toBe('India');
    });

    it('6-goal tournament should have MVP Salim Azmi', () => {
      const sixGoalResults = results.find(
        (r: TournamentResults) => r.tournamentId === '6-goal-cup'
      );
      expect(sixGoalResults?.mvp).toBe('Salim Azmi');
    });

    it('4-goal tournament should have 3 matches', () => {
      const fourGoalResults = results.find(
        (r: TournamentResults) => r.tournamentId === '4-goal-cup'
      );
      expect(fourGoalResults?.matches).toHaveLength(3);
    });

    it('6-goal tournament should have 3 matches', () => {
      const sixGoalResults = results.find(
        (r: TournamentResults) => r.tournamentId === '6-goal-cup'
      );
      expect(sixGoalResults?.matches).toHaveLength(3);
    });

    it('each match should have valid winner based on goals', () => {
      results.forEach((result: TournamentResults) => {
        result.matches.forEach((match: MatchResult) => {
          if (match.goalsA > match.goalsB) {
            expect(match.winner).toBe(match.teamA);
          } else if (match.goalsB > match.goalsA) {
            expect(match.winner).toBe(match.teamB);
          }
        });
      });
    });

    it('finals should be marked as Final round', () => {
      results.forEach((result: TournamentResults) => {
        const finals = result.matches.filter((m: MatchResult) => m.round === 'Final');
        expect(finals.length).toBeGreaterThan(0);
      });
    });

    it('4-goal final should be India vs France with India winning 21-14', () => {
      const fourGoalResults = results.find(
        (r: TournamentResults) => r.tournamentId === '4-goal-cup'
      );
      const final = fourGoalResults?.matches.find((m: MatchResult) => m.round === 'Final');
      expect(final?.teamA).toBe('India');
      expect(final?.teamB).toBe('France');
      expect(final?.goalsA).toBe(21);
      expect(final?.goalsB).toBe(14);
      expect(final?.winner).toBe('India');
    });

    it('6-goal final should be India vs France with India winning 18-15', () => {
      const sixGoalResults = results.find(
        (r: TournamentResults) => r.tournamentId === '6-goal-cup'
      );
      const final = sixGoalResults?.matches.find((m: MatchResult) => m.round === 'Final');
      expect(final?.teamA).toBe('India');
      expect(final?.teamB).toBe('France');
      expect(final?.goalsA).toBe(18);
      expect(final?.goalsB).toBe(15);
      expect(final?.winner).toBe('India');
    });
  });

  describe('press coverage', () => {
    it('should have press coverage from LA POLO', () => {
      expect(worldArenaPoloChampionship2026.pressCoverage.source).toBe('LA POLO');
    });

    it('should have valid coverage URL', () => {
      expect(worldArenaPoloChampionship2026.pressCoverage.url).toMatch(/^https:\/\//);
    });
  });

  describe('officials', () => {
    it('should have a chief umpire', () => {
      expect(worldArenaPoloChampionship2026.officials.chiefUmpire.name).toBe('Robin Sanchez');
    });

    it('should have tournament committee members', () => {
      expect(worldArenaPoloChampionship2026.officials.committee.length).toBeGreaterThan(0);
    });

    it('committee should include key players', () => {
      const committeeNames = worldArenaPoloChampionship2026.officials.committee.map(
        (o) => o.name
      );
      expect(committeeNames).toContain('Chaitania Kumar');
      expect(committeeNames).toContain('Arsalan Khan');
    });
  });

  describe('hospitality features', () => {
    it('should have hospitality features defined', () => {
      expect(worldArenaPoloChampionship2026.hospitality.features.length).toBeGreaterThan(0);
    });

    it('should include VIP boxes', () => {
      const vipFeature = worldArenaPoloChampionship2026.hospitality.features.find((f) =>
        f.title.toLowerCase().includes('vip')
      );
      expect(vipFeature).toBeDefined();
    });
  });

  describe('media opportunities', () => {
    it('should have media opportunities defined', () => {
      expect(worldArenaPoloChampionship2026.media.opportunities.length).toBeGreaterThan(0);
    });
  });

  describe('objectives and legacy', () => {
    it('should have championship objectives', () => {
      expect(worldArenaPoloChampionship2026.objectives.length).toBeGreaterThan(0);
    });

    it('should have legacy goals', () => {
      expect(worldArenaPoloChampionship2026.legacy.length).toBeGreaterThan(0);
    });
  });
});

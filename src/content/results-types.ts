export type ResultEntry = {
  /** Placing as printed in the official sheet, e.g. "1st", "Joint 3rd". Absent for score-ranked classes. */
  pos?: string;
  rider: string;
  horse: string;
  club?: string;
  /** Age band only — never a date of birth. */
  ageGroup?: string;
  /** Dressage average score, stored as the raw decimal (0.6612 = 66.12%). */
  score?: string;
  /** Show jumping total penalties. Lower is better. */
  penalties?: string;
  prize?: string;
  /** Public path under /images/results/…; absent for riders who entered offline. */
  photo?: string;
};

export type ResultClass = {
  title: string;
  discipline: string;
  category: string;
  slug: string;
  /** How the class was ranked. null = placings were awarded by the judges directly. */
  metric: "score" | "penalties" | null;
  entries: ResultEntry[];
};

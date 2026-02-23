export type CellStatus = "empty" | "correct" | "present" | "absent";

export type GameMode = "players" | "teams";

export type InfoSection = "how" | "about" | "policy" | "faq" | "contact";

export interface Stats {
  guesses: number[]; // index 0 => solved in 1, ..., index 5 => solved in 6
  losses: number;
  currentStreak: number;
  bestStreak: number;
}

export interface FootballWordleProps {
  mode: GameMode;
  wordList: string[];
  onBack?: () => void;
}

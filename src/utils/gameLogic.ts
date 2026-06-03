import type { CellStatus } from "../types/game";

export function evaluateGuess(guess: string, normalizedTarget: string): CellStatus[] {
  const wordLength = normalizedTarget.length;

  if (guess.length !== wordLength) {
    return Array(wordLength).fill("empty");
  }

  const result: CellStatus[] = Array(wordLength).fill("absent");
  const targetChars = normalizedTarget.split("");
  const guessChars = guess.split("");

  // First pass: correct positions (green). Spaces in the target are always correct.
  const remaining: Record<string, number> = {};
  for (let i = 0; i < wordLength; i++) {
    if (targetChars[i] === " ") {
      result[i] = "correct";
      continue;
    }
    if (guessChars[i] === targetChars[i]) {
      result[i] = "correct";
    } else {
      const ch = targetChars[i];
      remaining[ch] = (remaining[ch] || 0) + 1;
    }
  }

  // Second pass: present (yellow) or absent (red). Skip space positions.
  for (let i = 0; i < wordLength; i++) {
    if (result[i] === "correct") continue;
    const ch = guessChars[i];
    if (remaining[ch] && remaining[ch] > 0) {
      result[i] = "present";
      remaining[ch] -= 1;
    } else {
      result[i] = "absent";
    }
  }

  return result;
}

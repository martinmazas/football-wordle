import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import type { GameMode, CellStatus, Stats } from "../types/game";
import { MAX_TRIES } from "../constants/game";
import { evaluateGuess } from "../utils/gameLogic";

const DEFAULT_STATS: Stats = {
  guesses: Array(MAX_TRIES).fill(0),
  losses: 0,
  currentStreak: 0,
  bestStreak: 0,
};

function loadStats(storageKey: string): Stats {
  if (typeof window === "undefined") return DEFAULT_STATS;
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored) as Stats;
      if (
        Array.isArray(parsed.guesses) &&
        parsed.guesses.length === MAX_TRIES &&
        typeof parsed.losses === "number"
      ) {
        return {
          guesses: parsed.guesses,
          losses: parsed.losses,
          currentStreak: parsed.currentStreak ?? 0,
          bestStreak: parsed.bestStreak ?? 0,
        };
      }
    }
  } catch {
    // ignore parse errors
  }
  return { ...DEFAULT_STATS, guesses: Array(MAX_TRIES).fill(0) };
}

export function useGame(mode: GameMode, wordList: string[]) {
  const storageKey = useMemo(() => `fw-stats-v1-${mode}`, [mode]);

  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
  const [targetWord, setTargetWord] = useState("");
  const [stats, setStats] = useState<Stats>(() => loadStats(storageKey));

  // Reload stats when mode changes
  useEffect(() => {
    setStats(loadStats(storageKey));
  }, [storageKey]);

  // Persist stats to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(stats));
  }, [stats, storageKey]);

  const normalizedTarget = targetWord.toUpperCase();
  const wordLength = normalizedTarget.length;

  const startNewGame = useCallback(() => {
    setTargetWord(wordList[Math.floor(Math.random() * wordList.length)] || "");
    setGuesses([]);
    setCurrentGuess("");
    setGameStatus("playing");
  }, [wordList]);

  // Start a new game when mode or wordList changes
  const lastInitRef = useRef<{ mode: GameMode; wordList: string[] } | null>(null);
  useEffect(() => {
    const last = lastInitRef.current;
    if (last && last.mode === mode && last.wordList === wordList) return;
    lastInitRef.current = { mode, wordList };
    startNewGame();
  }, [mode, startNewGame, wordList]);

  // Compute key colors from all submitted guesses
  const keyStatuses = useMemo(() => {
    const priorities: Record<CellStatus, number> = {
      empty: 0,
      absent: 1,
      present: 2,
      correct: 3,
    };
    const statusMap: Record<string, CellStatus> = {};
    guesses.forEach((guess) => {
      evaluateGuess(guess, normalizedTarget).forEach((status, idx) => {
        const letter = guess[idx];
        const prev = statusMap[letter] ?? "empty";
        if (priorities[status] > priorities[prev]) statusMap[letter] = status;
      });
    });
    return statusMap;
  }, [guesses, normalizedTarget]);

  // Update stats when game ends
  useEffect(() => {
    if (gameStatus === "playing") return;
    setStats((prev) => {
      const next: Stats = { ...prev, guesses: [...prev.guesses] };
      if (gameStatus === "won") {
        const idx = Math.min(guesses.length, MAX_TRIES) - 1;
        if (idx >= 0 && idx < MAX_TRIES) next.guesses[idx] += 1;
        next.currentStreak = prev.currentStreak + 1;
        next.bestStreak = Math.max(prev.bestStreak, next.currentStreak);
      } else if (gameStatus === "lost") {
        next.losses += 1;
        next.currentStreak = 0;
      }
      return next;
    });
  }, [gameStatus, guesses]);

  const handleSubmitGuess = useCallback(() => {
    if (gameStatus !== "playing") return;
    if (currentGuess.length !== wordLength) return;

    const guess = currentGuess.toUpperCase();
    const nextGuesses = [...guesses, guess];
    setGuesses(nextGuesses);
    setCurrentGuess("");

    if (guess === normalizedTarget) {
      setGameStatus("won");
    } else if (nextGuesses.length >= MAX_TRIES) {
      setGameStatus("lost");
    }
  }, [currentGuess, gameStatus, guesses, normalizedTarget, wordLength]);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (gameStatus !== "playing") return;
      if (key === "ENTER") { handleSubmitGuess(); return; }
      if (key === "BACKSPACE") { setCurrentGuess((prev) => prev.slice(0, -1)); return; }
      if (/^[A-Z]$/.test(key) && currentGuess.length < wordLength) {
        setCurrentGuess((prev) => prev + key);
      }
    },
    [currentGuess.length, gameStatus, handleSubmitGuess, wordLength]
  );

  const getEvaluatedGuess = useCallback(
    (guess: string) => evaluateGuess(guess, normalizedTarget),
    [normalizedTarget]
  );

  return {
    guesses,
    currentGuess,
    setCurrentGuess,
    gameStatus,
    normalizedTarget,
    wordLength,
    stats,
    keyStatuses,
    startNewGame,
    handleKeyPress,
    getEvaluatedGuess,
  };
}

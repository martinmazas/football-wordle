import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";
import "./FootballWordle.css";
import Header from "./Components/Header";

const MAX_TRIES = 6;

type CellStatus = "empty" | "correct" | "present" | "absent";

// interface AdSlotProps {
//   id: string;
//   label?: string;
// }

type GameMode = "players" | "teams";

interface FootballWordleProps {
  mode: GameMode;
  wordList: string[];
  onBack?: () => void;
}

type Stats = {
  guesses: number[]; // index 0 => solved in 1, ..., index 5 => solved in 6
  losses: number;
  currentStreak: number;
  bestStreak: number;
};

/**
 * Simple ad placeholder.
 * Replace <div> with your AdSense / Ad Manager code.
 */
// const AdSlot: React.FC<AdSlotProps> = ({ id, label }) => {
//   return (
//     <div className="ad-slot" data-slot-id={id}>
//       <span className="ad-label">{label ?? "Ad"}</span>
//     </div>
//   );
// };

const FootballWordle: React.FC<FootballWordleProps> = ({
  mode,
  wordList,
  onBack,
}) => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [showIntro, setShowIntro] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mobileInputRef = useRef<HTMLInputElement | null>(null);
  const [targetWord, setTargetWord] = useState("");
  const wordleApiBase = import.meta.env.PROD ? "" : "http://localhost:8080";

  const storageKey = useMemo(() => `fw-stats-v1-${mode}`, [mode]);
  const [stats, setStats] = useState<Stats>(() => {
    if (typeof window === "undefined") {
      return {
        guesses: Array(MAX_TRIES).fill(0),
        losses: 0,
        currentStreak: 0,
        bestStreak: 0,
      };
    }
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as Stats;
        if (
          Array.isArray(parsed.guesses) &&
          parsed.guesses.length === MAX_TRIES &&
          typeof parsed.losses === "number"
        ) {
          if (
            typeof parsed.currentStreak === "number" &&
            typeof parsed.bestStreak === "number"
          ) {
            return parsed;
          }
          return {
            guesses: parsed.guesses,
            losses: parsed.losses,
            currentStreak: 0,
            bestStreak: 0,
          };
        }
      }
    } catch {
      // ignore parse errors and use defaults
    }
    return {
      guesses: Array(MAX_TRIES).fill(0),
      losses: 0,
      currentStreak: 0,
      bestStreak: 0,
    };
  });

  const sendNewGamePing = useCallback(() => {
    if (typeof fetch === "undefined") return;
    fetch(`${wordleApiBase}/api/wordle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "new_game" }),
    }).catch(() => {
      // ignore network errors while testing
    });
  }, [wordleApiBase]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as Stats;
        if (
          Array.isArray(parsed.guesses) &&
          parsed.guesses.length === MAX_TRIES &&
          typeof parsed.losses === "number"
        ) {
          setStats({
            guesses: parsed.guesses,
            losses: parsed.losses,
            currentStreak: parsed.currentStreak ?? 0,
            bestStreak: parsed.bestStreak ?? 0,
          });
          return;
        }
      }
    } catch {
      // ignore
    }
    setStats({
      guesses: Array(MAX_TRIES).fill(0),
      losses: 0,
      currentStreak: 0,
      bestStreak: 0,
    });
  }, [storageKey]);

  const startNewGame = useCallback(() => {
    setTargetWord(wordList[Math.floor(Math.random() * wordList.length)] || "");
    setGuesses([]);
    setCurrentGuess("");
    setGameStatus("playing");
    setShowStats(false);
    sendNewGamePing();
  }, [sendNewGamePing, wordList]);

  const lastInitRef = useRef<{ mode: GameMode; wordList: string[] } | null>(
    null
  );

  useEffect(() => {
    const last = lastInitRef.current;
    if (last && last.mode === mode && last.wordList === wordList) {
      return;
    }
    lastInitRef.current = { mode, wordList };
    startNewGame();
  }, [mode, startNewGame, wordList]);

  const normalizedTarget = (targetWord || "").toUpperCase();
  const WORD_LENGTH = normalizedTarget.length;
  const MAX_ROW_WIDTH_PX = 480;
  const TILE_GAP_PX = 6;
  const tileSizePx = Math.min(
    48,
    Math.max(
      12,
      Math.floor(
        (MAX_ROW_WIDTH_PX - TILE_GAP_PX * (WORD_LENGTH - 1)) / WORD_LENGTH
      )
    )
  );

  const evaluateGuess = (guess: string): CellStatus[] => {
    if (guess.length !== WORD_LENGTH) {
      return Array(WORD_LENGTH).fill("empty");
    }

    const result: CellStatus[] = Array(WORD_LENGTH).fill("absent");
    const targetChars = normalizedTarget.split("");
    const guessChars = guess.split("");

    // First pass: mark correct (green)
    const remaining: Record<string, number> = {};

    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessChars[i] === targetChars[i]) {
        result[i] = "correct";
      } else {
        const ch = targetChars[i];
        remaining[ch] = (remaining[ch] || 0) + 1;
      }
    }

    // Second pass: mark present (yellow) or absent (red)
    for (let i = 0; i < WORD_LENGTH; i++) {
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
  };

  const keyStatuses = useMemo(() => {
    const priorities: Record<CellStatus, number> = {
      empty: 0,
      absent: 1,
      present: 2,
      correct: 3,
    };

    const statusMap: Record<string, CellStatus> = {};

    guesses.forEach((guess) => {
      const statuses = evaluateGuess(guess);
      statuses.forEach((status, idx) => {
        const letter = guess[idx];
        const prev = statusMap[letter] ?? "empty";
        if (priorities[status] > priorities[prev]) {
          statusMap[letter] = status;
        }
      });
    });

    return statusMap;
  }, [guesses, normalizedTarget]);

  const totalSolved = useMemo(
    () => stats.guesses.reduce((sum, n) => sum + n, 0),
    [stats.guesses]
  );
  const totalPlayed = totalSolved + stats.losses;
  const winRate =
    totalPlayed === 0 ? 0 : Math.round((totalSolved / totalPlayed) * 100);
  const maxGuessCount = Math.max(...stats.guesses, 1);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(stats));
  }, [stats, storageKey]);

  useEffect(() => {
    if (gameStatus === "playing") return;

    setStats((prev) => {
      const next: Stats = {
        guesses: [...prev.guesses],
        losses: prev.losses,
        currentStreak: prev.currentStreak,
        bestStreak: prev.bestStreak,
      };

      if (gameStatus === "won") {
        const idx = Math.min(guesses.length, MAX_TRIES) - 1;
        if (idx >= 0 && idx < MAX_TRIES) {
          next.guesses[idx] += 1;
        }
        next.currentStreak = prev.currentStreak + 1;
        next.bestStreak = Math.max(prev.bestStreak, next.currentStreak);
      } else if (gameStatus === "lost") {
        next.losses += 1;
        next.currentStreak = 0;
      }

      return next;
    });

    setShowStats(true);
  }, [gameStatus, guesses]);
  const handleSubmitGuess = useCallback(() => {
    if (gameStatus !== "playing") return;
    if (currentGuess.length !== WORD_LENGTH) return;

    const guess = currentGuess.toUpperCase();
    const nextGuesses = [...guesses, guess];
    setGuesses(nextGuesses);
    setCurrentGuess("");

    if (guess === normalizedTarget) {
      setGameStatus("won");
    } else if (nextGuesses.length >= MAX_TRIES) {
      setGameStatus("lost");
    }
  }, [currentGuess, gameStatus, guesses, normalizedTarget]);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (showIntro) return;
      if (gameStatus !== "playing") return;

      if (key === "ENTER") {
        handleSubmitGuess();
        return;
      }

      if (key === "BACKSPACE") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => prev + key);
      }
    },
    [currentGuess.length, gameStatus, handleSubmitGuess, showIntro]
  );

  const handleMobileChange = (value: string) => {
    if (gameStatus !== "playing") return;
    const sanitized = value.replace(/[^a-zA-Z]/g, "").toUpperCase();
    setCurrentGuess(sanitized.slice(0, WORD_LENGTH));
  };

  const handleMobileKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmitGuess();
    }
  };

  // Physical keyboard support
  useEffect(() => {
    if (isMobile) return;

    const listener = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      if (key === "ENTER") {
        e.preventDefault();
        handleKeyPress("ENTER");
      } else if (key === "BACKSPACE") {
        e.preventDefault();
        handleKeyPress("BACKSPACE");
      } else if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key);
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [handleKeyPress, isMobile]);

  // Detect mobile to show native keyboard input
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const ua = navigator.userAgent || "";
    setIsMobile(/Mobi|Android|iPhone|iPad|iPod/i.test(ua));
  }, []);

  useEffect(() => {
    if (isMobile) {
      mobileInputRef.current?.focus();
    }
  }, [isMobile]);

  const getCellStatus = (rowIndex: number, colIndex: number): CellStatus => {
    const guess = guesses[rowIndex];
    if (!guess) return "empty";

    const statuses = evaluateGuess(guess);
    return statuses[colIndex];
  };

  const renderTile = (rowIndex: number, colIndex: number) => {
    const isCurrentRow = rowIndex === guesses.length;
    const guessForRow = guesses[rowIndex] || "";
    let letter = "";

    if (guessForRow) {
      letter = guessForRow[colIndex] ?? "";
    } else if (isCurrentRow) {
      letter = currentGuess[colIndex] ?? "";
    }

    const status = !guessForRow ? "empty" : getCellStatus(rowIndex, colIndex);

    return (
      <div
        key={`${rowIndex}-${colIndex}`}
        className={`tile tile--${status} ${
          letter ? "tile--filled" : ""
        }`.trim()}
      >
        {letter}
      </div>
    );
  };

  const handleNewGame = () => {
    startNewGame();
    setShowIntro(false);
    if (isMobile) {
      mobileInputRef.current?.focus();
    }
  };

  const message =
    gameStatus === "won"
      ? `You guessed ${normalizedTarget} in ${guesses.length} tries!`
      : gameStatus === "lost"
      ? `The answer was ${normalizedTarget}. Better luck next time!`
      : `Guess the football ${mode === "teams" ? "team" : "player"}!`;

  return (
    <div className="fw-page">
      <header className="fw-header">
        <Header
          modeLabel={mode === "teams" ? "team" : "player"}
          onBack={onBack}
        />
        {/* Top banner ad (good for desktop and mobile) */}
        {/* <AdSlot id="top-banner" label="Top banner ad" /> */}
      </header>

      <main className="fw-main">
        {/* Left sidebar for desktop */}
        <aside className="fw-sidebar fw-sidebar--left">
          {/* <AdSlot id="sidebar-left" label="Sidebar ad" /> */}
        </aside>

        <section className="fw-board-container">
          {/* Ad above the board – high visibility, but below the title */}
          {/* <AdSlot id="above-board" label="Above board ad" /> */}

          <div className="fw-message">{message}</div>
          {isMobile && (
            <input
              className="fw-mobile-input"
              id="fw-mobile"
              ref={mobileInputRef}
              type="text"
              inputMode="text"
              autoCapitalize="characters"
              autoComplete="off"
              autoCorrect="off"
              autoFocus
              value={currentGuess}
              onChange={(e) => handleMobileChange(e.target.value)}
              onKeyDown={handleMobileKeyDown}
              maxLength={WORD_LENGTH}
              placeholder="Type your guess"
              aria-label="Type your guess"
              onFocus={(e) => e.target.select()}
            />
          )}
          <div
            className="fw-board"
            style={
              {
                "--fw-word-length": WORD_LENGTH,
                "--fw-tile-size": `${tileSizePx}px`,
                "--fw-tile-gap": `${TILE_GAP_PX}px`,
              } as CSSProperties
            }
            onClick={() => {
              if (isMobile) {
                mobileInputRef.current?.focus();
              }
            }}
          >
            {Array.from({ length: MAX_TRIES }).map((_, rowIdx) => (
              <div className="fw-row" key={rowIdx}>
                {Array.from({ length: WORD_LENGTH }).map((_, colIdx) =>
                  renderTile(rowIdx, colIdx)
                )}
              </div>
            ))}
          </div>
          {/* Ad between board and keyboard */}
          {/* <AdSlot id="between-board-keyboard" label="Mid-page ad" /> */}

          <Keyboard
            onKeyPress={handleKeyPress}
            keyStatuses={keyStatuses}
            disabled={gameStatus !== "playing" || showIntro}
          />

          <div className="fw-actions">
            {(gameStatus === "won" || gameStatus === "lost") && (
              <button className="fw-button" onClick={handleNewGame}>
                Play again
              </button>
            )}
          </div>
        </section>

        {/* Right column for desktop only – large rectangles */}
        <aside className="fw-sidebar fw-sidebar--right">
          {/* <AdSlot id="sidebar-rect" label="Sidebar ad" /> */}
          {/* <AdSlot id="sidebar-rect-2" label="Sidebar ad 2" /> */}
        </aside>
      </main>

      {/* Sticky footer ad (especially strong on mobile) */}
      <footer className="fw-footer">
        {/* <AdSlot id="sticky-footer" label="Sticky footer ad" /> */}
      </footer>

      {showIntro && (
        <div className="fw-modal" role="dialog" aria-modal="true">
          <div
            className="fw-modal__backdrop"
            onClick={() => setShowIntro(false)}
          />
          <div className="fw-modal__content fw-modal__content--intro">
            <div className="fw-modal__header">
              <div>
                <p className="fw-modal__eyebrow">Quick start</p>
                <h2 className="fw-modal__title">How to play</h2>
              </div>
              <button
                className="fw-modal__close"
                aria-label="Close intro"
                onClick={() => setShowIntro(false)}
              >
                ✕
              </button>
            </div>

            <p className="fw-intro-text">
              You have 6 tries to guess the football player. Type or tap
              letters, then press enter to submit.
            </p>

            <div className="fw-intro-steps">
              <div className="fw-intro-step">
                <span className="fw-intro-badge">Green</span>
                <span>Correct letter in the correct spot</span>
              </div>
              <div className="fw-intro-step">
                <span className="fw-intro-badge fw-intro-badge--yellow">
                  Yellow
                </span>
                <span>Letter is in the word, wrong spot</span>
              </div>
              <div className="fw-intro-step">
                <span className="fw-intro-badge fw-intro-badge--red">Red</span>
                <span>Letter is not in the word</span>
              </div>
            </div>

            <div className="fw-modal__actions">
              <button className="fw-button" onClick={() => setShowIntro(false)}>
                Start playing
              </button>
            </div>
          </div>
        </div>
      )}

      {showStats && (
        <div className="fw-modal" role="dialog" aria-modal="true">
          <div
            className="fw-modal__backdrop"
            onClick={() => setShowStats(false)}
          />
          <div className="fw-modal__content">
            <div className="fw-modal__header">
              <div>
                <p className="fw-modal__eyebrow">Session recap</p>
                <h2 className="fw-modal__title">Your Footle stats</h2>
              </div>
              <button
                className="fw-modal__close"
                aria-label="Close stats"
                onClick={() => setShowStats(false)}
              >
                ✕
              </button>
            </div>

            <div className="fw-stats-grid">
              <div className="fw-stat-card">
                <span className="fw-stat-number">{totalPlayed}</span>
                <span className="fw-stat-label">Played</span>
              </div>
              <div className="fw-stat-card">
                <span className="fw-stat-number">{winRate}%</span>
                <span className="fw-stat-label">Win rate</span>
              </div>
              <div className="fw-stat-card">
                <span className="fw-stat-number">{stats.losses}</span>
                <span className="fw-stat-label">Losses</span>
              </div>
              <div className="fw-stat-card">
                <span className="fw-stat-number">{stats.currentStreak}</span>
                <span className="fw-stat-label">Current streak</span>
              </div>
              <div className="fw-stat-card">
                <span className="fw-stat-number">{stats.bestStreak}</span>
                <span className="fw-stat-label">Best streak</span>
              </div>
            </div>

            <div className="fw-distribution">
              <div className="fw-distribution__header">
                <p className="fw-modal__eyebrow">Guess distribution</p>
              </div>
              <div className="fw-distribution__list">
                {stats.guesses.map((count, idx) => {
                  const width = totalSolved
                    ? Math.max(10, Math.round((count / maxGuessCount) * 100))
                    : 10;
                  return (
                    <div className="fw-distribution__row" key={idx}>
                      <span className="fw-distribution__label">{idx + 1}</span>
                      <div className="fw-distribution__bar-wrapper">
                        <div
                          className="fw-distribution__bar"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                      <span className="fw-distribution__count">{count}</span>
                    </div>
                  );
                })}
                <div className="fw-distribution__row fw-distribution__row--loss">
                  <span className="fw-distribution__label">X</span>
                  <div className="fw-distribution__bar-wrapper">
                    <div
                      className="fw-distribution__bar fw-distribution__bar--loss"
                      style={{
                        width: `${
                          stats.losses
                            ? Math.max(
                                10,
                                Math.min(
                                  100,
                                  Math.round(
                                    (stats.losses /
                                      Math.max(stats.losses, maxGuessCount)) *
                                      100
                                  )
                                )
                              )
                            : 10
                        }%`,
                      }}
                    />
                  </div>
                  <span className="fw-distribution__count">{stats.losses}</span>
                </div>
              </div>
            </div>

            <div className="fw-modal__actions">
              <button
                className="fw-button"
                onClick={() => {
                  setShowStats(false);
                  handleNewGame();
                }}
              >
                Play again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  disabled?: boolean;
  keyStatuses?: Record<string, CellStatus>;
}

const Keyboard: React.FC<KeyboardProps> = ({
  onKeyPress,
  disabled,
  keyStatuses,
}) => {
  const rows = [
    "QWERTYUIOP".split(""),
    "ASDFGHJKL".split(""),
    ["ENTER", ..."ZXCVBNM".split(""), "BACKSPACE"],
  ];

  const handleClick = (key: string) => {
    if (disabled) return;
    onKeyPress(key);
  };

  return (
    <div className="fw-keyboard">
      {rows.map((row, rowIdx) => (
        <div className="fw-keyboard-row" key={rowIdx}>
          {row.map((key) => (
            <button
              key={key}
              className={`fw-key ${
                key === "ENTER" || key === "BACKSPACE" ? "fw-key--wide" : ""
              } ${
                keyStatuses?.[key] ? `fw-key--${keyStatuses[key]}` : ""
              }`.trim()}
              onClick={() => handleClick(key)}
            >
              {key === "BACKSPACE" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FootballWordle;

import React, { useState, useEffect, useRef } from "react";
import "./FootballWordle.css";

import Header from "./Components/Header";
import Board from "./Components/Board";
import Keyboard from "./Components/Keyboard";
import SiteLinks from "./Components/SiteLinks";
import IntroModal from "./Components/modals/IntroModal";
import StatsModal from "./Components/modals/StatsModal";
import InfoModal from "./Components/modals/InfoModal";
import { useGame } from "./hooks/useGame";
import type { FootballWordleProps, InfoSection } from "./types/game";

const FootballWordle: React.FC<FootballWordleProps> = ({ mode, wordList, onBack }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [infoSection, setInfoSection] = useState<InfoSection | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const mobileInputRef = useRef<HTMLInputElement | null>(null);

  const {
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
  } = useGame(mode, wordList);

  // Mobile detection
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const ua = navigator.userAgent || "";
    setIsMobile(/Mobi|Android|iPhone|iPad|iPod/i.test(ua));
  }, []);

  useEffect(() => {
    if (isMobile) mobileInputRef.current?.focus();
  }, [isMobile]);

  // Physical keyboard support (disabled while intro is showing)
  useEffect(() => {
    if (isMobile || showIntro) return;
    const listener = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key === "ENTER") { e.preventDefault(); handleKeyPress("ENTER"); }
      else if (key === "BACKSPACE") { e.preventDefault(); handleKeyPress("BACKSPACE"); }
      else if (/^[A-Z]$/.test(key)) handleKeyPress(key);
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [handleKeyPress, isMobile, showIntro]);

  // Show stats modal when game ends
  useEffect(() => {
    if (gameStatus !== "playing") setShowStats(true);
  }, [gameStatus]);

  const handleNewGame = () => {
    startNewGame();
    setShowIntro(false);
    setShowStats(false);
    if (isMobile) mobileInputRef.current?.focus();
  };

  const handleMobileChange = (value: string) => {
    if (gameStatus !== "playing") return;
    setCurrentGuess(value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, wordLength));
  };

  const handleMobileKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); handleKeyPress("ENTER"); }
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
          onOpenInfo={setInfoSection}
        />
      </header>

      <main className="fw-main">
        <aside className="fw-sidebar fw-sidebar--left" />

        <section className="fw-board-container">
          <div className="fw-message">{message}</div>

          <Board
            guesses={guesses}
            currentGuess={currentGuess}
            normalizedTarget={normalizedTarget}
            getEvaluatedGuess={getEvaluatedGuess}
            isMobile={isMobile}
            mobileInputRef={mobileInputRef}
            onMobileChange={handleMobileChange}
            onMobileKeyDown={handleMobileKeyDown}
          />

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

        <aside className="fw-sidebar fw-sidebar--right" />
      </main>

      <SiteLinks onOpenInfo={setInfoSection} />

      <footer className="fw-footer" />

      {showIntro && <IntroModal onClose={() => setShowIntro(false)} />}

      {showStats && (
        <StatsModal
          stats={stats}
          guesses={guesses}
          onClose={() => setShowStats(false)}
          onNewGame={handleNewGame}
        />
      )}

      {infoSection && (
        <InfoModal
          section={infoSection}
          onClose={() => setInfoSection(null)}
          onNavigate={setInfoSection}
        />
      )}
    </div>
  );
};

export default FootballWordle;

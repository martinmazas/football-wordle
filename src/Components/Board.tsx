import React from "react";
import type { CSSProperties } from "react";
import type { CellStatus } from "../types/game";
import { MAX_TRIES, MAX_ROW_WIDTH_PX, TILE_GAP_PX, TILE_MAX_SIZE_PX, TILE_MIN_SIZE_PX } from "../constants/game";

interface BoardProps {
  guesses: string[];
  currentGuess: string;
  normalizedTarget: string;
  getEvaluatedGuess: (guess: string) => CellStatus[];
  isMobile: boolean;
  mobileInputRef: React.RefObject<HTMLInputElement | null>;
  onMobileChange: (value: string) => void;
  onMobileKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Board: React.FC<BoardProps> = ({
  guesses,
  currentGuess,
  normalizedTarget,
  getEvaluatedGuess,
  isMobile,
  mobileInputRef,
  onMobileChange,
  onMobileKeyDown,
}) => {
  const wordLength = normalizedTarget.length;
  const tileSizePx = Math.min(
    TILE_MAX_SIZE_PX,
    Math.max(
      TILE_MIN_SIZE_PX,
      Math.floor((MAX_ROW_WIDTH_PX - TILE_GAP_PX * (wordLength - 1)) / wordLength)
    )
  );

  const getCellStatus = (rowIndex: number, colIndex: number): CellStatus => {
    const guess = guesses[rowIndex];
    if (!guess) return "empty";
    return getEvaluatedGuess(guess)[colIndex];
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
        className={`tile tile--${status} ${letter ? "tile--filled" : ""}`.trim()}
      >
        {letter}
      </div>
    );
  };

  return (
    <>
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
          onChange={(e) => onMobileChange(e.target.value)}
          onKeyDown={onMobileKeyDown}
          maxLength={wordLength}
          placeholder="Type your guess"
          aria-label="Type your guess"
          onFocus={(e) => e.target.select()}
        />
      )}
      <div
        className="fw-board"
        style={
          {
            "--fw-word-length": wordLength,
            "--fw-tile-size": `${tileSizePx}px`,
            "--fw-tile-gap": `${TILE_GAP_PX}px`,
          } as CSSProperties
        }
        onClick={() => {
          if (isMobile) mobileInputRef.current?.focus();
        }}
      >
        {Array.from({ length: MAX_TRIES }).map((_, rowIdx) => (
          <div className="fw-row" key={rowIdx}>
            {Array.from({ length: wordLength }).map((_, colIdx) =>
              renderTile(rowIdx, colIdx)
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;

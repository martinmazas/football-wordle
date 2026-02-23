import React from "react";
import type { CellStatus } from "../types/game";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  disabled?: boolean;
  keyStatuses?: Record<string, CellStatus>;
}

const ROWS = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKL".split(""),
  ["ENTER", ..."ZXCVBNM".split(""), "BACKSPACE"],
];

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, disabled, keyStatuses }) => {
  const handleClick = (key: string) => {
    if (disabled) return;
    onKeyPress(key);
  };

  return (
    <div className="fw-keyboard">
      {ROWS.map((row, rowIdx) => (
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

export default Keyboard;

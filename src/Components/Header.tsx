import React from "react";

interface HeaderProps {
  modeLabel: string;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ modeLabel, onBack }) => {
  return (
    <div className="fw-header-top">
      <h1 className="fw-title">Football Wordle</h1>
      <div className="fw-header-actions">
        <p className="fw-subtitle">Guess the {modeLabel} in 6 tries!</p>
        {onBack && (
          <button className="fw-button fw-button--ghost" onClick={onBack}>
            Switch mode
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

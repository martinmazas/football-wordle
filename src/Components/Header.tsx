import React from "react";

export type InfoSection = "how" | "about" | "policy" | "faq" | "contact";

interface HeaderProps {
  modeLabel: string;
  onBack?: () => void;
  onOpenInfo?: (section: InfoSection) => void;
}

const Header: React.FC<HeaderProps> = ({ modeLabel, onBack, onOpenInfo }) => {
  return (
    <div className="fw-header-top">
      <div className="fw-header-brand">
        <h1 className="fw-title">Football Wordle</h1>
        <p className="fw-subtitle">Guess the {modeLabel} in 6 tries!</p>
      </div>
      <div className="fw-header-actions">
        {onOpenInfo && (
          <nav className="fw-header-nav" aria-label="Game information">
            <button
              className="fw-nav-link"
              onClick={() => onOpenInfo("how")}
            >
              How to play
            </button>
            <button
              className="fw-nav-link"
              onClick={() => onOpenInfo("about")}
            >
              About
            </button>
            <button
              className="fw-nav-link"
              onClick={() => onOpenInfo("policy")}
            >
              Privacy & ads
            </button>
            <button
              className="fw-nav-link"
              onClick={() => onOpenInfo("contact")}
            >
              Contact
            </button>
          </nav>
        )}
        {onBack && (
          <button className="fw-button fw-button--ghost" onClick={onBack}>
            Home / modes
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

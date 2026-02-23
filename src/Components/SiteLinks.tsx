import React from "react";
import type { InfoSection } from "../types/game";

interface SiteLinksProps {
  onOpenInfo: (section: InfoSection) => void;
}

const SiteLinks: React.FC<SiteLinksProps> = ({ onOpenInfo }) => {
  return (
    <section className="fw-site-links" aria-label="Site information">
      <div className="fw-site-links__content">
        <div className="fw-site-links__copy">
          <p className="fw-site-links__eyebrow">More about this game</p>
          <h2>Helpful info for players and reviewers</h2>
          <p>
            Football Wordle is a free, independent word game for fans. We do not
            collect personal data; stats live in your browser only. Last updated
            February 4, 2026.
          </p>
        </div>
        <div className="fw-site-links__actions">
          <button
            className="fw-button fw-button--ghost fw-button--sm"
            onClick={() => onOpenInfo("about")}
          >
            About
          </button>
          <button
            className="fw-button fw-button--ghost fw-button--sm"
            onClick={() => onOpenInfo("how")}
          >
            How to play
          </button>
          <button
            className="fw-button fw-button--ghost fw-button--sm"
            onClick={() => onOpenInfo("policy")}
          >
            Privacy & ads
          </button>
          <button
            className="fw-button fw-button--ghost fw-button--sm"
            onClick={() => onOpenInfo("faq")}
          >
            FAQ
          </button>
          <button
            className="fw-button fw-button--ghost fw-button--sm"
            onClick={() => onOpenInfo("contact")}
          >
            Contact
          </button>
        </div>
      </div>
    </section>
  );
};

export default SiteLinks;

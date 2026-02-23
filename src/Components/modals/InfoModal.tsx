import React from "react";
import type { InfoSection } from "../../types/game";

const INFO_TABS: { id: InfoSection; label: string }[] = [
  { id: "about", label: "About" },
  { id: "how", label: "How to play" },
  { id: "policy", label: "Privacy & ads" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

interface InfoModalProps {
  section: InfoSection;
  onClose: () => void;
  onNavigate: (section: InfoSection) => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ section, onClose, onNavigate }) => {
  return (
    <div className="fw-modal" role="dialog" aria-modal="true">
      <div className="fw-modal__backdrop" onClick={onClose} />
      <div className="fw-modal__content fw-modal__content--info">
        <div className="fw-modal__header">
          <div>
            <p className="fw-modal__eyebrow">Site guide</p>
            <h2 className="fw-modal__title">Football Wordle information</h2>
          </div>
          <button
            className="fw-modal__close"
            aria-label="Close information"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="fw-info">
          <nav className="fw-info__nav" aria-label="Information sections">
            {INFO_TABS.map((item) => (
              <button
                key={item.id}
                className={`fw-info__tab ${
                  section === item.id ? "fw-info__tab--active" : ""
                }`.trim()}
                aria-current={section === item.id ? "page" : undefined}
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="fw-info__content">
            {section === "about" && (
              <div className="fw-info__panel">
                <h3>About Football Wordle</h3>
                <p>
                  Built by football fans, this game focuses on recognizable
                  names from major leagues. We update the lists regularly and
                  keep the rules short and clear so every round feels fair.
                </p>
                <p>
                  The experience is ad-supported, but gameplay always stays
                  front and center.
                </p>
              </div>
            )}

            {section === "how" && (
              <div className="fw-info__panel">
                <h3>How to play</h3>
                <ol>
                  <li>Choose players or clubs.</li>
                  <li>Type a name and submit.</li>
                  <li>
                    Green = correct spot, yellow = in the word, red = not in the
                    word.
                  </li>
                  <li>You have 6 tries to solve it.</li>
                </ol>
              </div>
            )}

            {section === "policy" && (
              <div className="fw-info__panel">
                <h3>Privacy &amp; ads policy</h3>
                <ul>
                  <li>No personal data collection. Only local storage for streaks.</li>
                  <li>No user accounts or forced sign-ups.</li>
                  <li>
                    Ads appear away from core controls to avoid accidental clicks.
                  </li>
                  <li>No custom tracking pixels or social embeds.</li>
                </ul>
                <p>Policy updated February 4, 2026.</p>
              </div>
            )}

            {section === "faq" && (
              <div className="fw-info__panel">
                <h3>FAQ</h3>
                <p>
                  <strong>Is it free?</strong> Yes, the game is free to play in
                  your browser.
                </p>
                <p>
                  <strong>Does it work on mobile?</strong> Yes. The layout and
                  keyboard adapt for phones and tablets.
                </p>
                <p>
                  <strong>How do updates work?</strong> Lists are reviewed
                  weekly during the season and after transfer windows.
                </p>
              </div>
            )}

            {section === "contact" && (
              <div className="fw-info__panel">
                <h3>Contact</h3>
                <p>
                  Have feedback or found a missing name? Email us and we will
                  review it.
                </p>
                <p>
                  Email:{" "}
                  <a className="fw-inline-link" href="mailto:webgames594@gmail.com">
                    webgames594@gmail.com
                  </a>
                </p>
                <p>
                  We respond to genuine feedback and update the FAQ when common
                  questions come in.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;

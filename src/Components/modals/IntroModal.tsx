import React from "react";

interface IntroModalProps {
  onClose: () => void;
}

const IntroModal: React.FC<IntroModalProps> = ({ onClose }) => {
  return (
    <div className="fw-modal" role="dialog" aria-modal="true">
      <div className="fw-modal__backdrop" onClick={onClose} />
      <div className="fw-modal__content fw-modal__content--intro">
        <div className="fw-modal__header">
          <div>
            <p className="fw-modal__eyebrow">Quick start</p>
            <h2 className="fw-modal__title">How to play</h2>
          </div>
          <button
            className="fw-modal__close"
            aria-label="Close intro"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <p className="fw-intro-text">
          You have 6 tries to guess the football player. Type or tap letters,
          then press enter to submit.
        </p>

        <div className="fw-intro-steps">
          <div className="fw-intro-step">
            <span className="fw-intro-badge">Green</span>
            <span>Correct letter in the correct spot</span>
          </div>
          <div className="fw-intro-step">
            <span className="fw-intro-badge fw-intro-badge--yellow">Yellow</span>
            <span>Letter is in the word, wrong spot</span>
          </div>
          <div className="fw-intro-step">
            <span className="fw-intro-badge fw-intro-badge--red">Red</span>
            <span>Letter is not in the word</span>
          </div>
        </div>

        <div className="fw-modal__actions">
          <button className="fw-button" onClick={onClose}>
            Start playing
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroModal;

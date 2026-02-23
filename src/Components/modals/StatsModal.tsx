import React from "react";
import type { Stats } from "../../types/game";

interface StatsModalProps {
  stats: Stats;
  guesses: string[];
  onClose: () => void;
  onNewGame: () => void;
}

const StatsModal: React.FC<StatsModalProps> = ({ stats, onClose, onNewGame }) => {
  const totalSolved = stats.guesses.reduce((sum, n) => sum + n, 0);
  const totalPlayed = totalSolved + stats.losses;
  const winRate = totalPlayed === 0 ? 0 : Math.round((totalSolved / totalPlayed) * 100);
  const maxGuessCount = Math.max(...stats.guesses, 1);

  return (
    <div className="fw-modal" role="dialog" aria-modal="true">
      <div className="fw-modal__backdrop" onClick={onClose} />
      <div className="fw-modal__content">
        <div className="fw-modal__header">
          <div>
            <p className="fw-modal__eyebrow">Session recap</p>
            <h2 className="fw-modal__title">Your Footle stats</h2>
          </div>
          <button
            className="fw-modal__close"
            aria-label="Close stats"
            onClick={onClose}
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
              onClose();
              onNewGame();
            }}
          >
            Play again
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsModal;

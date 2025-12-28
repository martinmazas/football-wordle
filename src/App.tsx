import { useState } from "react";
import FootballWordle from "./FootballWordle";
import players from "./players.json";
import teams from "./teams.json";
import previewImg from "./images/preview.webp";

type Mode = "players" | "teams" | null;

const App = () => {
  const [mode, setMode] = useState<Mode>(null);

  if (!mode) {
    return (
      <div className="fw-landing">
        <div className="fw-landing__card">
          <div className="fw-landing__header">
            <div className="fw-landing__pill">Play the football Wordle</div>
            <h1 className="fw-landing__title">Jump in and start guessing</h1>
            <p className="fw-landing__subtitle">
              Quick, bite-sized football Wordle. Pick a mode to start playing — switch anytime.
            </p>

            <div className="fw-landing__chips">
              <span className="fw-chip">6 tries</span>
              <span className="fw-chip">Mobile + desktop</span>
              <span className="fw-chip">Live streaks</span>
            </div>
          </div>

          <div className="fw-landing__grid">
            <div className="fw-landing__left">
              <div className="fw-landing__options">
                <button
                  className="fw-landing__option"
                  onClick={() => setMode("players")}
                >
                  <div className="fw-landing__option-top">
                    <span className="fw-landing__cta">Play →</span>
                  </div>
                  <h3 className="fw-landing__option-title">Guess players</h3>
                  <p className="fw-landing__option-desc">
                    Find the footballer in 6 tries with keyboard and color
                    hints.
                  </p>
                </button>

                <button
                  className="fw-landing__option"
                  onClick={() => setMode("teams")}
                >
                  <div className="fw-landing__option-top">
                    <span className="fw-landing__cta">Play →</span>
                  </div>
                  <h3 className="fw-landing__option-title">Guess teams</h3>
                  <p className="fw-landing__option-desc">
                    Guess the club in 6 tries. Europe, Americas, MLS, Middle
                    East.
                  </p>
                </button>
              </div>

              <div className="fw-landing__about">
                <div className="fw-about">
                  <div className="fw-about__header">
                    <h2 className="fw-about__title">About the game</h2>
                    <p className="fw-about__subtitle">
                      Wordle-style football guessing in 6 tries.
                    </p>
                  </div>

                  <div className="fw-about__content">
                    <ul className="fw-about__list">
                      <li>Type on your keyboard (or tap the on-screen keyboard).</li>
                      <li>Press Enter to submit each guess.</li>
                      <li>Stats and streaks are saved on your device.</li>
                    </ul>

                    <div className="fw-about__legend" aria-label="Color meaning">
                      <span className="fw-about__legend-item">
                        <span className="fw-about__dot fw-about__dot--green" />
                        Correct spot
                      </span>
                      <span className="fw-about__legend-item">
                        <span className="fw-about__dot fw-about__dot--yellow" />
                        In word
                      </span>
                      <span className="fw-about__legend-item">
                        <span className="fw-about__dot fw-about__dot--red" />
                        Not in word
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="fw-landing__right">
              <div className="fw-landing__hero">
                <div className="fw-landing__hero-label">Game preview</div>
                <div
                  className="fw-landing__hero-img"
                  role="img"
                  aria-label="Football Wordle game preview"
                >
                  <img
                    src={previewImg}
                    alt="Football Wordle game preview"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <FootballWordle
      mode={mode}
      wordList={mode === "teams" ? teams : players}
      onBack={() => setMode(null)}
    />
  );
};

export default App;

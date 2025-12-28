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
        <div className="fw-landing__shell">
          <header className="fw-landing__nav" aria-label="Main navigation">
            <div className="fw-landing__brand">
              <span className="fw-landing__logo">Football Wordle</span>
              <span className="fw-landing__tag">Free game</span>
            </div>
            <nav className="fw-landing__nav-links">
              <a href="#como-jugar">How to play</a>
              <a href="#caracteristicas">Features</a>
              <a href="#faq">FAQ</a>
            </nav>
            <div className="fw-landing__nav-cta">
              <button
                className="fw-button fw-button--ghost fw-button--sm"
                onClick={() => setMode("teams")}
              >
                Guess teams
              </button>
              <button
                className="fw-button fw-button--sm"
                onClick={() => setMode("players")}
              >
                Play players
              </button>
            </div>
          </header>

          <section className="fw-landing__hero" id="inicio">
            <div className="fw-landing__hero-copy">
              <div className="fw-landing__pill">
                Football Wordle in English · No sign-up
              </div>
              <h1 className="fw-landing__title">
                Guess players or clubs in 6 tries
              </h1>
              <p className="fw-landing__subtitle">
                Fast rounds designed for mobile and desktop. Original copy, streaks saved on your device, and clear
                rules. Great for football fans and ready for Google AdSense policy compliance.
              </p>

              <div className="fw-landing__cta-row">
                <button className="fw-button" onClick={() => setMode("players")}>
                  Guess players
                </button>
                <button
                  className="fw-button fw-button--ghost"
                  onClick={() => setMode("teams")}
                >
                  Guess clubs
                </button>
                <a className="fw-landing__link" href="#como-jugar">
                  See how it works
                </a>
              </div>

              <ul className="fw-landing__highlights">
                <li>Frequent updates with real names from top leagues.</li>
                <li>Stats and streaks saved locally; no personal data requested.</li>
                <li>Accessible design and clear copy to meet AdSense policies.</li>
              </ul>
            </div>

            <div className="fw-landing__hero-visual">
              <div className="fw-landing__hero-card">
                <div className="fw-landing__hero-label">Vista previa</div>
                <div
                  className="fw-landing__hero-img"
                  role="img"
                  aria-label="Vista previa del juego Football Wordle"
                >
                  <img
                    src={previewImg}
                    alt="Vista previa del juego Football Wordle"
                    loading="lazy"
                  />
                </div>
                <p className="fw-landing__hero-note">
                  Short rounds with 6 guesses, on-screen keyboard, and color-coded feedback. No blockers or forced
                  steps: you play instantly.
                </p>
              </div>
            </div>
          </section>

          <section className="fw-section fw-section--panel" id="como-jugar">
            <div className="fw-section__header">
              <p className="fw-eyebrow">Quick guide</p>
              <h2>How to play in under a minute</h2>
              <p className="fw-section__lead">
                Pick a mode and type a name each turn. Colors show if a letter is in the right spot (green), in the
                word (yellow), or not present (red).
              </p>
            </div>

            <div className="fw-steps">
              <article className="fw-step">
                <div className="fw-step__number">1</div>
                <div>
                  <h3>Choose players or clubs</h3>
                  <p>
                    Use the top selector to start with footballers or teams. Switch modes whenever you like.
                  </p>
                </div>
              </article>
              <article className="fw-step">
                <div className="fw-step__number">2</div>
                <div>
                  <h3>Type and submit</h3>
                  <p>
                    Type the name and press Enter (or the on-screen send). On mobile you get an accessible input that
                    stays out of the way.
                  </p>
                </div>
              </article>
              <article className="fw-step">
                <div className="fw-step__number">3</div>
                <div>
                  <h3>Follow the hints</h3>
                  <p>
                    Green means right spot; yellow, letter present; red, not in the word. Use that feedback to refine
                    each guess.
                  </p>
                </div>
              </article>
              <article className="fw-step">
                <div className="fw-step__number">4</div>
                <div>
                  <h3>Check your streaks</h3>
                  <p>
                    Stats stay on your device (localStorage). No email or sign-up required to play.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="fw-section" id="caracteristicas">
            <div className="fw-section__header">
              <p className="fw-eyebrow">Useful content</p>
              <h2>Built to meet policies and add value</h2>
              <p className="fw-section__lead">
                Clear writing, simple navigation, and a stable experience help Google AdSense see original, helpful
                content.
              </p>
            </div>

            <div className="fw-feature-grid">
              <article className="fw-feature">
                <h3>Instant play</h3>
                <p>
                  Fast load with Vite and React. No blank walls or blockers—the main experience appears immediately.
                </p>
              </article>
              <article className="fw-feature">
                <h3>Original copy</h3>
                <p>
                  Handwritten descriptions, rules, and FAQ to avoid duplicate or generic content.
                </p>
              </article>
              <article className="fw-feature">
                <h3>Safe experience</h3>
                <p>
                  No personal data collection. We store only your stats on your own device to keep streaks.
                </p>
              </article>
              <article className="fw-feature">
                <h3>Accessibility</h3>
                <p>
                  Legible text, high contrast, and keyboard-friendly navigation. Includes ARIA labels and descriptive
                  buttons.
                </p>
              </article>
              <article className="fw-feature">
                <h3>Curated lists</h3>
                <p>
                  Popular players and clubs from European and American leagues so each round feels relevant to fans.
                </p>
              </article>
              <article className="fw-feature">
                <h3>Ad-ready layout</h3>
                <p>
                  Defined placements for ads that do not block gameplay, aligned with placement policies.
                </p>
              </article>
            </div>
          </section>

          <section className="fw-section fw-section--panel" id="faq">
            <div className="fw-section__header">
              <p className="fw-eyebrow">Frequently asked</p>
              <h2>Everything you need to know</h2>
              <p className="fw-section__lead">
                Clear answers for users and reviewers. If you miss something, tell us and we will add it.
              </p>
            </div>

            <div className="fw-faq">
              <div className="fw-faq__item">
                <h3>What data is stored?</h3>
                <p>
                  Only progress and streaks in your browser via local storage. We do not ask for email or force any
                  forms.
                </p>
              </div>
              <div className="fw-faq__item">
                <h3>Does it work on mobile?</h3>
                <p>
                  Yes. The on-screen keyboard and responsive layout help keep content visible even when ads are
                  enabled.
                </p>
              </div>
              <div className="fw-faq__item">
                <h3>How is it funded?</h3>
                <p>
                  The project is free. We will show Google AdSense ads in clear, respectful placements that follow UX
                  policies.
                </p>
              </div>
            </div>
          </section>
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

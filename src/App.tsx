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
              <a href="#about">About</a>
              <a href="#how-to-play">How to play</a>
              <a href="#features">Features</a>
              <a href="#policy">Policy</a>
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
                Guess players
              </button>
            </div>
          </header>

          <section className="fw-landing__hero" id="start">
            <div className="fw-landing__hero-copy">
              <div className="fw-landing__pill">
                Football Wordle in English · No sign-up
              </div>
              <h1 className="fw-landing__title">
                Guess players or clubs in 6 tries
              </h1>
              <p className="fw-landing__subtitle">
                Fast rounds designed for mobile and desktop. Original copy,
                streaks saved on your device, and clear rules. Great for
                football fans of all levels.
              </p>

              <div className="fw-landing__cta-row">
                <button
                  className="fw-button"
                  onClick={() => setMode("players")}
                >
                  Guess players
                </button>
                <button
                  className="fw-button fw-button--ghost"
                  onClick={() => setMode("teams")}
                >
                  Guess clubs
                </button>
                <a className="fw-landing__link" href="#how-to-play">
                  See how it works
                </a>
              </div>

              <ul className="fw-landing__highlights">
                <li>Frequent updates with real names from top leagues.</li>
                <li>
                  Stats and streaks saved locally; no personal data requested.
                </li>
                <li>
                  Accessible design, clear copy, and keyboard-friendly controls.
                </li>
              </ul>
            </div>

            <div className="fw-landing__hero-visual">
              <div className="fw-landing__hero-card">
                <div className="fw-landing__hero-label">Preview</div>
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
                <p className="fw-landing__hero-note">
                  Short rounds with 6 guesses, on-screen keyboard, and
                  color-coded feedback. No blockers or forced steps: you play
                  instantly.
                </p>
              </div>
            </div>
          </section>

          <section className="fw-section" id="about">
            <div className="fw-section__header">
              <p className="fw-eyebrow">About the project</p>
              <h2>Built by football fans, for football fans</h2>
              <p className="fw-section__lead">
                We curate names manually, update them weekly, and write every
                explanation you read here. The goal is to offer a clean,
                policy-friendly word game that feels current with each football
                season.
              </p>
            </div>

            <div className="fw-feature-grid">
              <article className="fw-feature">
                <h3>Fresh lists</h3>
                <p>
                  Players include recent transfers and rising talents; clubs
                  cover top-flight leagues and continental competitions.
                </p>
              </article>
              <article className="fw-feature">
                <h3>Two modes, endless rounds</h3>
                <p>
                  Use “Guess players” to test your footballer knowledge, or
                  “Guess clubs” to work through top-flight teams. Play as many
                  rounds as you like.
                </p>
              </article>
              <article className="fw-feature">
                <h3>Editorial notes</h3>
                <p>
                  We document changes in the FAQ and highlight tricky names
                  (accents, short names, common nicknames) so you know what to
                  expect.
                </p>
              </article>
            </div>
          </section>

          <section className="fw-section fw-section--panel" id="how-to-play">
            <div className="fw-section__header">
              <p className="fw-eyebrow">Quick guide</p>
              <h2>How to play in under a minute</h2>
              <p className="fw-section__lead">
                Pick a mode and type a name each turn. Colors show if a letter
                is in the right spot (green), in the word (yellow), or not
                present (red).
              </p>
            </div>

            <div className="fw-steps">
              <article className="fw-step">
                <div className="fw-step__number">1</div>
                <div>
                  <h3>Choose players or clubs</h3>
                  <p>
                    Use the top selector to start with footballers or teams.
                    Switch modes whenever you like.
                  </p>
                </div>
              </article>
              <article className="fw-step">
                <div className="fw-step__number">2</div>
                <div>
                  <h3>Type and submit</h3>
                  <p>
                    Type the name and press Enter (or the on-screen send). On
                    mobile you get an accessible input that stays out of the
                    way.
                  </p>
                </div>
              </article>
              <article className="fw-step">
                <div className="fw-step__number">3</div>
                <div>
                  <h3>Follow the hints</h3>
                  <p>
                    Green means right spot; yellow, letter present; red, not in
                    the word. Use that feedback to refine each guess.
                  </p>
                </div>
              </article>
              <article className="fw-step">
                <div className="fw-step__number">4</div>
                <div>
                  <h3>Check your streaks</h3>
                  <p>
                    Stats stay on your device (localStorage). No email or
                    sign-up required to play.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="fw-section" id="features">
            <div className="fw-section__header">
              <p className="fw-eyebrow">Why play this</p>
              <h2>A clean game built around the football experience</h2>
              <p className="fw-section__lead">
                Clear rules, simple navigation, and a stable experience so you
                can focus on the football, not the interface.
              </p>
            </div>

            <div className="fw-feature-grid">
              <article className="fw-feature">
                <h3>Instant play</h3>
                <p>
                  Fast load with Vite and React. No blank walls or blockers—the
                  main experience appears immediately.
                </p>
              </article>
              <article className="fw-feature">
                <h3>Original copy</h3>
                <p>
                  Handwritten descriptions, rules, and FAQ to avoid duplicate or
                  generic content.
                </p>
              </article>
              <article className="fw-feature">
                <h3>Safe experience</h3>
                <p>
                  No personal data collection. We store only your stats on your
                  own device to keep streaks.
                </p>
              </article>
              <article className="fw-feature">
                <h3>Accessibility</h3>
                <p>
                  Legible text, high contrast, and keyboard-friendly navigation.
                  Includes ARIA labels and descriptive buttons.
                </p>
              </article>
              <article className="fw-feature">
                <h3>Curated lists</h3>
                <p>
                  Popular players and clubs from European and American leagues
                  so each round feels relevant to fans.
                </p>
              </article>
              <article className="fw-feature">
                <h3>Distraction-free layout</h3>
                <p>
                  The board, keyboard, and hints stay front and center. No
                  pop-ups or overlays that block gameplay.
                </p>
              </article>
              <article className="fw-feature">
                <h3>Fair play</h3>
                <p>
                  Names come from public league rosters; we avoid obscure youth
                  players so rounds stay fair for casual fans.
                </p>
              </article>
              <article className="fw-feature">
                <h3>Changelog</h3>
                <p>
                  We keep a short record of list updates and UI tweaks so
                  players know what changed and when.
                </p>
              </article>
            </div>
          </section>

          <section className="fw-section fw-section--panel" id="policy">
            <div className="fw-section__header">
              <p className="fw-eyebrow">Privacy &amp; ads</p>
              <h2>Transparent data and monetization policy</h2>
              <p className="fw-section__lead">
                No accounts and no personal data collection. Ads are placed away
                from core controls so they never interrupt gameplay.
              </p>
            </div>

            <div className="fw-steps">
              <article className="fw-step">
                <div className="fw-step__number">1</div>
                <div>
                  <h3>Data stored locally</h3>
                  <p>
                    We save streaks and stats in your browser only. Clearing
                    your cache removes them. Nothing leaves your device.
                  </p>
                </div>
              </article>
              <article className="fw-step">
                <div className="fw-step__number">2</div>
                <div>
                  <h3>Ads with room to play</h3>
                  <p>
                    Ad placements are separated from the keyboard and board to
                    avoid accidental taps and layout shift on mobile.
                  </p>
                </div>
              </article>
              <article className="fw-step">
                <div className="fw-step__number">3</div>
                <div>
                  <h3>No tracking pixels</h3>
                  <p>
                    We do not embed social pixels or custom trackers. Only the
                    game code and standard analytics for performance.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="fw-section fw-section--panel" id="faq">
            <div className="fw-section__header">
              <p className="fw-eyebrow">Frequently asked</p>
              <h2>Everything you need to know</h2>
              <p className="fw-section__lead">
                Clear answers for new and returning players. If something is
                missing, let us know and we will add it.
              </p>
            </div>

            <div className="fw-faq">
              <div className="fw-faq__item">
                <h3>What data is stored?</h3>
                <p>
                  Only progress and streaks in your browser via local storage.
                  We do not ask for email or force any forms.
                </p>
              </div>
              <div className="fw-faq__item">
                <h3>Does it work on mobile?</h3>
                <p>
                  Yes. The on-screen keyboard and responsive layout work on all
                  screen sizes, including small phones.
                </p>
              </div>
              <div className="fw-faq__item">
                <h3>How is it funded?</h3>
                <p>
                  The project is free to play. It is supported by display
                  advertising shown in placements that stay out of the way of
                  gameplay.
                </p>
              </div>
              <div className="fw-faq__item">
                <h3>How often do you update names?</h3>
                <p>
                  Weekly during the season and after major transfer windows. We
                  remove injured long-term players to keep rounds fair.
                </p>
              </div>
            </div>
          </section>

          <footer className="fw-landing__footer" id="contact">
            <div className="fw-landing__footer-main">
              <div>
                <h2>Contact &amp; updates</h2>
                <p>
                  Football Wordle is a fan-made game with weekly list updates
                  during the season. Last updated February 4, 2026.
                </p>
                <p>
                  Email:{" "}
                  <a
                    className="fw-inline-link"
                    href="mailto:webgames594@gmail.com"
                  >
                    webgames594@gmail.com
                  </a>
                </p>
              </div>
              <div className="fw-landing__footer-links">
                <a href="#about">About</a>
                <a href="#how-to-play">How to play</a>
                <a href="#features">Features</a>
                <a href="#policy">Privacy &amp; ads</a>
                <a href="#faq">FAQ</a>
              </div>
            </div>
            <p className="fw-landing__footer-note">
              Independent project. No association with Wordle or official
              leagues. ·{" "}
              <a className="fw-inline-link" href="/privacy-policy.html">
                Privacy policy
              </a>
            </p>
          </footer>
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

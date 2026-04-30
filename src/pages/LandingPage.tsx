import React from "react";
import type { GameMode } from "../types/game";
import previewImg from "../images/preview.webp";

interface LandingPageProps {
  onSelectMode: (mode: GameMode) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectMode }) => {
  return (
    <div className="fw-landing">
      <div className="fw-landing__shell">

        {/* NAV */}
        <header className="fw-landing__nav" aria-label="Main navigation">
          <div className="fw-landing__brand">
            <span className="fw-landing__logo">⚽ Football Wordle</span>
            <span className="fw-landing__tag">Free</span>
          </div>
          <nav className="fw-landing__nav-links">
            <a href="#how-to-play">How to play</a>
            <a href="#leagues">Leagues</a>
            <a href="#strategy">Strategy</a>
            <a href="#faq">FAQ</a>
            <a href="/blog.html">Blog</a>
            <a href="/about.html">About</a>
          </nav>
          <div className="fw-landing__nav-cta">
            <button
              className="fw-button fw-button--ghost fw-button--sm"
              onClick={() => onSelectMode("teams")}
            >
              Guess clubs
            </button>
            <button
              className="fw-button fw-button--sm"
              onClick={() => onSelectMode("players")}
            >
              Guess players
            </button>
          </div>
        </header>

        {/* HERO */}
        <section className="fw-landing__hero" id="start">
          <div className="fw-landing__hero-copy">
            <div className="fw-landing__pill">Football Wordle · Free · No sign-up</div>
            <h1 className="fw-landing__title">
              Guess football players &amp; clubs in 6 tries
            </h1>
            <p className="fw-landing__subtitle">
              Test your football knowledge against names from the Premier League, La Liga,
              Bundesliga, Serie A, Ligue 1, MLS, and more. Color hints guide every guess.
              Rounds take under a minute — play as many as you like.
            </p>
            <div className="fw-landing__cta-row">
              <button className="fw-button" onClick={() => onSelectMode("players")}>
                Guess players
              </button>
              <button
                className="fw-button fw-button--ghost"
                onClick={() => onSelectMode("teams")}
              >
                Guess clubs
              </button>
              <a className="fw-landing__link" href="#how-to-play">
                How it works ↓
              </a>
            </div>
            <ul className="fw-landing__highlights">
              <li>500+ players &amp; clubs from 6+ major leagues</li>
              <li>Updated weekly — current squads, recent transfers included</li>
              <li>Stats &amp; streaks saved locally — no account needed</li>
            </ul>
          </div>

          <div className="fw-landing__hero-visual">
            <div className="fw-landing__hero-card">
              <div className="fw-landing__hero-label">Game preview</div>
              <div
                className="fw-landing__hero-img"
                role="img"
                aria-label="Football Wordle game showing colored letter tiles"
              >
                <img
                  src={previewImg}
                  alt="Football Wordle game showing color-coded letter tiles for guessing football players"
                  loading="eager"
                />
              </div>
              <p className="fw-landing__hero-note">
                6 guesses per round. Color-coded feedback on every letter.
                No splash screens — play starts immediately.
              </p>
            </div>
          </div>
        </section>

        {/* STATS RIBBON */}
        <div className="fw-stats-ribbon" aria-label="Game statistics">
          <div className="fw-stat-pill">
            <span className="fw-stat-pill__number">500+</span>
            <span className="fw-stat-pill__label">Players &amp; clubs</span>
          </div>
          <div className="fw-stat-pill">
            <span className="fw-stat-pill__number">6+</span>
            <span className="fw-stat-pill__label">Major leagues</span>
          </div>
          <div className="fw-stat-pill">
            <span className="fw-stat-pill__number">2</span>
            <span className="fw-stat-pill__label">Game modes</span>
          </div>
          <div className="fw-stat-pill">
            <span className="fw-stat-pill__number">Weekly</span>
            <span className="fw-stat-pill__label">List updates</span>
          </div>
          <div className="fw-stat-pill">
            <span className="fw-stat-pill__number">Free</span>
            <span className="fw-stat-pill__label">Always</span>
          </div>
        </div>

        {/* HOW TO PLAY */}
        <section className="fw-section fw-section--panel" id="how-to-play">
          <div className="fw-section__header">
            <p className="fw-eyebrow">Quick guide</p>
            <h2>How to play Football Wordle</h2>
            <p className="fw-section__lead">
              Pick a mode, type a football name, and use the color feedback to narrow down
              the answer. Most players solve it in 3 or 4 guesses once they learn the system.
            </p>
          </div>

          <div className="fw-steps">
            <article className="fw-step">
              <div className="fw-step__number">1</div>
              <div>
                <h3>Choose your mode</h3>
                <p>
                  <strong>Guess players</strong> — identify famous footballers by their last name
                  (or first name for Brazilians like Neymar or Vinicius).{" "}
                  <strong>Guess clubs</strong> — name top-flight clubs using the most
                  distinctive keyword (WOLVES, not WOLVERHAMPTON).
                </p>
              </div>
            </article>
            <article className="fw-step">
              <div className="fw-step__number">2</div>
              <div>
                <h3>Type a name and submit</h3>
                <p>
                  Use your physical keyboard on desktop or the on-screen keyboard on mobile.
                  Accents are handled automatically — type MBAPPE, not MBAPPÉ. Press{" "}
                  <strong>Enter</strong> to reveal the hints.
                </p>
              </div>
            </article>
            <article className="fw-step">
              <div className="fw-step__number">3</div>
              <div>
                <h3>Read the color hints</h3>
                <p>
                  <span style={{ color: "#22c55e", fontWeight: 700 }}>Green</span> — correct letter in the right position.{" "}
                  <span style={{ color: "#eab308", fontWeight: 700 }}>Yellow</span> — letter is in the word but wrong position.{" "}
                  <span style={{ color: "#ef4444", fontWeight: 700 }}>Red</span> — letter does not appear in the answer at all.
                </p>
              </div>
            </article>
            <article className="fw-step">
              <div className="fw-step__number">4</div>
              <div>
                <h3>Apply the hints and repeat</h3>
                <p>
                  Keep green letters locked in place. Move yellow letters to a new position.
                  Never reuse red letters. Use your football knowledge to generate the best
                  candidate for each guess. You have 6 tries total.
                </p>
              </div>
            </article>
          </div>

          {/* Tile example */}
          <div className="fw-tile-example">
            <p className="fw-tile-example__label">Example — guessing a 6-letter Premier League player:</p>

            <div className="fw-tile-example__block">
              <div className="fw-tile-example__row">
                <span className="fw-demo-tile fw-demo-tile--correct">S</span>
                <span className="fw-demo-tile fw-demo-tile--absent">A</span>
                <span className="fw-demo-tile fw-demo-tile--absent">L</span>
                <span className="fw-demo-tile fw-demo-tile--present">T</span>
                <span className="fw-demo-tile fw-demo-tile--correct">E</span>
                <span className="fw-demo-tile fw-demo-tile--absent">R</span>
              </div>
              <p className="fw-tile-example__hint">
                Guess: SALTER — S and E are confirmed. T is in the word but not at position 4.
              </p>
            </div>

            <div className="fw-tile-example__block">
              <div className="fw-tile-example__row">
                <span className="fw-demo-tile fw-demo-tile--correct">S</span>
                <span className="fw-demo-tile fw-demo-tile--correct">T</span>
                <span className="fw-demo-tile fw-demo-tile--correct">O</span>
                <span className="fw-demo-tile fw-demo-tile--correct">N</span>
                <span className="fw-demo-tile fw-demo-tile--correct">E</span>
                <span className="fw-demo-tile fw-demo-tile--correct">S</span>
              </div>
              <p className="fw-tile-example__hint">
                Guess: STONES — all correct! John Stones (Manchester City) solved in 2 guesses.
              </p>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "1.2rem" }}>
            <a className="fw-button fw-button--ghost" href="/how-to-play.html">
              Full how-to-play guide with FAQ →
            </a>
          </div>
        </section>

        {/* LEAGUES COVERED */}
        <section className="fw-section" id="leagues">
          <div className="fw-section__header">
            <p className="fw-eyebrow">Leagues covered</p>
            <h2>Six major leagues, hundreds of names</h2>
            <p className="fw-section__lead">
              Football Wordle draws from the world's most-watched leagues. Each league brings
              its own naming traditions — from vowel-rich Italian surnames to the consonant
              clusters of West African players in Ligue 1.
            </p>
          </div>

          <div className="fw-league-grid">
            <article className="fw-league-card">
              <div className="fw-league-card__flag">🏴󠁧󠁢󠁥󠁮󠁧󠁿</div>
              <div>
                <h3>Premier League</h3>
                <p>
                  The most diverse league in Football Wordle. Twenty clubs bring English,
                  Portuguese, French, West African, and Scandinavian names into the same list.
                  Short names like RICE and KANE sit alongside HAALAND, TROSSARD, and ONANA.
                  High variety means no single regional pattern dominates.
                </p>
                <span className="fw-league-card__tag">20 clubs · Highest name diversity</span>
              </div>
            </article>

            <article className="fw-league-card">
              <div className="fw-league-card__flag">🇪🇸</div>
              <div>
                <h3>La Liga</h3>
                <p>
                  Spanish surnames follow consistent patterns — endings in -EZ (SANCHEZ,
                  RAMIREZ, GOMEZ), -O (SERGIO, MARCO), and -A (SILVA, COSTA, RAMOS). South
                  American players add Italian-origin names. Once you recognise these endings,
                  La Liga names become much easier to guess.
                </p>
                <span className="fw-league-card__tag">18 clubs · Vowel-rich patterns</span>
              </div>
            </article>

            <article className="fw-league-card">
              <div className="fw-league-card__flag">🇩🇪</div>
              <div>
                <h3>Bundesliga</h3>
                <p>
                  German names feature consonant clusters that can catch players off guard —
                  KIMMICH, GNABRY, GORETZKA, NEUER. Medium length (5–7 letters) and compound
                  structures make them moderately challenging. The league's growing African and
                  South American presence adds further variety.
                </p>
                <span className="fw-league-card__tag">18 clubs · Consonant-heavy</span>
              </div>
            </article>

            <article className="fw-league-card">
              <div className="fw-league-card__flag">🇮🇹</div>
              <div>
                <h3>Serie A</h3>
                <p>
                  Italian surnames almost always end in vowels — -I (BONUCCI, BARELLA,
                  PELLEGRINI) or -O (INSIGNE, IMMOBILE). Argentine players add double-letter
                  names like DYBALA and LAUTARO. Vowel-heavy patterns mean you can often
                  confirm letters early and narrow down quickly.
                </p>
                <span className="fw-league-card__tag">20 clubs · Vowel endings</span>
              </div>
            </article>

            <article className="fw-league-card">
              <div className="fw-league-card__flag">🇫🇷</div>
              <div>
                <h3>Ligue 1</h3>
                <p>
                  The most nationally diverse league. West African naming traditions produce
                  consonant clusters at the start of names — NKUNKU, MBAPPE, THURAM, KOLO.
                  North African names (Algerian, Moroccan) add further patterns. Ligue 1 tends
                  to produce the hardest names in the game.
                </p>
                <span className="fw-league-card__tag">18 clubs · Hardest names</span>
              </div>
            </article>

            <article className="fw-league-card">
              <div className="fw-league-card__flag">🇺🇸</div>
              <div>
                <h3>MLS</h3>
                <p>
                  American and Canadian players bring familiar English and Hispanic surnames.
                  High-profile European transfers mean you'll also see recognisable names from
                  other leagues. MLS names tend to be shorter on average — an easier entry
                  point for fans newer to the game.
                </p>
                <span className="fw-league-card__tag">29 clubs · Accessible names</span>
              </div>
            </article>
          </div>

          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            <a className="fw-inline-link" href="/blog/football-leagues-guide.html">
              Read the full leagues guide with naming tips for each →
            </a>
          </p>
        </section>

        {/* NAME DIFFICULTY */}
        <section className="fw-section fw-section--panel" id="name-types">
          <div className="fw-section__header">
            <p className="fw-eyebrow">What to expect</p>
            <h2>Name difficulty — from easy to expert</h2>
            <p className="fw-section__lead">
              Football Wordle includes names across a wide difficulty range. Knowing the
              categories helps you prepare — and makes those harder names satisfying to crack.
            </p>
          </div>

          <div className="fw-difficulty-grid">
            <article className="fw-difficulty-card">
              <div className="fw-difficulty-card__header">
                <span className="fw-difficulty-badge fw-difficulty-badge--easy">Easier</span>
                <h3>Short English names</h3>
              </div>
              <p>
                Known to any football fan globally. Short length means fewer unknown positions
                from the start. Great for building a streak or warming up.
              </p>
              <div className="fw-name-examples">
                <span className="fw-name-chip">KANE</span>
                <span className="fw-name-chip">RICE</span>
                <span className="fw-name-chip">SHAW</span>
                <span className="fw-name-chip">WARD</span>
                <span className="fw-name-chip">JAMES</span>
              </div>
            </article>

            <article className="fw-difficulty-card">
              <div className="fw-difficulty-card__header">
                <span className="fw-difficulty-badge fw-difficulty-badge--medium">Moderate</span>
                <h3>Spanish &amp; Italian names</h3>
              </div>
              <p>
                Consistent vowel patterns. Once you spot the ending (-EZ, -I, -O, -A) you
                can narrow down the candidate list quickly. Reward regular La Liga or Serie A
                watchers.
              </p>
              <div className="fw-name-examples">
                <span className="fw-name-chip">SILVA</span>
                <span className="fw-name-chip">RAMOS</span>
                <span className="fw-name-chip">BARELLA</span>
                <span className="fw-name-chip">SANCHEZ</span>
                <span className="fw-name-chip">DYBALA</span>
              </div>
            </article>

            <article className="fw-difficulty-card">
              <div className="fw-difficulty-card__header">
                <span className="fw-difficulty-badge fw-difficulty-badge--medium">Moderate</span>
                <h3>Scandinavian &amp; Dutch</h3>
              </div>
              <p>
                Double-vowel combinations (AA in HAALAND, OO in various Dutch names) and
                the IJ cluster are distinctive once you know to look for them. Reward fans
                who follow Eredivisie or Norwegian football.
              </p>
              <div className="fw-name-examples">
                <span className="fw-name-chip">HAALAND</span>
                <span className="fw-name-chip">ODEGAARD</span>
                <span className="fw-name-chip">ERIKSEN</span>
                <span className="fw-name-chip">TROSSARD</span>
              </div>
            </article>

            <article className="fw-difficulty-card">
              <div className="fw-difficulty-card__header">
                <span className="fw-difficulty-badge fw-difficulty-badge--hard">Harder</span>
                <h3>West African &amp; Eastern European</h3>
              </div>
              <p>
                Unfamiliar consonant clusters at the start (MB, ND, NK) or unusual interior
                combinations (SZ, GV, KV). These names require broad multi-league knowledge
                and are the most challenging in the game.
              </p>
              <div className="fw-name-examples">
                <span className="fw-name-chip">ONANA</span>
                <span className="fw-name-chip">KIMMICH</span>
                <span className="fw-name-chip">SZOBOSZLAI</span>
                <span className="fw-name-chip">KVARATSKHELIA</span>
              </div>
            </article>
          </div>

          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            <a className="fw-inline-link" href="/blog/hardest-names.html">
              Read the hardest name categories guide with strategies →
            </a>
          </p>
        </section>

        {/* STRATEGY */}
        <section className="fw-section" id="strategy">
          <div className="fw-section__header">
            <p className="fw-eyebrow">Strategy tips</p>
            <h2>How to win in fewer guesses</h2>
            <p className="fw-section__lead">
              These principles separate players who average 3 guesses from those who need all 6.
              Apply them consistently and your score will drop within a few sessions.
            </p>
          </div>

          <div className="fw-feature-grid">
            <article className="fw-feature">
              <h3>Open with high-frequency letters</h3>
              <p>
                The letters A, E, R, S, and N appear most often across football names from all
                leagues. Your first guess should cover as many of these as possible. Names like
                SILVA, MORAN, or LANES work well as openers — they don't need to be the answer,
                just informative.
              </p>
            </article>
            <article className="fw-feature">
              <h3>Never reuse red letters</h3>
              <p>
                A red tile permanently eliminates that letter from the answer. Before submitting
                each guess, scan every previous red tile. Accidentally reusing a red letter is
                the single most common mistake — it wastes an entire guess for zero new
                information.
              </p>
            </article>
            <article className="fw-feature">
              <h3>Always include yellow letters</h3>
              <p>
                A yellow letter is confirmed to be somewhere in the answer. It must appear in
                every subsequent guess — just in a different position. Never drop a yellow
                letter from your next guess. It is the most valuable hint the game gives you.
              </p>
            </article>
            <article className="fw-feature">
              <h3>Filter by league once you have 2–3 letters</h3>
              <p>
                Ends in -EZ or -ES? Think La Liga or Argentina. Starts with MB or ND? Think
                West African players from Ligue 1 or Premier League. Contains AA or OO? Think
                Dutch or Scandinavian. League knowledge cuts your candidate list in half after
                just a few confirmed letters.
              </p>
            </article>
            <article className="fw-feature">
              <h3>Use name length before your first guess</h3>
              <p>
                The board reveals how many letters the answer has before you type anything.
                4-letter names often point to English or South American players. 7–8 letter
                names are more common in Germany, France, and Eastern Europe. Filter your
                mental candidate list by length before you start.
              </p>
            </article>
            <article className="fw-feature">
              <h3>Play an information guess on guess 4</h3>
              <p>
                If you're deciding between two possible answers with 3 guesses left, spend
                guess 4 testing the letters that distinguish the two candidates — even if that
                guess can't be the answer itself. One confirmed distinction is worth more than
                a 50/50 coin flip on guess 5.
              </p>
            </article>
          </div>

          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            <a className="fw-inline-link" href="/blog/strategy-guide.html">
              Read the complete strategy guide with a 6-step checklist →
            </a>
          </p>
        </section>

        {/* FEATURES / ABOUT */}
        <section className="fw-section fw-section--panel" id="about">
          <div className="fw-section__header">
            <p className="fw-eyebrow">About Football Wordle</p>
            <h2>Built by football fans, for football fans</h2>
            <p className="fw-section__lead">
              Every name is chosen by hand. Every explanation on this site is written by a
              person. No auto-generated lists, no filler content — just a clean, fair word game
              that stays current with each football season.
            </p>
          </div>

          <div className="fw-feature-grid">
            <article className="fw-feature">
              <h3>Unlimited rounds</h3>
              <p>
                No daily cap. Play five rounds before a match or twenty on a long flight. Each
                round draws a fresh name from the full list at random.
              </p>
            </article>
            <article className="fw-feature">
              <h3>Two game modes</h3>
              <p>
                <strong>Players mode</strong> tests your knowledge of footballer names from
                every major league. <strong>Clubs mode</strong> covers top-flight teams
                worldwide. Separate stats and streaks for each.
              </p>
            </article>
            <article className="fw-feature">
              <h3>Instant start, no gates</h3>
              <p>
                No sign-up, no tutorial you can't skip, no splash screen. The game loads and
                you play. Fast build with Vite and React means the page is interactive in
                under 3 seconds on a typical mobile connection.
              </p>
            </article>
            <article className="fw-feature">
              <h3>Weekly list updates</h3>
              <p>
                Reviewed every week during the active season. Transfers, injuries, and
                promotions are reflected in the list. New players who break through get added;
                retired or irrelevant names get removed.
              </p>
            </article>
            <article className="fw-feature">
              <h3>Mobile-first keyboard</h3>
              <p>
                On-screen keyboard built specifically for touchscreens with tap targets large
                enough for thumbs. Full physical keyboard support on desktop — Enter submits,
                Backspace deletes.
              </p>
            </article>
            <article className="fw-feature">
              <h3>Privacy by default</h3>
              <p>
                Only your game stats are stored — locally in your browser only. No email
                address, no account, no personal data of any kind is collected.{" "}
                <a className="fw-inline-link" href="/privacy-policy.html">
                  See the privacy policy.
                </a>
              </p>
            </article>
          </div>

          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            <a className="fw-inline-link" href="/about.html">
              Read more about how word lists are curated →
            </a>
          </p>
        </section>

        {/* FAQ */}
        <section className="fw-section" id="faq">
          <div className="fw-section__header">
            <p className="fw-eyebrow">Frequently asked</p>
            <h2>Everything you need to know</h2>
            <p className="fw-section__lead">
              Answers to the most common questions from new and returning players. More detail
              in the{" "}
              <a className="fw-inline-link" href="/how-to-play.html">
                full how-to-play guide
              </a>.
            </p>
          </div>

          <div className="fw-faq">
            <div className="fw-faq__item">
              <h3>What is Football Wordle?</h3>
              <p>
                A free browser game where you guess the name of a football player or club in
                up to 6 tries. Color-coded hints after each guess tell you which letters are
                correct, misplaced, or absent from the answer.
              </p>
            </div>
            <div className="fw-faq__item">
              <h3>How do the color hints work?</h3>
              <p>
                Green means the letter is correct and in the right position. Yellow means the
                letter is in the answer but in the wrong position. Red means the letter does
                not appear in the answer anywhere. The on-screen keyboard updates to match
                after every guess.
              </p>
            </div>
            <div className="fw-faq__item">
              <h3>Can I play more than once a day?</h3>
              <p>
                Yes. Unlike daily Wordle, Football Wordle has no daily limit. Start a new
                round immediately after each game and play as many as you like.
              </p>
            </div>
            <div className="fw-faq__item">
              <h3>What leagues are covered?</h3>
              <p>
                Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Eredivisie, MLS, and
                major UEFA and international competitions. New leagues are added as their
                global profile grows.
              </p>
            </div>
            <div className="fw-faq__item">
              <h3>Do I need to type accents?</h3>
              <p>
                No. All names are normalised to basic Latin letters automatically. Type MBAPPE
                not MBAPPÉ, MODRIC not MODRIĆ. The normalisation is consistent across every
                name in the list.
              </p>
            </div>
            <div className="fw-faq__item">
              <h3>Does it work on mobile?</h3>
              <p>
                Yes. The on-screen keyboard and responsive layout are designed for phones and
                tablets of all sizes. The game is fully playable on any modern mobile browser.
              </p>
            </div>
            <div className="fw-faq__item">
              <h3>How often are names updated?</h3>
              <p>
                Weekly during the football season and after major transfer windows. Players
                who move to leagues not covered by the game, or who retire, are reviewed for
                removal. New stars are added when they reach global recognisability.
              </p>
            </div>
            <div className="fw-faq__item">
              <h3>What does Clubs mode use as the answer?</h3>
              <p>
                The most distinctive keyword from the club's name. Long names are shortened so
                the puzzle stays fair: WOLVES not WOLVERHAMPTON, FOREST not NOTTINGHAM FOREST,
                SPURS not TOTTENHAM HOTSPUR. The keyword is always what fans actually call the
                club.
              </p>
            </div>
            <div className="fw-faq__item">
              <h3>What data does Football Wordle store?</h3>
              <p>
                Only your game stats — streak, win rate, and guess distribution — saved
                locally in your browser via localStorage. Nothing is sent to a server.
                Clearing your browser data resets the stats.
              </p>
            </div>
            <div className="fw-faq__item">
              <h3>Is Football Wordle the official Wordle?</h3>
              <p>
                No. Football Wordle is an independent fan project. It is not affiliated with
                the New York Times, the original Wordle game, or any official football league,
                club, or governing body.
              </p>
            </div>
          </div>
        </section>

        {/* BLOG */}
        <section className="fw-section fw-section--panel" id="blog">
          <div className="fw-section__header">
            <p className="fw-eyebrow">From the blog</p>
            <h2>Guides, strategy &amp; league knowledge</h2>
            <p className="fw-section__lead">
              Original long-form articles written by the Football Wordle team — strategy
              guides, league overviews, and deep dives into the categories of names that trip
              players up most.
            </p>
          </div>

          <div className="fw-feature-grid">
            <article className="fw-feature">
              <p className="fw-feature__eyebrow">Clubs mode</p>
              <h3>
                <a href="/blog/clubs-mode-guide.html" style={{ color: "inherit", textDecoration: "none" }}>
                  Clubs Mode — Complete Strategy Guide
                </a>
              </h3>
              <p>
                Which clubs are included, how club names are shortened to keywords, the best
                opening guesses for clubs mode, and a league-by-league breakdown of naming
                patterns. April 2026 · 10 min read.
              </p>
              <a className="fw-inline-link" href="/blog/clubs-mode-guide.html" style={{ display: "block", marginTop: "0.6rem" }}>
                Read the guide →
              </a>
            </article>

            <article className="fw-feature">
              <p className="fw-feature__eyebrow">Strategy</p>
              <h3>
                <a href="/blog/hardest-names.html" style={{ color: "inherit", textDecoration: "none" }}>
                  The Hardest Football Player Names — and How to Guess Them
                </a>
              </h3>
              <p>
                West African consonant clusters, Eastern European combinations, Scandinavian
                double-vowels, and short ambiguous names — a deep dive with specific strategies
                for each category. April 2026 · 11 min read.
              </p>
              <a className="fw-inline-link" href="/blog/hardest-names.html" style={{ display: "block", marginTop: "0.6rem" }}>
                Read the article →
              </a>
            </article>

            <article className="fw-feature">
              <p className="fw-feature__eyebrow">Strategy</p>
              <h3>
                <a href="/blog/strategy-guide.html" style={{ color: "inherit", textDecoration: "none" }}>
                  How to Win at Football Wordle — Complete Strategy Guide
                </a>
              </h3>
              <p>
                Best opening guesses, how to extract maximum value from color hints, and the
                mental models that separate experienced players from beginners. Includes a
                6-step checklist. March 2026 · 8 min read.
              </p>
              <a className="fw-inline-link" href="/blog/strategy-guide.html" style={{ display: "block", marginTop: "0.6rem" }}>
                Read the guide →
              </a>
            </article>

            <article className="fw-feature">
              <p className="fw-feature__eyebrow">League guide</p>
              <h3>
                <a href="/blog/premier-league-players.html" style={{ color: "inherit", textDecoration: "none" }}>
                  Premier League Players in Football Wordle — Who to Know
                </a>
              </h3>
              <p>
                A club-by-club breakdown of every naming tradition in Premier League squads —
                English, Portuguese, French, West African, Scandinavian, and Eastern European.
                March 2026 · 12 min read.
              </p>
              <a className="fw-inline-link" href="/blog/premier-league-players.html" style={{ display: "block", marginTop: "0.6rem" }}>
                Read the article →
              </a>
            </article>

            <article className="fw-feature">
              <p className="fw-feature__eyebrow">Leagues</p>
              <h3>
                <a href="/blog/football-leagues-guide.html" style={{ color: "inherit", textDecoration: "none" }}>
                  The Football Leagues Behind Football Wordle — A Fan's Guide
                </a>
              </h3>
              <p>
                Every league in Football Wordle covered — Premier League, La Liga, Bundesliga,
                Serie A, Ligue 1, MLS — with naming conventions and practical tips for each.
                March 2026 · 9 min read.
              </p>
              <a className="fw-inline-link" href="/blog/football-leagues-guide.html" style={{ display: "block", marginTop: "0.6rem" }}>
                Read the guide →
              </a>
            </article>
          </div>

          <div style={{ textAlign: "center", marginTop: "1.2rem" }}>
            <a className="fw-button fw-button--ghost" href="/blog.html">
              View all articles →
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="fw-landing__footer" id="contact">
          <div className="fw-landing__footer-main">
            <div>
              <h2>Football Wordle</h2>
              <p>
                An independent fan project with weekly word list updates during the season.
                Built for football fans who want a quick, fair, knowledge-based guessing game
                that covers every major league.
              </p>
              <p>
                Email:{" "}
                <a className="fw-inline-link" href="mailto:webgames594@gmail.com">
                  webgames594@gmail.com
                </a>
              </p>
            </div>
            <div className="fw-landing__footer-links">
              <a href="#how-to-play">How to play</a>
              <a href="#leagues">Leagues covered</a>
              <a href="#strategy">Strategy tips</a>
              <a href="#faq">FAQ</a>
              <a href="/blog.html">Blog</a>
              <a href="/how-to-play.html">Full guide</a>
              <a href="/about.html">About</a>
              <a href="/contact.html">Contact</a>
              <a href="/terms.html">Terms</a>
              <a href="/privacy-policy.html">Privacy policy</a>
            </div>
          </div>
          <p className="fw-landing__footer-note">
            Independent project. Not affiliated with Wordle or any official football organisation. ·{" "}
            <a className="fw-inline-link" href="/privacy-policy.html">Privacy policy</a>
            {" · "}
            <a className="fw-inline-link" href="/terms.html">Terms</a>
            {" · "}
            <a className="fw-inline-link" href="/how-to-play.html">How to play</a>
            {" · "}
            <a className="fw-inline-link" href="/about.html">About</a>
            {" · "}
            <a className="fw-inline-link" href="/blog.html">Blog</a>
          </p>
        </footer>

      </div>
    </div>
  );
};

export default LandingPage;

import { useState } from "react";
import FootballWordle from "./FootballWordle";
import LandingPage from "./pages/LandingPage";
import players from "./players.json";
import teams from "./teams.json";
import countries from "./countries.json";
import type { GameMode } from "./types/game";

const wordListFor = (mode: GameMode) => {
  if (mode === "teams") return teams;
  if (mode === "countries") return countries;
  return players;
};

const App = () => {
  const [mode, setMode] = useState<GameMode | null>(null);

  if (!mode) {
    return <LandingPage onSelectMode={setMode} />;
  }

  return (
    <FootballWordle
      mode={mode}
      wordList={wordListFor(mode)}
      onBack={() => setMode(null)}
    />
  );
};

export default App;

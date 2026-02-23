import { useState } from "react";
import FootballWordle from "./FootballWordle";
import LandingPage from "./pages/LandingPage";
import players from "./players.json";
import teams from "./teams.json";
import type { GameMode } from "./types/game";

const App = () => {
  const [mode, setMode] = useState<GameMode | null>(null);

  if (!mode) {
    return <LandingPage onSelectMode={setMode} />;
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

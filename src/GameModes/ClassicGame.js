import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import { BarChart, Replay } from "@mui/icons-material";
import GameLayout from "../Components/GameLayout";
import ClassicBoard, { ClassicHelp, MAX_GUESSES } from "../Components/ClassicBoard";
import ResultCard from "../Components/ResultCard";
import Modal from "../Components/Modal";
import StatsModal from "../Components/StatsModal";
import ConfettiComponent from "../Components/ConfettiComponent";
import { streamerList } from "../data/streamers";
import { pickFresh } from "../lib/random";
import { emptyStats, recordResult, useLocalStorage } from "../lib/storage";
import { GameStates, useDelayedFlag, useDevReveal } from "../lib/hooks";

function ClassicGame() {
  const recentIds = useRef([]);
  const [answer, setAnswer] = useState(() => pickFresh(streamerList, recentIds.current));
  const [guessIds, setGuessIds] = useState([]);
  const [gameState, setGameState] = useState(GameStates.PLAYING);
  const [stats, setStats] = useLocalStorage("stats:classic", emptyStats);
  const [helpOpen, setHelpOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const showResult = useDelayedFlag(gameState !== GameStates.PLAYING, 1900);
  useDevReveal(answer);

  const handleGuess = (streamer) => {
    if (gameState !== GameStates.PLAYING || guessIds.includes(streamer.id)) return;
    const next = [...guessIds, streamer.id];
    setGuessIds(next);
    if (streamer.id === answer.id) {
      setGameState(GameStates.WIN);
      setStats((prev) => recordResult(prev, true, next.length));
    } else if (next.length >= MAX_GUESSES) {
      setGameState(GameStates.LOST);
      setStats((prev) => recordResult(prev, false, next.length));
    }
  };

  const handleNextGame = () => {
    setAnswer(pickFresh(streamerList, recentIds.current));
    setGuessIds([]);
    setGameState(GameStates.PLAYING);
  };

  const won = gameState === GameStates.WIN;

  return (
    <GameLayout
      title="Klasik"
      subtitle="Sınırsız oyun"
      onHelp={() => setHelpOpen(true)}
      onStats={() => setStatsOpen(true)}
    >
      {showResult && won && <ConfettiComponent />}
      <div className="flex w-full flex-col items-center gap-6">
        {showResult && (
          <ResultCard
            won={won}
            streamer={answer}
            detail={
              won
                ? `${guessIds.length}. tahminde buldun! Seri: ${stats.currentStreak}`
                : `${MAX_GUESSES} tahmin hakkın bitti.`
            }
          >
            <Button variant="contained" startIcon={<Replay />} onClick={handleNextGame}>
              Yeni influencer
            </Button>
            <Button color="inherit" startIcon={<BarChart />} onClick={() => setStatsOpen(true)}>
              İstatistikler
            </Button>
          </ResultCard>
        )}
        <ClassicBoard
          key={answer.id}
          answer={answer}
          guessIds={guessIds}
          onGuess={handleGuess}
          finished={gameState !== GameStates.PLAYING}
        />
      </div>

      <Modal open={helpOpen} onClose={() => setHelpOpen(false)} title="Nasıl oynanır?">
        <ClassicHelp />
      </Modal>
      <StatsModal
        open={statsOpen}
        onClose={() => setStatsOpen(false)}
        stats={stats}
        maxGuesses={MAX_GUESSES}
        title="Klasik istatistikleri"
      />
    </GameLayout>
  );
}

export default ClassicGame;

import React, { useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { BarChart, Share } from "@mui/icons-material";
import GameLayout from "../Components/GameLayout";
import ClassicBoard, { ClassicHelp, MAX_GUESSES } from "../Components/ClassicBoard";
import ResultCard from "../Components/ResultCard";
import Modal from "../Components/Modal";
import StatsModal from "../Components/StatsModal";
import ConfettiComponent from "../Components/ConfettiComponent";
import { streamerList } from "../data/streamers";
import { getStreamerById } from "../data/helpers";
import { activeDailyStreak, getDateKey, pickDaily, yesterdayKey } from "../lib/random";
import { compareStreamers, toEmojiRow } from "../lib/compare";
import { emptyStats, recordResult, useLocalStorage } from "../lib/storage";
import {
  GameStates,
  useCountdownToMidnight,
  useDelayedFlag,
  useDevReveal,
} from "../lib/hooks";

const emptyProgress = { guesses: [], status: GameStates.PLAYING };

function DailyGame() {
  // Fixed for the lifetime of the page so a midnight rollover doesn't swap the answer mid-game.
  const [dateKey] = useState(() => getDateKey());
  const answer = useMemo(() => pickDaily(streamerList, dateKey), [dateKey]);
  const [progress, setProgress] = useLocalStorage(`daily:${dateKey}`, emptyProgress);
  const [stats, setStats] = useLocalStorage("stats:daily", { ...emptyStats, lastPlayed: null });
  const [helpOpen, setHelpOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [toast, setToast] = useState("");
  const countdown = useCountdownToMidnight();
  const displayStats = { ...stats, currentStreak: activeDailyStreak(stats, dateKey) };
  useDevReveal(answer);

  const finished = progress.status !== GameStates.PLAYING;
  const won = progress.status === GameStates.WIN;
  // Returning players see the result right away; fresh finishes wait for the flip animation.
  const [finishedOnLoad] = useState(finished);
  const showResult = useDelayedFlag(finished, finishedOnLoad ? 0 : 1900);

  const handleGuess = (streamer) => {
    if (finished || progress.guesses.includes(streamer.id)) return;
    const guesses = [...progress.guesses, streamer.id];
    const isWin = streamer.id === answer.id;
    const isLoss = !isWin && guesses.length >= MAX_GUESSES;
    const status = isWin ? GameStates.WIN : isLoss ? GameStates.LOST : GameStates.PLAYING;
    setProgress({ guesses, status });

    if (isWin || isLoss) {
      setStats((prev) => {
        const continuing = prev.lastPlayed === yesterdayKey(dateKey);
        const base = continuing ? prev : { ...prev, currentStreak: 0 };
        return { ...recordResult(base, isWin, guesses.length), lastPlayed: dateKey };
      });
    }
  };

  const handleShare = async () => {
    const rows = progress.guesses
      .map(getStreamerById)
      .filter(Boolean)
      .map((guess) => toEmojiRow(compareStreamers(guess, answer)));
    const [y, m, d] = dateKey.split("-");
    const text = [
      `Streamerdle Günlük ${d}.${m}.${y} ${won ? rows.length : "X"}/${MAX_GUESSES}`,
      ...rows,
      window.location.origin + "/daily",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setToast("Sonuç panoya kopyalandı!");
    } catch {
      if (navigator.share) {
        navigator.share({ text }).catch(() => {});
      } else {
        setToast("Kopyalanamadı, tarayıcın izin vermiyor.");
      }
    }
  };

  return (
    <GameLayout
      title="Günlük"
      subtitle="Herkes için aynı influencer"
      onHelp={() => setHelpOpen(true)}
      onStats={() => setStatsOpen(true)}
    >
      {showResult && won && !finishedOnLoad && <ConfettiComponent />}
      <div className="flex w-full flex-col items-center gap-6">
        {showResult && (
          <ResultCard
            won={won}
            streamer={answer}
            headline={won ? "Günün influencer'ını buldun!" : "Bugün olmadı"}
            detail={
              won
                ? `${progress.guesses.length}/${MAX_GUESSES} tahmin · Seri: ${displayStats.currentStreak}`
                : "Yarın yeni bir influencer seni bekliyor."
            }
          >
            <div className="rounded-xl bg-white/5 py-3">
              <div className="text-xs uppercase tracking-wide text-white/50">
                Sıradaki influencer
              </div>
              <div className="font-mono text-2xl font-bold tabular-nums">{countdown}</div>
            </div>
            <Button variant="contained" startIcon={<Share />} onClick={handleShare}>
              Sonucu paylaş
            </Button>
            <Button color="inherit" startIcon={<BarChart />} onClick={() => setStatsOpen(true)}>
              İstatistikler
            </Button>
          </ResultCard>
        )}
        <ClassicBoard
          answer={answer}
          guessIds={progress.guesses}
          onGuess={handleGuess}
          finished={finished}
          prompt="Bugünün influencer'ı kim?"
        />
      </div>

      <Modal open={helpOpen} onClose={() => setHelpOpen(false)} title="Nasıl oynanır?">
        <ClassicHelp />
        <p className="mt-3">
          Günlük modda herkes aynı influencer'ı tahmin eder ve günde bir hakkın var. Seriyi
          korumak için her gün oyna!
        </p>
      </Modal>
      <StatsModal
        open={statsOpen}
        onClose={() => setStatsOpen(false)}
        stats={displayStats}
        maxGuesses={MAX_GUESSES}
        title="Günlük istatistikleri"
      />
      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={2500}
        onClose={() => setToast("")}
        message={toast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </GameLayout>
  );
}

export default DailyGame;

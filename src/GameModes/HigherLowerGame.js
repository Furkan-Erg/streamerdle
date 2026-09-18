import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { EmojiEvents, KeyboardArrowDown, KeyboardArrowUp, Replay } from "@mui/icons-material";
import GameLayout from "../Components/GameLayout";
import ResultCard from "../Components/ResultCard";
import Modal from "../Components/Modal";
import { streamerList } from "../data/streamers";
import { formatNumber } from "../data/helpers";
import { pickFresh } from "../lib/random";
import { isHigherLowerCorrect } from "../lib/compare";
import { useLocalStorage } from "../lib/storage";
import { useDevReveal } from "../lib/hooks";

const COUNT_UP_MS = 1000;
const AFTER_REVEAL_MS = 900;

const Phase = { GUESS: "guess", REVEAL: "reveal", LOST: "lost" };

export default function HigherLowerGame() {
  const recentIds = useRef([]);
  const timer = useRef(null);
  const [pair, setPair] = useState(() => ({
    current: pickFresh(streamerList, recentIds.current),
    next: pickFresh(streamerList, recentIds.current),
  }));
  const [phase, setPhase] = useState(Phase.GUESS);
  const [lastCorrect, setLastCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useLocalStorage("best:higherlower", 0);
  const [helpOpen, setHelpOpen] = useState(false);
  useDevReveal(pair.next);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleChoice = (choice) => {
    if (phase !== Phase.GUESS) return;
    const correct = isHigherLowerCorrect(pair.current, pair.next, choice);
    setLastCorrect(correct);
    setPhase(Phase.REVEAL);

    timer.current = setTimeout(() => {
      if (!correct) {
        setPhase(Phase.LOST);
        return;
      }
      const nextScore = score + 1;
      setScore(nextScore);
      setBestScore((prev) => Math.max(prev, nextScore));
      setPair((prev) => ({
        current: prev.next,
        next: pickFresh(streamerList, recentIds.current),
      }));
      setLastCorrect(null);
      setPhase(Phase.GUESS);
    }, COUNT_UP_MS + AFTER_REVEAL_MS);
  };

  const handlePlayAgain = () => {
    setPair({
      current: pickFresh(streamerList, recentIds.current),
      next: pickFresh(streamerList, recentIds.current),
    });
    setScore(0);
    setLastCorrect(null);
    setPhase(Phase.GUESS);
  };

  return (
    <GameLayout
      title="Daha Çok / Daha Az"
      subtitle="Kimin takipçisi daha fazla?"
      onHelp={() => setHelpOpen(true)}
    >
      <div className="flex w-full flex-col items-center gap-5">
        <div className="flex items-center gap-4 text-sm">
          <span className="card flex items-center gap-1.5 px-3 py-1.5">
            Skor <b className="text-brand-300">{score}</b>
          </span>
          <span className="card flex items-center gap-1.5 px-3 py-1.5">
            <EmojiEvents sx={{ fontSize: 18 }} className="text-yellow-400" />
            Rekor <b>{bestScore}</b>
          </span>
        </div>

        {phase === Phase.LOST ? (
          <ResultCard
            won={false}
            headline="Yanlış tahmin!"
            detail={
              score > 0 && score >= bestScore
                ? `Yeni rekor: ${score} doğru üst üste!`
                : `Skorun: ${score} · Rekor: ${bestScore}`
            }
          >
            <div className="flex items-center justify-center gap-3 text-left text-sm">
              <Summary streamer={pair.current} />
              <span className="text-white/40">vs</span>
              <Summary streamer={pair.next} />
            </div>
            <Button variant="contained" startIcon={<Replay />} onClick={handlePlayAgain}>
              Tekrar oyna
            </Button>
          </ResultCard>
        ) : (
          <div className="relative grid w-full max-w-3xl gap-4 md:grid-cols-2">
            <StreamerCard key={pair.current.id} streamer={pair.current}>
              <div className="text-3xl font-extrabold sm:text-4xl">
                {formatNumber(pair.current.followerCount)}
              </div>
              <div className="text-sm text-white/70">takipçi</div>
            </StreamerCard>

            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-surface-sunken bg-brand-500 text-sm font-extrabold shadow-lg">
              VS
            </div>

            <StreamerCard
              key={pair.next.id}
              streamer={pair.next}
              highlight={lastCorrect === null ? null : lastCorrect ? "correct" : "wrong"}
            >
              {phase === Phase.REVEAL ? (
                <>
                  <div className="text-3xl font-extrabold sm:text-4xl">
                    <CountUp value={pair.next.followerCount} />
                  </div>
                  <div className="text-sm text-white/70">takipçi</div>
                </>
              ) : (
                <>
                  <div className="mb-2 text-sm text-white/80">
                    Takipçisi <b>{pair.current.nickName ?? pair.current.name}</b> ile
                    kıyasla...
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<KeyboardArrowUp />}
                      onClick={() => handleChoice("higher")}
                    >
                      Daha çok
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<KeyboardArrowDown />}
                      onClick={() => handleChoice("lower")}
                    >
                      Daha az
                    </Button>
                  </div>
                </>
              )}
            </StreamerCard>
          </div>
        )}
      </div>

      <Modal open={helpOpen} onClose={() => setHelpOpen(false)} title="Nasıl oynanır?">
        <div className="flex flex-col gap-3">
          <p>
            Soldaki influencer'ın takipçi sayısı açık. Sağdakinin takipçisi daha mı{" "}
            <b>çok</b> yoksa daha mı <b>az</b>?
          </p>
          <p>Doğru bildikçe seri devam eder, ilk yanlışta oyun biter. Eşitlikte iki cevap da doğru sayılır.</p>
          <p className="text-white/50">Takipçi sayıları influencer'ın ana platformundaki yaklaşık değerlerdir.</p>
        </div>
      </Modal>
    </GameLayout>
  );
}

function StreamerCard({ streamer, highlight, children }) {
  const ring =
    highlight === "correct"
      ? "ring-4 ring-green-500"
      : highlight === "wrong"
      ? "ring-4 ring-red-500 animate-shake"
      : "";
  return (
    <div
      className={`relative h-64 animate-fade-in overflow-hidden rounded-2xl border border-white/10 bg-surface-raised bg-cover bg-center shadow-xl sm:h-80 md:h-[26rem] ${ring}`}
      style={streamer.img ? { backgroundImage: `url(${streamer.img})` } : undefined}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
      <div className="relative flex h-full flex-col items-center justify-end gap-1 p-5 text-center">
        <div className="text-xl font-bold leading-tight sm:text-2xl">{streamer.name}</div>
        {streamer.nickName && <div className="text-sm text-brand-300">{streamer.nickName}</div>}
        <div className="mb-3 text-xs text-white/60">{streamer.platform}</div>
        {children}
      </div>
    </div>
  );
}

function Summary({ streamer }) {
  return (
    <div>
      <div className="font-semibold">{streamer.nickName ?? streamer.name}</div>
      <div className="text-white/60">{formatNumber(streamer.followerCount)}</div>
    </div>
  );
}

function CountUp({ value }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / COUNT_UP_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return formatNumber(shown);
}

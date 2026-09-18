import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import { EmojiEvents, SkipNext, Replay, ArrowForward } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteIconOutlined from "@mui/icons-material/FavoriteBorder";
import BlurImage, { TILE_COUNT } from "../BlurImage";
import GameLayout from "../Components/GameLayout";
import StreamerSearch from "../Components/StreamerSearch";
import ResultCard from "../Components/ResultCard";
import Modal from "../Components/Modal";
import ConfettiComponent from "../Components/ConfettiComponent";
import { streamerList } from "../data/streamers";
import { pickFresh, pickRandom } from "../lib/random";
import { useLocalStorage } from "../lib/storage";
import { GameStates, useDevReveal } from "../lib/hooks";

const MAX_LIFE = 5;
const allTiles = Array.from({ length: TILE_COUNT }, (_, i) => i);

const randomTile = (revealed) => pickRandom(allTiles, revealed);

export default function SplashGame() {
  const recentIds = useRef([]);
  const [answer, setAnswer] = useState(() => pickFresh(streamerList, recentIds.current));
  const [revealed, setRevealed] = useState(() => [randomTile([])]);
  const [life, setLife] = useState(MAX_LIFE);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [gameState, setGameState] = useState(GameStates.PLAYING);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useLocalStorage("best:splash", 0);
  const [shakeKey, setShakeKey] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  useDevReveal(answer);

  const loseLife = () => {
    const nextLife = life - 1;
    setLife(nextLife);
    setShakeKey((k) => k + 1);
    if (nextLife <= 0) {
      setGameState(GameStates.LOST);
    } else {
      setRevealed((prev) => [...prev, randomTile(prev)]);
    }
  };

  const handleGuess = (streamer) => {
    if (gameState !== GameStates.PLAYING) return;
    if (streamer.id === answer.id) {
      const nextScore = score + 1;
      setScore(nextScore);
      setBestScore((prev) => Math.max(prev, nextScore));
      setGameState(GameStates.WIN);
    } else {
      setWrongGuesses((prev) => [...prev, streamer]);
      loseLife();
    }
  };

  const startRound = () => {
    setAnswer(pickFresh(streamerList, recentIds.current));
    setRevealed([randomTile([])]);
    setLife(MAX_LIFE);
    setWrongGuesses([]);
    setGameState(GameStates.PLAYING);
  };

  const handlePlayAgain = () => {
    setScore(0);
    startRound();
  };

  const playing = gameState === GameStates.PLAYING;
  const wrongIds = wrongGuesses.map((s) => s.id);
  const options = streamerList.filter((s) => !wrongIds.includes(s.id));

  return (
    <GameLayout title="Görsel" subtitle="Bulanık fotoğrafı tahmin et" onHelp={() => setHelpOpen(true)}>
      {gameState === GameStates.WIN && <ConfettiComponent key={score} />}
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

        <div key={shakeKey} className={shakeKey > 0 ? "animate-shake" : ""}>
          <BlurImage imageSrc={answer.img} revealed={revealed} revealAll={!playing} />
        </div>

        {playing ? (
          <>
            <div className="flex items-center gap-1" aria-label={`Kalan can: ${life}`}>
              {Array.from({ length: MAX_LIFE }, (_, i) =>
                i < life ? (
                  <FavoriteIcon key={i} className="text-red-500" />
                ) : (
                  <FavoriteIconOutlined key={i} className="text-red-500/40" />
                )
              )}
            </div>
            <div className="flex w-full max-w-md flex-col items-center gap-3 sm:flex-row">
              <StreamerSearch options={options} onSelect={handleGuess} />
              <Button
                variant="contained"
                color="secondary"
                startIcon={<SkipNext />}
                onClick={loseLife}
                className="shrink-0"
              >
                Geç
              </Button>
            </div>
            {wrongGuesses.length > 0 && (
              <div className="flex max-w-md flex-wrap justify-center gap-2">
                {wrongGuesses.map((s) => (
                  <span
                    key={s.id}
                    className="animate-fade-in rounded-full border border-red-500/40 bg-red-500/15 px-3 py-1 text-xs font-medium text-red-200 line-through"
                  >
                    {s.nickName ?? s.name}
                  </span>
                ))}
              </div>
            )}
          </>
        ) : gameState === GameStates.WIN ? (
          <ResultCard
            won
            streamer={answer}
            headline="Doğru!"
            detail={`${MAX_LIFE - life} hatayla buldun. Seri devam ediyor: ${score}`}
          >
            <Button variant="contained" endIcon={<ArrowForward />} onClick={startRound}>
              Sıradaki kişi
            </Button>
          </ResultCard>
        ) : (
          <ResultCard
            won={false}
            streamer={answer}
            detail={
              score >= bestScore && score > 0
                ? `Yeni rekor: ${score}!`
                : `Skorun: ${score} · Rekor: ${bestScore}`
            }
          >
            <Button variant="contained" startIcon={<Replay />} onClick={handlePlayAgain}>
              Tekrar oyna
            </Button>
          </ResultCard>
        )}
      </div>

      <Modal open={helpOpen} onClose={() => setHelpOpen(false)} title="Nasıl oynanır?">
        <div className="flex flex-col gap-3">
          <p>Fotoğrafın sadece bir parçası açık. Kim olduğunu tahmin et!</p>
          <p>
            Her yanlış tahmin ya da <b>Geç</b> bir can götürür ve fotoğrafın yeni bir parçasını
            açar. {MAX_LIFE} canın var.
          </p>
          <p>Bildikçe skorun artar; canların bitince skor sıfırlanır. Rekorunu kır!</p>
        </div>
      </Modal>
    </GameLayout>
  );
}


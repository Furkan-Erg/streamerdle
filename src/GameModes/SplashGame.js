import React, { useEffect, useState } from "react";
import BlurImage from "../BlurImage";
import SelectComponent from "../SelectComponent";
import { streamerList } from "../StreamerData";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteIconOutlined from "@mui/icons-material/FavoriteBorder";
import { useKeys } from "rooks";

export default function SplashGame() {
  const [guessHistory, setguessHistory] = useState([]);
  const [selectedStreamer, setSelectedStreamer] = useState("");
  const [life, setLife] = useState(4);
  const [correctAnswer, setCorrectAnswer] = useState(
    streamerList[Math.floor(Math.random() * streamerList.length)]
  );
  const [tileNumberToUnblur, setTileNumberToUnblur] = useState(
    Math.floor(Math.random() * 8)
  );
  const [gameState, setGameState] = useState(GameStates.PLAYING);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [unbluredTiles, setUnbluredTiles] = useState([]);
  const [streamers, setStreamers] = useState(streamerList);
  const setRandomNumber = () => {
    var randomNumber = Math.floor(Math.random() * (8 - unbluredTiles.length));
    if (unbluredTiles.includes(randomNumber)) {
      setRandomNumber();
    } else {
      setTileNumberToUnblur(randomNumber);
      setUnbluredTiles((prev) => [...prev, randomNumber]);
    }
  };

  const handleSelectionChange = (value) => {
    setSelectedStreamer(value);
  };
  const handleSkip = () => {
    setLife((prev) => prev - 1);
    setRandomNumber();
  };
  const handleGuess = () => {
    if (selectedStreamer === "") return;
    if (selectedStreamer.includes(correctAnswer.name)) {
      setCurrentScore((prev) => prev + 1);
      setGameState(GameStates.WIN);
    } else {
      setLife((prev) => prev - 1);
      setguessHistory((prev) => [...prev, selectedStreamer]);
      setRandomNumber();
    }
    setSelectedStreamer("");
    setStreamers(
      streamers.filter((streamer) => !selectedStreamer.includes(streamer.name))
    );
    setBestScoreLocalStorage(currentScore + 1);
  };
  const resetGame = () => {
    setCorrectAnswer(
      streamerList[Math.floor(Math.random() * streamerList.length)]
    );
    setguessHistory([]);
    setLife(4);
    setGameState(GameStates.PLAYING);
    setUnbluredTiles([]);
    setStreamers(streamerList);
  };
  const handlePlayAgain = () => {
    resetGame();
    setCurrentScore(0);
  };
  const handleNextGame = () => {
    resetGame();
  };

  const setBestScoreLocalStorage = (score) => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore", score);
    }
  };
  useEffect(() => {
    const bestScore = localStorage.getItem("bestScore");
    if (bestScore) {
      setBestScore(parseInt(bestScore));
    }
  }, []);

  useKeys(["KeyQ", "KeyW", "KeyE"], () => {
    alert(correctAnswer.name);
  });
  useEffect(() => {
    if (life === 0) {
      setGameState(GameStates.LOST);
    }
  }, [life]);

  return (
    <div className=" flex  h-dvh justify-center items-center flex-col gap-6">
      {gameState === GameStates.LOST && <GameOverScreen />}
      <BlurImage
        imageSrc={correctAnswer.img}
        tileNumber={tileNumberToUnblur}
        gameState={gameState}
      />
      {gameState !== GameStates.PLAYING && (
        <div>
          {gameState === GameStates.LOST && (
            <div className="text-white font-bold">
              <h1>Doğru Cevap: </h1>
              <div className="text-3xl ">{correctAnswer.name}</div>
            </div>
          )}
          <div className="flex flex-row justify-center items-center my-2">
            {gameState === GameStates.LOST ? (
              <Button onClick={handlePlayAgain} variant="contained">
                Tekrar Oyna
              </Button>
            ) : (
              <Button onClick={handleNextGame} variant="contained">
                Sıradaki Kişi
              </Button>
            )}
          </div>
        </div>
      )}
      {gameState === GameStates.PLAYING && (
        <div>
          <div className="flex justify-center flex-col md:flex-row  items-center gap-2">
            <SelectComponent
              optionsArray={streamers}
              onSelectionChange={handleSelectionChange}
              selectedValue={selectedStreamer}
            />
            <div className="flex flex-row gap-2">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSkip}
              >
                Geç
              </Button>
              <Button variant="contained" color="success" onClick={handleGuess}>
                Tahmin et
              </Button>
            </div>
          </div>
          <div
            id="guess-history"
            className="flex justify-center items-center flex-col gap-2 my-2"
          >
            {guessHistory.map((answer, index) => (
              <div
                key={index}
                className="bg-red-500 text-white font-bold shadow-md p-2 rounded-lg w-80"
              >
                {answer}
              </div>
            ))}
          </div>
          <div
            id="life-count"
            className="flex flex-col justify-center items-center my-4 text-white font-bold"
          >
            <div>
              {[...Array(life)].map((_, index) => (
                <FavoriteIcon color="error" key={index} />
              ))}
              {[...Array(4 - life)].map((_, index) => (
                <FavoriteIconOutlined color="error" key={index} />
              ))}
            </div>

            <h1>Kalan can: {life}</h1>
            <div className="flex gap-4">
              <span>Mevcut skor: {currentScore}</span>
              <span>Rekor skor: {bestScore}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const GameOverScreen = () => {
  return (
    <div className="fixed self-center z-10">
      <div className="bg-red-600 text-white w-48 h-12 shadow-lg text-center text-3xl content-center">
        Oyun Bitti
      </div>
    </div>
  );
};
export const GameStates = {
  PLAYING: "playing",
  WIN: "win",
  LOST: "lost",
};

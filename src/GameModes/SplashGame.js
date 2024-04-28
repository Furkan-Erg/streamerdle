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
  const [life, setLife] = useState(6);
  const [correctAnswer, setCorrectAnswer] = useState(
    streamerList[Math.floor(Math.random() * streamerList.length)]
  );
  const [tileNumberToUnblur, setTileNumberToUnblur] = useState(
    Math.floor(Math.random() * 16)
  );
  const [gameState, setGameState] = useState(GameStates.PLAYING);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const setRandomNumber = () => {
    var randomNumber = Math.floor(Math.random() * 16);
    if (randomNumber === tileNumberToUnblur) {
      setRandomNumber();
    } else {
      setTileNumberToUnblur(randomNumber);
    }
  };
  const setRandomStreamer = () => {
    var randomStreamer =
      streamerList[Math.floor(Math.random() * streamerList.length)];
    if (randomStreamer === correctAnswer) {
      setRandomStreamer();
    } else {
      setCorrectAnswer(randomStreamer);
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
    if (selectedStreamer.includes(correctAnswer.name)) {
      setCurrentScore((prev) => prev + 1);
      setGameState(GameStates.WIN);
    } else {
      setLife((prev) => prev - 1);
      setguessHistory((prev) => [...prev, selectedStreamer]);
      setRandomNumber();
    }
    setSelectedStreamer("");
  };
  const resetGame = () => {
    setCorrectAnswer(
      streamerList[Math.floor(Math.random() * streamerList.length)]
    );
    setguessHistory([]);
    setLife(6);
    setGameState(GameStates.PLAYING);
  };
  const handlePlayAgain = () => {
    resetGame();
    setCurrentScore(0);
  };
  const handleNextGame = () => {
    resetGame();
  };
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
            <div>
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
          <div className="flex justify-center items-center gap-2">
            <SelectComponent
              optionsArray={streamerList}
              onSelectionChange={handleSelectionChange}
              selectedValue={selectedStreamer}
            />
            <Button variant="contained" color="secondary" onClick={handleSkip}>
              Geç
            </Button>
            <Button variant="contained" color="success" onClick={handleGuess}>
              Tahmin et
            </Button>
          </div>
          <div
            id="guess-history"
            className="flex justify-center items-center flex-col gap-2 my-2"
          >
            {guessHistory.map((answer, index) => (
              <div
                key={index}
                className="bg-red-500 shadow-md p-2 rounded-lg w-48"
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
              {[...Array(6 - life)].map((_, index) => (
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

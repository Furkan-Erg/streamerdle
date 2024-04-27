import React, { useState } from "react";
import BlurImage from "./BlurImage";
import SelectComponent from "./SelectComponent";
import { streamerList } from "./StreamerData";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteIconOutlined from "@mui/icons-material/FavoriteBorder";

export default function GameScreen() {
  const [guessHistory, setguessHistory] = useState(["wtcn", "ben", "sen"]);
  const [selectedStreamer, setSelectedStreamer] = useState("");
  const [life, setLife] = useState(3);
  const [correctAnswer, setCorrectAnswer] = useState(streamerList[1]);
  const handleSelectionChange = (value) => {
    console.log(value);
    setSelectedStreamer(value);
  };
  const handleSkip = () => {
    setLife((prev) => prev - 1);
  };
  const handleGuess = () => {
    if (selectedStreamer.includes(correctAnswer.name)) {
      alert("Tebrikler doğru tahmin");
    } else {
      setLife((prev) => prev - 1);
      setguessHistory((prev) => [...prev, selectedStreamer]);
    }
    setSelectedStreamer("");
  };

  return (
    <div className=" flex  justify-center items-center flex-col gap-6">
      <div className="game-screen">GameScreen</div>
      <BlurImage imageSrc={correctAnswer.img} />
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
        className="flex justify-center items-center flex-col gap-2"
      >
        {guessHistory.map((answer) => (
          <div className="bg-red-500 shadow-md p-2 rounded-lg w-48">
            {answer}
          </div>
        ))}
      </div>
      <div id="life-count">
        {[...Array(life)].map((_, index) => (
          <FavoriteIcon color="error" key={index} />
        ))}
        {[...Array(4 - life)].map((_, index) => (
          <FavoriteIconOutlined color="error" key={index} />
        ))}

        <h1>Kalan can: {life}</h1>
      </div>
    </div>
  );
}

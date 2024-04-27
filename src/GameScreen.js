import React, { useState } from "react";
import BlurImage from "./BlurImage";
import wtcn from "./assets/wtcn.jpg";
import SelectComponent from "./SelectComponent";
import { streamerList } from "./StreamerData";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteIconOutlined from "@mui/icons-material/FavoriteBorder";

export default function GameScreen() {
  const [answers, setAnswers] = useState(["wtcn", "ben", "sen"]);
  const [life, setLife] = useState(3);
  return (
    <div className=" flex  justify-center items-center flex-col gap-6">
      <div className="game-screen">GameScreen</div>
      <BlurImage imageSrc={wtcn} />
      <div className="flex justify-center items-center gap-2">
        <SelectComponent optionsArray={streamerList} />
        <Button variant="contained" color="secondary">
          Geç
        </Button>
        <Button variant="contained" color="success">
          Tahmin et
        </Button>
      </div>
      <div
        id="answers"
        className="flex justify-center items-center flex-col gap-2"
      >
        {answers.map((answer) => (
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

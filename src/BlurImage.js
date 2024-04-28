import { useEffect, useState } from "react";
import { GameStates } from "./GameModes/SplashGame";
const BlurImage = ({ imageSrc, tileNumber, gameState }) => {
  const [tileNumberToUnblur, setTileNumberToUnblur] = useState(tileNumber);
  const unBlur = () => {
    const blurTiles = document.querySelectorAll(".backdrop-blur-xl");
    blurTiles.forEach((tile) => {
      tile.classList.remove("backdrop-blur-xl");
    });
  };
  const unBlurCell = () => {
    const blurTiles = document.querySelectorAll(".backdrop-blur-xl");
    blurTiles.forEach((tile, index) => {
      if (
        index > tileNumberToUnblur * 9 - 1 &&
        index < (tileNumberToUnblur + 1) * 9
      ) {
        tile.classList.remove("backdrop-blur-xl");
      }
    });
  };
  const blurCells = () => {
    const blurTiles = document.querySelectorAll(".w-10.h-10");
    blurTiles.forEach((tile, index) => {
      tile.classList.add("backdrop-blur-xl");
    });
  };
  useEffect(() => {
    setTileNumberToUnblur(tileNumber);
  }, [tileNumber]);
  useEffect(() => {
    unBlurCell();
  }, [tileNumber]);
  useEffect(() => {
    if (gameState !== GameStates.PLAYING) {
      unBlur();
    }
  }, [gameState]);
  useEffect(() => {
    blurCells();
  }, [imageSrc]);

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${imageSrc})` }}
        className={`bg-cover bg-center bg-no-repeat w-[22.5rem] h-[22.5rem] relative`}
      >
        {blurTiles}
        <div />
      </div>
    </div>
  );
};
const blurTiles = (
  <div className="grid grid-cols-3 grid-rows-3 w-[22.5rem] h-[22.5rem]">
    {[...Array(9)].map((_, index) => (
      <div key={index} className="grid grid-cols-3 grid-rows-3">
        {[...Array(9)].map((_, findex) => (
          <div key={index * 9 + findex} className=" w-10 h-10"></div>
        ))}
      </div>
    ))}
  </div>
);

export default BlurImage;

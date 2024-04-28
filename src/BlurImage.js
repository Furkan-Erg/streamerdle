import { useEffect, useState } from "react";
import { GameStates } from "./GameModes/SplashGame";
const BlurImage = ({ imageSrc, tileNumber, gameState }) => {
  const [tileNumberToUnblur, setTileNumberToUnblur] = useState(tileNumber);
  //unblur the image
  const unBlur = () => {
    const blurTiles = document.querySelectorAll(".backdrop-blur-3xl");
    blurTiles.forEach((tile) => {
      tile.classList.remove("backdrop-blur-3xl");
    });
  };
  // i need a function that unblurs only the one cell
  const unBlurCell = () => {
    console.log("tilenumbertounblur", tileNumberToUnblur);
    // unblur the cells beetwen index*10 and index*10+10
    const blurTiles = document.querySelectorAll(".backdrop-blur-3xl");
    blurTiles.forEach((tile, index) => {
      if (
        index > tileNumberToUnblur * 16 - 1 &&
        index < (tileNumberToUnblur + 1) * 16
      ) {
        tile.classList.remove("backdrop-blur-3xl");
      }
    });
  };
  const blurCells = () => {
    const blurTiles = document.querySelectorAll(".w-6.h-6");
    blurTiles.forEach((tile, index) => {
      tile.classList.add("backdrop-blur-3xl");
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
        className={`bg-cover bg-center bg-no-repeat w-96 h-96 relative`}
      >
        {blurTiles}
        <div />
      </div>
    </div>
  );
};
const blurTiles = (
  <div className="grid grid-cols-4 grid-rows-4 w-96 h-96">
    {[...Array(16)].map((_, index) => (
      <div key={index} className="grid grid-cols-4 grid-rows-4">
        {[...Array(16)].map((_, findex) => (
          <div
            key={index * 16 + findex}
            className=" backdrop-blur-3xl w-6 h-6"
          ></div>
        ))}
      </div>
    ))}
  </div>
);

export default BlurImage;

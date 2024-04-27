import React from "react";
import BlurImage from "./BlurImage";
import wtcn from "./assets/wtcn.jpg";

export default function GameScreen() {
  return (
    <div className=" flex  justify-center items-center flex-col">
      <div className="game-screen">GameScreen</div>
      <BlurImage imageSrc={wtcn} />
    </div>
  );
}

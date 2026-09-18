import React from "react";

export const TILE_COUNT = 9;

// 3x3 grid of blurred panes over the image; panes in `revealed` fade away.
const BlurImage = ({ imageSrc, revealed, revealAll = false }) => {
  return (
    <div
      className="relative aspect-square w-[min(22.5rem,85vw)] overflow-hidden rounded-2xl border border-white/10 bg-surface-raised bg-cover bg-center shadow-2xl shadow-black/50"
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      <div className="grid h-full w-full grid-cols-3 grid-rows-3">
        {Array.from({ length: TILE_COUNT }, (_, index) => {
          const isOpen = revealAll || revealed.includes(index);
          return (
            <div
              key={index}
              className={`border border-white/5 bg-surface-sunken/40 backdrop-blur-2xl transition-opacity duration-700 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlurImage;

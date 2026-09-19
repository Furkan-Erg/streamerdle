import React from "react";

export const TILE_COUNT = 9;
const GRID_SIZE = 3;

// Base layer is blurred with `filter` (paints together with the image itself),
// not `backdrop-filter` (which is composited a frame later and briefly flashes
// the sharp image on load). Sharp tile sprites are overlaid on top and fade in
// as they're revealed.
const BlurImage = ({ imageSrc, revealed, revealAll = false }) => {
  return (
    <div className="relative aspect-square w-[min(22.5rem,85vw)] overflow-hidden rounded-2xl border border-white/10 bg-surface-raised shadow-2xl shadow-black/50">
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      <div className="relative grid h-full w-full grid-cols-3 grid-rows-3">
        {Array.from({ length: TILE_COUNT }, (_, index) => {
          const isOpen = revealAll || revealed.includes(index);
          const col = index % GRID_SIZE;
          const row = Math.floor(index / GRID_SIZE);
          return (
            <div
              key={index}
              className={`border border-white/5 bg-cover transition-opacity duration-700 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                backgroundPosition: `${(col * 100) / (GRID_SIZE - 1)}% ${(row * 100) / (GRID_SIZE - 1)}%`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlurImage;

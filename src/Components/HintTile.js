import React from "react";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Status } from "../lib/compare";

const statusClass = {
  [Status.CORRECT]: "bg-hint-correct",
  [Status.PARTIAL]: "bg-hint-partial",
  [Status.WRONG]: "bg-hint-wrong",
  neutral: "bg-surface-raised",
};

export const TILE_WIDTH = "w-[4.25rem] sm:w-20";
export const TILE_SIZE = `${TILE_WIDTH} h-[4.25rem] sm:h-20`;

export default function HintTile({ status = "neutral", direction, index = 0, children }) {
  const Arrow = direction === "up" ? ArrowUpward : direction === "down" ? ArrowDownward : null;
  return (
    <div
      className={`flip relative flex ${TILE_SIZE} shrink-0 items-center justify-center overflow-hidden rounded-lg border border-black/40 p-1 text-center text-[0.68rem] font-semibold leading-tight text-white shadow-md sm:text-xs ${statusClass[status]}`}
      style={{ "--flip-delay": `${index * 0.25}s` }}
    >
      {Arrow && (
        <Arrow
          className="absolute inset-0 m-auto text-black/25"
          sx={{ fontSize: { xs: 56, sm: 68 } }}
          aria-label={direction === "up" ? "Daha yüksek" : "Daha düşük"}
        />
      )}
      <span className="relative break-words">{children}</span>
    </div>
  );
}

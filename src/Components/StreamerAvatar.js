import React from "react";
import { getInitials } from "../data/helpers";

export default function StreamerAvatar({ streamer, className = "w-10 h-10", blur = false }) {
  if (!streamer.img) {
    return (
      <div
        className={`${className} flex shrink-0 items-center justify-center rounded-lg bg-brand-700 font-bold text-white`}
      >
        {getInitials(streamer.name)}
      </div>
    );
  }
  return (
    <img
      src={streamer.img}
      alt={blur ? "Gizli influencer" : streamer.name}
      draggable={false}
      className={`${className} shrink-0 rounded-lg object-cover ${blur ? "blur-md" : ""}`}
    />
  );
}

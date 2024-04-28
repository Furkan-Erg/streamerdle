import React from "react";
import { Email, GitHub, Instagram, LinkedIn } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function CreditFooter() {
  return (
    <div className="absolute bottom-0 text-3xl  mb-1">
      <div className="flex flex-row gap-1">
        <div className="text-base">Made by:</div>
        <div className="animate-bounce font-bold">Furkan Ergüldürenler</div>
        <FavoriteIcon color="error" className="animate-pulse " />
        <Instagram />
        <LinkedIn />
        <GitHub />
        <Email />
      </div>
    </div>
  );
}

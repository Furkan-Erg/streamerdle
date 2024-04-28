import React from "react";
import { Email, GitHub, Instagram, LinkedIn } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";

export default function CreditFooter() {
  return (
    <div className="absolute bottom-0 text-3xl  mb-1 text-white">
      <div className="flex flex-row gap-1">
        <div className="text-base">Made by:</div>
        <FavoriteIcon color="error" className="animate-pulse " />
        <div className="animate-bounce font-bold">Furkan Ergüldürenler</div>
        <FavoriteIcon color="error" className="animate-pulse " />
        <IconButton
          href="https://www.instagram.com/erg09/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram className="text-white" />
        </IconButton>
        <IconButton
          href="https://www.linkedin.com/in/furkan-erguldurenler/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedIn className="text-white" />
        </IconButton>
        <IconButton
          href="https://github.com/Furkan-Erg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub className="text-white" />
        </IconButton>

        <IconButton
          href="mailto:furkanerguldurenler@hotmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Email className="text-white" />
        </IconButton>
      </div>
    </div>
  );
}

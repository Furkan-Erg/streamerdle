import React from "react";
import { Email, GitHub, Instagram, LinkedIn } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";

const links = [
  { href: "https://www.instagram.com/erg09/", label: "Instagram", Icon: Instagram },
  { href: "https://www.linkedin.com/in/furkan-erguldurenler/", label: "LinkedIn", Icon: LinkedIn },
  { href: "https://github.com/Furkan-Erg", label: "GitHub", Icon: GitHub },
  { href: "mailto:furkanerguldurenler@hotmail.com", label: "E-posta", Icon: Email },
];

export default function CreditFooter() {
  return (
    <footer className="flex flex-col items-center justify-center gap-1 py-3 text-xs text-white/50 sm:flex-row sm:gap-3">
      <div className="flex items-center gap-1">
        <FavoriteIcon className="animate-pulse text-red-500" sx={{ fontSize: 14 }} />
        <span>
          <span className="font-semibold text-white/80">Furkan Ergüldürenler</span> tarafından
          yapıldı
        </span>
      </div>
      <div className="flex">
        {links.map(({ href, label, Icon }) => (
          <IconButton
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            aria-label={label}
          >
            <Icon sx={{ fontSize: 18 }} className="text-white/60" />
          </IconButton>
        ))}
      </div>
    </footer>
  );
}

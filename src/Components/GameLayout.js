import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ArrowBack, BarChart, HelpOutline } from "@mui/icons-material";

export default function GameLayout({ title, subtitle, onHelp, onStats, children }) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-4 pb-8">
      <header className="sticky top-0 z-20 -mx-4 mb-6 flex w-[calc(100%+2rem)] items-center justify-between border-b border-white/10 bg-surface-sunken/70 px-2 py-2 backdrop-blur-md sm:px-4">
        <Tooltip title="Ana sayfa">
          <IconButton component={Link} to="/" aria-label="Ana sayfa">
            <ArrowBack />
          </IconButton>
        </Tooltip>
        <div className="text-center leading-tight">
          <div className="text-lg font-extrabold tracking-tight sm:text-xl">{title}</div>
          {subtitle && <div className="text-xs text-white/50">{subtitle}</div>}
        </div>
        <div className="flex">
          {onHelp && (
            <Tooltip title="Nasıl oynanır?">
              <IconButton onClick={onHelp} aria-label="Nasıl oynanır?">
                <HelpOutline />
              </IconButton>
            </Tooltip>
          )}
          {onStats && (
            <Tooltip title="İstatistikler">
              <IconButton onClick={onStats} aria-label="İstatistikler">
                <BarChart />
              </IconButton>
            </Tooltip>
          )}
          {/* Keeps the title centered when a mode has fewer actions. */}
          {!onHelp && !onStats && <div className="w-10" />}
        </div>
      </header>
      {children}
    </div>
  );
}

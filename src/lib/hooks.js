import { useEffect, useState } from "react";
import { msUntilTomorrow } from "./random";

export const GameStates = {
  PLAYING: "playing",
  WIN: "win",
  LOST: "lost",
};

// Turns true `delayMs` after `flag` becomes true, so hint tiles finish flipping
// before the result card appears. Resets immediately when `flag` turns false.
export function useDelayedFlag(flag, delayMs) {
  const [delayed, setDelayed] = useState(false);
  useEffect(() => {
    if (!flag) {
      setDelayed(false);
      return undefined;
    }
    const id = setTimeout(() => setDelayed(true), delayMs);
    return () => clearTimeout(id);
  }, [flag, delayMs]);
  return delayed;
}

// Development-only helper replacing the old Q+W+E alert cheat.
export function useDevReveal(answer) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && answer) {
      // eslint-disable-next-line no-console
      console.info(`[streamerdle] cevap: ${answer.name}`);
    }
  }, [answer]);
}

export function useCountdownToMidnight() {
  const [ms, setMs] = useState(() => msUntilTomorrow());
  useEffect(() => {
    const id = setInterval(() => setMs(msUntilTomorrow()), 1000);
    return () => clearInterval(id);
  }, []);
  const total = Math.max(0, Math.floor(ms / 1000));
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(Math.floor(total / 3600))}:${pad(Math.floor((total % 3600) / 60))}:${pad(total % 60)}`;
}

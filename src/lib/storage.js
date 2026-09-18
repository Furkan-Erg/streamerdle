import { useCallback, useState } from "react";

export function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private mode / quota exceeded: the game still works, it just won't persist.
  }
}

export function useLocalStorage(key, fallback) {
  const [value, setValue] = useState(() => readStorage(key, fallback));
  const update = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        writeStorage(key, resolved);
        return resolved;
      });
    },
    [key]
  );
  return [value, update];
}

// Older versions stored the splash best score as a bare number under "bestScore".
export function migrateLegacyStorage() {
  try {
    const legacy = window.localStorage.getItem("bestScore");
    if (legacy !== null) {
      const current = readStorage("best:splash", 0);
      writeStorage("best:splash", Math.max(current, parseInt(legacy, 10) || 0));
      window.localStorage.removeItem("bestScore");
    }
  } catch {
    // ignore
  }
}

export const emptyStats = {
  played: 0,
  won: 0,
  currentStreak: 0,
  maxStreak: 0,
  distribution: {},
};

export function recordResult(stats, won, guessCount) {
  const currentStreak = won ? stats.currentStreak + 1 : 0;
  const distribution = { ...stats.distribution };
  if (won) distribution[guessCount] = (distribution[guessCount] ?? 0) + 1;
  return {
    played: stats.played + 1,
    won: stats.won + (won ? 1 : 0),
    currentStreak,
    maxStreak: Math.max(stats.maxStreak, currentStreak),
    distribution,
  };
}

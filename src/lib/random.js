// Deterministic PRNG so every player gets the same daily streamer.
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Local calendar date as "YYYY-MM-DD".
export function getDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function yesterdayKey(dateKey) {
  const [y, m, d] = dateKey.split("-").map(Number);
  return getDateKey(new Date(y, m - 1, d - 1));
}

// A daily streak only counts if the last game was today or yesterday.
export function activeDailyStreak(stats, dateKey = getDateKey()) {
  return stats.lastPlayed === dateKey || stats.lastPlayed === yesterdayKey(dateKey)
    ? stats.currentStreak
    : 0;
}

export function pickDaily(list, dateKey = getDateKey()) {
  const seed = Number(dateKey.replace(/-/g, ""));
  // Burn a few values so consecutive dates don't produce correlated picks.
  const rand = mulberry32(seed);
  rand();
  rand();
  return list[Math.floor(rand() * list.length)];
}

export function pickRandom(list, excludeIds = [], rand = Math.random) {
  const pool = list.filter((item) => !excludeIds.includes(item.id ?? item));
  const source = pool.length > 0 ? pool : list;
  return source[Math.floor(rand() * source.length)];
}

// Picks a random item not among the last `limit` picks; mutates `recentIds` as history.
export function pickFresh(list, recentIds, limit = 15) {
  const next = pickRandom(list, recentIds);
  recentIds.push(next.id);
  if (recentIds.length > limit) recentIds.shift();
  return next;
}

export function msUntilTomorrow(now = new Date()) {
  const tomorrow = new Date(now);
  tomorrow.setHours(24, 0, 0, 0);
  return tomorrow - now;
}

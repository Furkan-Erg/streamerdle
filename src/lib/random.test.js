import { activeDailyStreak, getDateKey, pickDaily, pickFresh, pickRandom, yesterdayKey } from "./random";
import { streamerList } from "../data/streamers";

test("daily pick is stable for the same date", () => {
  expect(pickDaily(streamerList, "2026-09-18").id).toBe(pickDaily(streamerList, "2026-09-18").id);
});

test("daily pick varies across dates", () => {
  const ids = new Set();
  for (let day = 1; day <= 30; day++) {
    ids.add(pickDaily(streamerList, `2026-01-${String(day).padStart(2, "0")}`).id);
  }
  expect(ids.size).toBeGreaterThan(10);
});

test("getDateKey formats local date", () => {
  expect(getDateKey(new Date(2026, 0, 5))).toBe("2026-01-05");
});

test("yesterdayKey crosses month and year boundaries", () => {
  expect(yesterdayKey("2026-03-01")).toBe("2026-02-28");
  expect(yesterdayKey("2026-01-01")).toBe("2025-12-31");
});

test("daily streak resets when a day was skipped", () => {
  const stats = { currentStreak: 4, lastPlayed: "2026-09-16" };
  expect(activeDailyStreak(stats, "2026-09-17")).toBe(4);
  expect(activeDailyStreak(stats, "2026-09-18")).toBe(0);
});

test("pickRandom respects exclusions and falls back when all excluded", () => {
  const tiles = [0, 1, 2];
  for (let i = 0; i < 20; i++) expect(pickRandom(tiles, [0, 2])).toBe(1);
  expect(tiles).toContain(pickRandom(tiles, [0, 1, 2]));
});

test("pickFresh does not repeat recent picks", () => {
  const recent = [];
  const seen = new Set();
  for (let i = 0; i < 10; i++) seen.add(pickFresh(streamerList, recent, 10).id);
  expect(seen.size).toBe(10);
});

test("streamer data is well formed", () => {
  const ids = new Set(streamerList.map((s) => s.id));
  expect(ids.size).toBe(streamerList.length);
  for (const s of streamerList) {
    expect(typeof s.followerCount).toBe("number");
    expect(typeof s.birthYear).toBe("number");
    expect(s.category.length).toBeGreaterThan(0);
    expect(s.platform).toBeTruthy();
  }
});

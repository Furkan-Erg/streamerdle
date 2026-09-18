import { Status, compareStreamers, isHigherLowerCorrect, toEmojiRow } from "./compare";
import { formatNumber } from "../data/helpers";

const base = {
  id: "a",
  name: "A",
  gender: "Erkek",
  nickName: "Nick",
  platform: "Twitch",
  followerCount: 1000000,
  birthYear: 1995,
  category: ["Oyun", "Sohbet"],
};

test("identical streamer is all correct", () => {
  const result = compareStreamers(base, base);
  expect(result.name).toBe(Status.CORRECT);
  expect(result.followerCount).toEqual({ status: Status.CORRECT, direction: null });
  expect(result.category).toBe(Status.CORRECT);
  expect(toEmojiRow(result)).toBe("🟩🟩🟩🟩🟩🟩");
});

test("near values are partial with direction toward the answer", () => {
  const guess = { ...base, id: "b", followerCount: 900000, birthYear: 1997 };
  const result = compareStreamers(guess, base);
  expect(result.followerCount).toEqual({ status: Status.PARTIAL, direction: "up" });
  expect(result.birthYear).toEqual({ status: Status.PARTIAL, direction: "down" });
});

test("far values, different platform, missing nickname and category overlap", () => {
  const guess = {
    ...base,
    id: "c",
    gender: "Kadın",
    nickName: null,
    platform: "YouTube",
    followerCount: 5000000,
    birthYear: 1980,
    category: ["Sohbet"],
  };
  const result = compareStreamers(guess, base);
  expect(result.gender).toBe(Status.WRONG);
  expect(result.platform).toBe(Status.WRONG);
  expect(result.nickName).toBe(Status.WRONG);
  expect(result.followerCount).toEqual({ status: Status.WRONG, direction: "down" });
  expect(result.birthYear).toEqual({ status: Status.WRONG, direction: "up" });
  expect(result.category).toBe(Status.PARTIAL);
});

test("category order does not matter", () => {
  const guess = { ...base, id: "d", category: ["Sohbet", "Oyun"] };
  expect(compareStreamers(guess, base).category).toBe(Status.CORRECT);
});

test("higher/lower decisions, ties count as correct", () => {
  const low = { followerCount: 100 };
  const high = { followerCount: 200 };
  expect(isHigherLowerCorrect(low, high, "higher")).toBe(true);
  expect(isHigherLowerCorrect(low, high, "lower")).toBe(false);
  expect(isHigherLowerCorrect(high, low, "lower")).toBe(true);
  expect(isHigherLowerCorrect(low, { followerCount: 100 }, "lower")).toBe(true);
});

test("formatNumber uses Turkish units", () => {
  expect(formatNumber(4700000)).toBe("4,7 Mn");
  expect(formatNumber(853000)).toBe("853 B");
  expect(formatNumber(126400)).toBe("126 B");
  expect(formatNumber(25000)).toBe("25 B");
  expect(formatNumber(999)).toBe("999");
});

export const Status = {
  CORRECT: "correct",
  PARTIAL: "partial",
  WRONG: "wrong",
};

export const FOLLOWER_PARTIAL_RATIO = 0.25;
export const BIRTH_YEAR_PARTIAL_RANGE = 2;

const direction = (guess, answer) =>
  guess === answer ? null : answer > guess ? "up" : "down";

const sameSet = (a, b) =>
  a.length === b.length && a.every((item) => b.includes(item));

// Returns per-attribute feedback for a guess against the answer.
// `direction` tells which way the answer lies ("up" = answer is higher).
export function compareStreamers(guess, answer) {
  const followerDiff = Math.abs(guess.followerCount - answer.followerCount);
  const yearDiff = Math.abs(guess.birthYear - answer.birthYear);

  return {
    name: guess.id === answer.id ? Status.CORRECT : Status.WRONG,
    gender: guess.gender === answer.gender ? Status.CORRECT : Status.WRONG,
    platform: guess.platform === answer.platform ? Status.CORRECT : Status.WRONG,
    nickName:
      Boolean(guess.nickName) === Boolean(answer.nickName)
        ? Status.CORRECT
        : Status.WRONG,
    followerCount: {
      status:
        followerDiff === 0
          ? Status.CORRECT
          : followerDiff <= answer.followerCount * FOLLOWER_PARTIAL_RATIO
          ? Status.PARTIAL
          : Status.WRONG,
      direction: direction(guess.followerCount, answer.followerCount),
    },
    birthYear: {
      status:
        yearDiff === 0
          ? Status.CORRECT
          : yearDiff <= BIRTH_YEAR_PARTIAL_RANGE
          ? Status.PARTIAL
          : Status.WRONG,
      direction: direction(guess.birthYear, answer.birthYear),
    },
    category: sameSet(guess.category, answer.category)
      ? Status.CORRECT
      : guess.category.some((c) => answer.category.includes(c))
      ? Status.PARTIAL
      : Status.WRONG,
  };
}

const statusOf = (value) => (typeof value === "string" ? value : value.status);

const EMOJI = {
  [Status.CORRECT]: "🟩",
  [Status.PARTIAL]: "🟧",
  [Status.WRONG]: "🟥",
};

// One emoji row per guess, name column excluded (it would spoil nothing but adds noise).
export function toEmojiRow(result) {
  return ["gender", "platform", "nickName", "followerCount", "birthYear", "category"]
    .map((key) => EMOJI[statusOf(result[key])])
    .join("");
}

// Higher/Lower: ties count as correct for either choice.
export function isHigherLowerCorrect(current, next, choice) {
  if (next.followerCount === current.followerCount) return true;
  return choice === "higher"
    ? next.followerCount > current.followerCount
    : next.followerCount < current.followerCount;
}

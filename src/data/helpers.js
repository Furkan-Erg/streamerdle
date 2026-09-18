import { streamerList } from "./streamers";

const byId = new Map(streamerList.map((s) => [s.id, s]));

export const getStreamerById = (id) => byId.get(id);

export const getLabel = (streamer) =>
  streamer.nickName ? `${streamer.name} (${streamer.nickName})` : streamer.name;

export const getInitials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toLocaleUpperCase("tr"))
    .join("");

// 4700000 -> "4,7 Mn", 853000 -> "853 B", 999 -> "999"
export function formatNumber(num) {
  const n = Number(num);
  if (n >= 1_000_000) return `${trimDecimal(n / 1_000_000)} Mn`;
  if (n >= 1_000) return `${trimDecimal(n / 1_000)} B`;
  return n.toString();
}

function trimDecimal(value) {
  const rounded = value >= 100 ? Math.round(value) : Math.round(value * 10) / 10;
  return rounded.toLocaleString("tr-TR");
}

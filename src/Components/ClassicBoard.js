import React, { useMemo } from "react";
import Tooltip from "@mui/material/Tooltip";
import { ArrowUpward, HelpOutline } from "@mui/icons-material";
import StreamerSearch from "./StreamerSearch";
import StreamerAvatar from "./StreamerAvatar";
import HintTile, { TILE_SIZE, TILE_WIDTH } from "./HintTile";
import { streamerList } from "../data/streamers";
import { formatNumber, getStreamerById } from "../data/helpers";
import {
  BIRTH_YEAR_PARTIAL_RANGE,
  FOLLOWER_PARTIAL_RATIO,
  compareStreamers,
} from "../lib/compare";

export const MAX_GUESSES = 8;
export const PHOTO_HINT_AFTER = 5;

const columns = [
  { label: "Kişi" },
  { label: "Cinsiyet" },
  { label: "Platform" },
  { label: "Mahlas", help: "Influencer'ın bir mahlası (nickname) var mı?" },
  { label: "Takipçi", help: `Turuncu: ±%${FOLLOWER_PARTIAL_RATIO * 100} yakın` },
  { label: "Doğum Yılı", help: `Turuncu: ±${BIRTH_YEAR_PARTIAL_RANGE} yıl yakın` },
  { label: "Kategori", help: "Turuncu: en az bir kategori ortak" },
];

// Guess input + attribute grid. The parent owns guesses and end-of-game state.
export default function ClassicBoard({
  answer,
  guessIds,
  onGuess,
  finished,
  prompt = "Bu influencer kim?",
}) {
  const guesses = useMemo(() => guessIds.map(getStreamerById).filter(Boolean), [guessIds]);
  const remainingOptions = useMemo(
    () => streamerList.filter((s) => !guessIds.includes(s.id)),
    [guessIds]
  );
  const wrongCount = guesses.filter((g) => g.id !== answer.id).length;
  const showPhotoHint = !finished && wrongCount >= PHOTO_HINT_AFTER;

  return (
    <div className="flex w-full flex-col items-center gap-5">
      {!finished && (
        <>
          <div className="card w-full max-w-md px-6 py-4 text-center">
            <div className="font-semibold">{prompt}</div>
            <div className="mt-1 text-sm text-white/60">
              {guesses.length === 0
                ? "Başlamak için herhangi bir influencer adı yaz."
                : `${MAX_GUESSES - guesses.length} tahmin hakkın kaldı.`}
            </div>
            {!showPhotoHint && wrongCount > 0 && (
              <div className="mt-2 text-xs text-white/40">
                {PHOTO_HINT_AFTER - wrongCount} yanlış tahmin sonra fotoğraf ipucu açılır.
              </div>
            )}
            {showPhotoHint && (
              <div className="mt-3 flex items-center justify-center gap-3 animate-fade-in">
                <div className="overflow-hidden rounded-lg">
                  <StreamerAvatar streamer={answer} className="w-16 h-16 scale-110" blur />
                </div>
                <div className="text-left text-xs text-white/60">
                  İpucu: bulanık fotoğraf
                </div>
              </div>
            )}
          </div>
          <StreamerSearch options={remainingOptions} onSelect={onGuess} />
        </>
      )}

      {guesses.length > 0 && (
        <div className="w-full overflow-x-auto pb-2">
          <div className="mx-auto flex w-max flex-col gap-2 px-1">
            <div className="flex gap-1.5 sm:gap-2">
              {columns.map((col, i) => (
                <div
                  key={col.label}
                  className={`${TILE_WIDTH} ${
                    i === 0 ? "sticky left-0 z-10 rounded-t bg-surface-sunken" : ""
                  } flex shrink-0 items-center justify-center gap-0.5 border-b-2 border-white/30 pb-1 text-center text-[0.7rem] font-semibold text-white/80 sm:text-xs`}
                >
                  {col.label}
                  {col.help && (
                    <Tooltip title={col.help}>
                      <HelpOutline sx={{ fontSize: 13 }} className="cursor-help text-white/40" />
                    </Tooltip>
                  )}
                </div>
              ))}
            </div>
            {[...guesses].reverse().map((guess) => (
              <GuessRow key={guess.id} guess={guess} answer={answer} />
            ))}
          </div>
        </div>
      )}

      {guesses.length > 0 && <Legend />}
    </div>
  );
}

function GuessRow({ guess, answer }) {
  const result = compareStreamers(guess, answer);
  return (
    <div className="flex gap-1.5 sm:gap-2">
      {/* Sticky on phones so the guess stays identifiable while scrolling hints sideways. */}
      <div className={`flip sticky left-0 z-10 ${TILE_SIZE} shrink-0 overflow-hidden rounded-lg border border-black/40 shadow-lg shadow-black/60`}>
        <StreamerAvatar streamer={guess} className="h-full w-full rounded-none" />
        <div className="absolute inset-x-0 bottom-0 bg-black/70 px-0.5 py-0.5 text-center text-[0.6rem] font-semibold leading-tight text-white sm:text-[0.65rem]">
          {guess.nickName ?? guess.name}
        </div>
      </div>
      <HintTile index={1} status={result.gender}>{guess.gender}</HintTile>
      <HintTile index={2} status={result.platform}>{guess.platform}</HintTile>
      <HintTile index={3} status={result.nickName}>{guess.nickName ? "Var" : "Yok"}</HintTile>
      <HintTile index={4} {...result.followerCount}>{formatNumber(guess.followerCount)}</HintTile>
      <HintTile index={5} {...result.birthYear}>{guess.birthYear}</HintTile>
      <HintTile index={6} status={result.category}>{guess.category.join(", ")}</HintTile>
    </div>
  );
}

function Legend() {
  const items = [
    ["bg-hint-correct", "Doğru"],
    ["bg-hint-partial", "Yakın / kısmen"],
    ["bg-hint-wrong", "Yanlış"],
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-white/60">
      {items.map(([color, label]) => (
        <span key={label} className="flex items-center gap-1.5">
          <span className={`inline-block h-3 w-3 rounded-sm ${color}`} />
          {label}
        </span>
      ))}
      <span className="flex items-center gap-1">
        <ArrowUpward sx={{ fontSize: 14 }} /> Cevap daha yüksek
      </span>
    </div>
  );
}

export function ClassicHelp() {
  return (
    <div className="flex flex-col gap-3">
      <p>
        Gizli influencer'ı en fazla <b>{MAX_GUESSES}</b> tahminde bul. Her tahminden sonra
        özellikler renklenir:
      </p>
      <ul className="flex flex-col gap-1.5">
        <li><span className="font-semibold text-green-400">Yeşil:</span> birebir aynı.</li>
        <li>
          <span className="font-semibold text-orange-400">Turuncu:</span> yakın (takipçi ±%
          {FOLLOWER_PARTIAL_RATIO * 100}, doğum yılı ±{BIRTH_YEAR_PARTIAL_RANGE}) ya da en az
          bir ortak kategori.
        </li>
        <li><span className="font-semibold text-red-400">Kırmızı:</span> tutmuyor.</li>
        <li>Oklar, doğru cevabın daha yüksek mi düşük mü olduğunu gösterir.</li>
      </ul>
      <p>{PHOTO_HINT_AFTER} yanlış tahminden sonra bulanık bir fotoğraf ipucu açılır.</p>
    </div>
  );
}

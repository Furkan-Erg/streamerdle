import React from "react";
import StreamerAvatar from "./StreamerAvatar";
import { formatNumber } from "../data/helpers";

// End-of-round summary: who the answer was plus mode-specific actions.
export default function ResultCard({ won, streamer, headline, detail, children }) {
  return (
    <div className="card w-full max-w-md animate-pop p-6 text-center">
      <div className={`text-2xl font-extrabold ${won ? "text-green-400" : "text-red-400"}`}>
        {headline ?? (won ? "Tebrikler!" : "Oyun bitti")}
      </div>
      {detail && <div className="mt-1 text-sm text-white/70">{detail}</div>}
      {streamer && (
        <div className="mt-5 flex items-center gap-4 rounded-xl bg-white/5 p-3 text-left">
          <StreamerAvatar streamer={streamer} className="w-20 h-20" />
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-wide text-white/50">Doğru cevap</div>
            <div className="truncate text-lg font-bold">{streamer.name}</div>
            {streamer.nickName && (
              <div className="truncate text-sm text-brand-300">{streamer.nickName}</div>
            )}
            <div className="mt-1 text-xs text-white/60">
              {streamer.platform} · {formatNumber(streamer.followerCount)} takipçi ·{" "}
              {streamer.birthYear}
            </div>
          </div>
        </div>
      )}
      {children && <div className="mt-5 flex flex-col gap-3">{children}</div>}
    </div>
  );
}

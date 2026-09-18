import React from "react";
import Modal from "./Modal";

export default function StatsModal({ open, onClose, stats, maxGuesses, title = "İstatistikler" }) {
  const winRate = stats.played ? Math.round((stats.won / stats.played) * 100) : 0;
  const counts = Array.from({ length: maxGuesses }, (_, i) => stats.distribution[i + 1] ?? 0);
  const maxCount = Math.max(1, ...counts);

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="mb-6 grid grid-cols-4 gap-2 text-center">
        <Stat value={stats.played} label="Oynanan" />
        <Stat value={`%${winRate}`} label="Kazanma" />
        <Stat value={stats.currentStreak} label="Seri" />
        <Stat value={stats.maxStreak} label="En iyi seri" />
      </div>
      <div className="mb-2 font-semibold text-white">Tahmin dağılımı</div>
      <div className="flex flex-col gap-1">
        {counts.map((count, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-4 text-right text-xs">{i + 1}</span>
            <div
              className="flex h-5 min-w-[1.5rem] items-center justify-end rounded bg-brand-600 px-1.5 text-xs font-semibold text-white"
              style={{ width: `${(count / maxCount) * 100}%` }}
            >
              {count}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

const Stat = ({ value, label }) => (
  <div>
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-[0.7rem] text-white/60">{label}</div>
  </div>
);

import React from "react";
import { Link } from "react-router-dom";
import {
  CalendarToday,
  EmojiEvents,
  GridView,
  ImageSearch,
  LocalFireDepartment,
  SwapVert,
} from "@mui/icons-material";
import { streamerList } from "./data/streamers";
import { readStorage } from "./lib/storage";
import { activeDailyStreak, getDateKey } from "./lib/random";
import { GameStates } from "./lib/hooks";

function HomePage() {
  const today = getDateKey();
  const dailyProgress = readStorage(`daily:${today}`, null);
  const dailyDone = dailyProgress && dailyProgress.status !== GameStates.PLAYING;
  const dailyStreak = activeDailyStreak(readStorage("stats:daily", {}), today);
  const classicWins = readStorage("stats:classic", { won: 0 }).won;
  const splashBest = readStorage("best:splash", 0);
  const higherLowerBest = readStorage("best:higherlower", 0);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-8 px-4 py-10">
      <div className="animate-fade-in text-center">
        <h1 className="bg-gradient-to-r from-brand-300 via-white to-brand-300 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl">
          Streamerdle
        </h1>
        <p className="mt-3 text-white/70">
          Ünlü Türk yayıncı ve influencer'ları tahmin et!{" "}
          <span className="text-white/40">{streamerList.length} influencer</span>
        </p>
      </div>

      <div className="grid w-full gap-4 md:grid-cols-3">
        <ModeCard
          to="/daily"
          featured
          Icon={CalendarToday}
          title="Günlük"
          description="Herkes için aynı influencer. Günde bir şans, seriyi bozma!"
          badge={
            dailyDone ? (
              <Badge tone="green">Bugün tamamlandı ✓</Badge>
            ) : (
              <Badge tone="brand">Yeni influencer seni bekliyor</Badge>
            )
          }
          stat={
            dailyStreak > 0 && (
              <Stat Icon={LocalFireDepartment} className="text-orange-400">
                {dailyStreak} gün seri
              </Stat>
            )
          }
        />
        <ModeCard
          to="/classic"
          Icon={GridView}
          title="Klasik"
          description="Her tahminde cinsiyet, platform, yaş ve daha fazlası için ipucu al."
          stat={classicWins > 0 && <Stat Icon={EmojiEvents}>{classicWins} galibiyet</Stat>}
        />
        <ModeCard
          to="/splash"
          Icon={ImageSearch}
          title="Görsel"
          description="Bulanık fotoğraftan kim olduğunu bul. Her hata yeni bir parça açar."
          stat={splashBest > 0 && <Stat Icon={EmojiEvents}>Rekor: {splashBest}</Stat>}
        />
        <ModeCard
          to="/higher-lower"
          Icon={SwapVert}
          title="Daha Çok / Daha Az"
          description="Kimin takipçisi daha fazla? Üst üste kaç tane bilebilirsin?"
          stat={higherLowerBest > 0 && <Stat Icon={EmojiEvents}>Rekor: {higherLowerBest}</Stat>}
        />
      </div>
    </div>
  );
}

export default HomePage;

const ModeCard = ({ to, Icon, title, description, badge, stat, featured = false }) => (
  <Link
    to={to}
    className={`card group relative flex animate-fade-in flex-col gap-3 p-5 transition duration-200 hover:-translate-y-1 hover:border-brand-400/60 hover:shadow-brand-900/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-400 ${
      featured ? "border-brand-500/50 bg-gradient-to-br from-brand-800/70 to-surface/80 md:col-span-3" : ""
    }`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${
          featured ? "bg-brand-500" : "bg-white/10 group-hover:bg-brand-600"
        } transition-colors`}
      >
        <Icon />
      </div>
      <div className="text-xl font-bold">{title}</div>
      {badge && <div className="ml-auto hidden sm:block">{badge}</div>}
    </div>
    <p className="text-sm text-white/70">{description}</p>
    {(stat || badge) && (
      <div className="flex flex-wrap items-center gap-2">
        {badge && <div className="sm:hidden">{badge}</div>}
        {stat}
      </div>
    )}
  </Link>
);

const Badge = ({ tone, children }) => (
  <span
    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
      tone === "green" ? "bg-green-500/20 text-green-300" : "bg-white/15 text-white"
    }`}
  >
    {children}
  </span>
);

const Stat = ({ Icon, className = "text-yellow-400", children }) => (
  <span className="flex items-center gap-1 text-xs font-medium text-white/70">
    <Icon sx={{ fontSize: 16 }} className={className} />
    {children}
  </span>
);

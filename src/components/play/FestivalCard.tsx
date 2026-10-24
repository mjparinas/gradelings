"use client";

import { countEarned } from "@/lib/stickers";
import { dayKey } from "@/lib/model";
import { useFlag } from "@/lib/remoteFlags";
import { useChildSay } from "@/lib/say";
import { daysLeft, SEASON_REWARD, seasonOn, seasonStickers } from "@/lib/seasons";
import { useActiveProfile, useDerived } from "@/lib/store";
import { useNow } from "@/lib/useNow";
import { useBand } from "../band";
import { ProgressBar } from "../ui";

/**
 * The festival on today (Leaf, Snow, Sprout or Sun): stickers found so far and days left, opening its
 * sticker page. Older kids see it on the home screen; little kids in My Treasures.
 */
export function FestivalCard() {
  const on = useFlag("seasonal-events");
  const book = useFlag("sticker-book");
  const profile = useActiveProfile();
  const d = useDerived();
  const band = useBand();
  const say = useChildSay();
  const today = dayKey(useNow());
  const run = seasonOn(today);
  if (!on || !book || !run || !profile) return null;
  const stickers = seasonStickers(run, d, band);
  const got = countEarned(stickers);
  const left = daysLeft(run, today);
  const full = got === stickers.length;
  const next = stickers.find((s) => !s.earned);
  return (
    <a
      href={`#/stickers?page=${run.key}`}
      className="card flex items-center gap-3 border-2 p-4 sm:p-5"
      style={{ borderColor: run.season.colour }}
      data-testid="festival-card"
    >
      <span aria-hidden="true" className="text-5xl">{run.season.emoji}</span>
      <span className="flex-1">
        <span className="flex flex-wrap items-baseline justify-between gap-x-2">
          <span className="text-xl font-bold sm:text-2xl">{run.season.name}</span>
          <span className="text-sm font-semibold text-ink-soft">{left === 1 ? "Last day!" : `${left} days left`}</span>
        </span>
        <ProgressBar value={got} max={stickers.length} height={12} className="my-1" label={`${run.season.name} stickers`} />
        <span className="block font-read text-base font-semibold text-ink-soft">
          {full ? "Every festival sticker found! 🎉" : next ? say(`${got} of ${stickers.length} stickers. Next: ${next.hint.toLowerCase()}.`) : ""}
          {!full && got >= stickers.length - 1 ? ` Fill the page for ${SEASON_REWARD} coins!` : ""}
        </span>
      </span>
      <span aria-hidden="true" className="text-xl">▶</span>
    </a>
  );
}

"use client";

import { useEffect } from "react";
import { getUnitRef } from "@/content";
import { levelInfo } from "@/lib/proficiency";
import { useChildSay } from "@/lib/say";
import { useActiveProfile, useChildSettings } from "@/lib/store";
import { getTrophy } from "@/lib/trophies";
import { markRecapSeen, recapHeadline, type RecapUnit } from "@/lib/weekRecap";
import { useBand } from "../band";
import { Page } from "../ui";
import { SayButton, useBuddySays } from "./BuddySays";
import { Companion } from "./Companion";
import { TreasureBack } from "./Treasures";
import { useWeekRecap } from "./WeekRecapCard";

const DAY_LETTERS = ["M", "T", "W", "T", "F", "S", "S"];
const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
/** Enough to celebrate without a long list; the rest is a count. */
const SHOWN_UNITS = 5;

/**
 * The weekly "you grew" recap (`#/grew`): last week's days practised, lessons that grew a level, new
 * lessons, stickers, stories and trophies. Read from events, so it is the same on every device.
 * It celebrates practice, never compares, and says nothing about what didn't happen.
 */
export function WeekRecap() {
  const recap = useWeekRecap();
  const profile = useActiveProfile()!;
  const settings = useChildSettings();
  const band = useBand();
  const say = useChildSay();
  const little = band === "little";
  const headline = recap ? recapHeadline(recap) : "";
  useBuddySays(headline, little && Boolean(settings?.autoRead));
  useEffect(() => {
    if (recap) markRecapSeen(profile.id, recap.week);
  }, [recap, profile.id]);

  const unitRows = (units: RecapUnit[]) =>
    units.flatMap((u) => {
      const ref = getUnitRef(u.key, profile.framework);
      // A unit from a grade that isn't downloaded on this device is still counted, just not listed.
      return ref ? [{ ...u, ref }] : [];
    });
  const grew = recap ? unitRows(recap.grew) : [];
  const started = recap ? unitRows(recap.started) : [];
  const trophies = recap ? recap.trophies.flatMap((id) => getTrophy(id) ?? []) : [];

  return (
    <Page className="gap-5 pb-8">
      <header className="flex items-center gap-3">
        <TreasureBack />
        <h1 className="text-3xl font-bold sm:text-4xl">🌱 {little ? "You grew!" : "Your week"}</h1>
      </header>

      {!recap ? (
        <section className="card flex items-center gap-4 p-5">
          <Companion mood="wave" size={96} />
          <p className="flex-1 font-read text-xl font-bold">{little ? "Play this week and see how you grow!" : say("Practise this week, and next Monday you'll see how you grew.")}</p>
        </section>
      ) : (
        <>
          <section className="card flex items-center gap-4 p-4 sm:p-5">
            <Companion mood="cheer" size={little ? 120 : 96} className="narrow:hidden" />
            <div className="flex flex-1 items-center gap-3">
              <p className={`flex-1 font-read font-bold leading-snug ${little ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>{say(headline)}</p>
              <SayButton text={say(headline)} />
            </div>
          </section>

          <section className="card p-4 sm:p-5" aria-label="Days you practised">
            <h2 className="mb-3 text-xl font-bold sm:text-2xl">
              🔥 {recap.days} {recap.days === 1 ? "day" : "days"} of {say("practice")}
            </h2>
            <ol className="flex justify-between gap-1.5">
              {recap.dayDots.map((on, i) => (
                <li key={i} className="flex flex-col items-center gap-1">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-lg narrow:h-8 narrow:w-8 ${on ? "border-good-dark bg-good" : "border-ink-soft/40 bg-white"}`}
                    data-state={on ? "right" : undefined}
                  >
                    <span aria-hidden="true">{on ? "✓" : ""}</span>
                    <span className="sr-only">{`${DAY_NAMES[i]}: ${on ? "practised" : "rest day"}`}</span>
                  </span>
                  <span aria-hidden="true" className="text-sm font-semibold text-ink-soft">{DAY_LETTERS[i]}</span>
                </li>
              ))}
            </ol>
            {!little && (
              <p className="mt-3 font-read text-lg font-semibold">
                {recap.answers} {recap.answers === 1 ? "question" : "questions"}
                {recap.minutes > 0 ? ` · ${recap.minutes} ${recap.minutes === 1 ? "minute" : "minutes"} of learning` : ""}
              </p>
            )}
          </section>

          {grew.length > 0 && (
            <section className="card p-4 sm:p-5" aria-label="Lessons that grew">
              <h2 className="mb-3 text-xl font-bold sm:text-2xl">🌳 {little ? "You grew!" : `Grew a level (${recap.grew.length})`}</h2>
              <ul className="flex flex-col gap-2.5">
                {grew.slice(0, SHOWN_UNITS).map((u) => {
                  const from = levelInfo(profile.framework, profile.grade, u.from);
                  const to = levelInfo(profile.framework, profile.grade, u.to);
                  return (
                    <li key={u.key} className="flex items-center gap-3 rounded-2xl bg-good-soft p-2.5">
                      <span aria-hidden="true" className="text-3xl">{u.ref.unit.emoji}</span>
                      <span className="flex-1 font-read text-lg font-bold">{u.ref.unit.title}</span>
                      {from && to && (
                        <span className="text-lg font-bold">
                          <span aria-hidden="true">
                            {from.icon} → {to.icon}
                          </span>
                          <span className="sr-only">{`${from.kidLabel} to ${to.kidLabel}`}</span>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
              {grew.length > SHOWN_UNITS && <p className="mt-2 text-sm font-semibold text-ink-soft">And {grew.length - SHOWN_UNITS} more!</p>}
            </section>
          )}

          {started.length > 0 && (
            <section className="card p-4 sm:p-5" aria-label="New lessons">
              <h2 className="mb-3 text-xl font-bold sm:text-2xl">🌱 {little ? "New lessons" : `New lessons started (${recap.started.length})`}</h2>
              <ul className="flex flex-wrap gap-2">
                {started.slice(0, SHOWN_UNITS).map((u) => (
                  <li key={u.key} className="flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 font-read text-base font-bold">
                    <span aria-hidden="true">{u.ref.unit.emoji}</span>
                    {u.ref.unit.title}
                  </li>
                ))}
              </ul>
              {started.length > SHOWN_UNITS && <p className="mt-2 text-sm font-semibold text-ink-soft">And {started.length - SHOWN_UNITS} more!</p>}
            </section>
          )}

          {(recap.stickers > 0 || recap.stories > 0 || trophies.length > 0) && (
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-3" aria-label="Treasures found">
              {recap.stickers > 0 && (
                <a href="#/stickers" className="card flex min-h-14 items-center gap-3 p-4">
                  <span aria-hidden="true" className="text-4xl">📒</span>
                  <span className="font-read text-lg font-bold">
                    {recap.stickers} new {recap.stickers === 1 ? "sticker" : "stickers"}
                  </span>
                </a>
              )}
              {recap.stories > 0 && (
                <a href="#/stories" className="card flex min-h-14 items-center gap-3 p-4">
                  <span aria-hidden="true" className="text-4xl">📖</span>
                  <span className="font-read text-lg font-bold">
                    {recap.stories} {recap.stories === 1 ? "story" : "stories"} read
                  </span>
                </a>
              )}
              {trophies.length > 0 && (
                <a href="#/trophies" className="card flex min-h-14 items-center gap-3 p-4">
                  <span aria-hidden="true" className="text-4xl">🏆</span>
                  <span className="font-read text-lg font-bold">
                    {trophies.length === 1 ? trophies[0].name : `${trophies.length} new trophies`}
                  </span>
                </a>
              )}
            </section>
          )}

          <a href="#/" className="btn btn-primary min-h-16 justify-center text-2xl">
            Keep growing ▶
          </a>
        </>
      )}
    </Page>
  );
}

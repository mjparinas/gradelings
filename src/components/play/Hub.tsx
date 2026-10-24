"use client";

import { onColour } from "@/lib/contrast";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { allUnitRefs, getUnitRef } from "@/content";
import { getSubjectMeta } from "@/content/subjects";
import { refresherUnit, weakest } from "@/lib/adaptive";
import { gameTime } from "@/lib/gametime";
import { effectiveGoal } from "@/lib/goal";
import { dayKey } from "@/lib/model";
import { canUse, type Feature } from "@/lib/plan";
import { dailyQuests, weekDays, weeklyQuests, weekStart, type Quest } from "@/lib/quests";
import { nextUp } from "@/lib/nextup";
import { levelInfo, unitLevel } from "@/lib/proficiency";
import type { FlagKey } from "@/lib/flags";
import { useIsOn } from "@/lib/remoteFlags";
import { storiesFor } from "@/lib/stories";
import { signOutStudent } from "@/lib/account";
import { go } from "@/lib/router";
import { useChildSay } from "@/lib/say";
import { eventsFor, useActiveProfile, useChildSettings, useDerived, useStore } from "@/lib/store";
import { useNow } from "@/lib/useNow";
import { useBand } from "../band";
import { SayButton, useBuddySays } from "./BuddySays";
import { Critter, SpeechBubble, getCritter } from "../Critter";
import { Companion } from "./Companion";
import { MembershipLock } from "./MembershipLock";
import { Page, ProgressBar } from "../ui";
import { GoalChip } from "./GoalPicker";
import { Hud } from "./Hud";
import { BuddyButton, MooseVisitor } from "./Secrets";
import { suggestions } from "./plans";
import { useAllowed } from "./useAllowed";
import { useClasswork } from "./useClasswork";
import { homeworkDone } from "@/lib/classroom";
import { ParentNote } from "./ParentNote";
import { ClassGoalCard } from "./ClassGoalCard";
import { RewardCard, TogetherCard } from "./FamilyCards";
import { FocusCard } from "./FocusCard";
import { LevelChip } from "./Practice";
import { InstallChip } from "./InstallChip";

interface Tile {
  id: string;
  title: string;
  desc: string;
  icon: string;
  colour: string;
  dark: string;
  href: string;
  feature?: Feature;
  /** The admin panel can switch this tile off for everyone (src/lib/flags.ts). */
  flag?: FlagKey;
  badge?: string;
  done?: boolean;
}

function greeting(name: string, hour: number): string {
  if (hour < 12) return `Good morning, ${name}!`;
  if (hour < 17) return `Hi, ${name}!`;
  return `Good evening, ${name}!`;
}

export function Hub() {
  const profile = useActiveProfile()!;
  const say = useChildSay();
  const settings = useChildSettings();
  const d = useDerived();
  const band = useBand();
  const family = useStore((s) => s.family);
  const isStudent = Boolean(family.account?.student);
  const allowed = useAllowed();
  const isOn = useIsOn();
  const [locked, setLocked] = useState(false);
  const now = useNow();
  const today = dayKey(now);
  const dayStat = d.days[today];
  const minutes = Math.floor((dayStat?.learnSeconds ?? 0) / 60);
  const goal = effectiveGoal(settings, d, today).minutes;
  const subjects = settings?.enabledSubjects ?? ["math", "language", "science", "social"];
  const games = gameTime(settings, d, now);
  const weak = weakest({ grade: profile.grade, framework: profile.framework, derived: d, subjects }, 10).length;
  const dailyDone = d.dailyDone.includes(today);
  const stories = storiesFor(settings, isOn("story-library"));
  const quests = dailyQuests(profile.id, today, band, { stories });
  const claimed = d.questsClaimed[today] ?? [];
  const monday = weekStart(now);
  const weekly = weeklyQuests(profile.id, monday, band, { stories });
  const weekStats = weekDays(monday).flatMap((k) => (d.days[k] ? [d.days[k]] : []));
  const weekClaimed = d.questsClaimed[monday] ?? [];
  const suggested = suggestions(profile.grade, profile.framework, d, subjects, allowed, 1)[0];
  const little = band === "little";
  const unitKeys = allUnitRefs(profile.grade, profile.framework).filter((r) => subjects.includes(r.course.subject) && allowed(r)).map((r) => r.key);
  const next = nextUp(d, unitKeys);
  const nextRef = next ? getUnitRef(next.key, profile.framework) : undefined;
  const nextInfo = next ? levelInfo(profile.framework, profile.grade, next.level) : undefined;
  const refresher = refresherUnit({ grade: profile.grade, framework: profile.framework, derived: d, subjects, allowed, now });
  const classwork = useClasswork();
  const allEvents = useStore((s) => s.events);
  // Little kids see one quest at a time, the first not yet done, and no weekly goals.
  const littleQuest = quests.find((q) => !claimed.includes(q.id));
  // ...and at most one suggestion card: "Almost there" first.
  const card = next && nextRef ? "next" : refresher ? "refresher" : suggested ? "suggested" : undefined;

  // Welcome-back and streak copy is always warm and forward-looking, never about something lost.
  const returning = d.totals.answers > 0 && d.streak.current === 0 && d.activeDays > 0 && !d.streak.activeToday;
  const hello = greeting(profile.name, new Date(now).getHours());
  // Little kids get one short line: most can't read yet, and it is read aloud.
  const raw = little
    ? minutes >= goal
      ? `You did it, ${profile.name}! 🎉`
      : `${hello} Let's play!`
    : !d.totals.answers
    ? `${hello} Tap the big button to start your first adventure!`
    : minutes >= goal
      ? `You hit today's goal! ${minutes} minutes of learning. Amazing!`
      : returning
        ? `*Yawn* You're back, ${profile.name}! You've practised ${d.activeDays} ${d.activeDays === 1 ? "day" : "days"} so far. Let's start a new streak! 🔥`
        : d.streak.current > 1 && !d.streak.activeToday
          ? d.streak.saved
            ? `A rest-day shield kept your ${d.streak.current}-day streak safe. 🛡️ Play today to keep it going!`
            : `Day ${d.streak.current + 1} of your streak is waiting for you! 🔥`
          : `${hello} ${goal - minutes} more minutes to reach today's goal.`;
  const message = say(raw);
  useBuddySays(message, little && Boolean(settings?.autoRead));
  const mood = minutes >= goal ? "cheer" : returning ? "sleepy" : "wave";

  const gameDesc = !games.enabled
    ? "Turned off"
    : games.availableSeconds > 0
      ? `${Math.ceil(games.availableSeconds / 60)} min ready!`
      : games.nextInSeconds > 0
        ? `Learn ${Math.ceil(games.nextInSeconds / 60)} more min`
        : "Done for today";

  const lessonsTile: Tile = { id: "practice", title: little ? "Lessons" : "Practice", desc: "Pick a subject and topic", icon: "📚", colour: "#4f8ef7", dark: "#2f6fd6", href: "#/practice" };
  const storiesTile: Tile = { id: "stories", title: "Stories", desc: "Read along at your level", icon: "📖", colour: "#ff7a59", dark: "#d4553a", href: "#/stories", flag: "story-library" };
  const arcadeTile: Tile = { id: "arcade", title: little ? "Games" : "Arcade", desc: gameDesc, icon: "🕹️", colour: "#7c4fe0", dark: "#5d34c4", href: "#/arcade", feature: "arcade", flag: "arcade" };
  // Kindergarten and Grade 1 get three big picture tiles. The collections sit behind My Treasures and
  // the Daily Challenge moves to the Lessons screen, so there is less to read and choose from here.
  const littleTiles: Tile[] = [
    lessonsTile,
    arcadeTile,
    { id: "treasures", title: "Treasures", desc: "", icon: "💎", colour: "#f0bd2a", dark: "#b88905", href: "#/treasures" },
  ];
  const tiles: Tile[] = little ? littleTiles : [
    {
      id: "daily",
      title: "Daily Challenge",
      desc: dailyDone ? "Done today! ✓" : "10 questions · new every day",
      icon: "☀️",
      colour: "#ffb020",
      dark: "#d68a00",
      href: "#/session?mode=daily&scope=mix",
      done: dailyDone,
      flag: "daily-challenge",
    },
    lessonsTile,
    ...(stories ? [storiesTile] : []),
    { id: "trail", title: "Trail Map", desc: "See how far you've come", icon: "🧭", colour: "#f08a4b", dark: "#c46a2c", href: "#/map" },
    { id: "speed", title: "Speed Run", desc: "How many in 60 seconds?", icon: "⚡", colour: "#e9559a", dark: "#c43a7c", href: "#/speed", feature: "speed", flag: "speed-run" },
    {
      id: "review",
      title: "Review",
      desc: weak ? `${weak} tricky spot${weak === 1 ? "" : "s"} to practise` : "Practise tricky spots",
      icon: "🔍",
      colour: "#25b47e",
      dark: "#16925f",
      href: "#/session?mode=review&scope=mix",
      feature: "review",
    },
    arcadeTile,
    { id: "stickers", title: "Sticker Book", desc: "Collect them all", icon: "📒", colour: "#e9559a", dark: "#c43a7c", href: "#/stickers", flag: "sticker-book" },
    { id: "trophies", title: "Trophies", desc: `${Object.keys(d.trophies).length} earned · ${d.trophyPoints} pts`, icon: "🏆", colour: "#f0bd2a", dark: "#b88905", href: "#/trophies" },
    { id: "room", title: "My Room", desc: "Decorate with your coins", icon: "🏠", colour: "#f08a4b", dark: "#c46a2c", href: "#/room", flag: "my-room" },
    { id: "shop", title: "Shop", desc: `🪙 ${d.coins} to spend`, icon: "🛍️", colour: "#06b6d4", dark: "#0891b2", href: "#/shop", flag: "shop" },
  ];
  const shown = tiles.filter((t) => !t.flag || isOn(t.flag));

  const open = (t: { href: string; feature?: Feature }) => {
    if (t.feature && !canUse(family, t.feature)) setLocked(true);
    else window.location.hash = t.href.slice(1);
  };

  return (
    <Page className="gap-5 short:gap-3">
      <Hud />

      <div className="flex items-center gap-3">
        {/* Smaller on the narrowest phones, hidden on phones held sideways, so the big button stays in view. */}
        <BuddyButton name={"your buddy"}>
          <Companion mood={mood} size={little ? 130 : 104} className="narrow:hidden short:hidden" />
          <Companion mood={mood} size={72} className="hidden narrow:block short:hidden" />
        </BuddyButton>
        <SpeechBubble className="flex-1">
          <div className="flex items-center gap-3">
            <p className={`flex-1 font-read font-bold leading-snug ${little ? "text-2xl sm:text-3xl narrow:text-xl" : "text-xl sm:text-2xl"} short:text-lg`}>{message}</p>
            <SayButton text={message} />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <ProgressBar value={minutes} max={goal} className="flex-1" label="Minutes learned today" />
            <GoalChip minutes={minutes} goal={goal} />
          </div>
        </SpeechBubble>
      </div>

      {/* The big adaptive button: no need to pick a topic. */}
      <button
        type="button"
        onClick={() => open({ href: "#/session?mode=adventure&scope=mix", feature: "adventure" })}
        className="btn min-h-28 animate-rise-in justify-between gap-4 px-6 text-left narrow:gap-3 narrow:px-4 short:min-h-20"
        style={{ "--btn-bg": "linear-gradient(135deg,#7b6fd6,#4f8ef7)", "--btn-fg": "#fff", "--btn-edge": "#3a4fb8", background: "linear-gradient(135deg,#8a6ff0,#4f8ef7)" } as CSSProperties}
      >
        <span className="flex items-center gap-4">
          <span className="animate-float text-6xl narrow:text-4xl short:text-5xl">🗺️</span>
          <span>
            <span className="block text-3xl font-bold sm:text-4xl narrow:text-2xl">{little ? "Let's Play!" : "Adventure"}</span>
            <span className="block text-base font-semibold sm:text-lg narrow:text-sm">
              {little ? "Fun questions from everything!" : "Endless questions picked just for you"}
            </span>
          </span>
        </span>
        <span className="text-4xl narrow:hidden">▶</span>
      </button>

      {!isStudent && <ParentNote />}

      <div className={`grid grid-cols-2 gap-3 sm:gap-4 ${little ? "sm:grid-cols-3" : "lg:grid-cols-3"}`}>
        {shown.map((t, i) => {
          const isLocked = t.feature && !canUse(family, t.feature);
          // An odd last little tile spans the row on phones, so the three sit as two plus one wide.
          const wide = little && i === shown.length - 1 && shown.length % 2 === 1;
          if (little) {
            return (
              <div key={t.id} className={`animate-rise-in ${wide ? "col-span-2 sm:col-span-1" : ""}`} style={{ animationDelay: `${80 + i * 60}ms` }}>
                <button
                  type="button"
                  onClick={() => open(t)}
                  className="btn relative h-full min-h-36 w-full flex-col items-center justify-center gap-2 p-4 text-center short:min-h-28"
                  style={{ "--btn-bg": t.colour, "--btn-edge": t.dark, "--btn-fg": onColour(t.colour) } as CSSProperties}
                >
                  {isLocked && <span className="absolute top-2 right-2 rounded-full bg-black/25 px-2 py-0.5 text-sm">🔒</span>}
                  <span className="text-6xl drop-shadow-sm narrow:text-5xl" aria-hidden="true">{t.icon}</span>
                  <span className="block text-3xl leading-tight font-bold narrow:text-2xl">{t.title}</span>
                </button>
              </div>
            );
          }
          return (
            <div key={t.id} className="animate-rise-in" style={{ animationDelay: `${80 + i * 60}ms` }}>
              <button
                type="button"
                onClick={() => open(t)}
                className="btn relative h-full min-h-32 w-full flex-col items-start justify-between gap-2 p-4 text-left"
                style={{ "--btn-bg": t.colour, "--btn-edge": t.dark, "--btn-fg": onColour(t.colour) } as CSSProperties}
              >
                <span className="flex w-full items-start justify-between">
                  <span className="text-5xl drop-shadow-sm">{t.icon}</span>
                  {isLocked && <span className="rounded-full bg-black/25 px-2 py-0.5 text-sm">🔒</span>}
                  {t.done && <span className="rounded-full bg-white/30 px-2 py-0.5 text-sm font-bold">✓</span>}
                </span>
                <span>
                  <span className="block text-2xl leading-tight font-bold">{t.title}</span>
                  <span className="block text-sm font-semibold">{say(t.desc)}</span>
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Little kids' home screen stays calm: a parent's focus only shapes their Adventure. */}
      {!little && <FocusCard />}

      {classwork.length > 0 && (
        <section className="card p-4 sm:p-5" aria-label="From your teacher">
          <h2 className="mb-3 flex items-center justify-between gap-2 text-xl font-bold sm:text-2xl">
            <span>🍎 From your teacher</span>
            <span className="text-sm font-semibold text-ink-soft">{classwork[0].className}</span>
          </h2>
          <ul className="flex flex-col gap-2.5">
            {classwork.map(({ ref, dueAt, goal: questions, since }) => {
              const meta = getSubjectMeta(ref.course.subject);
              // Homework with a question count is done once that many are answered (counted on this
              // device, so offline too); otherwise when the unit reaches Proficient.
              const answered = questions ? Math.min(questions, homeworkDone(eventsFor(allEvents, profile), ref.key, since ?? 0)) : 0;
              const done = questions ? answered >= questions : unitLevel(d.units[ref.key]) >= 2;
              return (
                <li key={ref.key}>
                  <a
                    href={`#/session?mode=practice&scope=${encodeURIComponent(ref.key)}`}
                    className={`flex min-h-14 items-center gap-3 rounded-2xl border-2 p-2.5 ${done ? "bg-good-soft" : "bg-paper"}`}
                    style={{ borderColor: meta.colour }}
                  >
                    <span className="text-3xl">{ref.unit.emoji}</span>
                    <span className="flex-1">
                      <span className="block font-read text-lg font-bold">{ref.unit.title}</span>
                      <span className="block text-sm font-semibold text-ink-soft">
                        {meta.title[band]}
                        {questions ? ` · ${done ? "Done! ✓" : `${answered} of ${questions} questions`}` : ""}
                        {dueAt && !done && dueAt > now ? ` · Try to finish by ${new Date(dueAt).toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" })}` : ""}
                      </span>
                      {questions && !done ? <ProgressBar value={answered} max={questions} height={8} className="mt-1" label={`${ref.unit.title}: ${answered} of ${questions} questions`} /> : null}
                    </span>
                    <LevelChip level={unitLevel(d.units[ref.key])} compact={little} />
                    <span className="text-xl">▶</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {!little && (
        <>
          <RewardCard />
          <TogetherCard />
          <ClassGoalCard />
        </>
      )}

      {little ? (
        <LittleQuest quest={littleQuest} progress={littleQuest ? Math.min(littleQuest.target, littleQuest.progress(dayStat)) : 0} />
      ) : (
        <>
        <section className="card p-4 sm:p-5">
          <h2 className="mb-3 flex items-center justify-between text-xl font-bold sm:text-2xl">
            <span>🎯 Today&apos;s quests</span>
            <span className="text-sm font-semibold text-ink-soft">New quests tomorrow</span>
          </h2>
          <ul className="flex flex-col gap-2.5">
            {quests.map((q) => {
              const got = claimed.includes(q.id);
              const value = Math.min(q.target, q.progress(dayStat));
              return (
                <li key={q.id} className={`flex items-center gap-3 rounded-2xl p-2.5 ${got ? "bg-good-soft" : "bg-paper"}`}>
                  <span className="text-3xl">{got ? "✅" : q.icon}</span>
                  <div className="flex-1">
                    <p className="font-read text-lg font-bold">{say(q.title)}</p>
                    <ProgressBar value={value} max={q.target} height={12} label={say(q.title)} />
                  </div>
                  <span className="rounded-full bg-[#fff4cc] px-3 py-1 text-sm font-bold text-[#7a5700]">🪙 {q.reward}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="card p-4 sm:p-5">
          <h2 className="mb-3 flex items-center justify-between text-xl font-bold sm:text-2xl">
            <span>🗓️ This week</span>
            <span className="text-sm font-semibold text-ink-soft">New goals on Monday</span>
          </h2>
          <ul className="flex flex-col gap-2.5">
            {weekly.map((q) => {
              const got = weekClaimed.includes(q.id);
              const value = Math.min(q.target, q.progress(weekStats));
              return (
                <li key={q.id} className={`flex items-center gap-3 rounded-2xl p-2.5 ${got ? "bg-good-soft" : "bg-paper"}`}>
                  <span className="text-3xl">{got ? "✅" : q.icon}</span>
                  <div className="flex-1">
                    <p className="font-read text-lg font-bold">{say(q.title)}</p>
                    <ProgressBar value={value} max={q.target} height={12} label={say(q.title)} />
                  </div>
                  <span className="rounded-full bg-[#fff4cc] px-3 py-1 text-sm font-bold text-[#7a5700]">🪙 {q.reward}</span>
                </li>
              );
            })}
          </ul>
        </section>
        </>
      )}

      {(!little || card === "refresher") && refresher && (
        <a
          href={`#/session?mode=practice&scope=${encodeURIComponent(refresher.key)}`}
          className="card flex items-center gap-3 p-4"
          style={{ borderColor: getSubjectMeta(refresher.course.subject).colour }}
          data-testid="refresher"
        >
          <Critter id={getSubjectMeta(refresher.course.subject).mascot} mood="wave" size={64} />
          <span className="flex-1">
            <span className="block text-sm font-semibold text-ink-soft">A quick refresher?</span>
            <span className="block text-xl font-bold">
              {getCritter(getSubjectMeta(refresher.course.subject).mascot).name} remembers you were great at {refresher.unit.title}.
            </span>
          </span>
          <span className="text-2xl">▶</span>
        </a>
      )}

      {(!little || card === "next") && next && nextRef && (
        <a
          href={`#/session?mode=practice&scope=${encodeURIComponent(next.key)}`}
          className="card flex items-center gap-3 p-4"
          style={{ borderColor: getSubjectMeta(nextRef.course.subject).colour }}
          data-testid="next-up"
        >
          <span className="text-4xl">{nextRef.unit.emoji}</span>
          <span className="flex-1">
            <span className="block text-sm font-semibold text-ink-soft">Almost there · {nextRef.unit.title}</span>
            <span className="block text-xl font-bold">
              {next.questions} right {next.questions === 1 ? "answer" : "answers"} to grow {nextInfo ? `into ${nextInfo.icon} ${nextInfo.kidLabel}` : "to the next level"}
            </span>
          </span>
          <span className="text-2xl">▶</span>
        </a>
      )}

      {(!little || card === "suggested") && suggested && suggested.key !== next?.key && (
        <a
          href={`#/session?mode=practice&scope=${encodeURIComponent(suggested.key)}`}
          className="card flex items-center gap-3 p-4"
          style={{ borderColor: getSubjectMeta(suggested.course.subject).colour }}
        >
          <span className="text-4xl">{suggested.unit.emoji}</span>
          <span className="flex-1">
            <span className="block text-sm font-semibold text-ink-soft">Try this lesson · {getSubjectMeta(suggested.course.subject).title[band]}</span>
            <span className="block text-xl font-bold">{getUnitRef(suggested.key, profile.framework)?.unit.title}</span>
          </span>
          <span className="text-2xl">▶</span>
        </a>
      )}

      <div className="flex justify-center pb-4">
        {isStudent ? (
          <button type="button" className="btn h-12 px-4 text-base text-ink-soft" onClick={() => void signOutStudent()}>
            👋 I&apos;m done · Sign out
          </button>
        ) : (
          <Link href="/parents/" className="btn h-12 px-4 text-base text-ink-soft">
            🔒 Grown-ups
          </Link>
        )}
      </div>

      {!isStudent && <InstallChip little={little} />}

      {isOn("secrets") && <MooseVisitor />}

      <MembershipLock open={locked} onClose={() => setLocked(false)} />
    </Page>
  );
}

export function goHome() {
  go("/");
}

/** Little kids' single quest: a big picture, a short title and dots (or a bar for long quests) instead of a list. */
function LittleQuest({ quest, progress }: { quest?: Quest; progress: number }) {
  const say = useChildSay();
  if (!quest) {
    return (
      <section className="card flex items-center gap-3 bg-good-soft p-4" aria-label="Today's quest">
        <span className="text-5xl">✅</span>
        <p className="font-read text-2xl font-bold">All quests done today!</p>
      </section>
    );
  }
  return (
    <section className="card flex items-center gap-4 p-4" aria-label="Today's quest">
      <span className="text-5xl" aria-hidden="true">
        {quest.icon}
      </span>
      <div className="flex flex-1 flex-col gap-2">
        <p className="font-read text-xl font-bold sm:text-2xl">{say(quest.title)}</p>
        {quest.target <= 10 ? (
          <span className="flex flex-wrap gap-1.5" role="progressbar" aria-label={say(quest.title)} aria-valuemin={0} aria-valuemax={quest.target} aria-valuenow={progress}>
            {Array.from({ length: quest.target }, (_, i) => (
              <span key={i} className={`h-5 w-5 rounded-full border-2 ${i < progress ? "border-good bg-good" : "border-ink-soft/50 bg-white"}`} />
            ))}
          </span>
        ) : (
          <ProgressBar value={progress} max={quest.target} height={16} label={say(quest.title)} />
        )}
      </div>
      <span className="rounded-full bg-[#fff4cc] px-3 py-1 text-lg font-bold text-[#7a5700]">🪙 {quest.reward}</span>
    </section>
  );
}

"use client";

import type { ReactNode } from "react";
import { getFramework } from "@/content/frameworks";
import { getSubjectMeta, SUBJECTS } from "@/content/subjects";
import type { SubjectId } from "@/content/types";
import { defaultChildSettings, type ChildSettings } from "@/lib/model";
import { calmOn, calmPatch, gamesChoice, gamesPatch, soundChoice, soundPatch, type GamesChoice, type SoundChoice } from "@/lib/settingChoices";
import { useStore } from "@/lib/store";
import { timerChoice, timerPatch, type TimerChoice } from "@/lib/timers";
import { CheckBox, ChildTabs, Choice, NoChildren, PageTitle, Panel, Slider, Switch, useChild } from "./common";

const TIMER_HELP: Record<TimerChoice, string> = {
  clock: "Shows how long the lesson has taken, and the countdown in Speed Run and Challenge.",
  countdown: "No clock in normal lessons. Speed Run and Challenge still show their countdown.",
  hidden: "No clocks, countdown numbers, ticks or streak counter. Speed Run and Challenge show a quiet bar instead and still end on time.",
};

const SOUND_HELP: Record<SoundChoice, string> = {
  full: "Clicks, chimes and celebrations, and a light buzz on taps on Android phones and tablets.",
  gentle: "Keeps gentle taps and feedback; no fanfares, chimes or countdown ticks.",
  off: "No sounds or vibration. Read-aloud still works.",
};

/** A tucked-away group of options most parents never need. */
function More({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="group rounded-xl border-2 border-line">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 font-semibold">
        {summary}
        <span aria-hidden="true" className="transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>
      <div className="flex flex-col gap-4 px-4 pb-4">{children}</div>
    </details>
  );
}

export function SettingsPage({ childId }: { childId?: string }) {
  const child = useChild(childId);
  const stored = useStore((s) => (child ? s.settings[child.id] : undefined));
  const update = useStore((s) => s.updateSettings);
  if (!child) return <NoChildren />;
  const s: ChildSettings = stored ?? defaultChildSettings(child.id, false, child.grade);
  const set = (patch: Partial<ChildSettings>) => update(child.id, patch);
  const games: GamesChoice = gamesChoice(s);
  const toggleSubject = (id: SubjectId) => {
    const next = s.enabledSubjects.includes(id) ? s.enabledSubjects.filter((x) => x !== id) : [...s.enabledSubjects, id];
    if (next.length) set({ enabledSubjects: next });
  };

  return (
    <>
      <PageTitle title="Settings" sub="Changes save automatically and sync to your other devices. The read-aloud voice and parent PIN are under Account." />
      <ChildTabs base="settings" current={child} />
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title={`⏱️ ${child.name}'s daily goal`}>
          <Slider label="Daily learning goal" value={s.dailyGoalMinutes} min={5} max={60} step={5} unit="min" onChange={(v) => set({ dailyGoalMinutes: v })} help="Shown as a progress bar on the home screen." />
        </Panel>

        <Panel title="📚 Subjects">
          <p className="mb-3 text-sm text-ink-soft">Choose what shows up in lessons, Adventure and the Daily Challenge.</p>
          <div className="grid grid-cols-2 gap-2">
            {SUBJECTS.filter((sub) => getFramework(child.framework).subjects.includes(sub.id)).map((sub) => (
              <CheckBox key={sub.id} checked={s.enabledSubjects.includes(sub.id)} onChange={() => toggleSubject(sub.id)}>
                {getSubjectMeta(sub.id).emoji} {sub.title.big}
              </CheckBox>
            ))}
          </div>
        </Panel>

        <Panel title="🔊 Reading and sound">
          <div className="flex flex-col gap-4">
            <Switch label="Read questions out loud" value={s.autoRead} onChange={(v) => set({ autoRead: v })} help="On by default for Kindergarten and Grade 1. Kids can always tap 🔊 to hear a question." />
            <Choice
              label="Sounds"
              value={soundChoice(s)}
              options={[
                { value: "full", label: "Full" },
                { value: "gentle", label: "Gentle" },
                { value: "off", label: "Off" },
              ]}
              onChange={(v) => set(soundPatch(v))}
              help={SOUND_HELP[soundChoice(s)]}
            />
            <Switch label="Roomy text" value={Boolean(s.roomyText)} onChange={(v) => set({ roomyText: v })} help="More space between letters, words and lines. Some children find this easier to read." />
            <Switch label="High contrast" value={Boolean(s.highContrast)} onChange={(v) => set({ highContrast: v })} help="Darker text and firmer outlines, and a heavier ring around the button being tabbed to." />
          </div>
        </Panel>

        <Panel title="🌤️ Calm and focus">
          <div className="flex flex-col gap-4">
            <Switch
              label="Calm mode"
              value={calmOn(s)}
              onChange={(v) => set(calmPatch(v))}
              help="For children who find lots of motion, noise or time pressure hard, including many children with ADHD: no confetti or shakes, gentle sounds, no timers, trophy pop-ups after the lesson and five questions at a time. Scoring is the same."
            />
            <Choice
              label="Timers in lessons"
              value={timerChoice(s)}
              options={[
                { value: "clock", label: "Show all" },
                { value: "countdown", label: "Countdowns only" },
                { value: "hidden", label: "Hide all" },
              ]}
              onChange={(v) => set(timerPatch(v))}
              help={TIMER_HELP[timerChoice(s)]}
            />
            <More summary="Customize calm mode">
              <Switch label="Calm motion" value={Boolean(s.calmMotion)} onChange={(v) => set({ calmMotion: v })} help="No confetti, bursts, floating text, screen shakes or vibration." />
              <Switch label="Hold trophy pop-ups until after the lesson" value={Boolean(s.quietToasts)} onChange={(v) => set({ quietToasts: v })} help="Nothing appears on screen while your child is working on a question." />
              <Switch label="Shorter sessions" value={Boolean(s.shortSessions)} onChange={(v) => set({ shortSessions: v })} help="Five questions at a time in Adventure (with a break screen) and Review." />
              <p className="text-sm text-ink-soft">Gentle sounds are under Sounds, and timers just above.</p>
            </More>
          </div>
        </Panel>

        <Panel title="🎮 Arcade games">
          <div className="flex flex-col gap-4">
            <Choice
              label="Games"
              value={games}
              options={[
                { value: "earn", label: "Earn game time" },
                { value: "free", label: "Free play" },
                { value: "off", label: "Off" },
              ]}
              onChange={(v) => set(gamesPatch(v))}
              help="Educational games for math, reading, science and memory."
            />
            {games !== "off" && (
              <>
                <Slider label="Most game time per day" value={s.maxGameMinutesPerDay} min={5} max={120} step={5} unit="min" onChange={(v) => set({ maxGameMinutesPerDay: v })} />
                <p className="rounded-xl bg-[#eef4ff] p-3 text-sm">
                  {games === "free" ? `Games are open any time, up to ${s.maxGameMinutesPerDay} minutes a day.` : `Every ${s.learnMinutesPerReward} minutes of learning unlocks ${s.rewardGameMinutes} minutes of games, up to ${s.maxGameMinutesPerDay} minutes a day.`}
                </p>
              </>
            )}
          </div>
        </Panel>

        <Panel className="self-start">
          <More summary="🛠️ Advanced options">
            <Switch label="Let them pick a lighter or stretch goal" value={!s.lockGoal} onChange={(v) => set({ lockGoal: !v })} help="Each day your child can choose Easy, Regular (your goal) or Stretch, which is a little longer. Turn off to always use your goal." />
            <Switch label="Hints count as first try" value={Boolean(s.freeHints)} onChange={(v) => set({ freeHints: v })} help="Children can open a hint before answering. Normally that counts like a retry. Turn this on if asking for help should never lower their accuracy." />
            {games === "earn" && (
              <>
                <Slider label="Learning needed for a game break" value={s.learnMinutesPerReward} min={5} max={60} step={5} unit="min" onChange={(v) => set({ learnMinutesPerReward: v })} />
                <Slider label="Game time earned" value={s.rewardGameMinutes} min={1} max={30} unit="min" onChange={(v) => set({ rewardGameMinutes: v })} />
              </>
            )}
          </More>
        </Panel>
      </div>
    </>
  );
}

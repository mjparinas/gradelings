"use client";

import type { ReactNode } from "react";
import { getFramework } from "@/content/frameworks";
import { getSubjectMeta, SUBJECTS, subjectsOffered } from "@/content/subjects";
import type { SubjectId } from "@/content/types";
import { defaultChildSettings, voiceOn, type ChildSettings, type ReadingTint } from "@/lib/model";
import { calmOn, calmPatch, easierOn, easierPatch, gamesChoice, gamesPatch, soundPatch } from "@/lib/settingChoices";
import { useIsOn } from "@/lib/remoteFlags";
import { useStore } from "@/lib/store";
import { timerChoice, timerPatch, type TimerChoice } from "@/lib/timers";
import { VoicePractice } from "./VoicePractice";
import { CheckBox, ChildTabs, Choice, NoChildren, PageTitle, Panel, Switch, useChild } from "./common";

const TIMER_HELP: Record<TimerChoice, string> = {
  clock: "Shows how long the lesson has taken, and the countdown in Speed Run and Challenge.",
  countdown: "No clock in normal lessons. Speed Run and Challenge still show their countdown.",
  hidden: "No clocks, countdown numbers, ticks or streak counter. Speed Run and Challenge show a quiet bar instead and still end on time.",
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
  const isOn = useIsOn();
  if (!child) return <NoChildren />;
  const s: ChildSettings = stored ?? defaultChildSettings(child.id, false, child.grade);
  const set = (patch: Partial<ChildSettings>) => update(child.id, patch);
  const games = gamesChoice(s);
  const toggleSubject = (id: SubjectId) => {
    const next = s.enabledSubjects.includes(id) ? s.enabledSubjects.filter((x) => x !== id) : [...s.enabledSubjects, id];
    if (next.length) set({ enabledSubjects: next });
  };

  return (
    <>
      <PageTitle title="Settings" sub="Changes save automatically and sync to your other devices. The read-aloud voice and parent PIN are under Account." />
      <ChildTabs base="settings" current={child} />
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="📚 Subjects">
          <p className="mb-3 text-sm text-ink-soft">Choose what shows up in lessons, Adventure and the Daily Challenge.</p>
          <div className="grid grid-cols-2 gap-2">
            {SUBJECTS.filter((sub) => subjectsOffered(getFramework(child.framework), child.grade, isOn).includes(sub.id)).map((sub) => (
              <CheckBox key={sub.id} checked={s.enabledSubjects.includes(sub.id)} onChange={() => toggleSubject(sub.id)}>
                {getSubjectMeta(sub.id).emoji} {sub.title.big}
              </CheckBox>
            ))}
          </div>
        </Panel>

        <Panel title="🔊 Reading and sound">
          <div className="flex flex-col gap-4">
            <Switch label="Read questions out loud" value={s.autoRead} onChange={(v) => set({ autoRead: v })} help="On by default from Pre-K to Grade 1. Kids can always tap 🔊 to hear a question." />
            <Switch label="Sounds" value={s.sound} onChange={(v) => set(v ? { sound: true, haptics: true } : soundPatch("off"))} help="Clicks, chimes and a light buzz on taps. Read-aloud still works when this is off." />
            <Switch label="Easier reading" value={easierOn(s)} onChange={(v) => set(easierPatch(v))} help="More space between letters, words and lines, on a soft cream page. Some children find this easier to read." />
            <More summary="More reading options">
              <Switch label="Roomy text" value={Boolean(s.roomyText)} onChange={(v) => set({ roomyText: v })} help="More space between letters, words and lines." />
              <Switch label="High contrast" value={Boolean(s.highContrast)} onChange={(v) => set({ highContrast: v })} help="Darker text and firmer outlines, and a heavier ring around the button being tabbed to." />
              <Switch label="Dyslexia-friendly font" value={Boolean(s.dyslexiaFont)} onChange={(v) => set({ dyslexiaFont: v })} help="Shows everything your child reads in OpenDyslexic, a typeface some readers prefer. It loads the first time it is used, so it may take a moment on a slow connection." />
              <Choice
                label="Page colour"
                value={(s.readingTint ?? "none") as ReadingTint | "none"}
                options={[
                  { value: "none", label: "Usual" },
                  { value: "cream", label: "Cream" },
                  { value: "mint", label: "Mint" },
                  { value: "blue", label: "Blue" },
                  { value: "rose", label: "Rose" },
                ]}
                onChange={(v) => set({ readingTint: v === "none" ? undefined : v })}
                help="A soft colour behind the cards."
              />
              <Choice
                label="Gentle sounds only"
                value={s.quietSounds ? "on" : "off"}
                options={[
                  { value: "off", label: "Off" },
                  { value: "on", label: "On" },
                ]}
                onChange={(v) => set({ quietSounds: v === "on" })}
                help="No fanfares, chimes or countdown ticks."
              />
            </More>
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
            <More summary="Customize calm mode">
              <Switch label="Calm motion" value={Boolean(s.calmMotion)} onChange={(v) => set({ calmMotion: v })} help="No confetti, bursts, floating text, screen shakes or vibration." />
              <Switch label="Hold trophy pop-ups until after the lesson" value={Boolean(s.quietToasts)} onChange={(v) => set({ quietToasts: v })} help="Nothing appears on screen while your child is working on a question." />
              <Switch label="Shorter sessions" value={Boolean(s.shortSessions)} onChange={(v) => set({ shortSessions: v })} help="Five questions at a time in Adventure (with a break screen) and Review." />
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
            </More>
          </div>
        </Panel>

        <Panel title="🎮 Arcade games">
          <div className="flex flex-col gap-4">
            <Switch
              label="Arcade games"
              value={games !== "off"}
              onChange={(v) => set(gamesPatch(v ? (s.freePlay ? "free" : "earn") : "off"))}
              help={games === "free" ? `Open any time, up to ${s.maxGameMinutesPerDay} minutes a day.` : `Educational games for math, reading, science and memory, earned by learning: ${s.learnMinutesPerReward} minutes of learning unlocks ${s.rewardGameMinutes} minutes of games, up to ${s.maxGameMinutesPerDay} minutes a day.`}
            />
          </div>
        </Panel>

        {isOn("voice-practice") && (
          <Panel className="self-start">
            <VoicePractice value={voiceOn(s, child.grade)} onChange={(v) => set({ voice: v })} />
          </Panel>
        )}
      </div>
    </>
  );
}

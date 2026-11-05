"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { PROBLEM_COUNT, storySet } from "@/content/storyProblems";
import { onColour } from "@/lib/contrast";
import { choiceIndexForKey, shortcutBlocked } from "@/lib/keys";
import { celebrate } from "@/lib/juice";
import { go } from "@/lib/router";
import { sounds } from "@/lib/sound";
import { useActiveProfile } from "@/lib/store";
import { useBand } from "../band";
import { Page, ProgressBar } from "../ui";
import { Companion } from "./Companion";
import { SayButton } from "./BuddySays";
import { BackButton } from "./Practice";
import { TreasureBack } from "./Treasures";

// Story problems: five short word problems with a fresh set each time. Nothing is logged, scored or
// synced, and no XP, coins or time are earned, so they are never mistaken for practice.

const TINT = { colour: "#4f8ef7", dark: "#2f6fd6" };

export function StoryProblems() {
  const profile = useActiveProfile()!;
  const band = useBand();
  const little = band === "little";
  const [round, setRound] = useState(0);
  const day = new Date().toISOString().slice(0, 10);
  const problems = useMemo(() => storySet(band, `${profile.id}:${day}:${round}`), [band, profile.id, day, round]);
  const [index, setIndex] = useState(0);
  const [misses, setMisses] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);
  const [rightFirst, setRightFirst] = useState(0);

  const problem = problems[index];
  const finished = index >= problems.length;
  const revealed = misses.length >= 2;
  const back = little ? <TreasureBack /> : <BackButton />;

  const pick = (i: number) => {
    if (!problem || solved || revealed || misses.includes(i)) return;
    if (i === problem.answer) {
      sounds.correct();
      if (misses.length === 0) setRightFirst((n) => n + 1);
      setSolved(true);
    } else {
      sounds.tryAgain();
      setMisses((m) => [...m, i]);
    }
  };

  useEffect(() => {
    if (!problem || solved || revealed) return;
    const onKey = (e: KeyboardEvent) => {
      if (shortcutBlocked(e)) return;
      const i = choiceIndexForKey(e.key, problem.choices.length);
      if (i !== null) pick(i);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem, solved, misses]);

  useEffect(() => {
    if (finished) celebrate(["🧮", "✨", "🌟"]);
  }, [finished]);

  const next = () => {
    setIndex((n) => n + 1);
    setMisses([]);
    setSolved(false);
  };
  const again = () => {
    setRound((n) => n + 1);
    setIndex(0);
    setMisses([]);
    setSolved(false);
    setRightFirst(0);
  };
  const tint = { "--btn-bg": TINT.colour, "--btn-edge": TINT.dark, "--btn-fg": onColour(TINT.colour) } as CSSProperties;

  if (finished) {
    return (
      <Page className="items-center gap-5 text-center">
        <div className="flex w-full items-center gap-3">
          {back}
          <h1 className="text-3xl font-bold">🧮 Story problems</h1>
        </div>
        <Companion mood="cheer" size={little ? 150 : 120} />
        <p className="font-read text-2xl font-bold">All done. Good thinking!</p>
        <p className="font-read text-lg text-ink-soft">
          {rightFirst === PROBLEM_COUNT ? "You solved every one on the first try." : `You solved ${rightFirst} on the first try.`} Story problems don&apos;t count toward your practice. They&apos;re just for thinking.
        </p>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <button type="button" className="btn btn-soft min-h-14 px-6 text-xl" onClick={again}>
            More story problems
          </button>
          <button type="button" className="btn min-h-14 px-6 text-xl" style={tint} onClick={() => go("/")}>
            Back to learning
          </button>
        </div>
      </Page>
    );
  }

  return (
    <Page className="gap-5">
      <header className="flex items-center gap-3">
        {back}
        <h1 className="flex-1 text-2xl font-bold sm:text-3xl">🧮 Story problems</h1>
        <span className="text-lg font-bold text-ink-soft" aria-hidden>
          {index + 1} / {problems.length}
        </span>
      </header>
      <ProgressBar value={index} max={problems.length} label="Problems done" />

      <section className="card flex flex-col gap-4 p-5" aria-live="polite">
        <div className="flex items-start gap-3">
          <p className={`flex-1 font-read font-bold leading-snug ${little ? "text-3xl" : "text-2xl"}`}>{problem.prompt}</p>
          <SayButton text={problem.prompt} />
        </div>
        {problem.scene && (
          <p className="rounded-2xl bg-white/60 p-3 text-center text-3xl leading-relaxed break-words" aria-hidden>
            {problem.scene}
          </p>
        )}
        <div className="grid grid-cols-3 gap-3">
          {problem.choices.map((c, i) => {
            const show = (solved || revealed) && i === problem.answer;
            const missed = misses.includes(i);
            return (
              <button
                key={`${index}-${i}`}
                type="button"
                data-state={show ? "right" : missed ? "wrong" : undefined}
                aria-keyshortcuts={String(i + 1)}
                disabled={solved || revealed || missed}
                onClick={() => pick(i)}
                className={`btn min-h-16 px-4 font-read text-3xl ${show ? "ring-4 ring-green-500" : ""} ${missed ? "opacity-50" : ""}`}
              >
                {c}
              </button>
            );
          })}
        </div>
        {misses.length === 1 && !solved && <p className="font-read text-lg font-semibold">Not quite. Read the story again!</p>}
        {(solved || revealed) && (
          <p className="font-read text-lg font-semibold">
            {solved && misses.length === 0 ? "Yes! " : solved ? "You got it! " : ""}
            {problem.why}
          </p>
        )}
      </section>

      {(solved || revealed) && (
        <button type="button" className="btn min-h-14 px-6 text-xl" style={tint} onClick={next}>
          {index + 1 === problems.length ? "Finish" : "Next"}
        </button>
      )}
    </Page>
  );
}

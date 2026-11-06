"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { onColour } from "@/lib/contrast";
import { breakSet, BREAK_LENGTH } from "@/content/breaks";
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

// A brain break: five light puzzles for a rest between lessons. Nothing is logged, scored or synced, and
// no XP, coins or time are earned, so a break is never mistaken for practice and nobody is pushed to do one.

const TINT = { colour: "#7c4fe0", dark: "#5d34c4" };

export function BrainBreak() {
  const profile = useActiveProfile()!;
  const band = useBand();
  const little = band === "little";
  const [round, setRound] = useState(0);
  // A new set for each child, day and "another break", so it is never the same five twice in a row.
  const day = new Date().toISOString().slice(0, 10);
  const puzzles = useMemo(() => breakSet(band, `${profile.id}:${day}:${round}`), [band, profile.id, day, round]);
  const [index, setIndex] = useState(0);
  const [misses, setMisses] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);
  const [rightFirst, setRightFirst] = useState(0);

  const puzzle = puzzles[index];
  const finished = index >= puzzles.length;
  const revealed = misses.length >= 2;

  const pick = (i: number) => {
    if (!puzzle || solved || misses.includes(i)) return;
    if (i === puzzle.answer) {
      sounds.correct();
      if (misses.length === 0) setRightFirst((n) => n + 1);
      setSolved(true);
    } else {
      sounds.tryAgain();
      setMisses((m) => [...m, i]);
    }
  };

  // Number keys pick a choice, like a question.
  useEffect(() => {
    if (!puzzle || solved) return;
    const onKey = (e: KeyboardEvent) => {
      if (shortcutBlocked(e)) return;
      const i = choiceIndexForKey(e.key, puzzle.choices.length);
      if (i !== null) pick(i);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzle, solved, misses]);

  useEffect(() => {
    if (finished) celebrate(["🧠", "✨", "🌟"]);
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

  if (finished) {
    return (
      <Page className="items-center gap-5 text-center">
        <div className="flex w-full items-center gap-3">
          <BackButton />
          <h1 className="text-3xl font-bold">🧠 Brain break</h1>
        </div>
        <Companion mood="cheer" size={little ? 150 : 120} />
        <p className="font-read text-2xl font-bold">All done. Nice stretch!</p>
        <p className="font-read text-lg text-ink-soft">
          {rightFirst === BREAK_LENGTH ? "You got every one on the first try." : `You got ${rightFirst} on the first try.`} A break doesn&apos;t count toward your practice. It&apos;s just for fun.
        </p>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <button type="button" className="btn btn-soft min-h-14 px-6 text-xl" onClick={again}>
            Another break
          </button>
          <button
            type="button"
            className="btn min-h-14 px-6 text-xl"
            style={{ "--btn-bg": TINT.colour, "--btn-edge": TINT.dark, "--btn-fg": onColour(TINT.colour) } as CSSProperties}
            onClick={() => go("/")}
          >
            Back to learning
          </button>
        </div>
      </Page>
    );
  }

  return (
    <Page className="gap-5">
      <header className="flex items-center gap-3">
        <BackButton />
        <h1 className="flex-1 text-2xl font-bold sm:text-3xl">🧠 Brain break</h1>
        <span className="text-lg font-bold text-ink-soft" aria-hidden>
          {index + 1} / {puzzles.length}
        </span>
      </header>
      <ProgressBar value={index} max={puzzles.length} label="Puzzles done" />

      <section className="card flex flex-col gap-4 p-5" aria-live="polite">
        <div className="flex items-start gap-3">
          <p className={`flex-1 font-read font-bold leading-snug ${little ? "text-3xl" : "text-2xl"}`}>{puzzle.prompt}</p>
          <SayButton text={puzzle.prompt} />
        </div>
        {puzzle.sequence.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-white/60 p-3" role="img" aria-label={`${puzzle.sequence.join(", ").replace("?", "what comes next")}`}>
            {puzzle.sequence.map((s, i) => (
              <span
                key={i}
                aria-hidden
                className={`flex h-14 min-w-14 items-center justify-center rounded-xl text-3xl font-bold ${s === "?" ? "border-2 border-dashed border-current" : ""}`}
              >
                {s}
              </span>
            ))}
          </div>
        )}
        <div className={`grid gap-3 ${puzzle.pictures ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
          {puzzle.choices.map((c, i) => {
            const right = i === puzzle.answer;
            const missed = misses.includes(i);
            const show = (solved || revealed) && right;
            return (
              <button
                key={`${index}-${i}`}
                type="button"
                data-state={show ? "right" : missed ? "wrong" : undefined}
                aria-keyshortcuts={String(i + 1)}
                disabled={solved || revealed || missed}
                onClick={() => pick(i)}
                className={`btn min-h-16 px-4 ${puzzle.pictures ? "text-5xl" : "font-read text-xl"} ${show ? "ring-4 ring-green-500" : ""} ${missed ? "opacity-50" : ""}`}
              >
                {c}
              </button>
            );
          })}
        </div>
        {misses.length === 1 && !solved && <p className="font-read text-lg font-semibold">Not quite. Have another look!</p>}
        {(solved || revealed) && (
          <p className="font-read text-lg font-semibold">
            {solved && misses.length === 0 ? "Yes! " : solved ? "You got it! " : ""}
            {puzzle.why}
          </p>
        )}
      </section>

      {(solved || revealed) && (
        <button
          type="button"
          className="btn min-h-14 px-6 text-xl"
          style={{ "--btn-bg": TINT.colour, "--btn-edge": TINT.dark, "--btn-fg": onColour(TINT.colour) } as CSSProperties}
          onClick={next}
        >
          {index + 1 === puzzles.length ? "Finish" : "Next"}
        </button>
      )}
    </Page>
  );
}

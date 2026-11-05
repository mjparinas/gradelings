"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { findRhyme, RHYMES, rhymeQuiz, type Rhyme } from "@/content/rhymes";
import { onColour } from "@/lib/contrast";
import { choiceIndexForKey, shortcutBlocked } from "@/lib/keys";
import { celebrate } from "@/lib/juice";
import { go } from "@/lib/router";
import { sounds } from "@/lib/sound";
import { speakSegments, stopSpeaking } from "@/lib/speech";
import { useActiveProfile, useChildSettings } from "@/lib/store";
import { useBand } from "../band";
import { Page } from "../ui";
import { BackButton } from "./Practice";
import { TreasureBack } from "./Treasures";

// Rhymes: short original rhymes read along line by line, then two "which word rhymes?" questions. For
// the youngest readers. Nothing is logged, scored or synced, so a rhyme is never mistaken for practice.

const TINT = { colour: "#e9559a", dark: "#c43a7c" };

/** The list of rhymes. */
export function RhymeLibrary() {
  const little = useBand() === "little";
  return (
    <Page className="gap-5">
      <header className="flex items-center gap-3">
        {little ? <TreasureBack /> : <BackButton />}
        <h1 className="text-3xl font-bold sm:text-4xl">🎵 Rhymes</h1>
      </header>
      <p className="font-read text-lg text-ink-soft">Tap a rhyme to read along. Listen for the words that sound alike!</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {RHYMES.map((r, i) => (
          <a
            key={r.id}
            href={`#/rhymes/${r.id}`}
            className="btn animate-rise-in min-h-36 w-full flex-col items-center justify-center gap-2 p-4 text-center"
            style={{ "--btn-bg": TINT.colour, "--btn-edge": TINT.dark, "--btn-fg": onColour(TINT.colour), animationDelay: `${i * 40}ms` } as CSSProperties}
          >
            <span className="text-5xl drop-shadow-sm">{r.emoji}</span>
            <span className="block text-xl leading-tight font-bold">{r.title}</span>
          </a>
        ))}
      </div>
    </Page>
  );
}

/** One rhyme: read along, then the rhyming questions. */
export function RhymeReader({ id }: { id: string }) {
  const rhyme = findRhyme(id);
  if (!rhyme) {
    go("/rhymes");
    return null;
  }
  return <Reader rhyme={rhyme} />;
}

function Reader({ rhyme }: { rhyme: Rhyme }) {
  const profile = useActiveProfile()!;
  const settings = useChildSettings();
  const little = useBand() === "little";
  const [lit, setLit] = useState(-1);
  const [quizzing, setQuizzing] = useState(false);
  const [round, setRound] = useState(0);
  const day = new Date().toISOString().slice(0, 10);
  const quiz = useMemo(() => rhymeQuiz(rhyme, `${profile.id}:${day}:${round}`), [rhyme, profile.id, day, round]);
  const [qIndex, setQIndex] = useState(0);
  const [misses, setMisses] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);
  const [rightFirst, setRightFirst] = useState(0);
  const done = quizzing && qIndex >= quiz.length;
  const q = quizzing ? quiz[qIndex] : undefined;
  const revealed = misses.length >= 2;

  const read = (from = 0, only = false) => {
    const list = only ? [rhyme.lines[from]] : rhyme.lines.slice(from);
    speakSegments(
      list.map((text) => ({ text, lang: "en" as const, pause: 200 })),
      { onStart: (i) => setLit(from + i), onDone: () => setLit(-1) },
    );
  };

  // A rhyme is read to a child who has read-aloud on, as it opens.
  useEffect(() => {
    if (settings?.autoRead) read();
    return stopSpeaking;
    // Only when the rhyme opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rhyme.id]);

  const pick = (i: number) => {
    if (!q || solved || revealed || misses.includes(i)) return;
    if (i === q.answer) {
      sounds.correct();
      if (misses.length === 0) setRightFirst((n) => n + 1);
      setSolved(true);
    } else {
      sounds.tryAgain();
      setMisses((m) => [...m, i]);
    }
  };

  useEffect(() => {
    if (!q || solved || revealed) return;
    const onKey = (e: KeyboardEvent) => {
      if (shortcutBlocked(e)) return;
      const i = choiceIndexForKey(e.key, q.choices.length);
      if (i !== null) pick(i);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, solved, misses]);

  useEffect(() => {
    if (done) celebrate(["🎵", "✨", "🌟"]);
  }, [done]);

  const nextQuestion = () => {
    setQIndex((n) => n + 1);
    setMisses([]);
    setSolved(false);
  };
  const startQuiz = () => {
    stopSpeaking();
    setLit(-1);
    setQuizzing(true);
  };
  const readAgain = () => {
    setQuizzing(false);
    setQIndex(0);
    setMisses([]);
    setSolved(false);
    setRightFirst(0);
    setRound((n) => n + 1);
  };
  const nextRhyme = RHYMES[(RHYMES.findIndex((r) => r.id === rhyme.id) + 1) % RHYMES.length];
  const tint = { "--btn-bg": TINT.colour, "--btn-edge": TINT.dark, "--btn-fg": onColour(TINT.colour) } as CSSProperties;

  return (
    <Page className="gap-5">
      <header className="flex items-center gap-3">
        <BackButton to="/rhymes" />
        <h1 className="flex-1 text-2xl font-bold sm:text-3xl">
          {rhyme.emoji} {rhyme.title}
        </h1>
      </header>

      {!quizzing && (
        <>
          <section className="card flex flex-col gap-2 p-5" aria-label={rhyme.title}>
            {rhyme.lines.map((line, i) => (
              <button
                key={i}
                type="button"
                onClick={() => read(i, true)}
                className={`rounded-xl px-3 py-2 text-left font-read font-bold ${little ? "text-2xl" : "text-xl"} ${lit === i ? "bg-yellow-200 text-slate-900" : ""} ${i % 2 === 1 ? "mb-3" : ""}`}
                aria-label={`Hear: ${line}`}
              >
                {line}
              </button>
            ))}
          </section>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" className="btn btn-soft min-h-14 px-6 text-xl" onClick={() => read()}>
              🔊 Read to me
            </button>
            <button type="button" className="btn min-h-14 px-6 text-xl" style={tint} onClick={startQuiz}>
              Which words rhyme?
            </button>
          </div>
        </>
      )}

      {q && (
        <section className="card flex flex-col gap-4 p-5" aria-live="polite">
          <p className={`font-read font-bold leading-snug ${little ? "text-3xl" : "text-2xl"}`}>{q.prompt}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {q.choices.map((c, i) => {
              const show = (solved || revealed) && i === q.answer;
              const missed = misses.includes(i);
              return (
                <button
                  key={`${qIndex}-${i}`}
                  type="button"
                  data-state={show ? "right" : missed ? "wrong" : undefined}
                  aria-keyshortcuts={String(i + 1)}
                  disabled={solved || revealed || missed}
                  onClick={() => pick(i)}
                  className={`btn min-h-16 px-4 font-read text-2xl ${show ? "ring-4 ring-green-500" : ""} ${missed ? "opacity-50" : ""}`}
                >
                  {c}
                </button>
              );
            })}
          </div>
          {misses.length === 1 && !solved && <p className="font-read text-lg font-semibold">Not quite. Listen again for the ending sound!</p>}
          {(solved || revealed) && <p className="font-read text-lg font-semibold">{solved ? (misses.length === 0 ? "Yes! " : "You got it! ") : ""}{q.why}</p>}
          {(solved || revealed) && (
            <button type="button" className="btn min-h-14 px-6 text-xl" style={tint} onClick={nextQuestion}>
              {qIndex + 1 === quiz.length ? "Finish" : "Next"}
            </button>
          )}
        </section>
      )}

      {done && (
        <section className="card flex flex-col items-center gap-4 p-6 text-center">
          <p className="font-read text-2xl font-bold">Great rhyming!</p>
          <p className="font-read text-lg text-ink-soft">
            {rightFirst === quiz.length ? "You found both rhymes on the first try." : `You found ${rightFirst} on the first try.`} Rhymes don&apos;t count toward your practice. They&apos;re just for fun.
          </p>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <button type="button" className="btn btn-soft min-h-14 px-6 text-xl" onClick={readAgain}>
              Read it again
            </button>
            <button type="button" className="btn min-h-14 px-6 text-xl" style={tint} onClick={() => go(`/rhymes/${nextRhyme.id}`)}>
              Next rhyme ▶
            </button>
          </div>
        </section>
      )}
    </Page>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { speak } from "@/lib/speech";
import { bridgeQuestion, type BridgeQuestion } from "./bridge";
import { Hearts, questionSeconds, TimerBar, useCountdown, useNumberKeys, useRun } from "./kit";
import type { GameProps } from "./types";

// Word Bridge: pick the right French or Spanish word before the timer runs out, and a plank goes down.
// Eight planks cross the river; then a new river.

const PLANKS = 8;

export function WordBridge({ grade, band, subjects, onScore, onLevel, onOver }: GameProps) {
  const run = useRun({ onScore, onLevel, onOver }, 8);
  const [q, setQ] = useState<BridgeQuestion>(() => bridgeQuestion(grade, subjects));
  const [n, setN] = useState(0);
  const [planks, setPlanks] = useState(0);
  const [picked, setPicked] = useState<{ value: string; ok: boolean } | null>(null);
  const [note, setNote] = useState("");
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const total = questionSeconds(band, run.level, 14, 6);

  useEffect(() => {
    speak(q.speak, undefined, q.speakLang);
  }, [q]);

  const next = () => {
    setPicked(null);
    setQ(bridgeQuestion(grade, subjects));
    setN((x) => x + 1);
  };

  const left = useCountdown(total, n, () => {
    setNote(`Splash! It was “${q.answer}”.`);
    setPicked({ value: q.answer, ok: true });
    run.miss();
    setTimeout(next, 1500);
  }, !!picked || run.over);

  const choose = (value: string) => {
    if (picked || run.over) return;
    if (value === q.answer) {
      setPicked({ value, ok: true });
      setNote("");
      speak(q.answer, undefined, q.answerLang ?? "fr");
      run.win(10 + Math.round(left / 2), refs.current[value]);
      if (planks + 1 >= PLANKS) {
        run.bonus(30);
        setNote("Across the river! +30 🎉");
        setTimeout(() => setPlanks(0), 900);
      }
      setPlanks((p) => Math.min(PLANKS, p + 1));
      setTimeout(next, 900);
    } else {
      setPicked({ value, ok: false });
      setNote(`Not quite: it's “${q.answer}”.`);
      run.miss(refs.current[value], "✗");
      setTimeout(next, 1600);
    }
  };

  useNumberKeys(q.choices.length, (i) => choose(q.choices[i]), !picked);

  return (
    <div className="flex w-full flex-col items-center gap-3 short:gap-2">
      <div className="flex w-full max-w-3xl items-center justify-between gap-2">
        <button type="button" onClick={() => speak(q.speak, undefined, q.speakLang)} className="btn min-h-14 flex-1 justify-start px-4 text-left text-lg sm:text-2xl short:min-h-12 short:text-lg">
          🔊 <span lang={q.speakLang}>{q.prompt}</span>
        </button>
        <Hearts lives={run.lives} />
      </div>
      <div className="w-full max-w-3xl">
        <TimerBar left={left} total={total} />
      </div>
      <div data-testid="game-board" className="relative flex w-full max-w-3xl flex-col items-center gap-3 overflow-hidden rounded-3xl bg-gradient-to-b from-[#ffe7ec] to-[#bfe8ff] p-3 short:gap-1.5 short:p-2">
        {q.picture && (
          <span className="text-6xl font-bold short:text-3xl" aria-hidden={!/\d/.test(q.picture)}>
            {q.picture}
          </span>
        )}
        <div className="flex w-full items-end gap-1" aria-label={`Bridge: ${planks} of ${PLANKS} planks`} role="img">
          <span className="text-3xl" aria-hidden="true">
            🌳
          </span>
          <div className="flex h-10 flex-1 items-end gap-0.5 rounded-b-xl bg-[#5ec7e8]/60 px-0.5 short:h-6">
            {Array.from({ length: PLANKS }, (_, i) => (
              <span key={i} className={`h-4 flex-1 rounded-sm ${i < planks ? "animate-drop-in bg-[#a0673a]" : "bg-transparent"}`} />
            ))}
          </div>
          <span className="text-3xl" aria-hidden="true">
            🏡
          </span>
        </div>
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 short:flex short:flex-wrap">
          {q.choices.map((c, i) => {
            const state = picked?.value === c ? (picked.ok ? "right" : "wrong") : picked && c === q.answer ? "right" : undefined;
            return (
              <button
                key={`${n}-${c}`}
                ref={(el) => {
                  refs.current[c] = el;
                }}
                lang={q.answerLang ?? "fr"}
                type="button"
                data-state={state}
                aria-keyshortcuts={String(i + 1)}
                onClick={() => choose(c)}
                className={`btn min-h-14 font-read text-xl sm:text-2xl short:min-h-12 short:flex-1 short:text-lg ${state === "right" ? "btn-good" : state === "wrong" ? "animate-shake" : ""}`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>
      <p className="min-h-7 font-read text-lg text-ink-soft" aria-live="polite">
        {note || "Each right word lays a plank."}
      </p>
    </div>
  );
}

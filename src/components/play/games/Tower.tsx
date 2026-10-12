"use client";

import { useEffect, useRef, useState } from "react";
import { speak } from "@/lib/speech";
import { Hearts, questionSeconds, TimerBar, useCountdown, useNumberKeys, useRun } from "./kit";
import { equation, num, type Equation } from "./tower";
import type { GameProps } from "./types";

// Equation Tower: pick the block that balances the scale. Every right block joins the tower.

const BLOCK_COLOURS = ["#6fd08c", "#5ec7e8", "#f2b233", "#a78bfa", "#ef7f8f"];

export function Tower({ grade, band, onScore, onLevel, onOver }: GameProps) {
  const run = useRun({ onScore, onLevel, onOver }, 5);
  const [eq, setEq] = useState<Equation>(() => equation(grade));
  const [n, setN] = useState(0);
  const [picked, setPicked] = useState<{ value: number; ok: boolean } | null>(null);
  const [note, setNote] = useState("");
  const [tower, setTower] = useState<number[]>([]);
  const refs = useRef<Record<number, HTMLButtonElement | null>>({});
  const total = questionSeconds(band, run.level, 20, 8);

  useEffect(() => {
    speak(eq.speak);
  }, [eq]);

  const next = () => {
    setPicked(null);
    setEq(equation(grade));
    setN((x) => x + 1);
  };

  const left = useCountdown(total, n, () => {
    setNote(`Time's up. ${eq.unknown} = ${num(eq.answer)}.`);
    setPicked({ value: eq.answer, ok: true });
    run.miss();
    setTimeout(next, 1500);
  }, !!picked || run.over);

  const choose = (value: number) => {
    if (picked || run.over) return;
    if (value === eq.answer) {
      setPicked({ value, ok: true });
      setNote("");
      setTower((t) => [...t, value].slice(-8));
      run.win(10 + Math.round(left / 2), refs.current[value]);
      setTimeout(next, 700);
    } else {
      setPicked({ value, ok: false });
      setNote(`Not quite: ${eq.unknown} = ${num(eq.answer)} balances it.`);
      run.miss(refs.current[value], "✗");
      setTimeout(next, 1600);
    }
  };

  useNumberKeys(eq.choices.length, (i) => choose(eq.choices[i]), !picked);

  // The beam tips toward the heavier side until the right block lands.
  const tilt = picked?.ok ? 0 : picked ? 8 : -6;

  return (
    <div className="flex w-full flex-col items-center gap-3 short:gap-2">
      <div className="flex w-full max-w-3xl items-center justify-between gap-2">
        <button type="button" onClick={() => speak(eq.speak)} className="btn min-h-14 flex-1 justify-start px-4 text-left text-lg sm:text-2xl short:min-h-12 short:text-lg">
          🔊 Find {eq.unknown}
        </button>
        <Hearts lives={run.lives} />
      </div>
      <div className="w-full max-w-3xl">
        <TimerBar left={left} total={total} />
      </div>
      <div data-testid="game-board" className="flex w-full max-w-3xl items-end gap-3 rounded-3xl bg-[#e6f7ea] p-3">
        <div className="flex flex-1 flex-col items-center gap-2">
          <div className="flex w-full items-end justify-between transition-transform duration-500 motion-reduce:transition-none" style={{ transform: `rotate(${tilt}deg)` }}>
            <span className="min-w-[40%] rounded-2xl border-4 border-[#3fa65f] bg-white px-2 py-3 text-center font-read text-2xl font-bold sm:text-4xl">{eq.left}</span>
            <span className="text-3xl font-bold" aria-hidden="true">
              =
            </span>
            <span className="min-w-[40%] rounded-2xl border-4 border-[#3fa65f] bg-white px-2 py-3 text-center font-read text-2xl font-bold sm:text-4xl">{eq.right}</span>
          </div>
          <span className="text-4xl" aria-hidden="true">
            ⚖️
          </span>
          <p className="sr-only" aria-live="polite">
            {eq.left} equals {eq.right}
          </p>
        </div>
        <div className="flex w-14 flex-col-reverse items-center gap-0.5 short:hidden" role="img" aria-label={`Your tower: ${run.right} blocks`}>
          {tower.map((v, i) => (
            <span key={`${i}-${v}`} className="h-5 w-12 animate-drop-in rounded-md border-2 border-[#0f172a]/30" style={{ background: BLOCK_COLOURS[i % BLOCK_COLOURS.length] }} />
          ))}
        </div>
      </div>
      <div className="grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
        {eq.choices.map((c, i) => {
          const state = picked?.value === c ? (picked.ok ? "right" : "wrong") : picked && c === eq.answer ? "right" : undefined;
          return (
            <button
              key={`${n}-${c}`}
              ref={(el) => {
                refs.current[c] = el;
              }}
              type="button"
              data-state={state}
              aria-keyshortcuts={String(i + 1)}
              aria-label={`${eq.unknown} = ${num(c)}`}
              onClick={() => choose(c)}
              className={`btn min-h-16 text-3xl ${state === "right" ? "btn-good" : state === "wrong" ? "animate-shake" : ""}`}
            >
              {num(c)}
            </button>
          );
        })}
      </div>
      <p className="min-h-7 font-read text-lg text-ink-soft" aria-live="polite">
        {note || `Which ${eq.unknown === "□" ? "number goes in the box" : `value of ${eq.unknown}`} balances the scale?`}
      </p>
    </div>
  );
}

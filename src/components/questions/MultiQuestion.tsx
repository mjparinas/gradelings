"use client";

import { useState } from "react";
import type { MultiQuestion as Q } from "@/content/types";
import { sounds } from "@/lib/sound";
import { Coin, Shape } from "../visuals";
import { CheckButton } from "./CheckButton";
import { isLocked, type QuestionProps } from "./types";

export function MultiQuestion({ q, status, onAttempt, onSpeak }: QuestionProps<Q>) {
  const [picked, setPicked] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const locked = isLocked(status);
  const shown = status === "revealed" ? q.answers : picked;
  const tiles = q.choices.some((c) => c.emoji || c.shape || c.coin);

  const toggle = (id: string, label: string) => {
    if (locked) return;
    sounds.pop(picked.length);
    onSpeak?.(label);
    setChecked(false);
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  const check = (el: Element) => {
    const right = picked.length === q.answers.length && q.answers.every((a) => picked.includes(a));
    setChecked(true);
    onAttempt(right, el);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5">
      <p className="font-read text-xl text-ink-soft">Tap every one that fits.</p>
      <div className={`grid w-full gap-3 sm:gap-4 ${tiles ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 max-w-2xl"}`}>
        {q.choices.map((c) => {
          const on = shown.includes(c.id);
          // After a miss, flag the picks that don't belong so the child can untick them.
          const bad = checked && status === "retry" && on && !q.answers.includes(c.id);
          return (
            <button
              key={c.id}
              type="button"
              data-quiet
              data-testid="multi-choice"
              aria-pressed={on}
              data-state={status === "revealed" && on ? "right" : bad ? "wrong" : undefined}
              disabled={locked}
              onClick={() => toggle(c.id, c.speak ?? c.label)}
              className={`btn w-full ${on ? (status === "revealed" ? "btn-primary" : bad ? "btn-nudge" : "btn-soft ring-4 ring-[color:var(--c)]/60") : ""} ${
                tiles ? "min-h-28 flex-col px-3 py-3 text-xl sm:text-2xl" : "min-h-16 justify-start px-5 py-3 text-left font-read text-2xl"
              }`}
            >
              {tiles && (
                <>
                  {c.emoji && <span className="text-5xl leading-none">{c.emoji}</span>}
                  {c.shape && <Shape shape={c.shape} size={64} />}
                  {c.coin && <Coin cents={c.coin} currency={q.currency} />}
                </>
              )}
              <span lang={q.choicesLang} className="font-read leading-tight">
                <span aria-hidden="true">{on ? "☑ " : "☐ "}</span>
                {c.label}
              </span>
            </button>
          );
        })}
      </div>
      {!locked && <CheckButton ready={picked.length > 0} onCheck={check} />}
    </div>
  );
}

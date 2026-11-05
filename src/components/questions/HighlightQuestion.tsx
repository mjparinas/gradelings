"use client";

import { useState } from "react";
import type { HighlightQuestion as Q } from "@/content/types";
import { sounds } from "@/lib/sound";
import { CheckButton } from "./CheckButton";
import { isLocked, type QuestionProps } from "./types";

export function HighlightQuestion({ q, status, onAttempt, onSpeak }: QuestionProps<Q>) {
  const [picked, setPicked] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const locked = isLocked(status);
  const shown = status === "revealed" ? q.answers : picked;
  const many = q.answers.length > 1;

  const toggle = (i: number) => {
    if (locked) return;
    sounds.pop(picked.length);
    onSpeak?.(q.words[i].replace(/[^\p{L}\p{N}'’-]/gu, ""));
    setChecked(false);
    // One answer: tapping another word moves the pick. Several: each tap switches that word.
    setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : many ? [...p, i] : [i]));
  };

  const check = (el: Element) => {
    const right = picked.length === q.answers.length && q.answers.every((a) => picked.includes(a));
    setChecked(true);
    onAttempt(right, el);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5">
      <p className="font-read text-xl text-ink-soft">{many ? `Tap ${q.answers.length} words.` : "Tap the word."}</p>
      <p className="flex flex-wrap justify-center gap-x-1 gap-y-2 rounded-2xl bg-white p-4 font-read text-2xl leading-relaxed shadow-sm sm:text-3xl">
        {q.words.map((w, i) => {
          const on = shown.includes(i);
          const bad = checked && status === "retry" && on && !q.answers.includes(i);
          return (
            <button
              key={i}
              type="button"
              data-quiet
              data-testid="highlight-word"
              aria-pressed={on}
              data-state={status === "revealed" && on ? "right" : bad ? "wrong" : undefined}
              disabled={locked}
              onClick={() => toggle(i)}
              className={`min-h-12 rounded-xl border-2 px-2 py-1 transition-colors ${
                on
                  ? status === "revealed"
                    ? "border-[#0f172a] bg-[#cfe2ff] font-bold underline decoration-4"
                    : bad
                      ? "border-[#0f172a] bg-[#ffe1c2] underline decoration-wavy"
                      : "border-[#0f172a] bg-[#ffe27a] font-bold underline decoration-4"
                  : "border-transparent hover:bg-ink/5"
              }`}
            >
              {w}
            </button>
          );
        })}
      </p>
      {!locked && <CheckButton ready={picked.length === q.answers.length} onCheck={check} />}
    </div>
  );
}

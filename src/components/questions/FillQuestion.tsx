"use client";

import { useMemo, useRef, useState } from "react";
import { shuffle } from "@/content/random";
import type { FillQuestion as Q } from "@/content/types";
import { useDrag } from "@/lib/drag";
import { replay } from "@/lib/juice";
import { sounds } from "@/lib/sound";
import { CheckButton } from "./CheckButton";
import { isLocked, type QuestionProps } from "./types";

export function FillQuestion({ q, status, onAttempt, onSpeak }: QuestionProps<Q>) {
  const pieces = useMemo(() => q.text.split("___"), [q.text]);
  const blanks = pieces.length - 1;
  const [bank] = useState(() => shuffle(q.bank));
  const [slots, setSlots] = useState<(string | null)[]>(() => Array(blanks).fill(null));
  const [wrongAt, setWrongAt] = useState<number[]>([]);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const locked = isLocked(status);
  const shown = status === "revealed" ? q.answers : slots;
  const full = slots.every((s) => s !== null);

  const put = (word: string, at?: number) => {
    if (locked) return;
    setWrongAt([]);
    setSlots((s) => {
      const next = s.map((w) => (w === word ? null : w));
      const i = at ?? next.findIndex((w) => w === null);
      if (i < 0) return s;
      next[i] = word;
      return next;
    });
    sounds.pop(slots.filter(Boolean).length);
    onSpeak?.(word);
  };

  const take = (i: number) => {
    if (locked) return;
    sounds.whoosh();
    setWrongAt([]);
    setSlots((s) => s.map((w, j) => (j === i ? null : w)));
  };

  const drag = useDrag((word, targetId) => put(word, Number(targetId.replace("blank:", ""))), !locked);

  const check = (el: Element) => {
    const bad = slots.map((w, i) => (w === q.answers[i] ? -1 : i)).filter((i) => i >= 0);
    if (bad.length === 0) {
      onAttempt(true, el);
      return;
    }
    setWrongAt(bad);
    replay(lineRef.current, "animate-shake");
    // Keep the right words; send the wrong ones back to the bank to try again.
    setTimeout(() => {
      setSlots((s) => s.map((w, i) => (bad.includes(i) ? null : w)));
      setWrongAt([]);
    }, 650);
    onAttempt(false, el);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5">
      <p ref={lineRef} className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 rounded-2xl bg-white p-4 font-read text-2xl leading-loose shadow-sm sm:text-3xl">
        {pieces.map((piece, i) => (
          <span key={i} className="contents">
            {piece && <span>{piece}</span>}
            {i < blanks &&
              (shown[i] ? (
                <button
                  type="button"
                  data-quiet
                  data-testid="fill-blank"
                  data-drop={`blank:${i}`}
                  data-state={status === "revealed" ? "right" : wrongAt.includes(i) ? "wrong" : undefined}
                  disabled={locked}
                  aria-label={`Blank ${i + 1}: ${shown[i]}. Tap to remove.`}
                  onClick={() => take(i)}
                  className={`btn animate-drop-in min-h-14 px-4 text-2xl ${
                    status === "revealed" ? "btn-primary" : wrongAt.includes(i) ? "btn-nudge" : status === "correct" ? "btn-good" : "btn-soft"
                  }`}
                >
                  {shown[i]}
                </button>
              ) : (
                <span
                  data-testid="fill-blank"
                  data-drop={`blank:${i}`}
                  role="img"
                  aria-label={`Blank ${i + 1}, empty`}
                  className={`inline-block h-14 min-w-24 rounded-2xl border-4 border-dashed border-ink/25 ${
                    slots.findIndex((w) => w === null) === i && !locked ? "animate-pulse-soft border-[color:var(--c)]/60" : ""
                  }`}
                />
              ))}
          </span>
        ))}
      </p>
      {!locked && (
        <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Word bank">
          {bank.map((w) => {
            const used = slots.includes(w);
            return (
              <button
                key={w}
                type="button"
                data-quiet
                data-testid="bank-word"
                disabled={used}
                onClick={() => put(w)}
                {...(used ? {} : drag(w))}
                className={`btn min-h-14 px-4 font-read text-2xl ${used ? "opacity-30" : ""}`}
              >
                {w}
              </button>
            );
          })}
        </div>
      )}
      {!locked && <CheckButton ready={full} onCheck={check} />}
    </div>
  );
}

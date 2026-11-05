"use client";

import { useState } from "react";
import type { MistakeQuestion as Q } from "@/content/types";
import { isLocked, type QuestionProps } from "./types";

export function MistakeQuestion({ q, status, onAttempt, onSpeak }: QuestionProps<Q>) {
  const [wrong, setWrong] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const locked = isLocked(status);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
      <p className="text-center font-read text-xl text-ink-soft">Tap the step with the mistake.</p>
      <ol className="flex flex-col gap-3">
        {q.steps.map((s, i) => {
          const isWrong = wrong.includes(i);
          const isMistake = i === q.wrong;
          const show = (status === "correct" && picked === i) || (status === "revealed" && isMistake);
          return (
            <li key={i} className="flex items-center gap-3">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl font-bold text-[#0f172a]"
                style={{ background: "var(--c)" }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <button
                type="button"
                data-quiet
                data-testid="mistake-step"
                data-state={show ? "right" : isWrong ? "wrong" : undefined}
                disabled={locked || isWrong}
                onClick={(e) => {
                  setPicked(i);
                  onSpeak?.(s);
                  if (!isMistake) setWrong((w) => [...w, i]);
                  onAttempt(isMistake, e.currentTarget);
                }}
                className={`btn min-h-16 flex-1 justify-start px-4 py-2 text-left font-read text-xl sm:text-2xl ${
                  show ? (status === "revealed" ? "btn-primary" : "btn-good") : isWrong ? "btn-nudge opacity-60" : ""
                } ${locked && !show ? "opacity-50" : ""}`}
              >
                {s}
                {show && <span aria-hidden="true"> ← mistake</span>}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { useCheckShortcut } from "@/lib/keys";
import { sounds } from "@/lib/sound";
import type { ShadeQuestion as Q } from "@/content/types";
import { isLocked, type QuestionProps } from "./types";

export function ShadeQuestion({ q, status, onAttempt }: QuestionProps<Q>) {
  const [picked, setPicked] = useState<number[]>([]);
  const locked = isLocked(status);
  const checkButton = useRef<HTMLButtonElement>(null);
  const shown =
    status === "revealed"
      ? Array.from({ length: q.target }, (_, i) => i)
      : picked;
  const count = shown.length;
  useCheckShortcut(checkButton, !locked && picked.length > 0);

  const toggle = (i: number) => {
    if (locked) return;
    sounds.pop(picked.length);
    setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
  };
  const label = (i: number) =>
    `Part ${i + 1} of ${q.parts}${shown.includes(i) ? ", shaded" : ""}`;
  const fill = (i: number) => (shown.includes(i) ? "var(--c)" : "white");

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5">
      <div
        className="flex w-full max-w-xl gap-1"
        role="group"
        aria-label={`A bar cut into ${q.parts} equal parts`}
      >
        {Array.from({ length: q.parts }, (_, i) => (
          <button
            key={i}
            type="button"
            data-quiet
            data-testid="shade-part"
            disabled={locked}
            aria-pressed={shown.includes(i)}
            aria-label={label(i)}
            onClick={() => toggle(i)}
            className="h-20 min-w-0 flex-1 rounded-lg border-4 border-[#0f172a] disabled:cursor-default"
            style={{ background: fill(i) }}
          />
        ))}
      </div>
      <p className="font-read text-xl text-ink-soft" aria-live="polite">
        {count} of {q.parts} shaded
      </p>
      {!locked && (
        <button
          type="button"
          data-quiet
          disabled={picked.length === 0}
          ref={checkButton}
          onClick={(e) =>
            onAttempt(picked.length === q.target, e.currentTarget)
          }
          className={`btn btn-good min-h-18 w-full max-w-sm text-3xl ${picked.length ? "animate-pulse-soft" : "opacity-50"}`}
        >
          Check ✓
        </button>
      )}
    </div>
  );
}

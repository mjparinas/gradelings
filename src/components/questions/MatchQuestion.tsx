"use client";

import { useRef, useState } from "react";
import { shuffle } from "@/content/random";
import type { MatchQuestion as Q } from "@/content/types";
import { useDrag } from "@/lib/drag";
import { burstFrom, replay } from "@/lib/juice";
import { sounds } from "@/lib/sound";
import { isLocked, type QuestionProps } from "./types";

type Side = "left" | "right";

export function MatchQuestion({ q, status, onAttempt, onSlip, onSpeak }: QuestionProps<Q>) {
  // The right-hand column is shuffled once, and never starts in the same order as the left.
  const [rightOrder] = useState(() => {
    let s = shuffle(q.pairs.map((p) => p.id));
    while (s.length > 1 && s.every((id, i) => id === q.pairs[i].id)) s = shuffle(s);
    return s;
  });
  const [done, setDone] = useState<string[]>([]);
  const [picked, setPicked] = useState<{ side: Side; id: string } | null>(null);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const locked = isLocked(status);
  const matched = (id: string) => status === "revealed" || done.includes(id);
  const pair = (id: string) => q.pairs.find((p) => p.id === id)!;

  const attempt = (leftId: string, rightId: string) => {
    if (locked || matched(leftId)) return;
    const el = refs.current[`right:${rightId}`];
    setPicked(null);
    if (leftId !== rightId) {
      replay(el, "animate-shake");
      replay(refs.current[`left:${leftId}`], "animate-shake");
      onSlip(el);
      return;
    }
    const next = [...done, leftId];
    setDone(next);
    onSpeak?.(pair(leftId).right.label);
    if (next.length === q.pairs.length) {
      onAttempt(true, el);
    } else {
      sounds.pop(next.length);
      burstFrom(el, 10);
    }
  };

  const tap = (side: Side, id: string) => {
    if (locked || matched(id)) return;
    onSpeak?.(side === "left" ? pair(id).left.label : pair(id).right.label);
    if (!picked || picked.side === side) {
      setPicked(picked && picked.side === side && picked.id === id ? null : { side, id });
      return;
    }
    attempt(side === "left" ? id : picked.id, side === "left" ? picked.id : id);
  };

  const drag = useDrag((leftId, targetId) => attempt(leftId, targetId.replace(/^right:/, "")), !locked);

  const cell = (side: Side, id: string) => {
    const s = pair(id)[side];
    const isDone = matched(id);
    const isPicked = picked?.side === side && picked.id === id;
    const dragProps = side === "left" && !isDone ? drag(id) : {};
    return (
      <button
        key={`${side}:${id}`}
        ref={(el) => {
          refs.current[`${side}:${id}`] = el;
        }}
        type="button"
        data-quiet
        data-testid={`match-${side}`}
        data-state={isDone ? "right" : undefined}
        data-drop={side === "right" && !isDone ? `right:${id}` : undefined}
        disabled={locked && !isDone}
        aria-pressed={isDone ? undefined : isPicked}
        aria-label={isDone ? `${s.label}, matched with ${pair(id)[side === "left" ? "right" : "left"].label}` : undefined}
        onClick={() => tap(side, id)}
        {...dragProps}
        className={`btn min-h-16 w-full justify-start gap-3 px-4 text-left font-read text-xl sm:text-2xl ${
          isDone ? "btn-good" : isPicked ? "btn-soft -translate-y-1 ring-4 ring-[color:var(--c)]/50" : ""
        }`}
      >
        {s.emoji && <span className={s.picture ? "text-5xl leading-none" : "text-3xl"}>{s.emoji}</span>}
        <span className={s.picture ? "sr-only" : ""}>{s.label}</span>
        {isDone && <span aria-hidden="true">✓</span>}
      </button>
    );
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4">
      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-3 sm:gap-x-8">
        <div className="flex flex-col gap-3" role="group" aria-label="First column">
          {q.pairs.map((p) => cell("left", p.id))}
        </div>
        <div className="flex flex-col gap-3" role="group" aria-label="Second column">
          {rightOrder.map((id) => cell("right", id))}
        </div>
      </div>
      {!locked && (
        <p className="font-read text-lg text-ink-soft" aria-live="polite">
          {done.length} of {q.pairs.length} matched. Tap one, then its partner.
        </p>
      )}
    </div>
  );
}

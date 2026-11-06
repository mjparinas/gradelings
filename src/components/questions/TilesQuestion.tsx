"use client";

import { useRef, useState } from "react";
import { shuffle } from "@/content/random";
import type { TilesQuestion as Q } from "@/content/types";
import { useDrag } from "@/lib/drag";
import { replay } from "@/lib/juice";
import { sounds } from "@/lib/sound";
import { CheckButton } from "./CheckButton";
import { isLocked, type QuestionProps } from "./types";

export function tilesAnswers(q: Pick<Q, "tiles" | "join" | "accept">): string[] {
  return [q.tiles.join(q.join ?? ""), ...(q.accept ?? [])];
}

export function TilesQuestion({ q, status, onAttempt, onSpeak }: QuestionProps<Q>) {
  const join = q.join ?? "";
  const all = [...q.tiles, ...(q.extra ?? [])].map((label, id) => ({ id, label }));
  const [pool] = useState(() => {
    let s = shuffle(all);
    const right = q.tiles.length;
    // Don't start with the tiles already in order.
    while (right > 1 && s.slice(0, right).every((t, i) => t.id === i)) s = shuffle(all);
    return s;
  });
  const [placed, setPlaced] = useState<number[]>([]);
  const [wrongFrom, setWrongFrom] = useState<number | null>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const locked = isLocked(status);
  const label = (id: number) => all[id].label;
  const shown = status === "revealed" ? q.tiles.map((_, i) => i) : placed;

  const place = (id: number) => {
    if (locked || placed.includes(id)) return;
    sounds.pop(placed.length);
    onSpeak?.(label(id));
    setWrongFrom(null);
    setPlaced((p) => [...p, id]);
  };
  const unplace = (id: number) => {
    if (locked) return;
    sounds.whoosh();
    setWrongFrom(null);
    setPlaced((p) => p.filter((x) => x !== id));
  };
  const drag = useDrag((id) => place(Number(id)), !locked);

  const check = (el: Element) => {
    const built = placed.map(label).join(join);
    if (tilesAnswers(q).includes(built)) {
      onAttempt(true, el);
      return;
    }
    let firstWrong = placed.findIndex((id, i) => label(id) !== q.tiles[i]);
    if (firstWrong < 0) firstWrong = Math.min(placed.length, q.tiles.length);
    setWrongFrom(firstWrong);
    replay(lineRef.current, "animate-shake");
    setTimeout(() => setPlaced((p) => p.slice(0, firstWrong)), 650);
    onAttempt(false, el);
  };

  const big = join === "" && all.every((t) => t.label.length <= 2);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5">
      <div
        ref={lineRef}
        data-drop="line"
        aria-label="Your answer"
        className="flex min-h-24 w-full flex-wrap items-center justify-center gap-2 rounded-2xl border-4 border-dashed border-ink/20 bg-white p-3"
      >
        {shown.length === 0 && <span className="font-read text-xl text-ink/40">Tap or drag tiles here</span>}
        {shown.map((id, i) => {
          const bad = wrongFrom !== null && i >= wrongFrom && status !== "revealed";
          const good = status === "correct" || status === "revealed";
          return (
            <button
              key={id}
              type="button"
              data-quiet
              data-testid="tile-placed"
              disabled={locked}
              onClick={() => unplace(id)}
              className={`btn animate-drop-in ${good ? "btn-good" : bad ? "btn-nudge" : "btn-soft"} ${
                big ? "h-20 min-w-16 px-3 text-5xl" : "min-h-16 px-4 font-read text-2xl"
              }`}
            >
              {label(id)}
            </button>
          );
        })}
      </div>
      {!locked && (
        <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Tiles">
          {pool.map((t) => {
            const used = placed.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                data-quiet
                data-testid="tile"
                disabled={used}
                onClick={() => place(t.id)}
                {...(used ? {} : drag(String(t.id)))}
                className={`btn ${used ? "opacity-30" : ""} ${big ? "h-20 min-w-16 px-3 text-5xl" : "min-h-16 px-4 font-read text-2xl"}`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      )}
      {!locked && <CheckButton ready={placed.length > 0} onCheck={check} />}
    </div>
  );
}

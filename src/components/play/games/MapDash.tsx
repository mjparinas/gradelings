"use client";

import { useEffect, useRef, useState } from "react";
import { speak } from "@/lib/speech";
import { mapQuestion, type MapQuestion, type MapTile } from "./map";
import { Hearts, questionSeconds, TimerBar, useCountdown, useRun } from "./kit";
import type { GameProps } from "./types";

// Map Dash: a question at the top, a map below. Tap the right place before the timer runs out.

export function MapDash({ grade, band, onScore, onLevel, onOver }: GameProps) {
  const run = useRun({ onScore, onLevel, onOver });
  const [q, setQ] = useState<MapQuestion>(() => mapQuestion(grade));
  const [n, setN] = useState(0);
  const [shown, setShown] = useState<{ id: string; ok: boolean } | null>(null);
  const [note, setNote] = useState("");
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const total = questionSeconds(band, run.level, 12, 5);

  useEffect(() => {
    speak(q.speak);
  }, [q]);

  const next = () => {
    setShown(null);
    setQ(mapQuestion(grade));
    setN((x) => x + 1);
  };

  const left = useCountdown(total, n, () => {
    setNote(`Time's up. ${q.why}`);
    setShown({ id: q.answers[0], ok: true });
    run.miss();
    setTimeout(next, 1400);
  }, !!shown || run.over);

  const tap = (t: MapTile) => {
    if (shown || run.over) return;
    if (q.answers.includes(t.id)) {
      setNote("");
      setShown({ id: t.id, ok: true });
      run.win(10 + Math.round(left), refs.current[t.id]);
      setTimeout(next, 600);
    } else {
      setNote(q.why);
      setShown({ id: t.id, ok: false });
      run.miss(refs.current[t.id], "✗");
      setTimeout(next, 1400);
    }
  };

  const { board } = q;
  const town = board.kind === "town";
  return (
    <div className="flex w-full flex-col items-center gap-3 short:gap-2">
      <div className="flex w-full max-w-3xl items-center justify-between gap-2">
        <button type="button" onClick={() => speak(q.speak)} className="btn min-h-14 flex-1 justify-start px-4 text-left text-lg sm:text-2xl short:min-h-12 short:text-lg">
          🔊 {q.prompt}
        </button>
        <Hearts lives={run.lives} />
      </div>
      <div className="flex w-full max-w-3xl items-center gap-3">
        <div className="flex-1">
          <TimerBar left={left} total={total} />
        </div>
        {board.compass && (
          <p className="shrink-0 font-bold text-ink-soft">
            <span aria-hidden="true">🧭 N ↑</span>
            <span className="sr-only">North is at the top of the map.</span>
          </p>
        )}
      </div>
      <div
        data-testid="game-board"
        className={`grid w-full max-w-3xl gap-1.5 rounded-3xl p-2 sm:gap-2 sm:p-3 short:gap-1 short:p-1 ${town ? "bg-[#d9f7d6]" : "bg-[#bfe8ff]"}`}
        style={{ gridTemplateColumns: `repeat(${board.cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: board.cols * board.rows }, (_, i) => {
          const col = i % board.cols;
          const row = Math.floor(i / board.cols);
          const t = board.tiles.find((x) => x.col === col && x.row === row);
          if (!t) return <span key={i} aria-hidden="true" />;
          const ocean = !town && !!t.emoji;
          const state = shown?.id === t.id ? (shown.ok ? "right" : "wrong") : undefined;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[t.id] = el;
              }}
              type="button"
              data-state={state}
              aria-label={t.name}
              onClick={() => tap(t)}
              className={`flex min-h-12 flex-col items-center justify-center rounded-2xl border-4 p-1 text-center font-bold transition-transform active:scale-95 ${
                town ? "aspect-[4/3] short:aspect-auto short:h-12" : "aspect-square short:aspect-auto short:h-12"
              } ${
                state === "right"
                  ? "border-good bg-[#c8f5dc]"
                  : state === "wrong"
                    ? "border-[#e57a12] bg-[#ffe3c7]"
                    : ocean
                      ? "border-[#7fbfe6] bg-[#e6f6ff]"
                      : town
                        ? "border-line bg-white"
                        : "border-[#7c4fe0]/40 bg-[#fff8e6]"
              }`}
            >
              {t.emoji && <span className={town ? "text-4xl sm:text-5xl short:text-xl" : "text-xl sm:text-2xl short:hidden"} aria-hidden="true">{t.emoji}</span>}
              <span className={town ? "font-read text-sm sm:text-base narrow:text-xs" : ocean ? "text-[10px] leading-tight sm:text-xs" : "text-lg sm:text-2xl"}>{t.label}</span>
              {!town && !ocean && <span className="hidden text-[11px] leading-tight font-semibold opacity-80 md:block short:hidden">{t.name}</span>}
            </button>
          );
        })}
      </div>
      <p className="min-h-7 font-read text-lg text-ink-soft short:text-base" aria-live="polite">
        {note || (town ? "Tap a place on the map." : "Tap a square on the map of Canada.")}
      </p>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { sounds } from "@/lib/sound";
import { speak } from "@/lib/speech";
import { shuffled } from "./content";
import { Hearts, questionSeconds, TimerBar, useCountdown, useNumberKeys, useRun } from "./kit";
import { orderSet, type OrderItem, type OrderSet } from "./timeline";
import type { GameProps } from "./types";

// Timeline Snap: tap the cards in order. Each right card snaps into the next slot.

interface Card extends OrderItem {
  /** Its place in the right order. */
  rank: number;
}

function deal(set: OrderSet): Card[] {
  const cards = set.items.map((item, rank) => ({ ...item, rank }));
  for (let i = 0; i < 10; i++) {
    const s = shuffled(cards);
    if (s.some((c, idx) => c.rank !== idx)) return s;
  }
  return [...cards].reverse();
}

export function Timeline({ grade, band, onScore, onLevel, onOver }: GameProps) {
  const run = useRun({ onScore, onLevel, onOver }, 3);
  const [set, setSet] = useState<OrderSet>(() => orderSet(grade));
  const [cards, setCards] = useState<Card[]>(() => deal(set));
  const [placed, setPlaced] = useState(0);
  const [n, setN] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);
  const refs = useRef<Record<number, HTMLButtonElement | null>>({});
  const total = questionSeconds(band, run.level, 40, 20);

  useEffect(() => {
    speak(set.speak);
  }, [set]);

  const next = () => {
    const s = orderSet(grade);
    setSet(s);
    setCards(deal(s));
    setPlaced(0);
    setWrong(null);
    setDone(false);
    setN((x) => x + 1);
  };

  const left = useCountdown(total, n, () => {
    setNote("Time's up! Here comes a new set.");
    setDone(true);
    run.miss();
    setTimeout(next, 1200);
  }, done || run.over);

  const tap = (c: Card) => {
    if (done || run.over || c.rank < placed) return;
    if (c.rank === placed) {
      sounds.tap();
      setWrong(null);
      setNote("");
      const now = placed + 1;
      setPlaced(now);
      if (now === set.items.length) {
        setDone(true);
        run.win(10 * set.items.length + Math.round(left), refs.current[c.rank]);
        setTimeout(next, 900);
      }
    } else {
      setWrong(c.rank);
      setNote(`Not yet: “${c.label}” comes later. Which comes next?`);
      run.miss(refs.current[c.rank], "✗");
    }
  };

  const waiting = cards.filter((c) => c.rank >= placed);
  useNumberKeys(waiting.length, (i) => tap(waiting[i]), !done);

  return (
    <div className="flex w-full flex-col items-center gap-3 short:gap-2">
      <div className="flex w-full max-w-3xl items-center justify-between gap-2">
        <button type="button" onClick={() => speak(set.speak)} className="btn min-h-14 flex-1 justify-start px-4 text-left text-lg sm:text-2xl short:min-h-12 short:text-lg">
          🔊 {set.title}
        </button>
        <Hearts lives={run.lives} />
      </div>
      <div className="w-full max-w-3xl">
        <TimerBar left={left} total={total} />
      </div>
      <div data-testid="game-board" className="flex w-full max-w-3xl flex-col gap-3 rounded-3xl bg-[#efe9ff] p-3 short:gap-1.5 short:p-2">
        <ol className="grid gap-2" style={{ gridTemplateColumns: `repeat(${set.items.length}, minmax(0, 1fr))` }} aria-label="Your order">
          {set.items.map((item, i) => (
            <li
              key={i}
              data-state={i < placed ? "right" : undefined}
              className={`flex min-h-16 flex-col items-center justify-center rounded-2xl border-4 border-dashed p-1 short:min-h-11 text-center font-read text-xs font-bold sm:text-base ${
                i < placed ? "animate-pop-in border-good border-solid bg-white" : "border-[#c9b8ff] text-ink-soft"
              }`}
            >
              {i < placed ? (
                <>
                  {item.emoji && <span className="text-2xl sm:text-3xl" aria-hidden="true">{item.emoji}</span>}
                  <span className={`[overflow-wrap:anywhere] ${item.emoji ? "sr-only sm:not-sr-only short:sr-only" : ""}`}>{item.label}</span>
                </>
              ) : (
                <span aria-hidden="true">{i + 1}</span>
              )}
            </li>
          ))}
        </ol>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {waiting.map((c, i) => (
            <button
              key={`${n}-${c.rank}`}
              ref={(el) => {
                refs.current[c.rank] = el;
              }}
              type="button"
              data-state={wrong === c.rank ? "wrong" : undefined}
              aria-keyshortcuts={i < 9 ? String(i + 1) : undefined}
              onClick={() => tap(c)}
              className={`btn min-h-16 flex-col gap-0 px-2 font-read text-base sm:text-xl short:min-h-12 short:flex-row short:gap-2 short:text-base ${wrong === c.rank ? "animate-shake" : ""}`}
            >
              {c.emoji && <span className="text-3xl short:text-xl" aria-hidden="true">{c.emoji}</span>}
              <span className="[overflow-wrap:anywhere]">{c.label}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="min-h-7 font-read text-lg text-ink-soft" aria-live="polite">
        {note || "Tap the card that comes next."}
      </p>
    </div>
  );
}

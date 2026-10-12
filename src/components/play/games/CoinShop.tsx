"use client";

import { useEffect, useRef, useState } from "react";
import { sounds } from "@/lib/sound";
import { speak } from "@/lib/speech";
import { fewestPieces, formatMoney, shopOrder, type Money, type ShopOrder } from "./coins";
import { Hearts, questionSeconds, TimerBar, useCountdown, useNumberKeys, useRun } from "./kit";
import type { GameProps } from "./types";

// Coin Shop: tap coins onto the counter to pay (or give change), then press Pay.

const LOOK: Record<string, { bg: string; ring: string; size: string; text: string }> = {
  nickel: { bg: "#d7dbe0", ring: "#8a939e", size: "h-14 w-14 narrow:h-11 narrow:w-11 short:h-10 short:w-10", text: "5¢" },
  dime: { bg: "#e4e7eb", ring: "#9aa3ad", size: "h-12 w-12 narrow:h-10 narrow:w-10 short:h-9 short:w-9", text: "10¢" },
  quarter: { bg: "#d0d5db", ring: "#7d8792", size: "h-16 w-16 narrow:h-12 narrow:w-12 short:h-11 short:w-11", text: "25¢" },
  loonie: { bg: "#e9c45a", ring: "#b48a16", size: "h-16 w-16 narrow:h-12 narrow:w-12 short:h-11 short:w-11", text: "$1" },
  toonie: { bg: "#e9c45a", ring: "#9aa3ad", size: "h-[4.25rem] w-[4.25rem] narrow:h-13 narrow:w-13 short:h-12 short:w-12", text: "$2" },
  five: { bg: "#8fc3f0", ring: "#3c7fc0", size: "h-12 w-20 narrow:h-10 narrow:w-16 short:h-9 short:w-14", text: "$5" },
};

function Piece({ m, small }: { m: Money; small?: boolean }) {
  const look = LOOK[m.id];
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center border-4 font-bold text-[#0f172a] ${m.bill ? "rounded-lg" : "rounded-full"} ${small ? "h-10 w-10 text-xs" : `${look.size} text-base`} ${
        m.bill && small ? "w-14" : ""
      }`}
      style={{ background: look.bg, borderColor: look.ring }}
    >
      {look.text}
    </span>
  );
}

export function CoinShop({ grade, band, onScore, onLevel, onOver }: GameProps) {
  const run = useRun({ onScore, onLevel, onOver }, 5);
  const [order, setOrder] = useState<ShopOrder>(() => shopOrder(grade));
  const [given, setGiven] = useState<Money[]>([]);
  const [n, setN] = useState(0);
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);
  const payRef = useRef<HTMLButtonElement>(null);
  const total = questionSeconds(band, run.level, 40, 20);
  const sum = given.reduce((a, m) => a + m.cents, 0);

  useEffect(() => {
    speak(order.speak);
  }, [order]);

  const next = () => {
    setOrder(shopOrder(grade));
    setGiven([]);
    setDone(false);
    setN((x) => x + 1);
  };

  const left = useCountdown(total, n, () => {
    setNote(`Time's up! ${formatMoney(order.target)} was the amount.`);
    setDone(true);
    run.miss();
    setTimeout(next, 1600);
  }, done || run.over);

  const add = (m: Money) => {
    if (done || run.over || given.length >= 20) return;
    sounds.tap();
    setGiven((g) => [...g, m]);
  };
  const removeAt = (i: number) => {
    if (done) return;
    setGiven((g) => g.filter((_, idx) => idx !== i));
  };

  const pay = () => {
    if (done || run.over || !given.length) return;
    if (sum === order.target) {
      const fewest = fewestPieces(order.target, order.money);
      const best = given.length <= fewest;
      setNote(best ? "Exactly right, with the fewest coins! ⭐" : "Exactly right!");
      setDone(true);
      run.win(10 + Math.round(left / 2), payRef.current);
      if (best) run.bonus(5);
      setTimeout(next, 900);
    } else {
      const diff = Math.abs(sum - order.target);
      setNote(`You gave ${formatMoney(sum)}. That's ${formatMoney(diff)} too ${sum > order.target ? "much" : "little"}.`);
      setGiven([]);
      run.miss(payRef.current, "✗");
    }
  };

  useNumberKeys(order.money.length, (i) => add(order.money[i]), !done);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Backspace") setGiven((g) => g.slice(0, -1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-3 short:gap-2">
      <div className="flex w-full max-w-3xl items-center justify-between gap-2">
        <button type="button" onClick={() => speak(order.speak)} className="btn min-h-14 flex-1 justify-start px-4 text-left text-lg sm:text-2xl short:min-h-12 short:text-lg">
          🔊 {order.prompt}
        </button>
        <Hearts lives={run.lives} />
      </div>
      <div className="w-full max-w-3xl">
        <TimerBar left={left} total={total} />
      </div>
      <div data-testid="game-board" className="flex w-full max-w-3xl flex-col gap-3 rounded-3xl bg-[#fff3d6] p-3 short:gap-1.5 short:p-2">
        <div className="flex min-h-24 flex-wrap content-start items-center gap-2 rounded-2xl border-4 border-dashed border-[#e6c84a] bg-white/70 p-2 narrow:min-h-16 short:min-h-14 short:p-1" role="group" aria-label="The counter">
          {given.length === 0 ? (
            <p className="w-full text-center font-read text-ink-soft">Tap coins to put them on the counter.</p>
          ) : (
            given.map((m, i) => (
              <button key={i} type="button" onClick={() => removeAt(i)} aria-label={`Take back a ${m.name}`} className="flex min-h-12 min-w-12 items-center justify-center rounded-full">
                <Piece m={m} small />
              </button>
            ))
          )}
        </div>
        <div className="grid grid-cols-3 justify-center gap-2 narrow:gap-1.5 sm:flex sm:flex-wrap sm:gap-3 short:flex short:flex-wrap short:gap-1.5">
          {order.money.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => add(m)}
              aria-label={`Add a ${m.name}`}
              aria-keyshortcuts={String(i + 1)}
              className="btn min-h-18 min-w-18 flex-col gap-1 px-2 py-2 narrow:min-h-16 narrow:min-w-0 narrow:px-1 short:min-h-12 short:py-1"
            >
              <Piece m={m} />
              <span className="font-read text-sm narrow:text-xs short:hidden">{m.name}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn min-h-14 px-4 text-lg short:min-h-12" onClick={() => setGiven([])} disabled={!given.length || done}>
            Clear
          </button>
          <button ref={payRef} type="button" className="btn btn-good min-h-14 flex-1 text-xl short:min-h-12" onClick={pay} disabled={!given.length || done}>
            Pay ✓
          </button>
        </div>
      </div>
      <p className="min-h-7 font-read text-lg text-ink-soft" aria-live="polite">
        {note || "Fewest coins earns a bonus ⭐"}
      </p>
    </div>
  );
}

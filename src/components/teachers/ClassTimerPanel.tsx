"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { call } from "@/lib/classroom";
import { formatClock, TIMER_LABEL_MAX, TIMER_MAX_MINUTES, TIMER_POLL_TEACHER_MS, TIMER_PRESETS, timeLeft, type ClassTimer } from "@/lib/classTimer";

// The class timer, teacher's side: pick a length, start it, and it counts down here and on every student's
// screen. Pause, add a minute or stop it at any time. It is only a countdown: it locks nothing.

const btn = "min-h-11 rounded-xl px-4 font-bold";

export function ClassTimerPanel({ classId }: { classId: string }) {
  const [timer, setTimer] = useState<ClassTimer | null>(null);
  const [receivedAt, setReceivedAt] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [minutes, setMinutes] = useState<number>(10);
  const [custom, setCustom] = useState("");
  const [label, setLabel] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const url = `/api/classes/timer/?classId=${encodeURIComponent(classId)}`;
  const took = useRef(0);

  const take = useCallback((t: ClassTimer | null) => {
    took.current = Date.now();
    setReceivedAt(took.current);
    setNow(took.current);
    setTimer(t);
  }, []);
  const refresh = useCallback(() => call<{ timer: ClassTimer | null }>(url).then((r) => take(r.timer)).catch(() => undefined), [url, take]);
  useEffect(() => {
    void refresh();
  }, [refresh]);
  // Another co-teacher may change it, so look again every few seconds while it is showing.
  const active = Boolean(timer);
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, TIMER_POLL_TEACHER_MS);
    return () => clearInterval(t);
  }, [active, refresh]);
  const running = Boolean(timer?.running);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, [running]);

  const act = async (method: string, body?: unknown, to = "/api/classes/timer/") => {
    setErr("");
    setBusy(true);
    try {
      take((await call<{ timer: ClassTimer | null }>(to, method, body)).timer);
    } catch (e) {
      setErr((e as Error).message);
    }
    setBusy(false);
  };
  const customMinutes = Number(custom);
  const chosen = custom.trim() ? customMinutes : minutes;
  const valid = Number.isInteger(chosen) && chosen >= 1 && chosen <= TIMER_MAX_MINUTES;
  const left = timer ? timeLeft(timer, receivedAt, Math.max(now, receivedAt)) : 0;
  const done = Boolean(timer) && left <= 0;

  return (
    <section className="mt-4 rounded-2xl border border-line bg-white p-5" aria-label="Class timer">
      <h2 className="text-xl font-bold">Class timer</h2>
      <p className="mt-1 font-read text-ink-soft">Start a countdown for the class. It shows on your screen and at the top of each student’s screen while their device is online. It doesn’t lock anything, and practice carries on as usual.</p>
      {!timer ? (
        <div className="mt-3">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Minutes">
            {TIMER_PRESETS.map((m) => (
              <button key={m} type="button" aria-pressed={!custom.trim() && minutes === m} className={`${btn} border border-line aria-pressed:border-2 aria-pressed:border-[#4f8ef7]`} onClick={() => { setMinutes(m); setCustom(""); }}>
                {m} min
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-end gap-3">
            <label className="flex flex-col text-sm font-semibold">
              Other length (minutes)
              <input inputMode="numeric" className="mt-1 min-h-11 w-32 rounded-xl border border-line bg-white px-3 font-read" value={custom} onChange={(e) => setCustom(e.target.value.replace(/\D/g, "").slice(0, 3))} />
            </label>
            <label className="flex flex-col text-sm font-semibold">
              What for? (optional)
              <input className="mt-1 min-h-11 w-64 max-w-full rounded-xl border border-line bg-white px-3 font-read" maxLength={TIMER_LABEL_MAX} placeholder="Silent reading" value={label} onChange={(e) => setLabel(e.target.value)} />
            </label>
            <button type="button" disabled={!valid || busy} className={`${btn} bg-[#4f8ef7] text-[#0f172a] disabled:opacity-50`} onClick={() => void act("POST", { classId, minutes: chosen, label })}>
              Start the timer
            </button>
          </div>
          {!valid && custom.trim() !== "" && <p className="mt-2 text-sm text-ink-soft">Pick a whole number of minutes from 1 to {TIMER_MAX_MINUTES}.</p>}
        </div>
      ) : (
        <div className="mt-3">
          {timer.label && <p className="font-read text-ink-soft">{timer.label}</p>}
          <p className="font-read text-5xl font-bold tabular-nums" role="timer" aria-live="off" aria-label={done ? "Time's up" : formatClock(left)}>
            {done ? "Time’s up!" : formatClock(left)}
          </p>
          {!timer.running && !done && <p className="font-read text-ink-soft">Paused. Students see it paused.</p>}
          <div className="mt-3 flex flex-wrap gap-3">
            {!done && (
              <button type="button" disabled={busy} className={`${btn} border border-line`} onClick={() => void act("PATCH", { classId, action: timer.running ? "pause" : "resume" })}>
                {timer.running ? "Pause" : "Resume"}
              </button>
            )}
            <button type="button" disabled={busy} className={`${btn} border border-line`} onClick={() => void act("PATCH", { classId, action: "add" })}>
              Add a minute
            </button>
            <button type="button" disabled={busy} className={`${btn} bg-[#4f8ef7] text-[#0f172a] disabled:opacity-50`} onClick={() => void act("DELETE", undefined, url)}>
              {done ? "Clear" : "Stop"}
            </button>
          </div>
        </div>
      )}
      {err && (
        <p role="alert" className="mt-3 text-nudge-dark">
          {err}
        </p>
      )}
    </section>
  );
}

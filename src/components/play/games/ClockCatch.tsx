"use client";

import { FallingCatch, type FallRound } from "./Catch";
import { clockRound, decoyTime, digital, handAngles, type ClockTime } from "./clock";
import type { GameProps } from "./types";

// Clock Catch: analogue clocks fall; catch the ones that show the time at the top.

export function ClockFace({ time, size = 64 }: { time: ClockTime; size?: number }) {
  const a = handAngles(time);
  const hand = (deg: number, length: number) => {
    const r = (deg - 90) * (Math.PI / 180);
    return { x2: 50 + Math.cos(r) * length, y2: 50 + Math.sin(r) * length };
  };
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label={`a clock showing ${digital(time)}`} className="drop-shadow">
      <circle cx="50" cy="50" r="46" fill="#fff" stroke="#0f172a" strokeWidth="5" />
      {Array.from({ length: 12 }, (_, i) => {
        const r = (i * 30 - 90) * (Math.PI / 180);
        const long = i % 3 === 0;
        return (
          <line
            key={i}
            x1={50 + Math.cos(r) * (long ? 34 : 37)}
            y1={50 + Math.sin(r) * (long ? 34 : 37)}
            x2={50 + Math.cos(r) * 41}
            y2={50 + Math.sin(r) * 41}
            stroke="#0f172a"
            strokeWidth={long ? 4 : 2}
            strokeLinecap="round"
          />
        );
      })}
      {[12, 3, 6, 9].map((n) => {
        const r = (n * 30 - 90) * (Math.PI / 180);
        return (
          <text key={n} x={50 + Math.cos(r) * 25} y={50 + Math.sin(r) * 25 + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">
            {n}
          </text>
        );
      })}
      <line x1="50" y1="50" {...hand(a.hour, 22)} stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />
      <line x1="50" y1="50" {...hand(a.minute, 36)} stroke="#2a78d6" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="50" r="4" fill="#0f172a" />
    </svg>
  );
}

export function makeClockRound(grade: GameProps["grade"]): FallRound {
  const r = clockRound(grade);
  return {
    title: r.title,
    speak: r.speak,
    drop: (good) => {
      const time = good ? r.target : decoyTime(grade, r.target);
      return { label: digital(time), mark: "⏰", visual: <ClockFace time={time} />, hideLabel: true };
    },
  };
}

export function ClockCatch(props: GameProps) {
  return <FallingCatch {...props} round={() => makeClockRound(props.grade)} />;
}

"use client";

import { useRef, useState } from "react";
import { useCheckShortcut } from "@/lib/keys";
import { sounds } from "@/lib/sound";
import { placeLabel, placeTicks } from "@/content/placeLabel";
import type { PlaceQuestion as Q } from "@/content/types";
import { isLocked, type QuestionProps } from "./types";

const W = 600;
const PAD = 30;

export function PlaceQuestion({ q, status, onAttempt }: QuestionProps<Q>) {
  const ticks = placeTicks(q);
  const [index, setIndex] = useState<number | null>(null);
  const locked = isLocked(status);
  const svg = useRef<SVGSVGElement>(null);
  const checkButton = useRef<HTMLButtonElement>(null);
  useCheckShortcut(checkButton, !locked && index !== null);

  const targetIndex = Math.round((q.target - q.min) / q.step);
  const shown = status === "revealed" ? targetIndex : index;
  const x = (i: number) => PAD + (i / ticks) * (W - PAD * 2);
  const valueAt = (i: number) => q.min + i * q.step;
  const every = q.labelEvery ?? ticks;

  const pick = (i: number) => {
    const next = Math.max(0, Math.min(ticks, i));
    if (next !== index) sounds.pop(next);
    setIndex(next);
  };
  const fromPointer = (clientX: number) => {
    const box = svg.current?.getBoundingClientRect();
    if (!box || box.width === 0) return;
    const px = ((clientX - box.left) / box.width) * W;
    pick(Math.round(((px - PAD) / (W - PAD * 2)) * ticks));
  };

  const onKey = (e: React.KeyboardEvent) => {
    const at = index ?? 0;
    const move: Record<string, number> = {
      ArrowRight: at + 1,
      ArrowUp: at + 1,
      ArrowLeft: at - 1,
      ArrowDown: at - 1,
      PageUp: at + Math.max(1, Math.round(ticks / 5)),
      PageDown: at - Math.max(1, Math.round(ticks / 5)),
      Home: 0,
      End: ticks,
    };
    if (e.key in move) {
      e.preventDefault();
      e.stopPropagation();
      pick(
        index === null && (e.key === "ArrowRight" || e.key === "ArrowUp")
          ? 0
          : move[e.key],
      );
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4">
      <div
        role="slider"
        tabIndex={locked ? -1 : 0}
        aria-label="Marker on the number line"
        aria-valuemin={q.min}
        aria-valuemax={q.max}
        aria-valuenow={shown === null ? undefined : valueAt(shown)}
        aria-valuetext={
          shown === null ? "Not placed yet" : placeLabel(q, valueAt(shown))
        }
        aria-disabled={locked}
        data-testid="place-marker"
        className="w-full rounded-2xl"
        onKeyDown={onKey}
      >
        <svg
          ref={svg}
          viewBox={`0 0 ${W} 150`}
          aria-hidden="true"
          className="w-full touch-none select-none"
          onPointerDown={(e) => {
            if (locked) return;
            e.currentTarget.setPointerCapture?.(e.pointerId);
            fromPointer(e.clientX);
          }}
          onPointerMove={(e) => {
            if (!locked && e.buttons) fromPointer(e.clientX);
          }}
        >
          <line
            x1={PAD}
            x2={W - PAD}
            y1={70}
            y2={70}
            stroke="#0f172a"
            strokeWidth={5}
            strokeLinecap="round"
          />
          {Array.from({ length: ticks + 1 }, (_, i) => {
            const big = i % every === 0 || i === ticks;
            return (
              <g key={i}>
                <line
                  x1={x(i)}
                  x2={x(i)}
                  y1={big ? 52 : 58}
                  y2={big ? 88 : 82}
                  stroke="#0f172a"
                  strokeWidth={big ? 4 : 2.5}
                />
                {big && (
                  <text
                    x={x(i)}
                    y={118}
                    textAnchor="middle"
                    className="font-read"
                    fontSize={22}
                    fill="#0f172a"
                  >
                    {placeLabel(q, valueAt(i))}
                  </text>
                )}
              </g>
            );
          })}
          {shown !== null && (
            <circle
              cx={x(shown)}
              cy={70}
              r={16}
              fill="var(--c)"
              stroke="#0f172a"
              strokeWidth={4}
            />
          )}
        </svg>
      </div>
      <p className="font-read text-2xl" aria-live="polite">
        {shown === null
          ? locked
            ? ""
            : "Tap the line, or use the arrow keys"
          : `Marker at ${placeLabel(q, valueAt(shown))}`}
      </p>
      {!locked && (
        <button
          type="button"
          data-quiet
          disabled={index === null}
          ref={checkButton}
          onClick={(e) => onAttempt(index === targetIndex, e.currentTarget)}
          className={`btn btn-good min-h-18 w-full max-w-sm text-3xl ${index !== null ? "animate-pulse-soft" : "opacity-50"}`}
        >
          Check ✓
        </button>
      )}
    </div>
  );
}

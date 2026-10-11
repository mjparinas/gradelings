"use client";

import { useEffect, useId, useRef, useState } from "react";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function parse(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function iso(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function shown(value: string): string {
  const date = parse(value);
  if (!date) return "No date";
  return date.toLocaleDateString("en-CA", { day: "numeric", month: "short", year: "numeric" });
}

/** A month calendar in the site's colours. `value` is `YYYY-MM-DD`, or empty for no date. */
export function DateField({
  label,
  value,
  onChange,
  hideLabel = false,
  size = "md",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hideLabel?: boolean;
  size?: "md" | "sm";
}) {
  const uid = useId();
  const labelId = `${uid}-label`;
  const buttonId = `${uid}-button`;
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [alignEnd, setAlignEnd] = useState(false);
  const selected = parse(value);
  const today = new Date();
  const [cursor, setCursor] = useState(() => selected ?? today);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openCalendar = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    setAlignEnd(Boolean(rect && rect.left + 292 > window.innerWidth - 8));
    setCursor(selected ?? new Date());
    setOpen(true);
  };

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const count = new Date(year, month + 1, 0).getDate();
  const picked = selected && selected.getFullYear() === year && selected.getMonth() === month ? selected.getDate() : 0;

  return (
    <div ref={rootRef} className={`flex flex-col gap-1 ${size === "sm" ? "" : "w-full"}`}>
      <label id={labelId} htmlFor={buttonId} className={hideLabel ? "sr-only" : "font-semibold"}>
        {label}
      </label>
      <div className="relative">
        <button
          ref={buttonRef}
          id={buttonId}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          className={`flex items-center justify-between gap-2 rounded-xl border-2 border-line bg-white text-left font-semibold ${
            size === "sm" ? "min-h-11 rounded-lg px-2 text-sm" : "min-h-11 w-full px-3 text-base"
          }`}
          onClick={() => (open ? setOpen(false) : openCalendar())}
        >
          <span>{shown(value)}</span>
          <CalendarIcon />
        </button>
        {open && (
          <div
            role="dialog"
            aria-label={label}
            className={`absolute z-40 w-72 rounded-xl border-2 border-line bg-white p-3 shadow-[0_8px_24px_rgba(37,48,71,0.12)] ${
              alignEnd ? "right-0" : "left-0"
            } bottom-auto mt-1`}
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <button type="button" className="min-h-11 min-w-11 rounded-lg font-bold" aria-label="Previous month" onClick={() => setCursor(new Date(year, month - 1, 1))}>
                ‹
              </button>
              <p className="font-bold">
                {MONTHS[month]} {year}
              </p>
              <button type="button" className="min-h-11 min-w-11 rounded-lg font-bold" aria-label="Next month" onClick={() => setCursor(new Date(year, month + 1, 1))}>
                ›
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-ink-soft">
              {WEEKDAYS.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1">
              {Array.from({ length: firstWeekday }, (_, i) => (
                <div key={`pad-${i}`} />
              ))}
              {Array.from({ length: count }, (_, i) => {
                const day = i + 1;
                const isPicked = day === picked;
                const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                return (
                  <button
                    key={day}
                    type="button"
                    aria-label={`${day} ${MONTHS[month]} ${year}`}
                    aria-pressed={isPicked}
                    className={`min-h-11 rounded-lg text-sm font-semibold ${
                      isPicked ? "bg-[#4f8ef7] text-[#0f172a]" : isToday ? "bg-paper text-ink" : "text-ink"
                    }`}
                    onClick={() => {
                      onChange(iso(year, month, day));
                      setOpen(false);
                      buttonRef.current?.focus();
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            {value && (
              <button
                type="button"
                className="mt-2 min-h-11 w-full rounded-lg text-sm font-semibold text-ink-soft"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
              >
                Clear date
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
      <rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10h18M8 3v4M16 3v4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

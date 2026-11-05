"use client";

import { useRef } from "react";
import { useCheckShortcut } from "@/lib/keys";

/** The big Check button the "build an answer" questions share. Enter presses it. */
export function CheckButton({ ready, onCheck }: { ready: boolean; onCheck: (el: Element) => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  useCheckShortcut(ref, ready);
  return (
    <button
      type="button"
      data-quiet
      disabled={!ready}
      ref={ref}
      onClick={(e) => onCheck(e.currentTarget)}
      className={`btn btn-good min-h-18 w-full max-w-sm text-3xl ${ready ? "animate-pulse-soft" : "opacity-50"}`}
    >
      Check ✓
    </button>
  );
}

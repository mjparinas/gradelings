"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Panel } from "./common";

/** The parent PIN guards this device's parent area, so it lives with the other device settings. */
export function ParentPin() {
  const setPin = useStore((s) => s.setPin);
  const [newPin, setNewPin] = useState("");
  const [pinSaved, setPinSaved] = useState(false);
  return (
    <Panel title="🔒 Parent PIN (this device)">
      <div className="flex flex-wrap items-end gap-2">
        <label className="flex flex-col gap-1">
          <span className="font-semibold">New PIN (4–6 digits)</span>
          <input
            inputMode="numeric"
            value={newPin}
            onChange={(e) => {
              setPinSaved(false);
              setNewPin(e.target.value.replace(/\D/g, "").slice(0, 6));
            }}
            className="rounded-xl border-2 border-line px-3 py-2 text-lg tracking-widest"
          />
        </label>
        <button
          type="button"
          disabled={newPin.length < 4}
          className="rounded-xl bg-[#253047] px-4 py-2.5 font-bold text-white disabled:opacity-40"
          onClick={() => void setPin(newPin).then(() => {
            setNewPin("");
            setPinSaved(true);
          })}
        >
          Change PIN
        </button>
        {pinSaved && <span className="font-semibold text-good-dark">Saved ✓</span>}
      </div>
      <p className="mt-2 text-sm text-ink-soft">The PIN is stored on this device only.</p>
    </Panel>
  );
}

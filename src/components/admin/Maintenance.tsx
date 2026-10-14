"use client";

import { useState } from "react";
import { TURN_ON } from "@/lib/automations";
import { call } from "@/lib/classroom";
import { Notice } from "./Engage";

// Maintenance mode (src/lib/maintenance.ts): the switch on the System tab, and the banner every admin tab shows
// while it is on.

const btn = "min-h-11 rounded-xl px-4 font-bold disabled:opacity-50";
const primary = `${btn} bg-[#4f8ef7] text-[#0f172a]`;
const quiet = `${btn} border border-line bg-white`;
const field = "mt-1 min-h-11 rounded-xl border border-line bg-white px-3";
const card = "rounded-2xl border border-line bg-white p-5";
const when = (t: number) => new Date(t).toLocaleString("en-CA", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

export interface MaintenanceState {
  on: boolean;
  since: number | null;
}

const WHAT =
  "Every page except the home page shows a short “under maintenance” message, and accounts can't sync. Devices that already have the kids' app or parent area saved keep working offline, and their progress uploads once you switch it off. This panel keeps working. It can take up to 15 seconds to reach every server.";

async function turnOff(onChange: (s: MaintenanceState) => void, setErr: (e: string) => void) {
  setErr("");
  try {
    onChange(await call<MaintenanceState>("/api/admin/maintenance/", "PUT", { on: false }));
  } catch (e) {
    setErr((e as Error).message);
  }
}

/** Shown above every admin tab while maintenance mode is on. */
export function MaintenanceBanner({ state, onChange }: { state: MaintenanceState | null; onChange: (s: MaintenanceState) => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  if (!state?.on) return null;
  return (
    <section aria-labelledby="maintenance-banner-h" className="mb-5 rounded-2xl border-2 border-[#e57a12] bg-[#ffe7cc] p-4 text-[#0f172a]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="maintenance-banner-h" className="text-lg font-bold">
            🛠️ Maintenance Mode Is On
          </h2>
          <p className="font-read">
            Visitors only see the home page{state.since ? ` (on since ${when(state.since)})` : ""}.
          </p>
        </div>
        <button
          type="button"
          className={quiet}
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            await turnOff(onChange, setErr);
            setBusy(false);
          }}
        >
          Turn Off Maintenance Mode
        </button>
      </div>
      <Notice err={err} />
    </section>
  );
}

/** The switch, on the System tab. */
export function MaintenanceCard({ state, onChange }: { state: MaintenanceState | null; onChange: (s: MaintenanceState) => void }) {
  const [asking, setAsking] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const on = Boolean(state?.on);
  const turnOn = async () => {
    setBusy(true);
    setErr("");
    try {
      onChange(await call<MaintenanceState>("/api/admin/maintenance/", "PUT", { on: true, confirm }));
      setAsking(false);
      setConfirm("");
    } catch (e) {
      setErr((e as Error).message);
    }
    setBusy(false);
  };
  return (
    <section aria-labelledby="maintenance-h" className={`${card} mb-5`}>
      <h2 id="maintenance-h" className="text-xl font-bold">
        Maintenance Mode
      </h2>
      <p className="mt-1 max-w-3xl font-read">{WHAT}</p>
      <p className="mt-2 font-semibold">{state === null ? "Checking…" : on ? "On now." : "Off."}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {on ? (
          <button
            type="button"
            className={quiet}
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              await turnOff(onChange, setErr);
              setBusy(false);
            }}
          >
            Turn Off Maintenance Mode
          </button>
        ) : (
          <button type="button" className={quiet} aria-expanded={asking} disabled={state === null} onClick={() => setAsking(!asking)}>
            Turn On Maintenance Mode…
          </button>
        )}
      </div>
      {asking && !on && (
        <div className="mt-3 flex flex-wrap items-end gap-2 rounded-xl bg-[#f1f5f9] p-3">
          <label className="flex flex-col text-sm font-semibold">
            Type {TURN_ON} to confirm
            <input className={`${field} w-40 font-mono`} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="off" />
          </label>
          <button type="button" className={primary} disabled={busy || confirm !== TURN_ON} onClick={() => void turnOn()}>
            Start Maintenance
          </button>
        </div>
      )}
      <Notice err={err} />
    </section>
  );
}

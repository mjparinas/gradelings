import { useSyncExternalStore } from "react";
import { flagDef, type FlagKey } from "./flags";

// Feature flags and A/B test variants on the device. Fetched from /api/flags/ when the kids' app opens,
// when it comes back into view and when the signed-in account changes, then kept in localStorage so the
// last known values still apply offline. Until the first answer arrives, every flag has its default.

const KEY = "grademap.flags";
const DEVICE_KEY = "grademap.device";

interface Remote {
  flags: Record<string, boolean>;
  variants: Record<string, string>;
  /** Signed in to an admin account: the children have unlimited coins for testing (see /api/flags/). */
  testCoins?: boolean;
}

const EMPTY: Remote = { flags: {}, variants: {} };
let current: Remote = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load(): Remote {
  if (loaded) return current;
  loaded = true;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null") as Partial<Remote> | null;
    if (saved && typeof saved === "object") current = { flags: saved.flags ?? {}, variants: saved.variants ?? {}, ...(saved.testCoins === true ? { testCoins: true } : {}) };
  } catch {
    /* storage blocked or unreadable: defaults */
  }
  return current;
}

/** A random id for this device, so a partial rollout reaches signed-out devices too. Holds nothing about anyone. */
export function deviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      const bytes = crypto.getRandomValues(new Uint8Array(12));
      id = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

export function setRemoteFlags(next: Remote): void {
  current = { flags: { ...next.flags }, variants: { ...next.variants }, ...(next.testCoins === true ? { testCoins: true } : {}) };
  loaded = true;
  try {
    localStorage.setItem(KEY, JSON.stringify(current));
  } catch {
    /* still applies for this visit */
  }
  listeners.forEach((l) => l());
}

/** Asks the server for this device's flags. Offline or failing, the last known values stay. */
export async function refreshFlags(): Promise<void> {
  try {
    const d = deviceId();
    const res = await fetch(`/api/flags/${d ? `?d=${d}` : ""}`, { credentials: "same-origin", cache: "no-store" });
    if (!res.ok) return;
    const data = (await res.json()) as Partial<Remote>;
    if (data && typeof data.flags === "object") setRemoteFlags({ flags: data.flags ?? {}, variants: data.variants ?? {}, testCoins: data.testCoins === true });
  } catch {
    /* offline */
  }
}

/** Whether this device is signed in to an admin account, whose children get unlimited coins for testing. */
export function hasTestCoins(): boolean {
  return load().testCoins === true;
}

/** Whether a flag is on for this device right now (its default until the server has answered). */
export function isOn(key: FlagKey): boolean {
  const value = load().flags[key];
  return typeof value === "boolean" ? value : (flagDef(key)?.defaultOn ?? false);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const snapshot = () => load();
const serverSnapshot = () => EMPTY;

export function useFlag(key: FlagKey): boolean {
  useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  return isOn(key);
}

/** `isOn` that re-renders the component when the flags change, for screens that check several. */
export function useIsOn(): (key: FlagKey) => boolean {
  useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  return isOn;
}

/** The A/B test variant this device sees, or null when the experiment doesn't exist (treat it as the control). */
export function useVariant(key: string): string | null {
  const remote = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  return remote.variants[key] ?? null;
}

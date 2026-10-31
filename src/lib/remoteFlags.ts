import { useSyncExternalStore } from "react";
import type { FlagKey } from "./flags";
import { EMPTY, isOn, load, subscribe } from "./deviceFlags";

// The React side of the device's flags (./deviceFlags holds them): hooks that re-render when they change.
export { deviceId, hasTestCoins, isOn, refreshFlags, setRemoteFlags } from "./deviceFlags";

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

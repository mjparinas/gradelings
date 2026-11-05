import { useSyncExternalStore } from "react";

// A device whose storage is full cannot save what a child does. The browser says so with a handful of
// different errors (QuotaExceededError, Chrome's "disk full" and FILE_ERROR_NO_SPACE), so they are
// recognised in one place. The first one shows a notice asking a grown-up to free some space; the
// app carries on from memory meanwhile.

let full = false;
let dismissed = false;
const listeners = new Set<() => void>();

/** True for any of the errors a browser gives when it cannot write because the device has no room. */
export function isStorageFull(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const { name, message, code } = err as { name?: unknown; message?: unknown; code?: unknown };
  if (name === "QuotaExceededError" || code === 22) return true;
  return typeof message === "string" && /disk full|FILE_ERROR_NO_SPACE|no space left|quota/i.test(message);
}

/** Records that a write failed for lack of room. Safe to call again and again. */
export function reportStorageFull(): void {
  if (full) return;
  full = true;
  listeners.forEach((l) => l());
}

export function dismissStorageFull(): void {
  dismissed = true;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => void listeners.delete(listener);
}

/** Whether a write has failed for lack of room on this device. */
export function storageIsFull(): boolean {
  return full;
}

/** True while the notice should show: storage filled up and the grown-up hasn't closed it. */
export function useStorageFull(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => full && !dismissed,
    () => false,
  );
}

/** For tests. */
export function resetStorageFull(): void {
  full = false;
  dismissed = false;
  listeners.forEach((l) => l());
}

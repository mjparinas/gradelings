"use client";

import type { Classwork } from "./classroom";
import { consentNeeded } from "./coppa";
import { pingGuestDevice } from "./guestPing";
import * as localdb from "./localdb";
import { MAINTENANCE_HEADER, MAINTENANCE_SYNC_MESSAGE } from "./maintenance";
import type { AppEvent, ChildSettings, FamilyInfo, Profile } from "./model";
import { useStore } from "./store";

// Offline-first sync. Everything is saved on the device first; whenever the
// device is online and a parent has signed in, unsent events go up and new
// ones (from other devices) come down. Safe to call as often as you like.

const BATCH = 500;
let running: Promise<void> | null = null;

interface SyncResponse {
  accepted: string[];
  /** Names the server database; absent from older servers. */
  epoch?: string;
  cursor: number;
  more: boolean;
  events: AppEvent[];
  profiles: Profile[];
  settings: ChildSettings[];
  family?: FamilyInfo;
  classwork?: Classwork[];
}

export function syncNow(): Promise<void> {
  running ??= doSync().finally(() => {
    running = null;
  });
  return running;
}

async function doSync(): Promise<void> {
  const store = useStore.getState();
  if (!store.ready) return;
  if (!store.family.account) {
    store.setSync({ status: "signed-out" });
    if (typeof navigator === "undefined" || navigator.onLine) void pingGuestDevice(store);
    return;
  }
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    store.setSync({ status: "offline" });
    return;
  }
  store.setSync({ status: "syncing", error: undefined });
  try {
    for (let round = 0; round < 20; round++) {
      const state = useStore.getState();
      // A US family's progress stays on the device until a parent gives consent (the server would refuse it anyway).
      // Profiles still go up, unstored, so the server can tell which country the family is in.
      const events = consentNeeded(state.family) ? [] : await localdb.unsyncedEvents(BATCH);
      const res = await fetch("/api/sync/", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          cursor: state.sync.cursor,
          events,
          profiles: state.profiles,
          settings: Object.values(state.settings),
        }),
      });
      if (res.status === 401) {
        state.setFamily({ account: undefined }, true);
        state.setSync({ status: "signed-out" });
        return;
      }
      if (res.status === 503 && res.headers.get(MAINTENANCE_HEADER)) throw new Error(MAINTENANCE_SYNC_MESSAGE);
      if (!res.ok) throw new Error(`Sync failed (${res.status})`);
      const data = (await res.json()) as SyncResponse;
      await localdb.markSynced(data.accepted);
      // A different epoch means the server's database was replaced (restored from a backup). What this device
      // marked as sent, and how far it had downloaded, no longer holds: send everything again and start over.
      // Events have unique ids, so the server keeps one copy of each however often they arrive.
      const known = state.sync.epoch;
      const replaced = Boolean(data.epoch && known && data.epoch !== known);
      if (replaced) await localdb.markAllUnsynced();
      useStore.getState().mergeRemote(data);
      useStore.getState().setSync({
        cursor: replaced ? 0 : data.cursor,
        epoch: data.epoch ?? known,
        lastSyncAt: Date.now(),
        dirtyProfiles: [],
        dirtyFamily: false,
      });
      if (!replaced && !data.more && events.length < BATCH) break;
    }
    useStore.getState().setSync({ status: "idle" });
  } catch (e) {
    useStore.getState().setSync({ status: navigator.onLine ? "error" : "offline", error: (e as Error).message });
  }
}

let started = false;

/** Keeps the device in sync in the background. */
export function startBackgroundSync() {
  if (started || typeof window === "undefined") return;
  started = true;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const soon = (ms = 4000) => {
    clearTimeout(timer);
    timer = setTimeout(() => void syncNow(), ms);
  };
  window.addEventListener("online", () => soon(500));
  window.addEventListener("offline", () => useStore.getState().setSync({ status: "offline" }));
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") soon(500);
    else void syncNow();
  });
  setInterval(() => void syncNow(), 120_000);
  // New progress gets uploaded a few seconds after it happens.
  useStore.subscribe((s, prev) => {
    if (s.events !== prev.events || s.profiles !== prev.profiles || s.settings !== prev.settings) soon();
  });
  soon(1000);
}

"use client";

import type { AppEvent } from "./model";

// The on-device database (IndexedDB). Everything works offline from here;
// the sync engine copies unsynced events to the server when it can.
// Falls back to memory if IndexedDB is unavailable (e.g. some private modes).

const DB_NAME = "gradelings";
/** The product used to be called GradeMap; its database is copied into the new one once (see copyLegacyDatabase). */
const LEGACY_DB_NAME = "grademap";
const LEGACY_FLAG = "legacyDatabaseCopied";
const VERSION = 1;
/** How long to wait for the browser to open the database before using memory instead. */
export const OPEN_TIMEOUT_MS = 4000;
/** How long copying the old database may take before the app carries on (the copy is finished on the next visit). */
export const LEGACY_COPY_TIMEOUT_MS = 10_000;

export interface StoredEvent {
  event: AppEvent;
  id: string;
  profileId: string;
  /** 0 = waiting to upload, 1 = on the server. */
  synced: 0 | 1;
}

let dbPromise: Promise<IDBDatabase | null> | null = null;
let current: IDBDatabase | null = null;
const memory = { kv: new Map<string, unknown>(), events: new Map<string, StoredEvent>() };

function open(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === "undefined") return Promise.resolve(null);
  dbPromise ??= new Promise((resolve) => {
    // Safari can leave indexedDB.open() pending forever (no success, error or blocked event), most often on a first
    // visit that arrives from another site, such as the return from Google. Without a way out the app sits on
    // "Getting ready…" even after a refresh, so after a while we carry on with the in-memory fallback.
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      resolve(null);
    }, OPEN_TIMEOUT_MS);
    try {
      const req = indexedDB.open(DB_NAME, VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains("kv")) db.createObjectStore("kv");
        if (!db.objectStoreNames.contains("events")) {
          const store = db.createObjectStore("events", { keyPath: "id" });
          store.createIndex("profileId", "profileId");
          store.createIndex("synced", "synced");
        }
      };
      req.onsuccess = () => {
        const db = req.result;
        if (timedOut) {
          db.close();
          return;
        }
        clearTimeout(timer);
        // The browser can close the connection under us (storage cleared, the tab frozen, another
        // tab upgrading the database). Open a fresh one next time rather than keep a dead handle.
        db.onclose = () => forget(db);
        db.onversionchange = () => {
          db.close();
          forget(db);
        };
        current = db;
        // What was saved before the rename must be in place before anything reads, or a child would look new.
        void withTimeout(copyLegacyDatabase(db), LEGACY_COPY_TIMEOUT_MS).then(() => resolve(db));
      };
      req.onerror = () => resolve(null);
      req.onblocked = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
  return dbPromise;
}

function withTimeout(work: Promise<unknown>, ms: number): Promise<unknown> {
  return Promise.race([work.catch(() => undefined), new Promise((r) => setTimeout(r, ms))]);
}

/** Runs a request set on an open database and resolves when its transaction completes. */
function run(db: IDBDatabase, stores: string[], mode: IDBTransactionMode, fn: (t: IDBTransaction) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const t = db.transaction(stores, mode);
    t.oncomplete = () => resolve();
    t.onerror = () => reject(t.error);
    t.onabort = () => reject(t.error);
    fn(t);
  });
}

/** Opens the database that exists under the old name, or null when there is none (it is never created). */
async function openLegacyDatabase(): Promise<IDBDatabase | null> {
  if (typeof indexedDB.databases !== "function") return null;
  const names = await indexedDB.databases();
  if (!names.some((d) => d.name === LEGACY_DB_NAME)) return null;
  return new Promise((resolve) => {
    const req = indexedDB.open(LEGACY_DB_NAME);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
    req.onblocked = () => resolve(null);
  });
}

/**
 * The product used to be called GradeMap and its on-device database was named after it. The first time the new
 * database opens, everything in the old one (the profiles and settings, and every event, including those not
 * yet uploaded) is copied across, without overwriting anything the new one already has; then the old one is
 * deleted. If anything fails the old database is kept and the copy is tried again on the next visit.
 */
async function copyLegacyDatabase(db: IDBDatabase): Promise<void> {
  if (typeof indexedDB === "undefined") return;
  const old = await openLegacyDatabase();
  if (!old) return;
  try {
    if (!(await getFlag(db))) {
      let keys!: IDBRequest<IDBValidKey[]>;
      let values!: IDBRequest<unknown[]>;
      let rows!: IDBRequest<StoredEvent[]>;
      await run(old, ["kv", "events"], "readonly", (t) => {
        keys = t.objectStore("kv").getAllKeys();
        values = t.objectStore("kv").getAll();
        rows = t.objectStore("events").getAll();
      });
      await run(db, ["kv", "events"], "readwrite", (t) => {
        const kvStore = t.objectStore("kv");
        keys.result.forEach((key, i) => {
          const get = kvStore.get(key);
          get.onsuccess = () => {
            if (get.result === undefined) kvStore.put(values.result[i], key);
          };
        });
        const eventStore = t.objectStore("events");
        for (const row of rows.result) {
          const get = eventStore.get(row.id);
          get.onsuccess = () => {
            if (!get.result) eventStore.put(row);
          };
        }
      });
      await run(db, ["kv"], "readwrite", (t) => void t.objectStore("kv").put(1, LEGACY_FLAG));
    }
  } finally {
    old.close();
  }
  indexedDB.deleteDatabase(LEGACY_DB_NAME);
}

async function getFlag(db: IDBDatabase): Promise<boolean> {
  let flag: unknown;
  await run(db, ["kv"], "readonly", (t) => {
    const get = t.objectStore("kv").get(LEGACY_FLAG);
    get.onsuccess = () => (flag = get.result);
  });
  return flag === 1;
}

/** Drops a connection the browser closed, if it is still the one in use, so the next call opens a new one. */
function forget(db: IDBDatabase) {
  if (current !== db) return;
  current = null;
  dbPromise = null;
}

function tx<T>(store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T> | void, retry = true): Promise<T | undefined> {
  return open().then(
    (db) =>
      new Promise((resolve, reject) => {
        if (!db) return resolve(undefined);
        let t: IDBTransaction;
        try {
          t = db.transaction(store, mode);
        } catch (err) {
          // "The database connection is closing": open it again once and carry on.
          if (retry && (err as DOMException)?.name === "InvalidStateError") {
            forget(db);
            return void tx(store, mode, fn, false).then(resolve, reject);
          }
          return reject(err);
        }
        const req = fn(t.objectStore(store));
        t.oncomplete = () => resolve(req ? req.result : undefined);
        t.onerror = () => reject(t.error);
        t.onabort = () => reject(t.error);
      }),
  );
}

export async function getKV<T>(key: string): Promise<T | undefined> {
  const db = await open();
  if (!db) return memory.kv.get(key) as T | undefined;
  return tx<T>("kv", "readonly", (s) => s.get(key) as IDBRequest<T>);
}

export async function setKV(key: string, value: unknown): Promise<void> {
  const db = await open();
  if (!db) {
    memory.kv.set(key, value);
    return;
  }
  await tx("kv", "readwrite", (s) => {
    s.put(value, key);
  });
}

export async function putEvents(events: AppEvent[], synced: 0 | 1 = 0): Promise<void> {
  if (!events.length) return;
  const db = await open();
  const rows: StoredEvent[] = events.map((event) => ({ event, id: event.id, profileId: event.profileId, synced }));
  if (!db) {
    for (const r of rows) {
      const existing = memory.events.get(r.id);
      memory.events.set(r.id, existing ? { ...existing, synced: (existing.synced || synced) as 0 | 1 } : r);
    }
    return;
  }
  await tx("events", "readwrite", (s) => {
    for (const r of rows) {
      if (synced) s.put(r);
      else {
        // Don't downgrade an event that's already synced.
        const get = s.get(r.id);
        get.onsuccess = () => {
          if (!get.result) s.put(r);
        };
      }
    }
  });
}

export async function allEvents(): Promise<AppEvent[]> {
  const db = await open();
  if (!db) return [...memory.events.values()].map((r) => r.event);
  const rows = (await tx<StoredEvent[]>("events", "readonly", (s) => s.getAll() as IDBRequest<StoredEvent[]>)) ?? [];
  return rows.map((r) => r.event);
}

export async function unsyncedEvents(limit = 500): Promise<AppEvent[]> {
  const db = await open();
  if (!db) return [...memory.events.values()].filter((r) => !r.synced).slice(0, limit).map((r) => r.event);
  const rows =
    (await tx<StoredEvent[]>("events", "readonly", (s) => s.index("synced").getAll(0, limit) as IDBRequest<StoredEvent[]>)) ?? [];
  return rows.map((r) => r.event);
}

export async function markSynced(ids: string[]): Promise<void> {
  const db = await open();
  if (!db) {
    for (const id of ids) {
      const r = memory.events.get(id);
      if (r) r.synced = 1;
    }
    return;
  }
  await tx("events", "readwrite", (s) => {
    for (const id of ids) {
      const get = s.get(id);
      get.onsuccess = () => {
        if (get.result) s.put({ ...get.result, synced: 1 });
      };
    }
  });
}

/** Marks every event as waiting to upload again, for when the server's database was replaced by an older copy. */
export async function markAllUnsynced(): Promise<void> {
  const db = await open();
  if (!db) {
    for (const r of memory.events.values()) r.synced = 0;
    return;
  }
  await tx("events", "readwrite", (s) => {
    const req = s.index("synced").openCursor(IDBKeyRange.only(1));
    req.onsuccess = () => {
      const cursor = req.result;
      if (cursor) {
        cursor.update({ ...cursor.value, synced: 0 });
        cursor.continue();
      }
    };
  });
}

export async function deleteProfileEvents(profileId: string): Promise<void> {
  const db = await open();
  if (!db) {
    for (const [id, r] of memory.events) if (r.profileId === profileId) memory.events.delete(id);
    return;
  }
  await tx("events", "readwrite", (s) => {
    const req = s.index("profileId").openCursor(IDBKeyRange.only(profileId));
    req.onsuccess = () => {
      const cursor = req.result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };
  });
}

export async function clearAll(): Promise<void> {
  memory.kv.clear();
  memory.events.clear();
  const db = await open();
  if (!db) return;
  await tx("kv", "readwrite", (s) => {
    s.clear();
  });
  await tx("events", "readwrite", (s) => {
    s.clear();
  });
}

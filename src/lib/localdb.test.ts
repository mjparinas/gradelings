import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AppEvent } from "./model";

// A small in-memory IndexedDB: enough of the API for localdb.ts (object stores with a key path or
// explicit keys, indexes, getAll with a limit, cursors over a key range, and transactions that
// complete once every request, including ones made in success callbacks, has finished).

type Row = Record<string, unknown>;
interface StoreData {
  keyPath?: string;
  rows: Map<unknown, unknown>;
  indexes: Map<string, string>;
}

class FakeRequest<T = unknown> {
  result: T | undefined;
  error: unknown = null;
  onsuccess: (() => void) | null = null;
  onerror: (() => void) | null = null;
  onupgradeneeded: (() => void) | null = null;
  onblocked: (() => void) | null = null;
}

class FakeTransaction {
  oncomplete: (() => void) | null = null;
  onerror: (() => void) | null = null;
  onabort: (() => void) | null = null;
  error: unknown = null;
  private pending = 0;
  constructor(
    private db: FakeDb,
    readonly mode: string,
  ) {
    // An empty transaction still completes.
    setTimeout(() => this.settle(), 0);
  }
  objectStore(name: string) {
    const data = this.db.stores.get(name);
    if (!data) throw new Error(`NotFoundError: ${name}`);
    return new FakeObjectStore(this, data);
  }
  request<T>(work: () => T, after?: (r: FakeRequest<T>) => void): FakeRequest<T> {
    const req = new FakeRequest<T>();
    this.pending++;
    setTimeout(() => {
      req.result = work();
      req.onsuccess?.();
      after?.(req);
      this.pending--;
      this.settle();
    }, 0);
    return req;
  }
  write() {
    if (this.mode !== "readwrite") throw new Error("ReadOnlyError");
  }
  private done = false;
  private settle() {
    if (this.pending || this.done) return;
    queueMicrotask(() => {
      if (this.pending || this.done) return;
      this.done = true;
      this.oncomplete?.();
    });
  }
}

class FakeObjectStore {
  constructor(
    private t: FakeTransaction,
    private data: StoreData,
  ) {}
  get(key: unknown) {
    return this.t.request(() => structuredClone(this.data.rows.get(key)));
  }
  put(value: unknown, key?: unknown) {
    this.t.write();
    const k = this.data.keyPath ? (value as Row)[this.data.keyPath] : key;
    return this.t.request(() => void this.data.rows.set(k, structuredClone(value)));
  }
  getAll() {
    return this.t.request(() => [...this.data.rows.values()].map((v) => structuredClone(v)));
  }
  clear() {
    this.t.write();
    return this.t.request(() => void this.data.rows.clear());
  }
  index(name: string) {
    const field = this.data.indexes.get(name)!;
    const matching = (q: unknown) => [...this.data.rows.entries()].filter(([, v]) => (v as Row)[field] === q);
    return {
      getAll: (q: unknown, limit = Infinity) => this.t.request(() => matching(q).slice(0, limit).map(([, v]) => structuredClone(v))),
      openCursor: (range: { only: unknown }) => {
        const keys = matching(range.only).map(([k]) => k);
        // Every step fires the same request again with the next row (or null at the end), like IndexedDB.
        const req = new FakeRequest<unknown>();
        let i = 0;
        const step = () =>
          this.t.request(
            () =>
              i < keys.length
                ? {
                    value: structuredClone(this.data.rows.get(keys[i])),
                    update: (v: unknown) => {
                      this.t.write();
                      this.data.rows.set(keys[i], structuredClone(v));
                    },
                    delete: () => {
                      this.t.write();
                      this.data.rows.delete(keys[i]);
                    },
                    continue: () => {
                      i++;
                      step();
                    },
                  }
                : null,
            (r) => {
              req.result = r.result;
              req.onsuccess?.();
            },
          );
        step();
        return req;
      },
    };
  }
}

class FakeDb {
  stores = new Map<string, StoreData>();
  objectStoreNames = { contains: (n: string) => this.stores.has(n) };
  createObjectStore(name: string, opts?: { keyPath?: string }) {
    const data: StoreData = { keyPath: opts?.keyPath, rows: new Map(), indexes: new Map() };
    this.stores.set(name, data);
    return { createIndex: (index: string, field: string) => void data.indexes.set(index, field) };
  }
  transaction(_store: string, mode: string) {
    return new FakeTransaction(this, mode);
  }
}

function fakeIndexedDB() {
  const dbs = new Map<string, { db: FakeDb; version: number }>();
  const opened: string[] = [];
  return {
    dbs,
    opened,
    open(name: string, version: number) {
      opened.push(name);
      const req = new FakeRequest<FakeDb>();
      setTimeout(() => {
        let entry = dbs.get(name);
        const upgrade = !entry || entry.version < version;
        entry ??= { db: new FakeDb(), version };
        dbs.set(name, entry);
        req.result = entry.db;
        if (upgrade) req.onupgradeneeded?.();
        entry.version = version;
        req.onsuccess?.();
      }, 0);
      return req;
    },
  };
}

const ev = (id: string, profileId = "kid1"): AppEvent => ({ id, profileId, t: 1, type: "secret", code: id });

async function load() {
  vi.resetModules();
  return import("./localdb");
}

describe("localdb on IndexedDB", () => {
  let idb: ReturnType<typeof fakeIndexedDB>;
  beforeEach(() => {
    idb = fakeIndexedDB();
    vi.stubGlobal("indexedDB", idb);
    vi.stubGlobal("IDBKeyRange", { only: (v: unknown) => ({ only: v }) });
  });
  afterEach(() => vi.unstubAllGlobals());

  it("creates the stores once and keeps values across reloads", async () => {
    let db = await load();
    expect(await db.getKV("profiles")).toBeUndefined();
    await db.setKV("profiles", [{ id: "a" }]);
    await db.setKV("activeId", "a");
    db = await load();
    expect(await db.getKV("profiles")).toEqual([{ id: "a" }]);
    expect(await db.getKV("activeId")).toBe("a");
    const stores = idb.dbs.get("grademap")!.db.stores;
    expect([...stores.keys()]).toEqual(["kv", "events"]);
    expect([...stores.get("events")!.indexes.keys()]).toEqual(["profileId", "synced"]);
  });

  it("opens the database once per page load", async () => {
    const db = await load();
    await Promise.all([db.getKV("a"), db.getKV("b"), db.allEvents()]);
    expect(idb.opened).toEqual(["grademap"]);
  });

  it("opens the database again when the browser closed the connection", async () => {
    const db = await load();
    await db.setKV("a", 1);
    const fake = idb.dbs.get("grademap")!.db;
    const real = fake.transaction.bind(fake);
    let calls = 0;
    fake.transaction = (store: string, mode: string) => {
      if (!calls++) throw Object.assign(new Error("The database connection is closing."), { name: "InvalidStateError" });
      return real(store, mode);
    };
    expect(await db.getKV("a")).toBe(1);
    expect(idb.opened).toEqual(["grademap", "grademap"]);
  });

  it("gives up after one fresh try if the connection still can't be used", async () => {
    const db = await load();
    await db.setKV("a", 1);
    const fake = idb.dbs.get("grademap")!.db;
    fake.transaction = () => {
      throw Object.assign(new Error("The database connection is closing."), { name: "InvalidStateError" });
    };
    await expect(db.getKV("a")).rejects.toThrow("closing");
    expect(idb.opened).toEqual(["grademap", "grademap"]);
  });

  it("queues new events for upload and hands them out in batches", async () => {
    const db = await load();
    await db.putEvents([ev("a"), ev("b"), ev("c")]);
    expect((await db.unsyncedEvents(2)).map((e) => e.id)).toEqual(["a", "b"]);
    await db.markSynced(["a", "c", "missing"]);
    expect((await db.unsyncedEvents()).map((e) => e.id)).toEqual(["b"]);
    expect((await db.allEvents()).map((e) => e.id).sort()).toEqual(["a", "b", "c"]);
    // An unknown id is skipped, not invented.
    expect(idb.dbs.get("grademap")!.db.stores.get("events")!.rows.has("missing")).toBe(false);
  });

  it("queues every event for upload again when asked", async () => {
    const db = await load();
    await db.putEvents([ev("a"), ev("b"), ev("c")]);
    await db.markSynced(["a", "b"]);
    await db.markAllUnsynced();
    expect((await db.unsyncedEvents()).map((e) => e.id)).toEqual(["a", "b", "c"]);
    expect((await db.allEvents()).map((e) => e.id).sort()).toEqual(["a", "b", "c"]);
  });

  it("never downgrades an event the server already has", async () => {
    const db = await load();
    await db.putEvents([ev("a")], 1);
    await db.putEvents([ev("a"), ev("b")]);
    expect((await db.unsyncedEvents()).map((e) => e.id)).toEqual(["b"]);
    // Events from the server are stored as synced, even if they were waiting before.
    await db.putEvents([ev("b")], 1);
    expect(await db.unsyncedEvents()).toEqual([]);
  });

  it("ignores an empty batch without opening a transaction", async () => {
    const db = await load();
    await db.putEvents([]);
    expect(idb.opened).toEqual([]);
  });

  it("forgets one child's history and leaves the others", async () => {
    const db = await load();
    await db.putEvents([ev("a1", "a"), ev("b1", "b"), ev("a2", "a")]);
    await db.deleteProfileEvents("a");
    expect((await db.allEvents()).map((e) => e.id)).toEqual(["b1"]);
  });

  it("wipes everything for the next family", async () => {
    const db = await load();
    await db.setKV("pin", { hash: "h" });
    await db.putEvents([ev("a")]);
    await db.clearAll();
    expect(await db.getKV("pin")).toBeUndefined();
    expect(await db.allEvents()).toEqual([]);
  });

  it("works from memory when the database can't be opened", async () => {
    vi.stubGlobal("indexedDB", {
      open() {
        const req = new FakeRequest();
        setTimeout(() => req.onerror?.(), 0);
        return req;
      },
    });
    const db = await load();
    await db.setKV("k", 1);
    expect(await db.getKV("k")).toBe(1);
  });

  it("works from memory when opening is blocked or throws", async () => {
    vi.stubGlobal("indexedDB", {
      open() {
        const req = new FakeRequest();
        setTimeout(() => req.onblocked?.(), 0);
        return req;
      },
    });
    let db = await load();
    await db.putEvents([ev("a")]);
    expect((await db.allEvents()).map((e) => e.id)).toEqual(["a"]);

    vi.stubGlobal("indexedDB", {
      open() {
        throw new Error("SecurityError");
      },
    });
    db = await load();
    await db.setKV("k", "v");
    expect(await db.getKV("k")).toBe("v");
  });
});

describe("localdb without IndexedDB (private modes)", () => {
  beforeEach(() => vi.stubGlobal("indexedDB", undefined));
  afterEach(() => vi.unstubAllGlobals());

  it("keeps the same behaviour in memory", async () => {
    const db = await load();
    await db.setKV("k", { a: 1 });
    expect(await db.getKV("k")).toEqual({ a: 1 });

    await db.putEvents([ev("a1", "a"), ev("a2", "a"), ev("b1", "b")]);
    await db.putEvents([ev("s", "b")], 1);
    await db.putEvents([ev("s", "b")]); // Already synced: stays synced.
    expect((await db.unsyncedEvents(2)).map((e) => e.id)).toEqual(["a1", "a2"]);
    await db.markSynced(["a1", "nope"]);
    expect((await db.unsyncedEvents()).map((e) => e.id)).toEqual(["a2", "b1"]);
    await db.markAllUnsynced();
    expect((await db.unsyncedEvents()).map((e) => e.id).sort()).toEqual(["a1", "a2", "b1", "s"]);

    await db.deleteProfileEvents("a");
    expect((await db.allEvents()).map((e) => e.id)).toEqual(["b1", "s"]);

    await db.clearAll();
    expect(await db.getKV("k")).toBeUndefined();
    expect(await db.allEvents()).toEqual([]);
  });
});

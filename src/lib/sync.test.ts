// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AppEvent, ChildSettings, Profile } from "./model";

// The on-device database, in memory: events waiting to upload and the ones the server has accepted.
const db = vi.hoisted(() => ({ unsynced: [] as AppEvent[], synced: new Set<string>() }));
vi.mock("./localdb", () => ({
  setKV: vi.fn(),
  putEvents: vi.fn(),
  deleteProfileEvents: vi.fn(),
  clearAll: vi.fn(),
  unsyncedEvents: vi.fn(async (limit: number) => db.unsynced.filter((e) => !db.synced.has(e.id)).slice(0, limit)),
  markSynced: vi.fn(async (ids: string[]) => ids.forEach((id) => db.synced.add(id))),
  markAllUnsynced: vi.fn(async () => db.synced.clear()),
}));

import { useStore } from "./store";
import { startBackgroundSync, syncNow } from "./sync";
import { MAINTENANCE_SYNC_MESSAGE } from "./maintenance";

const account = { email: "p@example.com", familyId: "fam1" };
const answer = (id: string, profileId = "kid1", t = 1000): AppEvent => ({
  id,
  profileId,
  t,
  type: "answer",
  unit: "math/2/add",
  correct: true,
  attempts: 1,
  revealed: false,
  ms: 3000,
  mode: "practice",
});
const profile = (id: string, updatedAt: number, name = "Ava"): Profile => ({
  id,
  name,
  avatar: "ollie",
  colour: "#fff",
  grade: "2",
  framework: "ca-bc",
  createdAt: 1,
  updatedAt,
});
const settings = (profileId: string, updatedAt: number): ChildSettings => ({
  profileId,
  dailyGoalMinutes: 15,
  learnMinutesPerReward: 20,
  rewardGameMinutes: 5,
  maxGameMinutesPerDay: 20,
  gamesEnabled: true,
  freePlay: false,
  showTimer: true,
  autoRead: false,
  sound: true,
  enabledSubjects: ["math"],
  updatedAt,
});

function reply(body: Partial<{ epoch: string; accepted: string[]; cursor: number; more: boolean; events: AppEvent[]; profiles: Profile[]; settings: ChildSettings[] }>, status = 200) {
  return new Response(JSON.stringify({ accepted: [], cursor: 0, more: false, events: [], profiles: [], settings: [], ...body }), { status });
}

let online = true;
const fetchMock = vi.fn<(url: string, init: RequestInit) => Promise<Response>>();
const sent = () => fetchMock.mock.calls.map(([url, init]) => ({ url, body: JSON.parse(String(init.body)) as Record<string, unknown> }));

beforeEach(() => {
  db.unsynced = [];
  db.synced = new Set();
  online = true;
  vi.spyOn(navigator, "onLine", "get").mockImplementation(() => online);
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  useStore.setState({
    ready: true,
    profiles: [profile("kid1", 100)],
    activeId: "kid1",
    settings: { kid1: settings("kid1", 100) },
    events: [],
    family: { plan: "trial", trialEndsAt: 0, updatedAt: 0, account },
    sync: { cursor: 7, status: "idle", dirtyProfiles: ["kid1"], dirtyFamily: true },
    classwork: [],
  });
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("syncNow", () => {
  it("does nothing before the device database has loaded", async () => {
    useStore.setState({ ready: false });
    await syncNow();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("only syncs for a signed-in parent", async () => {
    useStore.setState({ family: { plan: "trial", trialEndsAt: 0, updatedAt: 0 } });
    await syncNow();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(useStore.getState().sync.status).toBe("signed-out");
  });

  it("tells the server a guest device was played today, and sends no practice", async () => {
    localStorage.clear();
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
    useStore.setState({ family: { plan: "trial", trialEndsAt: 0, updatedAt: 0 }, events: [answer("today1", "kid1", Date.now() - 1000)] });
    await syncNow();
    expect(sent().map((c) => c.url)).toEqual(["/api/guests/seen/"]);
    expect(Object.keys(sent()[0].body)).toEqual(["d"]);
  });

  it("waits for a connection instead of trying offline", async () => {
    online = false;
    await syncNow();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(useStore.getState().sync.status).toBe("offline");
  });

  it("uploads unsent events with the cursor, profiles and settings, then merges what comes back", async () => {
    db.unsynced = [answer("e1"), answer("e2")];
    const remote = answer("r1", "kid1", 2000);
    fetchMock.mockResolvedValueOnce(
      reply({ accepted: ["e1", "e2"], cursor: 42, events: [remote], profiles: [profile("kid1", 200, "Ava B")], settings: [settings("kid1", 50)] }),
    );
    await syncNow();

    expect(sent()).toEqual([
      {
        url: "/api/sync/",
        body: { cursor: 7, events: [answer("e1"), answer("e2")], profiles: [profile("kid1", 100)], settings: [settings("kid1", 100)] },
      },
    ]);
    expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: "POST", credentials: "same-origin" });
    expect([...db.synced]).toEqual(["e1", "e2"]);
    const s = useStore.getState();
    expect(s.events.map((e) => e.id)).toEqual(["r1"]);
    // Newer profile from the server wins; older settings from the server lose to the device's.
    expect(s.profiles[0].name).toBe("Ava B");
    expect(s.settings.kid1.updatedAt).toBe(100);
    expect(s.sync).toMatchObject({ cursor: 42, status: "idle", dirtyProfiles: [], dirtyFamily: false, error: undefined });
    expect(s.sync.lastSyncAt).toBeGreaterThan(0);
  });

  it("keeps pulling while the server says there is more, advancing the cursor each round", async () => {
    fetchMock
      .mockResolvedValueOnce(reply({ cursor: 10, more: true, events: [answer("r1")] }))
      .mockResolvedValueOnce(reply({ cursor: 20, more: true, events: [answer("r2")] }))
      .mockResolvedValueOnce(reply({ cursor: 25, more: false }));
    await syncNow();
    expect(sent().map((c) => c.body.cursor)).toEqual([7, 10, 20]);
    expect(useStore.getState().sync.cursor).toBe(25);
    expect(useStore.getState().events.map((e) => e.id)).toEqual(["r1", "r2"]);
  });

  it("remembers which server database it synced with, and keeps going when it is the same one", async () => {
    db.unsynced = [answer("e1")];
    fetchMock.mockResolvedValueOnce(reply({ epoch: "aaaa", accepted: ["e1"], cursor: 3 }));
    await syncNow();
    expect(useStore.getState().sync.epoch).toBe("aaaa");
    fetchMock.mockResolvedValueOnce(reply({ epoch: "aaaa", cursor: 4 }));
    await syncNow();
    expect(sent().map((c) => c.body.cursor)).toEqual([7, 3]);
    expect([...db.synced]).toEqual(["e1"]);
  });

  it("sends everything again and downloads from the start when the server's database was replaced", async () => {
    useStore.setState({ sync: { ...useStore.getState().sync, cursor: 500, epoch: "old" } });
    db.unsynced = [answer("e1"), answer("e2")];
    db.synced = new Set(["e1", "e2"]);
    // Cursor 500 belongs to the old database; the restored one only goes up to 120.
    fetchMock
      .mockResolvedValueOnce(reply({ epoch: "new", cursor: 500 }))
      .mockImplementationOnce(async (_url, init) => {
        const ids = (JSON.parse(String(init.body)) as { events: AppEvent[] }).events.map((e) => e.id);
        return reply({ epoch: "new", accepted: ids, cursor: 120, events: [answer("r1")] });
      });
    await syncNow();
    const calls = sent();
    expect(calls).toHaveLength(2);
    expect(calls[1].body.cursor).toBe(0);
    expect((calls[1].body.events as AppEvent[]).map((e) => e.id)).toEqual(["e1", "e2"]);
    expect([...db.synced].sort()).toEqual(["e1", "e2"]);
    expect(useStore.getState().sync).toMatchObject({ epoch: "new", cursor: 120, status: "idle" });
  });

  it("adopts the epoch of an older device without resending anything", async () => {
    db.synced = new Set(["e1"]);
    fetchMock.mockResolvedValueOnce(reply({ epoch: "first", cursor: 9 }));
    await syncNow();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(useStore.getState().sync).toMatchObject({ epoch: "first", cursor: 9 });
    expect([...db.synced]).toEqual(["e1"]);
  });

  it("uploads a big backlog in batches of 500", async () => {
    db.unsynced = Array.from({ length: 700 }, (_, i) => answer(`e${i}`));
    fetchMock.mockImplementation(async (_url, init) => {
      const ids = (JSON.parse(String(init.body)) as { events: AppEvent[] }).events.map((e) => e.id);
      return reply({ accepted: ids, cursor: 1 });
    });
    await syncNow();
    expect(sent().map((c) => (c.body.events as AppEvent[]).length)).toEqual([500, 200]);
    expect(db.synced.size).toBe(700);
  });

  it("signs the device out when the server no longer knows the session", async () => {
    fetchMock.mockResolvedValueOnce(new Response("{}", { status: 401 }));
    await syncNow();
    const s = useStore.getState();
    expect(s.family.account).toBeUndefined();
    expect(s.sync.status).toBe("signed-out");
    expect(s.family.updatedAt).toBe(0);
  });

  it("reports a server error and keeps the events for next time", async () => {
    db.unsynced = [answer("e1")];
    fetchMock.mockResolvedValueOnce(new Response("oops", { status: 503 }));
    await syncNow();
    expect(useStore.getState().sync).toMatchObject({ status: "error", error: "Sync failed (503)", cursor: 7 });
    expect(db.synced.size).toBe(0);
  });

  it("says the site is under maintenance and keeps the events for later", async () => {
    db.unsynced = [answer("e1")];
    fetchMock.mockResolvedValueOnce(new Response("{}", { status: 503, headers: { "x-maintenance": "on" } }));
    await syncNow();
    expect(useStore.getState().sync).toMatchObject({ status: "error", error: MAINTENANCE_SYNC_MESSAGE, cursor: 7 });
    expect(db.synced.size).toBe(0);
  });

  it("calls a dropped connection offline rather than an error", async () => {
    fetchMock.mockImplementationOnce(async () => {
      online = false;
      throw new TypeError("Failed to fetch");
    });
    await syncNow();
    expect(useStore.getState().sync).toMatchObject({ status: "offline", error: "Failed to fetch" });
  });

  it("shares one request between calls made while a sync is running", async () => {
    let release!: (r: Response) => void;
    fetchMock.mockReturnValueOnce(new Promise((r) => (release = r)));
    const a = syncNow();
    const b = syncNow();
    expect(b).toBe(a);
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    release(reply({ cursor: 9 }));
    await a;
    fetchMock.mockResolvedValueOnce(reply({ cursor: 9 }));
    await syncNow();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});

describe("startBackgroundSync", () => {
  it("syncs soon after start, after changes, on reconnect, when hidden and every two minutes", async () => {
    vi.useFakeTimers();
    try {
      // Failed replies keep the store's profiles untouched, so only the triggers under test schedule a sync
      // (a successful sync re-schedules itself; see the known-bug test below).
      fetchMock.mockImplementation(async () => new Response("", { status: 503 }));
      startBackgroundSync();
      startBackgroundSync(); // A second call adds nothing.
      await vi.advanceTimersByTimeAsync(999);
      expect(fetchMock).toHaveBeenCalledTimes(0);
      await vi.advanceTimersByTimeAsync(1);
      expect(fetchMock).toHaveBeenCalledTimes(1);

      // New progress uploads a few seconds later, once, however many changes there were.
      useStore.setState({ events: [answer("n1")] });
      await vi.advanceTimersByTimeAsync(2000);
      useStore.setState({ events: [answer("n1"), answer("n2")] });
      await vi.advanceTimersByTimeAsync(3999);
      expect(fetchMock).toHaveBeenCalledTimes(1);
      await vi.advanceTimersByTimeAsync(1);
      expect(fetchMock).toHaveBeenCalledTimes(2);

      // Unrelated state (toasts) doesn't trigger an upload.
      useStore.setState({ toasts: [] });
      await vi.advanceTimersByTimeAsync(5000);
      expect(fetchMock).toHaveBeenCalledTimes(2);

      window.dispatchEvent(new Event("offline"));
      expect(useStore.getState().sync.status).toBe("offline");
      window.dispatchEvent(new Event("online"));
      await vi.advanceTimersByTimeAsync(500);
      expect(fetchMock).toHaveBeenCalledTimes(3);

      // Leaving the app uploads straight away; coming back syncs shortly after.
      vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
      document.dispatchEvent(new Event("visibilitychange"));
      await vi.advanceTimersByTimeAsync(0);
      expect(fetchMock).toHaveBeenCalledTimes(4);
      vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
      document.dispatchEvent(new Event("visibilitychange"));
      await vi.advanceTimersByTimeAsync(500);
      expect(fetchMock).toHaveBeenCalledTimes(5);

      const before = fetchMock.mock.calls.length;
      await vi.advanceTimersByTimeAsync(120_000);
      expect(fetchMock.mock.calls.length).toBe(before + 1);
    } finally {
      vi.useRealTimers();
    }
  });

  // An idle, online device syncs every 2 minutes, not every few seconds after its own sync.
  it("stays quiet while nothing changes after a successful sync", async () => {
    vi.resetModules();
    const store = (await import("./store")).useStore;
    const sync = await import("./sync");
    store.setState({ ...useStore.getState() });
    vi.useFakeTimers();
    try {
      fetchMock.mockImplementation(async () => reply({ cursor: 7 }));
      sync.startBackgroundSync();
      await vi.advanceTimersByTimeAsync(60_000);
      expect(fetchMock).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });
});

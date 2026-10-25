import { beforeEach, describe, expect, it, vi } from "vitest";

const local = vi.hoisted(() => ({ kv: new Map<string, unknown>(), events: [] as unknown[], cleared: 0 }));
vi.mock("./localdb", () => ({
  setKV: vi.fn(async (k: string, v: unknown) => void local.kv.set(k, v)),
  getKV: vi.fn(async (k: string) => local.kv.get(k)),
  allEvents: vi.fn(async () => local.events),
  putEvents: vi.fn(),
  deleteProfileEvents: vi.fn(),
  clearAll: vi.fn(async () => void local.cleared++),
}));

import { DEFAULT_FRAMEWORK } from "@/content/frameworks";
import * as localdb from "./localdb";
import { dayKey, type AppEvent, type ChildSettings, type FamilyInfo, type Profile } from "./model";
import { MAX_CHILDREN, TRIAL_DAYS } from "./plan";
import { STRETCH_QUEST, STRETCH_REWARD } from "./goal";
import { setRemoteFlags } from "./remoteFlags";
import { SEASON_REWARD } from "./seasons";
import { derivedFor, eventsFor, TEST_COINS, useStore } from "./store";
import { schoolYearOf } from "./schoolYear";

const child = { name: "A", avatar: "ollie", colour: "#fff", grade: "2" as const };
const st = () => useStore.getState();
const family = (patch: Partial<FamilyInfo> = {}): FamilyInfo => ({ plan: "trial", trialEndsAt: 1, updatedAt: 100, ...patch });
const answer = (correct = true, ms = 4000) => ({ type: "answer" as const, unit: "math/2/add", correct, attempts: 1, revealed: false, ms, mode: "practice" as const });
const coins = (profileId: string, reward: number): AppEvent => ({ id: `gift-${reward}`, profileId, t: 1, type: "quest", quest: "gift", day: "2020-01-01", reward });

beforeEach(() => {
  local.kv.clear();
  local.events = [];
  local.cleared = 0;
  vi.mocked(localdb.putEvents).mockClear();
  vi.mocked(localdb.deleteProfileEvents).mockClear();
  useStore.setState({
    ready: false,
    profiles: [],
    activeId: null,
    settings: {},
    events: [],
    toasts: [],
    pin: null,
    classwork: [],
    family: family(),
    sync: { cursor: 0, status: "signed-out", dirtyProfiles: [], dirtyFamily: false },
  });
});

describe("adding a child", () => {
  it("stops at the family limit, and a removed child frees a place", () => {
    const ids = Array.from({ length: MAX_CHILDREN }, (_, i) => st().addProfile({ ...child, name: `C${i}` }));
    expect(ids.every(Boolean)).toBe(true);
    expect(st().profiles.filter((p) => !p.deleted)).toHaveLength(MAX_CHILDREN);
    expect(st().addProfile({ ...child, name: "Extra" })).toBe("");
    expect(st().profiles.filter((p) => !p.deleted)).toHaveLength(MAX_CHILDREN);
    st().removeProfile(ids[0]);
    expect(st().addProfile({ ...child, name: "Again" })).not.toBe("");
    expect(st().profiles.filter((p) => !p.deleted)).toHaveLength(MAX_CHILDREN);
  });

  it("tidies the name, starts with age-matched settings, and makes the child active and due for upload", () => {
    const little = st().addProfile({ ...child, name: "   ", grade: "k" });
    const big = st().addProfile({ ...child, name: "A very long name that goes on and on" });
    const [a, b] = st().profiles;
    expect(a).toMatchObject({ name: "Friend", framework: DEFAULT_FRAMEWORK, companion: "ollie", title: "rookie", confetti: "classic" });
    expect(b.name).toHaveLength(20);
    expect(st().settings[little]).toMatchObject({ dailyGoalMinutes: 10, autoRead: true, showTimer: false });
    expect(st().settings[big]).toMatchObject({ dailyGoalMinutes: 15, autoRead: false, showTimer: true });
    expect(st().activeId).toBe(big);
    expect(st().sync.dirtyProfiles).toEqual([little, big]);
    expect(local.kv.get("activeId")).toBe(big);
    expect(local.kv.get("profiles")).toEqual(st().profiles);
  });
});

describe("loading the device", () => {
  it("restores what was saved, treating profiles from before provinces as BC", async () => {
    const old = { id: "p1", name: "Ava", grade: "3", updatedAt: 1 } as Profile;
    const saved = family({ account: { email: "p@example.com", familyId: "f" } });
    local.kv.set("deviceId", "dev-1");
    local.kv.set("profiles", [old]);
    local.kv.set("activeId", "p1");
    local.kv.set("family", saved);
    local.kv.set("sync", { cursor: 33, dirtyProfiles: ["p1"], dirtyFamily: true });
    local.events = [{ id: "e1", profileId: "p1", t: 5, type: "secret", code: "konami" }];
    await st().init();
    const s = st();
    expect(s.ready).toBe(true);
    expect(s.deviceId).toBe("dev-1");
    expect(s.profiles[0].framework).toBe(DEFAULT_FRAMEWORK);
    expect(s.activeId).toBe("p1");
    expect(s.family).toEqual(saved);
    expect(s.sync).toMatchObject({ cursor: 33, dirtyProfiles: ["p1"], dirtyFamily: true, status: "idle" });
    expect(s.events).toHaveLength(1);
  });

  it("starts a new device with its own id and a fresh trial, and loads only once", async () => {
    const before = Date.now();
    await st().init();
    const s = st();
    expect(s.deviceId).toMatch(/\S{8,}/);
    expect(local.kv.get("deviceId")).toBe(s.deviceId);
    expect(s.family.plan).toBe("trial");
    expect(s.family.trialEndsAt).toBeGreaterThanOrEqual(before + TRIAL_DAYS * 86_400_000);
    expect(local.kv.get("family")).toEqual(s.family);
    expect(s.sync.status).toBe("signed-out");

    local.kv.set("deviceId", "other");
    await st().init();
    expect(st().deviceId).toBe(s.deviceId);
  });
});

describe("changing a child", () => {
  it("records profile and settings edits for upload with a newer updatedAt", () => {
    const id = st().addProfile(child);
    st().setSync({ dirtyProfiles: [] });
    const before = st().profiles[0].updatedAt;
    st().updateProfile(id, { name: "Bea" });
    expect(st().profiles[0]).toMatchObject({ name: "Bea" });
    expect(st().profiles[0].updatedAt).toBeGreaterThanOrEqual(before);
    st().updateSettings(id, { sound: false });
    st().updateSettings("unknown", { calmMotion: true });
    expect(st().settings[id].sound).toBe(false);
    // A child with no settings yet starts from the defaults.
    expect(st().settings.unknown).toMatchObject({ calmMotion: true, dailyGoalMinutes: 15 });
    expect(st().sync.dirtyProfiles).toEqual([id, "unknown"]);
  });

  it("remembers which school year a changed grade is for, so the back-to-school card asks once", () => {
    const id = st().addProfile({ ...child, grade: "3" });
    expect(st().profiles.at(-1)!.gradeYear).toBeUndefined();
    st().updateProfile(id, { name: "Bea", grade: "3" }); // same grade: nothing to record
    expect(st().profiles.find((p) => p.id === id)!.gradeYear).toBeUndefined();
    st().updateProfile(id, { grade: "4" });
    expect(st().profiles.find((p) => p.id === id)!.gradeYear).toBe(schoolYearOf(Date.now()));
    st().updateProfile(id, { gradeYear: 2020 });
    expect(st().profiles.find((p) => p.id === id)!.gradeYear).toBe(2020);
  });

  it("removing a child forgets their history on this device", () => {
    const keep = st().addProfile({ ...child, name: "Keep" });
    const gone = st().addProfile({ ...child, name: "Gone" });
    st().log([answer()]);
    st().setActive(keep);
    st().log([answer()]);
    st().setActive(gone);
    st().removeProfile(gone);
    expect(st().events.every((e) => e.profileId === keep)).toBe(true);
    expect(localdb.deleteProfileEvents).toHaveBeenCalledWith(gone);
    expect(st().profiles.find((p) => p.id === gone)?.deleted).toBe(true);
    expect(st().activeId).toBeNull();
  });

  it("removing another child keeps the active one", () => {
    const a = st().addProfile(child);
    const b = st().addProfile(child);
    st().removeProfile(a);
    expect(st().activeId).toBe(b);
  });

  it("a progress reset hides earlier events from the child's stats", async () => {
    const id = st().addProfile(child);
    st().log([answer(), answer()]);
    expect(derivedFor(st(), id).totals.answers).toBe(2);
    // Trophies are stamped up to ~150 ms after the answers that earned them.
    await new Promise((r) => setTimeout(r, 200));
    st().resetProgress(id);
    expect(eventsFor(st().events, st().profiles[0])).toEqual([]);
    expect(derivedFor(st(), id).totals.answers).toBe(0);
    // The events themselves stay, so other devices can't bring them back.
    expect(st().events.length).toBeGreaterThan(0);
    expect(eventsFor(st().events, undefined)).toEqual([]);
  });
});

describe("logging practice", () => {
  it("ignores events when no child is playing", () => {
    st().log([answer()]);
    expect(st().events).toEqual([]);
    expect(localdb.putEvents).not.toHaveBeenCalled();
  });

  it("stamps events for the active child, awards the first trophy and saves everything", () => {
    const id = st().addProfile(child);
    st().log([answer()]);
    const events = st().events;
    expect(events[0]).toMatchObject({ type: "answer", profileId: id });
    expect(events[0].id).toBeTruthy();
    expect(events.some((e) => e.type === "trophy" && e.trophy === "first-answer")).toBe(true);
    expect(events.every((e) => e.profileId === id)).toBe(true);
    expect(st().toasts.some((t) => t.kind === "trophy" && t.title === "First Steps")).toBe(true);
    expect(vi.mocked(localdb.putEvents).mock.calls[0][0]).toEqual(events);
    // Earned once: answering again doesn't award it twice.
    st().log([answer()]);
    expect(st().events.filter((e) => e.type === "trophy" && e.trophy === "first-answer")).toHaveLength(1);
  });

  it("says on the level-up toast when a new arcade game opens, unless games are off", () => {
    st().addProfile(child);
    st().log(Array.from({ length: 6 }, () => answer()));
    const level = st().toasts.find((t) => t.kind === "level");
    expect(level?.title).toBe("Level 2!");
    expect(level?.subtitle).toBe("New game unlocked: Map Dash!");
    expect(level?.icon).toBe("🗺️");

    useStore.setState({ toasts: [] });
    const quiet = st().addProfile({ ...child, name: "B" });
    st().updateSettings(quiet, { gamesEnabled: false });
    st().log(Array.from({ length: 6 }, () => answer()));
    expect(st().toasts.find((t) => t.kind === "level")?.subtitle).toBe("You levelled up!");
  });

  it("completes today's answer quest once, and puts a level-up first", () => {
    const id = st().addProfile(child);
    st().log(Array.from({ length: 40 }, () => answer()));
    const today = dayKey(Date.now());
    const quests = st().events.filter((e): e is Extract<AppEvent, { type: "quest" }> => e.type === "quest");
    expect(quests.map((q) => q.quest)).toEqual(expect.arrayContaining([expect.stringMatching(/^answers/)]));
    expect(quests.filter((q) => q.day === today).every((q) => q.profileId === id)).toBe(true);
    expect(st().toasts[0]).toMatchObject({ kind: "level" });
    expect(st().toasts[0].title).toMatch(/^Level \d+!$/);
    expect(st().toasts.some((t) => t.title === "Quest complete!")).toBe(true);
    const claimed = quests.length;
    st().log([answer()]);
    expect(st().events.filter((e) => e.type === "quest").length).toBe(claimed);
  });

  it("gives the stretch bonus once a stretch goal's minutes are reached", () => {
    st().addProfile(child);
    const today = dayKey(Date.now());
    st().log([{ type: "goal", day: today, level: "stretch", minutes: 20 }]);
    st().log(Array.from({ length: 19 }, () => answer(true, 60_000)));
    expect(st().events.some((e) => e.type === "quest" && e.quest === STRETCH_QUEST)).toBe(false);
    st().log([answer(true, 60_000)]);
    const bonus = st().events.filter((e) => e.type === "quest" && e.quest === STRETCH_QUEST);
    expect(bonus).toEqual([expect.objectContaining({ reward: STRETCH_REWARD, day: today })]);
    st().log([answer(true, 60_000)]);
    expect(st().events.filter((e) => e.type === "quest" && e.quest === STRETCH_QUEST)).toHaveLength(1);
  });

  it("says when a festival sticker is found and adds the coins once the festival page is full", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    try {
      vi.setSystemTime(new Date("2026-10-20T12:00:00"));
      const id = st().addProfile(child);
      // Five earlier festival days with a flawless lesson and answers in three subjects.
      const earlier = ["2026-10-01", "2026-10-03", "2026-10-06", "2026-10-09", "2026-10-12"].flatMap((day, i): AppEvent[] => {
        const t = new Date(`${day}T12:00:00`).getTime();
        return [
          { id: `s${i}`, profileId: id, t, type: "session", mode: "practice", scope: "mix", total: 5, correct: 5, ms: 60_000 },
          ...["math", "science", "social"].flatMap((subject, j) =>
            Array.from({ length: 4 }, (_, k): AppEvent => ({ id: `a${i}${j}${k}`, profileId: id, t: t + 1 + j * 10 + k, type: "answer", unit: `2/${subject}/u`, correct: true, attempts: 1, revealed: false, ms: 3000, mode: "practice" })),
          ),
        ];
      });
      useStore.setState({ events: earlier, toasts: [] });
      st().log([{ type: "session", mode: "practice", scope: "mix", total: 5, correct: 4, ms: 60_000 }]);
      const claim = st().events.filter((e) => e.type === "quest" && e.quest === "s-leaf");
      expect(claim).toEqual([expect.objectContaining({ day: "2026-10-01", reward: SEASON_REWARD })]);
      expect(st().toasts.map((t) => t.title)).toEqual(expect.arrayContaining(["New Leaf Festival sticker!", "Leaf Festival page full!"]));
      st().log([{ type: "session", mode: "practice", scope: "mix", total: 5, correct: 4, ms: 60_000 }]);
      expect(st().events.filter((e) => e.type === "quest" && e.quest === "s-leaf")).toHaveLength(1);
      expect(st().events.some((e) => e.type === "trophy" && e.trophy === "season-1")).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });

  it("gives nothing for festivals while they are switched off", () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    try {
      vi.setSystemTime(new Date("2026-10-20T12:00:00"));
      setRemoteFlags({ flags: { "seasonal-events": false }, variants: {} });
      st().addProfile(child);
      st().log([{ type: "session", mode: "practice", scope: "mix", total: 5, correct: 5, ms: 60_000 }]);
      expect(st().toasts.some((t) => t.title.includes("Festival"))).toBe(false);
    } finally {
      setRemoteFlags({ flags: {}, variants: {} });
      vi.useRealTimers();
    }
  });

  it("toasts can be dismissed one at a time", () => {
    st().pushToast({ kind: "info", title: "One", subtitle: "", icon: "1" });
    st().pushToast({ kind: "info", title: "Two", subtitle: "", icon: "2" });
    st().dismissToast(st().toasts[0].id);
    expect(st().toasts.map((t) => t.title)).toEqual(["Two"]);
  });
});

describe("the shop", () => {
  it("buys with coins, equips the item and refuses what the child can't afford", () => {
    const id = st().addProfile(child);
    expect(st().buy("hoot")).toBe(false);
    useStore.setState({ events: [coins(id, 130)] });
    expect(st().buy("hoot")).toBe(true);
    expect(st().events.filter((e) => e.type === "buy")).toEqual([expect.objectContaining({ item: "hoot", cost: 120 })]);
    expect(st().profiles[0].companion).toBe("hoot");
    expect(derivedFor(st(), id).coins).toBeLessThan(130);
    // Owned items and free ones are just equipped, never bought again.
    expect(st().buy("ollie")).toBe(true);
    expect(st().buy("hoot")).toBe(true);
    expect(st().events.filter((e) => e.type === "buy")).toHaveLength(1);
    expect(st().profiles[0].companion).toBe("hoot");
    st().equip("rookie");
    st().equip("classic");
    expect(st().profiles[0]).toMatchObject({ title: "rookie", confetti: "classic" });
  });

  it("gives an admin account's children unlimited coins, without storing any", () => {
    const id = st().addProfile(child);
    expect(st().buy("hoot")).toBe(false);
    setRemoteFlags({ flags: {}, variants: {}, testCoins: true });
    try {
      expect(derivedFor(st(), id).coins).toBe(TEST_COINS);
      expect(st().buy("hoot")).toBe(true);
      const d = derivedFor(st(), id);
      // Only the balance changes: trophies still count coins really earned (here, a shop trophy's reward).
      expect(d.coins).toBe(TEST_COINS - 120 + d.coinsEarned);
      expect(d.coinsEarned).toBeLessThan(120);
      expect(st().events.filter((e) => e.type === "buy")).toHaveLength(1);
    } finally {
      setRemoteFlags({ flags: {}, variants: {} });
    }
    expect(derivedFor(st(), id).coins).toBeLessThan(0);
  });

  it("keeps level-locked items locked whatever the coins", () => {
    const id = st().addProfile(child);
    useStore.setState({ events: [coins(id, 5000)] });
    expect(st().buy("frost")).toBe(false);
    expect(st().buy("not-an-item")).toBe(false);
    st().setActive(null);
    expect(st().buy("hoot")).toBe(false);
  });

  it("places room items, buying them first when needed", () => {
    const id = st().addProfile(child);
    expect(st().placeRoomItem("room-wall-sun")).toBe(false);
    expect(st().placeRoomItem("room-floor-wood")).toBe(true);
    useStore.setState({ events: [coins(id, 1000)] });
    expect(st().placeRoomItem("room-wall-sunset")).toBe(false); // Needs level 8.
    expect(st().placeRoomItem("room-wall-sun")).toBe(true);
    expect(st().placeRoomItem("room-wall-sun")).toBe(true);
    expect(st().events.filter((e) => e.type === "buy")).toEqual([expect.objectContaining({ item: "room-wall-sun", cost: 60 })]);
    expect(st().profiles[0].room).toEqual({ floor: "room-floor-wood", wall: "room-wall-sun" });
    expect(st().placeRoomItem("room-nope")).toBe(false);
  });
});

describe("the parent PIN", () => {
  it("is open until set, then only the right PIN passes, stored salted and hashed", async () => {
    expect(await st().checkPin("0000")).toBe(true);
    await st().setPin("2468");
    const pin = st().pin!;
    expect(pin.hash).toMatch(/^[0-9a-f]{64}$/);
    expect(JSON.stringify(pin)).not.toContain("2468");
    expect(local.kv.get("pin")).toEqual(pin);
    expect(await st().checkPin("2468")).toBe(true);
    expect(await st().checkPin("1357")).toBe(false);
    await st().setPin("2468");
    expect(st().pin!.salt).not.toBe(pin.salt);
  });
});

describe("family record and sync state", () => {
  it("a change on this device is newer and due for upload; one from the server is not", () => {
    st().setFamily({ plan: "premium" }, true);
    expect(st().family).toMatchObject({ plan: "premium", updatedAt: 100 });
    expect(st().sync.dirtyFamily).toBe(false);
    st().setFamily({ plan: "free" });
    expect(st().family.updatedAt).toBeGreaterThan(100);
    expect(st().sync.dirtyFamily).toBe(true);
  });

  it("saves only the lasting part of the sync state", () => {
    st().setSync({ status: "error", error: "boom", cursor: 9 });
    expect(local.kv.get("sync")).toEqual({ cursor: 9, lastSyncAt: undefined, dirtyProfiles: [], dirtyFamily: false });
  });
});

describe("merging from the server", () => {
  const profile = (id: string, updatedAt: number, name: string): Profile => ({ id, name, avatar: "ollie", colour: "#fff", grade: "2", framework: "ca-on", createdAt: 1, updatedAt });
  const settings = (profileId: string, updatedAt: number, sound: boolean) => ({ profileId, updatedAt, sound }) as ChildSettings;
  const ev = (id: string): AppEvent => ({ id, profileId: "a", t: 1, type: "secret", code: id });

  it("adds unseen events once, and the newer profile and settings win", () => {
    useStore.setState({
      events: [ev("e1")],
      profiles: [profile("a", 200, "Mine"), profile("b", 100, "Old")],
      settings: { a: settings("a", 200, true), b: settings("b", 100, true) },
    });
    st().mergeRemote({
      events: [ev("e1"), ev("e2")],
      profiles: [profile("a", 150, "Theirs"), profile("b", 300, "New"), { ...profile("c", 1, "Cleo"), framework: undefined } as unknown as Profile],
      settings: [settings("a", 100, false), settings("b", 300, false), settings("c", 1, false)],
    });
    const s = st();
    expect(s.events.map((e) => e.id)).toEqual(["e1", "e2"]);
    expect(localdb.putEvents).toHaveBeenCalledWith([ev("e2")], 1);
    expect(s.profiles.map((p) => p.name)).toEqual(["Mine", "New", "Cleo"]);
    expect(s.profiles[2].framework).toBe(DEFAULT_FRAMEWORK);
    expect(s.settings.a.sound).toBe(true);
    expect(s.settings.b.sound).toBe(false);
    expect(s.settings.c).toBeDefined();
  });

  it("keeps the device's sign-in when the server sends the family, and replaces teacher work", () => {
    const account = { email: "p@example.com", familyId: "f" };
    useStore.setState({ family: family({ account }), classwork: [{ profileId: "a", classId: "old", className: "Old", unitKeys: [] }] });
    st().mergeRemote({ events: [], profiles: [], settings: [], family: family({ plan: "premium", updatedAt: 500 }) });
    expect(st().family).toMatchObject({ plan: "premium", updatedAt: 500, account });
    expect(local.kv.get("family")).toEqual(st().family);
    expect(st().classwork).toHaveLength(1);
    st().mergeRemote({ events: [], profiles: [], settings: [], classwork: [] });
    expect(st().classwork).toEqual([]);
    expect(localdb.putEvents).not.toHaveBeenCalled();
  });
});

describe("wiping the device", () => {
  it("clears the database and starts over signed out", async () => {
    st().addProfile(child);
    st().log([answer()]);
    await st().setPin("1234");
    st().setFamily({ account: { email: "p@example.com", familyId: "f" } });
    await st().wipeDevice();
    const s = st();
    expect(local.cleared).toBe(1);
    expect(s).toMatchObject({ profiles: [], activeId: null, settings: {}, events: [], pin: null, classwork: [] });
    expect(s.family.account).toBeUndefined();
    expect(s.sync).toEqual({ cursor: 0, status: "signed-out", dirtyProfiles: [], dirtyFamily: false });
  });
});

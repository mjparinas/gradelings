import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const dir = mkdtempSync(join(tmpdir(), "grademap-sync-rules-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;

let sync: { POST: (req: Request) => Promise<Response> };
let dbm: typeof import("@/server/db");
let auth: typeof import("@/server/auth");

beforeAll(async () => {
  sync = (await import("@/app/api/sync/route")) as typeof sync;
  dbm = await import("@/server/db");
  auth = await import("@/server/auth");
  await dbm.db();
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let n = 0;
async function account(role = "parent") {
  const familyId = `fam_sync_${++n}`;
  const parentId = `par_sync_${n}`;
  await dbm.run("INSERT INTO families (id, plan, created_at, updated_at, trial_ends_at) VALUES (?, 'trial', 1, 1, ?)", [familyId, Date.now() + 86_400_000]);
  await dbm.run("INSERT INTO parents (id, family_id, email, password_hash, created_at, role) VALUES (?, ?, ?, '!', 1, ?)", [parentId, familyId, `s${n}@example.com`, role]);
  const { token } = await auth.createSession(parentId, familyId);
  return { familyId, parentId, cookie: `gm_session=${encodeURIComponent(token)}` };
}
function req(body: unknown, cookie?: string, headers: Record<string, string> = {}): Request {
  return new Request("http://localhost/api/sync/", {
    method: "POST",
    headers: { "content-type": "application/json", host: "localhost", ...(cookie ? { cookie } : {}), ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}
type Resp = { accepted: string[]; cursor: number; more: boolean; events: { id: string }[]; profiles: { id: string; name: string; grade: string; framework?: string; deleted?: boolean }[]; settings: { profileId: string; v?: number }[] };
const go = async (cookie: string, body: unknown = {}) => (await (await sync.POST(req(body, cookie))).json()) as Resp;
const profile = (id: string, extra: Record<string, unknown> = {}) => ({ id, name: "Maya", grade: "4", avatar: "ollie", colour: "#fff", updatedAt: 1000, ...extra });
const event = (id: string, profileId: string, extra: Record<string, unknown> = {}) => ({ id, profileId, type: "answer", t: Date.now() - 1000, ...extra });
const rowCount = async (sql: string, args: (string | number)[] = []) => Number((await dbm.query<{ n: number }>(sql, args))[0].n);

describe("who may sync", () => {
  it("refuses other origins, signed-out callers and unreadable bodies", async () => {
    const { cookie } = await account();
    expect((await sync.POST(req({}, cookie, { origin: "https://evil.test" }))).status).toBe(403);
    expect((await sync.POST(req({}))).status).toBe(401);
    expect((await sync.POST(req("not json", cookie))).status).toBe(400);
    expect((await sync.POST(req({}, cookie))).status).toBe(200);
  });

  it("limits a family to 300 syncs per 10 minutes", async () => {
    const { cookie, familyId } = await account();
    await dbm.run("INSERT INTO rate_limits (key, count, reset_at) VALUES (?, 299, ?)", [`sync:${familyId}`, Date.now() + 600_000]);
    expect((await sync.POST(req({}, cookie))).status).toBe(200); // the 300th
    const over = await sync.POST(req({}, cookie));
    expect(over.status).toBe(429);
    expect((await over.json()).error).toContain("Syncing too often");
  });

  it("ignores non-array lists", async () => {
    const { cookie } = await account();
    const res = await go(cookie, { profiles: "x", events: { a: 1 }, settings: 5 });
    expect(res.profiles).toEqual([]);
    expect(res.events).toEqual([]);
  });
});

describe("child records", () => {
  it("cleans names, rejects bad grades and nameless children, and keeps deleted records as they are", async () => {
    const { cookie } = await account();
    await go(cookie, {
      profiles: [
        profile("c-ok", { name: "  Ma\u0000ya \n  Lee\t " }),
        profile("c-long", { name: "x".repeat(60) }),
        profile("c-blank", { name: " \u0001 " }),
        profile("c-grade", { grade: "99" }),
        profile("c-noname", { name: 5 }),
        { id: "c-del", deleted: true, updatedAt: 5 },
      ],
    });
    const res = await go(cookie);
    const by = Object.fromEntries(res.profiles.map((p) => [p.id, p]));
    expect(by["c-ok"].name).toBe("Maya Lee");
    expect(by["c-long"].name).toHaveLength(40);
    expect(by["c-blank"]).toBeUndefined();
    expect(by["c-grade"]).toBeUndefined();
    expect(by["c-noname"]).toBeUndefined();
    expect(by["c-del"]).toMatchObject({ id: "c-del", deleted: true });
  });

  it("keeps a known province and drops an unknown one", async () => {
    const { cookie } = await account();
    await go(cookie, { profiles: [profile("p-bc", { framework: "ca-bc" }), profile("p-xx", { framework: "narnia" })] });
    const by = Object.fromEntries((await go(cookie)).profiles.map((p) => [p.id, p]));
    expect(by["p-bc"].framework).toBe("ca-bc");
    expect(by["p-xx"].framework).toBeUndefined();
  });

  it("checks ids: 1 to 64 characters", async () => {
    const { cookie } = await account();
    const ok64 = "a".repeat(64);
    await go(cookie, { profiles: [profile(ok64), profile("a".repeat(65)), profile(""), profile(7 as unknown as string), { ...profile("noupdate"), updatedAt: "x" }] });
    expect((await go(cookie)).profiles.map((p) => p.id)).toEqual([ok64]);
  });

  it("only takes newer versions of a child", async () => {
    const { cookie } = await account();
    await go(cookie, { profiles: [profile("c1", { name: "First", updatedAt: 2000 })] });
    await go(cookie, { profiles: [profile("c1", { name: "Older", updatedAt: 1999 })] });
    expect((await go(cookie)).profiles[0].name).toBe("First");
    await go(cookie, { profiles: [profile("c1", { name: "Same", updatedAt: 2000 })] });
    expect((await go(cookie)).profiles[0].name).toBe("First");
    await go(cookie, { profiles: [profile("c1", { name: "Newer", updatedAt: 2001 })] });
    expect((await go(cookie)).profiles[0].name).toBe("Newer");
  });

  it("never stores a record too big to read back, and skips children past the storage cap", async () => {
    const { cookie } = await account();
    await go(cookie, { profiles: [profile("big", { name: "ok", note: "y".repeat(4000) })] });
    expect((await go(cookie)).profiles).toEqual([]);
    await go(cookie, { profiles: [profile("edge", { note: "z".repeat(3800) })] });
    expect((await go(cookie)).profiles.map((p) => p.id)).toEqual(["edge"]);
  });

  it("allows five children, frees a place when one is deleted, and needs a place to restore one", async () => {
    const { cookie } = await account();
    const six = Array.from({ length: 6 }, (_, i) => profile(`k${i}`, { name: `Kid${i}` }));
    await go(cookie, { profiles: six });
    expect((await go(cookie)).profiles.map((p) => p.id).sort()).toEqual(["k0", "k1", "k2", "k3", "k4"]);
    // delete one, and the sixth fits
    await go(cookie, { profiles: [{ id: "k0", deleted: true, updatedAt: 3000 }, profile("k5")] });
    const ids = (await go(cookie)).profiles.filter((p) => !p.deleted).map((p) => p.id).sort();
    expect(ids).toEqual(["k1", "k2", "k3", "k4", "k5"]);
    // restoring k0 needs a place: none free
    await go(cookie, { profiles: [profile("k0", { updatedAt: 4000 })] });
    expect((await go(cookie)).profiles.find((p) => p.id === "k0")!.deleted).toBe(true);
    // deleting and restoring the same record in one go nets out
    await go(cookie, { profiles: [{ id: "k1", deleted: true, updatedAt: 5000 }] });
    await go(cookie, { profiles: [profile("k0", { updatedAt: 6000 })] });
    expect((await go(cookie)).profiles.find((p) => p.id === "k0")!.deleted).toBeFalsy();
  });

  it("counts a new child and a deletion within one request", async () => {
    const { cookie } = await account();
    await go(cookie, { profiles: Array.from({ length: 5 }, (_, i) => profile(`m${i}`)) });
    await go(cookie, { profiles: [{ id: "m0", deleted: true, updatedAt: 2000 }, { id: "m1", deleted: true, updatedAt: 2000 }, profile("n1"), profile("n2"), profile("n3")] });
    const live = (await go(cookie)).profiles.filter((p) => !p.deleted).map((p) => p.id).sort();
    expect(live).toEqual(["m2", "m3", "m4", "n1", "n2"]);
  });

  it("deleting a child removes their events, class links and report shares", async () => {
    const { cookie, familyId } = await account();
    await go(cookie, { profiles: [profile("d1"), profile("d2")], events: [event("de1", "d1"), event("de2", "d2")] });
    await dbm.run("INSERT INTO class_members (class_id, profile_id, family_id, joined_at) VALUES ('c', 'd1', ?, 1)", [familyId]);
    await dbm.run("INSERT INTO class_members (class_id, profile_id, family_id, joined_at) VALUES ('c', 'd2', ?, 1)", [familyId]);
    await dbm.run("INSERT INTO class_assignment_students (class_id, unit_key, profile_id) VALUES ('c', 'u', 'd1')");
    await dbm.run("INSERT INTO report_shares (token_hash, family_id, profile_id, days, created_at, expires_at) VALUES ('t1', ?, 'd1', 7, 1, 2)", [familyId]);
    await dbm.run("INSERT INTO report_shares (token_hash, family_id, profile_id, days, created_at, expires_at) VALUES ('t2', ?, 'd2', 7, 1, 2)", [familyId]);
    await go(cookie, { profiles: [{ id: "d1", deleted: true, updatedAt: 9000 }] });
    expect(await rowCount("SELECT COUNT(*) AS n FROM events WHERE profile_id = 'd1'")).toBe(0);
    expect(await rowCount("SELECT COUNT(*) AS n FROM events WHERE profile_id = 'd2'")).toBe(1);
    expect(await rowCount("SELECT COUNT(*) AS n FROM class_members WHERE profile_id = 'd1'")).toBe(0);
    expect(await rowCount("SELECT COUNT(*) AS n FROM class_members WHERE profile_id = 'd2'")).toBe(1);
    expect(await rowCount("SELECT COUNT(*) AS n FROM class_assignment_students WHERE profile_id = 'd1'")).toBe(0);
    expect(await rowCount("SELECT COUNT(*) AS n FROM report_shares WHERE profile_id = 'd1'")).toBe(0);
    expect(await rowCount("SELECT COUNT(*) AS n FROM report_shares WHERE profile_id = 'd2'")).toBe(1);
  });

  it("a reset removes older events but keeps newer ones", async () => {
    const { cookie } = await account();
    const now = Date.now();
    await go(cookie, { profiles: [profile("r1")], events: [event("re-old", "r1", { t: now - 5000 }), event("re-new", "r1", { t: now - 100 })] });
    await go(cookie, { profiles: [profile("r1", { updatedAt: 2000, resetAt: now - 2000 })] });
    const ids = (await go(cookie)).events.map((e) => e.id);
    expect(ids).toEqual(["re-new"]);
    expect(await rowCount("SELECT COUNT(*) AS n FROM events WHERE id = 're-old'")).toBe(0);
  });

  it("never touches another family's child", async () => {
    const a = await account();
    const b = await account();
    await go(a.cookie, { profiles: [profile("shared-id", { name: "Mine" })] });
    await go(b.cookie, { profiles: [profile("shared-id", { name: "Stolen", updatedAt: 99999 })], events: [event("steal", "shared-id")], settings: [{ profileId: "shared-id", updatedAt: 5, v: 1 }] });
    expect((await go(a.cookie)).profiles[0].name).toBe("Mine");
    expect((await go(b.cookie)).profiles).toEqual([]);
    expect(await rowCount("SELECT COUNT(*) AS n FROM events WHERE id = 'steal'")).toBe(0);
    expect(await rowCount("SELECT COUNT(*) AS n FROM child_settings WHERE profile_id = 'shared-id'")).toBe(0);
  });
});

describe("events", () => {
  it("accepts good events once and skips bad ones", async () => {
    const { cookie } = await account();
    const now = Date.now();
    const events = [
      event("e-ok", "v1"),
      event("e-ok", "v1"), // duplicate
      event("e-type", "v1", { type: "hack" }),
      event("e-noprofile", "nobody"),
      { ...event("e-nostr", "v1"), t: "x" },
      event("e-future", "v1", { t: now + 2 * 86_400_000 }),
      event("e-soon", "v1", { t: now + 3_600_000 }),
      event("e-big", "v1", { pad: "p".repeat(2000) }),
      event("a".repeat(65), "v1"),
      event("e-pro", "v1", { type: "mystery" }),
      null,
    ];
    const res = await go(cookie, { profiles: [profile("v1")], events });
    expect(res.accepted.sort()).toEqual(["e-ok", "e-ok", "e-pro", "e-soon"].sort());
    expect(res.events.map((e) => e.id).sort()).toEqual(["e-ok", "e-pro", "e-soon"]);
    const again = await go(cookie, { events: [event("e-ok", "v1")] });
    expect(again.accepted).toEqual(["e-ok"]);
    expect(await rowCount("SELECT COUNT(*) AS n FROM events WHERE id = 'e-ok'")).toBe(1);
  });

  it("accepts every event type the app writes", async () => {
    const { cookie } = await account();
    const types = ["answer", "session", "play", "game", "trophy", "secret", "buy", "quest", "goal", "placement", "help", "video", "story", "mystery"];
    const res = await go(cookie, { profiles: [profile("tp")], events: types.map((t) => event(`ty-${t}`, "tp", { type: t })) });
    expect(res.accepted).toHaveLength(types.length);
  });

  it("acknowledges but doesn't store events of a deleted or reset child, up to the reset moment", async () => {
    const { cookie } = await account();
    const now = Date.now();
    await go(cookie, { profiles: [profile("g1", { resetAt: now - 3000 })] });
    const res = await go(cookie, { events: [event("g-before", "g1", { t: now - 3001 }), event("g-at", "g1", { t: now - 3000 }), event("g-after", "g1", { t: now - 2999 })] });
    expect(res.accepted.sort()).toEqual(["g-after", "g-at", "g-before"]);
    expect(res.events.map((e) => e.id)).toEqual(["g-after"]);
    await go(cookie, { profiles: [{ id: "g1", deleted: true, updatedAt: 9000 }] });
    const gone = await go(cookie, { events: [event("g-late", "g1")] });
    expect(gone.accepted).toEqual(["g-late"]);
    expect(gone.events).toEqual([]);
  });

  it("takes at most 1000 events and 20 children in one request", async () => {
    const { cookie } = await account();
    const events = Array.from({ length: 1001 }, (_, i) => event(`bulk-${i}`, "bk"));
    const res = await go(cookie, { profiles: [profile("bk")], events });
    expect(res.accepted).toHaveLength(1000);
    expect(res.accepted).not.toContain("bulk-1000");
    const two = await account();
    const many = Array.from({ length: 25 }, (_, i) => profile(`many${i}`));
    await go(two.cookie, { profiles: many });
    // only the first 20 were looked at, and only 5 fit
    expect((await go(two.cookie)).profiles).toHaveLength(5);
    expect((await go(two.cookie)).profiles.some((p) => p.id === "many20")).toBe(false);
  });

  it("stops storing at the family's event cap but still acknowledges nothing extra", async () => {
    const { cookie, familyId } = await account();
    await go(cookie, { profiles: [profile("cp")] });
    await dbm.run(
      "INSERT INTO events (id, family_id, profile_id, t, data) WITH RECURSIVE s(i) AS (SELECT 1 UNION ALL SELECT i + 1 FROM s WHERE i < 249999) SELECT 'fill-' || i, ?, 'cp', 1, '{}' FROM s",
      [familyId],
    );
    const res = await go(cookie, { events: [event("cap-1", "cp"), event("cap-2", "cp")] });
    expect(res.accepted).toEqual(["cap-1"]);
  });
});

describe("downloading", () => {
  it("returns events after the cursor and moves the cursor to the last one", async () => {
    const { cookie } = await account();
    const first = await go(cookie, { profiles: [profile("dl")], events: [event("dl-1", "dl"), event("dl-2", "dl"), event("dl-3", "dl")] });
    expect(first.events.map((e) => e.id)).toEqual(["dl-1", "dl-2", "dl-3"]);
    expect(first.more).toBe(false);
    expect(first.cursor).toBeGreaterThan(0);
    const next = await go(cookie, { cursor: first.cursor - 1 });
    expect(next.events.map((e) => e.id)).toEqual(["dl-3"]);
    expect(next.cursor).toBe(first.cursor);
    const none = await go(cookie, { cursor: first.cursor });
    expect(none.events).toEqual([]);
    expect(none.cursor).toBe(first.cursor);
    // a negative or junk cursor starts from the beginning
    expect((await go(cookie, { cursor: -50 })).events).toHaveLength(3);
    expect((await go(cookie, { cursor: "junk" })).events).toHaveLength(3);
  });

  it("says there is more when a page is full", async () => {
    const { cookie, familyId } = await account();
    await go(cookie, { profiles: [profile("pg")] });
    await dbm.run(
      "INSERT INTO events (id, family_id, profile_id, t, data) WITH RECURSIVE s(i) AS (SELECT 1 UNION ALL SELECT i + 1 FROM s WHERE i < 2000) SELECT 'pg-' || i, ?, 'pg', 1, json_object('id', 'pg-' || i) FROM s",
      [familyId],
    );
    const page = await go(cookie);
    expect(page.events).toHaveLength(2000);
    expect(page.more).toBe(true);
    const rest = await go(cookie, { cursor: page.cursor });
    expect(rest.events).toEqual([]);
    expect(rest.more).toBe(false);
  });

  it("returns only this family's data", async () => {
    const a = await account();
    const b = await account();
    await go(a.cookie, { profiles: [profile("ia")], events: [event("ev-a", "ia")] });
    await go(b.cookie, { profiles: [profile("ib")], events: [event("ev-b", "ib")] });
    const res = await go(a.cookie);
    expect(res.events.map((e) => e.id)).toEqual(["ev-a"]);
    expect(res.profiles.map((p) => p.id)).toEqual(["ia"]);
  });
});

describe("settings", () => {
  it("stores settings only for the family's own children, newest wins, and skips oversized ones", async () => {
    const { cookie } = await account();
    await go(cookie, { profiles: [profile("s1")] });
    await go(cookie, { settings: [{ profileId: "s1", updatedAt: 10, v: 1 }, { profileId: "nobody", updatedAt: 10, v: 9 }, { profileId: "s1", updatedAt: "x" }, { updatedAt: 5 }] });
    let res = await go(cookie);
    expect(res.settings).toEqual([{ profileId: "s1", updatedAt: 10, v: 1 }]);
    await go(cookie, { settings: [{ profileId: "s1", updatedAt: 10, v: 2 }] });
    expect((await go(cookie)).settings[0].v).toBe(1);
    await go(cookie, { settings: [{ profileId: "s1", updatedAt: 11, v: 3 }] });
    expect((await go(cookie)).settings[0].v).toBe(3);
    await go(cookie, { settings: [{ profileId: "s1", updatedAt: 12, v: 4, pad: "q".repeat(4000) }] });
    res = await go(cookie);
    expect(res.settings[0].v).toBe(3);
  });

  it("takes settings for a child added in the same request", async () => {
    const { cookie } = await account();
    await go(cookie, { profiles: [profile("s2")], settings: [{ profileId: "s2", updatedAt: 1, v: 7 }] });
    expect((await go(cookie)).settings[0].v).toBe(7);
  });
});

describe("class accounts", () => {
  it("can sync what they wear, but not their name, grade or province, and can't add or delete anyone", async () => {
    const kid = await account("student");
    await dbm.run("INSERT INTO profiles (id, family_id, data, updated_at) VALUES ('st1', ?, ?, 1)", [kid.familyId, JSON.stringify({ id: "st1", name: "Sam", grade: "3", framework: "ca-bc", avatar: "ollie", colour: "#fff", updatedAt: 1, resetAt: 50 })]);
    const res = await go(kid.cookie, {
      profiles: [
        profile("st1", { name: "Hacked", grade: "9", framework: "ca-on", avatar: "hoot", birthYear: 2000, deleted: true, updatedAt: 500 }),
        profile("st-new"),
      ],
    });
    expect(res.profiles).toHaveLength(1);
    expect(res.profiles[0]).toMatchObject({ id: "st1", name: "Sam", grade: "3", framework: "ca-bc", avatar: "hoot" });
    expect(res.profiles[0].deleted).toBeFalsy();
    expect((res.profiles[0] as unknown as { birthYear?: number }).birthYear).toBeUndefined();
    expect((res.profiles[0] as unknown as { resetAt: number }).resetAt).toBe(50);
  });
});

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// The class timer against the real route handlers and a throwaway SQLite file.

const dir = mkdtempSync(join(tmpdir(), "grademap-timer-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, sync: Mod, classes: Mod, join_: Mod, teacherTimer: Mod, childLive: Mod;
let dbm: typeof import("@/server/db");
let timers: typeof import("@/server/classTimer");
let live: typeof import("@/server/live");

beforeAll(async () => {
  [signup, sync, classes, join_, teacherTimer, childLive] = (await Promise.all([
    import("@/app/api/auth/signup/route"),
    import("@/app/api/sync/route"),
    import("@/app/api/classes/route"),
    import("@/app/api/classes/join/route"),
    import("@/app/api/classes/timer/route"),
    import("@/app/api/live/route"),
  ])) as unknown as Mod[];
  dbm = await import("@/server/db");
  timers = await import("@/server/classTimer");
  live = await import("@/server/live");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let ip = 0;
const req = (path: string, method: string, body?: unknown, cookie?: string) =>
  new Request(`http://localhost${path}`, {
    method,
    headers: { "content-type": "application/json", "x-forwarded-for": `10.5.0.${++ip}`, ...(cookie ? { cookie } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

async function account(email: string) {
  const res = await signup.POST(req("/api/auth/signup/", "POST", { email, password: "correct horse" }));
  await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now(), email]);
  return (res.headers.get("set-cookie") ?? "").split(";")[0];
}

async function classWithChild(tag: string) {
  const teacher = await account(`${tag}-teacher@example.com`);
  const { class: cls } = await (await classes.POST(req("/api/classes/", "POST", { name: "Room 7", grade: "2" }, teacher))).json();
  const parent = await account(`${tag}-parent@example.com`);
  await sync.POST(req("/api/sync/", "POST", { profiles: [{ id: `${tag}-kid`, name: "Maya", grade: "2", avatar: "ollie", colour: "#fff", updatedAt: Date.now() }] }, parent));
  expect((await join_.POST(req("/api/classes/join/", "POST", { code: cls.joinCode, profileId: `${tag}-kid` }, parent))).status).toBe(200);
  return { teacher, parent, cls: cls as { id: string }, kid: `${tag}-kid` };
}

describe("class timer", () => {
  it("runs a countdown the teacher controls and the child's device can read", async () => {
    const { teacher, parent, cls, kid } = await classWithChild("t1");
    const get = async (cookie: string) => (await (await childLive.GET(req(`/api/live/?profile=${kid}&timer=1`, "GET", undefined, cookie))).json()).timer;
    expect(await get(parent)).toBeNull();

    const started = await teacherTimer.POST(req("/api/classes/timer/", "POST", { classId: cls.id, minutes: 5, label: "  Silent reading " }, teacher));
    expect(started.status).toBe(200);
    const t = (await started.json()).timer;
    expect(t).toMatchObject({ label: "Silent reading", totalMs: 300_000, running: true });
    expect(t.left).toBeGreaterThan(290_000);

    const seen = await get(parent);
    expect(seen).toMatchObject({ label: "Silent reading", running: true, className: "Room 7" });

    const paused = (await (await teacherTimer.PATCH(req("/api/classes/timer/", "PATCH", { classId: cls.id, action: "pause" }, teacher))).json()).timer;
    expect(paused.running).toBe(false);
    const frozen = paused.left;
    expect((await get(parent)).left).toBe(frozen);

    const resumed = (await (await teacherTimer.PATCH(req("/api/classes/timer/", "PATCH", { classId: cls.id, action: "resume" }, teacher))).json()).timer;
    expect(resumed.running).toBe(true);
    const more = (await (await teacherTimer.PATCH(req("/api/classes/timer/", "PATCH", { classId: cls.id, action: "add" }, teacher))).json()).timer;
    expect(more.left).toBeGreaterThan(frozen + 55_000);

    expect((await teacherTimer.DELETE(req(`/api/classes/timer/?classId=${cls.id}`, "DELETE", undefined, teacher))).status).toBe(200);
    expect(await get(parent)).toBeNull();
  });

  it("refuses bad lengths, strangers, other classes' children and an unknown action", async () => {
    const { teacher, cls, kid } = await classWithChild("t2");
    const other = await classWithChild("t3");
    for (const minutes of [0, 121, 1.5, "5"]) {
      expect((await teacherTimer.POST(req("/api/classes/timer/", "POST", { classId: cls.id, minutes }, teacher))).status).toBe(400);
    }
    expect((await teacherTimer.POST(req("/api/classes/timer/", "POST", { classId: cls.id, minutes: 5 }, other.teacher))).status).toBe(404);
    expect((await teacherTimer.PATCH(req("/api/classes/timer/", "PATCH", { classId: cls.id, action: "explode" }, teacher))).status).toBe(400);
    expect((await teacherTimer.GET(req(`/api/classes/timer/?classId=${cls.id}`, "GET"))).status).toBe(401);
    await teacherTimer.POST(req("/api/classes/timer/", "POST", { classId: cls.id, minutes: 5 }, teacher));
    // Another family's child sees nothing of this class's timer.
    const res = await childLive.GET(req(`/api/live/?profile=${kid}&timer=1`, "GET", undefined, other.parent));
    expect((await res.json()).timer).toBeNull();
  });

  it("shows 'time's up' for a few minutes after the end, then goes away; a paused timer holds its time", async () => {
    const { cls } = await classWithChild("t4");
    const t0 = Date.now();
    await timers.startTimer(cls.id, 1, "", t0);
    expect(await timers.classTimer(cls.id, t0 + 30_000)).toMatchObject({ running: true, left: 30_000 });
    expect(await timers.classTimer(cls.id, t0 + 61_000)).toMatchObject({ running: false, left: 0 });
    expect(await timers.classTimer(cls.id, t0 + 60_000 + 5 * 60_000 + 1)).toBeNull();
    // Adding a minute to a finished timer starts it again.
    const again = await timers.changeTimer(cls.id, "add", t0 + 120_000);
    expect(again).toMatchObject({ running: true, left: 60_000 });
    await timers.changeTimer(cls.id, "pause", t0 + 150_000);
    expect(await timers.classTimer(cls.id, t0 + 150_000 + 3_600_000)).toMatchObject({ running: false, left: 30_000 });
    expect(await timers.classTimer(cls.id, t0 + 150_000 + 4 * 3_600_000)).toBeNull();
    expect(await timers.changeTimer("no-such-class", "pause")).toBeNull();
  });

  it("is deleted with the class's live questions (new school year, closing, deleting an account)", async () => {
    const { cls } = await classWithChild("t5");
    await timers.startTimer(cls.id, 5, "");
    await dbm.batch(live.liveClassStatements("?", [cls.id]));
    expect(await timers.classTimer(cls.id)).toBeNull();
  });
});

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// The class goal against the real route handlers and a throwaway SQLite file.

const dir = mkdtempSync(join(tmpdir(), "grademap-goal-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, sync: Mod, classes: Mod, join_: Mod, teacherGoal: Mod, childLive: Mod;
let dbm: typeof import("@/server/db");
let goals: typeof import("@/server/classGoal");
let live: typeof import("@/server/live");

beforeAll(async () => {
  [signup, sync, classes, join_, teacherGoal, childLive] = (await Promise.all([
    import("@/app/api/auth/signup/route"),
    import("@/app/api/sync/route"),
    import("@/app/api/classes/route"),
    import("@/app/api/classes/join/route"),
    import("@/app/api/classes/goal/route"),
    import("@/app/api/live/route"),
  ])) as unknown as Mod[];
  dbm = await import("@/server/db");
  goals = await import("@/server/classGoal");
  live = await import("@/server/live");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let ip = 0;
const req = (path: string, method: string, body?: unknown, cookie?: string) =>
  new Request(`http://localhost${path}`, {
    method,
    headers: { "content-type": "application/json", "x-forwarded-for": `10.6.0.${++ip}`, ...(cookie ? { cookie } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

async function account(email: string) {
  const res = await signup.POST(req("/api/auth/signup/", "POST", { email, password: "correct horse" }));
  await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now(), email]);
  return (res.headers.get("set-cookie") ?? "").split(";")[0];
}

const answers = (profileId: string, n: number, t: number) =>
  Array.from({ length: n }, (_, i) => ({ id: `${profileId}-${t}-${i}`, profileId, type: "answer", t: t + i, unit: "2/math/tens-and-ones", correct: true, attempts: 1, revealed: false, ms: 5000, mode: "practice", difficulty: 1 }));

async function joinKid(cls: { joinCode: string }, tag: string, events: unknown[] = []) {
  const parent = await account(`${tag}-parent@example.com`);
  const profile = { id: `${tag}-kid`, name: "Maya", grade: "2", avatar: "ollie", colour: "#fff", updatedAt: Date.now() };
  await sync.POST(req("/api/sync/", "POST", { profiles: [profile], events }, parent));
  expect((await join_.POST(req("/api/classes/join/", "POST", { code: cls.joinCode, profileId: profile.id }, parent))).status).toBe(200);
  return { parent, kid: profile.id };
}

async function newClass(tag: string) {
  const teacher = await account(`${tag}-teacher@example.com`);
  const { class: cls } = await (await classes.POST(req("/api/classes/", "POST", { name: "Room 9", grade: "2" }, teacher))).json();
  return { teacher, cls: cls as { id: string; joinCode: string } };
}

describe("class goal", () => {
  it("adds up the class's answers this week and shows them, counts only, on a child's device", async () => {
    const { teacher, cls } = await newClass("g1");
    const now = Date.now();
    const a = await joinKid(cls, "g1a", answers("g1a-kid", 7, now - 1000));
    const b = await joinKid(cls, "g1b", answers("g1b-kid", 5, now - 2000));
    // Last month's answers don't count toward this week.
    await sync.POST(req("/api/sync/", "POST", { events: answers("g1a-kid", 20, now - 40 * 86_400_000) }, a.parent));

    const get = async (who: { parent: string; kid: string }) => (await (await childLive.GET(req(`/api/live/?profile=${who.kid}`, "GET", undefined, who.parent))).json()).goal;
    expect(await get(a)).toBeNull();

    const set = await teacherGoal.PUT(req("/api/classes/goal/", "PUT", { classId: cls.id, target: 40, tzOffset: 0 }, teacher));
    expect(set.status).toBe(200);
    expect((await set.json()).goal).toEqual({ target: 40, answers: 12, met: false });
    expect(await get(b)).toEqual({ target: 40, answers: 12, met: false, className: "Room 9" });

    await teacherGoal.PUT(req("/api/classes/goal/", "PUT", { classId: cls.id, target: 10 }, teacher));
    expect((await get(a)).met).toBe(true);
    // Nothing about a child travels with it.
    expect(Object.keys(await get(a)).sort()).toEqual(["answers", "className", "met", "target"]);

    expect((await teacherGoal.DELETE(req(`/api/classes/goal/?classId=${cls.id}`, "DELETE", undefined, teacher))).status).toBe(200);
    expect(await get(a)).toBeNull();
  });

  it("refuses bad targets, strangers and other classes' teachers", async () => {
    const { teacher, cls } = await newClass("g2");
    const other = await newClass("g3");
    for (const target of [9, 5001, 1.5, "50"]) {
      expect((await teacherGoal.PUT(req("/api/classes/goal/", "PUT", { classId: cls.id, target }, teacher))).status).toBe(400);
    }
    expect((await teacherGoal.PUT(req("/api/classes/goal/", "PUT", { classId: cls.id, target: 50 }, other.teacher))).status).toBe(404);
    expect((await teacherGoal.GET(req(`/api/classes/goal/?classId=${cls.id}`, "GET"))).status).toBe(401);
    expect((await teacherGoal.DELETE(req(`/api/classes/goal/?classId=${cls.id}`, "DELETE", undefined, other.teacher))).status).toBe(404);
  });

  it("does not show another class's goal to a child outside it, and stops counting a child who leaves", async () => {
    const { teacher, cls } = await newClass("g4");
    const other = await newClass("g5");
    const a = await joinKid(cls, "g4a", answers("g4a-kid", 6, Date.now() - 1000));
    const outsider = await joinKid(other.cls, "g5a");
    await goals.setClassGoal(cls.id, 30, 0);
    expect((await (await childLive.GET(req(`/api/live/?profile=${outsider.kid}`, "GET", undefined, outsider.parent))).json()).goal).toBeNull();
    expect((await goals.classGoal(cls.id))?.answers).toBe(6);
    await dbm.run("DELETE FROM class_members WHERE class_id = ? AND profile_id = ?", [cls.id, a.kid]);
    expect((await goals.classGoal(cls.id))?.answers).toBe(0);
    void teacher;
  });

  it("restarts on the teacher's Monday", async () => {
    const { cls } = await newClass("g6");
    const kid = await joinKid(cls, "g6a");
    // Wednesday 15:00 UTC; the answers were Sunday evening and Tuesday.
    const wed = Date.UTC(2026, 9, 14, 15);
    const sunday = Date.UTC(2026, 9, 11, 20);
    const tuesday = Date.UTC(2026, 9, 13, 12);
    await sync.POST(req("/api/sync/", "POST", { events: [...answers(kid.kid, 4, sunday), ...answers(kid.kid, 3, tuesday)] }, kid.parent));
    await goals.setClassGoal(cls.id, 50, 0, wed);
    expect((await goals.classGoal(cls.id, wed))?.answers).toBe(3);
  });

  it("is deleted with the class's live questions (new school year, closing, deleting an account)", async () => {
    const { cls } = await newClass("g7");
    await goals.setClassGoal(cls.id, 30, 0);
    await dbm.batch(live.liveClassStatements("?", [cls.id]));
    expect(await goals.classGoal(cls.id)).toBeNull();
  });
});

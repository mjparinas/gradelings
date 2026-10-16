import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// Homework goals and live class questions against the real route handlers and a throwaway SQLite file.

const dir = mkdtempSync(join(tmpdir(), "grademap-live-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, sync: Mod, classes: Mod, assignments: Mod, join_: Mod, teacherLive: Mod, childLive: Mod, studentRoutes: Mod, studentLogin: Mod;
let dbm: typeof import("@/server/db");
let live: typeof import("@/server/live");

beforeAll(async () => {
  [signup, sync, classes, assignments, join_, teacherLive, childLive, studentRoutes, studentLogin] = (await Promise.all([
    import("@/app/api/auth/signup/route"),
    import("@/app/api/sync/route"),
    import("@/app/api/classes/route"),
    import("@/app/api/classes/assignments/route"),
    import("@/app/api/classes/join/route"),
    import("@/app/api/classes/live/route"),
    import("@/app/api/live/route"),
    import("@/app/api/classes/students/route"),
    import("@/app/api/students/login/route"),
  ])) as unknown as Mod[];
  dbm = await import("@/server/db");
  live = await import("@/server/live");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let ip = 0;
const req = (path: string, method: string, body?: unknown, cookie?: string) =>
  new Request(`http://localhost${path}`, {
    method,
    headers: { "content-type": "application/json", "x-forwarded-for": `10.4.0.${++ip}`, ...(cookie ? { cookie } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

async function account(email: string) {
  const res = await signup.POST(req("/api/auth/signup/", "POST", { email, password: "correct horse" }));
  await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now(), email]);
  return (res.headers.get("set-cookie") ?? "").split(";")[0];
}

const UNIT = "2/math/tens-and-ones";

const answers = (profileId: string, n: number, t: number, unit = UNIT) =>
  Array.from({ length: n }, (_, i) => ({ id: `${profileId}-${t}-${i}`, profileId, type: "answer", t: t + i, unit, correct: i % 2 === 0, attempts: 1, revealed: false, ms: 5000, mode: "practice", difficulty: 1 }));

async function classWithChild(tag: string) {
  const teacher = await account(`${tag}-teacher@example.com`);
  const { class: cls } = await (await classes.POST(req("/api/classes/", "POST", { name: "Room 7", grade: "2" }, teacher))).json();
  const parent = await account(`${tag}-parent@example.com`);
  const now = Date.now();
  await sync.POST(req("/api/sync/", "POST", { profiles: [{ id: `${tag}-kid`, name: "Maya", grade: "2", avatar: "ollie", colour: "#fff", updatedAt: now }] }, parent));
  expect((await join_.POST(req("/api/classes/join/", "POST", { code: cls.joinCode, profileId: `${tag}-kid` }, parent))).status).toBe(200);
  return { teacher, parent, cls: cls as { id: string; joinCode: string }, kid: `${tag}-kid` };
}

describe("homework", () => {
  it("counts questions answered since a unit was assigned, for the teacher and on the child's device", async () => {
    const { teacher, parent, cls, kid } = await classWithChild("hw");
    // Practice from before the homework was set doesn't count toward it.
    await sync.POST(req("/api/sync/", "POST", { events: answers(kid, 4, Date.now() - 86_400_000) }, parent));
    expect((await assignments.POST(req("/api/classes/assignments/", "POST", { classId: cls.id, unitKey: UNIT, goal: 6 }, teacher))).status).toBe(200);
    expect((await assignments.PATCH(req("/api/classes/assignments/", "PATCH", { classId: cls.id, unitKey: UNIT, goal: 99 }, teacher))).status).toBe(400);
    await sync.POST(req("/api/sync/", "POST", { events: answers(kid, 3, Date.now() + 10) }, parent));

    const view = await (await classes.GET(req(`/api/classes/?id=${cls.id}`, "GET", undefined, teacher))).json();
    expect(view.goal).toEqual({ [UNIT]: 6 });
    expect(view.students[0].units[0]).toMatchObject({ key: UNIT, attempts: 7, done: 3 });

    const down = await (await sync.POST(req("/api/sync/", "POST", {}, parent))).json();
    expect(down.classwork[0].goal).toEqual({ [UNIT]: 6 });
    expect(down.classwork[0].since[UNIT]).toBeGreaterThan(Date.now() - 60_000);

    // The goal can be changed or cleared (back to "done at Proficient").
    expect((await assignments.PATCH(req("/api/classes/assignments/", "PATCH", { classId: cls.id, unitKey: UNIT, goal: null }, teacher))).status).toBe(200);
    expect((await (await classes.GET(req(`/api/classes/?id=${cls.id}`, "GET", undefined, teacher))).json()).goal).toEqual({});
    // A due date still works the way it did.
    expect((await assignments.PATCH(req("/api/classes/assignments/", "PATCH", { classId: cls.id, unitKey: UNIT, dueAt: Date.now() + 86_400_000 }, teacher))).status).toBe(200);
  });
});

describe("live questions", () => {
  it("asks the class a question, takes one answer per child and shows the answer when the teacher says", async () => {
    const { teacher, parent, cls, kid } = await classWithChild("live");
    const childGet = async (cookie: string, profile = kid) => (await (await childLive.GET(req(`/api/live/?profile=${profile}`, "GET", undefined, cookie))).json()).live;
    expect(await childGet(parent)).toBeNull();

    expect((await teacherLive.POST(req("/api/classes/live/", "POST", { classId: cls.id, unitKey: "5/math/whatever" }, teacher))).status).toBe(400);
    const started = await teacherLive.POST(req("/api/classes/live/", "POST", { classId: cls.id, unitKey: UNIT }, teacher));
    expect(started.status).toBe(200);
    const asked = (await started.json()).live;
    expect(asked.question.choices.some((c: { id: string }) => c.id === asked.question.answer)).toBe(true);

    // The child sees the question but not the answer.
    const seen = await childGet(parent);
    expect(seen).toMatchObject({ id: asked.id, className: "Room 7", mine: null });
    expect(seen.answer).toBeUndefined();
    expect(JSON.stringify(seen)).not.toContain('"hint"');

    const wrong = asked.question.choices.find((c: { id: string }) => c.id !== asked.question.answer).id;
    const send = (cookie: string, choice: string, profileId = kid) => childLive.POST(req("/api/live/", "POST", { questionId: asked.id, profileId, choice }, cookie));
    expect((await send(parent, "not-a-choice")).status).toBe(404);
    expect((await send(parent, wrong)).status).toBe(200);
    // Only the first tap counts.
    expect((await send(parent, asked.question.answer)).status).toBe(200);
    expect((await childGet(parent)).mine).toBe(wrong);

    // Another family can neither see nor answer this class's question.
    const stranger = await account("live-stranger@example.com");
    expect(await childGet(stranger)).toBeNull();
    expect((await send(stranger, wrong)).status).toBe(404);

    const tally = (await (await teacherLive.GET(req(`/api/classes/live/?classId=${cls.id}`, "GET", undefined, teacher))).json()).live;
    expect(tally.answers).toEqual([{ profileId: kid, choice: wrong, correct: false }]);
    // Strangers to the class can't read it.
    expect((await teacherLive.GET(req(`/api/classes/live/?classId=${cls.id}`, "GET", undefined, stranger))).status).toBe(404);

    // Showing the answer closes the question.
    const shown = (await (await teacherLive.PATCH(req("/api/classes/live/", "PATCH", { classId: cls.id, action: "reveal" }, teacher))).json()).live;
    expect(shown.revealed).toBe(true);
    expect((await childGet(parent)).answer).toBe(asked.question.answer);
    expect((await send(parent, wrong)).status).toBe(409);

    // Live answers are not practice: no events were added.
    expect((await dbm.query<{ n: number }>("SELECT COUNT(*) AS n FROM events WHERE profile_id = ?", [kid]))[0].n).toBe(0);

    // The next question replaces it; ending clears it from every screen.
    const next = (await (await teacherLive.POST(req("/api/classes/live/", "POST", { classId: cls.id, unitKey: UNIT }, teacher))).json()).live;
    expect(next.id).not.toBe(asked.id);
    expect((await childGet(parent)).id).toBe(next.id);
    expect((await teacherLive.DELETE(req(`/api/classes/live/?classId=${cls.id}`, "DELETE", undefined, teacher))).status).toBe(200);
    expect(await childGet(parent)).toBeNull();
  });

  it("previews the next question for the teacher only, swaps it, and asks the one that was shown", async () => {
    const { teacher, parent, cls, kid } = await classWithChild("preview");
    const post = async () => (await (await teacherLive.POST(req("/api/classes/live/", "POST", { classId: cls.id, unitKey: UNIT }, teacher))).json()).live;
    const swap = () => teacherLive.PATCH(req("/api/classes/live/", "PATCH", { classId: cls.id, action: "swap-next" }, teacher));
    const asked = await post();
    expect(asked.next.prompt).not.toBe(asked.question.prompt);
    // Polling shows the same preview until it is swapped, and children never get it.
    const polled = (await (await teacherLive.GET(req(`/api/classes/live/?classId=${cls.id}`, "GET", undefined, teacher))).json()).live;
    expect(polled.next).toEqual(asked.next);
    const seen = JSON.stringify(await (await childLive.GET(req(`/api/live/?profile=${kid}`, "GET", undefined, parent))).json());
    expect(seen).not.toContain(asked.next.prompt);
    // A swap shows a different question, still not a repeat of the one on screen.
    const swapped = (await (await swap()).json()).live;
    expect(swapped.next).not.toEqual(asked.next);
    expect(swapped.next.prompt).not.toBe(asked.question.prompt);
    // A stranger can't swap it, and with nothing open there's nothing to swap.
    const stranger = await account("preview-stranger@example.com");
    expect((await teacherLive.PATCH(req("/api/classes/live/", "PATCH", { classId: cls.id, action: "swap-next" }, stranger))).status).toBe(404);
    // "Next question" asks what the teacher was shown.
    const next = await post();
    expect(next.question).toEqual(swapped.next);
    await teacherLive.DELETE(req(`/api/classes/live/?classId=${cls.id}`, "DELETE", undefined, teacher));
    expect((await swap()).status).toBe(409);
  });

  it("works for class student accounts, stops when the flag is off and is deleted with the class", async () => {
    const teacher = await account("live2-teacher@example.com");
    const { class: cls } = await (await classes.POST(req("/api/classes/", "POST", { name: "Room 8", grade: "2" }, teacher))).json();
    const added = await (await studentRoutes.POST(req("/api/classes/students/", "POST", { classId: cls.id, names: ["Ava"] }, teacher))).json();
    const [ava] = added.students as { loginCode: string; profileId: string }[];
    const login = await studentLogin.POST(req("/api/students/login/", "POST", { classCode: cls.joinCode, studentCode: ava.loginCode }));
    const student = (login.headers.get("set-cookie") ?? "").split(";")[0];
    const asked = (await (await teacherLive.POST(req("/api/classes/live/", "POST", { classId: cls.id, unitKey: UNIT }, teacher))).json()).live;
    const seen = (await (await childLive.GET(req(`/api/live/?profile=${ava.profileId}`, "GET", undefined, student))).json()).live;
    expect(seen.id).toBe(asked.id);
    expect((await childLive.POST(req("/api/live/", "POST", { questionId: asked.id, profileId: ava.profileId, choice: asked.question.answer }, student))).status).toBe(200);
    // A student session still can't use the teacher's side.
    expect((await teacherLive.GET(req(`/api/classes/live/?classId=${cls.id}`, "GET", undefined, student))).status).toBe(401);

    await dbm.run("INSERT OR REPLACE INTO feature_flags (key, enabled, rollout, updated_at) VALUES ('live-questions', 0, 100, ?)", [Date.now()]);
    expect((await (await childLive.GET(req(`/api/live/?profile=${ava.profileId}`, "GET", undefined, student))).json()).live).toBeNull();
    expect((await teacherLive.POST(req("/api/classes/live/", "POST", { classId: cls.id, unitKey: UNIT }, teacher))).status).toBe(503);
    await dbm.run("DELETE FROM feature_flags WHERE key = 'live-questions'");

    expect((await classes.DELETE(req(`/api/classes/?id=${cls.id}`, "DELETE", undefined, teacher))).status).toBe(200);
    expect((await dbm.query<{ n: number }>("SELECT COUNT(*) AS n FROM live_questions WHERE class_id = ?", [cls.id]))[0].n).toBe(0);
    expect((await dbm.query<{ n: number }>("SELECT COUNT(*) AS n FROM live_answers WHERE profile_id = ?", [ava.profileId]))[0].n).toBe(0);
  });

  it("forgets live questions after a day", async () => {
    const { teacher, cls } = await classWithChild("prune");
    const asked = (await (await teacherLive.POST(req("/api/classes/live/", "POST", { classId: cls.id, unitKey: UNIT }, teacher))).json()).live;
    await live.pruneLive(Date.now() + live.LIVE_KEEP + 1000);
    expect(await dbm.query("SELECT id FROM live_questions WHERE id = ?", [asked.id])).toEqual([]);
  });

  it("picks the same question for the same class and number, and only tap-to-answer ones", async () => {
    const cls = { id: "c1", grade: "2" as const, framework: "ca-bc" as const };
    const a = await live.pickLiveQuestion(cls, UNIT, 3);
    expect(a).toEqual(await live.pickLiveQuestion(cls, UNIT, 3));
    expect(a!.choices.some((c) => c.id === a!.answer)).toBe(true);
    expect(await live.pickLiveQuestion(cls, "2/math/nope", 0)).toBeNull();
  });
});

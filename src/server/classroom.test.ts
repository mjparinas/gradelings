import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// Classroom mode against the real route handlers and a throwaway SQLite file.

const dir = mkdtempSync(join(tmpdir(), "grademap-class-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, sync: Mod, classes: Mod, assignments: Mod, join_: Mod, account: Mod, students_: Mod;
let dbm: typeof import("@/server/db");

beforeAll(async () => {
  [signup, sync, classes, assignments, join_, account, students_] = (await Promise.all([
    import("@/app/api/auth/signup/route"),
    import("@/app/api/sync/route"),
    import("@/app/api/classes/route"),
    import("@/app/api/classes/assignments/route"),
    import("@/app/api/classes/join/route"),
    import("@/app/api/account/route"),
    import("@/app/api/classes/students/route"),
  ])) as unknown as Mod[];
  dbm = await import("@/server/db");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let ip = 0;
const req = (path: string, method: string, body?: unknown, cookie?: string) =>
  new Request(`http://localhost${path}`, {
    method,
    headers: { "content-type": "application/json", "x-forwarded-for": `10.1.0.${++ip}`, ...(cookie ? { cookie } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

async function account_(email: string, confirmed = true) {
  const res = await signup.POST(req("/api/auth/signup/", "POST", { email, password: "correct horse" }));
  if (confirmed) await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now(), email]);
  return (res.headers.get("set-cookie") ?? "").split(";")[0];
}

async function parentWithChild(email: string, profileId: string, grade = "2") {
  const cookie = await account_(email);
  const now = Date.now();
  const events = Array.from({ length: 10 }, (_, i) => ({
    id: `${profileId}-e${i}`,
    profileId,
    type: "answer",
    t: now - 3600_000 - i * 1000,
    unit: `${grade}/math/tens-and-ones`,
    correct: i % 4 !== 0,
    attempts: 1,
    revealed: false,
    ms: 8000,
    mode: "practice",
    difficulty: 1,
  }));
  await sync.POST(req("/api/sync/", "POST", { profiles: [{ id: profileId, name: "Maya", grade, avatar: "ollie", colour: "#fff", updatedAt: now }], events }, cookie));
  return cookie;
}

describe("classroom mode", () => {
  it("keeps a class to its own province's units and children", async () => {
    const teacher = await account_("on-teacher@example.com");
    const post = (body: unknown) => classes.POST(req("/api/classes/", "POST", body, teacher));
    expect((await post({ name: "Room 3", grade: "2", framework: "nowhere" })).status).toBe(400);
    const { class: cls } = await (await post({ name: "Room 3", grade: "2", framework: "ca-on" })).json();
    expect(cls.framework).toBe("ca-on");
    const { class: tidy } = await (await post({ name: " Room\r\n4\u0000 ", grade: "2" })).json();
    expect(tidy.name).toBe("Room 4");
    const assign = (unitKey: string) => assignments.POST(req("/api/classes/assignments/", "POST", { classId: cls.id, unitKey }, teacher));
    expect((await assign("2/math/numbers-to-200")).status).toBe(200);
    expect((await assign("2/math/tens-and-ones")).status).toBe(400);
    // A child set up for British Columbia can't be linked to an Ontario class.
    const parent = await parentWithChild("on-parent@example.com", "kid-bc");
    const mismatch = await join_.POST(req("/api/classes/join/", "POST", { code: cls.joinCode, profileId: "kid-bc" }, parent));
    expect(mismatch.status).toBe(409);
    expect((await mismatch.json()).error).toBe("This class follows a different province’s curriculum than your child’s profile.");
    // A state's class says "state", not "province".
    const { class: wa } = await (await post({ name: "Room 3W", grade: "2", framework: "us-wa" })).json();
    const stateMismatch = await join_.POST(req("/api/classes/join/", "POST", { code: wa.joinCode, profileId: "kid-bc" }, parent));
    expect(stateMismatch.status).toBe(409);
    expect((await stateMismatch.json()).error).toBe("This class follows a different state’s curriculum than your child’s profile.");
  });

  it("gives a unit to chosen students only, and only they get it and are counted on it", async () => {
    const teacher = await account_("aud-teacher@example.com");
    const { class: cls } = await (await classes.POST(req("/api/classes/", "POST", { name: "Room 5", grade: "2" }, teacher))).json();
    const one = await parentWithChild("aud-p1@example.com", "aud-kid1");
    const two = await parentWithChild("aud-p2@example.com", "aud-kid2");
    for (const [cookie, profileId] of [[one, "aud-kid1"], [two, "aud-kid2"]] as const) {
      expect((await join_.POST(req("/api/classes/join/", "POST", { code: cls.joinCode, profileId }, cookie))).status).toBe(200);
    }
    const a = "2/math/tens-and-ones";
    const b = "2/math/bigger-or-smaller";
    const post = (body: unknown) => assignments.POST(req("/api/classes/assignments/", "POST", { classId: cls.id, ...(body as object) }, teacher));
    // Students from another class (or made up) are refused.
    expect((await post({ unitKey: a, students: ["nobody"] })).status).toBe(400);
    expect((await post({ unitKey: a, students: "aud-kid1" })).status).toBe(400);
    expect((await post({ unitKey: a, students: ["aud-kid1"] })).status).toBe(200);
    expect((await post({ unitKey: b })).status).toBe(200);

    const view = await (await classes.GET(req(`/api/classes/?id=${cls.id}`, "GET", undefined, teacher))).json();
    expect(view.audience).toEqual({ [a]: ["aud-kid1"] });
    const byName = (id: string) => view.students.find((st: { profileId: string }) => st.profileId === id);
    expect(byName("aud-kid1").units.map((u: { assigned: boolean }) => u.assigned)).toEqual([true, true]);
    expect(byName("aud-kid2").units.map((u: { key: string; assigned: boolean }) => [u.key, u.assigned])).toEqual([[a, false], [b, true]]);

    const work = async (cookie: string) => (await (await sync.POST(req("/api/sync/", "POST", {}, cookie))).json()).classwork[0].unitKeys;
    expect(await work(one)).toEqual([a, b]);
    expect(await work(two)).toEqual([b]);

    // Changing who it is for, and back to the whole class.
    const patch = (body: unknown) => assignments.PATCH(req("/api/classes/assignments/", "PATCH", { classId: cls.id, unitKey: a, ...(body as object) }, teacher));
    expect((await patch({ students: ["aud-kid2"] })).status).toBe(200);
    expect(await work(one)).toEqual([b]);
    expect(await work(two)).toEqual([a, b]);
    expect((await patch({ students: ["nobody"] })).status).toBe(400);
    expect((await patch({ students: [] })).status).toBe(200);
    expect(await work(one)).toEqual([a, b]);
    expect((await (await classes.GET(req(`/api/classes/?id=${cls.id}`, "GET", undefined, teacher))).json()).audience).toEqual({});
    expect((await assignments.PATCH(req("/api/classes/assignments/", "PATCH", { classId: cls.id, unitKey: "2/math/not-assigned", students: [] }, teacher))).status).toBe(404);

    // Removing the unit forgets who it was for; unlinking a child forgets their picks.
    expect((await patch({ students: ["aud-kid1", "aud-kid2"] })).status).toBe(200);
    await assignments.DELETE(req(`/api/classes/assignments/?classId=${cls.id}&unitKey=${encodeURIComponent(a)}`, "DELETE", undefined, teacher));
    expect(await dbm.query("SELECT * FROM class_assignment_students WHERE class_id = ?", [cls.id])).toHaveLength(0);
    expect((await post({ unitKey: a, students: ["aud-kid1", "aud-kid2"] })).status).toBe(200);
    await join_.DELETE(req(`/api/classes/join/?classId=${cls.id}&profileId=aud-kid2`, "DELETE", undefined, two));
    expect((await dbm.query<{ profile_id: string }>("SELECT profile_id FROM class_assignment_students WHERE class_id = ?", [cls.id])).map((r) => r.profile_id)).toEqual(["aud-kid1"]);
    // Closing the class clears the rest.
    await classes.DELETE(req(`/api/classes/?id=${cls.id}`, "DELETE", undefined, teacher));
    expect(await dbm.query("SELECT * FROM class_assignment_students WHERE class_id = ?", [cls.id])).toHaveLength(0);
  });

  it("runs a split class across two next-door grades: units from both, children from both, each gets their own grade's work", async () => {
    const teacher = await account_("split-teacher@example.com");
    const post = (body: unknown) => classes.POST(req("/api/classes/", "POST", body, teacher));
    // The second grade has to be next door.
    expect((await post({ name: "Room 7", grade: "2", grade2: "4" })).status).toBe(400);
    expect((await post({ name: "Room 7", grade: "2", grade2: "x" })).status).toBe(400);
    const { class: cls } = await (await post({ name: "Room 2/3", grade: "2", grade2: "3" })).json();
    expect(cls.grade2).toBe("3");
    expect((await (await classes.GET(req("/api/classes/", "GET", undefined, teacher))).json()).classes[0].grade2).toBe("3");
    const two = "2/math/tens-and-ones";
    const three = "3/math/fractions";
    const assign = (unitKey: string) => assignments.POST(req("/api/classes/assignments/", "POST", { classId: cls.id, unitKey }, teacher));
    expect((await assign(two)).status).toBe(200);
    expect((await assign(three)).status).toBe(200);
    expect((await assign("4/math/fractions")).status).toBe(400);

    // A Grade 2 child and a Grade 3 child both join; a Grade 4 child can't.
    const a = await parentWithChild("split-a@example.com", "split-kid2", "2");
    const b = await parentWithChild("split-b@example.com", "split-kid3", "3");
    const c = await parentWithChild("split-c@example.com", "split-kid4", "4");
    const joinAs = (cookie: string, profileId: string) => join_.POST(req("/api/classes/join/", "POST", { code: cls.joinCode, profileId }, cookie));
    expect((await joinAs(a, "split-kid2")).status).toBe(200);
    expect((await joinAs(b, "split-kid3")).status).toBe(200);
    expect((await joinAs(c, "split-kid4")).status).toBe(409);

    const work = async (cookie: string) => (await (await sync.POST(req("/api/sync/", "POST", {}, cookie))).json()).classwork[0].unitKeys;
    expect(await work(a)).toEqual([two]);
    expect(await work(b)).toEqual([three]);

    const view = await (await classes.GET(req(`/api/classes/?id=${cls.id}`, "GET", undefined, teacher))).json();
    const cell = (id: string) => view.students.find((st: { profileId: string }) => st.profileId === id).units.map((u: { key: string; assigned: boolean }) => [u.key, u.assigned]);
    expect(cell("split-kid2")).toEqual([[two, true], [three, false]]);
    expect(cell("split-kid3")).toEqual([[two, false], [three, true]]);

    // Picking students beats the grade rule: the teacher can give a Grade 3 unit to the Grade 2 child.
    expect((await assignments.PATCH(req("/api/classes/assignments/", "PATCH", { classId: cls.id, unitKey: three, students: ["split-kid2"] }, teacher))).status).toBe(200);
    expect(await work(a)).toEqual([two, three]);
    expect(await work(b)).toEqual([]);

    // A student the teacher adds is in the grade chosen, and only a grade of the class is allowed.
    const add = (body: unknown) => students_.POST(req("/api/classes/students/", "POST", { classId: cls.id, names: ["Mo"], ...(body as object) }, teacher));
    expect((await add({ grade: "4" })).status).toBe(400);
    const added = await (await add({ grade: "3" })).json();
    const profile = JSON.parse((await dbm.query<{ data: string }>("SELECT data FROM profiles WHERE id = ?", [added.students[0].profileId]))[0].data);
    expect(profile.grade).toBe("3");
    expect((await dbm.query<{ grade: string }>("SELECT grade FROM class_members WHERE profile_id = ?", [added.students[0].profileId]))[0].grade).toBe("3");
    // Without a grade, the class's first grade.
    const plain = await (await add({})).json();
    expect(JSON.parse((await dbm.query<{ data: string }>("SELECT data FROM profiles WHERE id = ?", [plain.students[0].profileId]))[0].data).grade).toBe("2");
  });

  it("lets only the owner rename a class", async () => {
    const teacher = await account_("rename-teacher@example.com");
    const other = await account_("rename-other@example.com");
    const { class: cls } = await (await classes.POST(req("/api/classes/", "POST", { name: "Room 1", grade: "2" }, teacher))).json();
    const patch = (cookie: string, body: unknown) => classes.PATCH(req(`/api/classes/?id=${cls.id}`, "PATCH", body, cookie));
    expect((await patch(other, { name: "Mine now" })).status).toBe(404);
    expect((await patch(teacher, { name: "  \n " })).status).toBe(400);
    const renamed = await patch(teacher, { name: " Room\r\n1B\u0000 " });
    expect((await renamed.json()).name).toBe("Room 1B");
    expect((await (await classes.GET(req(`/api/classes/?id=${cls.id}`, "GET", undefined, teacher))).json()).class.name).toBe("Room 1B");
    // No body still means a new join code.
    const code = (await (await patch(teacher, undefined)).json()).joinCode;
    expect(code).toMatch(/^[A-HJKMNP-Z2-9]{6}$/);
    expect(code).not.toBe(cls.joinCode);
  });

  it("moves a class up a grade for a new year: students come along, linked children and homework don't", async () => {
    const teacher = await account_("year-teacher@example.com");
    const { class: cls } = await (await classes.POST(req("/api/classes/", "POST", { name: "Room 2/3", grade: "2", grade2: "3" }, teacher))).json();
    const year = (cookie = teacher) => classes.PATCH(req(`/api/classes/?id=${cls.id}`, "PATCH", { action: "next-year" }, cookie));
    const linked = await parentWithChild("year-parent@example.com", "year-kid", "2");
    expect((await join_.POST(req("/api/classes/join/", "POST", { code: cls.joinCode, profileId: "year-kid" }, linked))).status).toBe(200);
    const added = await (await students_.POST(req("/api/classes/students/", "POST", { classId: cls.id, names: ["Ana", "Ben"], grade: "2" }, teacher))).json();
    const ben = await (await students_.POST(req("/api/classes/students/", "POST", { classId: cls.id, names: ["Cy"], grade: "3" }, teacher))).json();
    const keys = ["2/math/tens-and-ones", "3/math/fractions"];
    for (const unitKey of keys) await assignments.POST(req("/api/classes/assignments/", "POST", { classId: cls.id, unitKey, students: [added.students[0].profileId] }, teacher));

    // Only the owner can do it.
    expect((await year(await account_("year-other@example.com"))).status).toBe(404);
    const done = await year();
    expect(done.status).toBe(200);
    expect((await done.json()).class).toMatchObject({ grade: "3", grade2: "4", name: "Room 2/3" });

    const view = await (await classes.GET(req(`/api/classes/?id=${cls.id}`, "GET", undefined, teacher))).json();
    expect(view.assignments).toEqual([]);
    expect(view.audience).toEqual({});
    // The teacher's own students stay, with the same codes, a grade up; the parent-linked child is unlinked.
    expect(view.students.map((st: { name: string; grade: string }) => [st.name, st.grade]).sort()).toEqual([["Ana", "3"], ["Ben", "3"], ["Cy", "4"]].sort());
    expect(view.roster.map((r: { loginCode: string }) => r.loginCode).sort()).toEqual([...added.students, ...ben.students].map((x: { loginCode: string }) => x.loginCode).sort());
    expect(await dbm.query("SELECT 1 FROM class_members WHERE profile_id = 'year-kid'")).toHaveLength(0);
    expect((await dbm.query<{ grade: string }>("SELECT grade FROM class_members WHERE profile_id = ?", [ben.students[0].profileId]))[0].grade).toBe("4");
    // The new grade is what a student's device receives.
    const stored = JSON.parse((await dbm.query<{ data: string }>("SELECT data FROM profiles WHERE id = ?", [ben.students[0].profileId]))[0].data);
    expect(stored.grade).toBe("4");

    // Up to the last grade, and no further.
    const { class: top } = await (await classes.POST(req("/api/classes/", "POST", { name: "Top", grade: "9" }, teacher))).json();
    const refused = await classes.PATCH(req(`/api/classes/?id=${top.id}`, "PATCH", { action: "next-year" }, teacher));
    expect(refused.status).toBe(409);
    const { class: edge } = await (await classes.POST(req("/api/classes/", "POST", { name: "Edge", grade: "8", grade2: "9" }, teacher))).json();
    expect((await classes.PATCH(req(`/api/classes/?id=${edge.id}`, "PATCH", { action: "next-year" }, teacher))).status).toBe(409);
  });

  it("lets a teacher see a linked child's results on assigned units only, and nothing else", async () => {
    const teacher = await account_("teacher@example.com");
    const created = await (await classes.POST(req("/api/classes/", "POST", { name: "Room 12", grade: "2" }, teacher))).json();
    const { id, joinCode } = created.class;
    expect(joinCode).toMatch(/^[A-HJKMNP-Z2-9]{6}$/);

    const bad = await assignments.POST(req("/api/classes/assignments/", "POST", { classId: id, unitKey: "3/math/whatever" }, teacher));
    expect(bad.status).toBe(400);

    const unitKey = "2/math/tens-and-ones";
    expect((await assignments.POST(req("/api/classes/assignments/", "POST", { classId: id, unitKey }, teacher))).status).toBe(200);

    const parent = await parentWithChild("parent@example.com", "kid1");
    // Nothing is shared until the parent joins.
    const before = await (await classes.GET(req(`/api/classes/?id=${id}`, "GET", undefined, teacher))).json();
    expect(before.students).toHaveLength(0);

    expect((await join_.POST(req("/api/classes/join/", "POST", { code: "ZZZZZZ", profileId: "kid1" }, parent))).status).toBe(404);
    expect((await join_.POST(req("/api/classes/join/", "POST", { code: joinCode.toLowerCase(), profileId: "kid1" }, parent))).status).toBe(200);

    const detail = await (await classes.GET(req(`/api/classes/?id=${id}`, "GET", undefined, teacher))).json();
    expect(detail.students).toHaveLength(1);
    const s = detail.students[0];
    expect(Object.keys(s).sort()).toEqual(["avatar", "grade", "lastActive", "name", "profileId", "units"]);
    expect(s.units).toHaveLength(1);
    expect(s.units[0].attempts).toBe(10);
    expect(s.units[0].level).toBeGreaterThanOrEqual(0);

    // The child's devices get the assigned units with their next sync, and only the family's own.
    const down = await (await sync.POST(req("/api/sync/", "POST", {}, parent))).json();
    expect(down.classwork).toEqual([{ profileId: "kid1", classId: id, className: "Room 12", unitKeys: [unitKey], due: {}, goal: {}, since: { [unitKey]: expect.any(Number) } }]);
    const stranger = await account_("stranger@example.com");
    expect((await (await sync.POST(req("/api/sync/", "POST", {}, stranger))).json()).classwork).toEqual([]);

    // The parent can leave; the teacher stops seeing the child.
    expect((await join_.DELETE(req(`/api/classes/join/?classId=${id}&profileId=kid1`, "DELETE", undefined, parent))).status).toBe(200);
    const after = await (await classes.GET(req(`/api/classes/?id=${id}`, "GET", undefined, teacher))).json();
    expect(after.students).toHaveLength(0);
    expect((await (await sync.POST(req("/api/sync/", "POST", {}, parent))).json()).classwork).toEqual([]);
  });

  it("needs a confirmed email to create a class, and can replace the join code", async () => {
    const unconfirmed = await account_("t-unconfirmed@example.com", false);
    expect((await classes.POST(req("/api/classes/", "POST", { name: "Nope", grade: "2" }, unconfirmed))).status).toBe(403);
    const teacher = await account_("t-rotate@example.com");
    const { class: c } = await (await classes.POST(req("/api/classes/", "POST", { name: "Codes", grade: "2" }, teacher))).json();
    const parent = await parentWithChild("p-rotate@example.com", "kid-rotate");
    const { joinCode } = await (await classes.PATCH(req(`/api/classes/?id=${c.id}`, "PATCH", undefined, teacher))).json();
    expect(joinCode).not.toBe(c.joinCode);
    expect((await join_.POST(req("/api/classes/join/", "POST", { code: c.joinCode, profileId: "kid-rotate" }, parent))).status).toBe(404);
    expect((await join_.POST(req("/api/classes/join/", "POST", { code: joinCode, profileId: "kid-rotate" }, parent))).status).toBe(200);
    expect((await classes.PATCH(req(`/api/classes/?id=${c.id}`, "PATCH", undefined, parent))).status).toBe(404);
  });

  it("keeps classes private to their owner and rejects the wrong grade", async () => {
    const teacher = await account_("t2@example.com");
    const other = await account_("t3@example.com");
    const { class: c } = await (await classes.POST(req("/api/classes/", "POST", { name: "Mine", grade: "3" }, teacher))).json();
    expect((await classes.GET(req(`/api/classes/?id=${c.id}`, "GET", undefined, other))).status).toBe(404);
    expect((await classes.DELETE(req(`/api/classes/?id=${c.id}`, "DELETE", undefined, other))).status).toBe(404);
    expect((await classes.GET(req(`/api/classes/?id=${c.id}`, "GET"))).status).toBe(401);

    const parent = await parentWithChild("p2@example.com", "kid2", "2");
    expect((await join_.POST(req("/api/classes/join/", "POST", { code: c.joinCode, profileId: "kid2" }, parent))).status).toBe(409);
  });

  it("removes links when a class is closed or an account is deleted", async () => {
    const teacher = await account_("t4@example.com");
    const { class: c } = await (await classes.POST(req("/api/classes/", "POST", { name: "Gone", grade: "2" }, teacher))).json();
    const parent = await parentWithChild("p3@example.com", "kid3");
    await join_.POST(req("/api/classes/join/", "POST", { code: c.joinCode, profileId: "kid3" }, parent));

    // Deleting the parent's account unlinks the child.
    await account.DELETE(req("/api/account/", "DELETE", { password: "correct horse" }, parent));
    const detail = await (await classes.GET(req(`/api/classes/?id=${c.id}`, "GET", undefined, teacher))).json();
    expect(detail.students).toHaveLength(0);

    // Closing the class frees it and its code stops working.
    expect((await classes.DELETE(req(`/api/classes/?id=${c.id}`, "DELETE", undefined, teacher))).status).toBe(200);
    const parent2 = await parentWithChild("p4@example.com", "kid4");
    expect((await join_.POST(req("/api/classes/join/", "POST", { code: c.joinCode, profileId: "kid4" }, parent2))).status).toBe(404);
  });

  it("gives the class list a few facts per class: students to check in with, work past due and the last practice", async () => {
    const teacher = await account_("badges-teacher@example.com");
    const empty = (await (await classes.POST(req("/api/classes/", "POST", { name: "Empty", grade: "2" }, teacher))).json()).class;
    const { class: cls } = await (await classes.POST(req("/api/classes/", "POST", { name: "Room 9", grade: "2" }, teacher))).json();
    const unitKey = "2/math/tens-and-ones";
    // Due in the past, with no number of questions: past due while the child is below Proficient.
    expect((await assignments.POST(req("/api/classes/assignments/", "POST", { classId: cls.id, unitKey, dueAt: Date.now() - 1000 }, teacher))).status).toBe(200);
    const parent = await parentWithChild("badges-parent@example.com", "badge-kid");
    expect((await join_.POST(req("/api/classes/join/", "POST", { code: cls.joinCode, profileId: "badge-kid" }, parent))).status).toBe(200);

    const res = await classes.GET(req("/api/classes/?badges=1", "GET", undefined, teacher));
    expect(res.status).toBe(200);
    const { badges } = await res.json();
    // A class with no students has nothing to report.
    expect(badges[empty.id]).toBeUndefined();
    expect(badges[cls.id].lastPractice).toBeGreaterThan(Date.now() - 2 * 3600_000);
    expect(badges[cls.id].checkIn).toBeGreaterThanOrEqual(0);
    expect(typeof badges[cls.id].pastDue).toBe("number");
    // Only a signed-in teacher can ask, and only about their own classes.
    expect((await classes.GET(req("/api/classes/?badges=1", "GET"))).status).toBe(401);
    const other = await account_("badges-other@example.com");
    expect((await (await classes.GET(req("/api/classes/?badges=1", "GET", undefined, other))).json()).badges).toEqual({});
  });

  it("keeps a unit scheduled ahead from students and parents until its start date", async () => {
    const teacher = await account_("sched-teacher@example.com");
    const { class: cls } = await (await classes.POST(req("/api/classes/", "POST", { name: "Room 3", grade: "2" }, teacher))).json();
    const parent = await parentWithChild("sched-parent@example.com", "sched-kid");
    expect((await join_.POST(req("/api/classes/join/", "POST", { code: cls.joinCode, profileId: "sched-kid" }, parent))).status).toBe(200);
    const unitKey = "2/math/tens-and-ones";
    const tomorrow = Date.now() + 86_400_000;
    const assign = (body: Record<string, unknown>) => assignments.POST(req("/api/classes/assignments/", "POST", { classId: cls.id, unitKey, ...body }, teacher));
    const patch = (body: Record<string, unknown>) => assignments.PATCH(req("/api/classes/assignments/", "PATCH", { classId: cls.id, unitKey, ...body }, teacher));
    const work = async () => (await (await sync.POST(req("/api/sync/", "POST", {}, parent))).json()).classwork[0];
    const view = async () => (await (await classes.GET(req(`/api/classes/?id=${cls.id}`, "GET", undefined, teacher))).json()) as { startsAt: Record<string, number>; students: { units: { key: string; assigned: boolean }[] }[] };

    // A due date before the start date, or a start date in the past or too far ahead, is refused.
    expect((await assign({ startsAt: tomorrow, dueAt: tomorrow - 3600_000 })).status).toBe(400);
    expect((await assign({ startsAt: tomorrow, dueAt: tomorrow + 86_400_000 })).status).toBe(200);
    expect((await patch({ startsAt: Date.now() - 3 * 86_400_000 })).status).toBe(400);
    expect((await patch({ startsAt: Date.now() + 400 * 86_400_000 })).status).toBe(400);
    expect((await patch({ startsAt: tomorrow + 2 * 86_400_000 })).status).toBe(400);
    expect((await patch({ dueAt: tomorrow - 3600_000 })).status).toBe(400);

    // Before it starts: the child's device (and so the parent) gets nothing, and the teacher sees it as scheduled, not anyone's yet.
    expect((await work()).unitKeys).toEqual([]);
    const before = await view();
    expect(before.startsAt[unitKey]).toBe(tomorrow);
    expect(before.students[0].units.find((u) => u.key === unitKey)?.assigned).toBe(false);

    // Once the day comes it reaches the child, and homework counts from the start, not from when it was planned.
    const started = Date.now() - 60_000;
    await dbm.run("UPDATE class_assignments SET starts_at = ?, created_at = ? WHERE class_id = ? AND unit_key = ?", [started, started - 7 * 86_400_000, cls.id, unitKey]);
    const after = await work();
    expect(after.unitKeys).toEqual([unitKey]);
    expect(after.since[unitKey]).toBe(started);
    expect((await view()).students[0].units.find((u) => u.key === unitKey)?.assigned).toBe(true);

    // Clearing the start date gives it out at once.
    expect((await patch({ startsAt: tomorrow })).status).toBe(200);
    expect((await work()).unitKeys).toEqual([]);
    expect((await patch({ startsAt: null })).status).toBe(200);
    expect((await work()).unitKeys).toEqual([unitKey]);
    expect((await view()).startsAt[unitKey]).toBeUndefined();
  });

  it("keeps the day a unit was first assigned when a removal is undone, and ignores a made-up one", async () => {
    const teacher = await account_("undo-teacher@example.com");
    const { class: cls } = await (await classes.POST(req("/api/classes/", "POST", { name: "Room 5", grade: "2" }, teacher))).json();
    const unitKey = "2/math/tens-and-ones";
    const view = async () => (await (await classes.GET(req(`/api/classes/?id=${cls.id}`, "GET", undefined, teacher))).json()) as { assignedAt: Record<string, number> };
    const assign = (body: Record<string, unknown>) => assignments.POST(req("/api/classes/assignments/", "POST", { classId: cls.id, unitKey, ...body }, teacher));

    const threeDaysAgo = Date.now() - 3 * 86_400_000;
    expect((await assign({ since: threeDaysAgo })).status).toBe(200);
    expect((await view()).assignedAt[unitKey]).toBe(threeDaysAgo);

    // Remove it and put it back as an undo would.
    expect((await assignments.DELETE(req(`/api/classes/assignments/?classId=${cls.id}&unitKey=${encodeURIComponent(unitKey)}`, "DELETE", undefined, teacher))).status).toBe(200);
    expect((await view()).assignedAt[unitKey]).toBeUndefined();
    expect((await assign({ since: threeDaysAgo })).status).toBe(200);
    expect((await view()).assignedAt[unitKey]).toBe(threeDaysAgo);

    // A date in the future, from long ago or not a number is ignored: the unit counts from now.
    for (const since of [Date.now() + 86_400_000, Date.now() - 400 * 86_400_000, "yesterday", 1.5]) {
      await assignments.DELETE(req(`/api/classes/assignments/?classId=${cls.id}&unitKey=${encodeURIComponent(unitKey)}`, "DELETE", undefined, teacher));
      const before = Date.now();
      expect((await assign({ since })).status).toBe(200);
      const at = (await view()).assignedAt[unitKey];
      expect(at).toBeGreaterThanOrEqual(before);
      expect(at).toBeLessThanOrEqual(Date.now());
    }
  });
});

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// Teacher-made student accounts against the real route handlers and a throwaway SQLite file.

const dir = mkdtempSync(join(tmpdir(), "grademap-students-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, sync: Mod, classes: Mod, assignments: Mod, studentRoutes: Mod, studentLogin: Mod, me: Mod, share: Mod, account: Mod;
let dbm: typeof import("@/server/db");

beforeAll(async () => {
  [signup, sync, classes, assignments, studentRoutes, studentLogin, me, share, account] = (await Promise.all([
    import("@/app/api/auth/signup/route"),
    import("@/app/api/sync/route"),
    import("@/app/api/classes/route"),
    import("@/app/api/classes/assignments/route"),
    import("@/app/api/classes/students/route"),
    import("@/app/api/students/login/route"),
    import("@/app/api/auth/me/route"),
    import("@/app/api/share/route"),
    import("@/app/api/account/route"),
  ])) as unknown as Mod[];
  dbm = await import("@/server/db");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let ip = 0;
const req = (path: string, method: string, body?: unknown, cookie?: string) =>
  new Request(`http://localhost${path}`, {
    method,
    headers: { "content-type": "application/json", "x-forwarded-for": `10.2.0.${++ip}`, ...(cookie ? { cookie } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

async function teacher(email: string, confirmed = true) {
  const res = await signup.POST(req("/api/auth/signup/", "POST", { email, password: "correct horse" }));
  if (confirmed) await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now(), email]);
  return (res.headers.get("set-cookie") ?? "").split(";")[0];
}

async function classWith(cookie: string, framework = "ca-bc") {
  const { class: cls } = await (await classes.POST(req("/api/classes/", "POST", { name: "Room 4", grade: "3", framework }, cookie))).json();
  return cls as { id: string; joinCode: string };
}

describe("teacher-made student accounts", () => {
  it("lets a teacher add students who sign in with codes and play, but nothing else", async () => {
    const t = await teacher("st-teacher@example.com");
    const cls = await classWith(t);
    const added = await (await studentRoutes.POST(req("/api/classes/students/", "POST", { classId: cls.id, names: ["Maya", " Sam <b>", ""] }, t))).json();
    expect(added.students.map((s: { name: string }) => s.name)).toEqual(["Maya", "Sam b"]);
    const [maya] = added.students as { loginCode: string; profileId: string }[];
    expect(maya.loginCode).toMatch(/^[A-HJKMNP-Z2-9]{8}$/);

    // Wrong codes fail; the right pair signs in.
    expect((await studentLogin.POST(req("/api/students/login/", "POST", { classCode: cls.joinCode, studentCode: "ZZZZZZZZ" }))).status).toBe(401);
    const login = await studentLogin.POST(req("/api/students/login/", "POST", { classCode: cls.joinCode, studentCode: maya.loginCode }));
    expect(login.status).toBe(200);
    const cookie = (login.headers.get("set-cookie") ?? "").split(";")[0];
    const { family } = await login.json();
    expect(family.account.student).toBe(true);
    expect(family.plan).toBe("premium");

    // Sync works and hands the child the profile the teacher made.
    const synced = await (await sync.POST(req("/api/sync/", "POST", {}, cookie))).json();
    expect(synced.profiles).toHaveLength(1);
    expect(synced.profiles[0]).toMatchObject({ name: "Maya", grade: "3", framework: "ca-bc" });

    // A class account can't rename itself, add a child or delete anyone.
    const now = Date.now() + 1000;
    await sync.POST(req("/api/sync/", "POST", { profiles: [{ ...synced.profiles[0], name: "Hacker", grade: "9", deleted: true, updatedAt: now }, { id: "extra", name: "Extra", grade: "3", avatar: "ollie", colour: "#fff", updatedAt: now }] }, cookie));
    const after = await (await sync.POST(req("/api/sync/", "POST", {}, cookie))).json();
    expect(after.profiles).toHaveLength(1);
    expect(after.profiles[0]).toMatchObject({ name: "Maya", grade: "3" });
    expect(after.profiles[0].deleted).toBeFalsy();

    // It is not a parent or teacher account: classes, sharing and account deletion are all closed to it.
    expect((await classes.GET(req("/api/classes/", "GET", undefined, cookie))).status).toBe(401);
    expect((await share.GET(req("/api/share/", "GET", undefined, cookie))).status).toBe(401);
    expect((await account.DELETE(req("/api/account/", "DELETE", { password: "x" }, cookie))).status).toBe(401);
    const who = await (await me.GET(req("/api/auth/me/", "GET", undefined, cookie))).json();
    expect(who.family.account.student).toBe(true);
  });

  it("lets a teacher fix a student's name or move them between a split class's grades, keeping their code and practice", async () => {
    const t = await teacher("st-edit@example.com");
    const { class: cls } = await (await classes.POST(req("/api/classes/", "POST", { name: "Room 3/4", grade: "3", grade2: "4", framework: "ca-bc" }, t))).json();
    const { students } = await (await studentRoutes.POST(req("/api/classes/students/", "POST", { classId: cls.id, names: ["Mya"], grade: "3" }, t))).json();
    const mya = students[0] as { id: string; loginCode: string; profileId: string };
    const patch = (body: unknown, studentId = mya.id) => studentRoutes.PATCH(req(`/api/classes/students/?classId=${cls.id}&studentId=${studentId}`, "PATCH", body, t));

    expect((await patch({ name: "Maya", grade: "4" })).status).toBe(200);
    const view = await (await classes.GET(req(`/api/classes/?id=${cls.id}`, "GET", undefined, t))).json();
    expect(view.students[0]).toMatchObject({ name: "Maya", grade: "4" });
    expect(view.roster[0].loginCode).toBe(mya.loginCode);
    const member = await dbm.query<{ grade: string }>("SELECT grade FROM class_members WHERE profile_id = ?", [mya.profileId]);
    expect(member[0].grade).toBe("4");

    // The student's device gets the new name on its next sync.
    const login = await studentLogin.POST(req("/api/students/login/", "POST", { classCode: cls.joinCode, studentCode: mya.loginCode }));
    const cookie = (login.headers.get("set-cookie") ?? "").split(";")[0];
    const synced = await (await sync.POST(req("/api/sync/", "POST", {}, cookie))).json();
    expect(synced.profiles[0]).toMatchObject({ name: "Maya", grade: "4" });

    // Only this class's grades and a real name are accepted, and only for this class's students.
    expect((await patch({ grade: "7" })).status).toBe(400);
    expect((await patch({ name: " <> " })).status).toBe(400);
    expect((await patch({ name: "Kai" }, "nobody")).status).toBe(404);
    const other = await teacher("st-edit-other@example.com");
    expect((await studentRoutes.PATCH(req(`/api/classes/students/?classId=${cls.id}&studentId=${mya.id}`, "PATCH", { name: "Hacked" }, other))).status).toBe(404);
    // A change with no name or grade is still "give a new code".
    expect((await patch(undefined)).status).toBe(200);
  });

  it("says how many students fit when a class fills up", async () => {
    const t = await teacher("st-limit@example.com");
    const cls = await classWith(t);
    const names = Array.from({ length: 40 }, (_, i) => `S${i}`);
    const first = await (await studentRoutes.POST(req("/api/classes/students/", "POST", { classId: cls.id, names: names.slice(0, 38) }, t))).json();
    expect(first.skipped).toBe(0);
    const second = await (await studentRoutes.POST(req("/api/classes/students/", "POST", { classId: cls.id, names: ["A1", "A2", "A3", "A4"] }, t))).json();
    expect(second).toMatchObject({ skipped: 2, limit: 40 });
    expect(second.students).toHaveLength(2);
  });

  it("syncs a US class student's practice without asking for a parent's consent", async () => {
    const t = await teacher("us-st-teacher@example.com");
    const cls = await classWith(t, "us-wa");
    const added = await (await studentRoutes.POST(req("/api/classes/students/", "POST", { classId: cls.id, names: ["Ava"] }, t))).json();
    const [ava] = added.students as { loginCode: string; profileId: string }[];
    const login = await studentLogin.POST(req("/api/students/login/", "POST", { classCode: cls.joinCode, studentCode: ava.loginCode }));
    const cookie = (login.headers.get("set-cookie") ?? "").split(";")[0];
    // Even if the class account's family were marked as US, the school's consent covers it.
    await dbm.run("UPDATE families SET country = 'US' WHERE id = (SELECT family_id FROM students WHERE profile_id = ?)", [ava.profileId]);
    const answer = { id: "us-st-e1", profileId: ava.profileId, type: "answer", t: Date.now() - 1000, unitKey: "3/math/x", correct: true };
    const res = await (await sync.POST(req("/api/sync/", "POST", { events: [answer] }, cookie))).json();
    expect(res.accepted).toEqual(["us-st-e1"]);
    expect(res.profiles).toHaveLength(1);
  });

  it("shows the teacher the students' progress and removes everything on request", async () => {
    const t = await teacher("st-teacher2@example.com");
    const cls = await classWith(t);
    const { students } = await (await studentRoutes.POST(req("/api/classes/students/", "POST", { classId: cls.id, names: ["Ana"] }, t))).json();
    const ana = students[0] as { id: string; loginCode: string; profileId: string };
    await assignments.POST(req("/api/classes/assignments/", "POST", { classId: cls.id, unitKey: "3/math/fractions", dueAt: Date.now() + 5 * 86_400_000 }, t));
    const view = await (await classes.GET(req(`/api/classes/?id=${cls.id}`, "GET", undefined, t))).json();
    expect(view.students.map((s: { name: string }) => s.name)).toEqual(["Ana"]);
    expect(view.roster[0].loginCode).toBe(ana.loginCode);
    expect(Object.keys(view.due)).toEqual(["3/math/fractions"]);

    // The student sees the unit and its due date through sync.
    const login = await studentLogin.POST(req("/api/students/login/", "POST", { classCode: cls.joinCode, studentCode: ana.loginCode }));
    const cookie = (login.headers.get("set-cookie") ?? "").split(";")[0];
    const synced = await (await sync.POST(req("/api/sync/", "POST", {}, cookie))).json();
    expect(synced.classwork[0].unitKeys).toEqual(["3/math/fractions"]);
    expect(Object.keys(synced.classwork[0].due)).toEqual(["3/math/fractions"]);

    // A new code signs the old one out.
    const renewed = await (await studentRoutes.PATCH(req(`/api/classes/students/?classId=${cls.id}&studentId=${ana.id}`, "PATCH", undefined, t))).json();
    expect(renewed.loginCode).not.toBe(ana.loginCode);
    expect((await sync.POST(req("/api/sync/", "POST", {}, cookie))).status).toBe(401);
    expect((await studentLogin.POST(req("/api/students/login/", "POST", { classCode: cls.joinCode, studentCode: ana.loginCode }))).status).toBe(401);

    // Removing the student deletes their records.
    expect((await studentRoutes.DELETE(req(`/api/classes/students/?classId=${cls.id}&studentId=${ana.id}`, "DELETE", undefined, t))).status).toBe(200);
    expect(await dbm.query("SELECT 1 FROM students WHERE id = ?", [ana.id])).toHaveLength(0);
    expect(await dbm.query("SELECT 1 FROM profiles WHERE id = ?", [ana.profileId])).toHaveLength(0);
    expect(await dbm.query("SELECT 1 FROM class_members WHERE profile_id = ?", [ana.profileId])).toHaveLength(0);
    expect(await dbm.query("SELECT 1 FROM parents WHERE email = ?", [`student-${ana.id}@students.invalid`])).toHaveLength(0);
  });

  it("keeps students to their own teacher, and deletes them when the class closes or the teacher leaves", async () => {
    const t = await teacher("st-teacher3@example.com");
    const other = await teacher("st-other@example.com");
    const cls = await classWith(t);
    const { students } = await (await studentRoutes.POST(req("/api/classes/students/", "POST", { classId: cls.id, names: ["Lee"] }, t))).json();
    const lee = students[0] as { id: string };
    // Another teacher can't add to, change or remove them.
    expect((await studentRoutes.POST(req("/api/classes/students/", "POST", { classId: cls.id, names: ["Intruder"] }, other))).status).toBe(404);
    expect((await studentRoutes.DELETE(req(`/api/classes/students/?classId=${cls.id}&studentId=${lee.id}`, "DELETE", undefined, other))).status).toBe(404);
    // Closing the class deletes the students.
    expect((await classes.DELETE(req(`/api/classes/?id=${cls.id}`, "DELETE", undefined, t))).status).toBe(200);
    expect(await dbm.query("SELECT 1 FROM students WHERE class_id = ?", [cls.id])).toHaveLength(0);
    expect(await dbm.query("SELECT 1 FROM parents WHERE role = 'student' AND email = ?", [`student-${lee.id}@students.invalid`])).toHaveLength(0);

    // Deleting a teacher account deletes the students in every class they had.
    const cls3 = await classWith(t);
    const made = await (await studentRoutes.POST(req("/api/classes/students/", "POST", { classId: cls3.id, names: ["Noor"] }, t))).json();
    expect(made.students).toHaveLength(1);
    expect((await account.DELETE(req("/api/account/", "DELETE", { password: "correct horse" }, t))).status).toBe(200);
    expect(await dbm.query("SELECT 1 FROM students WHERE class_id = ?", [cls3.id])).toHaveLength(0);
    expect(await dbm.query("SELECT 1 FROM profiles WHERE id = ?", [made.students[0].profileId])).toHaveLength(0);
  });

  it("limits wrong codes per network, never correct ones, and never locks a class out", async () => {
    const t = await teacher("st-teacher4@example.com");
    const cls = await classWith(t);
    const names = Array.from({ length: 30 }, (_, i) => `Kid ${i + 1}`);
    const { students } = (await (await studentRoutes.POST(req("/api/classes/students/", "POST", { classId: cls.id, names }, t))).json()) as { students: { loginCode: string }[] };
    expect(students).toHaveLength(30);
    const attempt = (studentCode: string, ip: string) =>
      studentLogin.POST(new Request("http://localhost/api/students/login/", { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": ip }, body: JSON.stringify({ classCode: cls.joinCode, studentCode }) }));

    // A whole class signs in from one school network, twice over, with a few typos.
    const school = "10.8.8.8";
    for (const round of [1, 2]) {
      for (const s of students) expect((await attempt(s.loginCode, school)).status, `round ${round}`).toBe(200);
    }
    for (let i = 0; i < 5; i++) expect((await attempt("AAAAAAAA", school)).status).toBe(401);
    expect((await attempt(students[0].loginCode, school)).status).toBe(200);

    // Someone guessing from another network is stopped there...
    let last = 0;
    for (let i = 0; i < 40; i++) last = (await attempt("BBBBBBBB", "10.9.9.9")).status;
    expect(last).toBe(429);
    expect((await attempt(students[1].loginCode, "10.9.9.9")).status).toBe(429);
    // ...while the class keeps signing in.
    expect((await attempt(students[1].loginCode, school)).status).toBe(200);
  });

  it("emails the admins, without locking anyone out, when a class gets many wrong codes from many networks", async () => {
    const { outbox } = await import("@/server/email");
    process.env.ADMIN_EMAILS = "alerts-admin@example.com";
    try {
      await teacher("alerts-admin@example.com");
      const t = await teacher("st-teacher5@example.com");
      const cls = await classWith(t);
      const { students } = (await (await studentRoutes.POST(req("/api/classes/students/", "POST", { classId: cls.id, names: ["Ivy"] }, t))).json()) as { students: { loginCode: string }[] };
      const attempt = (studentCode: string, ip: string) =>
        studentLogin.POST(new Request("http://localhost/api/students/login/", { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": ip }, body: JSON.stringify({ classCode: cls.joinCode, studentCode }) }));
      const before = outbox().length;
      for (let i = 0; i < 310; i++) await attempt("CCCCCCCC", `10.7.${Math.floor(i / 20)}.${i % 20}`);
      const alerts = outbox().slice(before).filter((m) => m.to === "alerts-admin@example.com");
      expect(alerts).toHaveLength(1);
      expect(alerts[0].subject).toContain("wrong student sign-ins");
      expect((await attempt(students[0].loginCode, "10.6.0.1")).status).toBe(200);
    } finally {
      delete process.env.ADMIN_EMAILS;
    }
  });
});

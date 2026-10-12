import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// Co-teachers against the real route handlers and a throwaway SQLite file.

const dir = mkdtempSync(join(tmpdir(), "grademap-coteach-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, login: Mod, classes: Mod, assignments: Mod, studentRoutes: Mod, teachers: Mod, invites: Mod, account: Mod;
let dbm: typeof import("@/server/db");
let studentsMod: typeof import("@/server/students");

beforeAll(async () => {
  [signup, login, classes, assignments, studentRoutes, teachers, invites, account] = (await Promise.all([
    import("@/app/api/auth/signup/route"),
    import("@/app/api/auth/login/route"),
    import("@/app/api/classes/route"),
    import("@/app/api/classes/assignments/route"),
    import("@/app/api/classes/students/route"),
    import("@/app/api/classes/teachers/route"),
    import("@/app/api/classes/invites/route"),
    import("@/app/api/account/route"),
  ])) as unknown as Mod[];
  dbm = await import("@/server/db");
  studentsMod = await import("@/server/students");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let ip = 0;
const req = (path: string, method: string, body?: unknown, cookie?: string, headers: Record<string, string> = {}) =>
  new Request(`http://localhost${path}`, {
    method,
    headers: { "content-type": "application/json", "x-forwarded-for": `10.3.0.${++ip}`, ...(cookie ? { cookie } : {}), ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

async function teacher(email: string, confirmed = true) {
  const res = await signup.POST(req("/api/auth/signup/", "POST", { email, password: "correct horse" }));
  if (confirmed) await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now(), email]);
  return (res.headers.get("set-cookie") ?? "").split(";")[0];
}

async function setup(prefix: string) {
  const owner = await teacher(`${prefix}-owner@example.com`);
  const co = await teacher(`${prefix}-co@example.com`);
  const { class: cls } = await (await classes.POST(req("/api/classes/", "POST", { name: "Room 4", grade: "3" }, owner))).json();
  return { owner, co, cls: cls as { id: string; joinCode: string }, coEmail: `${prefix}-co@example.com` };
}

const invite = (cookie: string, classId: string, email: string) => teachers.POST(req("/api/classes/teachers/", "POST", { classId, email }, cookie));
const accept = (cookie: string, classId: string) => invites.POST(req("/api/classes/invites/", "POST", { classId }, cookie));
const view = (cookie: string, id: string) => classes.GET(req(`/api/classes/?id=${id}`, "GET", undefined, cookie));

async function joined(prefix: string) {
  const s = await setup(prefix);
  expect((await invite(s.owner, s.cls.id, s.coEmail)).status).toBe(200);
  expect((await accept(s.co, s.cls.id)).status).toBe(200);
  return s;
}

describe("co-teachers", () => {
  it("shares a class only after the invitee accepts, and never reveals whether an account exists", async () => {
    const s = await setup("inv");
    // Nobody but the owner can invite.
    expect((await invite(s.co, s.cls.id, "x@example.com")).status).toBe(404);
    expect((await teachers.POST(req("/api/classes/teachers/", "POST", { classId: s.cls.id, email: "not-an-email" }, s.owner))).status).toBe(400);
    expect((await teachers.POST(req("/api/classes/teachers/", "POST", { classId: s.cls.id, email: "inv-owner@example.com" }, s.owner))).status).toBe(400);
    const known = await invite(s.owner, s.cls.id, s.coEmail.toUpperCase());
    const unknown = await invite(s.owner, s.cls.id, "nobody-here@example.com");
    expect([known.status, await known.json()]).toEqual([unknown.status, await unknown.json()]);
    // Invited but not yet a member: no access, and the invitation is visible to that address only.
    expect((await view(s.co, s.cls.id)).status).toBe(404);
    const mine = await (await invites.GET(req("/api/classes/invites/", "GET", undefined, s.co))).json();
    expect(mine.invites.map((i: { classId: string; from: string }) => [i.classId, i.from])).toEqual([[s.cls.id, "inv-owner@example.com"]]);
    const stranger = await teacher("inv-stranger@example.com");
    expect((await (await invites.GET(req("/api/classes/invites/", "GET", undefined, stranger))).json()).invites).toEqual([]);
    expect((await accept(stranger, s.cls.id)).status).toBe(404);
    // An unconfirmed account with the address can't accept.
    expect((await invite(s.owner, s.cls.id, "inv-late@example.com")).status).toBe(200);
    const late = await teacher("inv-late@example.com", false);
    expect((await accept(late, s.cls.id)).status).toBe(403);

    expect((await accept(s.co, s.cls.id)).status).toBe(200);
    const detail = await (await view(s.co, s.cls.id)).json();
    expect(detail.role).toBe("co-teacher");
    expect(detail.teachers.map((t: { email: string; role: string }) => [t.email, t.role])).toEqual([["inv-owner@example.com", "owner"], ["inv-co@example.com", "co-teacher"]]);
    expect(detail.invites).toEqual([]);
    expect((await (await view(s.owner, s.cls.id)).json()).invites.map((i: { email: string }) => i.email)).toEqual(["nobody-here@example.com", "inv-late@example.com"]);
    // Both see the class in their list; the invitation is used up.
    const list = await (await classes.GET(req("/api/classes/", "GET", undefined, s.co))).json();
    expect(list.classes.map((c: { id: string; role: string }) => [c.id, c.role])).toEqual([[s.cls.id, "co-teacher"]]);
    expect((await accept(s.co, s.cls.id)).status).toBe(404);
  });

  it("expires invitations, lets the invitee decline, and the owner cancel", async () => {
    const s = await setup("exp");
    await invite(s.owner, s.cls.id, s.coEmail);
    await dbm.run("UPDATE class_invites SET created_at = ?", [Date.now() - 15 * 86_400_000]);
    expect((await accept(s.co, s.cls.id)).status).toBe(404);
    await invite(s.owner, s.cls.id, s.coEmail);
    expect((await invites.DELETE(req(`/api/classes/invites/?classId=${s.cls.id}`, "DELETE", undefined, s.co))).status).toBe(200);
    expect((await accept(s.co, s.cls.id)).status).toBe(404);
    await invite(s.owner, s.cls.id, s.coEmail);
    expect((await teachers.DELETE(req(`/api/classes/teachers/?classId=${s.cls.id}&invite=${encodeURIComponent(s.coEmail)}`, "DELETE", undefined, s.owner))).status).toBe(200);
    expect((await accept(s.co, s.cls.id)).status).toBe(404);
  });

  it("limits the team size", async () => {
    const s = await setup("cap");
    for (let i = 0; i < 5; i++) expect((await invite(s.owner, s.cls.id, `cap-${i}@example.com`)).status).toBe(200);
    expect((await invite(s.owner, s.cls.id, "cap-6@example.com")).status).toBe(409);
  });

  it("gives a co-teacher the working tools and keeps the owner-only ones to the owner", async () => {
    const s = await joined("perm");
    // Assignments and students are shared.
    const bad = await assignments.POST(req("/api/classes/assignments/", "POST", { classId: s.cls.id, unitKey: "9/math/x" }, s.co));
    expect(bad.status).toBe(400);
    const units = await (await view(s.owner, s.cls.id)).json();
    expect(units.assignments).toEqual([]);
    const { getCourse, loadGrade } = await import("@/content");
    await loadGrade("3", "ca-bc");
    const firstUnit = getCourse("3", "math", "ca-bc")!.units[0].id;
    const key = `3/math/${firstUnit}`;
    expect((await assignments.POST(req("/api/classes/assignments/", "POST", { classId: s.cls.id, unitKey: key }, s.co))).status).toBe(200);
    expect((await (await view(s.owner, s.cls.id)).json()).assignments).toEqual([key]);
    const added = await (await studentRoutes.POST(req("/api/classes/students/", "POST", { classId: s.cls.id, names: ["Maya"] }, s.co))).json();
    const maya = added.students[0] as { id: string; loginCode: string };
    const seen = await (await view(s.co, s.cls.id)).json();
    expect(seen.roster.map((r: { loginCode: string }) => r.loginCode)).toEqual([maya.loginCode]);
    const reset = await studentRoutes.PATCH(req(`/api/classes/students/?classId=${s.cls.id}&studentId=${maya.id}`, "PATCH", undefined, s.co));
    expect(reset.status).toBe(200);
    expect((await assignments.DELETE(req(`/api/classes/assignments/?classId=${s.cls.id}&unitKey=${encodeURIComponent(key)}`, "DELETE", undefined, s.co))).status).toBe(200);

    // Owner-only: delete a student, a new join code, closing, inviting and removing co-teachers.
    expect((await studentRoutes.DELETE(req(`/api/classes/students/?classId=${s.cls.id}&studentId=${maya.id}`, "DELETE", undefined, s.co))).status).toBe(404);
    expect((await classes.PATCH(req(`/api/classes/?id=${s.cls.id}`, "PATCH", undefined, s.co))).status).toBe(404);
    expect((await classes.DELETE(req(`/api/classes/?id=${s.cls.id}`, "DELETE", undefined, s.co))).status).toBe(404);
    expect((await invite(s.co, s.cls.id, "perm-third@example.com")).status).toBe(404);
    expect((await teachers.DELETE(req(`/api/classes/teachers/?classId=${s.cls.id}&teacherId=anything`, "DELETE", undefined, s.co))).status).toBe(404);
    expect(await dbm.query("SELECT 1 FROM students WHERE id = ?", [maya.id])).toHaveLength(1);
    // The owner's own tools still work.
    expect((await classes.PATCH(req(`/api/classes/?id=${s.cls.id}`, "PATCH", undefined, s.owner))).status).toBe(200);
    // Unauthenticated and cross-site requests are refused.
    expect((await teachers.POST(req("/api/classes/teachers/", "POST", { classId: s.cls.id, email: "a@example.com" }))).status).toBe(401);
    expect((await teachers.POST(req("/api/classes/teachers/", "POST", { classId: s.cls.id, email: "a@example.com" }, s.owner, { origin: "https://evil.example", host: "localhost" }))).status).toBe(403);
    expect((await invites.POST(req("/api/classes/invites/", "POST", { classId: s.cls.id }, s.co, { origin: "https://evil.example", host: "localhost" }))).status).toBe(403);
    expect((await teachers.DELETE(req(`/api/classes/teachers/?classId=${s.cls.id}&leave=1`, "DELETE", undefined, s.co, { origin: "https://evil.example", host: "localhost" }))).status).toBe(403);
  });

  it("lets a co-teacher leave and the owner remove one, ending their access at once", async () => {
    const s = await joined("leave");
    expect((await teachers.DELETE(req(`/api/classes/teachers/?classId=${s.cls.id}&leave=1`, "DELETE", undefined, s.owner))).status).toBe(404);
    expect((await teachers.DELETE(req(`/api/classes/teachers/?classId=${s.cls.id}&leave=1`, "DELETE", undefined, s.co))).status).toBe(200);
    expect((await view(s.co, s.cls.id)).status).toBe(404);

    expect((await invite(s.owner, s.cls.id, s.coEmail)).status).toBe(200);
    expect((await accept(s.co, s.cls.id)).status).toBe(200);
    const teacherId = (await (await view(s.owner, s.cls.id)).json()).teachers[1].id;
    expect((await teachers.DELETE(req(`/api/classes/teachers/?classId=${s.cls.id}&teacherId=${teacherId}`, "DELETE", undefined, s.owner))).status).toBe(200);
    expect((await view(s.co, s.cls.id)).status).toBe(404);
  });

  it("removes co-teachers and invitations when the class is closed", async () => {
    const s = await joined("close");
    await invite(s.owner, s.cls.id, "close-pending@example.com");
    expect((await classes.DELETE(req(`/api/classes/?id=${s.cls.id}`, "DELETE", undefined, s.owner))).status).toBe(200);
    expect(await dbm.query("SELECT 1 FROM class_teachers WHERE class_id = ?", [s.cls.id])).toHaveLength(0);
    expect(await dbm.query("SELECT 1 FROM class_invites WHERE class_id = ?", [s.cls.id])).toHaveLength(0);
    expect((await classes.GET(req("/api/classes/", "GET", undefined, s.co))).status).toBe(200);
    expect((await (await classes.GET(req("/api/classes/", "GET", undefined, s.co))).json()).classes).toEqual([]);
  });

  it("passes a class to its longest-serving co-teacher when the owner deletes their account", async () => {
    const s = await joined("xfer");
    const third = await teacher("xfer-third@example.com");
    await invite(s.owner, s.cls.id, "xfer-third@example.com");
    await accept(third, s.cls.id);
    await dbm.run("UPDATE class_teachers SET joined_at = joined_at - 1000 WHERE parent_id = (SELECT id FROM parents WHERE email = ?)", [s.coEmail]);
    await invite(s.owner, s.cls.id, "xfer-pending@example.com");
    const { students } = await (await studentRoutes.POST(req("/api/classes/students/", "POST", { classId: s.cls.id, names: ["Noor"] }, s.co))).json();

    expect((await account.DELETE(req("/api/account/", "DELETE", { password: "correct horse" }, s.owner))).status).toBe(200);
    const row = (await dbm.query<{ owner_parent_id: string; closed_at: number | null }>("SELECT owner_parent_id, closed_at FROM classes WHERE id = ?", [s.cls.id]))[0];
    const heir = (await dbm.query<{ id: string }>("SELECT id FROM parents WHERE email = ?", [s.coEmail]))[0];
    expect(row.owner_parent_id).toBe(heir.id);
    // The students keep their accounts, the new owner has the full owner role, and the old owner's invitations are gone.
    expect(await dbm.query("SELECT 1 FROM students WHERE id = ?", [students[0].id])).toHaveLength(1);
    const detail = await (await view(s.co, s.cls.id)).json();
    expect(detail.role).toBe("owner");
    expect(detail.teachers.map((t: { email: string }) => t.email)).toEqual([s.coEmail, "xfer-third@example.com"]);
    expect(detail.invites).toEqual([]);
    expect((await classes.PATCH(req(`/api/classes/?id=${s.cls.id}`, "PATCH", undefined, s.co))).status).toBe(200);
    expect(await dbm.query("SELECT 1 FROM class_teachers WHERE class_id = ? AND parent_id = ?", [s.cls.id, heir.id])).toHaveLength(0);
  });

  it("deletes the class and its student accounts when an owner with no co-teacher deletes their account", async () => {
    const owner = await teacher("solo-owner@example.com");
    const { class: cls } = await (await classes.POST(req("/api/classes/", "POST", { name: "Solo", grade: "3" }, owner))).json();
    await invite(owner, cls.id, "solo-pending@example.com");
    const { students } = await (await studentRoutes.POST(req("/api/classes/students/", "POST", { classId: cls.id, names: ["Lee"] }, owner))).json();
    expect((await account.DELETE(req("/api/account/", "DELETE", { password: "correct horse" }, owner))).status).toBe(200);
    expect(await dbm.query("SELECT 1 FROM classes WHERE id = ?", [cls.id])).toHaveLength(0);
    expect(await dbm.query("SELECT 1 FROM students WHERE id = ?", [students[0].id])).toHaveLength(0);
    expect(await dbm.query("SELECT 1 FROM profiles WHERE id = ?", [students[0].profileId])).toHaveLength(0);
    expect(await dbm.query("SELECT 1 FROM class_invites WHERE class_id = ?", [cls.id])).toHaveLength(0);
  });

  it("drops a deleted co-teacher's links and the invitations addressed to them, but keeps the class", async () => {
    const s = await joined("codel");
    expect((await account.DELETE(req("/api/account/", "DELETE", { password: "correct horse" }, s.co))).status).toBe(200);
    expect(await dbm.query("SELECT 1 FROM class_teachers WHERE class_id = ?", [s.cls.id])).toHaveLength(0);
    expect((await view(s.owner, s.cls.id)).status).toBe(200);
    // A pending invitation to someone who then deletes their account disappears too.
    const other = await teacher("codel-other@example.com");
    await invite(s.owner, s.cls.id, "codel-other@example.com");
    await account.DELETE(req("/api/account/", "DELETE", { password: "correct horse" }, other));
    expect(await dbm.query("SELECT 1 FROM class_invites WHERE email = ?", ["codel-other@example.com"])).toHaveLength(0);
  });

  it("counts a co-teacher's sign-in as class activity, and erases the team with an inactive class", async () => {
    const s = await joined("idle");
    const old = Date.now() - 400 * 86_400_000;
    await dbm.run("UPDATE classes SET last_activity_at = ?, inactive_warning_at = ? WHERE id = ?", [old, old + 1, s.cls.id]);
    await login.POST(req("/api/auth/login/", "POST", { email: s.coEmail, password: "correct horse" }));
    const after = (await dbm.query<{ last_activity_at: number; inactive_warning_at: number | null }>("SELECT last_activity_at, inactive_warning_at FROM classes WHERE id = ?", [s.cls.id]))[0];
    expect(Number(after.last_activity_at)).toBeGreaterThan(old);
    expect(after.inactive_warning_at).toBeNull();

    // After 12 months with a warning, retention deletes the class, its students and its team.
    const { students } = await (await studentRoutes.POST(req("/api/classes/students/", "POST", { classId: s.cls.id, names: ["Sam"] }, s.co))).json();
    await invite(s.owner, s.cls.id, "idle-pending@example.com");
    await dbm.run("UPDATE classes SET last_activity_at = ?, inactive_warning_at = ? WHERE id = ?", [old, old + 1, s.cls.id]);
    const res = await studentsMod.deleteInactiveClass(s.cls.id, Date.now() - 365 * 86_400_000, Date.now() - 30 * 86_400_000);
    expect(res.deleted).toBe(true);
    expect(await dbm.query("SELECT 1 FROM class_teachers WHERE class_id = ?", [s.cls.id])).toHaveLength(0);
    expect(await dbm.query("SELECT 1 FROM class_invites WHERE class_id = ?", [s.cls.id])).toHaveLength(0);
    expect(await dbm.query("SELECT 1 FROM students WHERE id = ?", [students[0].id])).toHaveLength(0);
  });
});

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { MESSAGE_PRESETS, SEGMENTS } from "@/lib/adminEmails";
import { AUTOMATIONS } from "@/lib/automations";

// Teachers and parents get different emails: teacher accounts are marked, parent groups and the daily job's
// parent emails skip an account that only teaches, and teacher groups reach only teachers.

const dir = mkdtempSync(join(tmpdir(), "gradelings-teacher-email-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;
const DAY = 86_400_000;

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod;
let dbm: typeof import("@/server/db");
let mail: typeof import("@/server/adminEmail");

beforeAll(async () => {
  signup = (await import("@/server/testing/signupWithSession")) as unknown as Mod;
  dbm = await import("@/server/db");
  mail = await import("@/server/adminEmail");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let ip = 0;
async function account(address: string, to?: "teachers", agoDays = 5) {
  const res = await signup.POST(
    new Request("http://localhost/api/auth/signup/", {
      method: "POST",
      headers: { "content-type": "application/json", host: "localhost", "x-forwarded-for": `10.9.0.${++ip}` },
      body: JSON.stringify({ email: address, password: "correct horse", ...(to ? { to } : {}) }),
    }),
  );
  expect(res.status).toBe(200);
  await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now() - 60_000, address]);
  const row = (await dbm.query<{ id: string; family_id: string; account_type: string }>("SELECT id, family_id, account_type FROM parents WHERE email = ?", [address]))[0];
  await dbm.run("UPDATE families SET created_at = ? WHERE id = ?", [Date.now() - agoDays * DAY, row.family_id]);
  return { parentId: row.id, familyId: row.family_id, type: row.account_type };
}
const addChild = (familyId: string) => dbm.run("INSERT INTO profiles (id, family_id, data, updated_at) VALUES (?, ?, ?, ?)", [`p-${familyId}`, familyId, JSON.stringify({ name: "Maya", grade: "3" }), Date.now()]);
const addClass = (parentId: string, id: string, agoDays = 5) =>
  dbm.run("INSERT INTO classes (id, owner_parent_id, name, grade, framework, join_code, created_at, last_activity_at) VALUES (?, ?, 'Room 4', '3', 'ca-bc', ?, ?, ?)", [id, parentId, `C${id}`, Date.now() - agoDays * DAY, Date.now()]);
const reaches = async (segment: keyof typeof SEGMENTS) => (await mail.segmentMembers(segment)).ready.map((r) => r.email);

describe("account type", () => {
  it("is teacher when the account is made from the teacher area, parent otherwise", async () => {
    expect((await account("t1@example.com", "teachers")).type).toBe("teacher");
    expect((await account("p1@example.com")).type).toBe("parent");
  });

  it("marks a parent who starts a class as a teacher", async () => {
    const { markTeacher } = await import("@/server/audience");
    const a = await account("p2@example.com");
    await markTeacher(a.parentId);
    expect((await dbm.query<{ account_type: string }>("SELECT account_type FROM parents WHERE id = ?", [a.parentId]))[0].account_type).toBe("teacher");
  });
});

describe("groups", () => {
  it("parent groups skip a teacher with no child, and keep a teacher who added one", async () => {
    await account("par-a@example.com");
    await account("tea-a@example.com", "teachers");
    const both = await account("tea-b@example.com", "teachers");
    await addChild(both.familyId);
    const everyone = await reaches("parents");
    expect(everyone).toContain("par-a@example.com");
    expect(everyone).not.toContain("tea-a@example.com");
    expect(everyone).toContain("tea-b@example.com");
    // "No child added" is a parent group: the teacher without a child never shows up in it.
    expect(await reaches("no-child")).not.toContain("tea-a@example.com");
    expect(await reaches("no-child")).toContain("par-a@example.com");
  });

  it("teacher groups reach teachers who haven't started a class, or have no students", async () => {
    await account("par-b@example.com");
    const noClass = await account("tea-c@example.com", "teachers");
    const empty = await account("tea-d@example.com", "teachers");
    await addClass(empty.parentId, "c-empty");
    const busy = await account("tea-e@example.com", "teachers");
    await addClass(busy.parentId, "c-busy");
    await dbm.run("INSERT INTO class_members (class_id, family_id, profile_id, joined_at) VALUES ('c-busy', ?, 'x', 1)", [busy.familyId]);

    expect(noClass.type).toBe("teacher");
    const none = await reaches("teacher-no-class");
    expect(none).toContain("tea-c@example.com");
    expect(none).not.toContain("tea-d@example.com");
    expect(none).not.toContain("par-b@example.com");
    const noStudents = await reaches("teacher-no-students");
    expect(noStudents).toContain("tea-d@example.com");
    expect(noStudents).not.toContain("tea-e@example.com");
    expect(await reaches("teachers")).not.toContain("par-b@example.com");
    expect(await reaches("teachers")).toContain("tea-c@example.com");
  });
});

describe("content", () => {
  it("every group and automation has a message written for its audience", () => {
    for (const a of AUTOMATIONS) {
      const preset = MESSAGE_PRESETS.find((p) => p.id === a.preset);
      expect(preset, a.id).toBeTruthy();
      const audience = SEGMENTS[a.segment].audience;
      if (audience !== "all") expect(preset!.audience, a.id).toBe(audience);
    }
  });

  it("teacher messages say nothing about children, trials or the family plan", () => {
    for (const p of MESSAGE_PRESETS.filter((x) => x.audience === "teachers")) {
      expect(`${p.subject} ${p.body}`, p.id).not.toMatch(/\{children\}|trial|family plan|subscribe|child/i);
    }
  });
});

describe("admin users tab", () => {
  it("lists the type, filters by it and lets an admin change it", async () => {
    process.env.ADMIN_EMAILS = "type-admin@example.com";
    process.env.ADMIN_2FA = "optional";
    const users = (await import("@/app/api/admin/users/route")) as unknown as Mod;
    const admin = await account("type-admin@example.com");
    const cookieRes = await signup.POST(
      new Request("http://localhost/api/auth/signup/", { method: "POST", headers: { "content-type": "application/json", host: "localhost", "x-forwarded-for": "10.9.9.9" }, body: JSON.stringify({ email: "type-admin2@example.com", password: "correct horse" }) }),
    );
    expect(cookieRes.status).toBe(200);
    // Sign the admin in with a session cookie from the real login route.
    const login = (await import("@/app/api/auth/login/route")) as unknown as Mod;
    const res = await login.POST(
      new Request("http://localhost/api/auth/login/", { method: "POST", headers: { "content-type": "application/json", host: "localhost", "x-forwarded-for": "10.9.9.8" }, body: JSON.stringify({ email: "type-admin@example.com", password: "correct horse" }) }),
    );
    const cookie = (res.headers.get("set-cookie") ?? "").split(";")[0];
    const call = (path: string, method = "GET", body?: unknown) =>
      (method === "GET" ? users.GET : users.POST)(
        new Request(`http://localhost${path}`, { method, headers: { "content-type": "application/json", host: "localhost", cookie, "x-forwarded-for": "10.9.9.7" }, body: body === undefined ? undefined : JSON.stringify(body) }),
      );

    const t = await account("filter-teacher@example.com", "teachers");
    const teachers = (await (await call("/api/admin/users/?type=teacher")).json()).users as { email: string; accountType: string }[];
    expect(teachers.map((u) => u.email)).toContain("filter-teacher@example.com");
    expect(teachers.every((u) => u.accountType === "teacher")).toBe(true);
    const parents = (await (await call("/api/admin/users/?type=parent")).json()).users as { email: string }[];
    expect(parents.map((u) => u.email)).not.toContain("filter-teacher@example.com");

    expect((await call("/api/admin/users/", "POST", { familyId: t.familyId, action: "set-account-type", parentId: t.parentId, type: "parent" })).status).toBe(200);
    expect((await dbm.query<{ account_type: string }>("SELECT account_type FROM parents WHERE id = ?", [t.parentId]))[0].account_type).toBe("parent");
    expect((await call("/api/admin/users/", "POST", { familyId: t.familyId, action: "set-account-type", parentId: t.parentId, type: "wizard" })).status).toBe(400);
    expect(admin.type).toBe("parent");
  });
});

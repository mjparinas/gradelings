import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const dir = mkdtempSync(join(tmpdir(), "grademap-students-rules-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;

let dbm: typeof import("@/server/db");
let st: typeof import("@/server/students");
let classroom: typeof import("@/server/classroom");

beforeAll(async () => {
  dbm = await import("@/server/db");
  st = await import("@/server/students");
  classroom = await import("@/server/classroom");
  await dbm.db();
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let n = 0;
async function makeClass(grade = "4", framework = "ca-bc", activity = { last: 0, warned: 0 as number | null }) {
  const id = `cls_${++n}`;
  await dbm.run(
    "INSERT INTO classes (id, owner_parent_id, name, grade, join_code, created_at, last_activity_at, inactive_warning_at) VALUES (?, 'owner', 'C', ?, ?, 1, ?, ?)",
    [id, grade, `JC${n}`, activity.last, activity.warned],
  );
  return { id, owner_parent_id: "owner", name: "C", grade, grade2: null, framework, join_code: `JC${n}`, created_at: 1, closed_at: null } as unknown as import("@/server/classroom").ClassRow;
}
const count = async (sql: string, args: (string | number)[] = []) => Number((await dbm.query<{ n: number }>(sql, args))[0].n);

/** Plants rows of every kind that belong to a student's hidden family. */
async function plant(familyId: string, profileId: string, classId: string) {
  const tag = `${familyId}-${++n}`;
  await dbm.run("INSERT INTO events (id, family_id, profile_id, t, data) VALUES (?, ?, ?, 1, '{}')", [`ev-${tag}`, familyId, profileId]);
  await dbm.run("INSERT INTO report_shares (token_hash, family_id, profile_id, days, created_at, expires_at) VALUES (?, ?, ?, 7, 1, 2)", [`rs-${tag}`, familyId, profileId]);
  await dbm.run("INSERT INTO live_answers (question_id, profile_id, family_id, choice, correct, at) VALUES (?, ?, ?, 'a', 1, 1)", [`lq-${tag}`, profileId, familyId]);
  await dbm.run("INSERT INTO sessions (token_hash, parent_id, family_id, expires_at, created_at) VALUES (?, 'p', ?, 9, 1)", [`se-${tag}`, familyId]);
  await dbm.run("INSERT INTO class_assignment_students (class_id, unit_key, profile_id) VALUES (?, 'u', ?)", [classId, profileId]);
}
const studentRows = (classId: string) => dbm.query<{ id: string; family_id: string; profile_id: string; parent_id: string; login_code: string }>("SELECT * FROM students WHERE class_id = ? ORDER BY created_at, id", [classId]);
const tablesFor = (familyId: string, profileId: string, classId: string) => ({
  events: count("SELECT COUNT(*) AS n FROM events WHERE family_id = ?", [familyId]),
  settings: count("SELECT COUNT(*) AS n FROM child_settings WHERE family_id = ?", [familyId]),
  profiles: count("SELECT COUNT(*) AS n FROM profiles WHERE family_id = ?", [familyId]),
  shares: count("SELECT COUNT(*) AS n FROM report_shares WHERE family_id = ?", [familyId]),
  members: count("SELECT COUNT(*) AS n FROM class_members WHERE family_id = ?", [familyId]),
  picks: count("SELECT COUNT(*) AS n FROM class_assignment_students WHERE profile_id = ?", [profileId]),
  live: count("SELECT COUNT(*) AS n FROM live_answers WHERE family_id = ?", [familyId]),
  sessions: count("SELECT COUNT(*) AS n FROM sessions WHERE family_id = ?", [familyId]),
  parents: count("SELECT COUNT(*) AS n FROM parents WHERE family_id = ?", [familyId]),
  families: count("SELECT COUNT(*) AS n FROM families WHERE id = ?", [familyId]),
  students: count("SELECT COUNT(*) AS n FROM students WHERE class_id = ? AND family_id = ?", [classId, familyId]),
});
async function totals(familyId: string, profileId: string, classId: string) {
  const t = tablesFor(familyId, profileId, classId);
  return Object.fromEntries(await Promise.all(Object.entries(t).map(async ([k, v]) => [k, await v])));
}
const ALL_ONE = { events: 1, settings: 1, profiles: 1, shares: 1, members: 1, picks: 1, live: 1, sessions: 1, parents: 1, families: 1, students: 1 };
const ALL_GONE = Object.fromEntries(Object.keys(ALL_ONE).map((k) => [k, 0]));

describe("codes and names", () => {
  it("normalises what a student types", () => {
    expect(st.normalizeStudentCode(" ab-cd 2345 efgh jk")).toBe("ABCD2345EF");
    expect(st.normalizeStudentCode("abc!?")).toBe("ABC");
    expect(st.normalizeStudentCode(null)).toBe("");
    expect(st.normalizeStudentCode(undefined)).toBe("");
    expect(st.normalizeStudentCode(12)).toBe("12");
  });
  it("makes ten-character codes from the readable alphabet", () => {
    for (let i = 0; i < 50; i++) expect(st.newStudentCode()).toMatch(/^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{10}$/);
  });
  it("cleans names", () => {
    expect(st.cleanStudentName('  <b>Ana</b> & "Bo"\\  ')).toBe("bAna/b Bo");
    expect(st.cleanStudentName("Mary\t\n  Jane")).toBe("Mary Jane");
    expect(st.cleanStudentName("x".repeat(40))).toHaveLength(20);
    expect(st.cleanStudentName("   ")).toBe("");
    expect(st.cleanStudentName(null)).toBe("");
    expect(st.cleanStudentName(7)).toBe("7");
  });
});

describe("addStudents", () => {
  it("makes a premium student family with a unique code, cycling avatars and colours from the class's size", async () => {
    const cls = await makeClass("4");
    const first = await st.addStudents(cls, ["Ana", "Bo", "Cy"]);
    expect(first.map((s) => s.name)).toEqual(["Ana", "Bo", "Cy"]);
    expect(new Set(first.map((s) => s.loginCode)).size).toBe(3);
    for (const s of first) expect(s.loginCode).toMatch(/^[A-Z2-9]{10}$/);
    const second = await st.addStudents(cls, ["Di"]);
    const profiles = await dbm.query<{ id: string; data: string }>("SELECT id, data FROM profiles WHERE family_id IN (SELECT family_id FROM students WHERE class_id = ?)", [cls.id]);
    const byName = Object.fromEntries(profiles.map((p) => [JSON.parse(p.data).name, JSON.parse(p.data)]));
    const avatars = ["ollie", "hoot", "ruby", "bolt"];
    const colours = ["#ff9636", "#4f8ef7", "#25b47e", "#e9559a"];
    ["Ana", "Bo", "Cy", "Di"].forEach((name, i) => {
      expect(byName[name].avatar).toBe(avatars[i]);
      expect(byName[name].colour).toBe(colours[i]);
      expect(byName[name].grade).toBe("4");
      expect(byName[name].framework).toBe("ca-bc");
    });
    expect(second[0].profileId).toBe(profiles.find((p) => JSON.parse(p.data).name === "Di")!.id);
    // wraps after the lists run out
    const many = await makeClass("4");
    await st.addStudents(many, Array.from({ length: 11 }, (_, i) => `S${i}`));
    const last = (await dbm.query<{ data: string }>("SELECT data FROM profiles WHERE family_id IN (SELECT family_id FROM students WHERE class_id = ?)", [many.id])).map((r) => JSON.parse(r.data)).find((p) => p.name === "S10");
    expect(last.avatar).toBe("ollie");
    expect(last.colour).toBe("#25b47e"); // 10 % 8 = 2
  });

  it("takes only as many as fit, gives little kids their defaults, and records external ids", async () => {
    const cls = await makeClass("k");
    const made = await st.addStudents(cls, ["A", "B"], "k", ["ext-1"]);
    const rows = await studentRows(cls.id);
    expect(rows.map((r) => (r as unknown as { external_id: string | null }).external_id).sort()).toEqual([null, "ext-1"].sort());
    const settings = JSON.parse((await dbm.query<{ data: string }>("SELECT data FROM child_settings WHERE profile_id = ?", [made[0].profileId]))[0].data);
    expect(settings.updatedAt).toBeGreaterThan(0);
    const { defaultChildSettings } = await import("@/lib/model");
    expect(settings.autoRead).toBe(defaultChildSettings("x", true, "k").autoRead);
    const big = await makeClass("7");
    const bigMade = await st.addStudents(big, ["A"], "7");
    const bigSettings = JSON.parse((await dbm.query<{ data: string }>("SELECT data FROM child_settings WHERE profile_id = ?", [bigMade[0].profileId]))[0].data);
    expect(bigSettings.autoRead).toBe(defaultChildSettings("x", false, "7").autoRead);
    const fam = (await dbm.query<{ plan: string }>("SELECT plan FROM families WHERE id = ?", [rows[0].family_id]))[0];
    expect(fam.plan).toBe("premium");
    const parent = (await dbm.query<{ role: string; password_hash: string }>("SELECT role, password_hash FROM parents WHERE id = ?", [rows[0].parent_id]))[0];
    expect(parent).toEqual({ role: "student", password_hash: "!" });
  });

  it("stops at the class limit", async () => {
    const cls = await makeClass("3");
    const first = await st.addStudents(cls, Array.from({ length: classroom.MAX_STUDENTS - 1 }, (_, i) => `S${i}`));
    expect(first).toHaveLength(classroom.MAX_STUDENTS - 1);
    expect(await st.addStudents(cls, ["x", "y", "z"])).toHaveLength(1);
    expect(await st.addStudents(cls, ["more"])).toHaveLength(0);
  });
});

describe("removing students", () => {
  it("erases one student everywhere and leaves a classmate alone", async () => {
    const cls = await makeClass();
    const [a, b] = await st.addStudents(cls, ["A", "B"]);
    const rows = await studentRows(cls.id);
    const ra = rows.find((r) => r.id === a.id)!;
    const rb = rows.find((r) => r.id === b.id)!;
    await plant(ra.family_id, ra.profile_id, cls.id);
    await plant(rb.family_id, rb.profile_id, cls.id);
    expect(await totals(ra.family_id, ra.profile_id, cls.id)).toEqual(ALL_ONE);
    expect(await st.removeStudent(cls.id, "nope")).toBe(false);
    expect(await st.removeStudent("other-class", a.id)).toBe(false);
    expect(await totals(ra.family_id, ra.profile_id, cls.id)).toEqual(ALL_ONE);
    expect(await st.removeStudent(cls.id, a.id)).toBe(true);
    expect(await totals(ra.family_id, ra.profile_id, cls.id)).toEqual(ALL_GONE);
    expect(await totals(rb.family_id, rb.profile_id, cls.id)).toEqual(ALL_ONE);
  });

  it("erases a whole class's students and counts them", async () => {
    const cls = await makeClass();
    const other = await makeClass();
    await st.addStudents(cls, ["A", "B", "C"]);
    await st.addStudents(other, ["Z"]);
    const rows = await studentRows(cls.id);
    for (const r of rows) await plant(r.family_id, r.profile_id, cls.id);
    expect(await st.removeClassStudents(cls.id)).toBe(3);
    for (const r of rows) expect(await totals(r.family_id, r.profile_id, cls.id)).toEqual(ALL_GONE);
    expect(await studentRows(other.id)).toHaveLength(1);
    expect(await st.removeClassStudents(cls.id)).toBe(0);
  });

  it("erases the students of every class an owner has", async () => {
    const c1 = await makeClass();
    const c2 = await makeClass();
    await dbm.run("UPDATE classes SET owner_parent_id = 'boss' WHERE id IN (?, ?)", [c1.id, c2.id]);
    const c3 = await makeClass();
    await st.addStudents(c1, ["A"]);
    await st.addStudents(c2, ["B"]);
    await st.addStudents(c3, ["C"]);
    await st.removeStudentsOfOwner(["boss"]);
    expect(await studentRows(c1.id)).toHaveLength(0);
    expect(await studentRows(c2.id)).toHaveLength(0);
    expect(await studentRows(c3.id)).toHaveLength(1);
  });
});

describe("deleteInactiveClass", () => {
  const cutoff = 1_000_000;
  const warnCutoff = 2_000_000;
  async function setup(activity: { last: number; warned: number | null }) {
    const cls = await makeClass("4", "ca-bc", activity);
    await st.addStudents(cls, ["A", "B"]);
    const rows = await studentRows(cls.id);
    for (const r of rows) await plant(r.family_id, r.profile_id, cls.id);
    await dbm.run("INSERT INTO class_assignments (class_id, unit_key, created_at) VALUES (?, 'u', 1)", [cls.id]);
    await dbm.run("INSERT INTO class_teachers (class_id, parent_id, joined_at) VALUES (?, 'co', 1)", [cls.id]);
    await dbm.run("INSERT INTO class_invites (class_id, email, invited_by, created_at) VALUES (?, 'x@example.com', 'owner', 1)", [cls.id]);
    await dbm.run("INSERT INTO live_questions (id, class_id, unit_key, n, data, started_by, created_at) VALUES (?, ?, 'u', 1, '{}', 'owner', 1)", [`q-${cls.id}`, cls.id]);
    await dbm.run("INSERT INTO live_answers (question_id, profile_id, family_id, choice, correct, at) VALUES (?, 'pp', 'ff', 'a', 1, 1)", [`q-${cls.id}`]);
    return { cls, rows };
  }
  const left = async (cls: { id: string }) => ({
    cls: await count("SELECT COUNT(*) AS n FROM classes WHERE id = ?", [cls.id]),
    students: await count("SELECT COUNT(*) AS n FROM students WHERE class_id = ?", [cls.id]),
    members: await count("SELECT COUNT(*) AS n FROM class_members WHERE class_id = ?", [cls.id]),
    assignments: await count("SELECT COUNT(*) AS n FROM class_assignments WHERE class_id = ?", [cls.id]),
    teachers: await count("SELECT COUNT(*) AS n FROM class_teachers WHERE class_id = ?", [cls.id]),
    invites: await count("SELECT COUNT(*) AS n FROM class_invites WHERE class_id = ?", [cls.id]),
    questions: await count("SELECT COUNT(*) AS n FROM live_questions WHERE class_id = ?", [cls.id]),
    answers: await count("SELECT COUNT(*) AS n FROM live_answers WHERE question_id = ?", [`q-${cls.id}`]),
  });

  it("deletes the class and everything in it once it was warned and idle", async () => {
    const { cls, rows } = await setup({ last: cutoff, warned: warnCutoff });
    const { cls: neighbour, rows: nrows } = await setup({ last: cutoff + 1, warned: warnCutoff });
    expect(await st.deleteInactiveClass(cls.id, cutoff, warnCutoff)).toEqual({ deleted: true, students: 2 });
    expect(await left(cls)).toEqual({ cls: 0, students: 0, members: 0, assignments: 0, teachers: 0, invites: 0, questions: 0, answers: 0 });
    for (const r of rows) expect(await totals(r.family_id, r.profile_id, cls.id)).toEqual(ALL_GONE);
    expect(await left(neighbour)).toEqual({ cls: 1, students: 2, members: 2, assignments: 1, teachers: 1, invites: 1, questions: 1, answers: 1 });
    for (const r of nrows) expect(await totals(r.family_id, r.profile_id, neighbour.id)).toEqual(ALL_ONE);
  });

  it.each([
    ["recent activity", { last: cutoff + 1, warned: warnCutoff }],
    ["no warning sent", { last: cutoff, warned: null }],
    ["a warning sent too recently", { last: cutoff, warned: warnCutoff + 1 }],
  ])("keeps a class with %s", async (_label, activity) => {
    const { cls, rows } = await setup(activity);
    expect(await st.deleteInactiveClass(cls.id, cutoff, warnCutoff)).toEqual({ deleted: false, students: 0 });
    expect(await left(cls)).toEqual({ cls: 1, students: 2, members: 2, assignments: 1, teachers: 1, invites: 1, questions: 1, answers: 1 });
    for (const r of rows) expect(await totals(r.family_id, r.profile_id, cls.id)).toEqual(ALL_ONE);
  });

  it("keeps a closed class", async () => {
    const { cls } = await setup({ last: cutoff, warned: warnCutoff });
    await dbm.run("UPDATE classes SET closed_at = 5 WHERE id = ?", [cls.id]);
    expect((await st.deleteInactiveClass(cls.id, cutoff, warnCutoff)).deleted).toBe(false);
    expect((await left(cls)).students).toBe(2);
  });

  it("answers for a class that does not exist", async () => {
    expect(await st.deleteInactiveClass("ghost", cutoff, warnCutoff)).toEqual({ deleted: true, students: 0 });
  });
});

describe("login codes", () => {
  async function one() {
    const cls = await makeClass();
    const [s] = await st.addStudents(cls, ["A"]);
    const row = (await studentRows(cls.id))[0];
    await dbm.run("INSERT INTO sessions (token_hash, parent_id, family_id, expires_at, created_at) VALUES (?, ?, ?, 9, 1)", [`se-${++n}`, row.parent_id, row.family_id]);
    return { cls, s, row };
  }
  const sessionsOf = (familyId: string) => count("SELECT COUNT(*) AS n FROM sessions WHERE family_id = ?", [familyId]);
  const codeOf = async (id: string) => (await dbm.query<{ login_code: string; prev_login_code: string | null; prev_code_at: number | null }>("SELECT login_code, prev_login_code, prev_code_at FROM students WHERE id = ?", [id]))[0];

  it("resets a code, remembers the old one and signs the student out", async () => {
    const { cls, s, row } = await one();
    expect(await st.resetStudentCode(cls.id, "ghost")).toBeNull();
    expect(await st.resetStudentCode("other", s.id)).toBeNull();
    expect((await codeOf(s.id)).login_code).toBe(s.loginCode);
    const fresh = await st.resetStudentCode(cls.id, s.id, 5000);
    expect(fresh).toMatch(/^[A-Z2-9]{10}$/);
    expect(fresh).not.toBe(s.loginCode);
    expect(await codeOf(s.id)).toEqual({ login_code: fresh, prev_login_code: s.loginCode, prev_code_at: 5000 });
    expect(await sessionsOf(row.family_id)).toBe(0);
  });

  it("restores the old code within ten minutes, once", async () => {
    const { cls, s, row } = await one();
    const fresh = await st.resetStudentCode(cls.id, s.id, 1000);
    await dbm.run("INSERT INTO sessions (token_hash, parent_id, family_id, expires_at, created_at) VALUES (?, ?, ?, 9, 1)", [`se-${++n}`, row.parent_id, row.family_id]);
    expect(await st.restoreStudentCode(cls.id, "ghost", 2000)).toBeNull();
    expect(await st.restoreStudentCode("other", s.id, 2000)).toBeNull();
    expect(await st.restoreStudentCode(cls.id, s.id, 1000 + st.CODE_UNDO_MS)).toBe(s.loginCode);
    expect(await codeOf(s.id)).toEqual({ login_code: s.loginCode, prev_login_code: null, prev_code_at: null });
    expect(await sessionsOf(row.family_id)).toBe(0);
    expect(await st.restoreStudentCode(cls.id, s.id, 2000)).toBeNull();
    expect(fresh).not.toBe(s.loginCode);
  });

  it("is too late one millisecond past ten minutes, and when there was never a reset", async () => {
    const { cls, s } = await one();
    expect(await st.restoreStudentCode(cls.id, s.id, 1)).toBeNull();
    await st.resetStudentCode(cls.id, s.id, 1000);
    expect(st.CODE_UNDO_MS).toBe(600_000);
    expect(await st.restoreStudentCode(cls.id, s.id, 1000 + st.CODE_UNDO_MS + 1)).toBeNull();
  });

  it("will not restore a code another student in the class now holds", async () => {
    const { cls, s } = await one();
    await st.resetStudentCode(cls.id, s.id, 1000);
    const [other] = await st.addStudents(cls, ["B"]);
    await dbm.run("UPDATE students SET login_code = ? WHERE id = ?", [s.loginCode, other.id]);
    expect(await st.restoreStudentCode(cls.id, s.id, 2000)).toBeNull();
  });

  it("forgets previous codes older than the undo window and keeps newer ones", async () => {
    const cls = await makeClass();
    const [a, b, c] = await st.addStudents(cls, ["A", "B", "C"]);
    await dbm.run("UPDATE students SET prev_login_code = 'OLDCODE222', prev_code_at = ? WHERE id = ?", [1000, a.id]);
    await dbm.run("UPDATE students SET prev_login_code = 'OLDCODE333', prev_code_at = ? WHERE id = ?", [2000, b.id]);
    await st.pruneOldCodes(1000 + st.CODE_UNDO_MS + 1);
    expect((await codeOf(a.id)).prev_login_code).toBeNull();
    expect((await codeOf(b.id)).prev_login_code).toBe("OLDCODE333");
    await st.pruneOldCodes(1000 + st.CODE_UNDO_MS); // exactly at the window: not older
    expect((await codeOf(b.id)).prev_login_code).toBe("OLDCODE333");
    await st.pruneOldCodes(2000 + st.CODE_UNDO_MS + 1);
    expect((await codeOf(b.id)).prev_login_code).toBeNull();
    expect((await codeOf(c.id)).prev_code_at).toBeNull();
  });

  it("moves older two-code logins to one code and signs them out", async () => {
    const cls = await makeClass();
    const other = await makeClass();
    await st.addStudents(cls, ["A", "B", "C"]);
    await st.addStudents(other, ["Z"]);
    const rows = await studentRows(cls.id);
    await dbm.run("UPDATE students SET login_code = 'ABCD2345' WHERE id = ?", [rows[0].id]);
    await dbm.run("UPDATE students SET login_code = 'EFGH2345' WHERE id = ?", [rows[1].id]);
    await dbm.run("UPDATE students SET login_code = 'JKMN2345' WHERE class_id = ? AND id NOT IN (?, ?, ?)", [other.id, "x", "y", "z"]);
    for (const r of rows) await dbm.run("INSERT INTO sessions (token_hash, parent_id, family_id, expires_at, created_at) VALUES (?, ?, ?, 9, 1)", [`se-${++n}`, r.parent_id, r.family_id]);
    const otherRow = (await studentRows(other.id))[0];
    await dbm.run("INSERT INTO sessions (token_hash, parent_id, family_id, expires_at, created_at) VALUES (?, ?, ?, 9, 1)", [`se-${++n}`, otherRow.parent_id, otherRow.family_id]);

    expect(await st.upgradeClassCodes(cls.id)).toBe(2);
    const after = await studentRows(cls.id);
    expect(after.every((r) => r.login_code.length === st.STUDENT_CODE_LENGTH)).toBe(true);
    expect(after.find((r) => r.id === rows[2].id)!.login_code).toBe(rows[2].login_code); // already one-code
    expect(await sessionsOf(rows[0].family_id)).toBe(0);
    expect(await sessionsOf(rows[1].family_id)).toBe(0);
    expect(await sessionsOf(rows[2].family_id)).toBe(1);
    expect((await studentRows(other.id))[0].login_code).toBe("JKMN2345");
    expect(await sessionsOf(otherRow.family_id)).toBe(1);
    expect(await st.upgradeClassCodes(cls.id)).toBe(0);
  });

  it("lists a class roster oldest first", async () => {
    const cls = await makeClass();
    const made = await st.addStudents(cls, ["A", "B"]);
    const roster = await st.classRoster(cls.id);
    expect(roster).toHaveLength(2);
    expect(roster.map((r) => r.id).sort()).toEqual(made.map((m) => m.id).sort());
    expect(roster[0]).toEqual({ id: roster[0].id, profileId: expect.any(String), loginCode: expect.any(String) });
  });
});

describe("updateStudent", () => {
  it("changes only what was asked and keeps codes", async () => {
    const cls = await makeClass("4");
    const [s] = await st.addStudents(cls, ["Old"]);
    const profileOf = async () => JSON.parse((await dbm.query<{ data: string }>("SELECT data FROM profiles WHERE id = ?", [s.profileId]))[0].data);
    expect(await st.updateStudent(cls.id, "ghost", { name: "X" })).toBe(false);
    expect(await st.updateStudent("other", s.id, { name: "X" })).toBe(false);
    expect(await st.updateStudent(cls.id, s.id, { name: "New" }, 777)).toBe(true);
    let p = await profileOf();
    expect(p).toMatchObject({ name: "New", grade: "4", updatedAt: 777 });
    expect((await dbm.query<{ updated_at: number }>("SELECT updated_at FROM profiles WHERE id = ?", [s.profileId]))[0].updated_at).toBe(777);
    expect(await st.updateStudent(cls.id, s.id, { grade: "5" }, 888)).toBe(true);
    p = await profileOf();
    expect(p).toMatchObject({ name: "New", grade: "5", updatedAt: 888 });
    expect((await dbm.query<{ grade: string }>("SELECT grade FROM class_members WHERE profile_id = ?", [s.profileId]))[0].grade).toBe("5");
    expect((await studentRows(cls.id))[0].login_code).toBe(s.loginCode);
  });
});

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

// Roster import against the real route handlers and a throwaway SQLite file. The providers are played by a fake fetch.

const dir = mkdtempSync(join(tmpdir(), "grademap-roster-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
process.env.GOOGLE_CLASSROOM_CLIENT_ID = "gc-id";
process.env.GOOGLE_CLASSROOM_CLIENT_SECRET = "gc-secret";
process.env.CLEVER_CLIENT_ID = "cl-id";
process.env.CLEVER_CLIENT_SECRET = "cl-secret";
delete process.env.CLASSLINK_CLIENT_ID;
delete process.env.RESEND_API_KEY;

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, roster: Mod, start: Mod, callback: Mod, classes: Mod;
let dbm: typeof import("@/server/db");
let flags: typeof import("@/server/flags");
let rs: typeof import("@/server/rostering");

beforeAll(async () => {
  [signup, roster, start, callback, classes] = (await Promise.all([
    import("@/app/api/auth/signup/route"),
    import("@/app/api/roster/route"),
    import("@/app/api/roster/start/route"),
    import("@/app/api/roster/callback/route"),
    import("@/app/api/classes/route"),
  ])) as unknown as Mod[];
  dbm = await import("@/server/db");
  flags = await import("@/server/flags");
  rs = await import("@/server/rostering");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));
afterEach(() => vi.unstubAllGlobals());

let ip = 0;
const req = (path: string, method = "GET", body?: unknown, cookie?: string) =>
  new Request(`http://localhost${path}`, {
    method,
    headers: { "content-type": "application/json", "x-forwarded-for": `10.5.0.${++ip}`, ...(cookie ? { cookie } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

async function teacher(email: string) {
  const res = await signup.POST(req("/api/auth/signup/", "POST", { email, password: "correct horse" }));
  await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now(), email]);
  return (res.headers.get("set-cookie") ?? "").split(";")[0];
}
const familyOf = async (email: string) => (await dbm.query<{ family_id: string }>("SELECT family_id FROM parents WHERE email = ?", [email]))[0].family_id;
const turnOn = async (key: string, enabled = true) => flags.setFlag(key, { enabled, rollout: 100 });

/** A fake fetch for Google: the token endpoint and two Classroom courses, one of them with the given students. */
function fakeGoogle(students: { userId: string; given: string }[]) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string | URL | Request) => {
      const u = String(url);
      const ok = (body: unknown) => new Response(JSON.stringify(body), { status: 200 });
      if (u.startsWith("https://oauth2.googleapis.com/token")) return ok({ access_token: "tok" });
      if (u.includes("/courses?")) return ok({ courses: [{ id: "c1", name: "Grade 4 Math", section: "A" }, { id: "c2", name: "Library club" }] });
      if (u.includes("/courses/c1/students")) return ok({ students: students.map((s) => ({ userId: s.userId, profile: { name: { givenName: s.given, fullName: `${s.given} Lastname` } } })) });
      if (u.includes("/courses/c2/students")) return ok({});
      return new Response("{}", { status: 404 });
    }),
  );
}

/** Signs in with the fake provider and returns the id of the roster waiting for review. */
async function signInWithGoogle(cookie: string): Promise<string> {
  const go = await start.GET(req("/api/roster/start/?provider=google-classroom", "GET", undefined, cookie));
  expect(go.status).toBe(303);
  const target = new URL(go.headers.get("location")!);
  expect(target.origin + target.pathname).toBe("https://accounts.google.com/o/oauth2/v2/auth");
  expect(target.searchParams.get("scope")).toContain("classroom.rosters.readonly");
  expect(target.searchParams.get("scope")).not.toContain("email");
  expect(target.searchParams.get("code_challenge_method")).toBe("S256");
  expect(target.searchParams.get("redirect_uri")).toBe("http://localhost/api/roster/callback/");
  const stateCookie = (go.headers.get("set-cookie") ?? "").split(";")[0];
  const back = await callback.GET(req(`/api/roster/callback/?code=abc&state=${target.searchParams.get("state")}`, "GET", undefined, `${cookie}; ${stateCookie}`));
  expect(back.status).toBe(303);
  const where = back.headers.get("location")!;
  expect(where).toContain("/teachers/#/import/");
  // The one-use cookie is cleared.
  expect(back.headers.get("set-cookie")).toMatch(/Max-Age=0/);
  return decodeURIComponent(where.split("/import/")[1]);
}

describe("who may import", () => {
  it("is off until the flag is on, then open to any confirmed teacher while the school plan is off", async () => {
    const cookie = await teacher("off@example.com");
    expect((await (await roster.GET(req("/api/roster/", "GET", undefined, cookie))).json()).access).toBe("off");
    const go = await start.GET(req("/api/roster/start/?provider=clever", "GET", undefined, cookie));
    expect(go.headers.get("location")).toContain("roster_error=off");
    await turnOn("roster-import");
    const status = await (await roster.GET(req("/api/roster/", "GET", undefined, cookie))).json();
    expect(status.access).toBe("ok");
    // Only providers with keys are offered.
    expect(status.providers.map((p: { id: string }) => p.id)).toEqual(["google-classroom", "clever"]);
    expect((await roster.GET(req("/api/roster/"))).status).toBe(401);
    await turnOn("roster-import", false);
  });

  it("needs the school plan once that is on, and the admin can give it", async () => {
    await turnOn("roster-import");
    await turnOn("school-plan");
    const cookie = await teacher("plan@example.com");
    const status = await (await roster.GET(req("/api/roster/", "GET", undefined, cookie))).json();
    expect(status.access).toBe("plan");
    expect(status.plan.features.length).toBeGreaterThan(0);
    expect(status.plan.price).toBeNull();
    const go = await start.GET(req("/api/roster/start/?provider=clever", "GET", undefined, cookie));
    expect(go.headers.get("location")).toContain("roster_error=plan");

    process.env.SCHOOL_PRICE_PER_STUDENT_CENTS = "400";
    expect((await (await roster.GET(req("/api/roster/", "GET", undefined, cookie))).json()).plan.price).toBe("C$4 per student per year");
    delete process.env.SCHOOL_PRICE_PER_STUDENT_CENTS;

    await dbm.run("UPDATE families SET school_until = ? WHERE id = ?", [Date.now() + 86_400_000, await familyOf("plan@example.com")]);
    expect((await (await roster.GET(req("/api/roster/", "GET", undefined, cookie))).json()).access).toBe("ok");
    await turnOn("roster-import", false);
    await turnOn("school-plan", false);
  });

  it("is refused for an account whose email isn't confirmed", async () => {
    await turnOn("roster-import");
    const res = await signup.POST(req("/api/auth/signup/", "POST", { email: "new@example.com", password: "correct horse" }));
    const cookie = (res.headers.get("set-cookie") ?? "").split(";")[0];
    const go = await start.GET(req("/api/roster/start/?provider=clever", "GET", undefined, cookie));
    expect(go.headers.get("location")).toContain("roster_error=failed");
    await turnOn("roster-import", false);
  });
});

describe("importing from Google Classroom", () => {
  it("reads classes, makes class accounts with first names and codes, and adds only new students next time", async () => {
    await turnOn("roster-import");
    const cookie = await teacher("google@example.com");
    fakeGoogle([{ userId: "u1", given: "Ava" }, { userId: "u2", given: "Noor" }, { userId: "u3", given: "Ava" }]);
    const importId = await signInWithGoogle(cookie);

    const review = await (await roster.GET(req(`/api/roster/?import=${importId}`, "GET", undefined, cookie))).json();
    expect(review.label).toBe("Google Classroom");
    expect(review.sections).toHaveLength(2);
    expect(review.sections[0]).toMatchObject({ id: "c1", name: "Grade 4 Math", grade: "4", students: 3, newStudents: 3, existing: null, names: ["Ava", "Noor", "Ava 2"] });
    expect(review.sections[1]).toMatchObject({ id: "c2", grade: null, students: 0 });
    // Another account can't see it.
    const other = await teacher("other@example.com");
    expect((await roster.GET(req(`/api/roster/?import=${importId}`, "GET", undefined, other))).status).toBe(404);

    const made = await roster.POST(req("/api/roster/", "POST", { import: importId, classes: [{ sectionId: "c1", name: "Room 4", grade: "4", framework: "ca-bc" }] }, cookie));
    expect(made.status).toBe(200);
    const [result] = (await made.json()).results;
    expect(result).toMatchObject({ name: "Room 4", added: 3, alreadyThere: 0, tooMany: 0, noLongerListed: 0, created: true });
    // The roster is gone once imported.
    expect((await roster.GET(req(`/api/roster/?import=${importId}`, "GET", undefined, cookie))).status).toBe(404);

    const detail = await (await classes.GET(req(`/api/classes/?id=${result.classId}`, "GET", undefined, cookie))).json();
    expect(detail.roster).toHaveLength(3);
    expect(detail.roster.every((r: { loginCode: string }) => r.loginCode.length === 10)).toBe(true);
    const stored = await dbm.query<{ external_id: string }>("SELECT external_id FROM students WHERE class_id = ? ORDER BY external_id", [result.classId]);
    expect(stored.map((s) => s.external_id)).toEqual(["u1", "u2", "u3"]);
    // Nothing but first names was kept.
    const names = (await dbm.query<{ data: string }>("SELECT p.data FROM profiles p JOIN students s ON s.profile_id = p.id WHERE s.class_id = ?", [result.classId])).map((r) => JSON.parse(r.data).name).sort();
    expect(names).toEqual(["Ava", "Ava 2", "Noor"]);
    expect((await dbm.query<{ n: number }>("SELECT COUNT(*) AS n FROM students WHERE class_id = ? AND login_code LIKE '%Lastname%'", [result.classId]))[0].n).toBe(0);

    // A later import: one student is new, one left the list, the rest are already there. The same class is used.
    fakeGoogle([{ userId: "u1", given: "Ava" }, { userId: "u2", given: "Noor" }, { userId: "u9", given: "Kit" }]);
    const again = await signInWithGoogle(cookie);
    const second = await (await roster.GET(req(`/api/roster/?import=${again}`, "GET", undefined, cookie))).json();
    expect(second.sections[0]).toMatchObject({ existing: { id: result.classId, name: "Room 4" }, newStudents: 1 });
    const resync = (await (await roster.POST(req("/api/roster/", "POST", { import: again, classes: [{ sectionId: "c1", name: "ignored", grade: "7", framework: "ca-on" }] }, cookie))).json()).results[0];
    expect(resync).toMatchObject({ classId: result.classId, added: 1, alreadyThere: 2, noLongerListed: 1, created: false });
    expect((await dbm.query<{ n: number }>("SELECT COUNT(*) AS n FROM classes WHERE owner_parent_id = (SELECT id FROM parents WHERE email = 'google@example.com')"))[0].n).toBe(1);
    expect((await dbm.query<{ grade: string }>("SELECT grade FROM classes WHERE id = ?", [result.classId]))[0].grade).toBe("4");
    await turnOn("roster-import", false);
  });

  it("holds a class to 40 students and says how many were left out", async () => {
    await turnOn("roster-import");
    const cookie = await teacher("big@example.com");
    fakeGoogle(Array.from({ length: 43 }, (_, i) => ({ userId: `s${i}`, given: `Kid${i}` })));
    const id = await signInWithGoogle(cookie);
    const [r] = (await (await roster.POST(req("/api/roster/", "POST", { import: id, classes: [{ sectionId: "c1", name: "Big", grade: "3", framework: "ca-bc" }] }, cookie))).json()).results;
    expect(r).toMatchObject({ added: 40, tooMany: 3 });
    await turnOn("roster-import", false);
  });

  it("refuses a bad class, a stale import and someone else's sign-in", async () => {
    await turnOn("roster-import");
    const cookie = await teacher("bad@example.com");
    fakeGoogle([{ userId: "u1", given: "Ava" }]);
    const id = await signInWithGoogle(cookie);
    const post = (classesBody: unknown, importId = id) => roster.POST(req("/api/roster/", "POST", { import: importId, classes: classesBody }, cookie));
    expect((await post([])).status).toBe(400);
    expect((await post([{ sectionId: "nope", name: "X", grade: "3", framework: "ca-bc" }])).status).toBe(400);
    expect((await post([{ sectionId: "c1", name: "  ", grade: "3", framework: "ca-bc" }])).status).toBe(400);
    expect((await post([{ sectionId: "c1", name: "X", grade: "12", framework: "ca-bc" }])).status).toBe(400);
    expect((await post([{ sectionId: "c1", name: "X", grade: "3", framework: "ca-qc" }])).status).toBe(400);
    expect((await post([{ sectionId: "c1", name: "X", grade: "3", framework: "ca-bc" }], "stale")).status).toBe(404);
    // An import older than half an hour is gone.
    await dbm.run("UPDATE roster_imports SET created_at = ?", [Date.now() - rs.ROSTER_IMPORT_TTL - 1000]);
    expect((await post([{ sectionId: "c1", name: "X", grade: "3", framework: "ca-bc" }])).status).toBe(404);

    // A callback with the wrong state, or from a different teacher, reads nothing.
    const go = await start.GET(req("/api/roster/start/?provider=google-classroom", "GET", undefined, cookie));
    const state = new URL(go.headers.get("location")!).searchParams.get("state");
    const stateCookie = (go.headers.get("set-cookie") ?? "").split(";")[0];
    const forged = await callback.GET(req("/api/roster/callback/?code=abc&state=wrong", "GET", undefined, `${cookie}; ${stateCookie}`));
    expect(forged.headers.get("location")).toContain("roster_error=failed");
    const thief = await teacher("thief@example.com");
    const stolen = await callback.GET(req(`/api/roster/callback/?code=abc&state=${state}`, "GET", undefined, `${thief}; ${stateCookie}`));
    expect(stolen.headers.get("location")).toContain("roster_error=failed");
    const cancelled = await callback.GET(req("/api/roster/callback/?error=access_denied", "GET", undefined, `${cookie}; ${stateCookie}`));
    expect(cancelled.headers.get("location")).toContain("roster_error=cancelled");
    await turnOn("roster-import", false);
  });

  it("can discard a roster, and deleting the account removes any waiting", async () => {
    await turnOn("roster-import");
    const cookie = await teacher("discard@example.com");
    fakeGoogle([{ userId: "u1", given: "Ava" }]);
    const id = await signInWithGoogle(cookie);
    expect((await roster.DELETE(req(`/api/roster/?import=${id}`, "DELETE", undefined, cookie))).status).toBe(200);
    expect((await roster.GET(req(`/api/roster/?import=${id}`, "GET", undefined, cookie))).status).toBe(404);
    const id2 = await signInWithGoogle(cookie);
    await (await import("@/server/deleteFamily")).deleteFamilyData(await familyOf("discard@example.com"));
    expect((await dbm.query<{ n: number }>("SELECT COUNT(*) AS n FROM roster_imports WHERE id = ?", [id2]))[0].n).toBe(0);
    await turnOn("roster-import", false);
  });
});

describe("the providers' answers", () => {
  const route = (table: Record<string, unknown>) => async (url: string) => {
    const hit = Object.keys(table).find((k) => url.startsWith(k));
    if (!hit) throw new Error(`unexpected ${url}`);
    return table[hit];
  };

  it("reads Clever sections and only the student users in them", async () => {
    const sections = await rs.cleverSections(
      route({
        "https://api.clever.com/v3.0/me": { data: { id: "t1" } },
        "https://api.clever.com/v3.0/users/t1/sections": { data: [{ data: { id: "s1", name: "Math 5", grade: "5" } }, { data: { id: "s2", name: "Homeroom", grade: "" } }] },
        "https://api.clever.com/v3.0/sections/s1/users": {
          data: [
            { data: { id: "a", name: { first: "Ava", last: "Z" }, roles: { student: {} } } },
            { data: { id: "t1", name: { first: "Mx", last: "Teacher" }, roles: { teacher: {} } } },
          ],
        },
        "https://api.clever.com/v3.0/sections/s2/users": { data: [] },
      }),
    );
    expect(sections).toEqual([
      { id: "s1", name: "Math 5", grade: "5", students: [{ id: "a", name: "Ava" }] },
      { id: "s2", name: "Homeroom", grade: null, students: [] },
    ]);
  });

  it("reads ClassLink classes and their students", async () => {
    const sections = await rs.classLinkSections(
      route({
        "https://nodeapi.classlink.com/v2/my/classes": [{ sourcedId: "k1", title: "Reading", grades: ["03"] }, { sourcedId: "k2", title: "Band", grades: ["06", "07"] }],
        "https://nodeapi.classlink.com/v2/classes/k1/students": [{ sourcedId: "x", givenName: "Kit", familyName: "Q" }],
        "https://nodeapi.classlink.com/v2/classes/k2/students": [],
      }),
    );
    expect(sections.map((s) => [s.id, s.grade, s.students])).toEqual([["k1", "3", [{ id: "x", name: "Kit" }]], ["k2", null, []]]);
  });

  it("follows Google's pages of courses", async () => {
    const get = vi.fn(async (url: string) => {
      if (url.includes("pageToken=p2")) return { courses: [{ id: "b", name: "Second" }] };
      if (url.includes("/courses?")) return { courses: [{ id: "a", name: "First" }], nextPageToken: "p2" };
      return {};
    });
    const sections = await rs.googleClassroomSections(get);
    expect(sections.map((s) => s.id)).toEqual(["a", "b"]);
  });

  it("starts a Clever sign-in without PKCE and with a basic-auth token request", async () => {
    await turnOn("roster-import");
    const cookie = await teacher("clever@example.com");
    const go = await start.GET(req("/api/roster/start/?provider=clever", "GET", undefined, cookie));
    const target = new URL(go.headers.get("location")!);
    expect(target.origin + target.pathname).toBe("https://clever.com/oauth/authorize");
    expect(target.searchParams.get("code_challenge")).toBeNull();
    expect(target.searchParams.get("client_id")).toBe("cl-id");
    // ClassLink has no keys on this server.
    expect((await start.GET(req("/api/roster/start/?provider=classlink", "GET", undefined, cookie))).headers.get("location")).toContain("roster_error=off");
    expect((await start.GET(req("/api/roster/start/?provider=canvas", "GET", undefined, cookie))).headers.get("location")).toContain("roster_error=failed");
    await turnOn("roster-import", false);
  });
});

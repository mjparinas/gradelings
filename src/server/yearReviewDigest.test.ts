import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

// The June year-in-review email and the teacher's Monday class email, sent by the daily job.

const dir = mkdtempSync(join(tmpdir(), "grademap-year-digest-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
process.env.CRON_SECRET = "cron-secret";
delete process.env.RESEND_API_KEY;
delete process.env.NEXT_PUBLIC_SITE_URL;

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, verify: Mod, sync: Mod, prefs: Mod, unsub: Mod, cron: Mod, classes: Mod, digest: Mod;
let dbm: typeof import("@/server/db");
let email: typeof import("@/server/email");

beforeAll(async () => {
  [signup, verify, sync, prefs, unsub, cron, classes, digest] = (await Promise.all([
    import("@/app/api/auth/signup/route"),
    import("@/app/api/auth/verify/route"),
    import("@/app/api/sync/route"),
    import("@/app/api/account/prefs/route"),
    import("@/app/api/email/unsubscribe/route"),
    import("@/app/api/cron/weekly/route"),
    import("@/app/api/classes/route"),
    import("@/app/api/classes/digest/route"),
  ])) as unknown as Mod[];
  dbm = await import("@/server/db");
  email = await import("@/server/email");
});
afterEach(() => vi.useRealTimers());
afterAll(() => rmSync(dir, { recursive: true, force: true }));

const DAY = 86_400_000;
let ip = 0;
function req(path: string, method: string, body?: unknown, cookie?: string): Request {
  return new Request(`http://localhost${path}`, {
    method,
    headers: { "content-type": "application/json", "x-forwarded-for": `10.2.0.${++ip}`, ...(cookie ? { cookie } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}
const tokenIn = (text: string) => decodeURIComponent(/token=([^\s&"]+)/.exec(text)![1]);
const runJob = () => cron.GET(new Request("http://localhost/api/cron/weekly/", { headers: { authorization: "Bearer cron-secret" } }));

/** A confirmed account with one child who answered 10 questions at `t`. */
async function family(address: string, opts: { verified?: boolean; t?: number; name?: string } = {}) {
  const res = await signup.POST(req("/api/auth/signup/", "POST", { email: address, password: "correct horse" }));
  const cookie = (res.headers.get("set-cookie") ?? "").split(";")[0];
  if (opts.verified !== false) {
    const mail = email.outbox().filter((m) => m.to === address).at(-1)!;
    await verify.POST(req("/api/auth/verify/", "POST", { token: tokenIn(mail.text) }, cookie));
  }
  const t = opts.t ?? Date.now();
  const id = `${address.split("@")[0]}-kid`;
  const profiles = [{ id, name: opts.name ?? "Maya", grade: "2", framework: "ca-bc", avatar: "ollie", colour: "#fff", createdAt: t, updatedAt: t }];
  const events = Array.from({ length: 10 }, (_, i) => ({ id: `${id}-e${i}`, profileId: id, type: "answer", t: t + i * 1000, unit: "2/math/tens-and-ones", correct: true, attempts: 1, revealed: false, ms: 8000, mode: "practice", difficulty: 1 }));
  await sync.POST(req("/api/sync/", "POST", { profiles, events }, cookie));
  const familyId = (await dbm.query<{ family_id: string }>("SELECT family_id FROM parents WHERE email = ?", [address]))[0].family_id;
  return { cookie, id, familyId };
}

/** A UTC noon on a day that `ok` accepts, searching forward from `from`. */
function dayWhere(from: number, ok: (d: Date) => boolean): Date {
  const d = new Date(from);
  d.setUTCHours(15, 0, 0, 0);
  while (!ok(d)) d.setUTCDate(d.getUTCDate() + 1);
  return d;
}

describe("the year in review email", () => {
  it("goes once in the second half of June to parents with progress emails on, about this school year", async () => {
    const start = Date.now();
    const yes = await family("year-yes@example.com");
    await prefs.POST(req("/api/account/prefs/", "POST", { weeklyReport: true }, yes.cookie));
    await family("year-off@example.com"); // progress emails off
    const reviews = (to: string) => email.outbox().filter((m) => m.to === to && m.subject.includes("school year"));

    vi.useFakeTimers({ toFake: ["Date"] });
    // Early June: not yet.
    vi.setSystemTime(dayWhere(start, (d) => d.getUTCMonth() === 5 && d.getUTCDate() === 10));
    await runJob();
    expect(reviews("year-yes@example.com")).toHaveLength(0);

    const june = dayWhere(start, (d) => d.getUTCMonth() === 5 && d.getUTCDate() === 16);
    vi.setSystemTime(june);
    expect((await (await runJob()).json()).yearReviews).toBeGreaterThanOrEqual(1);
    const mail = reviews("year-yes@example.com");
    expect(mail).toHaveLength(1);
    expect(mail[0].text).toContain("Maya practised on 1 day this school year");
    expect(mail[0].text).toContain("10 questions");
    expect(mail[0].text).toContain("report-card mark");
    expect(mail[0].text).toContain("/parents/#/year");
    expect(mail[0].unsubscribeUrl).toContain("/api/email/unsubscribe/?token=");
    expect(reviews("year-off@example.com")).toHaveLength(0);

    // Once per school year.
    vi.setSystemTime(june.getTime() + 2 * DAY);
    await runJob();
    expect(reviews("year-yes@example.com")).toHaveLength(1);
  });

  it("sends nothing to a family whose children didn't practise this school year", async () => {
    const start = Date.now();
    const old = await family("year-quiet@example.com", { t: start });
    await prefs.POST(req("/api/account/prefs/", "POST", { weeklyReport: true }, old.cookie));
    vi.useFakeTimers({ toFake: ["Date"] });
    // June of the school year after next: Maya's practice was two school years ago.
    const first = dayWhere(start, (d) => d.getUTCMonth() === 5 && d.getUTCDate() === 16);
    vi.setSystemTime(dayWhere(first.getTime() + 300 * DAY, (d) => d.getUTCMonth() === 5 && d.getUTCDate() === 16));
    await dbm.run("UPDATE parents SET last_weekly_at = ? WHERE email = ?", [Date.now(), "year-quiet@example.com"]);
    await runJob();
    expect(email.outbox().filter((m) => m.to === "year-quiet@example.com" && m.subject.includes("school year"))).toHaveLength(0);
  });
});

describe("the Monday class email", () => {
  async function teacherWithClass(address: string) {
    const teacher = await family(address, { name: "Riley" });
    const { class: cls } = await (await classes.POST(req("/api/classes/", "POST", { name: "Room 4", grade: "2" }, teacher.cookie))).json();
    await dbm.run("INSERT INTO class_assignments (class_id, unit_key, created_at, due_at) VALUES (?, ?, ?, ?)", [cls.id, "2/math/tens-and-ones", Date.now(), Date.now() + 3 * DAY]);
    await dbm.run("INSERT INTO class_members (class_id, profile_id, family_id, joined_at) VALUES (?, ?, ?, ?)", [cls.id, teacher.id, teacher.familyId, Date.now()]);
    return { ...teacher, classId: cls.id as string };
  }
  const digests = (to: string) => email.outbox().filter((m) => m.to === to && m.subject.includes("your class this week"));

  it("is off until the teacher turns it on, and the class list says whether it is", async () => {
    const t = await teacherWithClass("digest-off@example.com");
    expect((await (await classes.GET(req("/api/classes/", "GET", undefined, t.cookie))).json()).mondayEmail).toBe(false);
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(dayWhere(Date.now() + DAY, (d) => d.getUTCDay() === 1));
    await runJob();
    expect(digests("digest-off@example.com")).toHaveLength(0);
  });

  it("goes on Mondays, once a week, with first names and homework, and unsubscribes on its own", async () => {
    // The class is set up on the Sunday before the Monday the email goes, so its practice is from the last week and
    // its homework is due this week whatever day the test runs.
    vi.useFakeTimers({ toFake: ["Date"] });
    const monday = dayWhere(Date.now() + DAY, (d) => d.getUTCDay() === 1);
    vi.setSystemTime(monday.getTime() - DAY);
    const t = await teacherWithClass("digest-on@example.com");
    expect((await digest.PATCH(req("/api/classes/digest/", "PATCH", { on: "yes" }, t.cookie))).status).toBe(400);
    expect((await digest.PATCH(req("/api/classes/digest/", "PATCH", { on: true }, t.cookie))).status).toBe(200);
    expect((await (await classes.GET(req("/api/classes/", "GET", undefined, t.cookie))).json()).mondayEmail).toBe(true);

    // A Wednesday first: nothing.
    vi.setSystemTime(monday.getTime() - 5 * DAY);
    await runJob();
    expect(digests("digest-on@example.com")).toHaveLength(0);

    vi.setSystemTime(monday);
    expect((await (await runJob()).json()).classDigests).toBeGreaterThanOrEqual(1);
    const mail = digests("digest-on@example.com");
    expect(mail).toHaveLength(1);
    expect(mail[0].text).toContain("Room 4: 1 of 1 student practised in the last week.");
    // Ten right answers made the unit Proficient, which is "done" for homework with no question count.
    expect(mail[0].text).toContain("Homework, Tens & Ones: 1 of 1 done, due this week.");
    expect(mail[0].text).toContain("report-card mark");
    expect(mail[0].text).toContain(`/teachers/#/class/${t.classId}`);
    expect(mail[0].unsubscribeUrl).toContain("kind=class");

    // Tuesday's catch-up doesn't send it again.
    vi.setSystemTime(monday.getTime() + DAY);
    await runJob();
    expect(digests("digest-on@example.com")).toHaveLength(1);

    // The email's own unsubscribe link turns off only the class email.
    await prefs.POST(req("/api/account/prefs/", "POST", { weeklyReport: true }, t.cookie));
    expect((await unsub.POST(req(`/api/email/unsubscribe/?kind=class&token=${encodeURIComponent(tokenIn(mail[0].unsubscribeUrl!))}`, "POST"))).status).toBe(200);
    const row = (await dbm.query<{ class_digest: number; weekly_report: number }>("SELECT class_digest, weekly_report FROM parents WHERE email = ?", ["digest-on@example.com"]))[0];
    expect(row).toEqual({ class_digest: 0, weekly_report: 1 });
  });

  it("needs a confirmed email to turn it on", async () => {
    const t = await family("digest-unconfirmed@example.com", { verified: false });
    expect((await digest.PATCH(req("/api/classes/digest/", "PATCH", { on: true }, t.cookie))).status).toBe(403);
    expect((await digest.PATCH(req("/api/classes/digest/", "PATCH", { on: false }, t.cookie))).status).toBe(200);
  });
});

describe("the weekly email for parents", () => {
  it("lists the child's homework, math facts, stories and an idea to try at home", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    const sunday = dayWhere(Date.now() + DAY, (d) => d.getUTCDay() === 0);
    // Saturday: the class is set up, the homework assigned, and Maya practises.
    vi.setSystemTime(sunday.getTime() - DAY);
    const teacher = await family("weekly-hw-teacher@example.com", { name: "Riley" });
    const { class: cls } = await (await classes.POST(req("/api/classes/", "POST", { name: "Room 7", grade: "2" }, teacher.cookie))).json();
    await dbm.run("INSERT INTO class_assignments (class_id, unit_key, created_at, due_at, goal) VALUES (?, ?, ?, ?, ?)", [cls.id, "2/math/tens-and-ones", Date.now() - DAY, Date.now() + 3 * DAY, 20]);
    const f = await family("weekly-hw@example.com");
    await prefs.POST(req("/api/account/prefs/", "POST", { weeklyReport: true }, f.cookie));
    await dbm.run("INSERT INTO class_members (class_id, profile_id, family_id, joined_at) VALUES (?, ?, ?, ?)", [cls.id, f.id, f.familyId, Date.now()]);
    const t = Date.now();
    const base = { profileId: f.id, attempts: 1, revealed: false, ms: 4000, mode: "facts", difficulty: 1 };
    const events = [
      ...[0, 1].map((i) => ({ ...base, id: `${f.id}-fact${i}`, type: "answer", t: t + 20_000 + i * 1000, unit: "2/math/facts", fact: "add:3:4", correct: true })),
      { id: `${f.id}-story`, profileId: f.id, type: "story", t: t + 30_000, story: "lost-mitten", rl: 2, results: [true, true, false], pages: 6, ms: 120_000 },
    ];
    await sync.POST(req("/api/sync/", "POST", { events }, f.cookie));

    vi.setSystemTime(sunday);
    await runJob();
    const mail = email.outbox().filter((m) => m.to === "weekly-hw@example.com" && m.subject.includes("week")).at(-1)!;
    // Ten of the twenty questions the teacher asked for were answered after the unit was assigned.
    expect(mail.text).toContain("Homework: Maya has finished 0 of 1 unit from the teacher.");
    expect(mail.text).toContain("Tens & Ones: 10 of 20 questions, due this week.");
    // "3 + 4" is in both Grade 2 addition sets, and counts once as new.
    expect(mail.text).toContain("Math facts: Maya knows 1 of 45 adding facts to 10 and 1 of 100 addition facts to 20 (1 new this week).");
    expect(mail.text).toContain("Stories: Maya read 1 story in the Story Library.");
    expect(mail.text).toMatch(/Try at home: \S/);
    expect(mail.text).toContain("report-card mark");
  });

  it("leaves the extra lines out for a family with the flags off", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    const sunday = dayWhere(Date.now() + DAY, (d) => d.getUTCDay() === 0);
    vi.setSystemTime(sunday.getTime() - DAY);
    const f = await family("weekly-plain@example.com");
    await prefs.POST(req("/api/account/prefs/", "POST", { weeklyReport: true }, f.cookie));
    const flags = await import("@/server/flags");
    await flags.setOverride("weekly-email-extras", f.familyId, false);
    vi.setSystemTime(sunday);
    await runJob();
    const mail = email.outbox().filter((m) => m.to === "weekly-plain@example.com" && m.subject.includes("week")).at(-1)!;
    expect(mail.text).toContain("Maya: ");
    expect(mail.text).not.toContain("Try at home");
  });
});

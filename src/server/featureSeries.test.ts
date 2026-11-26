import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { FEATURE_EMAILS } from "@/lib/featureSeries";
import type { FamilyInfo } from "@/lib/model";
import { TRIAL_DAYS } from "@/lib/plan";

// The feature series: who gets the next email, never twice, never stacked on another email, and what each email says
// about the plan. Real database file; email goes to the test outbox.

const dir = mkdtempSync(join(tmpdir(), "gradelings-series-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
const DAY = 86_400_000;
const HOUR = 3_600_000;
const ORIGIN = "https://app.test";

let dbm: typeof import("@/server/db");
let email: typeof import("@/server/email");
let series: typeof import("@/server/featureSeries");
let build: typeof import("@/server/featureEmail");
let signup: { POST: (r: Request) => Promise<Response> };

beforeAll(async () => {
  delete process.env.RESEND_API_KEY;
  dbm = await import("@/server/db");
  email = await import("@/server/email");
  series = await import("@/server/featureSeries");
  build = await import("@/server/featureEmail");
  signup = (await import("@/server/testing/signupWithSession")) as unknown as typeof signup;
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let n = 0;
async function family(opts: { age?: number; verified?: boolean; news?: boolean; grade?: string } = {}) {
  const address = `fam${++n}@example.com`;
  const res = await signup.POST(new Request("http://localhost/api/auth/signup/", { method: "POST", headers: { "content-type": "application/json", host: "localhost", "x-forwarded-for": `10.9.0.${n}` }, body: JSON.stringify({ email: address, password: "correct horse" }) }));
  expect(res.status).toBe(200);
  const row = (await dbm.query<{ family_id: string; id: string }>("SELECT family_id, id FROM parents WHERE email = ?", [address]))[0];
  if (opts.verified !== false) await dbm.run("UPDATE parents SET email_verified_at = ? WHERE id = ?", [Date.now(), row.id]);
  await dbm.run("UPDATE parents SET admin_mail = ? WHERE id = ?", [opts.news === false ? 0 : 1, row.id]);
  await dbm.run("UPDATE families SET created_at = ? WHERE id = ?", [Date.now() - (opts.age ?? 2 * DAY), row.family_id]);
  if (opts.grade) await dbm.run("INSERT INTO profiles (id, family_id, data, updated_at) VALUES (?, ?, ?, ?)", [`p-${row.family_id}`, row.family_id, JSON.stringify({ name: "Sam", grade: opts.grade }), Date.now()]);
  return { address, familyId: row.family_id, parentId: row.id };
}
const sentTo = (address: string) => email.outbox().filter((m) => m.to === address && m.kind === "feature-tip");
const turnOn = (dailyCap = 100, onAt = Date.now() - HOUR) => series.saveSeriesConfig({ on: true, dailyCap, onBy: "owner@example.com", onAt });
const tipsOf = async (familyId: string) => (await dbm.query<{ sent_by: string }>("SELECT sent_by FROM email_log WHERE family_id = ? AND kind = 'feature-tip' ORDER BY sent_at", [familyId])).map((r) => r.sent_by);

beforeEach(async () => {
  email.outbox().length = 0;
  await dbm.run("DELETE FROM email_log");
  await series.saveSeriesConfig({ on: false, dailyCap: 100, onBy: null, onAt: null });
});

describe("which email is next", () => {
  const facts: import("@/server/featureSeries").Facts = { bands: new Set(["middle"]), country: "CA", flag: () => true };
  it("is the first one the family hasn't had, then the next, until there are none", () => {
    const had = new Set<string>();
    const order: string[] = [];
    for (let i = 0; i < 200; i++) {
      const e = series.nextFeature(had, facts);
      if (!e) break;
      expect(had.has(e.id)).toBe(false);
      order.push(e.id);
      had.add(e.id);
    }
    expect(new Set(order).size).toBe(order.length);
    expect(order.length).toBeGreaterThanOrEqual(40);
    expect(series.nextFeature(had, facts)).toBeNull();
  });

  it("skips emails for another age, another country or a feature that is off", () => {
    const little = { ...facts, bands: new Set<"little">(["little"]) };
    const big = { ...facts, bands: new Set<"big">(["big"]) };
    const ids = (f: import("@/server/featureSeries").Facts) => FEATURE_EMAILS.filter((e) => series.forFamily(e, f)).map((e) => e.id);
    expect(ids(little)).toContain("little-kids");
    expect(ids(big)).not.toContain("little-kids");
    expect(ids(big)).toContain("articles");
    expect(ids(little)).not.toContain("articles");
    expect(ids({ ...facts, country: "US" })).not.toContain("french");
    expect(ids(facts)).toContain("french");
    expect(ids({ ...facts, flag: () => false })).not.toContain("videos");
  });
});

describe("running the series", () => {
  it("does nothing while it is off", async () => {
    const f = await family();
    expect(await series.runFeatureSeries(ORIGIN)).toEqual({ sent: 0, failed: 0, finished: 0 });
    expect(sentTo(f.address)).toHaveLength(0);
  });

  it("sends one email to a confirmed family and never the same one twice", async () => {
    const f = await family({ grade: "3" });
    await turnOn();
    const first = await series.runFeatureSeries(ORIGIN);
    expect(first.sent).toBeGreaterThanOrEqual(1);
    expect(sentTo(f.address)).toHaveLength(1);
    expect(sentTo(f.address)[0].subject).toBe(FEATURE_EMAILS[0].subject);
    // A second run the same day: nothing (a tip a day at most).
    expect((await series.runFeatureSeries(ORIGIN)).sent).toBe(0);
    // A day later the next one, a different email.
    const later = Date.now() + 21 * HOUR;
    expect((await series.runFeatureSeries(ORIGIN, later)).sent).toBeGreaterThanOrEqual(1);
    const tips = await tipsOf(f.familyId);
    expect(tips).toHaveLength(2);
    expect(new Set(tips).size).toBe(2);
  });

  it("leaves out unconfirmed accounts, families with news and tips off, and ones from before the window", async () => {
    const a = await family({ verified: false });
    const b = await family({ news: false });
    const old = await family({ age: 60 * DAY });
    const fresh = await family({ age: 5 * HOUR });
    await turnOn();
    await series.runFeatureSeries(ORIGIN);
    for (const f of [a, b, old, fresh]) expect(sentTo(f.address), f.address).toHaveLength(0);
  });

  it("steps aside for any other email to the family in the last day", async () => {
    const f = await family();
    await dbm.run("INSERT INTO email_log (id, family_id, parent_id, kind, label, status, sent_at, updated_at) VALUES (?, ?, ?, 'trial-ending', NULL, 'sent', ?, ?)", ["x1", f.familyId, f.parentId, Date.now() - 2 * HOUR, Date.now()]);
    await turnOn();
    await series.runFeatureSeries(ORIGIN);
    expect(sentTo(f.address)).toHaveLength(0);
    // The sign-up confirmation never stands in the way.
    await dbm.run("UPDATE email_log SET kind = 'verify' WHERE id = 'x1'");
    await series.runFeatureSeries(ORIGIN);
    expect(sentTo(f.address)).toHaveLength(1);
  });

  it("respects the daily limit", async () => {
    const fs = [await family(), await family(), await family()];
    await turnOn(2);
    const run = await series.runFeatureSeries(ORIGIN);
    expect(run.sent).toBeLessThanOrEqual(2);
    expect(fs.filter((f) => sentTo(f.address).length).length).toBeLessThanOrEqual(2);
  });

  it("only looks at the log with indexes", async () => {
    const plan = async (sql: string) => (await dbm.query<{ detail: string }>(`EXPLAIN QUERY PLAN ${sql}`, [0])).map((r) => r.detail).join(" | ");
    expect(await plan("SELECT family_id, kind, sent_at FROM email_log WHERE sent_at > ? AND status != 'failed'")).toContain("email_log_sent");
    expect(await plan("SELECT family_id, sent_by FROM email_log WHERE sent_by >= 'feature:' AND sent_by < 'feature;' AND status != 'failed' AND sent_at > ?")).toContain("email_log_sent_by");
  });
});

describe("what each email says about the plan", () => {
  const base = (over: Partial<FamilyInfo>): FamilyInfo => ({ account: { email: "a@example.com", familyId: "f", verified: true }, plan: "free", trialEndsAt: Date.now() - DAY, accessUntil: null, country: "CA", ...over }) as FamilyInfo;
  const paid = FEATURE_EMAILS.find((e) => e.id === "math-facts")!;
  const free = FEATURE_EMAILS.find((e) => e.id === "stickers")!;

  it("says a paid feature is open in the trial, and what it costs afterwards", () => {
    const m = build.featureTipEmail("a@example.com", ORIGIN, paid, base({ trialEndsAt: Date.now() + 5 * DAY }), "tok");
    expect(m.html).toContain("Family plan");
    expect(m.html).toContain("Open for you during your free trial");
    expect(m.html).toContain("$14.99/month");
    expect(m.text).toContain("(Family plan)");
    expect(m.html).toContain(`${ORIGIN}/email/features/math-facts-v1.jpg`);
    expect(m.kind).toBe("feature-tip");
    expect(m.unsubscribeUrl).toContain("kind=updates");
  });

  it("says a paid feature is Family plan only after the trial, and the member's own when they have it", () => {
    expect(build.featureTipEmail("a@example.com", ORIGIN, paid, base({}), "tok").html).toContain("Family plan only");
    expect(build.featureTipEmail("a@example.com", ORIGIN, paid, base({ plan: "premium" }), "tok").html).toContain("Part of your Family plan");
    expect(build.planState(base({ accessUntil: Date.now() + DAY }))).toBe("member");
    expect(build.planState(base({ trialEndsAt: Date.now() + DAY }))).toBe("trial");
  });

  it("names no plan on a free feature", () => {
    const m = build.featureTipEmail("a@example.com", ORIGIN, free, base({}), "tok");
    expect(m.html).not.toContain("Family plan");
    expect(m.html).toContain("Did you know?");
  });

  it("reads the trial length from plan.ts, never a typed number", () => {
    const m = build.featureTipEmail("a@example.com", ORIGIN, FEATURE_EMAILS.find((e) => e.id === "children")!, base({}), "tok");
    expect(m.html).toContain(`${TRIAL_DAYS}-day`);
  });
});

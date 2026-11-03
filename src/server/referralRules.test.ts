import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

const dir = mkdtempSync(join(tmpdir(), "grademap-referral-rules-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;
delete process.env.STRIPE_SECRET_KEY;

let dbm: typeof import("@/server/db");
let ref: typeof import("@/server/referral");
let plan: typeof import("@/lib/plan");
const DAY = 86_400_000;

beforeAll(async () => {
  dbm = await import("@/server/db");
  ref = await import("@/server/referral");
  plan = await import("@/lib/plan");
  await dbm.db();
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

let n = 0;
/** A bare family (no parent row needed) with the given columns. */
async function family(cols: Record<string, unknown> = {}): Promise<string> {
  const id = `fam_ref_${++n}`;
  const all: Record<string, unknown> = { id, plan: "trial", created_at: 1, updated_at: 1, trial_ends_at: Date.now() + 5 * DAY, ...cols };
  const keys = Object.keys(all);
  await dbm.run(`INSERT INTO families (${keys.join(",")}) VALUES (${keys.map(() => "?").join(",")})`, keys.map((k) => all[k] as never));
  return id;
}
const row = async (id: string) =>
  (await dbm.query<Record<string, number | string | null>>("SELECT * FROM families WHERE id = ?", [id]))[0];

describe("ensureReferralCode", () => {
  it("makes a well-formed code once and keeps it", async () => {
    const id = await family();
    const a = await ref.ensureReferralCode(id);
    expect(plan.normalizeReferralCode(a)).toBe(a);
    expect((await row(id)).referral_code).toBe(a);
    expect(await ref.ensureReferralCode(id)).toBe(a);
    expect(await ref.referrerFor(a!)).toBe(id);
  });

  it("returns an existing code without changing it", async () => {
    const id = await family({ referral_code: "KEEPME22" });
    expect(await ref.ensureReferralCode(id)).toBe("KEEPME22");
    expect((await row(id)).referral_code).toBe("KEEPME22");
  });

  it("has no code for an unknown family", async () => {
    expect(await ref.ensureReferralCode("nobody")).toBeNull();
    expect(await ref.referralSummary("nobody")).toBeNull();
  });

  it("gives each family a different code", async () => {
    const codes = new Set<string | null>();
    for (let i = 0; i < 12; i++) codes.add(await ref.ensureReferralCode(await family()));
    expect(codes.size).toBe(12);
  });

  it("does not hand out a code another family holds", async () => {
    const id = await family({ referral_code: "TAKEN222" });
    expect(await ref.referrerFor("TAKEN222")).toBe(id);
    expect(await ref.referrerFor("NOBODY22")).toBeNull();
  });
});

describe("referralSummary", () => {
  it("counts joined and rewarded friends and caps the months", async () => {
    const giver = await family();
    expect(await ref.referralSummary(giver)).toMatchObject({ joined: 0, rewarded: 0, monthsEarned: 0, maxMonths: plan.REFERRAL_MAX_REWARDS, bonusDays: plan.REFERRAL_BONUS_DAYS });
    for (let i = 0; i < plan.REFERRAL_MAX_REWARDS + 2; i++) await family({ referred_by: giver, referral_rewarded_at: 1 });
    await family({ referred_by: giver });
    await family({ referred_by: await family() }); // someone else's friend
    const s = await ref.referralSummary(giver);
    expect(s).toMatchObject({ joined: plan.REFERRAL_MAX_REWARDS + 3, rewarded: plan.REFERRAL_MAX_REWARDS + 2, monthsEarned: plan.REFERRAL_MAX_REWARDS });
    expect(plan.normalizeReferralCode(s!.code)).toBe(s!.code);
  });
});

describe("rewardReferrer", () => {
  it("does nothing for a family nobody referred", async () => {
    const id = await family();
    expect(await ref.rewardReferrer(id)).toBe(false);
    expect((await row(id)).referral_rewarded_at).toBeNull();
  });

  it("thanks the referrer once and says so", async () => {
    const giver = await family();
    const friend = await family({ referred_by: giver });
    const now = Date.now();
    expect(await ref.rewardReferrer(friend, now)).toBe(true);
    expect(Number((await row(friend)).referral_rewarded_at)).toBe(now);
    expect(Number((await row(giver)).referral_rewards)).toBe(1);
    expect(await ref.rewardReferrer(friend, now)).toBe(false);
    expect(Number((await row(giver)).referral_rewards)).toBe(1);
  });

  it("returns false past the cap and gives nothing", async () => {
    const trialEnd = Date.now() + 5 * DAY;
    const giver = await family({ referral_rewards: plan.REFERRAL_MAX_REWARDS, trial_ends_at: trialEnd });
    const friend = await family({ referred_by: giver });
    expect(await ref.rewardReferrer(friend)).toBe(false);
    expect(Number((await row(giver)).trial_ends_at)).toBe(trialEnd);
    expect(Number((await row(giver)).referral_rewards)).toBe(plan.REFERRAL_MAX_REWARDS);
  });

  it("returns false when the referrer's row is gone", async () => {
    const friend = await family({ referred_by: "ghost" });
    expect(await ref.rewardReferrer(friend)).toBe(false);
  });

  it("starts the bonus from the later of today and the trial's end", async () => {
    const now = Date.now();
    const future = now + 20 * DAY;
    const a = await family({ trial_ends_at: future });
    await ref.rewardReferrer(await family({ referred_by: a }), now);
    expect(Number((await row(a)).trial_ends_at)).toBe(future + plan.REFERRAL_BONUS_DAYS * DAY);
    expect(Number((await row(a)).updated_at)).toBe(now);

    const b = await family({ trial_ends_at: now - 9 * DAY });
    await ref.rewardReferrer(await family({ referred_by: b }), now);
    expect(Number((await row(b)).trial_ends_at)).toBe(now + plan.REFERRAL_BONUS_DAYS * DAY);
  });

  it.each(["active", "trialing", "past_due"])("moves a %s simulated subscriber's renewal date, not their trial", async (status) => {
    const now = Date.now();
    const trial = now + 2 * DAY;
    const end = now + 10 * DAY;
    const giver = await family({ subscription_status: status, current_period_end: end, trial_ends_at: trial, stripe_customer: "cus_x" });
    expect(await ref.rewardReferrer(await family({ referred_by: giver }), now)).toBe(true);
    const r = await row(giver);
    expect(Number(r.current_period_end)).toBe(end + plan.REFERRAL_BONUS_DAYS * DAY);
    expect(Number(r.trial_ends_at)).toBe(trial);
    expect(Number(r.updated_at)).toBe(now);
  });

  it("starts a renewal date from today when the subscriber has none", async () => {
    const now = Date.now();
    const giver = await family({ subscription_status: "active" });
    await ref.rewardReferrer(await family({ referred_by: giver }), now);
    expect(Number((await row(giver)).current_period_end)).toBe(now + plan.REFERRAL_BONUS_DAYS * DAY);
  });

  it("treats a cancelled subscription like a trial", async () => {
    const now = Date.now();
    const trial = now + 3 * DAY;
    const giver = await family({ subscription_status: "canceled", current_period_end: now + 50 * DAY, trial_ends_at: trial, stripe_customer: "cus_c" });
    await ref.rewardReferrer(await family({ referred_by: giver }), now);
    const r = await row(giver);
    expect(Number(r.trial_ends_at)).toBe(trial + plan.REFERRAL_BONUS_DAYS * DAY);
    expect(Number(r.current_period_end)).toBe(now + 50 * DAY);
  });

  it("with Stripe on, a subscriber with no Stripe customer still gets dates moved", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_rules");
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const now = Date.now();
    const giver = await family({ subscription_status: "active", current_period_end: now + DAY });
    expect(await ref.rewardReferrer(await family({ referred_by: giver }), now)).toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(Number((await row(giver)).current_period_end)).toBe(now + DAY + plan.REFERRAL_BONUS_DAYS * DAY);
  });

  it("with Stripe on, a non-paying family with a customer id gets days, not a credit", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_rules");
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const now = Date.now();
    const trial = now + DAY;
    const giver = await family({ stripe_customer: "cus_old", subscription_status: "canceled", trial_ends_at: trial });
    expect(await ref.rewardReferrer(await family({ referred_by: giver }), now)).toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(Number((await row(giver)).trial_ends_at)).toBe(trial + plan.REFERRAL_BONUS_DAYS * DAY);
  });

  it("with Stripe on, a credited subscriber is touched (updated_at) and returns true", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_rules");
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 200 })));
    const now = Date.now();
    const giver = await family({ stripe_customer: "cus_ok", subscription_status: "trialing", current_period_end: 77 });
    expect(await ref.rewardReferrer(await family({ referred_by: giver }), now)).toBe(true);
    const r = await row(giver);
    expect(Number(r.updated_at)).toBe(now);
    expect(Number(r.current_period_end)).toBe(77);
    expect(Number(r.referral_rewards)).toBe(1);
  });

  it("rolls the claim back when Stripe refuses, so a later confirmation can try again", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_rules");
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 500 })));
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    const giver = await family({ stripe_customer: "cus_bad", subscription_status: "active", current_period_end: 5, referral_rewards: 2 });
    const friend = await family({ referred_by: giver });
    expect(await ref.rewardReferrer(friend)).toBe(false);
    expect(err).toHaveBeenCalledTimes(1);
    expect(String(err.mock.calls[0][0])).toContain("[referral]");
    expect((await row(friend)).referral_rewarded_at).toBeNull();
    expect(Number((await row(giver)).referral_rewards)).toBe(2);
    expect(Number((await row(giver)).current_period_end)).toBe(5);
    // A later attempt that works pays.
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 200 })));
    expect(await ref.rewardReferrer(friend)).toBe(true);
    expect(Number((await row(giver)).referral_rewards)).toBe(3);
  });

  it("does not take a reward count below zero on rollback", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_rules");
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 500 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const giver = await family({ stripe_customer: "cus_z", subscription_status: "active" });
    await ref.rewardReferrer(await family({ referred_by: giver }));
    expect(Number((await row(giver)).referral_rewards)).toBe(0);
  });
});

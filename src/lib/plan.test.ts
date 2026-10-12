import { describe, expect, it } from "vitest";
import { canUse, firstChargeAt, MIN_TRIAL_CARRY_MS, FREE_UNITS_PER_COURSE, hasCodeAccess, hasPaidPlan, isLifetime, isPremium, LIFETIME_ACCESS, MAX_CHILDREN, PRICES, trialDaysLeft, unitOpen, upgradeOffer } from "./plan";
import type { FamilyInfo } from "./model";

const family = (overrides: Partial<FamilyInfo> = {}) => ({
  plan: "free",
  trialEndsAt: 0,
  ...overrides,
}) as FamilyInfo;

describe("family plan access", () => {
  it("opens everything while a redeemed code's access lasts, then closes it", () => {
    const coded = family({ plan: "free", accessUntil: 5_000 });
    expect(hasCodeAccess(coded, 4_999)).toBe(true);
    expect(isPremium(coded, 4_999)).toBe(true);
    expect(hasPaidPlan(coded, 4_999)).toBe(true);
    expect(upgradeOffer(coded, 4_999)).toBeNull();
    expect(unitOpen(coded, 10, 4_999)).toBe(true);
    expect(isLifetime(coded)).toBe(false);
    expect(hasCodeAccess(coded, 5_000)).toBe(false);
    expect(isPremium(coded, 5_000)).toBe(false);
    expect(hasPaidPlan(coded, 5_000)).toBe(false);
    expect(upgradeOffer(coded, 5_000)).toBe("free");
    expect(hasCodeAccess(family({ accessUntil: null }), 1)).toBe(false);
    const life = family({ accessUntil: LIFETIME_ACCESS });
    expect(isLifetime(life)).toBe(true);
    expect(isPremium(life, Date.UTC(2200, 0, 1))).toBe(true);
    expect(isLifetime(family({ accessUntil: LIFETIME_ACCESS - 1 }))).toBe(false);
  });

  it("recognizes premium plans and active subscriptions", () => {
    for (const plan of [family({ plan: "premium" }), family({ subscription: { status: "active" } as never }), family({ subscription: { status: "trialing" } as never }), family({ subscription: { status: "past_due" } as never })]) {
      expect(isPremium(plan, 1_000)).toBe(true);
      expect(canUse(plan, "arcade", 1_000)).toBe(true);
      expect(unitOpen(plan, 10, 1_000)).toBe(true);
    }
  });

  it("keeps access during trial and rounds remaining days up", () => {
    const trial = family({ trialEndsAt: 86_400_000 + 2 });
    expect(isPremium(trial, 1)).toBe(true);
    expect(trialDaysLeft(trial, 1)).toBe(2);
    expect(unitOpen(trial, 10, 1)).toBe(true);
  });

  it("offers a subscribe prompt during the trial and after it, and hides it once a family has paid", () => {
    const trial = family({ plan: "trial", trialEndsAt: 10_000 });
    expect(hasPaidPlan(trial)).toBe(false);
    expect(upgradeOffer(trial, 1)).toBe("trial");
    expect(upgradeOffer(trial, 10_000)).toBe("free");
    expect(upgradeOffer(family({ plan: "free", trialEndsAt: 0 }), 1)).toBe("free");
    for (const paid of [family({ plan: "premium" }), family({ subscription: { status: "active" } as never }), family({ subscription: { status: "trialing" } as never }), family({ subscription: { status: "past_due" } as never })]) {
      expect(hasPaidPlan(paid)).toBe(true);
      expect(upgradeOffer(paid, 1)).toBeNull();
    }
    expect(hasPaidPlan(family({ subscription: { status: "canceled" } as never }))).toBe(false);
  });

  it("limits expired free plans to the first units in each course", () => {
    const expired = family({ trialEndsAt: 100 });
    expect(isPremium(expired, 100)).toBe(false);
    expect(trialDaysLeft(expired, 100)).toBe(0);
    expect(canUse(expired, "fullReports", 100)).toBe(false);
    expect([0, 1, 2, FREE_UNITS_PER_COURSE].map((index) => unitOpen(expired, index, 100))).toEqual([true, true, false, false]);
  });

  it("covers three children on one family plan", () => {
    expect(MAX_CHILDREN).toBe(3);
  });

  it("charges C$14.99 a month or C$119.99 a year, saving 33%", () => {
    expect(PRICES).toEqual({
      month: { amount: 14.99, currency: "CAD", label: "$14.99/month" },
      year: { amount: 119.99, currency: "CAD", label: "$119.99/year", note: "Save 33%" },
    });
    expect(Math.round((1 - PRICES.year.amount / (PRICES.month.amount * 12)) * 100)).toBe(33);
  });
});

describe("first charge when subscribing during the trial", () => {
  const now = 1_000_000_000_000;
  it("waits for the trial to end so no free days are lost", () => {
    expect(firstChargeAt(now + 10 * 86_400_000, false, now)).toBe(now + 10 * 86_400_000);
    expect(firstChargeAt(now + MIN_TRIAL_CARRY_MS, false, now)).toBe(now + MIN_TRIAL_CARRY_MS);
  });
  it("charges at checkout when the trial is over or nearly over, which Stripe can't delay", () => {
    expect(firstChargeAt(now + MIN_TRIAL_CARRY_MS - 1, false, now)).toBeNull();
    expect(firstChargeAt(now - 1, false, now)).toBeNull();
  });
  it("never gives a second trial to a family that had a paid plan", () => {
    expect(firstChargeAt(now + 10 * 86_400_000, true, now)).toBeNull();
  });
});

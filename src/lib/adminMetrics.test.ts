import { describe, expect, it } from "vitest";
import { cancelledOn, computeMetrics, emptyInput, familyGroup, fee, METRIC_SECTIONS, monthStart, SECTION_INPUTS, sectionOf, type FamilyFacts, type MetricsInput, type PaymentFacts, MONTHLY_CENTS, MONTHLY_CENTS_USD, wontRenew, YEARLY_CENTS } from "./adminMetrics";
import { LIFETIME_ACCESS } from "./plan";

const DAY = 86_400_000;
// 15 March 2026, noon UTC.
const NOW = Date.UTC(2026, 2, 15, 12);

const family = (over: Partial<FamilyFacts> = {}): FamilyFacts => ({
  createdAt: NOW - 100 * DAY,
  plan: "trial",
  trialEndsAt: NOW - 70 * DAY,
  subscriptionStatus: null,
  subscriptionInterval: null,
  billingEventAt: 0,
  accessUntil: null,
  referred: false,
  verified: true,
  practised: true,
  ...over,
});
const pay = (over: Partial<PaymentFacts> = {}): PaymentFacts => ({ familyId: "f1", amount: 1499, refunded: 0, interval: "month", paidAt: NOW - DAY, ...over });

function metrics(over: Partial<MetricsInput> = {}) {
  return computeMetrics({
    now: NOW,
    families: [],
    parents: 0,
    children: 0,
    teachers: 0,
    students: 0,
    classes: 0,
    payments: [],
    activity: [],
    activeFamilies: { d1: 0, d7: 0, d30: 0 },
    guestDevices: { d1: 0, d7: 0, d30: 0 },
    monthlyCosts: 0,
    redemptions: 0,
    reports: 0,
    ...over,
  });
}

describe("customer groups", () => {
  it("puts a family in one group, paying first, then code access, then trial", () => {
    const f = { plan: "trial", accessUntil: null, trialEndsAt: NOW + DAY };
    expect(familyGroup(f, NOW)).toBe("trial");
    expect(familyGroup({ ...f, trialEndsAt: NOW }, NOW)).toBe("free");
    expect(familyGroup({ ...f, accessUntil: NOW + 1 }, NOW)).toBe("code");
    expect(familyGroup({ ...f, accessUntil: NOW }, NOW)).toBe("trial");
    expect(familyGroup({ ...f, plan: "premium", accessUntil: NOW + 1 }, NOW)).toBe("paying");
  });

  it("puts every family in exactly one group", () => {
    const m = metrics({
      families: [
        family({ plan: "premium", subscriptionInterval: "month" }),
        family({ plan: "premium", subscriptionInterval: "year", subscriptionStatus: "past_due" }),
        family({ plan: "premium", accessUntil: LIFETIME_ACCESS }), // paying wins over a code
        family({ trialEndsAt: NOW + 5 * DAY }),
        family({ accessUntil: LIFETIME_ACCESS }),
        family({ accessUntil: NOW + 30 * DAY, trialEndsAt: NOW + DAY }), // a code wins over a trial
        family({ accessUntil: NOW - DAY }), // an expired code is free
        family(),
      ],
    });
    expect(m.customers).toEqual({ paying: 3, monthly: 1, yearly: 1, pastDue: 1, cancelling: 0, trialing: 1, codeAccess: 2, lifetime: 1, free: 2 });
    const c = m.customers;
    expect(c.paying + c.trialing + c.codeAccess + c.free).toBe(m.people.families);
  });
});

describe("growth", () => {
  it("counts sign-ups by calendar month, by week and against the 30 days before", () => {
    const m = metrics({
      families: [
        family({ createdAt: Date.UTC(2026, 2, 1) }),
        family({ createdAt: NOW - 1000 }),
        family({ createdAt: Date.UTC(2026, 1, 28, 23) }),
        family({ createdAt: NOW - 45 * DAY }),
        family({ createdAt: Date.UTC(2025, 2, 31) }), // 12 months back is outside the chart
      ],
    });
    expect(m.acquisition.thisMonth).toBe(2);
    expect(m.acquisition.lastMonth).toBe(1);
    expect(m.acquisition.last30).toBe(3);
    expect(m.acquisition.previous30).toBe(1);
    expect(m.acquisition.monthly).toHaveLength(12);
    expect(m.acquisition.monthly.at(-1)).toEqual({ label: "Mar 2026", value: 2 });
    expect(m.acquisition.monthly[0].label).toBe("Apr 2025");
    expect(m.acquisition.monthly.reduce((s, p) => s + p.value, 0)).toBe(4);
    expect(m.acquisition.weekly).toHaveLength(26);
    expect(m.acquisition.weekly.at(-1)!.value).toBe(1);
  });

  it("works out trial conversion, activation, referrals and confirmed emails", () => {
    const m = metrics({
      families: [
        family({ trialEndsAt: NOW - 10 * DAY, plan: "premium" }),
        family({ trialEndsAt: NOW - 20 * DAY }),
        family({ trialEndsAt: NOW - 200 * DAY, plan: "premium" }), // ended too long ago
        family({ createdAt: NOW - 5 * DAY, trialEndsAt: NOW + 25 * DAY, practised: false, referred: true, verified: false }),
        family({ createdAt: NOW - 6 * DAY, trialEndsAt: NOW + 24 * DAY }),
      ],
    });
    expect(m.acquisition.trialsEnded).toBe(2);
    expect(m.acquisition.trialsConverted).toBe(1);
    expect(m.acquisition.trialConversion).toBe(0.5);
    expect(m.acquisition.activationRate).toBe(0.5);
    expect(m.acquisition.referred).toBe(1);
    expect(m.acquisition.referredRate).toBe(0.2);
    expect(m.acquisition.confirmedRate).toBe(0.8);
    expect(m.acquisition.paidShare).toBe(0.4);
  });

  it("says unknown instead of dividing by zero", () => {
    const m = metrics();
    expect(m.acquisition.trialConversion).toBeNull();
    expect(m.acquisition.activationRate).toBeNull();
    expect(m.revenue.arppu).toBeNull();
    expect(m.revenue.churnRate).toBeNull();
    expect(m.revenue.lifetimeValue).toBeNull();
    expect(m.engagement.stickiness).toBeNull();
  });
});

describe("money", () => {
  it("adds monthly and yearly plans into recurring revenue at list price", () => {
    const m = metrics({ families: [family({ plan: "premium", subscriptionInterval: "month" }), family({ plan: "premium", subscriptionInterval: "year" })] });
    expect(m.revenue.mrr).toBe(1499 + Math.round(11999 / 12));
    expect(m.revenue.arr).toBe(m.revenue.mrr * 12);
    expect(m.revenue.arppu).toBe(m.revenue.mrr / 2);
  });

  it("keeps US families' USD apart from the CAD numbers, and converts nothing", () => {
    const m = metrics({
      families: [
        family({ plan: "premium", subscriptionInterval: "month" }),
        family({ plan: "premium", subscriptionInterval: "year", country: "US" }),
        family({ plan: "premium", subscriptionInterval: "month", country: "US" }),
      ],
      payments: [pay({ paidAt: Date.UTC(2026, 2, 2) }), pay({ familyId: "us1", paidAt: Date.UTC(2026, 2, 3), amount: 11999, interval: "year", currency: "usd" }), pay({ familyId: "us2", paidAt: Date.UTC(2026, 1, 3), currency: "USD" })],
    });
    // CAD: only the Canadian family and the CAD payment.
    expect(m.revenue.mrr).toBe(1499);
    expect(m.revenue.arppu).toBe(1499);
    expect(m.revenue.thisMonth).toBe(1499);
    expect(m.revenue.yearToDate).toBe(1499);
    expect(m.revenue.months.at(-1)!.fees).toBe(fee(1499));
    expect(m.revenue.usd).toEqual({ mrr: 1499 + Math.round(11999 / 12), arr: (1499 + Math.round(11999 / 12)) * 12, paying: 2, renewing: 2, thisMonth: 11999, lastMonth: 1499, yearToDate: 11999 + 1499 });
    // Families are still counted once, whatever they pay in.
    expect(m.customers.paying).toBe(3);
    expect(m.revenue.customersEver).toBe(3);
  });

  it("has no USD numbers until a US family pays", () => {
    expect(metrics({ families: [family({ plan: "premium", subscriptionInterval: "month" })], payments: [pay()] }).revenue.usd).toBeNull();
  });

  it("counts gift payments in revenue but not as a paying family", () => {
    const m = metrics({ payments: [pay({ familyId: null, interval: "gift", amount: 11999, paidAt: Date.UTC(2026, 2, 2) })] });
    const mar = m.revenue.months.find((x) => x.label === "Mar 2026")!;
    expect(mar.revenue).toBe(11999);
    expect(mar.paying).toBe(0);
  });

  it("sums payments by month, less refunds, with estimated fees and costs", () => {
    const m = metrics({
      monthlyCosts: 5000,
      payments: [pay({ paidAt: Date.UTC(2026, 2, 2) }), pay({ paidAt: Date.UTC(2026, 2, 3), amount: 11999, refunded: 11999, interval: "year" }), pay({ paidAt: Date.UTC(2026, 1, 3), familyId: null })],
    });
    expect(m.revenue.thisMonth).toBe(1499);
    expect(m.revenue.lastMonth).toBe(1499);
    expect(m.revenue.yearToDate).toBe(2998);
    const march = m.revenue.months.at(-1)!;
    expect(march.label).toBe("Mar 2026");
    expect(march.fees).toBe(fee(1499) + fee(11999)); // Stripe keeps its fee on a refunded payment
    // March is half over (14.5 of 31 days), so it carries that share of the costs.
    expect(march.costs).toBe(Math.round((5000 * (NOW - Date.UTC(2026, 2, 1))) / (31 * DAY)));
    expect(march.profit).toBe(1499 - march.fees - march.costs);
    expect(m.revenue.months.at(-2)!.costs).toBe(5000);
    expect(m.revenue.profitThisMonth).toBe(march.profit);
    expect(m.revenue.feesThisMonth).toBe(march.fees);
  });

  it("lets a month lose money", () => {
    const m = metrics({ monthlyCosts: 10_000 });
    expect(m.revenue.months[0].profit).toBe(-10_000);
    expect(m.revenue.projectedProfitYear).toBeLessThan(0);
  });

  it("counts a yearly payer as paying for the 12 months it covers", () => {
    const m = metrics({ payments: [pay({ familyId: "y", interval: "year", amount: 11999, paidAt: Date.UTC(2025, 5, 10) }), pay({ familyId: "m", paidAt: Date.UTC(2026, 2, 1) })] });
    const paying = Object.fromEntries(m.revenue.months.map((x) => [x.label, x.paying]));
    expect(paying["May 2025"]).toBe(0);
    expect(paying["Jun 2025"]).toBe(1);
    expect(paying["Feb 2026"]).toBe(1);
    expect(paying["Mar 2026"]).toBe(2);
    expect(m.revenue.customersEver).toBe(2);
  });

  it("projects the year from what came in plus recurring revenue for the months left", () => {
    const m = metrics({ families: [family({ plan: "premium", subscriptionInterval: "month" })], payments: [pay({ paidAt: Date.UTC(2026, 0, 5) }), pay({ paidAt: Date.UTC(2026, 1, 5) })] });
    const monthsLeft = (Date.UTC(2027, 0, 1) - NOW) / ((365.25 / 12) * DAY);
    expect(m.revenue.projectedYear).toBe(2998 + Math.round(1499 * monthsLeft));
    expect(m.revenue.projectedProfitYear).toBeLessThan(m.revenue.projectedYear);
  });

  it("works out churn and lifetime value from recent cancellations", () => {
    const m = metrics({
      families: [
        family({ plan: "premium", subscriptionInterval: "month" }),
        family({ plan: "premium", subscriptionInterval: "month" }),
        family({ plan: "premium", subscriptionInterval: "month" }),
        family({ plan: "free", subscriptionStatus: "canceled", billingEventAt: NOW - 3 * DAY }),
        family({ plan: "free", subscriptionStatus: "canceled", billingEventAt: NOW - 60 * DAY }),
      ],
    });
    expect(m.revenue.cancelled30).toBe(1);
    expect(m.revenue.churnRate).toBe(0.25);
    expect(m.revenue.lifetimeValue).toBe(1499 * 4);
  });

  it("stops counting a plan toward MRR from the day it is cancelled, while it still has access", () => {
    const m = metrics({
      families: [
        family({ plan: "premium", subscriptionInterval: "month" }),
        family({ plan: "premium", subscriptionInterval: "year" }),
        // Cancelled in the billing portal 5 days ago; the paid month runs for 20 more.
        family({ plan: "premium", subscriptionInterval: "month", cancelAt: NOW + 20 * DAY, cancelledAt: NOW - 5 * DAY, billingEventAt: NOW - 5 * DAY }),
        // Refunded in full (the plan ends), not yet cancelled in Stripe.
        family({ plan: "premium", subscriptionInterval: "year", refunded: true }),
        // A US plan set to end.
        family({ plan: "premium", subscriptionInterval: "month", country: "US", cancelAt: NOW + 10 * DAY, cancelledAt: NOW - DAY }),
        family({ plan: "premium", subscriptionInterval: "month", country: "US" }),
      ],
    });
    expect(m.customers.paying).toBe(6);
    expect(m.customers.cancelling).toBe(3);
    expect(m.revenue.renewing).toBe(2);
    expect(m.revenue.mrr).toBe(MONTHLY_CENTS + Math.round(YEARLY_CENTS / 12));
    expect(m.revenue.arr).toBe(m.revenue.mrr * 12);
    expect(m.revenue.arppu).toBe(m.revenue.mrr / 2);
    expect(m.revenue.usd).toMatchObject({ mrr: MONTHLY_CENTS_USD, paying: 2, renewing: 1 });
    // The two cancellations count as churn now, not when their paid time runs out.
    expect(m.revenue.cancelled30).toBe(2);
    expect(m.revenue.churnRate).toBe(2 / 6);
    // The projection only carries plans that renew.
    const monthsLeft = (Date.UTC(2027, 0, 1) - NOW) / ((365.25 / 12) * DAY);
    expect(m.revenue.projectedYear).toBe(Math.round(m.revenue.mrr * monthsLeft));
  });

  it("counts a cancellation once, on the day it was made, after the plan ends", () => {
    const ended = family({ plan: "free", subscriptionStatus: "canceled", cancelAt: NOW - 2 * DAY, cancelledAt: NOW - 40 * DAY, billingEventAt: NOW - 2 * DAY });
    expect(cancelledOn(ended)).toBe(NOW - 40 * DAY);
    expect(metrics({ families: [ended] }).revenue.cancelled30).toBe(0);
    // Older rows have no cancellation day, so the end stands in.
    expect(cancelledOn({ ...ended, cancelledAt: null })).toBe(NOW - 2 * DAY);
    // A plan that was resumed, or never cancelled, has none.
    expect(cancelledOn(family({ plan: "premium", subscriptionStatus: "active" }))).toBeNull();
    expect(wontRenew({ cancelAt: null, refunded: false })).toBe(false);
  });

  it("estimates Stripe's fee as 2.9% + 30¢", () => {
    expect(fee(1499)).toBe(73);
    expect(fee(0)).toBe(0);
  });
});

describe("practice", () => {
  it("fills 30 days, with empty days at zero", () => {
    const today = Math.floor(NOW / DAY);
    const m = metrics({
      activity: [
        { day: today, families: 3, answers: 40, ms: 600_000 },
        { day: today - 29, families: 1, answers: 5, ms: 60_000 },
        { day: today - 30, families: 9, answers: 99, ms: 0 }, // too old
      ],
      activeFamilies: { d1: 2, d7: 5, d30: 10 },
      guestDevices: { d1: 1, d7: 4, d30: 9 },
    });
    expect(m.engagement.daily).toHaveLength(30);
    expect(m.engagement.daily.at(-1)).toEqual({ label: "Mar 15", families: 3, answers: 40, minutes: 10 });
    expect(m.engagement.daily[0].answers).toBe(5);
    expect(m.engagement.daily[1].answers).toBe(0);
    expect(m.engagement.answers30).toBe(45);
    expect(m.engagement.minutes30).toBe(11);
    expect(m.engagement.stickiness).toBe(0.2);
    // Guest players are counted apart from families and never change their numbers.
    expect(m.engagement.guests).toEqual({ d1: 1, d7: 4, d30: 9 });
  });
});

describe("monthStart", () => {
  it("moves across years", () => {
    expect(monthStart(Date.UTC(2026, 0, 20), -1)).toBe(Date.UTC(2025, 11, 1));
    expect(monthStart(Date.UTC(2026, 11, 20), 1)).toBe(Date.UTC(2027, 0, 1));
  });
});

describe("one section at a time", () => {
  it("gives each section the same numbers from only the inputs it reads", () => {
    const full: MetricsInput = {
      now: NOW,
      families: [
        family({ plan: "premium", subscriptionInterval: "month", referred: true }),
        family({ plan: "premium", subscriptionInterval: "year", createdAt: NOW - 3 * DAY, country: "US" }),
        family({ subscriptionStatus: "canceled", billingEventAt: NOW - 2 * DAY }),
        family({ trialEndsAt: NOW + 5 * DAY, createdAt: NOW - 10 * DAY, verified: false, practised: false }),
        family({ accessUntil: LIFETIME_ACCESS }),
      ],
      parents: 6,
      children: 8,
      teachers: 2,
      students: 30,
      classes: 3,
      payments: [pay(), pay({ familyId: "f2", amount: 11999, interval: "year", paidAt: NOW - 40 * DAY }), pay({ familyId: "f3", refunded: 1499, paidAt: NOW - 70 * DAY }), pay({ familyId: "f4", currency: "usd" })],
      activity: [
        { day: Math.floor(NOW / DAY), families: 3, answers: 40, ms: 400_000 },
        { day: Math.floor(NOW / DAY) - 2, families: 1, answers: 12, ms: 90_000 },
      ],
      activeFamilies: { d1: 3, d7: 4, d30: 5 },
      guestDevices: { d1: 1, d7: 2, d30: 6 },
      monthlyCosts: 5000,
      redemptions: 2,
      reports: 1,
    };
    const all = computeMetrics(full);
    for (const section of METRIC_SECTIONS) {
      const input = { ...emptyInput(NOW), ...Object.fromEntries(SECTION_INPUTS[section].map((k) => [k, full[k]])) } as MetricsInput;
      expect(sectionOf(computeMetrics(input), section)).toEqual(sectionOf(all, section));
    }
  });
});

import { PRICES } from "./plan";

// Business numbers for the admin dashboard, worked out from plain rows so they can be tested without a
// database. Everything is a count or a sum: nothing here names or describes any one family or child.
// Days and months are UTC. Money is in cents (CAD).

const DAY = 86_400_000;
const WEEK = 7 * DAY;
/** Stripe's standard Canadian card fee, used to estimate fees: 2.9% + 30¢ per payment. */
export const STRIPE_FEE_RATE = 0.029;
export const STRIPE_FEE_FIXED = 30;
/** Access that runs past this many years from now counts as lifetime. */
export const LIFETIME_YEARS = 50;
export const MONTHLY_CENTS = Math.round(PRICES.month.amount * 100);
export const YEARLY_CENTS = Math.round(PRICES.year.amount * 100);

export interface FamilyFacts {
  createdAt: number;
  plan: string;
  trialEndsAt: number;
  subscriptionStatus: string | null;
  subscriptionInterval: string | null;
  /** When billing last changed (for a cancelled subscription, about when it ended). */
  billingEventAt: number;
  accessUntil: number | null;
  referred: boolean;
  verified: boolean;
  /** Any practice synced from this family, ever. */
  practised: boolean;
}

export interface PaymentFacts {
  /** Null once the family deleted its account: the money still counts, nobody is linked. */
  familyId: string | null;
  amount: number;
  refunded: number;
  interval: string | null;
  paidAt: number;
}

export interface DayActivity {
  /** Days since 1970-01-01 (UTC). */
  day: number;
  families: number;
  answers: number;
  ms: number;
}

export interface MetricsInput {
  now: number;
  families: FamilyFacts[];
  parents: number;
  children: number;
  teachers: number;
  students: number;
  classes: number;
  payments: PaymentFacts[];
  /** The last 30 UTC days of practice, any order; days without practice can be left out. */
  activity: DayActivity[];
  activeFamilies: { d1: number; d7: number; d30: number };
  /** Running costs per month, in cents, entered by the admin (hosting, email, tools). */
  monthlyCosts: number;
  redemptions: number;
  reports: number;
}

export interface Point {
  label: string;
  value: number;
  detail?: string;
}

export interface MonthMoney {
  label: string;
  revenue: number;
  fees: number;
  costs: number;
  profit: number;
  paying: number;
}

export interface Metrics {
  generatedAt: number;
  people: { parents: number; families: number; children: number; teachers: number; students: number; classes: number; childrenPerFamily: number };
  customers: { paying: number; monthly: number; yearly: number; pastDue: number; trialing: number; codeAccess: number; lifetime: number; free: number };
  acquisition: {
    thisMonth: number;
    lastMonth: number;
    last30: number;
    previous30: number;
    confirmedRate: number | null;
    referred: number;
    referredRate: number | null;
    activationRate: number | null;
    trialsEnded: number;
    trialsConverted: number;
    trialConversion: number | null;
    paidShare: number | null;
    weekly: Point[];
    monthly: Point[];
  };
  engagement: { d1: number; d7: number; d30: number; stickiness: number | null; daily: { label: string; families: number; answers: number; minutes: number }[]; answers30: number; minutes30: number };
  revenue: {
    mrr: number;
    arr: number;
    arppu: number | null;
    thisMonth: number;
    lastMonth: number;
    yearToDate: number;
    projectedYear: number;
    feesThisMonth: number;
    monthlyCosts: number;
    profitThisMonth: number;
    profitYearToDate: number;
    projectedProfitYear: number;
    cancelled30: number;
    churnRate: number | null;
    lifetimeValue: number | null;
    /** Families that have ever paid. */
    customersEver: number;
    months: MonthMoney[];
  };
  other: { redemptions: number; reports: number };
}

const rate = (part: number, whole: number) => (whole > 0 ? part / whole : null);
export const fee = (amount: number) => (amount > 0 ? Math.round(amount * STRIPE_FEE_RATE) + STRIPE_FEE_FIXED : 0);

/** Start of the UTC month `offset` months from the one holding `t` (0 = this month, -1 = last month). */
export function monthStart(t: number, offset = 0): number {
  const d = new Date(t);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + offset, 1);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthLabel = (t: number) => `${MONTHS[new Date(t).getUTCMonth()]} ${new Date(t).getUTCFullYear()}`;
const dayLabel = (t: number) => `${MONTHS[new Date(t).getUTCMonth()]} ${new Date(t).getUTCDate()}`;

export type FamilyGroup = "paying" | "code" | "trial" | "free";

/** Which customer group a family is in right now: the first that fits, so each family is in exactly one. */
export function familyGroup(f: Pick<FamilyFacts, "plan" | "accessUntil" | "trialEndsAt">, now: number): FamilyGroup {
  if (f.plan === "premium") return "paying";
  if (f.accessUntil && f.accessUntil > now) return "code";
  if (f.trialEndsAt > now) return "trial";
  return "free";
}

export function computeMetrics(input: MetricsInput): Metrics {
  const { now, families, payments } = input;
  const lifetimeFrom = now + LIFETIME_YEARS * 365 * DAY;

  // Who is what right now. A family is counted once, in the first group that fits.
  let paying = 0,
    monthly = 0,
    yearly = 0,
    pastDue = 0,
    trialing = 0,
    codeAccess = 0,
    lifetime = 0,
    free = 0,
    cancelled30 = 0;
  for (const f of families) {
    if (f.subscriptionStatus === "canceled" && f.billingEventAt > now - 30 * DAY) cancelled30++;
    const group = familyGroup(f, now);
    if (group === "paying") {
      paying++;
      if (f.subscriptionInterval === "year") yearly++;
      else if (f.subscriptionInterval === "month") monthly++;
      if (f.subscriptionStatus === "past_due") pastDue++;
    } else if (group === "code") {
      codeAccess++;
      if (f.accessUntil! >= lifetimeFrom) lifetime++;
    } else if (group === "trial") trialing++;
    else free++;
  }

  // Sign-ups.
  const thisMonthStart = monthStart(now);
  const lastMonthStart = monthStart(now, -1);
  const inRange = (from: number, to: number) => families.filter((f) => f.createdAt >= from && f.createdAt < to).length;
  const weekly: Point[] = [];
  for (let i = 25; i >= 0; i--) {
    const from = now - (i + 1) * WEEK;
    weekly.push({ label: dayLabel(from), value: inRange(from, from + WEEK) });
  }
  const monthly12: Point[] = [];
  for (let i = -11; i <= 0; i++) monthly12.push({ label: monthLabel(monthStart(now, i)), value: inRange(monthStart(now, i), monthStart(now, i + 1)) });
  const recent = families.filter((f) => f.createdAt > now - 90 * DAY);
  const trialsEnded = families.filter((f) => f.trialEndsAt <= now && f.trialEndsAt > now - 90 * DAY);
  const payers = new Set(payments.filter((p) => p.familyId && p.amount > p.refunded).map((p) => p.familyId));
  // A family whose trial ended in the last 90 days counts as converted if it pays now.
  const trialsConverted = trialsEnded.filter((f) => f.plan === "premium").length;

  // Practice.
  const today = Math.floor(now / DAY);
  const byDay = new Map(input.activity.map((a) => [a.day, a]));
  const daily = [];
  for (let d = today - 29; d <= today; d++) {
    const a = byDay.get(d);
    daily.push({ label: dayLabel(d * DAY), families: a?.families ?? 0, answers: a?.answers ?? 0, minutes: Math.round((a?.ms ?? 0) / 60_000) });
  }

  // Money. Revenue is what Stripe collected, less refunds; fees are estimated.
  const net = (p: PaymentFacts) => Math.max(0, p.amount - p.refunded);
  const sumBetween = (from: number, to: number) => payments.filter((p) => p.paidAt >= from && p.paidAt < to).reduce((s, p) => s + net(p), 0);
  const feesBetween = (from: number, to: number) => payments.filter((p) => p.paidAt >= from && p.paidAt < to).reduce((s, p) => s + fee(p.amount), 0);
  const yearStart = Date.UTC(new Date(now).getUTCFullYear(), 0, 1);
  const yearEnd = Date.UTC(new Date(now).getUTCFullYear() + 1, 0, 1);
  const thisMonth = sumBetween(thisMonthStart, now + 1);
  const yearToDate = sumBetween(yearStart, now + 1);
  // Monthly recurring revenue at list price: yearly plans count as a twelfth a month. Discounts aren't known
  // until a payment arrives, so this is an upper bound when discount codes are in use.
  const otherPaying = paying - monthly - yearly;
  const mrr = Math.round((monthly + otherPaying) * MONTHLY_CENTS + (yearly * YEARLY_CENTS) / 12);
  const monthsLeft = (yearEnd - now) / ((365.25 / 12) * DAY);
  const projectedRest = Math.round(mrr * monthsLeft);
  const projectedYear = yearToDate + projectedRest;
  // Fees on the projected rest: the percentage, plus the fixed part once per monthly payment and once a year per yearly plan.
  const projectedRestFees = Math.round(projectedRest * STRIPE_FEE_RATE + STRIPE_FEE_FIXED * ((monthly + otherPaying) * monthsLeft + (yearly * monthsLeft) / 12));
  const elapsedMonths = (now - yearStart) / ((365.25 / 12) * DAY);
  const costsYearToDate = Math.round(input.monthlyCosts * elapsedMonths);
  const feesYearToDate = feesBetween(yearStart, now + 1);

  const months: MonthMoney[] = [];
  for (let i = -11; i <= 0; i++) {
    const from = monthStart(now, i);
    const to = monthStart(now, i + 1);
    const revenue = sumBetween(from, to);
    const fees = feesBetween(from, to);
    // A family counts as paying in a month if a monthly payment landed in it, or a yearly one in the 12 months up to it.
    const payingIn = new Set(
      payments
        .filter((p) => net(p) > 0 && (p.interval === "year" ? p.paidAt >= monthStart(from, -11) && p.paidAt < to : p.paidAt >= from && p.paidAt < to))
        .map((p, k) => p.familyId ?? `deleted-${k}`),
    ).size;
    // The current month only carries costs for the days gone so far, so profit compares like with like.
    const costs = i === 0 ? Math.round((input.monthlyCosts * (now - from)) / (to - from)) : input.monthlyCosts;
    months.push({ label: monthLabel(from), revenue, fees, costs, profit: revenue - fees - costs, paying: payingIn });
  }
  const current = months[months.length - 1];
  const churnRate = rate(cancelled30, paying + cancelled30);
  const arppu = paying ? mrr / paying : null;

  return {
    generatedAt: now,
    people: {
      parents: input.parents,
      families: families.length,
      children: input.children,
      teachers: input.teachers,
      students: input.students,
      classes: input.classes,
      childrenPerFamily: families.length ? input.children / families.length : 0,
    },
    customers: { paying, monthly, yearly, pastDue, trialing, codeAccess, lifetime, free },
    acquisition: {
      thisMonth: inRange(thisMonthStart, now + 1),
      lastMonth: inRange(lastMonthStart, thisMonthStart),
      last30: inRange(now - 30 * DAY, now + 1),
      previous30: inRange(now - 60 * DAY, now - 30 * DAY),
      confirmedRate: rate(families.filter((f) => f.verified).length, families.length),
      referred: families.filter((f) => f.referred).length,
      referredRate: rate(families.filter((f) => f.referred).length, families.length),
      activationRate: rate(recent.filter((f) => f.practised).length, recent.length),
      trialsEnded: trialsEnded.length,
      trialsConverted,
      trialConversion: rate(trialsConverted, trialsEnded.length),
      paidShare: rate(paying, families.length),
      weekly,
      monthly: monthly12,
    },
    engagement: {
      ...input.activeFamilies,
      stickiness: rate(input.activeFamilies.d1, input.activeFamilies.d30),
      daily,
      answers30: daily.reduce((s, d) => s + d.answers, 0),
      minutes30: daily.reduce((s, d) => s + d.minutes, 0),
    },
    revenue: {
      mrr,
      arr: mrr * 12,
      arppu,
      thisMonth,
      lastMonth: sumBetween(lastMonthStart, thisMonthStart),
      yearToDate,
      projectedYear,
      feesThisMonth: current.fees,
      monthlyCosts: input.monthlyCosts,
      profitThisMonth: current.profit,
      profitYearToDate: yearToDate - feesYearToDate - costsYearToDate,
      projectedProfitYear: projectedYear - feesYearToDate - projectedRestFees - input.monthlyCosts * 12,
      cancelled30,
      churnRate,
      // Average revenue per paying family over how long one stays (1 / monthly churn). Unknown until someone has cancelled.
      lifetimeValue: arppu !== null && churnRate ? Math.round(arppu / churnRate) : null,
      customersEver: payers.size,
      months,
    },
    other: { redemptions: input.redemptions, reports: input.reports },
  };
}

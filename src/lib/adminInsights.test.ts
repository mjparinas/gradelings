import { describe, expect, it } from "vitest";
import {
  afterTrial,
  appMix,
  classActivity,
  contentGaps,
  engagementDepth,
  median,
  mostFlagged,
  paywallImpact,
  rate,
  revenueQuality,
  signupSources,
  teacherFunnel,
  trialByWeek,
  trialCurve,
  type SignupFact,
  type TrialFamily,
  type UnitStat,
} from "./adminInsights";

const DAY = 86_400_000;
const NOW = Date.UTC(2026, 10, 5, 12);

const fam = (over: Partial<TrialFamily> = {}): TrialFamily => ({
  createdAt: NOW - 50 * DAY,
  trialEndsAt: NOW - 20 * DAY,
  practiceDays: 0,
  hadLockedUnits: false,
  practisedLastWeek: false,
  practisingNow: false,
  paid: false,
  onCode: false,
  ...over,
});
const many = (n: number, over: Partial<TrialFamily> = {}) => Array.from({ length: n }, () => fam(over));

describe("rate", () => {
  it("shows no rate for a group under 5 families", () => {
    expect(rate(1, 4)).toBeNull();
    expect(rate(1, 5)).toBe(0.2);
  });
  it("takes the median of odd and even lists", () => {
    expect(median([])).toBeNull();
    expect(median([3, 1, 2])).toBe(2);
    expect(median([4, 1, 2, 3])).toBe(2.5);
  });
});

describe("trial curve", () => {
  it("groups families by days practised and leaves code access out", () => {
    const rows = [...many(5, { practiceDays: 0 }), ...many(10, { practiceDays: 5, paid: true }), ...many(5, { practiceDays: 12, paid: true }), ...many(3, { practiceDays: 12, onCode: true, paid: true })];
    const c = trialCurve(rows);
    expect(c.overall).toMatchObject({ families: 20, paid: 15, rate: 0.75 });
    expect(c.byPractice.map((b) => [b.id, b.families, b.paid])).toEqual([
      ["0", 5, 0],
      ["1-3", 0, 0],
      ["4-10", 10, 10],
      ["11+", 5, 5],
    ]);
    expect(c.byPractice[1]!.rate).toBeNull();
  });

  it("splits by whether something would lock", () => {
    const c = trialCurve([...many(6, { hadLockedUnits: true, paid: true }), ...many(6, { hadLockedUnits: false })]);
    expect(c.byLock[0]).toMatchObject({ families: 6, paid: 6, rate: 1 });
    expect(c.byLock[1]).toMatchObject({ families: 6, paid: 0, rate: 0 });
  });

  it("groups by sign-up week, newest first", () => {
    const rows = [...many(5, { createdAt: NOW - 2 * DAY, paid: true }), ...many(5, { createdAt: NOW - 9 * DAY })];
    const w = trialByWeek(rows, NOW, 3);
    expect(w.map((x) => [x.families, x.paid])).toEqual([[5, 5], [5, 0], [0, 0]]);
  });
});

describe("after the trial", () => {
  it("sorts families into paid, active, quiet and never", () => {
    const r = afterTrial([
      fam({ paid: true }),
      fam({ practisingNow: true, hadLockedUnits: true }),
      fam({ practisingNow: true }),
      fam({ practiceDays: 3 }),
      fam(),
      fam({ onCode: true }),
    ]);
    expect(r).toEqual({ total: 5, paid: 1, freeActive: 2, freeQuiet: 1, freeNever: 1, activeAndLimited: 1 });
  });
});

describe("revenue quality", () => {
  it("measures plan mix, timing and refunds", () => {
    const first = [
      { paidAt: NOW - 2 * DAY, trialEndsAt: NOW - DAY, interval: "year" },
      { paidAt: NOW - 3 * DAY, trialEndsAt: NOW - 3 * DAY, interval: "month" },
      { paidAt: NOW, trialEndsAt: NOW - 5 * DAY, interval: "month" },
      { paidAt: NOW, trialEndsAt: NOW - 20 * DAY, interval: "month" },
      { paidAt: NOW, trialEndsAt: NOW - 60 * DAY, interval: "month" },
    ];
    const q = revenueQuality(first, 20, 1);
    expect(q).toMatchObject({ newCustomers: 5, monthly: 4, yearly: 1, yearlyShare: 0.2, refundRate: 0.05 });
    expect(q.timing.map((t) => t.n)).toEqual([2, 1, 1, 1]);
    expect(q.medianDaysAfterTrial).toBe(5);
  });
  it("shows no share for a handful of customers", () => {
    expect(revenueQuality([], 3, 1)).toMatchObject({ yearlyShare: null, refundRate: null, medianDaysAfterTrial: null });
  });
});

describe("engagement depth", () => {
  const kid = (days7: number, days28: number, min = 10) => ({ days7, days28, ms28: days28 * min * 60_000 });
  it("counts regular children, minutes per day and the mode mix", () => {
    const e = engagementDepth([kid(5, 20), kid(3, 8), kid(1, 2), kid(0, 3), kid(2, 4), kid(0, 0)], { adventure: 60, practice: 30, story: 10, review: 0 });
    expect(e.activeChildren).toBe(5);
    expect(e.active7).toBe(4);
    expect(e.regular).toBe(2);
    expect(e.regularShare).toBeNull(); // only 4 children practised this week
    expect(e.minutesPerActiveDay).toBe(10);
    expect(e.spread.map((s) => s.n)).toEqual([2, 2, 1]);
    expect(e.modes.map((m) => [m.id, m.share])).toEqual([["adventure", 0.6], ["practice", 0.3], ["story", 0.1]]);
  });
  it("copes with nobody practising", () => {
    expect(engagementDepth([], {})).toMatchObject({ activeChildren: 0, minutesPerActiveDay: null, modes: [] });
  });
});

describe("teacher funnel", () => {
  it("works out each step from the one before", () => {
    const s = teacherFunnel([10, 8, 4, 2, 1]);
    expect(s.map((x) => x.ofStart)).toEqual([1, 0.8, 0.4, 0.2, 0.1]);
    expect(s[2]!.ofPrevious).toBe(0.5);
  });
  it("sums class activity and ignores empty classes", () => {
    const a = classActivity([{ students: 10, active7: 6 }, { students: 0, active7: 0 }, { students: 6, active7: 1 }]);
    expect(a).toMatchObject({ classes: 2, students: 16, active7: 7, classesMostlyActive: 1 });
    expect(a.activeShare).toBeCloseTo(7 / 16);
  });
});

describe("content gaps", () => {
  const unit = (u: string, answers: number, firstTry: number, over: Partial<UnitStat> = {}): UnitStat => ({ unit: u, answers, firstTry, revealed: 0, families: 5, helpAsks: 0, reports: 0, ...over });
  it("ranks hardest first and skips thin units", () => {
    const g = contentGaps([unit("4/math/a", 100, 80), unit("4/math/b", 100, 40), unit("4/math/c", 10, 1), unit("4/math/d", 100, 10, { families: 2 })]);
    expect(g.map((x) => x.unit)).toEqual(["4/math/b", "4/math/a"]);
    expect(g[0]!.accuracy).toBe(0.4);
  });
  it("lists the most reported or asked-about units", () => {
    const f = mostFlagged([unit("a", 0, 0, { helpAsks: 3 }), unit("b", 0, 0, { reports: 2 }), unit("c", 0, 0)]);
    expect(f.map((x) => x.unit)).toEqual(["b", "a"]);
  });
});

describe("sign-up sources", () => {
  const f = (over: Partial<SignupFact> = {}): SignupFact => ({ path: "password", referred: false, code: false, country: "CA", framework: "bc", practised: true, paid: false, ...over });
  it("splits by path, channel, country and region", () => {
    const s = signupSources([...Array.from({ length: 5 }, () => f({ path: "google", paid: true })), f({ referred: true, country: "US", framework: "washington" }), f({ code: true, framework: null })]);
    expect(s.total).toBe(7);
    expect(s.paths[0]).toMatchObject({ id: "google", signups: 5, paid: 5, paidRate: 1 });
    expect(s.channels.map((c) => c.signups)).toEqual([1, 1, 5]);
    expect(s.countries.map((c) => [c.id, c.signups])).toEqual([["CA", 6], ["US", 1]]);
    expect(s.regions.find((r) => r.id === "none")?.label).toBe("No child added yet");
  });
});

describe("app mix", () => {
  const use = (web: boolean, android = false, ios = false) => ({ web, android, ios });
  it("counts each app, store apps together and store-only families", () => {
    const m = appMix([use(true), use(true), use(true, true), use(false, true), use(false, false, true), use(false)]);
    expect(m.active).toBe(5);
    expect(m.web.n).toBe(3);
    expect(m.storeApp).toEqual({ n: 3, share: 0.6 });
    expect(m.storeOnly.n).toBe(2);
    expect(m.android.n).toBe(2);
    expect(m.ios.n).toBe(1);
  });
  it("shows no share for a handful of families", () => {
    expect(appMix([use(true), use(false, true)]).storeApp.share).toBeNull();
  });
});

describe("paywall impact", () => {
  const row = (kind: string, ago: number, paidWithin7 = false, paidAfter = paidWithin7) => ({ kind, firstAt: NOW - ago * DAY, paidAfter, paidWithin7 });
  it("only judges the week for families who have had the whole week", () => {
    const rows = [...Array.from({ length: 5 }, () => row("locked-unit", 20, true)), ...Array.from({ length: 5 }, () => row("locked-unit", 20)), row("locked-unit", 2), row("members-reports", 3, false, true)];
    const out = paywallImpact(rows, NOW);
    const unit = out.find((o) => o.kind === "locked-unit")!;
    expect(unit).toMatchObject({ families: 11, matured: 10, paidWithin7: 5, paidWithin7Rate: 0.5, paidAfter: 5 });
    const members = out.find((o) => o.kind === "members-reports")!;
    expect(members).toMatchObject({ families: 1, matured: 0, paidWithin7Rate: null, paidAfterRate: null });
    expect(out[0]!.kind).toBe("locked-unit");
  });
});

import { describe, expect, it } from "vitest";
import { chanceBetter, MIN_FAMILIES, normalCdf, verdict } from "./abVerdict";
import { AUTOMATIONS, automationDef, DEFAULT_DAILY_CAP, defaultConfig, MAX_DAILY_CAP, parseConfig, validCap } from "./automations";
import { APP_NAME } from "./brand";
import { csvCell, isoTime, toCsv } from "./csv";
import { biggestDrop, FUNNEL_STEPS, funnelSteps } from "./funnel";
import { DEFAULT_REPLIES, fillReply, REPLY_LIMITS, repliesProblem } from "./savedReplies";

// The pure parts of the admin panel's action tools.

describe("automatic nudges", () => {
  const def = automationDef("quiet-7")!;
  it("start off, with a default message and cap", () => {
    for (const a of AUTOMATIONS) {
      const c = defaultConfig(a);
      expect(c.on).toBe(false);
      expect(c.dailyCap).toBe(DEFAULT_DAILY_CAP);
      expect(c.message.subject).not.toBe("");
    }
  });
  it("read a stored config and fall back for anything broken", () => {
    expect(parseConfig(def, null)).toEqual(defaultConfig(def));
    expect(parseConfig(def, "not json")).toEqual(defaultConfig(def));
    const c = parseConfig(def, JSON.stringify({ on: true, dailyCap: 7, onBy: "a@example.com", onAt: 5, message: { subject: "Hi", body: "Hello there", button: null } }));
    expect(c).toMatchObject({ on: true, dailyCap: 7, onBy: "a@example.com", onAt: 5, message: { subject: "Hi" } });
    const bad = parseConfig(def, JSON.stringify({ on: "yes", dailyCap: 500, message: { subject: "", body: "" } }));
    expect(bad.on).toBe(false);
    expect(bad.dailyCap).toBe(DEFAULT_DAILY_CAP);
    expect(bad.message).toEqual(defaultConfig(def).message);
  });
  it("keep the daily cap between 1 and the maximum", () => {
    expect(validCap(1)).toBe(true);
    expect(validCap(MAX_DAILY_CAP)).toBe(true);
    expect(validCap(0)).toBe(false);
    expect(validCap(MAX_DAILY_CAP + 1)).toBe(false);
    expect(validCap(2.5)).toBe(false);
    expect(validCap("5")).toBe(false);
  });
});

describe("A/B verdict", () => {
  it("has a working normal distribution", () => {
    expect(normalCdf(0)).toBeCloseTo(0.5, 5);
    expect(normalCdf(1.96)).toBeCloseTo(0.975, 3);
    expect(normalCdf(-1.96)).toBeCloseTo(0.025, 3);
  });
  it("compares two rates", () => {
    expect(chanceBetter(0, 0, 10, 1)).toBeNull();
    expect(chanceBetter(10, 0, 10, 0)).toBe(0.5);
    expect(chanceBetter(10, 0, 10, 10)).toBe(1);
    expect(chanceBetter(100, 10, 100, 30)).toBeGreaterThan(0.99);
    expect(chanceBetter(100, 30, 100, 10)).toBeLessThan(0.01);
  });
  const row = (variant: string, families: number, paid: number) => ({ variant, families, paid, active: 0 });
  it("waits for enough families", () => {
    expect(verdict([row("control", 10, 1)]).message).toMatch(/second variant/);
    const v = verdict([row("control", MIN_FAMILIES - 1, 1), row("b", 100, 50)]);
    expect(v).toMatchObject({ leader: null, ready: false });
    expect(v.message).toMatch(/Too early/);
  });
  it("names a clear winner", () => {
    const v = verdict([row("control", 200, 20), row("b", 200, 60)]);
    expect(v).toMatchObject({ leader: "b", ready: true });
    expect(v.message).toMatch(/b is ahead: 30%/);
  });
  it("says to wait when the lead is small", () => {
    const v = verdict([row("control", 100, 10), row("b", 100, 12)]);
    expect(v).toMatchObject({ leader: "b", ready: false });
    expect(v.message).toMatch(/Wait for more families/);
  });
  it("keeps the control when it clearly wins, and says so when nothing beats it", () => {
    expect(verdict([row("control", 200, 60), row("b", 200, 20)])).toMatchObject({ leader: "control", ready: true });
    expect(verdict([row("control", 100, 12), row("b", 100, 10)])).toMatchObject({ leader: null, ready: false });
  });
});

describe("CSV", () => {
  it("quotes and escapes", () => {
    expect(csvCell(null)).toBe("");
    expect(csvCell(3)).toBe("3");
    expect(csvCell(true)).toBe("true");
    expect(csvCell('say "hi", ok')).toBe('"say ""hi"", ok"');
    expect(csvCell("two\nlines")).toBe('"two\nlines"');
  });
  it("never lets a cell run as a formula", () => {
    for (const s of ["=1+1", "+1", "-1", "@SUM(A1)", "\tx", "\rx"]) expect(csvCell(s).replace(/^"/, "").startsWith("'")).toBe(true);
    expect(csvCell(-5)).toBe("-5");
  });
  it("builds rows with Windows line ends", () => {
    expect(toCsv(["a", "b"], [[1, "x,y"]])).toBe('a,b\r\n1,"x,y"\r\n');
    expect(isoTime(null)).toBe("");
    expect(isoTime(Date.UTC(2026, 9, 12, 8, 30))).toBe("2026-10-12T08:30:00Z");
  });
});

describe("sign-up funnel", () => {
  it("works out shares of the start and of the step before", () => {
    const steps = funnelSteps([100, 80, 40, 30, 10, 5]);
    expect(steps).toHaveLength(FUNNEL_STEPS.length);
    expect(steps[0]).toMatchObject({ count: 100, ofStart: 1, ofPrevious: 1 });
    expect(steps[2]).toMatchObject({ count: 40, ofStart: 0.4, ofPrevious: 0.5 });
    expect(funnelSteps([0, 0, 0, 0, 0, 0]).every((s) => s.ofStart === 0)).toBe(true);
  });
  it("points at the step that loses the most", () => {
    expect(biggestDrop(funnelSteps([100, 80, 40, 30, 10, 5]))?.id).toBe("regular");
    expect(biggestDrop(funnelSteps([4, 1, 0, 0, 0, 0]))).toBeNull();
    // A step after an empty one doesn't count as a drop.
    expect(biggestDrop(funnelSteps([10, 10, 0, 0, 0, 0]))?.id).toBe("child");
  });
  it("offers an email group for every step past confirming", () => {
    expect(FUNNEL_STEPS.slice(2).every((s) => s.segment)).toBe(true);
  });
});

describe("saved replies", () => {
  it("accept the defaults", () => {
    expect(repliesProblem(DEFAULT_REPLIES)).toBeNull();
  });
  it("turn down broken lists", () => {
    const ok = { id: "a", title: "A", body: "Body" };
    expect(repliesProblem("x")).toMatch(/list/);
    expect(repliesProblem(Array.from({ length: REPLY_LIMITS.count + 1 }, (_, i) => ({ ...ok, id: `r${i}` })))).toMatch(/Keep it/);
    expect(repliesProblem([ok, ok])).toMatch(/own id/);
    expect(repliesProblem([{ ...ok, id: "Bad Id" }])).toMatch(/own id/);
    expect(repliesProblem([{ ...ok, title: " " }])).toMatch(/title/);
    expect(repliesProblem([{ ...ok, body: "x".repeat(REPLY_LIMITS.body + 1) }])).toMatch(/under/);
  });
  it("fill in the app's name", () => {
    expect(fillReply("Thanks for using {app}!")).toBe(`Thanks for using ${APP_NAME}!`);
  });
});

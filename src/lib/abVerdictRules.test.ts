import { describe, expect, it } from "vitest";
import { chanceBetter, MIN_FAMILIES, normalCdf, verdict, type ResultRow } from "./abVerdict";

// Numbers and edges of the A/B verdict, found by mutation testing (`npm run test:mutation:server`).

const row = (variant: string, families: number, paid: number, active = 0): ResultRow => ({ variant, families, paid, active });

describe("normalCdf and chanceBetter", () => {
  it("follows the normal curve", () => {
    expect(normalCdf(0)).toBeCloseTo(0.5, 4);
    expect(normalCdf(1.96)).toBeCloseTo(0.975, 3);
    expect(normalCdf(-1.96)).toBeCloseTo(0.025, 3);
    expect(normalCdf(1) + normalCdf(-1)).toBeCloseTo(1, 6);
  });

  it("gives the chance rate B is above rate A", () => {
    // 10% against 20% of 100 each: z = 0.1 / 0.05 = 2.
    expect(chanceBetter(100, 10, 100, 20)).toBeCloseTo(0.977, 3);
    expect(chanceBetter(100, 20, 100, 10)).toBeCloseTo(0.023, 3);
    // Unequal sizes use each side's own spread.
    expect(chanceBetter(50, 5, 400, 80)).toBeCloseTo(normalCdf(0.1 / Math.sqrt((0.1 * 0.9) / 50 + (0.2 * 0.8) / 400)), 6);
    expect(chanceBetter(100, 30, 100, 30)).toBeCloseTo(0.5, 4);
  });

  it("handles no spread and no data", () => {
    expect(chanceBetter(10, 0, 10, 0)).toBe(0.5);
    expect(chanceBetter(10, 0, 10, 10)).toBe(1);
    expect(chanceBetter(10, 10, 10, 0)).toBe(0);
    expect(chanceBetter(0, 0, 10, 5)).toBeNull();
    expect(chanceBetter(10, 5, 0, 0)).toBeNull();
  });
});

describe("verdict", () => {
  it("needs a control and one other variant", () => {
    expect(verdict([])).toMatchObject({ leader: null, ready: false, message: "Add a second variant to compare." });
    expect(verdict([row("A", 100, 10)])).toMatchObject({ leader: null, ready: false, message: "Add a second variant to compare." });
  });

  it("waits until every variant has the minimum number of families", () => {
    const early = verdict([row("A", MIN_FAMILIES, 3), row("B", MIN_FAMILIES - 1, 9)]);
    expect(early).toMatchObject({ leader: null, chance: null, ready: false });
    expect(early.message).toContain(`at least ${MIN_FAMILIES} families`);
    expect(early.message).toContain(`B has ${MIN_FAMILIES - 1}`);
    expect(early.message).not.toContain("A has");
    expect(verdict([row("A", MIN_FAMILIES, 3), row("B", MIN_FAMILIES, 9)]).message).not.toContain("Too early");
  });

  it("calls a clear winner, and says how far ahead it is", () => {
    const v = verdict([row("A", 100, 10), row("B", 100, 20)]);
    expect(v.leader).toBe("B");
    expect(v.ready).toBe(true);
    expect(v.chance).toBeCloseTo(0.977, 3);
    expect(v.message).toBe("B is ahead: 20% of families paying against 10%, and 98% likely to really be better.");
  });

  it("is not ready when the lead could be chance", () => {
    const v = verdict([row("A", 100, 10), row("B", 100, 17)]);
    expect(v.leader).toBe("B");
    expect(v.ready).toBe(false);
    expect(v.chance!).toBeLessThan(0.95);
    expect(v.message).toContain("Wait for more families");
    expect(v.message).toContain("17% against 10% paying");
  });

  it("keeps the control when it clearly beats every other variant", () => {
    const v = verdict([row("A", 100, 20), row("B", 100, 10)]);
    expect(v).toMatchObject({ leader: "A", ready: true });
    expect(v.chance).toBeCloseTo(0.977, 3);
    expect(v.message).toContain("A (the control) is ahead");
    expect(v.message).toContain("Keep the control");
  });

  it("calls nothing when the control only edges ahead, or ties", () => {
    for (const rows of [[row("A", 100, 10), row("B", 100, 10)], [row("A", 100, 11), row("B", 100, 10)]]) {
      const v = verdict(rows);
      expect(v).toMatchObject({ leader: null, chance: null, ready: false });
      expect(v.message).toBe("No variant beats the control on families paying yet.");
    }
  });

  it("compares the other variants with each other, and keeps the first of a tie", () => {
    expect(verdict([row("A", 100, 10), row("B", 100, 12), row("C", 100, 25)]).leader).toBe("C");
    expect(verdict([row("A", 100, 10), row("B", 100, 25), row("C", 100, 12)]).leader).toBe("B");
    expect(verdict([row("A", 100, 10), row("B", 100, 25), row("C", 100, 25)]).leader).toBe("B");
  });

  it("can judge on families practising this week instead", () => {
    const v = verdict([row("A", 100, 50, 10), row("B", 100, 5, 20)], "active");
    expect(v.leader).toBe("B");
    expect(v.message).toContain("practising this week");
    expect(v.message).toContain("20% of families");
    expect(verdict([row("A", 100, 50, 10), row("B", 100, 5, 20)]).leader).toBe("A");
  });
});

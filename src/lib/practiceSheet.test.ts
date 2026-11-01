import { beforeAll, describe, expect, it } from "vitest";
import { allUnitRefs, loadGrade, type UnitRef } from "@/content";
import type { Derived, UnitStat } from "./derive";
import { buildPracticeSheet, printable, SHEET_QUESTIONS, SHEET_UNITS, sheetUnits } from "./practiceSheet";

beforeAll(async () => {
  await loadGrade("2", "ca-bc");
  await loadGrade("k", "ca-bc");
});

/** A unit's stats from its first-try results, oldest first. */
const stat = (recent: boolean[], extra: Partial<UnitStat> = {}): UnitStat =>
  ({ attempts: recent.length, recent, mastery: recent.filter(Boolean).length / Math.max(1, recent.length), lastT: 0, challengePassed: false, ...extra }) as UnitStat;
const derived = (units: Record<string, UnitStat>) => ({ units }) as unknown as Derived;
const times = (n: number, v: boolean) => Array.from({ length: n }, () => v);

let refs: UnitRef[];
const key = (subject: string, id: string) => `2/${subject}/${id}`;
beforeAll(() => {
  refs = allUnitRefs("2", "ca-bc");
});

describe("sheetUnits", () => {
  it("puts tricky units first, then other started units below the top level, lowest accuracy first", () => {
    const d = derived({
      [key("math", "tens-and-ones")]: stat([...times(6, true), ...times(4, false)]), // 60%: Developing, not tricky
      [key("math", "coins")]: stat([true, false, false, false, false]), // 20%: Emerging, tricky
      [key("math", "patterns")]: stat([false, true]), // two tries: not enough to call tricky
      [key("math", "shapes")]: stat(times(20, true), { challengePassed: true }), // Extending: left out
      [key("math", "graphs")]: stat([true, true, false, false, false, false]), // 33%: tricky
    });
    expect(sheetUnits(refs, d).map((r) => r.key)).toEqual([key("math", "coins"), key("math", "graphs"), key("math", "tens-and-ones"), key("math", "patterns")]);
  });

  it("is empty before any practice and keeps to the limit", () => {
    expect(sheetUnits(refs, derived({}))).toEqual([]);
    const all = Object.fromEntries(refs.map((r) => [r.key, stat([false, false, false, true])]));
    expect(sheetUnits(refs, derived(all))).toHaveLength(SHEET_UNITS);
  });
});

describe("buildPracticeSheet", () => {
  let d: Derived;
  beforeAll(() => {
    d = derived({
      [key("math", "coins")]: stat([true, false, false, false, false]),
      [key("math", "tens-and-ones")]: stat([true, false, true, false, false]),
      [refs.find((r) => r.course.subject === "science")!.key]: stat([false, false, false, true]),
    });
  });

  it("asks printable questions from the tricky units, each with an answer, and the same seed gives the same sheet", () => {
    const a = buildPracticeSheet({ refs, derived: d, grade: "2", seed: "kid:2026-11-01:0" });
    expect(a.items).toHaveLength(SHEET_QUESTIONS.other);
    expect(a.items.every((i) => printable(i.question))).toBe(true);
    expect(new Set(a.items.map((i) => i.unitKey))).toEqual(new Set(Object.keys(d.units).filter((k) => a.units.some((u) => u.key === k))));
    // The trickiest unit leads.
    expect(a.items[0].unitKey).toBe(key("math", "coins"));
    expect(new Set(a.items.map((i) => i.question.prompt + i.unitKey)).size).toBe(a.items.length);
    const again = buildPracticeSheet({ refs, derived: d, grade: "2", seed: "kid:2026-11-01:0" });
    expect(again.items.map((i) => i.question.prompt)).toEqual(a.items.map((i) => i.question.prompt));
    const fresh = buildPracticeSheet({ refs, derived: d, grade: "2", seed: "kid:2026-11-01:1" });
    expect(fresh.items.map((i) => i.question.prompt)).not.toEqual(a.items.map((i) => i.question.prompt));
  });

  it("leaves out subjects switched off", () => {
    const sheet = buildPracticeSheet({ refs, derived: d, grade: "2", seed: "s", subjects: ["math", "language"] });
    expect(sheet.items.length).toBeGreaterThan(0);
    expect(sheet.items.every((i) => i.subject === "math")).toBe(true);
  });

  it("is shorter for little kids", () => {
    const kRefs = allUnitRefs("k", "ca-bc").filter((r) => r.course.subject === "math");
    const kd = derived(Object.fromEntries(kRefs.slice(0, 3).map((r) => [r.key, stat([false, false, false, true])])));
    const sheet = buildPracticeSheet({ refs: kRefs, derived: kd, grade: "k", seed: "s" });
    expect(sheet.items.length).toBeLessThanOrEqual(SHEET_QUESTIONS.little);
    expect(sheet.items.length).toBeGreaterThan(0);
  });

  it("has nothing to print before any practice", () => {
    expect(buildPracticeSheet({ refs, derived: derived({}), grade: "2", seed: "s" }).items).toEqual([]);
  });
});

describe("a story unit on paper", () => {
  it("prints each passage once", () => {
    const story = allUnitRefs("2", "ca-bc").filter((r) => r.course.subject === "language");
    const d = derived(Object.fromEntries(story.map((r) => [r.key, stat([false, false, false, true])])));
    for (const seed of ["a", "b", "c"]) {
      const visuals = buildPracticeSheet({ refs: story, derived: d, grade: "2", seed }).items.flatMap((i) => (i.question.visual ? [JSON.stringify(i.question.visual)] : []));
      expect(new Set(visuals).size).toBe(visuals.length);
    }
  });
});

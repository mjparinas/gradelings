import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { ageBandFor } from "../subjects";
import { FRAMEWORKS } from "../frameworks";
import { canadianWords } from "../locale";
import type { FrameworkContract } from "../contract";
import type { FrameworkManifest } from "../manifest";

const manifests = import.meta.glob<{ manifest: FrameworkManifest }>("../*/manifest.ts", { eager: true });
const contracts = import.meta.glob<{ contract: FrameworkContract }>("../*/contract.ts", { eager: true });

// Lessons are attached per grade by unit id. These checks keep them honest: every lesson belongs to a
// real unit and is short enough to read. Units two provinces share carry the same lesson in both.

const withLesson = COURSES.flatMap((c) => c.units.filter((u) => u.lesson).map((u) => ({ c, u })));

describe("unit lessons", () => {
  it("covers every grade", () => {
    const grades = new Set(withLesson.map(({ c }) => c.grade));
    expect([...grades].sort()).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "k"].sort());
  });

  it("is short, clear and complete", () => {
    for (const { c, u } of withLesson) {
      const l = u.lesson!;
      const name = `${c.grade}/${c.subject}/${u.id}`;
      expect(l.steps.length, name).toBeGreaterThanOrEqual(2);
      expect(l.steps.length, name).toBeLessThanOrEqual(4);
      const little = ageBandFor(c.grade) === "little";
      for (const step of l.steps) {
        expect(step.trim(), name).toBe(step);
        expect(step.length, `${name}: ${step}`).toBeLessThanOrEqual(little ? 80 : 160);
      }
      expect(l.example.question.length, name).toBeLessThanOrEqual(little ? 80 : 140);
      expect(l.example.work.length, name).toBeGreaterThanOrEqual(1);
      expect(l.example.work.length, name).toBeLessThanOrEqual(4);
      expect(l.example.answer.length, name).toBeGreaterThan(0);
      // Canadian spelling (whole words, so Colorado and literary are fine).
      expect(JSON.stringify(l), name).not.toMatch(/\b(colors?|colored|colorful|centers?|centered|meters?|liters?|favorites?|practice[sd]?(?= (a|the|it)))\b/i);
    }
  });

  it("is written for the shared math units first", () => {
    const sharedMath = COURSES.filter((c) => c.subject === "math").flatMap((c) => c.units.filter((u) => FRAMEWORKS.every((f) => u.standards[f.id])));
    const covered = sharedMath.filter((u) => u.lesson).length;
    expect(covered).toBe(sharedMath.length);
  });

  it("covers every math unit in Grades 5 to 9, in every framework", () => {
    const missing = COURSES.filter((c) => c.subject === "math" && ["5", "6", "7", "8", "9"].includes(c.grade))
      .flatMap((c) => c.units.filter((u) => !u.lesson).map((u) => `${c.grade}/${u.id}`));
    expect([...new Set(missing)]).toEqual([]);
  });

  it("covers every math unit in Kindergarten and Grades 1 to 4, in every framework", () => {
    const missing = COURSES.filter((c) => c.subject === "math" && ["k", "1", "2", "3", "4"].includes(c.grade))
      .flatMap((c) => c.units.filter((u) => !u.lesson).map((u) => `${c.grade}/${u.id}`));
    expect([...new Set(missing)]).toEqual([]);
  });

  it("covers every unit in every subject, in every framework", () => {
    const missing = COURSES.flatMap((c) => c.units.filter((u) => !u.lesson).map((u) => `${c.grade}/${c.subject}/${u.id}`));
    expect([...new Set(missing)]).toEqual([]);
  });

  it("never mentions Canada in a lesson a US family sees", () => {
    const us = new Set<string>(FRAMEWORKS.filter((f) => f.country === "US").map((f) => f.id));
    // Units written for a US state may use words that are also Canadian (treaty, Great Lakes).
    const usOwn = Object.entries(manifests)
      .filter(([, m]) => us.has(m.manifest.id))
      .map(([path]) => contracts[path.replace(/manifest\.ts$/, "contract.ts")]?.contract.ownPrefix)
      .filter(Boolean) as string[];
    const hits = withLesson
      .filter(({ u }) => Object.keys(u.standards).some((f) => us.has(f)) && !usOwn.some((p) => u.id.startsWith(p)))
      .flatMap(({ c, u }) => canadianWords(JSON.stringify(u.lesson)).map((w) => `${c.grade}/${c.subject}/${u.id}: ${w}`));
    expect([...new Set(hits)]).toEqual([]);
  });
});

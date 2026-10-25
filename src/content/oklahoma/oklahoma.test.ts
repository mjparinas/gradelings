import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Oklahoma's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Oklahoma's alone.

/** Every Oklahoma unit with its course. */
const oklahoma = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ok"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof oklahoma)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Oklahoma", () => {
  it("is a US framework in US English, offered to families", () => {
    const ok = getFramework("oklahoma");
    expect(ok.id).toBe("us-ok");
    expect(ok.country).toBe("US");
    expect(localeOf(ok)).toBe("en-US");
    expect(ok.subjects).toEqual(["math", "language", "science", "social"]);
    expect(ok.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(ok);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ok);
  });

  it("never shows Oklahoma families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Oklahoma's own units (ok-) may name other
    // places where Oklahoma's story calls for it (its neighbor states, California for the Dust Bowl migrants), the
    // United States geography and history grades (4, 5, 8 and 9) name states where the history does, and the
    // states-and-capitals unit names every state.
    const EXEMPT = new Set(["or-g5-states-capitals", "wa-g5-us-geography"]);
    const history = (grade: string, subject: string) => subject === "social" && ["4", "5", "8", "9"].includes(grade);
    for (const { u, key } of oklahoma.filter(({ c, u }) => !u.id.startsWith("ok-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Oklahoma's own units about its Tribal nations are written for Oklahoma. Treaties alone aren't a sign (adopted
    // civics units ask about the Treaty of Paris), and neither is "Native nations" in a general unit about North America.
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    const borrowed = oklahoma.filter(({ u }) => /^[a-z]{2}-/.test(u.id) && !u.id.startsWith("ok-") && !u.standards["ca-bc"]);
    for (const { u, key } of borrowed.filter(({ u }) => /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa|ga|oh|nj|in|va|mo|nc|ma|md|sc|wi|tn|mi)-/.test(u.id))) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Oklahoma studies in its own units, which carry only Oklahoma standards", () => {
    const own = oklahoma.filter(({ u }) => u.id.startsWith("ok-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["ok-g3-symbols", "ok-g3-first-peoples", "ok-g3-growth", "ok-g9-statehood", "ok-g9-oklahoma-government", "ok-g9-modern-oklahoma"]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Oklahoma standards`).toEqual(["us-ok"]);
      expect(u.lesson, `${key} has a lesson`).toBeDefined();
    }
  });

  it("follows Oklahoma's social studies themes, grade by grade", () => {
    const social = (grade: string) => oklahoma.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3").filter((id) => id.startsWith("ok-")).length).toBeGreaterThanOrEqual(6);
    expect(social("4")).toEqual(expect.arrayContaining(["wa-g5-us-geography", "ca-g5-explorers"]));
    expect(social("5")).toEqual(expect.arrayContaining(["ca-g5-thirteen-colonies", "ca-g5-constitution"]));
    expect(social("6")).toEqual(expect.arrayContaining(["ny-g5-hemisphere-geography", "ok-g6-world-maps"]));
    expect(social("7")).toEqual(expect.arrayContaining(["ny-g6-eastern-hemisphere", "ga-g7-africa"]));
    expect(social("8")).toEqual(expect.arrayContaining(["ca-g8-civil-war", "or-g8-reconstruction"]));
    expect(social("9")).toEqual(expect.arrayContaining(["ok-g9-statehood", "ca-g9-three-branches", "ok-g9-elections"]));
  });

  it("cites Pre-Algebra in 8th grade math and Algebra 1 in 9th", () => {
    const codes = (grade: string) => oklahoma.filter(({ c }) => c.grade === grade && c.subject === "math").map(({ u }) => u.standards["us-ok"]!);
    for (const s of codes("8")) expect(s, s).toMatch(/^PA\./);
    for (const s of codes("9")) expect(s, s).toMatch(/^A1\./);
  });
});

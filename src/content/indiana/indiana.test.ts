import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Indiana's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Indiana's alone.

/** Every Indiana unit with its course. */
const indiana = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-in"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof indiana)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Indiana", () => {
  it("is a US framework in US English, offered to families", () => {
    const fw = getFramework("indiana");
    expect(fw.id).toBe("us-in");
    expect(fw.country).toBe("US");
    expect(localeOf(fw)).toBe("en-US");
    expect(fw.subjects).toEqual(["math", "language", "science", "social"]);
    expect(fw.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(fw);
    expect(UPCOMING_FRAMEWORKS).not.toContain(fw);
  });

  it("never shows Indiana families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Indiana's own units (in-) may name other
    // places where Indiana's story calls for it (its neighbors Michigan, Ohio, Kentucky and Illinois), United States
    // history and civics (Grades 5, 6, 8 and 9) name states where the history does (the thirteen colonies, Spanish
    // Florida, the Montgomery bus boycott), and so does the Grade 9 rhetoric unit's "Letter from Birmingham Jail". The
    // 50 states and capitals unit names every state on purpose.
    const EXEMPT = new Set(["or-g5-states-capitals", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["5", "6", "8", "9"].includes(grade);
    for (const { u, key } of indiana.filter(({ c, u }) => !u.id.startsWith("in-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Indiana's own units about the Native nations of Indiana are written for Indiana. Treaties alone aren't a sign
    // (adopted civics units ask about the Treaty of Paris), and neither is "Native Americans" in a general US history
    // unit such as the explorers or westward expansion.
    const words = /(Tribes?|Tribal)|California Indian|Wabanaki/;
    for (const { u, key } of indiana.filter(({ u }) => /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa|ga)-/.test(u.id))) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Indiana studies in its own units, which carry only Indiana standards", () => {
    const own = indiana.filter(({ u }) => u.id.startsWith("in-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["in-g2-pledge-harrison", "in-g4-first-peoples", "in-g4-governing-indiana", "in-g6-indiana-constitution", "in-g9-governing-indiana"]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Indiana standards`).toEqual(["us-in"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches Indiana studies in 4th grade, the Indiana Constitution in 6th grade and Indiana government in 9th grade", () => {
    const social = (grade: string) => indiana.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("4").filter((id) => id.startsWith("in-")).length).toBeGreaterThanOrEqual(6);
    expect(social("6")).toContain("in-g6-indiana-constitution");
    expect(social("2")).toContain("in-g2-pledge-harrison");
    expect(social("9")).toEqual(expect.arrayContaining(["in-g9-governing-indiana", "in-g9-economics"]));
  });
});

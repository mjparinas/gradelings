import { describe, expect, it } from "vitest";
import { adoptersOf } from "../adopters";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Colorado's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Colorado's alone.

/** Every Colorado unit with its course. */
const colorado = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-co"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof colorado)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Colorado", () => {
  it("is a US framework in US English, offered to families", () => {
    const co = getFramework("colorado");
    expect(co.id).toBe("us-co");
    expect(co.country).toBe("US");
    expect(localeOf(co)).toBe("en-US");
    expect(co.subjects).toEqual(["math", "language", "science", "social"]);
    expect(co.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(co);
    expect(UPCOMING_FRAMEWORKS).not.toContain(co);
  });

  it("never shows Colorado families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Colorado's own units (co-) may name other
    // places where Colorado's story calls for it (the Four Corners, the Grand Canyon), United States history and civics
    // (Grades 5, 8 and 9) name states where the history does (Spanish Florida, the Alaska Purchase, the Montgomery bus
    // boycott), and so does the Grade 9 rhetoric unit's "Letter from Birmingham Jail". The 50 states and capitals unit
    // names every state on purpose.
    const EXEMPT = new Set(["or-g5-states-capitals", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["5", "8", "9"].includes(grade);
    for (const { u, key } of colorado.filter(({ c, u }) => !u.id.startsWith("co-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal units", () => {
    // Colorado's own units about the Native nations of Colorado are written for Colorado. Other states' units about
    // their Tribes, treaties or California Indian nations stay theirs.
    const words = /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i;
    for (const { u, key } of colorado.filter(({ u }) => /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl)-/.test(u.id))) {
      const about = [u.id, u.title, u.blurb, u.parentNote ?? ""].join(" ");
      expect(words.test(about) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Colorado studies in its own units, which carry only Colorado standards", () => {
    const own = colorado.filter(({ u }) => u.id.startsWith("co-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["co-g1-colorado-symbols", "co-g4-first-peoples", "co-g4-governing-colorado", "co-g8-westward", "co-g9-governing-colorado"]),
    );
    for (const { u, key } of own) {
      // Frameworks that copy Colorado's units (their contract's adoptsFrom) add their own standards to them.
      expect(Object.keys(u.standards).filter((f) => !adoptersOf("us-co").includes(f)), `${key} carries only Colorado standards`).toEqual(["us-co"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches Colorado history in 4th grade, the Western and Eastern Hemispheres in 6th and 7th, and civics in 9th", () => {
    const social = (grade: string) => colorado.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("4").filter((id) => id.startsWith("co-")).length).toBeGreaterThanOrEqual(6);
    expect(social("6")).toEqual(expect.arrayContaining(["co-g6-americas-geography", "ca-g7-aztec-inca"]));
    expect(social("7")).toEqual(expect.arrayContaining(["ny-g6-eastern-hemisphere", "world-beliefs", "co-g7-japan"]));
    expect(social("8")).toEqual(expect.arrayContaining(["co-g8-westward", "co-g8-rights-citizenship"]));
    expect(social("9")).toEqual(expect.arrayContaining(["co-g9-governing-colorado", "co-g9-us-government"]));
  });
});

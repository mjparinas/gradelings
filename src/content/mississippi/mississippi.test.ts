import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Mississippi's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Mississippi's alone.

/** Every Mississippi unit with its course. */
const mississippi = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ms"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof mississippi)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Mississippi", () => {
  it("is a US framework in US English, offered to families", () => {
    const ms = getFramework("mississippi");
    expect(ms.id).toBe("us-ms");
    expect(ms.country).toBe("US");
    expect(localeOf(ms)).toBe("en-US");
    expect(ms.subjects).toEqual(["math", "language", "science", "social"]);
    expect(ms.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(ms);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ms);
  });

  it("never shows Mississippi families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Mississippi's own units (ms-) may name other
    // places where Mississippi's story calls for it (its neighbor states, the Great Migration north), and the United
    // States and world history grades (4 to 8) name states where the history does. The national symbols unit names
    // national landmarks, the heroes unit tells Sacagawea's story, the leaders unit tells Ruby Bridges's story in New
    // Orleans, the Constitution unit names Philadelphia, the erosion unit names the Grand Canyon, and the rhetoric unit
    // quotes Dr. King's letter from Birmingham.
    const EXEMPT = new Set(["ca-g1-american-symbols", "ga-g1-american-heroes", "ca-g2-citizens-and-leaders", "ca-g5-constitution", "or-g4-rocks-erosion", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["4", "5", "6", "7", "8"].includes(grade);
    for (const { u, key } of mississippi.filter(({ c, u }) => !u.id.startsWith("ms-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Mississippi's own units about the Choctaw, Chickasaw and Natchez nations are written for Mississippi. Treaties alone
    // aren't a sign (adopted history units ask about the Treaty of Paris).
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of mississippi.filter(({ u }) => /^[a-z]{2}-/.test(u.id) && !u.id.startsWith("ms-") && !u.standards["ca-bc"])) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Mississippi studies in its own units, which carry only Mississippi standards", () => {
    const own = mississippi.filter(({ u }) => u.id.startsWith("ms-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["ms-k-symbols", "ms-g3-government", "ms-g4-regions", "ms-g4-beginnings", "ms-g4-civil-rights", "ms-g9-civil-rights", "ms-g9-modern"]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Mississippi standards`).toEqual(["us-ms"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches local government in 3rd grade, Mississippi Studies in 4th and again in 9th", () => {
    const social = (grade: string) => mississippi.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3")).toContain("ms-g3-government");
    expect(social("4").filter((id) => id.startsWith("ms-")).length).toBeGreaterThanOrEqual(6);
    expect(social("9").filter((id) => id.startsWith("ms-")).length).toBeGreaterThanOrEqual(4);
  });
});

import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Hawaiʻi's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Hawaiʻi's alone.

/** Every Hawaiʻi unit with its course. */
const hawaii = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-hi"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof hawaii)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Hawaiʻi", () => {
  it("is a US framework in US English, offered to families", () => {
    const hi = getFramework("hawaii");
    expect(hi.id).toBe("us-hi");
    expect(hi.country).toBe("US");
    expect(localeOf(hi)).toBe("en-US");
    expect(hi.subjects).toEqual(["math", "language", "science", "social"]);
    expect(hi.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(hi);
    expect(UPCOMING_FRAMEWORKS).not.toContain(hi);
  });

  it("never shows Hawaiʻi families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Hawaiʻi's own units (hi-) may name other
    // places where Hawaiʻi's story calls for it, and the United States history and civics grades (5, 8 and 9) name
    // states where the history does. The national symbols unit names national landmarks, and the rhetoric unit quotes
    // Dr. King's letter from Birmingham. The 2nd grade leaders unit tells Ruby Bridges's story in New Orleans.
    const EXEMPT = new Set(["ny-g1-american-symbols", "ca-g2-citizens-and-leaders", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["5", "8", "9"].includes(grade);
    for (const { u, key } of hawaii.filter(({ c, u }) => !u.id.startsWith("hi-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Hawaiʻi's own units about Native Hawaiians and the Nations of early North America are written for Hawaiʻi.
    // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris).
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of hawaii.filter(({ u }) => /^[a-z]{2}-/.test(u.id) && !u.id.startsWith("hi-") && !u.standards["ca-bc"])) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Hawaiʻi studies in its own units, which carry only Hawaiʻi standards", () => {
    const own = hawaii.filter(({ u }) => u.id.startsWith("hi-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "hi-k-island-home",
        "hi-g1-island-community",
        "hi-g3-coming-to-hawaii",
        "hi-g4-voyaging",
        "hi-g4-ahupuaa",
        "hi-g7-overthrow",
        "hi-g7-pacific-peoples",
        "hi-g9-annexation",
        "hi-g9-modern-hawaii",
      ]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Hawaiʻi standards`).toEqual(["us-hi"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches Hawaiʻi studies in 4th and 7th grade and modern Hawaiʻi in 9th", () => {
    const social = (grade: string) => hawaii.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3")).toContain("hi-g3-coming-to-hawaii");
    expect(social("4").filter((id) => id.startsWith("hi-")).length).toBeGreaterThanOrEqual(6);
    expect(social("7").filter((id) => id.startsWith("hi-")).length).toBeGreaterThanOrEqual(6);
    expect(social("9")).toEqual(expect.arrayContaining(["hi-g9-annexation", "hi-g9-modern-hawaii", "hi-g9-us-government"]));
  });

  it("writes Hawaiian words with the ʻokina, never an apostrophe", () => {
    for (const { u, key } of hawaii.filter(({ u }) => u.id.startsWith("hi-"))) {
      const hit = linesOf(u).find((line) => /Hawai'i|Hawaii\b(?! State)/.test(line));
      expect(hit ?? "", `${key} spells Hawaiʻi without the ʻokina`).toBe("");
    }
  });
});

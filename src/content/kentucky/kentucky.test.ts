import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Kentucky's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Kentucky's alone.

/** Every Kentucky unit with its course. */
const kentucky = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ky"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof kentucky)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Kentucky", () => {
  it("is a US framework in US English, offered to families", () => {
    const ky = getFramework("kentucky");
    expect(ky.id).toBe("us-ky");
    expect(ky.country).toBe("US");
    expect(localeOf(ky)).toBe("en-US");
    expect(ky.subjects).toEqual(["math", "language", "science", "social"]);
    expect(ky.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(ky);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ky);
  });

  it("never shows Kentucky families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Kentucky's own units (ky-) may name other
    // places where Kentucky's story calls for it (Virginia, its neighbors across the Ohio River, the Tennessee River),
    // and the United States history and civics grades (4, 5, 8 and 9) name states where the history does.
    const EXEMPT = new Set(["ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["4", "5", "8", "9"].includes(grade);
    for (const { u, key } of kentucky.filter(({ c, u }) => !u.id.startsWith("ky-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris), and neither is "Native
    // nations" in a general unit about European explorers.
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of kentucky.filter(({ u }) => /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa|ga|oh|mi|tn|in|nj|ma|md|va|wi|mo|nc|sc)-/.test(u.id))) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Kentucky studies in its own units, which carry only Kentucky standards", () => {
    const own = kentucky.filter(({ u }) => u.id.startsWith("ky-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "ky-k-symbols",
        "ky-g1-kentucky-government",
        "ky-g2-kentucky-laws",
        "ky-g3-kentucky-and-the-world",
        "ky-g4-colonial-kentucky",
        "ky-g5-kentucky-settlers",
        "ky-g8-kentucky-and-the-nation",
        "ky-g9-governing-kentucky",
      ]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Kentucky standards`).toEqual(["us-ky"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("follows Kentucky's social studies themes: colonies in 4th, the Constitution in 5th, the ancient world in 6th, 1600 to 1877 in 8th and civics in 9th", () => {
    const social = (grade: string) => kentucky.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("4")).toEqual(expect.arrayContaining(["wa-g5-thirteen-colonies", "ky-g4-colonial-kentucky", "ky-g4-colonial-government"]));
    expect(social("5")).toEqual(expect.arrayContaining(["ca-g5-revolution", "ca-g5-constitution", "ky-g5-citizenship"]));
    expect(social("6")).toEqual(expect.arrayContaining(["ca-g6-greece-rome", "ky-g6-greece-rome-kentucky"]));
    expect(social("8")).toContain("ky-g8-kentucky-and-the-nation");
    expect(social("9")).toEqual(expect.arrayContaining(["ca-g9-three-branches", "ky-g9-governing-kentucky", "ky-g9-personal-finance"]));
  });

  it("places middle school science where Kentucky does", () => {
    const science = (grade: string) => kentucky.filter(({ c }) => c.grade === grade && c.subject === "science").map(({ u }) => u.id);
    expect(science("6")).toEqual(expect.arrayContaining(["ky-g6-weather", "ky-g6-earth-surface", "ky-g6-space"]));
    expect(science("8")).toEqual(expect.arrayContaining(["ky-g8-growth", "ky-g8-earth-history", "ky-g8-biodiversity"]));
  });
});

import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// New Mexico's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is New Mexico's alone.

/** Every New Mexico unit with its course. */
const newMexico = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-nm"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof newMexico)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("New Mexico", () => {
  it("is a US framework in US English, offered to families", () => {
    const nm = getFramework("new-mexico");
    expect(nm.id).toBe("us-nm");
    expect(nm.country).toBe("US");
    expect(localeOf(nm)).toBe("en-US");
    expect(nm.subjects).toEqual(["math", "language", "science", "social"]);
    expect(nm.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(nm);
    expect(UPCOMING_FRAMEWORKS).not.toContain(nm);
  });

  it("never shows New Mexico families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. New Mexico's own units (nm-) may name other
    // places where New Mexico's story calls for it (its neighbor states, Texas in its history, the trails west), and the
    // United States history and civics grades (5, 8 and 9) name states where the history does. The national symbols unit
    // names national landmarks, and the rhetoric unit quotes Dr. King's letter from Birmingham. The 2nd grade leaders unit
    // tells Ruby Bridges's story in New Orleans, which New Mexico's national identity standard (2.9) calls for.
    const EXEMPT = new Set(["ny-g1-american-symbols", "ca-g2-citizens-and-leaders", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["5", "8", "9"].includes(grade);
    for (const { u, key } of newMexico.filter(({ c, u }) => !u.id.startsWith("nm-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // New Mexico's own units about the Pueblos, the Diné and Apache peoples and New Mexico's Tribes are written for New
    // Mexico.
    // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris).
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of newMexico.filter(({ u }) => /^[a-z]{2}-/.test(u.id) && !u.id.startsWith("nm-") && !u.standards["ca-bc"])) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches New Mexico studies in its own units, which carry only New Mexico standards", () => {
    const own = newMexico.filter(({ u }) => u.id.startsWith("nm-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "nm-k-flag-and-state",
        "nm-g1-then-and-now",
        "nm-g3-people-on-the-move",
        "nm-g4-first-peoples",
        "nm-g4-land-of-enchantment",
        "nm-g7-spanish-colonial",
        "nm-g8-new-mexico-and-the-nation",
        "nm-g9-governing-new-mexico",
      ]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only New Mexico standards`).toEqual(["us-nm"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches migration in 3rd grade, New Mexico history in 4th and 7th and civics in 9th", () => {
    const social = (grade: string) => newMexico.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3")).toContain("nm-g3-people-on-the-move");
    expect(social("4").filter((id) => id.startsWith("nm-")).length).toBeGreaterThanOrEqual(6);
    expect(social("7").filter((id) => id.startsWith("nm-")).length).toBeGreaterThanOrEqual(6);
    expect(social("8")).toContain("nm-g8-new-mexico-and-the-nation");
    expect(social("9")).toEqual(expect.arrayContaining(["nm-g9-governing-new-mexico", "nm-g9-us-government", "nm-g9-personal-finance"]));
  });

  it("cites New Mexico's own science expectations where it teaches them", () => {
    const cites = (code: string) => newMexico.some(({ u }) => (u.standards["us-nm"] ?? "").includes(code));
    expect(cites("MS-ESS3-3 NM")).toBe(true);
    expect(cites("HS-LS2-7 NM")).toBe(true);
  });
});

import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Rhode Island's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Rhode Island's alone.

/** Every Rhode Island unit with its course. */
const rhodeIsland = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ri"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof rhodeIsland)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Rhode Island", () => {
  it("is a US framework in US English, offered to families", () => {
    const ri = getFramework("rhode-island");
    expect(ri.id).toBe("us-ri");
    expect(ri.country).toBe("US");
    expect(localeOf(ri)).toBe("en-US");
    expect(ri.subjects).toEqual(["math", "language", "science", "social"]);
    expect(ri.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(ri);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ri);
  });

  it("never shows Rhode Island families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Rhode Island's own units (ri-) may name other
    // places where Rhode Island's story calls for it (Massachusetts Bay and Plymouth in its founding, the other New
    // England states), the 3rd grade regions of the United States name the states, and the United States history and
    // civics grades (5, 8 and 9) name states where the history does. The 2nd grade leaders unit tells Ruby Bridges's
    // story in New Orleans, the rhetoric unit quotes Dr. King's letter from Birmingham, and the Cold War unit asks about
    // missiles in Cuba within reach of Florida.
    const EXEMPT = new Set(["ca-g2-citizens-and-leaders", "ca-g9-rhetoric-and-sources", "az-g7-cold-war"]);
    const history = (grade: string, subject: string) => subject === "social" && ["3", "5", "8", "9"].includes(grade);
    for (const { u, key } of rhodeIsland.filter(({ c, u }) => !u.id.startsWith("ri-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Rhode Island's own units about the Narragansett and the other Native peoples of Rhode Island are written for
    // Rhode Island. Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris).
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of rhodeIsland.filter(({ u }) => /^[a-z]{2}-/.test(u.id) && !u.id.startsWith("ri-") && !u.standards["ca-bc"])) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Rhode Island studies in its own units, which carry only Rhode Island standards", () => {
    const own = rhodeIsland.filter(({ u }) => u.id.startsWith("ri-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "ri-k-flag-and-state",
        "ri-g1-then-and-now",
        "ri-g2-global-rhode-island",
        "ri-g3-northeast",
        "ri-g4-founding",
        "ri-g4-first-peoples",
        "ri-g8-governing-rhode-island",
        "ri-g9-voting-rights",
      ]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Rhode Island standards`).toEqual(["us-ri"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("follows the grade themes: the Northeast in 3rd grade, Rhode Island in 4th, government in 8th and civics in 9th", () => {
    const social = (grade: string) => rhodeIsland.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3")).toEqual(expect.arrayContaining(["ri-g3-northeast", "fl-g3-us-regions"]));
    expect(social("4").filter((id) => id.startsWith("ri-")).length).toBeGreaterThanOrEqual(8);
    expect(social("8")).toEqual(expect.arrayContaining(["ri-g8-governing-rhode-island", "ca-g9-three-branches"]));
    expect(social("9")).toEqual(expect.arrayContaining(["ri-g9-voting-rights", "ri-g9-us-government", "ca-g9-elections"]));
  });

  it("cites the Rhode Island Social Studies Standards by their own codes", () => {
    // Pre-K cites the Rhode Island Early Learning and Development Standards instead (checked by the contract).
    const social = rhodeIsland.filter(({ c }) => c.subject === "social" && c.grade !== "pk");
    for (const { c, u, key } of social) {
      const code = c.grade === "9" ? /^SSHS\.CVC\.\d/ : c.grade === "k" ? /^SSK\.\d/ : new RegExp(`^SS${c.grade}\\.\\d`);
      expect(u.standards["us-ri"], key).toMatch(code);
    }
  });
});

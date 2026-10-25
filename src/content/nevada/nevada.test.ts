import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Nevada's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Nevada's alone.

/** Every Nevada unit with its course. */
const nevada = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-nv"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof nevada)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Nevada", () => {
  it("is a US framework in US English, offered to families", () => {
    const nv = getFramework("nevada");
    expect(nv.id).toBe("us-nv");
    expect(nv.country).toBe("US");
    expect(localeOf(nv)).toBe("en-US");
    expect(nv.subjects).toEqual(["math", "language", "science", "social"]);
    expect(nv.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(nv);
    expect(UPCOMING_FRAMEWORKS).not.toContain(nv);
  });

  it("never shows Nevada families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Nevada's own units (nv-) may name other places
    // where Nevada's story calls for it (its neighbor states, the trails west), and the United States history and civics
    // grades (5, 8 and 9) name states where the history does. The national symbols unit names national landmarks, and
    // the rhetoric unit quotes Dr. King's letter from Birmingham. The 2nd grade leaders unit tells Ruby Bridges's story
    // in New Orleans, which Nevada's national identity standards (SS.2.9, SS.2.12) call for.
    const EXEMPT = new Set(["ny-g1-american-symbols", "ca-g2-citizens-and-leaders", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["5", "8", "9"].includes(grade);
    for (const { u, key } of nevada.filter(({ c, u }) => !u.id.startsWith("nv-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Nevada's own units about the Paiute, Shoshone and Washoe peoples and Nevada's Tribes are written for Nevada.
    // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris).
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of nevada.filter(({ u }) => /^[a-z]{2}-/.test(u.id) && !u.id.startsWith("nv-") && !u.standards["ca-bc"])) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Nevada studies in its own units, which carry only Nevada standards", () => {
    const own = nevada.filter(({ u }) => u.id.startsWith("nv-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "nv-k-flag-and-state",
        "nv-g3-people-on-the-move",
        "nv-g4-first-peoples",
        "nv-g4-silver-state",
        "nv-g7-nevada-in-the-world",
        "nv-g8-nevada-and-the-nation",
        "nv-g9-governing-nevada",
      ]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Nevada standards`).toEqual(["us-nv"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches migration in 3rd grade, Nevada past and present in 4th and civics in 9th", () => {
    const social = (grade: string) => nevada.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3")).toContain("nv-g3-people-on-the-move");
    expect(social("4").filter((id) => id.startsWith("nv-")).length).toBeGreaterThanOrEqual(6);
    expect(social("8")).toContain("nv-g8-nevada-and-the-nation");
    expect(social("9")).toEqual(expect.arrayContaining(["nv-g9-governing-nevada", "nv-g9-us-government", "nv-g9-personal-finance"]));
  });
});

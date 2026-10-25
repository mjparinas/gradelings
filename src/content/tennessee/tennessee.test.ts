import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Tennessee's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Tennessee's alone.

/** Every Tennessee unit with its course. */
const tennessee = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-tn"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof tennessee)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Tennessee", () => {
  it("is a US framework in US English, offered to families", () => {
    const tn = getFramework("tennessee");
    expect(tn.id).toBe("us-tn");
    expect(tn.country).toBe("US");
    expect(localeOf(tn)).toBe("en-US");
    expect(tn.subjects).toEqual(["math", "language", "science", "social"]);
    expect(tn.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(tn);
    expect(UPCOMING_FRAMEWORKS).not.toContain(tn);
  });

  it("never shows Tennessee families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Tennessee's own units (tn-) may name other
    // places where Tennessee's story calls for it (its eight neighbor states, Texas for Crockett and Houston), and the
    // United States history and civics grades (3, 4, 8 and 9) name states where the history does.
    const EXEMPT = new Set(["or-g5-states-capitals", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["3", "4", "8", "9"].includes(grade);
    for (const { u, key } of tennessee.filter(({ c, u }) => !u.id.startsWith("tn-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Tennessee's own units about the Cherokee, Chickasaw and other nations are written for Tennessee. Treaties alone
    // aren't a sign (adopted civics units ask about the Treaty of Paris), and neither is "Native nations" in a general
    // unit about European explorers.
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of tennessee.filter(({ u }) => /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa|ga|oh)-/.test(u.id))) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Tennessee studies in its own units, which carry only Tennessee standards", () => {
    const own = tennessee.filter(({ u }) => u.id.startsWith("tn-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["tn-k-flags-and-leaders", "tn-g1-tennessee-map", "tn-g2-tennessee-neighbors", "tn-g3-volunteer-state", "tn-g5-statehood", "tn-g8-jacksonian-tennessee", "tn-g9-governing-tennessee"]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Tennessee standards`).toEqual(["us-tn"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches United States history in 3rd and 4th grade, Tennessee history in 5th, the ancient world in 6th and civics in 9th", () => {
    const social = (grade: string) => tennessee.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3")).toEqual(expect.arrayContaining(["wa-g5-thirteen-colonies", "ca-g5-revolution", "tn-g3-volunteer-state"]));
    expect(social("4")).toEqual(expect.arrayContaining(["ca-g8-civil-war", "ny-g8-civil-rights"]));
    expect(social("5").filter((id) => id.startsWith("tn-")).length).toBeGreaterThanOrEqual(8);
    expect(social("6")).toEqual(expect.arrayContaining(["wa-g6-mesopotamia-egypt", "ca-g6-greece-rome"]));
    expect(social("9")).toEqual(expect.arrayContaining(["ca-g9-three-branches", "tn-g9-governing-tennessee", "or-g9-supply-demand"]));
  });
});

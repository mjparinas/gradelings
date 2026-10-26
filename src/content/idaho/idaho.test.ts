import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Idaho's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Idaho's alone.

/** Every Idaho unit with its course. */
const idaho = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-id"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof idaho)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Idaho", () => {
  it("is a US framework in US English, offered to families", () => {
    const id = getFramework("idaho");
    expect(id.id).toBe("us-id");
    expect(id.country).toBe("US");
    expect(localeOf(id)).toBe("en-US");
    expect(id.subjects).toEqual(["math", "language", "science", "social"]);
    expect(id.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(id);
    expect(UPCOMING_FRAMEWORKS).not.toContain(id);
  });

  it("never shows Idaho families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Idaho's own units (id-) may name other places
    // where Idaho's story calls for it (its neighbor states and territories), and the United States history and civics
    // grades (5, 8 and 9: the colonies, the Revolution, the Civil War and civics) name states where the history does.
    // The rhetoric unit quotes Dr. King's letter from Birmingham. The 2nd grade citizens unit tells Ruby Bridges's story
    // in New Orleans, which Idaho's standard on people who model good citizenship (2.SS.4.7) calls for.
    const EXEMPT = new Set(["ca-g2-citizens-and-leaders", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["5", "8", "9"].includes(grade);
    for (const { u, key } of idaho.filter(({ c, u }) => !u.id.startsWith("id-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Idaho's own units about the five tribes in Idaho are written for Idaho. Treaties alone aren't a sign (adopted
    // civics units ask about the Treaty of Paris).
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of idaho.filter(({ u }) => /^[a-z]{2}-/.test(u.id) && !u.id.startsWith("id-") && !u.standards["ca-bc"])) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Idaho studies in its own units, which carry only Idaho standards", () => {
    const own = idaho.filter(({ u }) => u.id.startsWith("id-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "id-k-symbols-holidays",
        "id-g1-idaho-places",
        "id-g2-idaho-tribes",
        "id-g3-idaho-home",
        "id-g4-settling-idaho",
        "id-g5-public-lands",
        "id-g7-idaho-in-the-world",
        "id-g8-idaho-territory",
        "id-g9-governing-idaho",
      ]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Idaho standards`).toEqual(["us-id"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches the five tribes in 2nd and 4th grade, Idaho's story in 4th and governing Idaho in 9th", () => {
    const social = (grade: string) => idaho.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("2")).toEqual(expect.arrayContaining(["id-g2-idaho-tribes", "id-g2-idaho-land", "id-g2-who-runs-idaho"]));
    // 4th grade social studies is Idaho history and government, so every unit is Idaho's own.
    expect(social("4").length).toBeGreaterThanOrEqual(5);
    expect(social("4").every((id) => id.startsWith("id-")), social("4").join(", ")).toBe(true);
    expect(social("4")).toEqual(expect.arrayContaining(["id-g4-idaho-tribes", "id-g4-settling-idaho", "id-g4-land-conflicts"]));
    expect(social("8")).toContain("id-g8-idaho-territory");
    expect(social("9")).toEqual(expect.arrayContaining(["id-g9-governing-idaho", "id-g9-us-government", "id-g9-personal-finance"]));
  });

  it("cites Idaho's middle school band in Grades 6 to 8 science and the high school one in Grade 9", () => {
    // Idaho writes one middle school band (MS-LS-2.1), not grade-by-grade standards.
    for (const { c, u, key } of idaho.filter(({ c }) => c.subject === "science" && ["6", "7", "8", "9"].includes(c.grade))) {
      const codes = (u.standards["us-id"] ?? "").split(" · ")[0].split("; ");
      const band = c.grade === "9" ? "HS-" : "MS-";
      for (const code of codes) expect(code.startsWith(band), `${key} cites ${code}`).toBe(true);
    }
  });
});

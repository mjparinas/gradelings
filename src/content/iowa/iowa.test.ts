import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Iowa's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Iowa's alone.

/** Every Iowa unit with its course. */
const iowa = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ia"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof iowa)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Iowa", () => {
  it("is a US framework in US English, offered to families", () => {
    const ia = getFramework("iowa");
    expect(ia.id).toBe("us-ia");
    expect(ia.country).toBe("US");
    expect(localeOf(ia)).toBe("en-US");
    expect(ia.subjects).toEqual(["math", "language", "science", "social"]);
    expect(ia.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(ia);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ia);
  });

  it("never shows Iowa families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Iowa's own units (ia-) may name other places
    // where Iowa's story calls for it (its neighbor states, where settlers came from), and the United States history and
    // civics grades (3, 4, 5, 8 and 9: the colonies, the Revolution, the Civil War and civics) name states where the
    // history does. The rhetoric unit quotes Dr. King's letter from
    // Birmingham. The 2nd grade leaders unit tells Ruby Bridges's story in New Orleans, which Iowa's standards on the
    // contributions of people past and present (SS.2.12) call for.
    const EXEMPT = new Set(["ca-g2-citizens-and-leaders", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["3", "4", "5", "8", "9"].includes(grade);
    for (const { u, key } of iowa.filter(({ c, u }) => !u.id.startsWith("ia-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Iowa's own units about the Meskwaki Nation and the other Native nations of Iowa are written for Iowa.
    // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris).
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of iowa.filter(({ u }) => /^[a-z]{2}-/.test(u.id) && !u.id.startsWith("ia-") && !u.standards["ca-bc"])) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Iowa studies in its own units, which carry only Iowa standards", () => {
    const own = iowa.filter(({ u }) => u.id.startsWith("ia-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "ia-k-rules-here-and-there",
        "ia-g1-iowa-places",
        "ia-g2-native-nations",
        "ia-g2-iowa-unique",
        "ia-g4-settling-iowa",
        "ia-g4-immigrants",
        "ia-g5-iowa-and-change",
        "ia-g7-iowa-in-the-world",
        "ia-g8-iowa-and-the-nation",
        "ia-g9-governing-iowa",
      ]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Iowa standards`).toEqual(["us-ia"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches Iowa as our state in 2nd grade, settling Iowa in 4th and governing Iowa in 9th", () => {
    const social = (grade: string) => iowa.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("2")).toEqual(expect.arrayContaining(["ia-g2-native-nations", "ia-g2-iowa-communities", "ia-g2-iowa-unique"]));
    expect(social("4")).toEqual(expect.arrayContaining(["ia-g4-settling-iowa", "ia-g4-immigrants"]));
    expect(social("8")).toContain("ia-g8-iowa-and-the-nation");
    expect(social("9")).toEqual(expect.arrayContaining(["ia-g9-governing-iowa", "ia-g9-us-government", "ia-g9-personal-finance"]));
  });

  it("places each middle school science unit in the grade its Iowa code names", () => {
    for (const { c, u, key } of iowa.filter(({ c }) => c.subject === "science" && ["6", "7", "8"].includes(c.grade))) {
      const codes = (u.standards["us-ia"] ?? "").split(" · ")[0].split("; ");
      for (const code of codes) expect(code.startsWith(`${c.grade}-`), `${key} cites ${code}`).toBe(true);
    }
  });
});

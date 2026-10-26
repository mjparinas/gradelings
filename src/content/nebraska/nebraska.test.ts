import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Nebraska's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Nebraska's alone.

/** Every Nebraska unit with its course. */
const nebraska = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ne"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof nebraska)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

const idsIn = (grade: string, subject: string) =>
  nebraska.filter(({ c }) => c.grade === grade && c.subject === subject).map(({ u }) => u.id);

const codesOf = (u: (typeof nebraska)[number]["u"]) => u.standards["us-ne"]!.split(" · ")[0].split("; ");

describe("Nebraska", () => {
  it("is a US framework in US English, offered to families", () => {
    const ne = getFramework("nebraska");
    expect(ne.id).toBe("us-ne");
    expect(ne.country).toBe("US");
    expect(localeOf(ne)).toBe("en-US");
    expect(ne.subjects).toEqual(["math", "language", "science", "social"]);
    expect(ne.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(ne);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ne);
  });

  it("never shows Nebraska families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Nebraska's own units (neb-) may name other
    // places where Nebraska's story calls for it (its neighbor states, the trails west, the regions of the U.S.), and the
    // United States history and civics grades (5, 8 and 9) name states where the history does. The national symbols
    // unit names national landmarks, and the rhetoric unit quotes Dr. King's letter from Birmingham. The 2nd grade
    // leaders unit tells Ruby Bridges's story in New Orleans.
    const EXEMPT = new Set(["ny-g1-american-symbols", "ca-g2-citizens-and-leaders", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["5", "8", "9"].includes(grade);
    for (const { u, key } of nebraska.filter(({ c, u }) => !u.id.startsWith("neb-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Nebraska's own units about the Omaha, Ponca, Pawnee and other nations in Nebraska are written for Nebraska.
    // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris).
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of nebraska.filter(({ u }) => /^[a-z]{2}-/.test(u.id) && !u.id.startsWith("neb-") && !u.standards["ca-bc"])) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Nebraska studies in its own units, which carry only Nebraska standards", () => {
    const own = nebraska.filter(({ u }) => u.id.startsWith("neb-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "neb-k-flag-and-state",
        "neb-g3-people-on-the-move",
        "neb-g4-first-peoples",
        "neb-g4-trails-statehood",
        "neb-g4-unicameral",
        "neb-g4-us-regions",
        "neb-g8-nebraska-and-the-nation",
        "neb-g9-governing-nebraska",
      ]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Nebraska standards`).toEqual(["us-ne"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("follows Nebraska's grade themes in social studies", () => {
    // Grade 4 is Nebraska Studies, Grade 7 World Studies II (post-classical societies), Grade 8 U.S. history with
    // Nebraska's part in it, and Grade 9 the high school civics and economics standards.
    expect(idsIn("3", "social")).toContain("neb-g3-people-on-the-move");
    expect(idsIn("4", "social").filter((id) => id.startsWith("neb-")).length).toBeGreaterThanOrEqual(7);
    expect(idsIn("7", "social")).toEqual(expect.arrayContaining(["ca-g7-rome-byzantium", "ca-g7-arabia-islam", "ca-g7-medieval-japan"]));
    expect(idsIn("8", "social")).toContain("neb-g8-nebraska-and-the-nation");
    expect(idsIn("9", "social")).toEqual(expect.arrayContaining(["neb-g9-governing-nebraska", "neb-g9-us-government", "neb-g9-personal-finance"]));
  });

  it("cites each subject's codes for the course's own grade", () => {
    // Grade 9 cites the high school standards, and the Grades 9-10 band of English language arts, which the document
    // codes with a 10.
    const prefix = { math: "MA", language: "LA", science: "SC", social: "SS" } as const;
    for (const { c, u, key } of nebraska) {
      const g = c.grade === "k" ? "K" : c.grade === "9" ? (c.subject === "language" ? "10" : "HS") : c.grade;
      const p = prefix[c.subject as keyof typeof prefix];
      const sep = c.subject === "social" ? " " : ".";
      for (const code of codesOf(u)) expect(code.startsWith(`${p}${sep}${g}.`), `${key} cites ${code}`).toBe(true);
    }
  });

  it("follows Nebraska's own math placement", () => {
    // Nebraska measures angles in 4th grade, and keeps its ratios and proportions strand to 6th and 7th grade.
    expect(idsIn("4", "math")).toContain("ca-g4-measure-angles");
    for (const { u, key } of nebraska.filter(({ c }) => c.subject === "math" && !["6", "7"].includes(c.grade))) {
      expect(codesOf(u).some((code) => /^MA\.\w+\.R\./.test(code)), `${key} cites the ratios strand`).toBe(false);
    }
  });
});

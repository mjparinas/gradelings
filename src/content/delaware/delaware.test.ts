import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Delaware's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Delaware's alone.

/** Every Delaware unit with its course. */
const delaware = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-de"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof delaware)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Delaware", () => {
  it("is a US framework in US English, offered to families", () => {
    const de = getFramework("delaware");
    expect(de.id).toBe("us-de");
    expect(de.country).toBe("US");
    expect(localeOf(de)).toBe("en-US");
    expect(de.subjects).toEqual(["math", "language", "science", "social"]);
    expect(de.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(de);
    expect(UPCOMING_FRAMEWORKS).not.toContain(de);
  });

  it("never shows Delaware families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Delaware's own units (de-) may name other
    // places where Delaware's story calls for it (its neighbor states, Philadelphia, the Chesapeake), and the United States
    // history and civics grades (5, 8 and 9) name states where the history does. The national symbols unit names national
    // landmarks, and the rhetoric unit quotes Dr. King's letter from Birmingham. The 2nd grade leaders unit tells Ruby
    // Bridges's story in New Orleans, which Delaware's standard on people who changed life in the nation calls for.
    const EXEMPT = new Set(["ny-g1-american-symbols", "ca-g2-citizens-and-leaders", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["5", "8", "9"].includes(grade);
    for (const { u, key } of delaware.filter(({ c, u }) => !u.id.startsWith("de-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Delaware's own units about the Lenape, the Nanticoke and the Eastern Woodland are written for Delaware.
    // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris).
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of delaware.filter(({ u }) => /^[a-z]{2}-/.test(u.id) && !u.id.startsWith("de-") && !u.standards["ca-bc"])) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Delaware studies in its own units, which carry only Delaware standards", () => {
    const own = delaware.filter(({ u }) => u.id.startsWith("de-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "de-k-flag-and-state",
        "de-g1-then-and-now",
        "de-g3-regions",
        "de-g4-first-peoples",
        "de-g4-first-state",
        "de-g4-governing-delaware",
        "de-g8-delaware-and-the-nation",
        "de-g9-governing-delaware",
      ]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Delaware standards`).toEqual(["us-de"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches Delaware's regions in 3rd grade, its history in 4th and its government in 9th", () => {
    const social = (grade: string) => delaware.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3")).toEqual(expect.arrayContaining(["de-g3-regions", "de-g3-people-on-the-move"]));
    expect(social("4").filter((id) => id.startsWith("de-")).length).toBeGreaterThanOrEqual(6);
    expect(social("8")).toContain("de-g8-delaware-and-the-nation");
    expect(social("9")).toEqual(expect.arrayContaining(["de-g9-governing-delaware", "de-g9-us-government", "de-g9-personal-finance"]));
  });

  it("cites social studies by the standards' grade cluster", () => {
    // The 2018 standards set benchmarks for K-3, 4-5, 6-8 and 9-12, so a grade cites its own cluster.
    const cluster: Record<string, string> = { k: "K-3", "1": "K-3", "2": "K-3", "3": "K-3", "4": "4-5", "5": "4-5", "6": "6-8", "7": "6-8", "8": "6-8", "9": "9-12" };
    for (const { c, u, key } of delaware.filter(({ c }) => c.subject === "social")) {
      const codes = (u.standards["us-de"] ?? "").split(" · ")[0].split("; ");
      for (const code of codes) {
        const m = /^[CEGH]\.\d\.(K-3|4-5|6-8|9-12)\.[a-z]$/.exec(code);
        expect(m?.[1], `${key} cites ${code}`).toBe(cluster[c.grade]);
      }
    }
  });

  it("writes the Lenape and Nanticoke peoples in the present tense, as living communities", () => {
    const peoples = delaware.find(({ u }) => u.id === "de-g4-first-peoples");
    const text = linesOf(peoples!.u).join("\n");
    expect(text).toMatch(/Lenape and Nanticoke people(s)? (have|live)|live in Delaware today|communities in Delaware today/);
  });
});

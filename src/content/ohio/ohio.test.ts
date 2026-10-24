import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Ohio's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Ohio's alone.

/** Every Ohio unit with its course. */
const ohio = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-oh"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof ohio)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Ohio", () => {
  it("is a US framework in US English, offered to families", () => {
    const oh = getFramework("ohio");
    expect(oh.id).toBe("us-oh");
    expect(oh.country).toBe("US");
    expect(localeOf(oh)).toBe("en-US");
    expect(oh.subjects).toEqual(["math", "language", "science", "social"]);
    expect(oh.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(oh);
    expect(UPCOMING_FRAMEWORKS).not.toContain(oh);
  });

  it("never shows Ohio families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Ohio's own units (oh-) may name other
    // places where Ohio's story calls for it (the Northwest Territory states, Kentucky across the river), and United
    // States history and civics (Grades 8 and 9) name states where the history does. The Grade 9 rhetoric unit quotes
    // the "Letter from Birmingham Jail".
    const EXEMPT = new Set(["ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["8", "9"].includes(grade);
    for (const { u, key } of ohio.filter(({ c, u }) => !u.id.startsWith("oh-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal units", () => {
    // Ohio's own units about the Native nations of Ohio are written for Ohio. Other states' units about
    // their Tribes, treaties or California Indian nations stay theirs.
    const words = /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i;
    for (const { u, key } of ohio.filter(({ u }) => /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co)-/.test(u.id))) {
      const about = [u.id, u.title, u.blurb, u.parentNote ?? ""].join(" ");
      expect(words.test(about) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Ohio studies in its own units, which carry only Ohio standards", () => {
    const own = ohio.filter(({ u }) => u.id.startsWith("oh-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["oh-k-ohio-symbols", "oh-g2-ohio-regions", "oh-g4-first-peoples", "oh-g4-governing-ohio", "oh-g8-westward", "oh-g9-governing-ohio"]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Ohio standards`).toEqual(["us-oh"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches Ohio history in 4th grade, the Western and Eastern Hemispheres in 5th and 6th, world history in 7th and American Government in 9th", () => {
    const social = (grade: string) => ohio.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("4").filter((id) => id.startsWith("oh-")).length).toBeGreaterThanOrEqual(6);
    expect(social("5")).toEqual(expect.arrayContaining(["oh-g5-americas-geography", "ca-g7-aztec-inca"]));
    expect(social("6")).toEqual(expect.arrayContaining(["ny-g6-eastern-hemisphere", "oh-g6-world-regions"]));
    expect(social("7")).toEqual(expect.arrayContaining(["wa-g6-greece-rome", "world-beliefs", "oh-g7-japan"]));
    expect(social("8")).toEqual(expect.arrayContaining(["oh-g8-westward", "oh-g8-rights-citizenship"]));
    expect(social("9")).toEqual(expect.arrayContaining(["oh-g9-governing-ohio", "oh-g9-us-government", "oh-g9-economics"]));
  });
});

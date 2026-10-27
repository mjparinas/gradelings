import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// New Hampshire's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is New Hampshire's alone.

/** Every New Hampshire unit with its course. */
const newHampshire = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-nh"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof newHampshire)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("New Hampshire", () => {
  it("is a US framework in US English, offered to families", () => {
    const nh = getFramework("new-hampshire");
    expect(nh.id).toBe("us-nh");
    expect(nh.country).toBe("US");
    expect(localeOf(nh)).toBe("en-US");
    expect(nh.subjects).toEqual(["math", "language", "science", "social"]);
    expect(nh.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(nh);
    expect(UPCOMING_FRAMEWORKS).not.toContain(nh);
  });

  it("never shows New Hampshire families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. New Hampshire's own units (nh-) may name other
    // places where New Hampshire's story calls for it (its neighbor states, Mount Washington), and the United States
    // history and civics grades (5, 8 and 9) name states where the history does. The national symbols unit names national
    // landmarks, and the rhetoric unit quotes Dr. King's letter from Birmingham. The 2nd grade leaders unit tells Ruby
    // Bridges's story in New Orleans, which New Hampshire's standard on people who changed life in the nation calls for.
    const EXEMPT = new Set(["ny-g1-american-symbols", "ca-g2-citizens-and-leaders", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["5", "8", "9"].includes(grade);
    for (const { u, key } of newHampshire.filter(({ c, u }) => !u.id.startsWith("nh-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // New Hampshire's own units about the Abenaki and the Eastern Woodland are written for New Hampshire.
    // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris).
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of newHampshire.filter(({ u }) => /^[a-z]{2}-/.test(u.id) && !u.id.startsWith("nh-") && !u.standards["ca-bc"])) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches New Hampshire studies in its own units, which carry only New Hampshire standards", () => {
    const own = newHampshire.filter(({ u }) => u.id.startsWith("nh-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "nh-k-flag-and-state",
        "nh-g1-then-and-now",
        "nh-g3-regions",
        "nh-g4-first-peoples",
        "nh-g4-granite-state",
        "nh-g4-governing-new-hampshire",
        "nh-g8-new-hampshire-and-the-nation",
        "nh-g9-governing-new-hampshire",
      ]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only New Hampshire standards`).toEqual(["us-nh"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches New Hampshire's regions in 3rd grade, its history in 4th and its government in 9th", () => {
    const social = (grade: string) => newHampshire.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3")).toEqual(expect.arrayContaining(["nh-g3-regions", "nh-g3-people-on-the-move"]));
    expect(social("4").filter((id) => id.startsWith("nh-")).length).toBeGreaterThanOrEqual(6);
    expect(social("8")).toContain("nh-g8-new-hampshire-and-the-nation");
    expect(social("9")).toEqual(expect.arrayContaining(["nh-g9-governing-new-hampshire", "nh-g9-us-government", "nh-g9-personal-finance"]));
  });

  it("cites social studies by the curriculum framework's grade span", () => {
    // The 2006 framework sets expectations for K-2, 3-4, 5-6, 7-8 and 9-12, so a grade cites its own span.
    const span: Record<string, string> = { k: "2", "1": "2", "2": "2", "3": "4", "4": "4", "5": "6", "6": "6", "7": "8", "8": "8", "9": "12" };
    for (const { c, u, key } of newHampshire.filter(({ c }) => c.subject === "social")) {
      const codes = (u.standards["us-nh"] ?? "").split(" · ")[0].split("; ");
      for (const code of codes) {
        const m = /^SS:(CV|EC|GE|HI|WH):(\d+):\d+\.\d+$/.exec(code);
        expect(m?.[2], `${key} cites ${code}`).toBe(span[c.grade]);
      }
    }
  });
});

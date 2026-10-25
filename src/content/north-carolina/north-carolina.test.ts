import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// North Carolina's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is North Carolina's alone.

/** Every North Carolina unit with its course. */
const northCarolina = COURSES.flatMap((c) =>
  c.units
    .filter((u) => u.standards["us-nc"])
    .map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) =>
      withSeed(seed * 101 + difficulty, () => generate({ difficulty })),
    ),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof northCarolina)[number]["u"]) =>
  [
    u.title,
    u.blurb,
    u.parentNote ?? "",
    ...sampleOf((o) => u.generate(o)).map(questionText),
  ]
    .join("\n")
    .split("\n");

describe("North Carolina", () => {
  it("is a US framework in US English, offered to families", () => {
    const nc = getFramework("north-carolina");
    expect(nc.id).toBe("us-nc");
    expect(nc.country).toBe("US");
    expect(localeOf(nc)).toBe("en-US");
    expect(nc.subjects).toEqual(["math", "language", "science", "social"]);
    expect(nc.scoringFor("4").levels.map((l) => l.label)).toEqual([
      "Beginning",
      "Approaching",
      "Meeting",
      "Exceeding",
    ]);
    expect(FRAMEWORKS).toContain(nc);
    expect(UPCOMING_FRAMEWORKS).not.toContain(nc);
  });

  it("never shows North Carolina families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. North Carolina's own units (nc-) may name
    // other places where North Carolina's story calls for it (the Cherokee removal to Oklahoma), and United States
    // history and civics (Grades 5, 8 and 9) name states where the history does.
    // American symbols names the Grand Canyon as a national landmark; the rhetoric unit quotes the Letter from
    // Birmingham Jail.
    const EXEMPT = new Set<string>([
      "ny-g1-american-symbols",
      "ca-g9-rhetoric-and-sources",
    ]);
    const history = (grade: string, subject: string) =>
      subject === "social" && ["5", "8", "9"].includes(grade);
    const hits = northCarolina
      .filter(
        ({ c, u }) =>
          !u.id.startsWith("nc-") &&
          !EXEMPT.has(u.id) &&
          !history(c.grade, c.subject),
      )
      .flatMap(({ u, key }) => {
        const hit = linesOf(u).find((line) =>
          OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")),
        );
        return hit ? [`${key}: ${hit}`] : [];
      });
    expect(hits).toEqual([]);
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // North Carolina's own units about the Eastern Band of Cherokee Indians and the state's other tribes are written
    // for North Carolina. Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris).
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    const hits = northCarolina
      .filter(({ u }) =>
        /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa|ga)-/.test(u.id),
      )
      .filter(({ u }) =>
        words.test(
          sampleOf((o) => u.generate(o))
            .map(questionText)
            .join("\n"),
        ),
      )
      .map(({ key }) => key);
    expect(hits).toEqual([]);
  });

  it("teaches North Carolina history in Grades 4 and 8 with its own units", () => {
    for (const grade of ["4", "8"]) {
      const social = COURSES.find(
        (c) =>
          c.grade === grade &&
          c.subject === "social" &&
          c.units.some((u) => u.standards["us-nc"]),
      );
      const own = social?.units.filter((u) => u.id.startsWith("nc-")) ?? [];
      expect(own.length, `Grade ${grade}`).toBeGreaterThanOrEqual(5);
    }
  });

  it("gives its own units only US standards", () => {
    const own = northCarolina.filter(({ u }) => u.id.startsWith("nc-"));
    expect(own.length).toBeGreaterThan(30);
    for (const { u, key } of own)
      expect(
        Object.keys(u.standards).every((f) => f.startsWith("us-")),
        key,
      ).toBe(true);
  });
});

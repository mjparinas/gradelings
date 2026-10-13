import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { canadianWords, localeOf, localizeUnit, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { FOCUS } from "./focus";
import { PLAN } from "./plan";

// California's official standards, built from CDE's files by docs/research/california/build_outcomes.py.
const OUTCOMES = JSON.parse(
  readFileSync(
    join(__dirname, "../../../docs/research/california/outcomes.json"),
    "utf8",
  ),
) as Record<string, { idx: string }[]>;

const CORE = ["math", "language", "science", "social"] as const;
const GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

/** Every California unit with its course. */
const california = COURSES.flatMap((c) =>
  c.units
    .filter((u) => u.standards["us-ca"])
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
const linesOf = (u: (typeof california)[number]["u"]) =>
  [
    u.title,
    u.blurb,
    u.parentNote ?? "",
    ...sampleOf((o) => u.generate(o)).map(questionText),
  ]
    .join("\n")
    .split("\n");

describe("California", () => {
  it("is a US framework in US English, not offered to families yet", () => {
    const ca = getFramework("california");
    expect(ca.id).toBe("us-ca");
    expect(ca.country).toBe("US");
    expect(localeOf(ca)).toBe("en-US");
    expect(ca.subjects).toEqual(["math", "language", "science", "social"]);
    expect(ca.scoringFor("4").levels.map((l) => l.label)).toEqual([
      "Beginning",
      "Approaching",
      "Meeting",
      "Exceeding",
    ]);
    expect(UPCOMING_FRAMEWORKS).toContain(ca);
    expect(FRAMEWORKS).not.toContain(ca);
  });

  it("has a focus list for every course", () => {
    for (const g of GRADES)
      for (const s of CORE)
        expect(FOCUS[`${g}/${s}`]?.length ?? 0, `${g}/${s}`).toBeGreaterThan(0);
  });

  it("cites real California standards for the unit's own grade and subject", () => {
    for (const { c, u, key } of california) {
      const [codes, text] = u.standards["us-ca"]!.split(" · ");
      expect(
        text?.trim(),
        `${key} needs a plain description after the codes`,
      ).toBeTruthy();
      const known = new Set(
        (OUTCOMES[`${c.grade}/${c.subject}`] ?? []).map((o) => o.idx),
      );
      for (const code of codes.split("; "))
        expect(
          known.has(code),
          `${key} cites "${code}", not a ${c.grade}/${c.subject} California standard`,
        ).toBe(true);
    }
  });

  it("has a plan entry only for units that exist, once per course", () => {
    for (const [course, entries] of Object.entries(PLAN)) {
      const ids = entries.map((e) => e[0]);
      expect(new Set(ids).size, `${course} lists a unit twice`).toBe(
        ids.length,
      );
      const [grade, subject] = course.split("/");
      const c = COURSES.find(
        (x) => x.grade === grade && x.subject === subject,
      )!;
      for (const id of ids)
        expect(
          c.units.some((u) => u.id === id && u.standards["us-ca"]),
          `${course}/${id}`,
        ).toBe(true);
    }
  });

  it("never shares a unit that is about Canada or uses Canadian money", () => {
    for (const { u, key } of california) {
      const qs = sampleOf((o) => u.generate(o));
      // US states' own units are written for the US, so US words that are also Canadian (treaty, Confederation,
      // Great Lakes) are fine there; the word check is for units borrowed from a province.
      const words = /^(ca|or|wa)-/.test(u.id)
        ? []
        : [...new Set(qs.flatMap((q) => canadianWords(questionText(q))))];
      expect(words, `${key} mentions Canada`).toEqual([]);
      for (const q of qs) {
        const money =
          q.kind === "coins" ||
          q.visual?.type === "coins" ||
          (q.kind === "choice" && q.choices.some((c) => c.coin));
        if (money)
          expect(q.currency, `${key} shows Canadian coins`).toBe("USD");
      }
    }
  });

  it("never shares a spelling lesson whose choices collide in US spelling", () => {
    for (const { u, key } of california) {
      for (const q of sampleOf((o) => localizeUnit(u, "en-US").generate(o))) {
        if (q.kind !== "choice") continue;
        const labels = q.choices.map(
          (c) => `${c.label}|${c.emoji ?? ""}|${c.coin ?? ""}|${c.shape ?? ""}`,
        );
        expect(new Set(labels).size, `${key}: ${q.prompt}`).toBe(labels.length);
      }
    }
  });

  it("keeps California-only units for US states alone", () => {
    const own = california.filter(({ u }) => u.id.startsWith("ca-"));
    expect(own.length).toBeGreaterThan(0);
    for (const { u, key } of own)
      for (const f of Object.keys(u.standards)) expect(f, key).toMatch(/^us-/);
  });

  it("never shows California families a unit about Washington State or Oregon", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine, and so is the Oregon Trail as US history.
    // The 50 states and capitals unit names every state, Washington and Oregon among them.
    const ALL_STATES = new Set(["or-g5-states-capitals"]);
    const other = /Washington(?!,? D\.?C\.?)|Oregon(?! Trail)/;
    for (const { u, key } of california.filter(
      ({ u }) => !ALL_STATES.has(u.id),
    )) {
      const hit = linesOf(u).find((line) =>
        other.test(line.replace(/(George|Martha) Washington/g, "")),
      );
      expect(hit ?? "", `${key} mentions Washington State or Oregon`).toBe("");
    }
  });

  it("never borrows Washington's or Oregon's Tribal units", () => {
    // California's own units about California Indian nations are written for California; Washington's and Oregon's
    // Tribal units (and any of their units about Tribes or treaties) stay theirs.
    const words = /\b(Tribes?|Tribal|treaty|treaties)\b|\bNative\b/;
    for (const { u, key } of california.filter(({ u }) =>
      /^(wa|or)-/.test(u.id),
    )) {
      const text = sampleOf((o) => u.generate(o))
        .map(questionText)
        .join("\n");
      expect(
        words.test(text) ? key : "",
        `${key} is a Washington or Oregon unit about Tribes`,
      ).toBe("");
    }
  });

  it("shares only BC units; Washington's, Oregon's and other provinces' units are adopted", () => {
    for (const [course, entries] of Object.entries(PLAN)) {
      const [grade, subject] = course.split("/");
      const c = COURSES.find(
        (x) => x.grade === grade && x.subject === subject,
      )!;
      for (const [id, kind] of entries) {
        const u = c.units.find((x) => x.id === id)!;
        expect(
          Boolean(u.standards["ca-bc"]),
          `${course}/${id}: "share" is for BC units, "adopt" for the rest`,
        ).toBe(kind === "share");
      }
    }
  });
});

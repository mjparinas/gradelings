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

// Washington's official standards, built from OSPI's files by docs/research/washington/build_outcomes.py.
const OUTCOMES = JSON.parse(readFileSync(join(__dirname, "../../../docs/research/washington/outcomes.json"), "utf8")) as Record<
  string,
  { idx: string }[]
>;

const CORE = ["math", "language", "science", "social"] as const;
const GRADES = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

/** Every Washington unit with its course. */
const washington = COURSES.flatMap((c) => c.units.filter((u) => u.standards["us-wa"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })));

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) => ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))));

describe("Washington", () => {
  it("is a US framework in US English, not offered to families yet", () => {
    const wa = getFramework("washington");
    expect(wa.id).toBe("us-wa");
    expect(wa.country).toBe("US");
    expect(localeOf(wa)).toBe("en-US");
    expect(wa.subjects).toEqual(["math", "language", "science", "social"]);
    expect(wa.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(UPCOMING_FRAMEWORKS).toContain(wa);
    expect(FRAMEWORKS).not.toContain(wa);
  });

  it("has a focus list for every course", () => {
    for (const g of GRADES) for (const s of CORE) expect(FOCUS[`${g}/${s}`]?.length ?? 0, `${g}/${s}`).toBeGreaterThan(0);
  });

  it("cites real Washington standards for the unit's own grade and subject", () => {
    for (const { c, u, key } of washington) {
      const [codes, text] = u.standards["us-wa"]!.split(" · ");
      expect(text?.trim(), `${key} needs a plain description after the codes`).toBeTruthy();
      const known = new Set((OUTCOMES[`${c.grade}/${c.subject}`] ?? []).map((o) => o.idx));
      for (const code of codes.split("; ")) expect(known.has(code), `${key} cites "${code}", not a ${c.grade}/${c.subject} standard`).toBe(true);
    }
  });

  it("has a plan entry only for units that exist, once per course", () => {
    for (const [course, entries] of Object.entries(PLAN)) {
      const ids = entries.map((e) => e[0]);
      expect(new Set(ids).size, `${course} lists a unit twice`).toBe(ids.length);
      const [grade, subject] = course.split("/");
      const c = COURSES.find((x) => x.grade === grade && x.subject === subject)!;
      for (const id of ids) expect(c.units.some((u) => u.id === id && u.standards["us-wa"]), `${course}/${id}`).toBe(true);
    }
  });

  it("never shares a unit that is about Canada or uses Canadian money", () => {
    for (const { u, key } of washington) {
      const qs = sampleOf((o) => u.generate(o));
      // Washington's own units are written for Washington, so US words that are also Canadian (treaty, Confederation,
      // Great Lakes) are fine there; the word check is for units borrowed from a province.
      const words = u.id.startsWith("wa-") ? [] : [...new Set(qs.flatMap((q) => canadianWords(questionText(q))))];
      expect(words, `${key} mentions Canada`).toEqual([]);
      for (const q of qs) {
        const money = q.kind === "coins" || q.visual?.type === "coins" || (q.kind === "choice" && q.choices.some((c) => c.coin));
        if (money) expect(q.currency, `${key} shows Canadian coins`).toBe("USD");
      }
    }
  });

  it("never shares a spelling lesson whose choices collide in US spelling", () => {
    for (const { u, key } of washington) {
      for (const q of sampleOf((o) => localizeUnit(u, "en-US").generate(o))) {
        if (q.kind !== "choice") continue;
        const labels = q.choices.map((c) => `${c.label}|${c.emoji ?? ""}|${c.coin ?? ""}|${c.shape ?? ""}`);
        expect(new Set(labels).size, `${key}: ${q.prompt}`).toBe(labels.length);
      }
    }
  });

  it("keeps Washington-only units for Washington alone", () => {
    const own = washington.filter(({ u }) => u.id.startsWith("wa-"));
    for (const { u, key } of own) expect(Object.keys(u.standards), key).toEqual(["us-wa"]);
  });

  it("shares only BC units; other provinces' units are adopted", () => {
    for (const [course, entries] of Object.entries(PLAN)) {
      const [grade, subject] = course.split("/");
      const c = COURSES.find((x) => x.grade === grade && x.subject === subject)!;
      for (const [id, kind] of entries) {
        const u = c.units.find((x) => x.id === id)!;
        expect(Boolean(u.standards["ca-bc"]), `${course}/${id}: "share" is for BC units, "adopt" for the rest`).toBe(kind === "share");
      }
    }
  });
});

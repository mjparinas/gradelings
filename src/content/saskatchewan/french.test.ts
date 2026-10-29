import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework } from "../frameworks";
import { GUIDES } from "../guides";
import { GRADE_ORDER as ALL_GRADES } from "../subjects";
import type { GradeId } from "../types";

// French starts in Kindergarten at the earliest, never in Pre-K.
const GRADE_ORDER = ALL_GRADES.filter((g): g is Exclude<GradeId, "pk"> => g !== "pk");

// Saskatchewan French: Core French Levels 1 to 9 (Grades 1 to 9) and Français en immersion (Kindergarten to Grade 9).
// Sources and the checking record are in docs/research/saskatchewan/.

type Outcomes = Record<string, Record<string, { name: string; outcomes: { code: string; text: string }[] }[]>>;
const OUTCOMES = JSON.parse(readFileSync(join(__dirname, "../../../docs/research/saskatchewan/outcomes.json"), "utf8")) as Outcomes;

const skUnits = (grade: GradeId, subject: "immersion" | "core-french") =>
  (COURSES.find((c) => c.grade === grade && c.subject === subject)?.units ?? []).filter((u) => u.standards["ca-sk"]);
const codesOf = (units: ReturnType<typeof skUnits>) => units.flatMap((u) => u.standards["ca-sk"]!.split(" · ")[0].split(", "));

describe("Saskatchewan French", () => {
  it("is switched on in the framework", () => {
    const sk = getFramework("ca-sk");
    expect(sk.subjects).toEqual(expect.arrayContaining(["immersion", "core-french"]));
    expect(FRAMEWORKS.map((f) => f.id)).toContain("ca-sk");
  });

  it("has the official outcomes for every Core French level and every immersion grade", () => {
    for (const grade of GRADE_ORDER) {
      const immersion = OUTCOMES[grade].immersion;
      expect(immersion?.length, `immersion ${grade}`).toBeGreaterThanOrEqual(5);
      expect(immersion.flatMap((g) => g.outcomes).every((o) => o.code && o.text), `immersion ${grade} text`).toBe(true);
      if (grade === "k") {
        expect(OUTCOMES[grade]["core-french"], "no Core French curriculum for Kindergarten").toBeUndefined();
        continue;
      }
      const core = OUTCOMES[grade]["core-french"];
      expect(core.map((g) => g.name), `Core French ${grade} goals`).toEqual(["Communication Skills", "General Language Strategies", "Language Knowledge", "Culture"]);
      for (const o of core.flatMap((g) => g.outcomes)) expect(o.code.startsWith(`${grade}.`), o.code).toBe(true);
      expect(core.flatMap((g) => g.outcomes).every((o) => o.text.length > 10), `Core French ${grade} text`).toBe(true);
    }
  });

  it("offers Core French from Level 1 to Level 9 with the level matching the grade", () => {
    expect(skUnits("k", "core-french")).toHaveLength(0);
    for (const grade of GRADE_ORDER.filter((g) => g !== "k")) {
      const units = skUnits(grade, "core-french");
      expect(units.length, `Core French ${grade}`).toBeGreaterThanOrEqual(3);
      for (const code of codesOf(units)) expect(code.startsWith(`${grade}.`), `${grade}: ${code}`).toBe(true);
    }
  });

  it("offers French Immersion from Kindergarten to Grade 9 and cites the right strands", () => {
    for (const grade of GRADE_ORDER) {
      const units = skUnits(grade, "immersion");
      expect(units.length, `immersion ${grade}`).toBeGreaterThanOrEqual(6);
      for (const code of codesOf(units)) {
        if (grade === "k" || grade === "1") expect(code, `${grade}`).toMatch(/^É-[A-Z]{1,2}\.\d+$/);
        else if (grade === "2") expect(code, `${grade}`).toMatch(/^AP-[A-Z]{1,2}\.\d+$/);
        else expect(code, `${grade}`).toMatch(new RegExp(`^${grade}\\.(VC|CO|CÉ|PO|PÉ)\\.\\d$`));
      }
    }
  });

  it("covers the Culture goal in every Core French level from Level 4, with a Saskatchewan unit at 4, 6 and 8", () => {
    for (const grade of GRADE_ORDER.filter((g) => Number(g) >= 4)) {
      expect(codesOf(skUnits(grade, "core-french")), `Core French ${grade}`).toContain(`${grade}.C.1`);
    }
    for (const [grade, id] of [["4", "sk-cf4-fransaskois"], ["6", "sk-cf6-noms-de-lieux"], ["8", "sk-cf8-contributions"]] as const) {
      expect(skUnits(grade, "core-french").map((u) => u.id), grade).toContain(id);
    }
  });

  it("has Saskatchewan immersion culture units written in French with a French voice", () => {
    for (const [grade, id] of [["5", "sk-imm5-cultures"], ["8", "sk-imm8-diversite"]] as const) {
      const unit = skUnits(grade, "immersion").find((u) => u.id === id);
      expect(unit, id).toBeDefined();
      for (const difficulty of [1, 2, 3] as const) {
        for (const q of unit!.generate({ difficulty })) {
          expect(q.lang, q.prompt).toBe("fr");
          expect(q.hint.trim()).not.toBe("");
        }
      }
    }
  });

  it("keeps Core French prompts in English for Level 1 to 3 children, short enough to read aloud", () => {
    for (const grade of ["1", "2", "3"] as const) {
      for (const unit of skUnits(grade, "core-french")) {
        for (const q of [1, 2, 3].flatMap((d) => unit.generate({ difficulty: d as 1 | 2 | 3 }))) {
          expect(q.prompt.length, q.prompt).toBeLessThanOrEqual(grade === "1" ? 80 : 120);
        }
      }
    }
  });

  it("has a French guide that names both programs and points to the Ministry's curricula", () => {
    const french = GUIDES["ca-sk"]?.french;
    expect(french, "Saskatchewan French guide").toBeDefined();
    const text = JSON.stringify(french);
    for (const phrase of ["Core French", "French Immersion", "Conseil des écoles fransaskoises", "Levels 1 to 9"]) expect(text, phrase).toContain(phrase);
    expect(french!.faqs.length).toBeGreaterThanOrEqual(4);
    expect(french!.browse.length).toBeGreaterThan(0);
  });
});

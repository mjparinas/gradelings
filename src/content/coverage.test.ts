import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { COURSES } from "./all";
import { FRAMEWORKS, UPCOMING_FRAMEWORKS } from "./frameworks";
import { manifestOf } from "./registry";
import { CORE_SUBJECTS, GRADE_ORDER } from "./subjects";
import { withSeed } from "./random";
import type { FrameworkId, GradeId } from "./types";

// Parity checks: whatever one province or state gets, every framework gets. These fail when new
// content, a new grade or a new framework is added for one place and not the others. See
// "Every framework, every grade" in AGENTS.md.

const units = (framework: FrameworkId, grade: GradeId, subject: string) =>
  COURSES.find((c) => c.grade === grade && c.subject === subject)?.units.filter((u) => u.standards[framework]) ?? [];

// Content checks also cover frameworks that are not offered yet, so they are complete before they launch.
const CONTENT_FRAMEWORKS = [...FRAMEWORKS, ...UPCOMING_FRAMEWORKS];

/** The grades each framework offers the two French subjects in, from its manifest (`french`). */
const frenchGrades = (id: FrameworkId) => manifestOf(id).french;

describe("every framework covers every grade and subject", () => {
  it("offers each framework's grades as Kindergarten to Grade 9", () => {
    for (const f of CONTENT_FRAMEWORKS) expect(f.grades, f.id).toEqual(GRADE_ORDER);
  });

  it("has math, language, science and social studies in every grade, with Big Ideas or strands", () => {
    for (const f of CONTENT_FRAMEWORKS) {
      for (const grade of f.grades) {
        for (const subject of CORE_SUBJECTS) {
          expect(units(f.id, grade, subject).length, `${f.id} ${grade}/${subject}`).toBeGreaterThanOrEqual(3);
          const course = COURSES.find((c) => c.grade === grade && c.subject === subject)!;
          expect(course.bigIdeas[f.id]?.length ?? 0, `${f.id} ${grade}/${subject} big ideas`).toBeGreaterThan(0);
        }
      }
    }
  });

  it("has French in exactly the grades the province teaches it", () => {
    for (const f of CONTENT_FRAMEWORKS) {
      for (const grade of f.grades) {
        for (const subject of ["immersion", "core-french"] as const) {
          const expected = frenchGrades(f.id)[subject].includes(grade);
          expect(units(f.id, grade, subject).length > 0, `${f.id} ${grade}/${subject}`).toBe(expected);
        }
      }
    }
  });
});

describe("public pages", () => {
  const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap((n) => {
      const p = join(dir, n);
      return statSync(p).isDirectory() ? walk(p) : p.endsWith("page.tsx") ? [p] : [];
    });
  const appDir = join(__dirname, "../app");
  /** Pages that serve people who already have an account, or legal text. */
  const NO_CTA = ["/contact/", "/help/", "/account/", "/status/"];

  it("end with a call to action to try the app", () => {
    // Shared page bodies (the guide extras) render inside thin page.tsx wrappers.
    const missing = [...walk(appDir), join(__dirname, "../components/site/GuideExtras.tsx")]
      .filter((f) => readFileSync(f, "utf8").includes("<SitePage"))
      .filter((f) => !NO_CTA.some((n) => f.replaceAll("\\", "/").includes(`/app${n}`)))
      .filter((f) => {
        const src = readFileSync(f, "utf8");
        // Teacher pages end with the teacher call to action. SubscribeActions includes the free-trial link.
        return !/<SitePage cta\b/.test(src) && !src.includes('href="/play/"') && !src.includes("<TeacherCta") && !src.includes("<SubscribeActions");
      });
    expect(missing).toEqual([]);
  });
});

// Practice needs enough variety that a child does not see the same question every few sessions. A question
// counts as distinct by prompt, picture and correct answer, so reshuffled choices do not count.
const MIN_DISTINCT = 24;

describe("every unit has a deep enough question pool", () => {
  it(`has at least ${MIN_DISTINCT} distinct questions in every unit`, () => {
    const thin: string[] = [];
    for (const course of COURSES) {
      for (const unit of course.units) {
        const seen = new Set<string>();
        // Stop as soon as the unit has enough: the count only has to reach the minimum, and generating 450 sets for
        // every unit of every framework outgrew the time limit.
        for (const difficulty of [1, 2, 3] as const) {
          for (let seed = 0; seed < 150 && seen.size < MIN_DISTINCT; seed++) {
            for (const q of withSeed(seed * 7919 + difficulty, () => unit.generate({ difficulty }))) {
              const answer =
                q.kind === "choice"
                  ? q.choices.find((c) => c.id === q.answer)?.label
                  : "items" in q
                    ? q.items.map((i) => i.label).sort()
                    : undefined;
              seen.add(JSON.stringify([q.prompt, q.visual, answer]));
            }
          }
        }
        if (seen.size < MIN_DISTINCT) thin.push(`${course.grade}/${course.subject}/${unit.id}: ${seen.size}`);
      }
    }
    expect(thin, "units with too few distinct questions").toEqual([]);
  }, 120000);
});

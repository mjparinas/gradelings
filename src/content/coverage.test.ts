import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { COURSES } from "./all";
import { FRAMEWORKS, UPCOMING_FRAMEWORKS } from "./frameworks";
import { manifestOf } from "./registry";
import { PRE_K_SUBJECTS, PRE_K_UNITS } from "./prek";
import { CORE_SUBJECTS, GRADE_ORDER } from "./subjects";
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
  it("offers each framework's grades as Pre-K or Kindergarten to Grade 9", () => {
    // Pre-K is reaching every framework in turn; until a framework has its Pre-K standards it starts at Kindergarten.
    for (const f of CONTENT_FRAMEWORKS) expect(f.grades, f.id).toEqual(f.grades.includes("pk") ? GRADE_ORDER : GRADE_ORDER.filter((g) => g !== "pk"));
  });

  it("gives Pre-K every shared unit, cited, in the four core subjects and no French", () => {
    for (const f of CONTENT_FRAMEWORKS.filter((x) => x.grades.includes("pk"))) {
      for (const subject of PRE_K_SUBJECTS) expect(units(f.id, "pk", subject).map((u) => u.id).sort(), `${f.id} pk/${subject}`).toEqual([...PRE_K_UNITS[subject]].sort());
      expect(f.scoringFor("pk").practiceSteps, `${f.id} Pre-K levels are practice steps`).toBe(true);
    }
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

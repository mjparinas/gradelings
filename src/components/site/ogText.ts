import { coursesFor, resolve, subjectSeoTitle } from "@/components/site/curriculum";
import { frameworkBySlug } from "@/components/site/curriculum";
import { GRADE_LABEL, GRADE_ORDER, getSubjectMeta } from "@/content/subjects";
import type { OgCardText } from "./ogCard";

// What each public page's share card says. Kept apart from the image routes so it can be tested
// without rendering. Unit and worksheet pages use their subject's card (Next applies an
// `opengraph-image` to every page below it).

type Params = { framework: string; grade?: string; subject?: string };

const subjectsLine = (subjects: string[]) => subjects.map((s) => subjectSeoTitle(s as never)).join(" · ");

function gradeRange(grades: readonly string[]): string {
  const sorted = GRADE_ORDER.filter((g) => grades.includes(g));
  return `${GRADE_LABEL[sorted[0]]} to ${GRADE_LABEL[sorted[sorted.length - 1]]}`;
}

export function curriculumCard(params: Params): OgCardText | undefined {
  const r = resolve(params);
  if (!r) return undefined;
  const { framework: f } = r;
  if (!params.grade) return { kicker: `${f.name} curriculum`, title: `${gradeRange(f.grades)} practice`, line: "Math · Language Arts · Science · Social Studies · French" };
  const grade = r.grade;
  if (!r.course) {
    return { kicker: `${f.name} curriculum`, title: `${GRADE_LABEL[grade]} practice`, line: subjectsLine(coursesFor(f, grade).map((c) => c.subject)) };
  }
  return {
    kicker: `${f.name} curriculum · ${GRADE_LABEL[grade]}`,
    title: `${GRADE_LABEL[grade]} ${subjectSeoTitle(r.course.subject)}`,
    line: r.course.units.slice(0, 3).map((u) => u.title).join(" · "),
    colour: getSubjectMeta(r.course.subject).colour,
  };
}

export function guideCard(params: Params): OgCardText | undefined {
  const r = resolve(params);
  if (!r) return undefined;
  const { framework: f } = r;
  if (!params.grade) return { kicker: `Parent guides · ${f.name}`, title: "Help your child at home", line: `${gradeRange(f.grades)}, in the words of the report card` };
  const grade = r.grade;
  if (!r.course) return { kicker: `Parent guide · ${f.name}`, title: `${GRADE_LABEL[grade]}: what your child learns`, line: "And how to help at home, in a few minutes a day" };
  return {
    kicker: `Parent guide · ${f.name} · ${GRADE_LABEL[grade]}`,
    title: `${GRADE_LABEL[grade]} ${subjectSeoTitle(r.course.subject)} help at home`,
    line: "Easy tips, a printable worksheet and free practice",
    colour: getSubjectMeta(r.course.subject).colour,
  };
}

export function reportCardCard(slug: string): OgCardText | undefined {
  const f = frameworkBySlug(slug);
  if (!f) return undefined;
  const levels = f.scoringFor("3").levels.map((l) => l.label);
  return { kicker: `${f.name} report cards`, title: `${f.shortName} report cards, explained`, line: levels.join(" · ") };
}

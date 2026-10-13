import { coursesFor, curriculumPath, frameworkBySlug, resolve, subjectSeoTitle, unitKey } from "@/components/site/curriculum";
import { APP_NAME } from "@/lib/brand";
import { LEVEL_WORDS, countTitle } from "@/lib/milestoneShare";
import { GRADE_LABEL, GRADE_ORDER, getSubjectMeta } from "@/content/subjects";
import { hashSeed, withSeed } from "@/content/random";
import type { Question } from "@/content/types";
import type { OgCardText, OgQuestion } from "./ogCard";
import { critterFor } from "./ogCritter";

// What each public page's share card says. Kept apart from the image routes so it can be tested
// without rendering. Unit pages get a sample-question card; worksheet pages a tall Pinterest card.

type Params = { framework: string; grade?: string; subject?: string; unit?: string };

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
    critter: critterFor(r.course.subject),
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
    critter: critterFor(r.course.subject),
  };
}

export function reportCardCard(slug: string): OgCardText | undefined {
  const f = frameworkBySlug(slug);
  if (!f) return undefined;
  const levels = f.scoringFor("3").levels.map((l) => l.label);
  return { kicker: `${f.name} report cards`, title: `${f.shortName} report cards, explained`, line: levels.join(" · ") };
}

// The renderer has no emoji font, and a question that leans on a picture makes no sense without it.
const PICTURE = /\p{Extended_Pictographic}|\uFE0F/u;
const plain = (s: string) => !PICTURE.test(s);

/** A sample question that reads well on its own on a share card, or undefined. The answer is never included. */
export function cardQuestion(q: Question): OgQuestion | undefined {
  if (q.visual || q.prompt.length > 110 || !plain(q.prompt)) return undefined;
  if (q.kind === "choice") {
    if (q.choices.length > 4 || q.choices.some((c) => c.emoji || c.shape || c.coin !== undefined || c.label.length > 28 || !plain(c.label))) return undefined;
    return { prompt: q.prompt, choices: q.choices.map((c) => c.label) };
  }
  if (q.kind === "input") return { prompt: q.prompt, suffix: q.suffix && plain(q.suffix) ? q.suffix : undefined };
  return undefined;
}

/** "Can your Grade 4 solve this?" with one of the unit's own questions, seeded like the unit page. */
export function unitCard(params: Params): OgCardText | undefined {
  const r = resolve(params);
  if (!r?.course || !r.unit || !r.unit.standards[r.framework.id]) return undefined;
  const { framework: f, grade, course, unit } = r;
  const base = {
    kicker: `${f.shortName} · ${GRADE_LABEL[grade]} ${subjectSeoTitle(course.subject)} · ${unit.title}`,
    colour: getSubjectMeta(course.subject).colour,
    critter: critterFor(course.subject),
  };
  const key = unitKey(grade, course.subject, unit.id);
  for (const difficulty of [1, 2, 3] as const) {
    const qs = withSeed(hashSeed(`${key}:card:${difficulty}`), () => unit.generate({ difficulty }));
    for (const q of qs) {
      const question = cardQuestion(q);
      if (question) return { ...base, title: grade === "k" ? "Can your Kindergartner solve this?" : `Can your ${GRADE_LABEL[grade]} solve this?`, question };
    }
  }
  return { ...base, kicker: `${f.name} curriculum · ${GRADE_LABEL[grade]}`, title: unit.title, line: `${GRADE_LABEL[grade]} ${subjectSeoTitle(course.subject)} practice` };
}

/** The tall Pinterest card for a printable worksheet. */
export function worksheetCard(params: Params): OgCardText | undefined {
  const r = resolve(params);
  if (!r?.course) return undefined;
  const { framework: f, grade, course } = r;
  return {
    kicker: `${f.name} · ${GRADE_LABEL[grade]}`,
    title: `${GRADE_LABEL[grade]} ${subjectSeoTitle(course.subject)} worksheet`,
    line: "Print it, try it, then practise free",
    colour: getSubjectMeta(course.subject).colour,
    critter: critterFor(course.subject),
    items: course.units.slice(0, 4).map((u) => u.title),
  };
}

/** The tall Pinterest card for a grade's printable sheets, one item per subject. Leads to the grade guide's gallery. */
export function gradeSheetsCard(params: { framework: string; grade: string }): OgCardText | undefined {
  const r = resolve(params);
  if (!r || r.course) return undefined;
  const { framework: f, grade } = r;
  const courses = coursesFor(f, grade);
  if (!courses.length) return undefined;
  return {
    kicker: `${f.name} · ${GRADE_LABEL[grade]}`,
    title: `${GRADE_LABEL[grade]} printable worksheets`,
    line: `${courses.length} free sheets with answer keys`,
    items: courses.map((c) => subjectSeoTitle(c.subject)),
    itemColours: courses.map((c) => getSubjectMeta(c.subject).colour),
  };
}

export interface MilestoneCard extends OgCardText {
  /** Where the page's second link goes: the unit's curriculum page, or the curriculum index. */
  more?: { href: string; label: string };
  badge?: string;
}

/** A shared unit milestone ("Grew into a Tree in Fractions"), checked against real content. */
export function unitMilestoneCard(params: { framework: string; grade: string; subject: string; unit: string; level: string }): MilestoneCard | undefined {
  const words = LEVEL_WORDS[Number(params.level)];
  if (!words || !/^[23]$/.test(params.level)) return undefined;
  const r = resolve(params);
  if (!r?.course || !r.unit || !r.unit.standards[r.framework.id]) return undefined;
  const { framework: f, grade, course, unit } = r;
  return {
    kicker: `A milestone · ${GRADE_LABEL[grade]} ${subjectSeoTitle(course.subject)}`,
    title: `${words.verb} in ${unit.title}!`,
    line: `Practice in ${APP_NAME}, matched to the ${f.curriculumName}`,
    colour: getSubjectMeta(course.subject).colour,
    critter: critterFor(course.subject),
    badge: words.badge,
    more: { href: curriculumPath.unit(f, grade, course.subject, unit.id), label: `Try ${GRADE_LABEL[grade]} ${unit.title} questions` },
  };
}

export function countMilestoneCard(params: { kind: string; n: string }): MilestoneCard | undefined {
  if (!/^\d{1,6}$/.test(params.n)) return undefined;
  const title = countTitle(params.kind, Number(params.n));
  if (!title) return undefined;
  return { kicker: "A milestone", title: `${title}!`, line: `Practice that feels like play, in ${APP_NAME}`, critter: "ollie", badge: "🎉" };
}

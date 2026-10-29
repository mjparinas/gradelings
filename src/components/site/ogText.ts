import { coursesFor, curriculumPath, frameworkBySlug, gradeLabel, gradeSpan, resolve, sampleSeed, subjectSeoTitle, unitKey } from "@/components/site/curriculum";
import type { Framework } from "@/content/frameworks";
import { localeOf } from "@/content/locale";
import { APP_NAME } from "@/lib/brand";
import { LEVEL_WORDS, countTitle } from "@/lib/milestoneShare";
import { getSubjectMeta, LANGUAGE_NAME, languagesOf } from "@/content/subjects";
import type { GradeId } from "@/content/types";
import { hashSeed, withSeed } from "@/content/random";
import type { Question } from "@/content/types";
import type { OgCardText, OgQuestion } from "./ogCard";
import { critterFor } from "./ogCritter";

// What each public page's share card says. Kept apart from the image routes so it can be tested
// without rendering. Unit pages get a sample-question card; worksheet pages a tall Pinterest card.

type Params = { framework: string; grade?: string; subject?: string; unit?: string };

const subjectsLine = (subjects: string[]) => subjects.map((s) => subjectSeoTitle(s as never)).join(" · ");

/** "Can your Grade 4 solve this?" in Canada, "Can your 4th grader solve this?" in the US. */
function gradeChild(f: Framework, grade: GradeId): string {
  if (grade === "pk") return localeOf(f) === "en-US" ? "preschooler" : "little one";
  if (grade === "k") return "Kindergartner";
  return localeOf(f) === "en-US" ? `${gradeLabel(f, grade)}r` : gradeLabel(f, grade);
}

const practise = (f: Framework) => (localeOf(f) === "en-US" ? "practice" : "practise");

export function curriculumCard(params: Params): OgCardText | undefined {
  const r = resolve(params);
  if (!r) return undefined;
  const { framework: f } = r;
  if (!params.grade) return { kicker: `${f.name} curriculum`, title: `${gradeSpan(f, true)} practice`, line: ["Math · Language Arts · Science · Social Studies", ...languagesOf(f.subjects).map((l) => LANGUAGE_NAME[l])].join(" · ") };
  const grade = r.grade;
  if (!r.course) {
    return { kicker: `${f.name} curriculum`, title: `${gradeLabel(f, grade)} practice`, line: subjectsLine(coursesFor(f, grade).map((c) => c.subject)) };
  }
  return {
    kicker: `${f.name} curriculum · ${gradeLabel(f, grade)}`,
    title: `${gradeLabel(f, grade)} ${subjectSeoTitle(r.course.subject)}`,
    line: r.course.units.slice(0, 3).map((u) => u.title).join(" · "),
    colour: getSubjectMeta(r.course.subject).colour,
    critter: critterFor(r.course.subject),
  };
}

export function guideCard(params: Params): OgCardText | undefined {
  const r = resolve(params);
  if (!r) return undefined;
  const { framework: f } = r;
  if (!params.grade) return { kicker: `Parent guides · ${f.name}`, title: "Help your child at home", line: `${gradeSpan(f, true)}, in the words of the report card` };
  const grade = r.grade;
  if (!r.course) return { kicker: `Parent guide · ${f.name}`, title: `${gradeLabel(f, grade)}: what your child learns`, line: "And how to help at home, in a few minutes a day" };
  return {
    kicker: `Parent guide · ${f.name} · ${gradeLabel(f, grade)}`,
    title: `${gradeLabel(f, grade)} ${subjectSeoTitle(r.course.subject)} help at home`,
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

type Found = NonNullable<ReturnType<typeof resolve>>;

/** The unit's question card, seeded like the unit page, or undefined when none of its questions suits a card. */
function questionCard(f: Framework, grade: GradeId, course: NonNullable<Found["course"]>, unit: NonNullable<Found["unit"]>): OgCardText | undefined {
  const key = unitKey(grade, course.subject, unit.id);
  for (const difficulty of [1, 2, 3] as const) {
    const qs = withSeed(hashSeed(`${sampleSeed(f, key)}:card:${difficulty}`), () => unit.generate({ difficulty }));
    for (const q of qs) {
      const question = cardQuestion(q);
      if (question) {
        return {
          kicker: `${f.shortName} · ${gradeLabel(f, grade)} ${subjectSeoTitle(course.subject)} · ${unit.title}`,
          title: `Can your ${gradeChild(f, grade)} solve this?`,
          colour: getSubjectMeta(course.subject).colour,
          critter: critterFor(course.subject),
          question,
        };
      }
    }
  }
  return undefined;
}

/** "Can your Grade 4 solve this?" ("4th grader" in the US) with one of the unit's own questions, seeded like the unit page. */
export function unitCard(params: Params): OgCardText | undefined {
  const r = resolve(params);
  if (!r?.course || !r.unit || !r.unit.standards[r.framework.id]) return undefined;
  const { framework: f, grade, course, unit } = r;
  return (
    questionCard(f, grade, course, unit) ?? {
      kicker: `${f.name} curriculum · ${gradeLabel(f, grade)}`,
      title: unit.title,
      line: `${gradeLabel(f, grade)} ${subjectSeoTitle(course.subject)} practice`,
      colour: getSubjectMeta(course.subject).colour,
      critter: critterFor(course.subject),
    }
  );
}

/**
 * The grade's "Can your Grade 4 solve this?" card, for the grade's curriculum page and parent guide: a math question
 * first (then the other subjects), from a unit picked by a seed per framework and grade, so it is the same on every
 * build. Undefined when no question in the grade suits a card; the page then keeps its plain card.
 */
export function gradeQuestionCard(params: { framework: string; grade: string }): OgCardText | undefined {
  const r = resolve(params);
  if (!r || r.course || !params.grade) return undefined;
  const { framework: f, grade } = r;
  const courses = [...coursesFor(f, grade)].sort((a, b) => Number(b.subject === "math") - Number(a.subject === "math"));
  for (const course of courses) {
    const units = course.units.filter((u) => u.standards[f.id]);
    const start = units.length ? hashSeed(`${f.id}:${grade}:${course.subject}:grade-card`) % units.length : 0;
    for (let i = 0; i < units.length; i++) {
      const card = questionCard(f, grade, course, units[(start + i) % units.length]);
      if (card) return card;
    }
  }
  return undefined;
}

/** The tall Pinterest card for a printable worksheet. */
export function worksheetCard(params: Params): OgCardText | undefined {
  const r = resolve(params);
  if (!r?.course) return undefined;
  const { framework: f, grade, course } = r;
  return {
    kicker: `${f.name} · ${gradeLabel(f, grade)}`,
    title: `${gradeLabel(f, grade)} ${subjectSeoTitle(course.subject)} worksheet`,
    line: `Print it, try it, then ${practise(f)} free`,
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
    kicker: `${f.name} · ${gradeLabel(f, grade)}`,
    title: `${gradeLabel(f, grade)} printable worksheets`,
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
    kicker: `A milestone · ${gradeLabel(f, grade)} ${subjectSeoTitle(course.subject)}`,
    title: `${words.verb} in ${unit.title}!`,
    line: `Practice in ${APP_NAME}, matched to the ${f.curriculumName}`,
    colour: getSubjectMeta(course.subject).colour,
    critter: critterFor(course.subject),
    badge: words.badge,
    more: { href: curriculumPath.unit(f, grade, course.subject, unit.id), label: `Try ${gradeLabel(f, grade)} ${unit.title} questions` },
  };
}

export function countMilestoneCard(params: { kind: string; n: string }): MilestoneCard | undefined {
  if (!/^\d{1,6}$/.test(params.n)) return undefined;
  const title = countTitle(params.kind, Number(params.n));
  if (!title) return undefined;
  return { kicker: "A milestone", title: `${title}!`, line: `Practice that feels like play, in ${APP_NAME}`, critter: "ollie", badge: "🎉" };
}

import { coursesFor, gradeLabel, gradeSpan, gradesWithContent, say, subjectSeoTitle } from "./curriculum";
import { regionList, regionWord } from "./provinces";
import type { Framework, ScoringScheme } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";
import { CORE_SUBJECTS, getSubjectMeta, subjectInSentence, subjectsIn } from "@/content/subjects";
import type { GradeId, SubjectId } from "@/content/types";
import { APP_NAME } from "@/lib/brand";
import { DEFAULT_GOAL_MINUTES } from "@/lib/model";
import { FREE_UNITS_PER_COURSE, MAX_CHILDREN, PRICES_BY_CURRENCY, REFUND_DAYS, TRIAL_DAYS, money, perChildMonthly } from "@/lib/plan";

// The questions parents ask on the busiest public pages, answered from content and plan data so every province and
// state gets its own true answers. Each page shows them and gives them to search engines as FAQ structured data.

export interface Faq {
  q: string;
  a: string;
}

const joinAnd = (items: string[]) => (items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}` : (items[0] ?? ""));

/** "Kindergarten to Grade 3" (or one grade), in the framework's English. */
export function gradeRange(f: Framework, from: GradeId, to: GradeId): string {
  return from === to ? gradeLabel(f, from) : gradeSpan({ country: f.country, grades: [from, to] }, true);
}

export interface ReportingBand {
  from: GradeId;
  to: GradeId;
  scheme: ScoringScheme;
}

/** Runs of grades that share a report-card scale, in grade order. */
export function reportingBands(f: Framework): ReportingBand[] {
  const bands: ReportingBand[] = [];
  for (const g of gradesWithContent(f)) {
    const scheme = f.scoringFor(g);
    const last = bands[bands.length - 1];
    if (last && last.scheme.id === scheme.id) last.to = g;
    else bands.push({ from: g, to: g, scheme });
  }
  return bands;
}

/** "provincial", "territory-wide" or "statewide": the reach of a scale that a region doesn't have. */
export function scaleReach(f: Pick<Framework, "country" | "regionKind">): string {
  return f.country === "US" ? "statewide" : f.regionKind === "territory" ? "territory-wide" : "provincial";
}

/** One line per band: "Grades 4 to 6: Limited, Basic, Good and Thorough." */
export function bandLine(f: Framework, b: ReportingBand): string {
  const levels = joinAnd(b.scheme.levels.map((l) => l.label));
  return b.scheme.practiceSteps
    ? `${gradeRange(f, b.from, b.to)}: no ${scaleReach(f)} scale, so ${APP_NAME} describes practice in four steps (${levels}).`
    : `${gradeRange(f, b.from, b.to)}: ${levels}.`;
}

/** The grades that have a course in this subject. */
function gradesWith(f: Framework, subject: SubjectId): GradeId[] {
  return gradesWithContent(f).filter((g) => coursesFor(f, g).some((c) => c.subject === subject));
}

/** "French Immersion from Kindergarten to Grade 9 and Core French from Grade 5 to Grade 9", or "" without French. */
export function frenchLine(f: Framework): string {
  const parts = subjectsIn("fr").flatMap((s) => {
    const grades = gradesWith(f, s);
    return grades.length ? [`${getSubjectMeta(s).seoTitle} from ${gradeRange(f, grades[0], grades[grades.length - 1])}`] : [];
  });
  return joinAnd(parts);
}

function unitCount(f: Framework): number {
  return gradesWithContent(f).reduce((n, g) => n + coursesFor(f, g).reduce((m, c) => m + c.units.length, 0), 0);
}

const core = (f: Framework) => f.subjects.filter((s) => CORE_SUBJECTS.includes(s));

/** /curriculum/{framework}/ */
export function curriculumFaqs(f: Framework): Faq[] {
  const french = frenchLine(f);
  const grades = gradesWithContent(f);
  const units = unitCount(f);
  return [
    {
      q: `What subjects does ${APP_NAME} cover in the ${f.curriculumName}?`,
      a: `${joinAnd(core(f).map((s) => subjectInSentence(subjectSeoTitle(s))))}, from ${gradeSpan(f)}.${french ? ` Parents can also turn on ${french}.` : ""}`,
    },
    {
      q: `How many units are there?`,
      a: `${units.toLocaleString(f.country === "US" ? "en-US" : "en-CA")} units across ${grades.length} grades, about ${Math.round(units / grades.length)} per grade. Each one names the ${f.standardLabel.toLowerCase()} it practises from the ${f.sourceName}, and every unit page shows sample questions.`,
    },
    {
      q: `How do ${f.shortName} report cards describe progress?`,
      a: reportingBands(f).map((b) => bandLine(f, b)).join(" "),
    },
    {
      q: `Is it a report-card mark?`,
      a: `No. ${APP_NAME} shows how your child is practising, in the same words as the report card. Your child's teacher decides the mark.`,
    },
    {
      q: `Can I try it for free?`,
      a: `Yes. Everything is open for ${TRIAL_DAYS} days with no card, and after that the first ${FREE_UNITS_PER_COURSE} units of every course stay free.`,
    },
  ].map((x) => ({ q: say(f, x.q), a: say(f, x.a) }));
}

/** /curriculum/ */
export function curriculumIndexFaqs(frameworks: readonly Framework[]): Faq[] {
  const word = regionWord(frameworks);
  return [
    {
      q: `Which curricula does ${APP_NAME} follow?`,
      a: `${regionList(frameworks)}, from Kindergarten to Grade 9. Each ${word} has its own units, matched to its own curriculum and report card.`,
    },
    {
      q: "How are units matched to the curriculum?",
      a: `Every unit names the learning standard it practises in that ${word}'s official curriculum, and each unit page links to the official source.`,
    },
    {
      q: `What if we move to another ${word}?`,
      a: `Pick the new one for your child in the Parent area. Progress carries over for every unit both curricula share.`,
    },
    {
      q: "Can siblings follow different grades?",
      a: `Yes. One family plan covers up to ${MAX_CHILDREN} children, each with their own grade and ${word}.`,
    },
  ];
}

/** /report-cards/ */
export function reportCardIndexFaqs(frameworks: readonly Framework[]): Faq[] {
  const noScale = frameworks.filter((f) => gradesWithContent(f).every((g) => f.scoringFor(g).practiceSteps));
  const word = regionWord(frameworks);
  return [
    {
      q: `Why do report cards use different words in each ${word}?`,
      a: `Each ${word} sets its own way of reporting, so the same progress can read "Proficient", "Level 3" or "Meeting". The guides here explain each one in plain language, grade by grade.`,
    },
    ...(noScale.length
      ? [
          {
            q: `Which ${word === "province" ? "provinces" : "provinces and states"} have no single report-card scale?`,
            a: `${regionList(noScale)}. Schools there choose how they report, so those guides explain what you are likely to see, and ${APP_NAME} describes practice in four plain steps.`,
          },
        ]
      : []),
    {
      q: `Is ${APP_NAME} practice the same as a report-card mark?`,
      a: "No. It shows how your child is practising, in the report card's words. The teacher decides the mark from much more than practice.",
    },
    {
      q: "How do I talk to the teacher about the report card?",
      a: `Ask what your child can already do, what comes next and how you can help at home. In the ${APP_NAME} Parent area, the Report card view under Reports has a printable conversation sheet for each child, with where practice stands in each subject and questions to ask.`,
    },
  ];
}

/** /guides/{framework}/ */
export function guideHubFaqs(f: Framework): Faq[] {
  const g = guidesFor(f.id);
  const french = frenchLine(f);
  const assessed = g.assessment.grades.filter((x) => gradesWithContent(f).includes(x));
  return [
    ...(assessed.length
      ? [
          {
            q: `When do students write the ${g.assessment.name}?`,
            a: `In ${joinAnd(assessed.map((x) => gradeLabel(f, x)))}. It is separate from the report card. ${g.assessment.hubBlurb}`,
          },
        ]
      : []),
    {
      q: `What are the ${g.competencies.label}?`,
      a: g.competencies.hubBlurb,
    },
    ...(french
      ? [
          {
            q: `When does French start in ${f.region}?`,
            a: `${APP_NAME} offers ${french}, following the ${f.curriculumName}. Both are optional and parents turn them on per child.`,
          },
        ]
      : []),
    {
      q: "How much should my child practise at home?",
      a: `About ${DEFAULT_GOAL_MINUTES.little} minutes a day in Kindergarten and Grade 1, and ${DEFAULT_GOAL_MINUTES.other} minutes from Grade 2. Short, regular practice on the skills the teacher flags works better than long sessions.`,
    },
    {
      q: "Are the practice sheets free?",
      a: "Yes. Each grade has one free printable sheet per subject, with an answer key. Print it or work through it on screen.",
    },
  ].map((x) => ({ q: say(f, x.q), a: say(f, x.a) }));
}

/** /pricing/ */
export function pricingFaqs(usd: boolean): Faq[] {
  const cad = PRICES_BY_CURRENCY.CAD;
  const us = PRICES_BY_CURRENCY.USD;
  const perChild = `${money(perChildMonthly("CAD", "year"), "CAD")} a month per child${usd ? ` (${money(perChildMonthly("USD", "year"), "USD")} in the US)` : ""}`;
  return [
    {
      q: "How much does it cost per child?",
      a: `With ${MAX_CHILDREN} children on the yearly plan, it works out to ${perChild}. One plan covers up to ${MAX_CHILDREN} children.`,
    },
    {
      q: "What is the difference between monthly and yearly?",
      a: `The same plan, billed differently: ${cad.month.label} a month or ${cad.year.label} a year in Canada${usd ? `, and ${us.month.label} or ${us.year.label} in the US` : ""}. Yearly saves about a third.`,
    },
    {
      q: "Do I need a card for the free trial?",
      a: `No. The first ${TRIAL_DAYS} days have everything switched on, and nothing is charged when the trial ends.`,
    },
    {
      q: "What stays free after the trial?",
      a: `The first ${FREE_UNITS_PER_COURSE} units of every course, in every grade. Progress is never deleted, so it is waiting if you subscribe later.`,
    },
    {
      q: "Can my children be in different grades?",
      a: "Yes. Each child has their own grade, curriculum and settings, and every grade from Kindergarten to Grade 9 is included.",
    },
    {
      q: "Can I get a refund?",
      a: `Yes. Ask within ${REFUND_DAYS} days of any payment, including a renewal, and we refund it in full.`,
    },
  ];
}

import { hashSeed, withSeed } from "@/content/random";
import type { GradeId, Visual } from "@/content/types";
import { gradeSlug } from "@/content/subjects";
import { worksheetGradeLabel, worksheetPath, worksheetSkills } from "./worksheets";

// "Is my child ready for Grade N math?" (/ready/): a free, no-sign-up check of ten tap-to-answer questions from the
// end of the grade before, with a plain next step. Like the worksheets, nothing here is tied to a province or state:
// the questions come from the first framework's units, units about money, coins, tax or budgets are left out, and
// only questions that read as text (no pictures, shapes or coins) are used. It is not timed, because a clock is
// the quickest way to make a child freeze, and it says what it is: a quick look at practice, not a mark.

/** Questions that tie to one country, money or place are left out, so a check reads the same for a family anywhere. */
const REGIONAL = /\$|¢|canad|province|territor|ontario|alberta|\bbc\b|toonie|loonie|dollar|cents?\b/i;

export const READY_QUESTIONS = 10;

/** The grades that have a check: Grade 2 (from Grade 1) to Grade 9; Kindergarten is mostly pictures, so Grade 1 has no text-only check (from Grade 8). */
export const READY_GRADES: GradeId[] = ["2", "3", "4", "5", "6", "7", "8", "9"];

const PREVIOUS: Partial<Record<GradeId, GradeId>> = { "2": "1", "3": "2", "4": "3", "5": "4", "6": "5", "7": "6", "8": "7", "9": "8" };

export const readyPath = {
  hub: () => "/ready/",
  grade: (g: GradeId) => `/ready/${gradeSlug(g)}/`,
};

export interface ReadyQuestion {
  prompt: string;
  choices: { id: string; label: string }[];
  /** A picture a text line can show (an equation, emoji or counting dots), drawn above the choices. */
  picture?: string;
  /** A typed answer (no choices): what counts as right, and text shown after the box. */
  typed?: { accept: string[]; suffix?: string };
  answer: string;
  hint: string;
  /** The skill (unit) it comes from, so a missed question can point at the right practice. */
  skill: string;
  /** The free worksheet for that skill. */
  skillPath: string;
}

export const previousGrade = (g: GradeId): GradeId | undefined => PREVIOUS[g];

/** Ten questions, spread across the previous grade's skills, identical on every build. */
/** Pictures that read as plain text; anything else (shapes, coins, charts) is left out. */
function pictureText(v: Visual | undefined): string | null | undefined {
  if (!v) return undefined;
  if (v.type === "equation") return v.text;
  if (v.type === "emoji") return v.caption ? `${v.emoji} ${v.caption}` : v.emoji;
  if (v.type === "emojiRow") return [...v.items, ...(v.showBlank ? ["?"] : [])].join(" ");
  if (v.type === "dots" && v.count <= 20) return Array.from({ length: v.count }, () => v.emoji ?? "●").join(" ");
  return null;
}

export function readinessQuestions(grade: GradeId): ReadyQuestion[] {
  const prev = PREVIOUS[grade];
  if (!prev) return [];
  const pools = worksheetSkills(prev, "math").map((s) => {
    const qs = withSeed(hashSeed(`ready:${grade}:${s.unit.id}`), () => [...s.unit.generate({ difficulty: 2 }), ...s.unit.generate({ difficulty: 1 })]);
    const ok: ReadyQuestion[] = [];
    for (const q of qs) {
      const picture = "visual" in q ? pictureText(q.visual) : undefined;
      if (picture === null) continue;
      if (q.kind === "input" && q.keypad !== "fraction" && !q.suffix?.includes("¢") && !REGIONAL.test(JSON.stringify(q))) {
        ok.push({ prompt: q.prompt, picture: picture ?? undefined, choices: [], typed: { accept: [q.answer, ...(q.accept ?? [])], suffix: q.suffix }, answer: q.answer, hint: q.hint, skill: s.unit.title, skillPath: worksheetPath.skill(prev, s.unit.id) });
        continue;
      }
      if (q.kind !== "choice" || q.choices.length < 3 || q.choices.some((c) => c.shape || c.coin !== undefined || !c.label)) continue;
      if (REGIONAL.test(JSON.stringify(q))) continue;
      ok.push({
        prompt: q.prompt,
        picture: picture ?? undefined,
        choices: q.choices.map((c) => ({ id: c.id, label: c.emoji ? `${c.emoji} ${c.label}` : c.label })),
        answer: q.answer,
        hint: q.hint,
        skill: s.unit.title,
        skillPath: worksheetPath.skill(prev, s.unit.id),
      });
    }
    return ok;
  });
  const out: ReadyQuestion[] = [];
  const seen = new Set<string>();
  // One from each skill in turn, then more rounds while there are fewer than ten skills.
  for (let round = 0; round < READY_QUESTIONS && out.length < READY_QUESTIONS; round++) {
    for (const pool of pools) {
      if (out.length >= READY_QUESTIONS) break;
      const q = pool.filter((x) => !seen.has(x.prompt))[0];
      if (!q) continue;
      seen.add(q.prompt);
      out.push(q);
    }
  }
  return out;
}

export type ReadyBand = "ready" | "close" | "partly" | "reset";

/** Where a score lands, on first-try answers out of the check's length. */
export function readyBand(right: number, total: number): ReadyBand {
  const pct = total ? (right / total) * 100 : 0;
  return pct >= 90 ? "ready" : pct >= 70 ? "close" : pct >= 40 ? "partly" : "reset";
}

export const READY_BAND_TEXT: Record<ReadyBand, { title: string; next: string }> = {
  ready: { title: "Looks ready", next: "The skills from last year look solid. A little regular practice will keep them fresh as new ideas arrive." },
  close: { title: "Nearly there", next: "Most of last year's skills are in place. A few short sessions on the ones below should close the gap." },
  partly: { title: "Worth a short review", next: "Some of last year's skills need another look. Start with the ones below, a little at a time, before adding new work." },
  reset: { title: "Start with a calm reset", next: "That is useful to know, and very fixable. Go back to last year's skills below, a few questions a day, and build confidence first." },
};

export const gradeWord = (g: GradeId) => worksheetGradeLabel(g);

export const readyFaqs = (grade: GradeId): { q: string; a: string }[] => {
  const prev = PREVIOUS[grade];
  const now = worksheetGradeLabel(grade);
  const before = prev ? worksheetGradeLabel(prev) : "";
  return [
    { q: `What does this ${now} readiness check cover?`, a: `Ten questions on the main ideas from ${before} math, one or two from each skill. It is a quick look, not a full assessment.` },
    { q: "Is it timed?", a: "No. Children answer at their own pace. A timer makes many children freeze, and speed is not what we are looking for here." },
    { q: "What if my child gets a low score?", a: `A low score only shows where to start. Use the skills listed after the check and the free ${before} worksheets, a few questions at a time, then try the check again in a couple of weeks.` },
    { q: "Does this replace what the teacher says?", a: "No. It is a short practice check you can do at home. Your child's teacher decides how they are doing in class." },
  ];
};

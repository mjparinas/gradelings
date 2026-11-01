import type { UnitRef } from "@/content";
import { hashSeed, withSeed } from "@/content/random";
import { ageBandFor } from "@/content/subjects";
import type { GradeId, Question, SubjectId } from "@/content/types";
import { difficultyFor } from "./adaptive";
import type { Derived } from "./derive";
import { unitLevel } from "./proficiency";

// A printable practice sheet made for one child, from the units they find trickiest in practice, with an
// answer key on its own page. A family-plan feature (`canUse(family, "practiceSheets")` in plan.ts), shown under
// Reports > Practice sheet. Nothing is stored: the units come from the derived stats and the questions from
// each unit's own generator, seeded by child, day and how many times "New questions" was tapped, so the sheet
// stays the same while it's open and printing. It is practice, not a report-card mark.

/** Questions on a sheet: fewer for little kids, who work through it with a grown-up. */
export const SHEET_QUESTIONS = { little: 6, other: 10 } as const;

/** The most units one sheet draws from, so each gets at least two questions. */
export const SHEET_UNITS = 5;

/** Kinds that work on paper. Building with blocks, shading parts and placing a marker need the screen. */
const PRINTABLE = new Set<Question["kind"]>(["choice", "input", "order", "sort", "coins"]);

export const printable = (q: Question): boolean => PRINTABLE.has(q.kind);

export interface SheetItem {
  question: Question;
  unitKey: string;
  unitTitle: string;
  subject: SubjectId;
  /** Seed text for anything the printed question shuffles (order items), so screen and paper agree. */
  seed: string;
}

export interface PracticeSheet {
  /** The units the questions come from, trickiest first. */
  units: UnitRef[];
  items: SheetItem[];
}

/**
 * The child's trickiest started units: units still at the first two levels with a few tries come first, then
 * everything else started and not yet at the top level, each group by smoothed accuracy (lowest first). A unit
 * already at the top level is left out: there is nothing tricky to print for it.
 */
export function sheetUnits(refs: UnitRef[], derived: Derived, n = SHEET_UNITS): UnitRef[] {
  const started = refs.filter((r) => (derived.units[r.key]?.attempts ?? 0) > 0 && unitLevel(derived.units[r.key]) < 3);
  const mastery = (r: UnitRef) => derived.units[r.key]?.mastery ?? 0;
  const tricky = (r: UnitRef) => unitLevel(derived.units[r.key]) <= 1 && derived.units[r.key].attempts >= 3;
  return [...started.filter(tricky).sort((a, b) => mastery(a) - mastery(b)), ...started.filter((r) => !tricky(r)).sort((a, b) => mastery(a) - mastery(b))].slice(0, n);
}

export interface SheetInput {
  refs: UnitRef[];
  derived: Derived;
  grade: GradeId;
  /** Child id, day and "New questions" count: the same seed gives the same sheet. */
  seed: string;
  /** Subjects switched on for the child; others are left out even if practised before. */
  subjects?: SubjectId[];
}

export function buildPracticeSheet({ refs, derived, grade, seed, subjects }: SheetInput): PracticeSheet {
  const count = ageBandFor(grade) === "little" ? SHEET_QUESTIONS.little : SHEET_QUESTIONS.other;
  const allowed = subjects ? refs.filter((r) => subjects.includes(r.course.subject)) : refs;
  const units = sheetUnits(allowed, derived);
  const pools = units
    .map((ref) => {
      const difficulty = difficultyFor(derived.units[ref.key]?.mastery ?? 0, "review");
      const key = `${seed}:${ref.key}`;
      const qs = withSeed(hashSeed(`sheet:${key}`), () => ref.unit.generate({ difficulty })).filter(printable);
      // No two questions read the same, and a passage or picture is printed once (on paper a repeated story is a wasted page).
      const seen = new Set<string>();
      const fresh = (text: string) => (seen.has(text) ? false : (seen.add(text), true));
      return { ref, key, qs: qs.filter((q) => fresh(`p:${q.prompt}`) && (!q.visual || fresh(`v:${JSON.stringify(q.visual)}`))) };
    })
    .filter((p) => p.qs.length > 0);

  // Round-robin, trickiest unit first, so the hardest unit gets the most questions when the count doesn't divide.
  const items: SheetItem[] = [];
  for (let round = 0; items.length < count && pools.some((p) => p.qs[round]); round++) {
    for (const p of pools) {
      if (items.length >= count) break;
      const q = p.qs[round];
      if (q) items.push({ question: q, unitKey: p.ref.key, unitTitle: p.ref.unit.title, subject: p.ref.course.subject, seed: `${p.key}#${round}` });
    }
  }
  return { units: pools.map((p) => p.ref), items };
}

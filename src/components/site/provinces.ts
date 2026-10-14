import { COUNTRIES, COUNTRY_ORDER, countryOf } from "@/lib/country";
import type { Framework } from "@/content/frameworks";
import { SUBJECTS, subjectInSentence } from "@/content/subjects";
import type { GradeId, SubjectId } from "@/content/types";
import { subjectSeoTitle } from "./curriculum";

/** Subjects in the same order as the subject list, so a new province doesn't reshuffle the sentence. */
function orderedSubjects(ids: Iterable<SubjectId>): SubjectId[] {
  const have = new Set(ids);
  return SUBJECTS.map((s) => s.id).filter((id) => have.has(id));
}

function joinAnd(items: readonly string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** "math, English language arts, science and social studies" */
export function subjectList(ids: readonly SubjectId[]): string {
  const names = orderedSubjects(ids).map((id) => subjectInSentence(subjectSeoTitle(id)));
  return joinAnd(names);
}

/** "British Columbia, Ontario and the Northwest Territories" */
export function regionList(frameworks: readonly Framework[]): string {
  return joinAnd(frameworks.map((f) => (f.region === "Northwest Territories" ? "the Northwest Territories" : f.region)));
}

export interface KidStep {
  icon: string;
  kidLabel: string;
  atHome: string;
}

function mostCommon(values: readonly string[]): string | undefined {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  let best: string | undefined;
  let n = 0;
  for (const [value, count] of counts) {
    if (count > n) {
      best = value;
      n = count;
    }
  }
  return best;
}

/**
 * The four practice steps kids see in every province. The at-home note is the one most
 * provinces share, so one province's official report-card words don't become the homepage.
 */
export function kidPracticeSteps(frameworks: readonly Framework[]): KidStep[] {
  const first = frameworks[0]?.scoringFor("3").levels ?? [];
  return first.map((level, i) => {
    const notes = frameworks.map((f) => f.scoringFor("3").levels[i]?.atHome).filter((note): note is string => Boolean(note));
    return { icon: level.icon, kidLabel: level.kidLabel, atHome: mostCommon(notes) ?? level.atHome };
  });
}

/** A subject set that only some provinces include. */
export interface SubjectGap {
  subjects: SubjectId[];
  /** Provinces that include every subject in this gap. */
  included: Framework[];
  /** Provinces that are missing at least one of them. */
  missing: Framework[];
  /**
   * "except" when most provinces include the subjects ("everywhere except Nunavut").
   * "only" when naming the provinces that have them is the shorter sentence.
   */
  style: "except" | "only";
}

export interface ProvinceCoverage {
  /** Subjects every province includes. */
  sharedSubjects: SubjectId[];
  /** Set when every province starts and ends on the same grade. */
  range: { from: GradeId; to: GradeId } | null;
  gaps: SubjectGap[];
}

/**
 * Collapses the homepage province list. Subjects that every province shares are
 * stated once; subjects that only some provinces include stay attached to those provinces.
 */
export function provinceCoverage(frameworks: readonly Framework[]): ProvinceCoverage {
  const sharedSubjects = orderedSubjects(SUBJECTS.map((s) => s.id).filter((id) => frameworks.every((f) => f.subjects.includes(id))));
  const extra = orderedSubjects(SUBJECTS.map((s) => s.id).filter((id) => frameworks.some((f) => f.subjects.includes(id)) && !sharedSubjects.includes(id)));

  // Group extras that the same provinces include, so French Immersion and Core French stay one phrase.
  const byWho = new Map<string, { subjects: SubjectId[]; included: Framework[] }>();
  for (const id of extra) {
    const included = frameworks.filter((f) => f.subjects.includes(id));
    const key = included.map((f) => f.id).join(",");
    const group = byWho.get(key) ?? { subjects: [], included };
    group.subjects.push(id);
    byWho.set(key, group);
  }

  const gaps: SubjectGap[] = [...byWho.values()].map((group) => {
    const missing = frameworks.filter((f) => !group.included.includes(f));
    return {
      subjects: group.subjects,
      included: group.included,
      missing,
      style: missing.length < group.included.length ? "except" : "only",
    };
  });

  const first = frameworks[0];
  const from = first?.grades[0];
  const to = first ? first.grades[first.grades.length - 1] : undefined;
  const sameRange = Boolean(from && to && frameworks.every((f) => f.grades[0] === from && f.grades[f.grades.length - 1] === to));

  return {
    sharedSubjects,
    range: sameRange && from && to ? { from, to } : null,
    gaps,
  };
}

/** True once a US curriculum is offered, so public pages show US dollars beside Canadian dollars. */
export function offersUsd(frameworks: readonly Pick<Framework, "country">[]): boolean {
  return frameworks.some((f) => countryOf(f).currency === "USD");
}

export interface CountryGroup {
  country: Framework["country"];
  /** Heading for a picker: "Canada" or "United States". */
  heading: string;
  frameworks: Framework[];
}

/** Frameworks grouped for pickers: Canadian provinces and territories first, then US states. Empty groups are left out. */
export function byCountry(frameworks: readonly Framework[]): CountryGroup[] {
  const groups: CountryGroup[] = COUNTRY_ORDER.map((country) => ({ country, heading: COUNTRIES[country].name, frameworks: frameworks.filter((f) => f.country === country) }));
  return groups.filter((g) => g.frameworks.length > 0);
}

/** "province", or "province or state" once a US state is offered. For sentences like "Pick their grade and province". */
export function regionWord(frameworks: readonly Pick<Framework, "country">[]): string {
  return offersUsd(frameworks) ? "province or state" : "province";
}

/**
 * Where the curriculum is offered, for marketing copy: "12 provinces and territories", or
 * "12 Canadian provinces and territories and Washington State" once a state is offered, "..., plus Washington and Oregon"
 * with two to four, and "... and 5 US states" after that.
 */
export function regionSummary(frameworks: readonly Framework[]): string {
  const ca = frameworks.filter((f) => f.country === "CA").length;
  const us = frameworks.filter((f) => f.country === "US");
  if (!us.length) return `${ca} provinces and territories`;
  if (us.length > 1 && us.length <= 4) {
    const states = joinAnd(us.map((f) => f.region));
    return ca ? `${ca} Canadian provinces and territories, plus ${states}` : states;
  }
  const states = us.length === 1 ? `${us[0].region} State` : `${us.length} US states`;
  return ca ? `${ca} Canadian provinces and territories and ${states}` : states;
}

/** The currencies public pages list prices in: Canadian dollars, plus US dollars once a US curriculum is offered. */
export function siteCurrencies(frameworks: readonly Pick<Framework, "country">[]): ("CAD" | "USD")[] {
  const offered = new Set(frameworks.map((f) => countryOf(f).currency));
  return [...new Set(["CAD" as const, ...COUNTRY_ORDER.map((c) => COUNTRIES[c].currency)])].filter((c) => c === "CAD" || offered.has(c));
}

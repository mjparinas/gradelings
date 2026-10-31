import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { FrameworkId, GradeId, SubjectId } from "./types";

// What the framework contract suite (contract.test.ts) needs to know about one framework that its manifest doesn't say:
// how to check a citation against the official standards, which units are its own, and which places a unit borrowed
// from elsewhere must not name. Each framework's folder has a contract.ts exporting one. Test-only: it reads the
// official standards from docs/research/, so the apps never import it.

/** One unit's citation for a framework, with where it sits. */
export interface Citation {
  grade: GradeId;
  subject: SubjectId;
  unitId: string;
  /** The unit's standards text for this framework: "citation · plain description". */
  standard: string;
}

export interface FrameworkContract {
  /**
   * What is wrong with one citation (an empty list when it cites real standards for its grade and subject).
   * Null only where there is nothing official to check against; say why beside it.
   */
  cite: ((c: Citation) => string[]) | null;
  /**
   * The same check for Pre-K units, against the framework's early-learning document, which is a different source from its
   * school curriculum (docs/research/<folder>/prek/outcomes.json, read with `preKCite`). Required once the framework
   * offers Pre-K.
   */
  preK?: (c: Citation) => string[];
  /** Units written for this framework have ids starting with this ("wa-"). */
  ownPrefix?: string;
  /**
   * The frameworks whose own units (the ones with their `ownPrefix`) this framework may use. It is kept here, with the
   * framework that does the borrowing, so a new state lists what it borrows in its own file and no other state's
   * contract has to change.
   */
  adoptsFrom?: FrameworkId[];
  /** Places a unit borrowed from another framework must not name, so no other province's names reach this one's classrooms. */
  foreign?: RegExp;
  /**
   * A US state's rule for other states' places. Every line of a unit's title, blurb, parent note and a spread of its
   * questions is tested against `pattern` (after taking out George and Martha Washington), except in the state's own
   * units, the units in `exempt` and social studies in `historyGrades`, which name states where the history does.
   */
  otherStates?: {
    pattern: RegExp;
    /** Units that may name other states anyway, with the reason beside them (a 50 states unit, Ruby Bridges's story). */
    exempt?: string[];
    /** Social studies grades about US history and civics. */
    historyGrades?: GradeId[];
    /** Check the state's own units too (for a narrow pattern, such as Washington State alone). */
    includeOwn?: boolean;
    /** Check only the state's own parent notes: a shared unit carries the first framework's note. */
    ownNotesOnly?: boolean;
    /** More people taken out before testing, beside George and Martha Washington ("Booker T."). */
    people?: string[];
  };
  /**
   * A US state's rule against borrowing another state's units about its Tribes: no unit it borrowed from another state
   * (an id with another state's prefix, not shared with BC) may match `words`.
   */
  tribal?: {
    words: RegExp;
    /** Which borrowed units are checked, by id; by default every id with another two-letter prefix. */
    from?: RegExp;
    /** Test the unit's id, title, blurb and parent note rather than a spread of its questions. */
    card?: boolean;
  };
  /**
   * The framework's plan, for frameworks that place units from one (see placement.ts): "grade/subject" to entries that
   * start [unit id, "share" | "adopt" | "lift"]. Checked: each unit is listed once per course and exists there with this
   * framework's standards, and "share" is used for BC units only.
   */
  plan?: Record<string, readonly (readonly [string, string, ...unknown[]])[]>;
}

/** Reads an official standards file from docs/research/<folder>/. */
export function research<T>(path: string): T {
  return JSON.parse(readFileSync(join(__dirname, "../../docs/research", path), "utf8")) as T;
}

/** The citation part of a standard: "4.NBT.A.1; 4.NBT.A.2 · reading big numbers" gives "4.NBT.A.1; 4.NBT.A.2". */
export const head = (standard: string) => standard.split(" · ")[0];

/** Collects problems: `check(ok, message)` records the message when ok is false. */
export function problems(): { check: (ok: unknown, message: string) => void; list: string[] } {
  const list: string[] = [];
  return { list, check: (ok, message) => void (ok ? undefined : list.push(message)) };
}

/**
 * The Pre-K citation check: codes from the framework's early-learning document, built into
 * docs/research/<folder>/prek/outcomes.json as {"pk/<subject>": [{idx, text}]}.
 */
export function preKCite(folder: string, region: string): (c: Citation) => string[] {
  return codeCite(research<Record<string, { idx: string }[]>>(`${folder}/prek/outcomes.json`), `${region} early-learning`);
}

/**
 * A citation check for standards written "CODES · plain text" with codes joined by "; " (the US states): every code must
 * be a standard of the unit's own grade and subject, and the plain text must be there.
 */
export function codeCite(outcomes: Record<string, { idx: string }[]>, region: string): (c: Citation) => string[] {
  return ({ grade, subject, standard }) => {
    const [codes, text] = standard.split(" · ");
    const known = new Set((outcomes[`${grade}/${subject}`] ?? []).map((o) => o.idx));
    const out = text?.trim() ? [] : ["needs a plain description after the codes"];
    for (const code of codes.split("; ")) if (!known.has(code)) out.push(`cites "${code}", not a ${grade}/${subject} ${region} standard`);
    return out;
  };
}

/** What the shared Spanish course may cite (docs/research/spanish/outcomes.json, built by its build_outcomes.py). */
interface SpanishSources {
  wrs: string[];
  levels: string[];
  bc: Record<string, string>;
  ab: Record<string, string>;
  mb: Record<string, string>;
}

/**
 * The citation check for the shared Spanish course, the same for every framework (see ../spanish): British Columbia's
 * Content for its grade (Grades 5 to 9), Alberta's Nine-Year Program clusters (Grades 4 to 9), Manitoba's numbered
 * strands (Grades 7 to 9), and everywhere else World-Readiness Standards with the proficiency sublevel for the grade.
 */
export function spanishCite(framework: FrameworkId): (c: Citation) => string[] {
  const src = research<SpanishSources>("spanish/outcomes.json");
  const flat = (s: string) => s.toLowerCase().replace(/\s+/g, " ");
  return ({ grade, standard }) => {
    // Yukon and the Northwest Territories follow BC's curriculum (followBcGrade), so they carry BC's citations.
    const bc = framework === "ca-bc" || framework === "ca-yt" || framework === "ca-nt";
    if (bc && src.bc[grade]) return flat(src.bc[grade]).includes(flat(standard)) ? [] : [`"${standard}" is not in BC's Grade ${grade} Spanish content`];
    const [codes, text] = standard.split(" · ");
    const out = text?.trim() ? [] : ["needs a plain description after the codes"];
    const list = codes.split("; ");
    const known =
      framework === "ca-ab" && grade !== "3" ? Object.keys(src.ab) : framework === "ca-mb" && ["7", "8", "9"].includes(grade) ? Object.keys(src.mb) : [...src.wrs, ...src.levels];
    for (const code of list) if (!known.includes(code)) out.push(`cites "${code}", not a standard ${framework} uses for Grade ${grade} Spanish`);
    if (known.includes(src.levels[0])) {
      const level = list.filter((c) => src.levels.includes(c));
      if (level.length !== 1) out.push("names one proficiency sublevel");
    }
    return out;
  };
}

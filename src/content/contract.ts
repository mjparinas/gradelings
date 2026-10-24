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
  /** Units written for this framework have ids starting with this ("wa-"). */
  ownPrefix?: string;
  /** Other frameworks allowed to use this framework's own units (Oregon, California, New York, Texas, Maine, Minnesota, Alaska, Alabama, Arizona, Arkansas, Florida, Illinois, Colorado, Pennsylvania, Georgia, Ohio, New Jersey, Indiana and Tennessee adopt Washington's). */
  ownSharedWith?: FrameworkId[];
  /** Places a unit borrowed from another framework must not name, so no other province's names reach this one's classrooms. */
  foreign?: RegExp;
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

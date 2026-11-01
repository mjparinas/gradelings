// What a family would lose without the plan, said with their own child's units ("Maya has started 9 units. 6 of
// them lock when the trial ends: Fractions, Place value and 4 more."). Used by the upgrade banner, the
// Subscription page and the trial emails (flag `personal-paywall`). Pure, so the server and the parent area agree.

import { unitIndexIn, type UnitRef } from "@/content";
import type { FrameworkId } from "@/content/types";
import { FREE_UNITS_PER_COURSE } from "./plan";

/** One unit row with how many answers the child has given in it (a report's `units`). */
export interface StakeRow {
  ref: UnitRef;
  attempts: number;
}

/** A child's started units, and the titles of those the free plan doesn't open (past the first few of their course). */
export interface ChildStake {
  name: string;
  started: number;
  locking: string[];
}

/** Started units the free plan keeps closed in the child's curriculum, most practised first (the same count as `useAllowed`). */
export function lockingUnits(rows: StakeRow[], framework: FrameworkId): UnitRef[] {
  return rows
    .filter((r) => r.attempts > 0 && unitIndexIn(r.ref, framework) >= FREE_UNITS_PER_COURSE)
    .sort((a, b) => b.attempts - a.attempts)
    .map((r) => r.ref);
}

export function stakeFor(name: string, framework: FrameworkId, rows: StakeRow[]): ChildStake {
  const seen = new Set<string>();
  const unique = rows.filter((r) => !seen.has(r.ref.key) && seen.add(r.ref.key));
  return { name, started: unique.filter((r) => r.attempts > 0).length, locking: lockingUnits(unique, framework).map((r) => r.unit.title) };
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/** "Fractions, Place value and 4 more". */
export function titleList(titles: string[], shown = 2): string {
  const head = titles.slice(0, shown);
  const rest = titles.length - head.length;
  if (rest > 0) return `${head.join(", ")} and ${rest} more`;
  if (head.length <= 1) return head.join("");
  return `${head.slice(0, -1).join(", ")} and ${head[head.length - 1]}`;
}

/**
 * One sentence about what this child would lose, or null when nothing they started would lock.
 * "trial": the trial is still on; "free": the trial has ended and these units are already closed.
 */
export function stakeLine(stake: ChildStake, when: "trial" | "free"): string | null {
  const n = stake.locking.length;
  if (n === 0) return null;
  const list = titleList(stake.locking);
  if (when === "free") return `${stake.name} has ${plural(n, "started unit")} waiting for the family plan: ${list}.`;
  const which = n === stake.started ? (n === 1 ? "It locks" : `All ${n} lock`) : `${n} of them lock`;
  return `${stake.name} has started ${plural(stake.started, "unit")}. ${which} when the trial ends: ${list}.`;
}

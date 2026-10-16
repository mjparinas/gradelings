"use client";

import { useMemo } from "react";
import { getUnitRef, type UnitRef } from "@/content";
import { useActiveProfile, useStore } from "@/lib/store";

export interface Assigned {
  ref: UnitRef;
  className: string;
  /** When the teacher would like it done (ms since epoch), if they said. */
  dueAt?: number;
  /** Homework: how many questions the teacher asked for, if they said. */
  goal?: number;
  /** When the unit was assigned, so homework counts only questions answered since. */
  since?: number;
}

/**
 * Units the active child's teacher assigned, in the teacher's order. Comes from the last sync, so it
 * works offline. Units from a grade that hasn't loaded are skipped rather than guessed at.
 */
export function useClasswork(): Assigned[] {
  const profile = useActiveProfile();
  const classwork = useStore((s) => s.classwork);
  return useMemo(() => {
    const seen = new Set<string>();
    const out: Assigned[] = [];
    for (const c of classwork) {
      if (c.profileId !== profile?.id) continue;
      for (const key of c.unitKeys) {
        const ref = getUnitRef(key, profile?.framework);
        if (!ref || seen.has(key)) continue;
        seen.add(key);
        out.push({ ref, className: c.className, dueAt: c.due?.[key], goal: c.goal?.[key], since: c.since?.[key] });
      }
    }
    return out;
  }, [classwork, profile?.id, profile?.framework]);
}

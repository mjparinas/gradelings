"use client";

import { useCallback } from "react";
import { unitIndexIn, type UnitRef } from "@/content";
import { DEFAULT_FRAMEWORK } from "@/content/frameworks";
import { unitOpen } from "@/lib/plan";
import { useActiveProfile, useStore } from "@/lib/store";

/** Which units the family's plan opens (all of them on premium or during the trial), counted in the child's own curriculum. */
export function useAllowed(): (ref: UnitRef) => boolean {
  const family = useStore((s) => s.family);
  const framework = useActiveProfile()?.framework ?? DEFAULT_FRAMEWORK;
  return useCallback((ref: UnitRef) => unitOpen(family, unitIndexIn(ref, framework)), [family, framework]);
}

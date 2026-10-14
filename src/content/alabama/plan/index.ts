import type { Entry } from "../kit";
import { PLAN_LANGUAGE } from "./language";
import { PLAN_MATH } from "./math";
import { PLAN_SCIENCE } from "./science";
import { PLAN_SOCIAL } from "./social";
import { PLAN_SOCIAL_ALABAMA } from "./social-alabama";

/** Every Alabama plan entry, keyed "<grade>/<subject>". */
export const PLAN: Record<string, Entry[]> = {
  ...PLAN_MATH,
  ...PLAN_LANGUAGE,
  ...PLAN_SCIENCE,
  ...PLAN_SOCIAL,
  ...PLAN_SOCIAL_ALABAMA,
};

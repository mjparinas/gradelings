import type { PlanEntry } from "../../placement";
import { FOCUS_LANGUAGE, PLAN_LANGUAGE } from "./language";
import { FOCUS_MATH, PLAN_MATH } from "./math";
import { FOCUS_SCIENCE, PLAN_SCIENCE } from "./science";
import { FOCUS_SOCIAL, PLAN_SOCIAL } from "./social";
import { FOCUS_SOCIAL_TEXAS, PLAN_SOCIAL_TEXAS } from "./social-texas";

/** Every Texas plan entry, keyed "<grade>/<subject>". Grades 4 and 7 social studies (Texas history) are in ./social-texas. */
export const PLAN: Record<string, readonly PlanEntry[]> = {
  ...PLAN_MATH,
  ...PLAN_LANGUAGE,
  ...PLAN_SCIENCE,
  ...PLAN_SOCIAL,
  ...PLAN_SOCIAL_TEXAS,
};

/** What each Texas course focuses on, shown to parents as the course overview ("Focus areas"). */
export const FOCUS: Record<string, string[]> = {
  ...FOCUS_MATH,
  ...FOCUS_LANGUAGE,
  ...FOCUS_SCIENCE,
  ...FOCUS_SOCIAL,
  ...FOCUS_SOCIAL_TEXAS,
};

import type { Entry } from "../kit";
import { PLAN_LANGUAGE } from "./language";
import { PLAN_MATH } from "./math";
import { PLAN_SCIENCE } from "./science";
import { PLAN_SOCIAL } from "./social";

/** Every Michigan plan entry, keyed "<grade>/<subject>". */
export const PLAN: Record<string, Entry[]> = { ...PLAN_MATH, ...PLAN_LANGUAGE, ...PLAN_SCIENCE, ...PLAN_SOCIAL };

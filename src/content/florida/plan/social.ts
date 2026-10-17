import type { Entry } from "../kit";
import { PLAN_SOCIAL_ELEMENTARY } from "./social-k4";
import { PLAN_SOCIAL_MIDDLE } from "./social-59";

// Florida social studies (Next Generation Sunshine State Standards): Kindergarten to Grade 4 in ./social-k4.ts, Grades 5
// to 9 in ./social-59.ts.
export const PLAN_SOCIAL: Record<string, Entry[]> = { ...PLAN_SOCIAL_ELEMENTARY, ...PLAN_SOCIAL_MIDDLE };

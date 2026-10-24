import type { Entry } from "../kit";
import { PLAN_SOCIAL_ELEMENTARY } from "./social-k4";
import { PLAN_SOCIAL_MIDDLE } from "./social-59";

/** Pennsylvania social studies, Kindergarten to Grade 4 and Grades 5 to 9, keyed "<grade>/social". */
export const PLAN_SOCIAL: Record<string, Entry[]> = { ...PLAN_SOCIAL_ELEMENTARY, ...PLAN_SOCIAL_MIDDLE };

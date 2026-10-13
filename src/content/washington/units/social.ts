import type { GradeId, Unit } from "../../types";
import { OWN_SOCIAL_1 } from "./social-k4-g1";
import { OWN_SOCIAL_2 } from "./social-k4-g2";
import { OWN_SOCIAL_3 } from "./social-k4-g3";
import { OWN_SOCIAL_4A } from "./social-k4-g4a";
import { OWN_SOCIAL_4B } from "./social-k4-g4b";
import { OWN_SOCIAL_K } from "./social-k4-k";

// Washington-only social units (`wa-` ids), Kindergarten to Grade 4. Grades 5 to 9 are in ./social-upper.
export const OWN_SOCIAL: Partial<Record<GradeId, Unit[]>> = {
  k: OWN_SOCIAL_K,
  "1": OWN_SOCIAL_1,
  "2": OWN_SOCIAL_2,
  "3": OWN_SOCIAL_3,
  "4": [...OWN_SOCIAL_4A, ...OWN_SOCIAL_4B],
};

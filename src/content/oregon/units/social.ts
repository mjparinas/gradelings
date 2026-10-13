import type { GradeId, Unit } from "../../types";
import { historyDetective5, reconstruction8, worldMaps6 } from "./social-copies";
import { OWN_SOCIAL_4 } from "./social-g4";
import { OWN_SOCIAL_5 } from "./social-g5";
import { OWN_SOCIAL_6, OWN_SOCIAL_7 } from "./social-g67";
import { OWN_SOCIAL_8 } from "./social-g8";
import { OWN_SOCIAL_9 } from "./social-g9";
import { OWN_SOCIAL_1, OWN_SOCIAL_2, OWN_SOCIAL_3, OWN_SOCIAL_K } from "./social-k3";

// Oregon-only social units, per grade. Most of Kindergarten to Grade 3, 6 and 8 is shared or adopted (../plan/social.ts);
// Grades 4, 5, 7 and 9 are mostly Oregon's own, because their themes (Oregon history, Oregon's Tribes, world history
// 600–1900, Oregon civics) have no matching course elsewhere.
export const OWN_SOCIAL: Partial<Record<GradeId, Unit[]>> = {
  k: OWN_SOCIAL_K,
  "1": OWN_SOCIAL_1,
  "2": OWN_SOCIAL_2,
  "3": OWN_SOCIAL_3,
  "4": OWN_SOCIAL_4,
  "5": [...OWN_SOCIAL_5, historyDetective5],
  "6": [worldMaps6, ...OWN_SOCIAL_6],
  "7": OWN_SOCIAL_7,
  "8": [...OWN_SOCIAL_8, reconstruction8],
  "9": OWN_SOCIAL_9,
};

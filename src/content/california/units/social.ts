import type { GradeId, Unit } from "../../types";
import { SOCIAL_4 } from "./social-g4";
import { SOCIAL_5, SOCIAL_6, SOCIAL_7, SOCIAL_8, SOCIAL_9 } from "./social-g59";
import { SOCIAL_1, SOCIAL_2, SOCIAL_3, SOCIAL_K } from "./social-k3";

/** California's own social studies units per grade, including California copies of Washington and Oregon units. */
export const OWN_SOCIAL: Partial<Record<GradeId, Unit[]>> = {
  k: SOCIAL_K,
  "1": SOCIAL_1,
  "2": SOCIAL_2,
  "3": SOCIAL_3,
  "4": SOCIAL_4,
  "5": SOCIAL_5,
  "6": SOCIAL_6,
  "7": SOCIAL_7,
  "8": SOCIAL_8,
  "9": SOCIAL_9,
};

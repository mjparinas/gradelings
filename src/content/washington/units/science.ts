import type { GradeId, Unit } from "../../types";
import { SCIENCE_3, SCIENCE_4, SCIENCE_5 } from "./science-35";
import { SCIENCE_6, SCIENCE_7, SCIENCE_8 } from "./science-68";
import { SCIENCE_9 } from "./science-9";
import { SCIENCE_1, SCIENCE_2, SCIENCE_K } from "./science-k2";

// Washington-only science units (`wa-` ids), per grade: NGSS topics no shared or adopted unit covers.
export const OWN_SCIENCE: Partial<Record<GradeId, Unit[]>> = {
  k: SCIENCE_K,
  "1": SCIENCE_1,
  "2": SCIENCE_2,
  "3": SCIENCE_3,
  "4": SCIENCE_4,
  "5": SCIENCE_5,
  "6": SCIENCE_6,
  "7": SCIENCE_7,
  "8": SCIENCE_8,
  "9": SCIENCE_9,
};

import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { PRIME_FACTORS_5 } from "./math-g5";
import { SCIENCE_COPIES } from "./science-g5";
import { SOCIAL_5 } from "./social-g5";

/** California's own Grade 5 units, including its copies of Washington and Oregon units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: [PRIME_FACTORS_5] },
  science: { units: SCIENCE_COPIES },
  social: { units: SOCIAL_5 },
};

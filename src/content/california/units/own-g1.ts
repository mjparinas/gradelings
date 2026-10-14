import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { MATH_1 } from "./math-g1";
import { LANGUAGE_1 } from "./language-g1";
import { SCIENCE_1 } from "./science-g1";
import { SOCIAL_1 } from "./social-g1";

/** California's own Grade 1 units, including its copies of Washington and Oregon units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: MATH_1 },
  language: { units: LANGUAGE_1 },
  science: { units: SCIENCE_1 },
  social: { units: SOCIAL_1 },
};

import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { LANGUAGE_2 } from "./language-g2";
import { MATH_2 } from "./math-g2";
import { SCIENCE_COPIES } from "./science-g2";
import { SOCIAL_2 } from "./social-g2";

/** California's own Grade 2 units, including its copies of Washington and Oregon units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  language: { units: LANGUAGE_2 },
  math: { units: MATH_2 },
  science: { units: SCIENCE_COPIES },
  social: { units: SOCIAL_2 },
};

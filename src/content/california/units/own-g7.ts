import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { LANGUAGE_7 } from "./language-g7";
import { MATH_7 } from "./math-g7";
import { OWN_SCIENCE, SCIENCE_COPIES } from "./science-g7";
import { SOCIAL_7 } from "./social-g7";

/** California's own Grade 7 units, including its copies of Washington and Oregon units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  language: { units: LANGUAGE_7 },
  math: { units: MATH_7 },
  science: { units: [...SCIENCE_COPIES, ...OWN_SCIENCE] },
  social: { units: SOCIAL_7 },
};

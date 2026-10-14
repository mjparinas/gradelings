import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { LANGUAGE_6 } from "./language-g6";
import { MATH_6 } from "./math-g6";
import { OWN_SCIENCE, SCIENCE_COPIES } from "./science-g6";
import { SOCIAL_6 } from "./social-g6";

/** California's own Grade 6 units, including its copies of Washington and Oregon units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  language: { units: LANGUAGE_6 },
  math: { units: MATH_6 },
  science: { units: [...SCIENCE_COPIES, ...OWN_SCIENCE] },
  social: { units: SOCIAL_6 },
};

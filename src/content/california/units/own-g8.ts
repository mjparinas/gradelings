import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { LANGUAGE_8 } from "./language-g8";
import { MATH_8 } from "./math-g8";
import { OWN_SCIENCE, SCIENCE_COPIES } from "./science-g8";
import { SOCIAL_8 } from "./social-g8";

/** California's own Grade 8 units, including its copies of Washington and Oregon units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  language: { units: LANGUAGE_8 },
  math: { units: MATH_8 },
  science: { units: [...SCIENCE_COPIES, ...OWN_SCIENCE] },
  social: { units: SOCIAL_8 },
};

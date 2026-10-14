import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { LANGUAGE_4 } from "./language-g4";
import { MATH_4 } from "./math-g4";
import { OWN_SCIENCE, SCIENCE_COPIES } from "./science-g4";
import { SOCIAL_4 } from "./social-g4";

/** California's own Grade 4 units, including its copies of Washington and Oregon units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  language: { units: LANGUAGE_4 },
  math: { units: MATH_4 },
  science: { units: [...SCIENCE_COPIES, ...OWN_SCIENCE] },
  social: { units: SOCIAL_4 },
};

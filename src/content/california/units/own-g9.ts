import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { LANGUAGE_9 } from "./language-g9";
import { MATH_9 } from "./math-g9";
import { OWN_SCIENCE, SCIENCE_COPIES } from "./science-g9";
import { PHYSICAL_SCIENCE } from "./science-g9-physical";
import { SOCIAL_9 } from "./social-g9";

/** California's own Grade 9 units, including its copies of Washington and Oregon units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  language: { units: LANGUAGE_9 },
  math: { units: MATH_9 },
  science: { units: [...SCIENCE_COPIES, ...OWN_SCIENCE, ...PHYSICAL_SCIENCE] },
  social: { units: SOCIAL_9 },
};

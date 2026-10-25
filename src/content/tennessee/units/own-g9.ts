import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_COPIES } from "./copies-g9";
import { MATH_COPIES } from "./math-g9";
import { SOCIAL_9 } from "./social-g9";

/** Tennessee's own Grade 9 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: SCIENCE_COPIES },
  math: { units: MATH_COPIES },
  social: { units: SOCIAL_9 },
};

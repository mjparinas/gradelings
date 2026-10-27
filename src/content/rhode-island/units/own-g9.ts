import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { MATH_COPIES } from "./copies-g9";
import { SCIENCE_9 } from "./science-g9";
import { SOCIAL_9 } from "./social-g9";

/** Rhode Island's own Grade 9 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: SCIENCE_9 },
  social: { units: SOCIAL_9 },
  math: { units: MATH_COPIES },
};

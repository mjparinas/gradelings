import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { ABSOLUTE_VALUE_9 } from "./math-g9";
import { SCIENCE_COPIES } from "./science-g9";
import { SOCIAL_9 } from "./social-g9";

/** California's own Grade 9 units, including its copies of Washington and Oregon units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: [ABSOLUTE_VALUE_9] },
  science: { units: SCIENCE_COPIES },
  social: { units: SOCIAL_9 },
};

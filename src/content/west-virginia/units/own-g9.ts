import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { MATH_COPIES } from "./copies-g9";
import { SCIENCE_9 } from "./science-g9";

/** West Virginia's own Grade 9 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: MATH_COPIES },
  science: { units: SCIENCE_9 },
};

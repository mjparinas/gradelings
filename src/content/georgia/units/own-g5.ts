import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_COPIES } from "./copies-g5";
import { SOCIAL_5 } from "./social-g5";

/** Georgia's own Grade 5 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: SOCIAL_5 },
  science: { units: SCIENCE_COPIES },
};

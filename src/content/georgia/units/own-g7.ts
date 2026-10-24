import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_COPIES, SOCIAL_COPIES } from "./copies-g7";
import { SOCIAL_7 } from "./social-g67";

/** Georgia's own Grade 7 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: [...SOCIAL_7, ...SOCIAL_COPIES] },
  science: { units: SCIENCE_COPIES },
};

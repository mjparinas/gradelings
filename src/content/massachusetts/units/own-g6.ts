import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_COPIES, SOCIAL_COPIES } from "./copies-g6";
import { SOCIAL_6 } from "./social-g6";

/** Massachusetts's own Grade 6 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: [...SOCIAL_6, ...SOCIAL_COPIES] },
  science: { units: SCIENCE_COPIES },
};

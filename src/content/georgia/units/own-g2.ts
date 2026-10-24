import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_COPIES } from "./copies-g2";
import { SOCIAL_2 } from "./social-k2";

/** Georgia's own Grade 2 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: SOCIAL_2 },
  science: { units: SCIENCE_COPIES },
};

import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_COPIES, SOCIAL_COPIES } from "./copies-g3";
import { SCIENCE_3 } from "./science-g3";
import { SOCIAL_3 } from "./social-g3";

/** Georgia's own Grade 3 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: [...SCIENCE_3, ...SCIENCE_COPIES] },
  social: { units: [...SOCIAL_3, ...SOCIAL_COPIES] },
};

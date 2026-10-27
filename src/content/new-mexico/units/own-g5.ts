import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_COPIES, SOCIAL_COPIES } from "./copies-g5";
import { SCIENCE_5 } from "./science-g5";
import { SOCIAL_5 } from "./social-g5";

/** New Mexico's own Grade 5 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: [...SCIENCE_5, ...SCIENCE_COPIES] },
  social: { units: [...SOCIAL_5, ...SOCIAL_COPIES] },
};

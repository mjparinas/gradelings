import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { LANGUAGE_COPIES, SCIENCE_COPIES, SOCIAL_COPIES } from "./copies-g7";
import { SCIENCE_7 } from "./science-g7";

/** Colorado's own Grade 7 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: [...SCIENCE_7, ...SCIENCE_COPIES] },
  language: { units: LANGUAGE_COPIES },
  social: { units: SOCIAL_COPIES },
};

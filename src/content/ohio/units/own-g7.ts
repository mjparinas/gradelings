import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { LANGUAGE_COPIES, SCIENCE_COPIES, SOCIAL_COPIES } from "./copies-g7";

/** Ohio's own Grade 7 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: SCIENCE_COPIES },
  language: { units: LANGUAGE_COPIES },
  social: { units: SOCIAL_COPIES },
};

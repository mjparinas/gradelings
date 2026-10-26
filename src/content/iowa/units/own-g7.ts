import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { LANGUAGE_COPIES } from "./copies-g7";
import { SCIENCE_7 } from "./science-g7";
import { SOCIAL_7 } from "./social-g7";

/** Iowa's own Grade 7 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: SCIENCE_7 },
  language: { units: LANGUAGE_COPIES },
  social: { units: SOCIAL_7 },
};

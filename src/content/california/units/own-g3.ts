import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { LANGUAGE_3 } from "./language-g3";
import { SCIENCE_COPIES } from "./science-g3";
import { SOCIAL_3 } from "./social-g3";

/** California's own Grade 3 units, including its copies of Washington and Oregon units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  language: { units: LANGUAGE_3 },
  science: { units: SCIENCE_COPIES },
  social: { units: SOCIAL_3 },
};

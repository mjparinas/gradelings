import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_COPIES } from "./science-g7";
import { SOCIAL_7 } from "./social-g7";

/** California's own Grade 7 units, including its copies of Washington and Oregon units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: SCIENCE_COPIES },
  social: { units: SOCIAL_7 },
};

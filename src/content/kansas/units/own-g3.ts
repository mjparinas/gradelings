import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_3 } from "./science-g3";
import { SOCIAL_3 } from "./social-g3";

/** Kansas's own Grade 3 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: SCIENCE_3 },
  social: { units: SOCIAL_3 },
};

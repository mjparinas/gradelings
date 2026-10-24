import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_6 } from "./science-g6";
import { SOCIAL_6 } from "./social-g6";

/** Indiana's own Grade 6 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: SCIENCE_6 },
  social: { units: SOCIAL_6 },
};

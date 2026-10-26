import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_4 } from "./science-g4";
import { SOCIAL_4 } from "./social-g4";

/** Mississippi's own Grade 4 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: SCIENCE_4 },
  social: { units: SOCIAL_4 },
};

import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_5 } from "./science-g5";
import { SOCIAL_5 } from "./social-g45";

/** Missouri's own Grade 5 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: SCIENCE_5 },
  social: { units: SOCIAL_5 },
};

import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SOCIAL_7 } from "./social-g78";

/** Virginia's own Grade 7 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: SOCIAL_7 },
};

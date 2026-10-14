import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SOCIAL_9 } from "./social-g9";

/** Maine's own Grade 9 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: SOCIAL_9 },
};

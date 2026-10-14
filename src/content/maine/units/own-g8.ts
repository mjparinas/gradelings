import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SOCIAL_8 } from "./social-g8";

/** Maine's own Grade 8 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: SOCIAL_8 },
};

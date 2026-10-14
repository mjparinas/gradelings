import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SOCIAL_3 } from "./social-g3";

/** Arizona's own Grade 3 units: Arizona Studies. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: SOCIAL_3, first: true },
};

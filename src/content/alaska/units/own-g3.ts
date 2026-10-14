import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SOCIAL_3 } from "./social-g3";

/** Alaska's own Grade 3 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: SOCIAL_3 },
};

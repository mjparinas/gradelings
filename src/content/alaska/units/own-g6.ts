import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SOCIAL_6 } from "./social-g6";

/** Alaska's own Grade 6 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: SOCIAL_6 },
};

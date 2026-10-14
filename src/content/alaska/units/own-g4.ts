import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SOCIAL_4 } from "./social-g4";

/** Alaska's own Grade 4 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: SOCIAL_4 },
};

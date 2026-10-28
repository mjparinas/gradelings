import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SOCIAL_1 } from "./social-g1";

/** Wyoming's own Grade 1 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: SOCIAL_1 },
};

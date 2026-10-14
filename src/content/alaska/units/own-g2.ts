import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SOCIAL_2 } from "./social-g2";

/** Alaska's own Grade 2 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: SOCIAL_2 },
};

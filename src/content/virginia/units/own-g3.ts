import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { COPIES_3 } from "./copies";
import { SOCIAL_3 } from "./social-g3";

/** Virginia's own Grade 3 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: [...COPIES_3, ...SOCIAL_3] },
};

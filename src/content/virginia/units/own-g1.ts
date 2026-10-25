import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { COPIES_1 } from "./copies";
import { SOCIAL_1 } from "./social-k1";

/** Virginia's own Grade 1 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: [...SOCIAL_1, ...COPIES_1] },
};

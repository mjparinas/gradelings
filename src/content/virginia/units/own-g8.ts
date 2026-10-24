import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SOCIAL_COPIES_8 } from "./copies";
import { SOCIAL_8 } from "./social-g78";

/** Virginia's own Grade 8 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: [...SOCIAL_COPIES_8, ...SOCIAL_8] },
};

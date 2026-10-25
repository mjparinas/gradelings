import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { COPIES_2 } from "./copies";
import { SOCIAL_2 } from "./social-g2";

/** Virginia's own Grade 2 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: [...SOCIAL_2, ...COPIES_2] },
};

import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { COPIES_K } from "./copies";
import { SOCIAL_K } from "./social-k1";

/** Virginia's own Kindergarten units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: [...SOCIAL_K, ...COPIES_K] },
};

import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SOCIAL_K } from "./social-k";

/** California's own Kindergarten units, including its copies of Washington and Oregon units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: SOCIAL_K },
};

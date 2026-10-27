import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SOCIAL_K } from "./social-k";

/** Montana's own Kindergarten units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: SOCIAL_K },
};

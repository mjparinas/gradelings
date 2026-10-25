import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SOCIAL_COPIES } from "./copies-g2";
import { SOCIAL_2 } from "./social-g23";

/** North Carolina's own Grade 2 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: [...SOCIAL_2, ...SOCIAL_COPIES] },
};

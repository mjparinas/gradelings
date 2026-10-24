import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SOCIAL_COPIES } from "./copies-g9";
import { SOCIAL_9 } from "./social-g9";

/** Massachusetts's own Grade 9 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: [...SOCIAL_9, ...SOCIAL_COPIES] },
};

import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SOCIAL_COPIES } from "./copies-g8";
import { SOCIAL_8 } from "./social-g8";

/** Massachusetts's own Grade 8 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: [...SOCIAL_8, ...SOCIAL_COPIES] },
};

import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_COPIES } from "./copies-g7";
import { SOCIAL_7 } from "./social-g7";

/** Massachusetts's own Grade 7 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: SOCIAL_7 },
  science: { units: SCIENCE_COPIES },
};

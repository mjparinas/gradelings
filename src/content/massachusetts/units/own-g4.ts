import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_COPIES } from "./copies-g4";
import { SOCIAL_4 } from "./social-g4";

/** Massachusetts's own Grade 4 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: SOCIAL_4 },
  science: { units: SCIENCE_COPIES },
};

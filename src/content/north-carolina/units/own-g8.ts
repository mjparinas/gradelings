import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_COPIES } from "./copies-g8";
import { SCIENCE_8 } from "./science-g8";
import { SOCIAL_8 } from "./social-g8";

/** North Carolina's own Grade 8 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: [...SCIENCE_COPIES, ...SCIENCE_8] },
  social: { units: SOCIAL_8 },
};

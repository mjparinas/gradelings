import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_COPIES, SOCIAL_COPIES } from "./copies-g2";
import { SOCIAL_2 } from "./social-g2";

/** Ohio's own Grade 2 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: SCIENCE_COPIES },
  social: { units: [...SOCIAL_2, ...SOCIAL_COPIES] },
};

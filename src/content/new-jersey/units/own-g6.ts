import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_COPIES, SOCIAL_COPIES } from "./copies-g6";
import { SCIENCE_6 } from "./science-g6";

/** New Jersey's own Grade 6 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: [...SCIENCE_6, ...SCIENCE_COPIES] },
  social: { units: SOCIAL_COPIES },
};

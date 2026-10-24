import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_COPIES, SOCIAL_COPIES } from "./copies-g2";
import { SCIENCE_2 } from "./science-g2";

/** New Jersey's own Grade 2 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: [...SCIENCE_2, ...SCIENCE_COPIES] },
  social: { units: SOCIAL_COPIES },
};

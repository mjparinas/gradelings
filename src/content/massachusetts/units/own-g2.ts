import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_COPIES, SOCIAL_COPIES } from "./copies-g2";

/** Massachusetts's own Grade 2 units: copies of other states' units with Massachusetts examples. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: SCIENCE_COPIES },
  social: { units: SOCIAL_COPIES },
};

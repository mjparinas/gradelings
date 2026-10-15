import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_2 } from "./science-g2";
import { SOCIAL_2 } from "./social-g2";

/** Alaska's own Grade 2 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: SCIENCE_2 },
  social: { units: SOCIAL_2 },
};

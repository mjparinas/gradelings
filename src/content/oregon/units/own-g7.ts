import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { OWN_SOCIAL_7 } from "./social-g67";
import { SCIENCE_7 } from "./science-68";
import { SCIENCE_COPIES } from "./science-copies";

/** Oregon-only units in Grade 7, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: [...(SCIENCE_COPIES["7"] ?? []), ...SCIENCE_7] },
  social: { units: OWN_SOCIAL_7 },
};

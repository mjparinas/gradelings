import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { OWN_SOCIAL_3 } from "./social-k3";
import { SCIENCE_3 } from "./science-35";
import { SCIENCE_COPIES } from "./science-copies";

/** Oregon-only units in Grade 3, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: [...(SCIENCE_COPIES["3"] ?? []), ...SCIENCE_3] },
  social: { units: OWN_SOCIAL_3 },
};

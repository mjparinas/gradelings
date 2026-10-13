import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { OWN_SOCIAL_2 } from "./social-k3";
import { SCIENCE_2 } from "./science-k2";
import { SCIENCE_COPIES } from "./science-copies";

/** Oregon-only units in Grade 2, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: [...(SCIENCE_COPIES["2"] ?? []), ...SCIENCE_2] },
  social: { units: OWN_SOCIAL_2 },
};

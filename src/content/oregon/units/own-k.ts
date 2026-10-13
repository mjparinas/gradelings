import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { OWN_SOCIAL_K } from "./social-k3";
import { SCIENCE_COPIES } from "./science-copies";
import { SCIENCE_K } from "./science-k2";

/** Oregon-only units in Kindergarten, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: [...(SCIENCE_COPIES["k"] ?? []), ...SCIENCE_K] },
  social: { units: OWN_SOCIAL_K },
};

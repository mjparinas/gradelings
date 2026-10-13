import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { OWN_SOCIAL_6 } from "./social-g67";
import { SCIENCE_6 } from "./science-68";
import { SCIENCE_COPIES } from "./science-copies";
import { worldMaps6 } from "./social-copies";

/** Oregon-only units in Grade 6, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: [...(SCIENCE_COPIES["6"] ?? []), ...SCIENCE_6] },
  social: { units: [worldMaps6, ...OWN_SOCIAL_6] },
};

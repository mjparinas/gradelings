import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { G9_UNITS } from "./math-g9";
import { MEDIA_ANALYSIS } from "./language";
import { OWN_SOCIAL_9 } from "./social-g9";
import { SCIENCE_COPIES } from "./science-copies";

/** Oregon-only units in Grade 9, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: G9_UNITS },
  language: { units: [MEDIA_ANALYSIS] },
  science: { units: SCIENCE_COPIES["9"] ?? [] },
  social: { units: OWN_SOCIAL_9 },
};

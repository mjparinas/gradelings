import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { OWN_SOCIAL_5 } from "./social-g5";
import { SCIENCE_5 } from "./science-35";
import { SCIENCE_COPIES } from "./science-copies";
import { historyDetective5 } from "./social-copies";

/** Oregon-only units in Grade 5, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: [...(SCIENCE_COPIES["5"] ?? []), ...SCIENCE_5] },
  social: { units: [...OWN_SOCIAL_5, historyDetective5] },
};

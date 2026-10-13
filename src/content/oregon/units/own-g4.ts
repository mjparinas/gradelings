import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { FIRSTHAND_SECONDHAND } from "./language-reading";
import { OWN_SOCIAL_4 } from "./social-g4";
import { SCIENCE_4 } from "./science-35";
import { SCIENCE_COPIES } from "./science-copies";

/** Oregon-only units in Grade 4, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  language: { units: [FIRSTHAND_SECONDHAND] },
  science: { units: [...(SCIENCE_COPIES["4"] ?? []), ...SCIENCE_4] },
  social: { units: OWN_SOCIAL_4 },
};

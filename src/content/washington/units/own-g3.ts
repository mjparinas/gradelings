import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { G3_UNITS } from "./math-middle";
import { OWN_SOCIAL_3 } from "./social-k4-g3";
import { RML_3 } from "./language-rml-middle";
import { SCIENCE_3 } from "./science-35";

/** Washington-only units in Grade 3, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: G3_UNITS },
  language: { units: [RML_3] },
  science: { units: SCIENCE_3 },
  social: { units: OWN_SOCIAL_3 },
};

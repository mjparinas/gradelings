import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { G1_UNITS } from "./math-early";
import { OWN_SOCIAL_1 } from "./social-k4-g1";
import { RML_1 } from "./language-rml-early";
import { SCIENCE_1 } from "./science-k2";

/** Washington-only units in Grade 1, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: G1_UNITS },
  language: { units: [RML_1] },
  science: { units: SCIENCE_1 },
  social: { units: OWN_SOCIAL_1 },
};

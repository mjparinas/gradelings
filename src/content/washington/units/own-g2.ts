import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { G2_UNITS } from "./math-early";
import { OWN_SOCIAL_2 } from "./social-k4-g2";
import { RML_2 } from "./language-rml-early";
import { SCIENCE_2 } from "./science-k2";

/** Washington-only units in Grade 2, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: G2_UNITS },
  language: { units: [RML_2] },
  science: { units: SCIENCE_2 },
  social: { units: OWN_SOCIAL_2 },
};

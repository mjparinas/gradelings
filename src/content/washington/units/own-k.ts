import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { K_UNITS } from "./math-early";
import { OWN_SOCIAL_K } from "./social-k4-k";
import { RML_K } from "./language-rml-early";
import { SCIENCE_K } from "./science-k2";

/** Washington-only units in Kindergarten, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: K_UNITS },
  language: { units: [RML_K] },
  science: { units: SCIENCE_K },
  social: { units: OWN_SOCIAL_K },
};

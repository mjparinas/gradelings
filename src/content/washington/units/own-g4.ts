import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { G4_UNITS } from "./math-middle";
import { OWN_SOCIAL_4A } from "./social-k4-g4a";
import { OWN_SOCIAL_4B } from "./social-k4-g4b";
import { RML_4 } from "./language-rml-middle";
import { SCIENCE_4 } from "./science-35";
import { SPELLING_4 } from "./language-spelling";

/** Washington-only units in Grade 4, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: G4_UNITS },
  language: { units: [RML_4, SPELLING_4] },
  science: { units: SCIENCE_4 },
  social: { units: [...OWN_SOCIAL_4A, ...OWN_SOCIAL_4B] },
};

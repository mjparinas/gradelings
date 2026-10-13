import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { G5 } from "./social-59-g5";
import { G5_UNITS } from "./math-middle";
import { RML_5 } from "./language-rml-middle";
import { SCIENCE_5 } from "./science-35";
import { SPELLING_5 } from "./language-spelling";

/** Washington-only units in Grade 5, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: G5_UNITS },
  language: { units: [RML_5, SPELLING_5] },
  science: { units: SCIENCE_5 },
  social: { units: G5 },
};

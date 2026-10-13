import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { G7 } from "./social-59-g7";
import { G7_UNITS } from "./math-upper";
import { RML_7 } from "./language-rml-upper";
import { SCIENCE_7 } from "./science-68";
import { SPELLING_7 } from "./language-spelling";

/** Washington-only units in Grade 7, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: G7_UNITS },
  language: { units: [...RML_7, SPELLING_7] },
  science: { units: SCIENCE_7 },
  social: { units: G7 },
};

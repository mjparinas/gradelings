import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { G9 } from "./social-59-g9";
import { G9_UNITS } from "./math-upper";
import { RML_9 } from "./language-rml-upper";
import { SCIENCE_9 } from "./science-9";
import { SPELLING_9 } from "./language-spelling";

/** Washington-only units in Grade 9, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: G9_UNITS },
  language: { units: [...RML_9, SPELLING_9] },
  science: { units: SCIENCE_9 },
  social: { units: G9 },
};

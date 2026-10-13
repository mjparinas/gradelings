import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { G6 } from "./social-59-g6";
import { G6_UNITS } from "./math-upper";
import { RML_6 } from "./language-rml-upper";
import { SCIENCE_6 } from "./science-68";
import { SPELLING_6 } from "./language-spelling";

/** Washington-only units in Grade 6, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: G6_UNITS },
  language: { units: [...RML_6, SPELLING_6] },
  science: { units: SCIENCE_6 },
  social: { units: G6 },
};

import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { G8 } from "./social-59-g8";
import { G8_UNITS } from "./math-upper";
import { RML_8 } from "./language-rml-upper";
import { SCIENCE_8 } from "./science-68";

/** Washington-only units in Grade 8, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: G8_UNITS },
  language: { units: RML_8 },
  science: { units: SCIENCE_8 },
  social: { units: G8 },
};

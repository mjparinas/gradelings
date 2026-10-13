import type { GradeId, SubjectId, Unit } from "../../types";
import { OWN_LANGUAGE } from "./language";
import { OWN_MATH } from "./math";
import { OWN_SCIENCE } from "./science";
import { OWN_SOCIAL } from "./social";

/** Oregon-only units per subject and grade. */
export const OWN: Partial<Record<SubjectId, Partial<Record<GradeId, Unit[]>>>> = {
  math: OWN_MATH,
  language: OWN_LANGUAGE,
  science: OWN_SCIENCE,
  social: OWN_SOCIAL,
};

import type { GradeId, Unit } from "../../types";
import { G9_UNITS } from "./math-g9";

// Oregon-only math units, per grade. Every other Oregon math unit is shared or adopted (../plan/math.ts); Grade 9
// adds right-triangle trigonometry and coordinate geometry, which Oregon's high school standards ask for.
export const OWN_MATH: Partial<Record<GradeId, Unit[]>> = {
  "9": G9_UNITS,
};

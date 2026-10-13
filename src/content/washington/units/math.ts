import type { GradeId, Unit } from "../../types";
import { G1_UNITS, G2_UNITS, K_UNITS } from "./math-early";
import { G3_UNITS, G4_UNITS, G5_UNITS } from "./math-middle";
import { G6_UNITS, G7_UNITS, G8_UNITS, G9_UNITS } from "./math-upper";

// Washington-only math units (`wa-` ids), per grade. They cover what shared units can't: US money, customary
// measurement, the data-science standards, and Grade 9 Algebra 1 topics.
export const OWN_MATH: Partial<Record<GradeId, Unit[]>> = {
  k: K_UNITS,
  "1": G1_UNITS,
  "2": G2_UNITS,
  "3": G3_UNITS,
  "4": G4_UNITS,
  "5": G5_UNITS,
  "6": G6_UNITS,
  "7": G7_UNITS,
  "8": G8_UNITS,
  "9": G9_UNITS,
};

import type { Unit } from "../../types";
import { ABSOLUTE_VALUE_9 } from "../../california/units/math-g9";
import { localCopy } from "./kit";

// Tennessee Algebra I asks for absolute value equations and inequalities in one variable (A1.A.REI.B.2). California's
// unit practises exactly that, but its note calls it a California addition, so Tennessee keeps its own copy.

export const MATH_COPIES: Unit[] = [
  localCopy(ABSOLUTE_VALUE_9, "tn-g9-absolute-value", ["A1.A.REI.B.2", "solving absolute value equations and inequalities in one variable"], [], {
    parentNote:
      "Solving one-variable equations and inequalities with absolute value, reading |x − a| as the distance from a, and writing absolute-value inequalities for real tolerances, as Tennessee's Algebra I standards ask.",
  }),
];

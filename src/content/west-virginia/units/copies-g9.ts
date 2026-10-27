import type { Unit } from "../../types";
import { MATH_9 as CALIFORNIA_MATH_9 } from "../../california/units/math-g9";
import { from, localCopy } from "./kit";

// West Virginia copies of Grade 9 units that fit West Virginia except for a few questions naming another state's places.

export const MATH_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_MATH_9, "ca-g9-absolute-value"),
    "wv-g9-absolute-value",
    [
      "M.A1HS.7",
      "solving and creating one-variable equations and inequalities involving absolute value",
    ],
    [],
    {
      parentNote:
        "Solving one-variable equations and inequalities with absolute value, reading |x − a| as the distance from a, and writing absolute-value inequalities for real tolerances.",
    },
  ),
];

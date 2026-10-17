import type { Unit } from "../../types";
import { units as ontarioG7MathUnits } from "../../ontario/g7-math";
import { G7_UNITS as washingtonUnitsMathUpperG7UNITS } from "../../washington/units/math-upper";
import { units as albertaG7MathUnits } from "../../alberta/g7-math";
import { REWRITE_7 as californiaUnitsMathG7REWRITE7 } from "../../california/units/math-g7";
import { MATH_G7 as texasUnitsMathG7MATHG7 } from "../../texas/units/math-g7";
import { UNITS as newYorkUnitsMathG7UNITS } from "../../new-york/units/math-g7";
import { G6_UNITS as washingtonUnitsMathUpperG6UNITS } from "../../washington/units/math-upper";

// The units Florida's Grade 7 math course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG7MathUnits, ...washingtonUnitsMathUpperG7UNITS, ...albertaG7MathUnits, californiaUnitsMathG7REWRITE7, ...texasUnitsMathG7MATHG7, ...newYorkUnitsMathG7UNITS, ...washingtonUnitsMathUpperG6UNITS];

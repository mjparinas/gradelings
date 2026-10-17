import type { Unit } from "../../types";
import { G1_UNITS as washingtonUnitsMathEarlyG1UNITS } from "../../washington/units/math-early";
import { units as albertaG1MathUnits } from "../../alberta/g1-math";
import { UNITS as newYorkUnitsMathG1UNITS } from "../../new-york/units/math-g1";
import { units as ontarioG1MathUnits } from "../../ontario/g1-math";

// The units Florida's Grade 1 math course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsMathEarlyG1UNITS, ...albertaG1MathUnits, ...newYorkUnitsMathG1UNITS, ...ontarioG1MathUnits];

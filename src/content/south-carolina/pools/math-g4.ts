import type { Unit } from "../../types";
import { G4_UNITS as washingtonUnitsMathMiddleG4_UNITS } from "../../washington/units/math-middle";
import { units as albertaG4MathUnits } from "../../alberta/g4-math";
import { units as ontarioG4MathUnits } from "../../ontario/g4-math";

// The units South Carolina's Grade 4 math course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...ontarioG4MathUnits,
  ...albertaG4MathUnits,
  ...washingtonUnitsMathMiddleG4_UNITS,
];

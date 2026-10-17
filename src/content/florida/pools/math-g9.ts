import type { Unit } from "../../types";
import { G9_UNITS as washingtonUnitsMathUpperG9UNITS } from "../../washington/units/math-upper";
import { MATH_9 as californiaUnitsMathG9MATH9 } from "../../california/units/math-g9";
import { units as ontarioG9MathUnits } from "../../ontario/g9-math";
import { G9_UNITS as oregonUnitsMathG9G9UNITS } from "../../oregon/units/math-g9";
import { units as albertaG9MathUnits } from "../../alberta/g9-math";
import { UNITS as newYorkUnitsMathG9UNITS } from "../../new-york/units/math-g9";
import { units as manitobaUnitsG9MoreMathUnits } from "../../manitoba/units/g9-more-math";

// The units Florida's Grade 9 math course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsMathUpperG9UNITS, ...californiaUnitsMathG9MATH9, ...ontarioG9MathUnits, ...oregonUnitsMathG9G9UNITS, ...albertaG9MathUnits, ...newYorkUnitsMathG9UNITS, ...manitobaUnitsG9MoreMathUnits];

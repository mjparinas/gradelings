import type { Unit } from "../../types";
import { course as bcG4Math } from "../../grades/g4/math";
import { lessons as g4Lessons } from "../../lessons/g4";
import { polygons } from "../../manitoba/units/g3-math";
import { units as ontarioG3Math } from "../../ontario/g3-math";
import { G3_UNITS as washingtonMathMiddle } from "../../washington/units/math-middle";
import { lifted } from "./math-lift";

// The units New York's Grade 3 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades. New York
// teaches four-digit numbers in Grade 3 (NY-3.NBT.4), so it lifts BC's Grade 4 numbers unit.
export const POOL: readonly Unit[] = [
  ...ontarioG3Math,
  polygons,
  ...washingtonMathMiddle,
  lifted(bcG4Math.units, g4Lessons, "numbers-to-10000"),
];

import type { Unit } from "../../types";
import { units as albertaG8Math } from "../../alberta/g8-math";
import { course as bcG9Math } from "../../grades/g9/math";
import { lessons as g9Lessons } from "../../lessons/g9";
import { units as ontarioG8Math } from "../../ontario/g8-math";
import { G8_UNITS as washingtonMathUpper } from "../../washington/units/math-upper";
import { lifted } from "./math-lift";

// The units New York's Grade 8 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades. New York
// teaches similar figures in Grade 8 (NY-8.G.4), so it lifts BC's Grade 9 similarity unit.
export const POOL: readonly Unit[] = [...ontarioG8Math, ...albertaG8Math, ...washingtonMathUpper, lifted(bcG9Math.units, g9Lessons, "similarity-and-scale")];

import type { Unit } from "../../types";
import { units as albertaG6Math } from "../../alberta/g6-math";
import { lessons as g7Lessons } from "../../lessons/g7";
import { units as ontarioG6Math } from "../../ontario/g6-math";
import { G6_UNITS, G7_UNITS } from "../../washington/units/math-upper";
import { lifted } from "./math-lift";

// The units New York's Grade 6 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades. New York
// teaches samples and populations in Grade 6 (NY-6.SP.1), so it lifts Washington's Grade 7 sampling unit.
export const POOL: readonly Unit[] = [...ontarioG6Math, ...albertaG6Math, ...G6_UNITS, lifted(G7_UNITS, g7Lessons, "wa-g7-sampling")];

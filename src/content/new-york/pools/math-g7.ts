import type { Unit } from "../../types";
import { units as albertaG7Math } from "../../alberta/g7-math";
import { lessons as g6Lessons } from "../../lessons/g6";
import { units as ontarioG7Math } from "../../ontario/g7-math";
import { G6_UNITS, G7_UNITS } from "../../washington/units/math-upper";
import { lifted } from "./math-lift";

// The units New York's Grade 7 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades. New York
// teaches the interquartile range in Grade 7 (NY-7.SP.1), so it lifts Washington's Grade 6 centre-and-spread unit.
export const POOL: readonly Unit[] = [...ontarioG7Math, ...albertaG7Math, ...G7_UNITS, lifted(G6_UNITS, g6Lessons, "wa-g6-statistics")];

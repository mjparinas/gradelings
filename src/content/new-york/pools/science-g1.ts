import type { Unit } from "../../types";
import { SCIENCE_1 as washington1 } from "../../washington/units/science-k2";

// The units New York's Grade 1 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washington1];

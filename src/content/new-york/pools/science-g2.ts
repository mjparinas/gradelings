import type { Unit } from "../../types";
import { units as ontario2 } from "../../ontario/g2-science";
import { SCIENCE_2 as washington2 } from "../../washington/units/science-k2";
import { SCIENCE_2 as oregon2 } from "../../oregon/units/science-k2";

// The units New York's Grade 2 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontario2, ...washington2, ...oregon2];

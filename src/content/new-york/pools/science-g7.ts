import type { Unit } from "../../types";
import { units as ontario7 } from "../../ontario/g7-science";
import { units as ontario8 } from "../../ontario/g8-science";
import { units as alberta7 } from "../../alberta/g7-science";
import { SCIENCE_7 as washington7 } from "../../washington/units/science-68";

// The units New York's Grade 7 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontario7, ...alberta7, ...washington7, ...ontario8];

import type { Unit } from "../../types";
import { units as ontario4 } from "../../ontario/g4-science";
import { units as manitoba4 } from "../../manitoba/units/g4-more-science";
import { SCIENCE_4 as washington4 } from "../../washington/units/science-35";

// The units New York's Grade 4 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontario4, ...manitoba4, ...washington4];

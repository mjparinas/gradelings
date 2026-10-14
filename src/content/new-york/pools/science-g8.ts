import type { Unit } from "../../types";
import { motionForces as newBrunswickMotion } from "../../new-brunswick/units/g8-science";
import { SCIENCE_8 as washington8 } from "../../washington/units/science-68";

// The units New York's Grade 8 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [newBrunswickMotion, ...washington8];

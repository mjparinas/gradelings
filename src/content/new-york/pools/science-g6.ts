import type { Unit } from "../../types";
import { senses as newBrunswickSenses } from "../../new-brunswick/units/g6-science";
import { units as ontario8 } from "../../ontario/g8-science";
import { SCIENCE_6 as washington6 } from "../../washington/units/science-68";

// The units New York's Grade 6 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [newBrunswickSenses, ...washington6, ...ontario8];

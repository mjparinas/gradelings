import type { Unit } from "../../types";
import { units as manitobaUnitsG9ScienceUnits } from "../../manitoba/units/g9-science";
import { units as ontarioG9ScienceUnits } from "../../ontario/g9-science";

// The units Minnesota's Grade 9 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG9ScienceUnits, ...manitobaUnitsG9ScienceUnits];

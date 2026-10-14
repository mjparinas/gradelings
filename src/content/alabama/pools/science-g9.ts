import type { Unit } from "../../types";
import { SCIENCE_9 as texasScience9 } from "../../texas/units/science-9";
import { units as ontarioG9ScienceUnits } from "../../ontario/g9-science";
import { units as manitobaG9Science } from "../../manitoba/units/g9-science";

// The units Alabama's Grade 9 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...texasScience9,
  ...ontarioG9ScienceUnits,
  ...manitobaG9Science,
];

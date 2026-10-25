import type { Unit } from "../../types";
import { SCIENCE_4 as washingtonUnitsScience35SCIENCE_4 } from "../../washington/units/science-35";
import { units as manitobaUnitsG4MoreScienceUnits } from "../../manitoba/units/g4-more-science";
import { units as ontarioG4ScienceUnits } from "../../ontario/g4-science";

// The units South Carolina's Grade 4 science course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...washingtonUnitsScience35SCIENCE_4,
  ...manitobaUnitsG4MoreScienceUnits,
  ...ontarioG4ScienceUnits,
];

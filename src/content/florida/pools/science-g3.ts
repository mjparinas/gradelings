import type { Unit } from "../../types";
import { units as ontarioG3ScienceUnits } from "../../ontario/g3-science";
import { find as manitobaUnitsG3MoreScienceFind } from "../../manitoba/units/g3-more-science";
import { SCIENCE_3 as texasUnitsScience3SCIENCE3 } from "../../texas/units/science-3";
import { units as manitobaUnitsG4MoreScienceUnits } from "../../manitoba/units/g4-more-science";
import { SCIENCE_5 as washingtonUnitsScience35SCIENCE5 } from "../../washington/units/science-35";
import { units as ontarioG4ScienceUnits } from "../../ontario/g4-science";

// The units Florida's Grade 3 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG3ScienceUnits, manitobaUnitsG3MoreScienceFind, ...texasUnitsScience3SCIENCE3, ...manitobaUnitsG4MoreScienceUnits, ...washingtonUnitsScience35SCIENCE5, ...ontarioG4ScienceUnits];

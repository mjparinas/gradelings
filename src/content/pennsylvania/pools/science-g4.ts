import type { Unit } from "../../types";
import { units as manitobaUnitsG4MoreScienceUnits } from "../../manitoba/units/g4-more-science";
import { SCIENCE_4 as washingtonUnitsScience35SCIENCE4 } from "../../washington/units/science-35";
import { units as ontarioG4ScienceUnits } from "../../ontario/g4-science";
import { OWN_SCIENCE as californiaUnitsScienceG4OWNSCIENCE } from "../../california/units/science-g4";

// The units Pennsylvania's Grade 4 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...manitobaUnitsG4MoreScienceUnits, ...washingtonUnitsScience35SCIENCE4, ...ontarioG4ScienceUnits, ...californiaUnitsScienceG4OWNSCIENCE];

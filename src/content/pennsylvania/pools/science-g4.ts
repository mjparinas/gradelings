import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { UNITS as newYorkUnitsScienceG4UNITS } from "../../new-york/units/science-g4";
import { SCIENCE_4 as washingtonUnitsScience35SCIENCE4 } from "../../washington/units/science-35";
import { units as manitobaUnitsG4MoreScienceUnits } from "../../manitoba/units/g4-more-science";
import { units as ontarioG4ScienceUnits } from "../../ontario/g4-science";
import { OWN_SCIENCE as californiaUnitsScienceG4OWNSCIENCE } from "../../california/units/science-g4";
import { courses as maineG4Courses } from "../../maine/g4";

// The units Pennsylvania's Grade 4 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...newYorkUnitsScienceG4UNITS, ...washingtonUnitsScience35SCIENCE4, ...manitobaUnitsG4MoreScienceUnits, ...ontarioG4ScienceUnits, ...californiaUnitsScienceG4OWNSCIENCE, ...unitsOf(maineG4Courses, "science")];

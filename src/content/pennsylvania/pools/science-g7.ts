import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { units as ontarioG7ScienceUnits } from "../../ontario/g7-science";
import { OWN_SCIENCE as californiaUnitsScienceG7OWNSCIENCE } from "../../california/units/science-g7";
import { SCIENCE_8 as washingtonUnitsScience68SCIENCE8 } from "../../washington/units/science-68";
import { senses as newBrunswickUnitsG6ScienceSenses } from "../../new-brunswick/units/g6-science";
import { MORE as newYorkUnitsScienceG8SignalsMORE } from "../../new-york/units/science-g8-signals";
import { UNITS as newYorkUnitsScienceG6UNITS } from "../../new-york/units/science-g6";
import { SCIENCE_6 as washingtonUnitsScience68SCIENCE6 } from "../../washington/units/science-68";
import { units as albertaG7ScienceUnits } from "../../alberta/g7-science";
import { UNITS as newYorkUnitsScienceG7UNITS } from "../../new-york/units/science-g7";
import { courses as arizonaG7Courses } from "../../arizona/g7";

// The units Pennsylvania's Grade 7 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG7ScienceUnits, ...californiaUnitsScienceG7OWNSCIENCE, ...washingtonUnitsScience68SCIENCE8, newBrunswickUnitsG6ScienceSenses, ...newYorkUnitsScienceG8SignalsMORE, ...newYorkUnitsScienceG6UNITS, ...washingtonUnitsScience68SCIENCE6, ...albertaG7ScienceUnits, ...newYorkUnitsScienceG7UNITS, ...unitsOf(arizonaG7Courses, "science")];

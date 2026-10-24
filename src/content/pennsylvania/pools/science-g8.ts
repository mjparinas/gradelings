import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { SCIENCE_8 as washingtonUnitsScience68SCIENCE8 } from "../../washington/units/science-68";
import { motionForces as newBrunswickUnitsG8ScienceMotionForces } from "../../new-brunswick/units/g8-science";
import { MORE as newYorkUnitsScienceG7MaterialsMORE } from "../../new-york/units/science-g7-materials";
import { MORE as newYorkUnitsScienceG8SignalsMORE } from "../../new-york/units/science-g8-signals";
import { SCIENCE_7 as washingtonUnitsScience68SCIENCE7 } from "../../washington/units/science-68";
import { OWN_SCIENCE as californiaUnitsScienceG8OWNSCIENCE } from "../../california/units/science-g8";
import { SCIENCE_6 as washingtonUnitsScience68SCIENCE6 } from "../../washington/units/science-68";
import { units as albertaG6ScienceUnits } from "../../alberta/g6-science";
import { units as ontarioG7ScienceUnits } from "../../ontario/g7-science";
import { courses as alabamaG8Courses } from "../../alabama/g8";

// The units Pennsylvania's Grade 8 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsScience68SCIENCE8, newBrunswickUnitsG8ScienceMotionForces, ...newYorkUnitsScienceG7MaterialsMORE, ...newYorkUnitsScienceG8SignalsMORE, ...washingtonUnitsScience68SCIENCE7, ...californiaUnitsScienceG8OWNSCIENCE, ...washingtonUnitsScience68SCIENCE6, ...albertaG6ScienceUnits, ...ontarioG7ScienceUnits, ...unitsOf(alabamaG8Courses, "science")];

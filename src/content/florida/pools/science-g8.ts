import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { units as manitobaUnitsG8MoreScienceUnits } from "../../manitoba/units/g8-more-science";
import { SCIENCE_8 as texasUnitsScience8SCIENCE8 } from "../../texas/units/science-8";
import { units as ontarioG7ScienceUnits } from "../../ontario/g7-science";
import { units as ontarioG9ScienceUnits } from "../../ontario/g9-science";
import { units as albertaG9ScienceUnits } from "../../alberta/g9-science";
import { UNITS as newYorkUnitsScienceG8UNITS } from "../../new-york/units/science-g8";
import { SCIENCE_7 as washingtonUnitsScience68SCIENCE7 } from "../../washington/units/science-68";
import { SCIENCE_7 as texasUnitsScience7SCIENCE7 } from "../../texas/units/science-7";
import { units as ontarioG8ScienceUnits } from "../../ontario/g8-science";
import { courses as alabamaG8Courses } from "../../alabama/g8";

// The units Florida's Grade 8 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...manitobaUnitsG8MoreScienceUnits, ...texasUnitsScience8SCIENCE8, ...ontarioG7ScienceUnits, ...ontarioG9ScienceUnits, ...albertaG9ScienceUnits, ...newYorkUnitsScienceG8UNITS, ...washingtonUnitsScience68SCIENCE7, ...texasUnitsScience7SCIENCE7, ...ontarioG8ScienceUnits, ...unitsOf(alabamaG8Courses, "science")];

import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { units as ontarioG7ScienceUnits } from "../../ontario/g7-science";
import { SCIENCE_8 as washingtonUnitsScience68SCIENCE8 } from "../../washington/units/science-68";
import { energyAndMelting as manitobaUnitsG7MoreScienceEnergyAndMelting } from "../../manitoba/units/g7-more-science";
import { scientificInquiry as manitobaUnitsG7MoreScienceScientificInquiry } from "../../manitoba/units/g7-more-science";
import { labSafety as manitobaUnitsG7MoreScienceLabSafety } from "../../manitoba/units/g7-more-science";
import { SCIENCE_7 as texasUnitsScience7SCIENCE7 } from "../../texas/units/science-7";
import { courses as alabamaG7Courses } from "../../alabama/g7";

// The units Florida's Grade 7 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG7ScienceUnits, ...washingtonUnitsScience68SCIENCE8, manitobaUnitsG7MoreScienceEnergyAndMelting, manitobaUnitsG7MoreScienceScientificInquiry, manitobaUnitsG7MoreScienceLabSafety, ...texasUnitsScience7SCIENCE7, ...unitsOf(alabamaG7Courses, "science")];

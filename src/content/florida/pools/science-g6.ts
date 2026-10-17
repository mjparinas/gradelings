import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { SCIENCE_6 as washingtonUnitsScience68SCIENCE6 } from "../../washington/units/science-68";
import { SCIENCE_6 as texasUnitsScience6SCIENCE6 } from "../../texas/units/science-6";
import { SCIENCE_8 as washingtonUnitsScience68SCIENCE8 } from "../../washington/units/science-68";
import { units as ontarioG6ScienceUnits } from "../../ontario/g6-science";
import { peMicrobesArthropods6 as princeEdwardIslandUnitsG6WorldSciencePeMicrobesArthropods6 } from "../../prince-edward-island/units/g6-world-science";
import { scienceWorks as manitobaUnitsG6MoreScienceScienceWorks } from "../../manitoba/units/g6-more-science";
import { storedEnergy as manitobaUnitsG6ScienceStoredEnergy } from "../../manitoba/units/g6-science";
import { UNITS as newYorkUnitsScienceG6UNITS } from "../../new-york/units/science-g6";
import { courses as minnesotaG6Courses } from "../../minnesota/g6";

// The units Florida's Grade 6 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsScience68SCIENCE6, ...texasUnitsScience6SCIENCE6, ...washingtonUnitsScience68SCIENCE8, ...ontarioG6ScienceUnits, princeEdwardIslandUnitsG6WorldSciencePeMicrobesArthropods6, manitobaUnitsG6MoreScienceScienceWorks, manitobaUnitsG6ScienceStoredEnergy, ...newYorkUnitsScienceG6UNITS, ...unitsOf(minnesotaG6Courses, "science")];

import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { SCIENCE_9 as texasUnitsScience9SCIENCE9 } from "../../texas/units/science-9";
import { units as ontarioG9ScienceUnits } from "../../ontario/g9-science";
import { units as manitobaUnitsG9MoreScienceUnits } from "../../manitoba/units/g9-more-science";
import { PHYSICAL_SCIENCE as californiaUnitsScienceG9PhysicalPHYSICALSCIENCE } from "../../california/units/science-g9-physical";
import { SCIENCE_9 as alaskaUnitsScienceG9SCIENCE9 } from "../../alaska/units/science-g9";
import { peGoodScience9 as princeEdwardIslandUnitsG9ScienceSocialPeGoodScience9 } from "../../prince-edward-island/units/g9-science-social";
import { units as manitobaUnitsG9ScienceUnits } from "../../manitoba/units/g9-science";
import { SCIENCE_9 as washingtonUnitsScience9SCIENCE9 } from "../../washington/units/science-9";
import { UNITS as alabamaUnitsScienceG9UNITS } from "../../alabama/units/science-g9";
import { units as albertaG9ScienceUnits } from "../../alberta/g9-science";
import { UNITS as newYorkUnitsScienceG9UNITS } from "../../new-york/units/science-g9";
import { courses as texasG9Courses } from "../../texas/g9";

// The units Florida's Grade 9 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...texasUnitsScience9SCIENCE9, ...ontarioG9ScienceUnits, ...manitobaUnitsG9MoreScienceUnits, ...californiaUnitsScienceG9PhysicalPHYSICALSCIENCE, ...alaskaUnitsScienceG9SCIENCE9, princeEdwardIslandUnitsG9ScienceSocialPeGoodScience9, ...manitobaUnitsG9ScienceUnits, ...washingtonUnitsScience9SCIENCE9, ...alabamaUnitsScienceG9UNITS, ...albertaG9ScienceUnits, ...newYorkUnitsScienceG9UNITS, ...unitsOf(texasG9Courses, "science")];

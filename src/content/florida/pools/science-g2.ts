import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { units as ontarioG2ScienceUnits } from "../../ontario/g2-science";
import { peWeatherAndWind2 as princeEdwardIslandUnitsG2ScienceSocialPeWeatherAndWind2 } from "../../prince-edward-island/units/g2-science-social";
import { SCIENCE_2 as washingtonUnitsScienceK2SCIENCE2 } from "../../washington/units/science-k2";
import { SCIENCE_3 as washingtonUnitsScience35SCIENCE3 } from "../../washington/units/science-35";
import { courses as minnesotaG2Courses } from "../../minnesota/g2";

// The units Florida's Grade 2 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG2ScienceUnits, princeEdwardIslandUnitsG2ScienceSocialPeWeatherAndWind2, ...washingtonUnitsScienceK2SCIENCE2, ...washingtonUnitsScience35SCIENCE3, ...unitsOf(minnesotaG2Courses, "science")];

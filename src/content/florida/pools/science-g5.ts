import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { units as ontarioG5ScienceUnits } from "../../ontario/g5-science";
import { SCIENCE_5 as texasUnitsScience5SCIENCE5 } from "../../texas/units/science-5";
import { peAirAndSun5 as princeEdwardIslandUnitsG5ScienceSocialPeAirAndSun5 } from "../../prince-edward-island/units/g5-science-social";
import { speed as manitobaUnitsG3ScienceSpeed } from "../../manitoba/units/g3-science";
import { weather as manitobaUnitsG5ScienceWeather } from "../../manitoba/units/g5-science";
import { friction as manitobaUnitsG5ScienceFriction } from "../../manitoba/units/g5-science";
import { units as manitobaUnitsG4MoreScienceUnits } from "../../manitoba/units/g4-more-science";
import { courses as alabamaG5Courses } from "../../alabama/g5";

// The units Florida's Grade 5 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG5ScienceUnits, ...texasUnitsScience5SCIENCE5, princeEdwardIslandUnitsG5ScienceSocialPeAirAndSun5, manitobaUnitsG3ScienceSpeed, manitobaUnitsG5ScienceWeather, manitobaUnitsG5ScienceFriction, ...manitobaUnitsG4MoreScienceUnits, ...unitsOf(alabamaG5Courses, "science")];

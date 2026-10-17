import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { units as ontarioG4ScienceUnits } from "../../ontario/g4-science";
import { units as albertaG4ScienceUnits } from "../../alberta/g4-science";
import { peMinerals4 as princeEdwardIslandUnitsG4ScienceSocialPeMinerals4 } from "../../prince-edward-island/units/g4-science-social";
import { units as ontarioG5ScienceUnits } from "../../ontario/g5-science";
import { courses as texasG4Courses } from "../../texas/g4";
import { courses as minnesotaG4Courses } from "../../minnesota/g4";

// The units Florida's Grade 4 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG4ScienceUnits, ...albertaG4ScienceUnits, princeEdwardIslandUnitsG4ScienceSocialPeMinerals4, ...ontarioG5ScienceUnits, ...unitsOf(texasG4Courses, "science"), ...unitsOf(minnesotaG4Courses, "science")];

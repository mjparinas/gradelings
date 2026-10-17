import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { scienceUnits as manitobaUnitsGkMoreScienceScienceUnits } from "../../manitoba/units/gk-more-science";
import { units as albertaKScienceUnits } from "../../alberta/k-science";
import { units as ontarioKScienceUnits } from "../../ontario/k-science";
import { courses as arizonaKCourses } from "../../arizona/k";
import { courses as alabamaKCourses } from "../../alabama/k";

// The units Florida's Kindergarten science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...manitobaUnitsGkMoreScienceScienceUnits, ...albertaKScienceUnits, ...ontarioKScienceUnits, ...unitsOf(arizonaKCourses, "science"), ...unitsOf(alabamaKCourses, "science")];

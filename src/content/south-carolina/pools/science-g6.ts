import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { SCIENCE_6 as washingtonUnitsScience68SCIENCE_6 } from "../../washington/units/science-68";
import { courses as alabamaG6Courses } from "../../alabama/g6";
import { courses as indianaG6Courses } from "../../indiana/g6";
import { senses as newBrunswickUnitsG6ScienceSenses } from "../../new-brunswick/units/g6-science";
import { units as albertaG6ScienceUnits } from "../../alberta/g6-science";

// The units South Carolina's Grade 6 science course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...washingtonUnitsScience68SCIENCE_6,
  newBrunswickUnitsG6ScienceSenses,
  ...albertaG6ScienceUnits,
  ...unitsOf(indianaG6Courses, "science"),
  ...unitsOf(alabamaG6Courses, "science"),
];

import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { OWN_SCIENCE as californiaUnitsScienceG7OWN_SCIENCE } from "../../california/units/science-g7";
import { SCIENCE_7 as washingtonUnitsScience68SCIENCE_7 } from "../../washington/units/science-68";
import { SCIENCE_8 as washingtonUnitsScience68SCIENCE_8 } from "../../washington/units/science-68";
import { UNITS as newYorkUnitsScienceG7UNITS } from "../../new-york/units/science-g7";
import { course as gradesG6ScienceCourse } from "../../grades/g6/science";
import { courses as ohioG7Courses } from "../../ohio/g7";
import { units as ontarioG6ScienceUnits } from "../../ontario/g6-science";
import { units as ontarioG7ScienceUnits } from "../../ontario/g7-science";
import { units as ontarioG9ScienceUnits } from "../../ontario/g9-science";

// The units South Carolina's Grade 7 science course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...washingtonUnitsScience68SCIENCE_7,
  ...gradesG6ScienceCourse.units,
  ...californiaUnitsScienceG7OWN_SCIENCE,
  ...washingtonUnitsScience68SCIENCE_8,
  ...unitsOf(ohioG7Courses, "science"),
  ...ontarioG9ScienceUnits,
  ...ontarioG7ScienceUnits,
  ...ontarioG6ScienceUnits,
  ...newYorkUnitsScienceG7UNITS,
];

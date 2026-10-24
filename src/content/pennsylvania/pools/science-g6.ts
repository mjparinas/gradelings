import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { UNITS as newYorkUnitsScienceG6UNITS } from "../../new-york/units/science-g6";
import { UNITS as newYorkUnitsScienceG7UNITS } from "../../new-york/units/science-g7";
import { UNITS as newYorkUnitsScienceG8UNITS } from "../../new-york/units/science-g8";
import { SCIENCE_7 as texasUnitsScience7SCIENCE7 } from "../../texas/units/science-7";
import { courses as gradesG7IndexCourses } from "../../grades/g7/index";
import { courses as minnesotaG6Courses } from "../../minnesota/g6";

// The units Pennsylvania's Grade 6 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...newYorkUnitsScienceG6UNITS, ...newYorkUnitsScienceG7UNITS, ...newYorkUnitsScienceG8UNITS, ...texasUnitsScience7SCIENCE7, ...unitsOf(gradesG7IndexCourses, "science"), ...unitsOf(minnesotaG6Courses, "science")];

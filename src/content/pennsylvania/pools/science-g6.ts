import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { UNITS as newYorkUnitsScienceG6UNITS } from "../../new-york/units/science-g6";
import { UNITS as newYorkUnitsScienceG8UNITS } from "../../new-york/units/science-g8";
import { UNITS as newYorkUnitsScienceG7UNITS } from "../../new-york/units/science-g7";
import { courses as minnesotaG6Courses } from "../../minnesota/g6";

// The units Pennsylvania's Grade 6 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...newYorkUnitsScienceG6UNITS, ...newYorkUnitsScienceG8UNITS, ...newYorkUnitsScienceG7UNITS, ...unitsOf(minnesotaG6Courses, "science")];

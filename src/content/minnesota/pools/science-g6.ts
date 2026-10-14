import type { Unit } from "../../types";
import { course as gradesG5ScienceCourse } from "../../grades/g5/science";

// The units Minnesota's Grade 6 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...gradesG5ScienceCourse.units];

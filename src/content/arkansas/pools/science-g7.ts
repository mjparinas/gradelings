import type { Unit } from "../../types";
import { SCIENCE_7 as washingtonUnitsScience68SCIENCE_7 } from "../../washington/units/science-68";
import { course as gradesG6Science } from "../../grades/g6/science";
import { units as ontarioG7Science } from "../../ontario/g7-science";
import { units as albertaG6Science } from "../../alberta/g6-science";
import { units as ontarioG9Science } from "../../ontario/g9-science";
import { units as ontarioG6Science } from "../../ontario/g6-science";
import { course as gradesG5Science } from "../../grades/g5/science";

// The units Arkansas's Grade 7 science course copies from other frameworks (see ../plan/science.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsScience68SCIENCE_7, ...gradesG6Science.units, ...ontarioG7Science, ...albertaG6Science, ...ontarioG9Science, ...ontarioG6Science, ...gradesG5Science.units];

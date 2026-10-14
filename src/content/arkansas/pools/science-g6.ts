import type { Unit } from "../../types";
import { SCIENCE_6 as washingtonUnitsScience68SCIENCE_6 } from "../../washington/units/science-68";
import { senses as newBrunswickUnitsG6ScienceSenses } from "../../new-brunswick/units/g6-science";
import { units as albertaG7Science } from "../../alberta/g7-science";
import { SCIENCE_7 as texasUnitsScience7SCIENCE_7 } from "../../texas/units/science-7";
import { SCIENCE_6 as texasUnitsScience6SCIENCE_6 } from "../../texas/units/science-6";

// The units Arkansas's Grade 6 science course copies from other frameworks (see ../plan/science.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsScience68SCIENCE_6, newBrunswickUnitsG6ScienceSenses, ...albertaG7Science, ...texasUnitsScience7SCIENCE_7, ...texasUnitsScience6SCIENCE_6];

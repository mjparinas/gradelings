import type { Unit } from "../../types";
import { OWN_SCIENCE as californiaUnitsScienceG8OWN_SCIENCE } from "../../california/units/science-g8";
import { SCIENCE_6 as texasUnitsScience6SCIENCE_6 } from "../../texas/units/science-6";
import { SCIENCE_7 as texasUnitsScience7SCIENCE_7 } from "../../texas/units/science-7";
import { SCIENCE_8 as washingtonUnitsScience68SCIENCE_8 } from "../../washington/units/science-68";
import { UNITS as newYorkUnitsScienceG8UNITS } from "../../new-york/units/science-g8";
import { motionForces as newBrunswickUnitsG8ScienceMotionForces } from "../../new-brunswick/units/g8-science";

// The units South Carolina's Grade 8 science course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  newBrunswickUnitsG8ScienceMotionForces,
  ...washingtonUnitsScience68SCIENCE_8,
  ...texasUnitsScience6SCIENCE_6,
  ...newYorkUnitsScienceG8UNITS,
  ...californiaUnitsScienceG8OWN_SCIENCE,
  ...texasUnitsScience7SCIENCE_7,
];

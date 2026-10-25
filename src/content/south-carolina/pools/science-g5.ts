import type { Unit } from "../../types";
import { SCIENCE_5 as texasUnitsScience5SCIENCE_5 } from "../../texas/units/science-5";
import { SCIENCE_5 as washingtonUnitsScience35SCIENCE_5 } from "../../washington/units/science-35";
import { units as albertaG5ScienceUnits } from "../../alberta/g5-science";
import { units as ontarioG5ScienceUnits } from "../../ontario/g5-science";
import { weather as manitobaUnitsG5ScienceWeather } from "../../manitoba/units/g5-science";

// The units South Carolina's Grade 5 science course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...ontarioG5ScienceUnits,
  ...albertaG5ScienceUnits,
  ...washingtonUnitsScience35SCIENCE_5,
  manitobaUnitsG5ScienceWeather,
  ...texasUnitsScience5SCIENCE_5,
];

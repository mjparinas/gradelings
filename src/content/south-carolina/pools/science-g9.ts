import type { Unit } from "../../types";
import { SCIENCE_9 as texasUnitsScience9SCIENCE_9 } from "../../texas/units/science-9";
import { SCIENCE_9 as washingtonUnitsScience9SCIENCE_9 } from "../../washington/units/science-9";
import { units as albertaG9ScienceUnits } from "../../alberta/g9-science";
import { units as manitobaUnitsG9MoreScienceUnits } from "../../manitoba/units/g9-more-science";
import { units as manitobaUnitsG9ScienceUnits } from "../../manitoba/units/g9-science";
import { units as ontarioG9ScienceUnits } from "../../ontario/g9-science";

// The units South Carolina's Grade 9 science course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...texasUnitsScience9SCIENCE_9,
  ...ontarioG9ScienceUnits,
  ...manitobaUnitsG9ScienceUnits,
  ...albertaG9ScienceUnits,
  ...washingtonUnitsScience9SCIENCE_9,
  ...manitobaUnitsG9MoreScienceUnits,
];

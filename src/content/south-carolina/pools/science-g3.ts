import type { Unit } from "../../types";
import { SCIENCE_3 as oregonUnitsScience35SCIENCE_3 } from "../../oregon/units/science-35";
import { SCIENCE_3 as washingtonUnitsScience35SCIENCE_3 } from "../../washington/units/science-35";
import { life as manitobaUnitsG3ScienceLife } from "../../manitoba/units/g3-science";
import { speed as manitobaUnitsG3ScienceSpeed } from "../../manitoba/units/g3-science";
import { units as ontarioG3ScienceUnits } from "../../ontario/g3-science";

// The units South Carolina's Grade 3 science course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...washingtonUnitsScience35SCIENCE_3,
  manitobaUnitsG3ScienceLife,
  ...ontarioG3ScienceUnits,
  manitobaUnitsG3ScienceSpeed,
  ...oregonUnitsScience35SCIENCE_3,
];

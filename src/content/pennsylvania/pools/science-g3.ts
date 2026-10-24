import type { Unit } from "../../types";
import { SCIENCE_3 as washingtonUnitsScience35SCIENCE3 } from "../../washington/units/science-35";
import { UNITS as newYorkUnitsScienceG3UNITS } from "../../new-york/units/science-g3";
import { units as ontarioG3ScienceUnits } from "../../ontario/g3-science";
import { life as manitobaUnitsG3ScienceLife } from "../../manitoba/units/g3-science";
import { speed as manitobaUnitsG3ScienceSpeed } from "../../manitoba/units/g3-science";
import { SCIENCE_3 as oregonUnitsScience35SCIENCE3 } from "../../oregon/units/science-35";

// The units Pennsylvania's Grade 3 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsScience35SCIENCE3, ...newYorkUnitsScienceG3UNITS, ...ontarioG3ScienceUnits, manitobaUnitsG3ScienceLife, manitobaUnitsG3ScienceSpeed, ...oregonUnitsScience35SCIENCE3];

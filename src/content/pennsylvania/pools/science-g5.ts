import type { Unit } from "../../types";
import { units as ontarioG5ScienceUnits } from "../../ontario/g5-science";
import { weather as manitobaUnitsG5ScienceWeather } from "../../manitoba/units/g5-science";
import { SCIENCE_5 as oregonUnitsScience35SCIENCE5 } from "../../oregon/units/science-35";
import { units as albertaG5ScienceUnits } from "../../alberta/g5-science";
import { UNITS as newYorkUnitsScienceG5UNITS } from "../../new-york/units/science-g5";
import { SCIENCE_5 as texasUnitsScience5SCIENCE5 } from "../../texas/units/science-5";
import { SCIENCE_5 as washingtonUnitsScience35SCIENCE5 } from "../../washington/units/science-35";

// The units Pennsylvania's Grade 5 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG5ScienceUnits, manitobaUnitsG5ScienceWeather, ...oregonUnitsScience35SCIENCE5, ...albertaG5ScienceUnits, ...newYorkUnitsScienceG5UNITS, ...texasUnitsScience5SCIENCE5, ...washingtonUnitsScience35SCIENCE5];

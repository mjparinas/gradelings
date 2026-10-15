import type { Unit } from "../../types";
import { units as ontarioG5Science } from "../../ontario/g5-science";
import { units as albertaG5Science } from "../../alberta/g5-science";
import { SCIENCE_5 as washingtonUnitsScience35SCIENCE_5 } from "../../washington/units/science-35";
import { weather as manitobaUnitsG5ScienceWeather } from "../../manitoba/units/g5-science";
import { SCIENCE_5 as texasUnitsScience5SCIENCE_5 } from "../../texas/units/science-5";
import { SCIENCE_5 as oregonUnitsScience35SCIENCE_5 } from "../../oregon/units/science-35";

// The units Arkansas's Grade 5 science course copies from other frameworks (see ../plan/science.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG5Science, ...albertaG5Science, ...washingtonUnitsScience35SCIENCE_5, manitobaUnitsG5ScienceWeather, ...texasUnitsScience5SCIENCE_5, ...oregonUnitsScience35SCIENCE_5];

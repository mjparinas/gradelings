import type { Unit } from "../../types";
import { units as ontario5 } from "../../ontario/g5-science";
import { units as alberta5 } from "../../alberta/g5-science";
import { weather as manitobaWeather } from "../../manitoba/units/g5-science";
import { SCIENCE_5 as washington5 } from "../../washington/units/science-35";
import { SCIENCE_5 as oregon5 } from "../../oregon/units/science-35";

// The units New York's Grade 5 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontario5, ...alberta5, manitobaWeather, ...washington5, ...oregon5];

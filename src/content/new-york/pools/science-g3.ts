import type { Unit } from "../../types";
import { units as ontario3 } from "../../ontario/g3-science";
import { life as manitobaLife, speed as manitobaSpeed } from "../../manitoba/units/g3-science";
import { SCIENCE_3 as washington3 } from "../../washington/units/science-35";
import { SCIENCE_3 as oregon3 } from "../../oregon/units/science-35";

// The units New York's Grade 3 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontario3, manitobaLife, manitobaSpeed, ...washington3, ...oregon3];

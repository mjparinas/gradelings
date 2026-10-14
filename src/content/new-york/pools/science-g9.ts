import type { Unit } from "../../types";
import { units as ontario9 } from "../../ontario/g9-science";
import { units as manitoba9 } from "../../manitoba/units/g9-science";
import { units as manitoba9More } from "../../manitoba/units/g9-more-science";
import { units as alberta9 } from "../../alberta/g9-science";
import { SCIENCE_9 as washington9 } from "../../washington/units/science-9";

// The units New York's Grade 9 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontario9, ...manitoba9, ...manitoba9More, ...alberta9, ...washington9];

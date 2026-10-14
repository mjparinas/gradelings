import type { Unit } from "../../types";
import { units as ontarioG9Math } from "../../ontario/g9-math";
import { units as albertaG9Math } from "../../alberta/g9-math";
import { units as manitobaG9MoreMath } from "../../manitoba/units/g9-more-math";
import { G9_UNITS as oregonMathG9 } from "../../oregon/units/math-g9";
import { G9_UNITS as washingtonMathUpperG9 } from "../../washington/units/math-upper";

// The units Alabama's Grade 9 math course copies from other frameworks (see ../plan/math.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG9Math, ...washingtonMathUpperG9, ...albertaG9Math, ...oregonMathG9, ...manitobaG9MoreMath];

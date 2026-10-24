import type { Unit } from "../../types";
import { SOCIAL_9 as californiaUnitsSocialG9SOCIAL9 } from "../../california/units/social-g9";
import { COPIES_8 as arizonaUnitsCopiesG8COPIES8 } from "../../arizona/units/copies-g8";
import { UNITS as alabamaUnitsSocialG9UNITS } from "../../alabama/units/social-g9";
import { SOCIAL_9 as maineUnitsSocialG9SOCIAL9 } from "../../maine/units/social-g9";

// The units Pennsylvania's Grade 9 social studies course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...californiaUnitsSocialG9SOCIAL9, ...arizonaUnitsCopiesG8COPIES8, ...alabamaUnitsSocialG9UNITS, ...maineUnitsSocialG9SOCIAL9];

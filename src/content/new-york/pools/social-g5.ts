import type { Unit } from "../../types";
import { SOCIAL_7 as californiaSocialG7 } from "../../california/units/social-g7";

// The units New York's Grade 5 social course copies from other frameworks (see ../plan/social.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...californiaSocialG7];

import type { Unit } from "../../types";
import { OWN_SOCIAL_5 as oregonUnitsSocialG5OWN_SOCIAL_5 } from "../../oregon/units/social-g5";

// The units Minnesota's Grade 4 social studies course copies from other frameworks (see ../plan/social.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...oregonUnitsSocialG5OWN_SOCIAL_5];

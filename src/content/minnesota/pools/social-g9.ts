import type { Unit } from "../../types";
import { SOCIAL_9 as californiaUnitsSocialG9SOCIAL_9 } from "../../california/units/social-g9";

// The units Minnesota's Grade 9 social studies course copies from other frameworks (see ../plan/social.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...californiaUnitsSocialG9SOCIAL_9];

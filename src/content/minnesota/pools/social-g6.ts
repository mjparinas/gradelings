import type { Unit } from "../../types";
import { units as manitobaUnitsG8MoreSocialBUnits } from "../../manitoba/units/g8-more-social-b";

// The units Minnesota's Grade 6 social studies course copies from other frameworks (see ../plan/social.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...manitobaUnitsG8MoreSocialBUnits];

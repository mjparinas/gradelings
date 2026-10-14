import type { Unit } from "../../types";
import { SOCIAL_9 as californiaUnitsSocialG9SOCIAL_9 } from "../../california/units/social-g9";
import { SOCIAL_9 as maineUnitsSocialG9SOCIAL_9 } from "../../maine/units/social-g9";
import { SOCIAL_9 as texasUnitsSocialG9SOCIAL_9 } from "../../texas/units/social-g9";

// The units Arkansas's Grade 9 social studies course copies from other frameworks (see ../plan/social.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...californiaUnitsSocialG9SOCIAL_9, ...maineUnitsSocialG9SOCIAL_9, ...texasUnitsSocialG9SOCIAL_9];

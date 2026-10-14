import type { Unit } from "../../types";
import { UNITS as newYorkG5 } from "../../new-york/units/social-g5";
import { SOCIAL_5 as californiaG5 } from "../../california/units/social-g5";
import { SOCIAL_8 as californiaG8 } from "../../california/units/social-g8";
import { SOCIAL_9 as californiaG9 } from "../../california/units/social-g9";
import { G8 as washingtonG8 } from "../../washington/units/social-59-g8";

// The units Alabama's Grade 6 social studies course copies from other frameworks (see ../plan/social.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...newYorkG5, ...californiaG5, ...californiaG8, ...californiaG9, ...washingtonG8];

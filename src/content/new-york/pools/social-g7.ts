import type { Unit } from "../../types";
import { SOCIAL_5 as californiaSocialG5 } from "../../california/units/social-g5";
import { SOCIAL_8 as californiaSocialG8 } from "../../california/units/social-g8";
import { G8 as washingtonSocial59G8 } from "../../washington/units/social-59-g8";

// The units New York's Grade 7 social course copies from other frameworks (see ../plan/social-g78.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...californiaSocialG5, ...californiaSocialG8, ...washingtonSocial59G8];

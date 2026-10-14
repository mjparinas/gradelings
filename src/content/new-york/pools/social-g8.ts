import type { Unit } from "../../types";
import { SOCIAL_8 as californiaSocialG8 } from "../../california/units/social-g8";
import { reconstruction8 as oregonReconstruction8 } from "../../oregon/units/social-copies";

// The units New York's Grade 8 social course copies from other frameworks (see ../plan/social-g78.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...californiaSocialG8, oregonReconstruction8];

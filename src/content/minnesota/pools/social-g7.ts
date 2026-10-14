import type { Unit } from "../../types";
import { G8 as washingtonUnitsSocial59G8G8 } from "../../washington/units/social-59-g8";
import { SOCIAL_8 as californiaUnitsSocialG8SOCIAL_8 } from "../../california/units/social-g8";
import { reconstruction8 as oregonUnitsSocialCopiesReconstruction8 } from "../../oregon/units/social-copies";

// The units Minnesota's Grade 7 social studies course copies from other frameworks (see ../plan/social.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [oregonUnitsSocialCopiesReconstruction8, ...californiaUnitsSocialG8SOCIAL_8, ...washingtonUnitsSocial59G8G8];

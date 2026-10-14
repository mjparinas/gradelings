import type { Unit } from "../../types";
import { reconstruction8 as oregonSocialCopiesReconstruction8 } from "../../oregon/units/social-copies";
import { OWN_SOCIAL_5 as oregonSocialG5OWN_SOCIAL_5 } from "../../oregon/units/social-g5";

// The units Alabama's Grade 4 social studies course copies from other frameworks (see ../plan/social-alabama.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...oregonSocialG5OWN_SOCIAL_5, oregonSocialCopiesReconstruction8];

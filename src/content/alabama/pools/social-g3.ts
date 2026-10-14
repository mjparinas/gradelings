import type { Unit } from "../../types";
import { OWN_SOCIAL_2 as oregonSocialK3OWN_SOCIAL_2 } from "../../oregon/units/social-k3";

// The units Alabama's Grade 3 social studies course copies from other frameworks (see ../plan/social-alabama.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...oregonSocialK3OWN_SOCIAL_2];

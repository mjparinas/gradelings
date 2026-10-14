import type { Unit } from "../../types";
import { OWN_SOCIAL_7 as oregonG7 } from "../../oregon/units/social-g67";

// The units Alabama's Grade 9 social studies course copies from other frameworks (see ../plan/social.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...oregonG7];

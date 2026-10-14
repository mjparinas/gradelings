import type { Unit } from "../../types";
import { SOCIAL_7 as californiaG7 } from "../../california/units/social-g7";
import { OWN_SOCIAL_7 as oregonG7 } from "../../oregon/units/social-g67";
import { UNITS as newYorkG9 } from "../../new-york/units/social-g9";

// The units Alabama's Grade 8 social studies course copies from other frameworks (see ../plan/social.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...californiaG7, ...oregonG7, ...newYorkG9];

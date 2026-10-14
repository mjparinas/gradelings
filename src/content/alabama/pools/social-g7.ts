import type { Unit } from "../../types";
import { G6 as washingtonG6 } from "../../washington/units/social-59-g6";
import { units as ontarioG8 } from "../../ontario/g8-social";
import { units as manitobaG8a } from "../../manitoba/units/g8-more-social-a";
import { SOCIAL_6 as californiaG6 } from "../../california/units/social-g6";

// The units Alabama's Grade 7 social studies course copies from other frameworks (see ../plan/social.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonG6, ...ontarioG8, ...manitobaG8a, ...californiaG6];

import type { Unit } from "../../types";
import { SOCIAL_9 as californiaSocialG9 } from "../../california/units/social-g9";
import { SOCIAL_9 } from "../units/social-g9";

// Texas Grade 9 social. POOL is the units this course may copy from other frameworks (see ../plan/social.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...californiaSocialG9];

export const OWN: readonly Unit[] = SOCIAL_9;

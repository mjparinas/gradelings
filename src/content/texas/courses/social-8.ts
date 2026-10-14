import type { Unit } from "../../types";
import { reconstruction8 as oregonSocialCopiesReconstruction8 } from "../../oregon/units/social-copies";
import { G8 as washingtonSocial59G8G8 } from "../../washington/units/social-59-g8";

// Texas Grade 8 social. POOL is the units this course may copy from other frameworks (see ../plan/social.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...washingtonSocial59G8G8, oregonSocialCopiesReconstruction8];

export const OWN: readonly Unit[] = [];

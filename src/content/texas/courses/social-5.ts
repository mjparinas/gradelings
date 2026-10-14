import type { Unit } from "../../types";
import { SOCIAL_5 as californiaSocialG5 } from "../../california/units/social-g5";
import { historyDetective5 as oregonSocialCopiesHistoryDetective5 } from "../../oregon/units/social-copies";
import { OWN_SOCIAL_5 as oregonSocialG5OWN_SOCIAL_5 } from "../../oregon/units/social-g5";
import { SOCIAL_5 } from "../units/social-g5";

// Texas Grade 5 social. POOL is the units this course may copy from other frameworks (see ../plan/social.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...oregonSocialG5OWN_SOCIAL_5, oregonSocialCopiesHistoryDetective5, ...californiaSocialG5];

export const OWN: readonly Unit[] = SOCIAL_5;

import type { Unit } from "../../types";
import { moreSocial as manitobaG2MoreSocialMoreSocial } from "../../manitoba/units/g2-more-social";
import { communityChange as novaScotiaG2SocialCommunityChange } from "../../nova-scotia/units/g2-social";
import { units as ontarioG2Social } from "../../ontario/g2-social";
import { OWN_SOCIAL_2 as oregonSocialK3OWN_SOCIAL_2 } from "../../oregon/units/social-k3";

// Texas Grade 2 social. POOL is the units this course may copy from other frameworks (see ../plan/social.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG2Social, novaScotiaG2SocialCommunityChange, ...manitobaG2MoreSocialMoreSocial, ...oregonSocialK3OWN_SOCIAL_2];

export const OWN: readonly Unit[] = [];

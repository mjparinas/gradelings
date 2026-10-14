import type { Unit } from "../../types";
import { SOCIAL_3 as californiaSocialG3 } from "../../california/units/social-g3";
import { findOut as manitobaG3MoreSocialFindOut, team as manitobaG3MoreSocialTeam } from "../../manitoba/units/g3-more-social";
import { SOCIAL_3 } from "../units/social-g3";

// Texas Grade 3 social. POOL is the units this course may copy from other frameworks (see ../plan/social.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [manitobaG3MoreSocialTeam, manitobaG3MoreSocialFindOut, ...californiaSocialG3];

export const OWN: readonly Unit[] = SOCIAL_3;

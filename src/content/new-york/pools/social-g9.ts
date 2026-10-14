import type { Unit } from "../../types";
import { course as gradesG7Social } from "../../grades/g7/social";
import { course as gradesG8Social } from "../../grades/g8/social";
import { SOCIAL_6 as californiaSocialG6 } from "../../california/units/social-g6";
import { SOCIAL_7 as californiaSocialG7 } from "../../california/units/social-g7";
import { OWN_SOCIAL_7 as oregonSocialG7 } from "../../oregon/units/social-g67";

// The units New York's Grade 9 social course copies from other frameworks (see ../plan/social-g9.ts): BC Grade 7's and
// Grade 8's ancient and medieval world units, California's Grade 6 and 7 units and Oregon's Grade 7 units. Import only
// the unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...gradesG7Social.units,
  ...gradesG8Social.units,
  ...californiaSocialG6,
  ...californiaSocialG7,
  ...oregonSocialG7,
];

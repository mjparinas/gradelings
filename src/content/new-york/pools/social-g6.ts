import type { Unit } from "../../types";
import { SOCIAL_6 as californiaSocialG6 } from "../../california/units/social-g6";
import { SOCIAL_7 as californiaSocialG7 } from "../../california/units/social-g7";
import { course as gradesG7Social } from "../../grades/g7/social";
import { course as gradesG8Social } from "../../grades/g8/social";
import { G6 as washingtonSocialG6 } from "../../washington/units/social-59-g6";

// The units New York's Grade 6 social course copies from other frameworks (see ../plan/social.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...washingtonSocialG6,
  ...gradesG7Social.units,
  ...gradesG8Social.units,
  ...californiaSocialG6,
  ...californiaSocialG7,
];

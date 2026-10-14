import type { Unit } from "../../types";
import { G6 as washingtonUnitsSocial59G6G6 } from "../../washington/units/social-59-g6";
import { SOCIAL_6 as californiaUnitsSocialG6SOCIAL_6 } from "../../california/units/social-g6";
import { course as gradesG7SocialCourse } from "../../grades/g7/social";
import { life as manitobaUnitsG3SocialBLife } from "../../manitoba/units/g3-social-b";
import { team as manitobaUnitsG3MoreSocialTeam } from "../../manitoba/units/g3-more-social";

// The units Minnesota's Grade 3 social studies course copies from other frameworks (see ../plan/social.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [manitobaUnitsG3SocialBLife, ...gradesG7SocialCourse.units, ...washingtonUnitsSocial59G6G6, ...californiaUnitsSocialG6SOCIAL_6, manitobaUnitsG3MoreSocialTeam];

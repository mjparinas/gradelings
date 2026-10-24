import type { Unit } from "../../types";
import { UNITS as newYorkUnitsSocialG3UNITS } from "../../new-york/units/social-g3";
import { findOut as manitobaUnitsG3MoreSocialFindOut } from "../../manitoba/units/g3-more-social";
import { life as manitobaUnitsG3SocialBLife } from "../../manitoba/units/g3-social-b";
import { team as manitobaUnitsG3MoreSocialTeam } from "../../manitoba/units/g3-more-social";
import { SOCIAL_3 as texasUnitsSocialG3SOCIAL3 } from "../../texas/units/social-g3";

// The units Pennsylvania's Grade 3 social studies course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...newYorkUnitsSocialG3UNITS, manitobaUnitsG3MoreSocialFindOut, manitobaUnitsG3SocialBLife, manitobaUnitsG3MoreSocialTeam, ...texasUnitsSocialG3SOCIAL3];

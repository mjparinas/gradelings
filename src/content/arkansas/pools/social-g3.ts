import type { Unit } from "../../types";
import { UNITS as newYorkUnitsSocialG3 } from "../../new-york/units/social-g3";
import { life as manitobaUnitsG3SocialBLife } from "../../manitoba/units/g3-social-b";
import { findOut as manitobaUnitsG3MoreSocialFindOut } from "../../manitoba/units/g3-more-social";

// The units Arkansas's Grade 3 social studies course copies from other frameworks (see ../plan/social.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...newYorkUnitsSocialG3, manitobaUnitsG3SocialBLife, manitobaUnitsG3MoreSocialFindOut];

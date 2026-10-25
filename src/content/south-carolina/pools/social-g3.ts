import type { Unit } from "../../types";
import { UNITS as newYorkUnitsSocialG3UNITS } from "../../new-york/units/social-g3";
import { course as gradesG3SocialCourse } from "../../grades/g3/social";
import { life as manitobaUnitsG3SocialBLife } from "../../manitoba/units/g3-social-b";

// The units South Carolina's Grade 3 social studies course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...newYorkUnitsSocialG3UNITS,
  ...gradesG3SocialCourse.units,
  manitobaUnitsG3SocialBLife,
];

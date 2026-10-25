import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { SOCIAL_9 as californiaUnitsSocialG9SOCIAL_9 } from "../../california/units/social-g9";
import { SOCIAL_9 as maineUnitsSocialG9SOCIAL_9 } from "../../maine/units/social-g9";
import { SOCIAL_9 as texasUnitsSocialG9SOCIAL_9 } from "../../texas/units/social-g9";
import { courses as floridaG9Courses } from "../../florida/g9";
import { courses as pennsylvaniaG9Courses } from "../../pennsylvania/g9";

// The units South Carolina's Grade 9 social studies course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...californiaUnitsSocialG9SOCIAL_9,
  ...maineUnitsSocialG9SOCIAL_9,
  ...texasUnitsSocialG9SOCIAL_9,
  ...unitsOf(pennsylvaniaG9Courses, "social"),
  ...unitsOf(floridaG9Courses, "social"),
];

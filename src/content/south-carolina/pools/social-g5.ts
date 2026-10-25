import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { SOCIAL_5 as texasUnitsSocialG5SOCIAL_5 } from "../../texas/units/social-g5";
import { SOCIAL_8 as californiaUnitsSocialG8SOCIAL_8 } from "../../california/units/social-g8";
import { UNITS as newYorkUnitsSocialG8UNITS } from "../../new-york/units/social-g8";
import { courses as georgiaG5Courses } from "../../georgia/g5";

// The units South Carolina's Grade 5 social studies course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...texasUnitsSocialG5SOCIAL_5,
  ...californiaUnitsSocialG8SOCIAL_8,
  ...newYorkUnitsSocialG8UNITS,
  ...unitsOf(georgiaG5Courses, "social"),
];

import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { G8 as washingtonUnitsSocial59G8G8 } from "../../washington/units/social-59-g8";
import { OWN_SOCIAL_8 as oregonUnitsSocialG8OWN_SOCIAL_8 } from "../../oregon/units/social-g8";
import { SOCIAL_8 as californiaUnitsSocialG8SOCIAL_8 } from "../../california/units/social-g8";
import { SOCIAL_8 as texasUnitsSocialG8SOCIAL_8 } from "../../texas/units/social-g8";
import { UNITS as newYorkUnitsSocialG8UNITS } from "../../new-york/units/social-g8";
import { courses as floridaG8Courses } from "../../florida/g8";

// The units South Carolina's Grade 8 social studies course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...unitsOf(floridaG8Courses, "social"),
  ...californiaUnitsSocialG8SOCIAL_8,
  ...oregonUnitsSocialG8OWN_SOCIAL_8,
  ...washingtonUnitsSocial59G8G8,
  ...texasUnitsSocialG8SOCIAL_8,
  ...newYorkUnitsSocialG8UNITS,
];

import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { G6 as washingtonUnitsSocial59G6G6 } from "../../washington/units/social-59-g6";
import { SOCIAL_6 as californiaUnitsSocialG6SOCIAL_6 } from "../../california/units/social-g6";
import { SOCIAL_7 as californiaUnitsSocialG7SOCIAL_7 } from "../../california/units/social-g7";
import { UNITS as alabamaUnitsSocialG9UNITS } from "../../alabama/units/social-g9";
import { UNITS as newYorkUnitsSocialG6UNITS } from "../../new-york/units/social-g6";
import { UNITS as newYorkUnitsSocialG9UNITS } from "../../new-york/units/social-g9";
import { course as gradesG7SocialCourse } from "../../grades/g7/social";
import { course as gradesG8SocialCourse } from "../../grades/g8/social";
import { courses as indianaG6Courses } from "../../indiana/g6";

// The units South Carolina's Grade 6 social studies course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...gradesG7SocialCourse.units,
  ...washingtonUnitsSocial59G6G6,
  ...californiaUnitsSocialG6SOCIAL_6,
  ...gradesG8SocialCourse.units,
  ...newYorkUnitsSocialG9UNITS,
  ...newYorkUnitsSocialG6UNITS,
  ...californiaUnitsSocialG7SOCIAL_7,
  ...unitsOf(indianaG6Courses, "social"),
  ...alabamaUnitsSocialG9UNITS,
];

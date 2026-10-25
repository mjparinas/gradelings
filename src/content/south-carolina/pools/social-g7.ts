import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { G6 as washingtonUnitsSocial59G6G6 } from "../../washington/units/social-59-g6";
import { SOCIAL_6 as texasUnitsSocialG6SOCIAL_6 } from "../../texas/units/social-g6";
import { UNITS as alabamaUnitsSocialG7UNITS } from "../../alabama/units/social-g7";
import { UNITS as newYorkUnitsSocialG5UNITS } from "../../new-york/units/social-g5";
import { courses as alabamaG7Courses } from "../../alabama/g7";
import { courses as coloradoG7Courses } from "../../colorado/g7";
import { courses as oregonG7Courses } from "../../oregon/g7";
import { units as ontarioG8SocialUnits } from "../../ontario/g8-social";

// The units South Carolina's Grade 7 social studies course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...unitsOf(alabamaG7Courses, "social"),
  ...unitsOf(coloradoG7Courses, "social"),
  ...alabamaUnitsSocialG7UNITS,
  ...washingtonUnitsSocial59G6G6,
  ...unitsOf(oregonG7Courses, "social"),
  ...texasUnitsSocialG6SOCIAL_6,
  ...newYorkUnitsSocialG5UNITS,
  ...ontarioG8SocialUnits,
];

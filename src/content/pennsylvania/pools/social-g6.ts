import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { SOCIAL_6 as californiaUnitsSocialG6SOCIAL6 } from "../../california/units/social-g6";
import { SOCIAL_6 as texasUnitsSocialG6SOCIAL6 } from "../../texas/units/social-g6";
import { G6 as washingtonUnitsSocial59G6G6 } from "../../washington/units/social-59-g6";
import { UNITS as newYorkUnitsSocialG6UNITS } from "../../new-york/units/social-g6";
import { units as manitobaUnitsG8MoreSocialBUnits } from "../../manitoba/units/g8-more-social-b";
import { courses as oregonG6Courses } from "../../oregon/g6";

// The units Pennsylvania's Grade 6 social studies course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...californiaUnitsSocialG6SOCIAL6, ...texasUnitsSocialG6SOCIAL6, ...washingtonUnitsSocial59G6G6, ...newYorkUnitsSocialG6UNITS, ...manitobaUnitsG8MoreSocialBUnits, ...unitsOf(oregonG6Courses, "social")];

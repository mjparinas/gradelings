import type { Unit } from "../../types";
import { course as gradesG7Social } from "../../grades/g7/social";
import { G6 as washingtonUnitsSocial59G6G6 } from "../../washington/units/social-59-g6";
import { SOCIAL_6 as californiaUnitsSocialG6SOCIAL_6 } from "../../california/units/social-g6";
import { SOCIAL_7 as californiaUnitsSocialG7SOCIAL_7 } from "../../california/units/social-g7";
import { course as gradesG8Social } from "../../grades/g8/social";
import { UNITS as newYorkUnitsSocialG9 } from "../../new-york/units/social-g9";

// The units Arkansas's Grade 6 social studies course copies from other frameworks (see ../plan/social.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...gradesG7Social.units, ...washingtonUnitsSocial59G6G6, ...californiaUnitsSocialG6SOCIAL_6, ...californiaUnitsSocialG7SOCIAL_7, ...gradesG8Social.units, ...newYorkUnitsSocialG9];

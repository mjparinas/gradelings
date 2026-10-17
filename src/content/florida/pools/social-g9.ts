import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { UNITS as alabamaUnitsSocialG9UNITS } from "../../alabama/units/social-g9";
import { SOCIAL_7 as californiaUnitsSocialG7SOCIAL7 } from "../../california/units/social-g7";
import { SOCIAL_9 as californiaUnitsSocialG9SOCIAL9 } from "../../california/units/social-g9";
import { UNITS as newYorkUnitsSocialG9UNITS } from "../../new-york/units/social-g9";
import { OWN_SOCIAL_7 as oregonUnitsSocialG67OWNSOCIAL7 } from "../../oregon/units/social-g67";
import { COPIES_8 as arizonaUnitsCopiesG8COPIES8 } from "../../arizona/units/copies-g8";
import { G6 as washingtonUnitsSocial59G6G6 } from "../../washington/units/social-59-g6";
import { courses as newYorkG9Courses } from "../../new-york/g9";

// The units Florida's Grade 9 social studies course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...alabamaUnitsSocialG9UNITS, ...californiaUnitsSocialG7SOCIAL7, ...californiaUnitsSocialG9SOCIAL9, ...newYorkUnitsSocialG9UNITS, ...oregonUnitsSocialG67OWNSOCIAL7, ...arizonaUnitsCopiesG8COPIES8, ...washingtonUnitsSocial59G6G6, ...unitsOf(newYorkG9Courses, "social")];

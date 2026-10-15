import type { Unit } from "../../types";
import { SOCIAL_8 as texasUnitsSocialG8SOCIAL_8 } from "../../texas/units/social-g8";
import { G8 as washingtonUnitsSocial59G8G8 } from "../../washington/units/social-59-g8";
import { reconstruction8 as oregonUnitsSocialCopiesReconstruction8 } from "../../oregon/units/social-copies";
import { SOCIAL_8 as californiaUnitsSocialG8SOCIAL_8 } from "../../california/units/social-g8";
import { UNITS as newYorkUnitsSocialG8 } from "../../new-york/units/social-g8";

// The units Arkansas's Grade 8 social studies course copies from other frameworks (see ../plan/social.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...texasUnitsSocialG8SOCIAL_8, ...washingtonUnitsSocial59G8G8, oregonUnitsSocialCopiesReconstruction8, ...californiaUnitsSocialG8SOCIAL_8, ...newYorkUnitsSocialG8];

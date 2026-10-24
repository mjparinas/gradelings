import type { Unit } from "../../types";
import { COPIES_8 as arizonaUnitsCopiesG8COPIES8 } from "../../arizona/units/copies-g8";
import { UNITS as newYorkUnitsSocialG8UNITS } from "../../new-york/units/social-g8";
import { SOCIAL_8 as californiaUnitsSocialG8SOCIAL8 } from "../../california/units/social-g8";
import { SOCIAL_8 as texasUnitsSocialG8SOCIAL8 } from "../../texas/units/social-g8";
import { G8 as washingtonUnitsSocial59G8G8 } from "../../washington/units/social-59-g8";
import { reconstruction8 as oregonUnitsSocialCopiesReconstruction8 } from "../../oregon/units/social-copies";
import { OWN_SOCIAL_8 as oregonUnitsSocialG8OWNSOCIAL8 } from "../../oregon/units/social-g8";
import { units as ontarioG8SocialUnits } from "../../ontario/g8-social";

// The units Pennsylvania's Grade 8 social studies course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...arizonaUnitsCopiesG8COPIES8, ...newYorkUnitsSocialG8UNITS, ...californiaUnitsSocialG8SOCIAL8, ...texasUnitsSocialG8SOCIAL8, ...washingtonUnitsSocial59G8G8, oregonUnitsSocialCopiesReconstruction8, ...oregonUnitsSocialG8OWNSOCIAL8, ...ontarioG8SocialUnits];

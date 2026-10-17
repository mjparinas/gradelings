import type { Unit } from "../../types";
import { SOCIAL_9 as californiaUnitsSocialG9SOCIAL9 } from "../../california/units/social-g9";
import { SOCIAL_5 as californiaUnitsSocialG5SOCIAL5 } from "../../california/units/social-g5";
import { COPIES_8 as arizonaUnitsCopiesG8COPIES8 } from "../../arizona/units/copies-g8";
import { SOCIAL_8 as californiaUnitsSocialG8SOCIAL8 } from "../../california/units/social-g8";
import { OWN_SOCIAL_8 as oregonUnitsSocialG8OWNSOCIAL8 } from "../../oregon/units/social-g8";
import { SOCIAL_8 as texasUnitsSocialG8SOCIAL8 } from "../../texas/units/social-g8";
import { G8 as washingtonUnitsSocial59G8G8 } from "../../washington/units/social-59-g8";
import { OWN_SOCIAL_5 as oregonUnitsSocialG5OWNSOCIAL5 } from "../../oregon/units/social-g5";
import { units as ontarioG8SocialUnits } from "../../ontario/g8-social";

// The units Florida's Grade 7 social studies course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...californiaUnitsSocialG9SOCIAL9, ...californiaUnitsSocialG5SOCIAL5, ...arizonaUnitsCopiesG8COPIES8, ...californiaUnitsSocialG8SOCIAL8, ...oregonUnitsSocialG8OWNSOCIAL8, ...texasUnitsSocialG8SOCIAL8, ...washingtonUnitsSocial59G8G8, ...oregonUnitsSocialG5OWNSOCIAL5, ...ontarioG8SocialUnits];

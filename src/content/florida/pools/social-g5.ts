import type { Unit } from "../../types";
import { SOCIAL_5 as californiaUnitsSocialG5SOCIAL5 } from "../../california/units/social-g5";
import { OWN_SOCIAL_5 as oregonUnitsSocialG5OWNSOCIAL5 } from "../../oregon/units/social-g5";
import { SOCIAL_5 as texasUnitsSocialG5SOCIAL5 } from "../../texas/units/social-g5";
import { historyDetective5 as oregonUnitsSocialCopiesHistoryDetective5 } from "../../oregon/units/social-copies";
import { G8 as washingtonUnitsSocial59G8G8 } from "../../washington/units/social-59-g8";
import { UNITS as newYorkUnitsSocialG5UNITS } from "../../new-york/units/social-g5";

// The units Florida's Grade 5 social studies course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...californiaUnitsSocialG5SOCIAL5, ...oregonUnitsSocialG5OWNSOCIAL5, ...texasUnitsSocialG5SOCIAL5, oregonUnitsSocialCopiesHistoryDetective5, ...washingtonUnitsSocial59G8G8, ...newYorkUnitsSocialG5UNITS];

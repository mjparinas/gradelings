import type { Unit } from "../../types";
import { historyDetective5 as oregonUnitsSocialCopiesHistoryDetective5 } from "../../oregon/units/social-copies";
import { OWN_SOCIAL_5 as oregonUnitsSocialG5OWNSOCIAL5 } from "../../oregon/units/social-g5";
import { units as manitobaUnitsG4MoreSocialUnits } from "../../manitoba/units/g4-more-social";
import { SOCIAL_5 as californiaUnitsSocialG5SOCIAL5 } from "../../california/units/social-g5";

// The units Pennsylvania's Grade 4 social studies course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [oregonUnitsSocialCopiesHistoryDetective5, ...oregonUnitsSocialG5OWNSOCIAL5, ...manitobaUnitsG4MoreSocialUnits, ...californiaUnitsSocialG5SOCIAL5];

import type { Unit } from "../../types";
import { OWN_SOCIAL_5 as oregonUnitsSocialG5OWN_SOCIAL_5 } from "../../oregon/units/social-g5";
import { historyDetective5 as oregonUnitsSocialCopiesHistoryDetective5 } from "../../oregon/units/social-copies";
import { UNITS as newYorkUnitsSocialG3 } from "../../new-york/units/social-g3";

// The units Arkansas's Grade 4 social studies course copies from other frameworks (see ../plan/social.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...oregonUnitsSocialG5OWN_SOCIAL_5, oregonUnitsSocialCopiesHistoryDetective5, ...newYorkUnitsSocialG3];

import type { Unit } from "../../types";
import { RML_2 as washingtonUnitsLanguageRmlEarlyRML_2 } from "../../washington/units/language-rml-early";
import { moreLanguage as manitobaUnitsG2MoreLanguageMoreLanguage } from "../../manitoba/units/g2-more-language";
import { units as ontarioG2LanguageUnits } from "../../ontario/g2-language";

// The units South Carolina's Grade 2 English language arts course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...ontarioG2LanguageUnits,
  ...manitobaUnitsG2MoreLanguageMoreLanguage,
  washingtonUnitsLanguageRmlEarlyRML_2,
];

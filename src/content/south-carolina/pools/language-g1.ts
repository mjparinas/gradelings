import type { Unit } from "../../types";
import { RML_1 as washingtonUnitsLanguageRmlEarlyRML_1 } from "../../washington/units/language-rml-early";
import { STORY_OR_FACTS as oregonUnitsLanguageReadingSTORY_OR_FACTS } from "../../oregon/units/language-reading";
import { units as ontarioG1LanguageUnits } from "../../ontario/g1-language";

// The units South Carolina's Grade 1 English language arts course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...ontarioG1LanguageUnits,
  washingtonUnitsLanguageRmlEarlyRML_1,
  oregonUnitsLanguageReadingSTORY_OR_FACTS,
];

import type { Unit } from "../../types";
import { LANGUAGE_1 as texasUnitsLanguage1LANGUAGE1 } from "../../texas/units/language-1";
import { LANGUAGE_1 as californiaUnitsLanguageG1LANGUAGE1 } from "../../california/units/language-g1";
import { units as ontarioG1LanguageUnits } from "../../ontario/g1-language";
import { STORY_OR_FACTS as oregonUnitsLanguageReadingSTORYORFACTS } from "../../oregon/units/language-reading";
import { RML_1 as washingtonUnitsLanguageRmlEarlyRML1 } from "../../washington/units/language-rml-early";

// The units Florida's Grade 1 English language arts course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...texasUnitsLanguage1LANGUAGE1, ...californiaUnitsLanguageG1LANGUAGE1, ...ontarioG1LanguageUnits, oregonUnitsLanguageReadingSTORYORFACTS, washingtonUnitsLanguageRmlEarlyRML1];

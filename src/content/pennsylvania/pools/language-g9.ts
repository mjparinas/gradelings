import type { Unit } from "../../types";
import { units as ontarioG9LanguageUnits } from "../../ontario/g9-language";
import { LANGUAGE_9 as texasUnitsLanguage9LANGUAGE9 } from "../../texas/units/language-9";
import { units as manitobaUnitsG9MoreLanguageUnits } from "../../manitoba/units/g9-more-language";
import { SPELLING_9 as washingtonUnitsLanguageSpellingSPELLING9 } from "../../washington/units/language-spelling";
import { WORLD_LITERATURE_9 as californiaUnitsLanguageG9WORLDLITERATURE9 } from "../../california/units/language-g9";
import { MEDIA_ANALYSIS as oregonUnitsLanguageMEDIAANALYSIS } from "../../oregon/units/language";
import { UNITS as newYorkUnitsLanguageG9UNITS } from "../../new-york/units/language-g9";
import { RML_9 as washingtonUnitsLanguageRmlUpperRML9 } from "../../washington/units/language-rml-upper";

// The units Pennsylvania's Grade 9 English language arts course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG9LanguageUnits, ...texasUnitsLanguage9LANGUAGE9, ...manitobaUnitsG9MoreLanguageUnits, washingtonUnitsLanguageSpellingSPELLING9, californiaUnitsLanguageG9WORLDLITERATURE9, oregonUnitsLanguageMEDIAANALYSIS, ...newYorkUnitsLanguageG9UNITS, ...washingtonUnitsLanguageRmlUpperRML9];

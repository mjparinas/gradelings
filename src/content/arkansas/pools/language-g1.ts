import type { Unit } from "../../types";
import { units as ontarioG1Language } from "../../ontario/g1-language";
import { STORY_OR_FACTS as oregonLanguageReadingSTORY_OR_FACTS } from "../../oregon/units/language-reading";
import { RML_1 as washingtonLanguageRmlEarlyRML_1 } from "../../washington/units/language-rml-early";

// The units Arkansas's Grade 1 English language arts course copies from other frameworks (see ../plan/language.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG1Language, washingtonLanguageRmlEarlyRML_1, oregonLanguageReadingSTORY_OR_FACTS];

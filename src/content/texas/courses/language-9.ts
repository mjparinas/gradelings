import type { Unit } from "../../types";
import { units as manitobaG9MoreLanguage } from "../../manitoba/units/g9-more-language";
import { units as ontarioG9Language } from "../../ontario/g9-language";
import { MEDIA_ANALYSIS as oregonLanguageMEDIA_ANALYSIS } from "../../oregon/units/language";
import { RML_9 as washingtonLanguageRmlUpperRML_9 } from "../../washington/units/language-rml-upper";
import { SPELLING_9 as washingtonLanguageSpellingSPELLING_9 } from "../../washington/units/language-spelling";

// Texas Grade 9 language. POOL is the units this course may copy from other frameworks (see ../plan/language.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG9Language, ...manitobaG9MoreLanguage, ...washingtonLanguageRmlUpperRML_9, washingtonLanguageSpellingSPELLING_9, oregonLanguageMEDIA_ANALYSIS];

export const OWN: readonly Unit[] = [];

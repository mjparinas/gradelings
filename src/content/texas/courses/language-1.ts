import type { Unit } from "../../types";
import { LANGUAGE_1 } from "../units/language-1";
import { units as ontarioG1Language } from "../../ontario/g1-language";
import { STORY_OR_FACTS as oregonLanguageReadingSTORY_OR_FACTS } from "../../oregon/units/language-reading";
import { RML_1 as washingtonLanguageRmlEarlyRML_1 } from "../../washington/units/language-rml-early";

// Texas Grade 1 language. POOL is the units this course may copy from other frameworks (see ../plan/language.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG1Language, washingtonLanguageRmlEarlyRML_1, oregonLanguageReadingSTORY_OR_FACTS];

export const OWN: readonly Unit[] = LANGUAGE_1;

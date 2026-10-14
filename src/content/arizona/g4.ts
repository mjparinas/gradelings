import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG4Math } from "../alberta/g4-math";
import { units as ontarioG4Language } from "../ontario/g4-language";
import { units as ontarioG4Math } from "../ontario/g4-math";
import { FIRSTHAND_SECONDHAND as oregonLanguageReadingFIRSTHAND_SECONDHAND } from "../oregon/units/language-reading";
import { RML_4 as washingtonLanguageRmlMiddleRML_4 } from "../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonLanguageSpellingSPELLING_4 } from "../washington/units/language-spelling";
import { G4_UNITS as washingtonMathMiddleG4_UNITS } from "../washington/units/math-middle";
import { SCIENCE_4 as washingtonScience35SCIENCE_4 } from "../washington/units/science-35";
import { SCIENCE_5 as texasScience5 } from "../texas/units/science-5";
import { SCIENCE_3 as oregonScience35SCIENCE_3 } from "../oregon/units/science-35";
import { units as ontarioG3Science } from "../ontario/g3-science";
import { SCIENCE_COPIES as oregonScienceCopiesSCIENCE_COPIES } from "../oregon/units/science-copies";
import { UNITS as newYorkSocial5 } from "../new-york/units/social-g5";
import { SOCIAL_7 as californiaSocial7 } from "../california/units/social-g7";
import { SOCIAL_5 as californiaSocial5 } from "../california/units/social-g5";
import { G5 as washingtonSocial59G5G5 } from "../washington/units/social-59-g5";
import { historyDetective5 as oregonSocialCopiesHistoryDetective5 } from "../oregon/units/social-copies";
import { OWN } from "./units/own-g4";
import { arizonaGrade } from "./kit";

// Arizona Grade 4. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG4Math, ...albertaG4Math, ...washingtonMathMiddleG4_UNITS],
  language: [...ontarioG4Language, washingtonLanguageRmlMiddleRML_4, washingtonLanguageSpellingSPELLING_4, oregonLanguageReadingFIRSTHAND_SECONDHAND],
  science: [...washingtonScience35SCIENCE_4, ...texasScience5, ...oregonScience35SCIENCE_3, ...ontarioG3Science, ...(oregonScienceCopiesSCIENCE_COPIES["4"] ?? [])],
  social: [...newYorkSocial5, ...californiaSocial7, ...washingtonSocial59G5G5, ...californiaSocial5, oregonSocialCopiesHistoryDetective5],
};

export const courses: Course[] = arizonaGrade("4", POOL, OWN);

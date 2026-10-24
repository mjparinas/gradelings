import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { UNITS as alabamaUnitsSocialG9_UNITS } from "../alabama/units/social-g9";
import { units as albertaG4Math_units } from "../alberta/g4-math";
import { LANGUAGE_4 as californiaUnitsLanguageG4_LANGUAGE_4 } from "../california/units/language-g4";
import { MATH_4 as californiaUnitsMathG4_MATH_4 } from "../california/units/math-g4";
import { OWN_SCIENCE as californiaUnitsScienceG4_OWN_SCIENCE } from "../california/units/science-g4";
import { SOCIAL_8 as californiaUnitsSocialG8_SOCIAL_8 } from "../california/units/social-g8";
import { course as gradesG3Science_course } from "../grades/g3/science";
import { UNITS as newYorkUnitsSocialG8_UNITS } from "../new-york/units/social-g8";
import { courses as ontarioG4_courses } from "../ontario/g4";
import { FIRSTHAND_SECONDHAND as oregonUnitsLanguageReading_FIRSTHAND_SECONDHAND } from "../oregon/units/language-reading";
import { reconstruction8 as oregonUnitsSocialCopies_reconstruction8 } from "../oregon/units/social-copies";
import { RML_4 as washingtonUnitsLanguageRmlMiddle_RML_4 } from "../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonUnitsLanguageSpelling_SPELLING_4 } from "../washington/units/language-spelling";
import { G4_UNITS as washingtonUnitsMathMiddle_G4_UNITS } from "../washington/units/math-middle";
import { SCIENCE_4 as washingtonUnitsScience35_SCIENCE_4 } from "../washington/units/science-35";
import { SCIENCE_3 as washingtonUnitsScience35_SCIENCE_3 } from "../washington/units/science-35";
import { tennesseeGrade } from "./kit";
import { OWN } from "./units/own-g4";

// Tennessee Grade 4. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...unitsOf(ontarioG4_courses, "math"), ...washingtonUnitsMathMiddle_G4_UNITS, ...californiaUnitsMathG4_MATH_4, ...albertaG4Math_units],
  language: [...californiaUnitsLanguageG4_LANGUAGE_4, oregonUnitsLanguageReading_FIRSTHAND_SECONDHAND, ...unitsOf(ontarioG4_courses, "language"), washingtonUnitsLanguageRmlMiddle_RML_4, washingtonUnitsLanguageSpelling_SPELLING_4],
  science: [...washingtonUnitsScience35_SCIENCE_4, ...unitsOf(ontarioG4_courses, "science"), ...californiaUnitsScienceG4_OWN_SCIENCE, ...gradesG3Science_course.units, ...washingtonUnitsScience35_SCIENCE_3],
  social: [...newYorkUnitsSocialG8_UNITS, ...californiaUnitsSocialG8_SOCIAL_8, oregonUnitsSocialCopies_reconstruction8, ...alabamaUnitsSocialG9_UNITS],
};

export const courses: Course[] = tennesseeGrade("4", POOL, OWN);

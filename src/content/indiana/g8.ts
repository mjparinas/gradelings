import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG6ScienceUnits } from "../alberta/g6-science";
import { units as albertaG7ScienceUnits } from "../alberta/g7-science";
import { units as albertaG8MathUnits } from "../alberta/g8-math";
import { COPIES_8 as arizonaUnitsCopiesG8COPIES8 } from "../arizona/units/copies-g8";
import { LANGUAGE_8 as californiaUnitsLanguageG8LANGUAGE8 } from "../california/units/language-g8";
import { MATH_8 as californiaUnitsMathG8MATH8 } from "../california/units/math-g8";
import { OWN_SCIENCE as californiaUnitsScienceG6OWNSCIENCE, SCIENCE_COPIES as californiaUnitsScienceG6SCIENCECOPIES } from "../california/units/science-g6";
import { OWN_SCIENCE as californiaUnitsScienceG7OWNSCIENCE, SCIENCE_COPIES as californiaUnitsScienceG7SCIENCECOPIES } from "../california/units/science-g7";
import { OWN_SCIENCE as californiaUnitsScienceG8OWNSCIENCE, SCIENCE_COPIES as californiaUnitsScienceG8SCIENCECOPIES } from "../california/units/science-g8";
import { SOCIAL_8 as californiaUnitsSocialG8SOCIAL8 } from "../california/units/social-g8";
import { course as gradesG6ScienceCourse } from "../grades/g6/science";
import { course as gradesG7ScienceCourse } from "../grades/g7/science";
import { course as gradesG8ScienceCourse } from "../grades/g8/science";
import { units as manitobaUnitsG8MoreLanguageUnits } from "../manitoba/units/g8-more-language";
import { units as manitobaUnitsG8MoreSocialBUnits } from "../manitoba/units/g8-more-social-b";
import { senses as newBrunswickUnitsG6ScienceSenses } from "../new-brunswick/units/g6-science";
import { motionForces as newBrunswickUnitsG8ScienceMotionForces } from "../new-brunswick/units/g8-science";
import { units as ontarioG7ScienceUnits } from "../ontario/g7-science";
import { units as ontarioG8LanguageUnits } from "../ontario/g8-language";
import { units as ontarioG8MathUnits } from "../ontario/g8-math";
import { units as ontarioG8ScienceUnits } from "../ontario/g8-science";
import { units as ontarioG8SocialUnits } from "../ontario/g8-social";
import { WEIGH_THE_EVIDENCE as oregonUnitsLanguageWEIGHTHEEVIDENCE } from "../oregon/units/language";
import { SCIENCE_COPIES as oregonUnitsScienceCopiesSCIENCECOPIES } from "../oregon/units/science-copies";
import { reconstruction8 as oregonUnitsSocialCopiesReconstruction8 } from "../oregon/units/social-copies";
import { SOCIAL_8 as texasUnitsSocialG8SOCIAL8 } from "../texas/units/social-g8";
import { RML_8 as washingtonUnitsLanguageRmlUpperRML8 } from "../washington/units/language-rml-upper";
import { G8_UNITS as washingtonUnitsMathUpperG8UNITS } from "../washington/units/math-upper";
import { SCIENCE_6 as washingtonUnitsScience68SCIENCE6, SCIENCE_7 as washingtonUnitsScience68SCIENCE7, SCIENCE_8 as washingtonUnitsScience68SCIENCE8 } from "../washington/units/science-68";
import { indianaGrade } from "./kit";
import { OWN } from "./units/own-g8";

// Indiana Grade 8. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG8MathUnits, ...albertaG8MathUnits, ...washingtonUnitsMathUpperG8UNITS, ...californiaUnitsMathG8MATH8],
  language: [...ontarioG8LanguageUnits, ...manitobaUnitsG8MoreLanguageUnits, ...washingtonUnitsLanguageRmlUpperRML8, oregonUnitsLanguageWEIGHTHEEVIDENCE, ...californiaUnitsLanguageG8LANGUAGE8],
  science: [newBrunswickUnitsG6ScienceSenses, ...washingtonUnitsScience68SCIENCE6, ...ontarioG8ScienceUnits, ...californiaUnitsScienceG6OWNSCIENCE, ...californiaUnitsScienceG6SCIENCECOPIES, ...ontarioG7ScienceUnits, ...albertaG7ScienceUnits, ...washingtonUnitsScience68SCIENCE7, ...gradesG6ScienceCourse.units, ...albertaG6ScienceUnits, ...californiaUnitsScienceG7OWNSCIENCE, ...californiaUnitsScienceG7SCIENCECOPIES, newBrunswickUnitsG8ScienceMotionForces, ...washingtonUnitsScience68SCIENCE8, ...(oregonUnitsScienceCopiesSCIENCECOPIES["8"] ?? []), ...californiaUnitsScienceG8OWNSCIENCE, ...californiaUnitsScienceG8SCIENCECOPIES, ...gradesG7ScienceCourse.units, ...gradesG8ScienceCourse.units],
  social: [...californiaUnitsSocialG8SOCIAL8, ...texasUnitsSocialG8SOCIAL8, oregonUnitsSocialCopiesReconstruction8, ...ontarioG8SocialUnits, ...manitobaUnitsG8MoreSocialBUnits, ...arizonaUnitsCopiesG8COPIES8],
};

export const courses: Course[] = indianaGrade("8", POOL, OWN);

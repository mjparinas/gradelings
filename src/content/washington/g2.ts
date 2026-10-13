import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG2Math } from "../alberta/g2-math";
import { evenOdd as manitobaG2MathEvenOdd } from "../manitoba/units/g2-math";
import { skipCounting as manitobaG2MathSkipCounting } from "../manitoba/units/g2-math";
import { moreLanguage as manitobaG2MoreLanguageMoreLanguage } from "../manitoba/units/g2-more-language";
import { communityChange as novaScotiaG2SocialCommunityChange } from "../nova-scotia/units/g2-social";
import { units as ontarioG2Language } from "../ontario/g2-language";
import { units as ontarioG2Science } from "../ontario/g2-science";
import { units as ontarioG2Social } from "../ontario/g2-social";
import { washingtonGrade } from "./kit";
import { OWN } from "./units/own-g2";

// Washington Grade 2. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...albertaG2Math, manitobaG2MathSkipCounting, manitobaG2MathEvenOdd],
  language: [...ontarioG2Language, ...manitobaG2MoreLanguageMoreLanguage],
  science: [...ontarioG2Science],
  social: [...ontarioG2Social, novaScotiaG2SocialCommunityChange],
};

export const courses: Course[] = washingtonGrade("2", POOL, OWN);

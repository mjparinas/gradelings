import type { Course } from "../types";
import { POOL as math } from "./pools/math-g9";
import { POOL as language } from "./pools/language-g9";
import { POOL as science } from "./pools/science-g9";
import { POOL as social } from "./pools/social-g9";
import { arkansasGrade } from "./kit";
import { OWN } from "./units/own-g9";

// Arkansas Grade 9. Each subject's pool (./pools) holds the files of the units it copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades.
export const courses: Course[] = arkansasGrade("9", { math, language, science, social }, OWN);

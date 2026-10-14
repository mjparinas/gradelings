import type { Course } from "../types";
import { POOL as math } from "./pools/math-g2";
import { POOL as language } from "./pools/language-g2";
import { POOL as science } from "./pools/science-g2";
import { POOL as social } from "./pools/social-g2";
import { minnesotaGrade } from "./kit";
import { OWN } from "./units/own-g2";

// Minnesota Grade 2. Each subject's pool (./pools) holds the files of the units it copies from other frameworks (see
// ./plan), so the download carries those files and not the other frameworks' whole grades.
export const courses: Course[] = minnesotaGrade("2", { math, language, science, social }, OWN);

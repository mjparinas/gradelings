import type { Course } from "../types";
import { POOL as math } from "./pools/math-g6";
import { POOL as language } from "./pools/language-g6";
import { POOL as science } from "./pools/science-g6";
import { POOL as social } from "./pools/social-g6";
import { pennsylvaniaGrade } from "./kit";
import { OWN } from "./units/own-g6";

// Pennsylvania Grade 6. Each subject's pool (./pools) holds the files of the units it copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades.
export const courses: Course[] = pennsylvaniaGrade("6", { math, language, science, social }, OWN);

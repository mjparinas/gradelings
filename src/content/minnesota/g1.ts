import type { Course } from "../types";
import { POOL as math } from "./pools/math-g1";
import { POOL as language } from "./pools/language-g1";
import { POOL as science } from "./pools/science-g1";
import { POOL as social } from "./pools/social-g1";
import { minnesotaGrade } from "./kit";

// Minnesota Grade 1. Each subject's pool (./pools) holds the files of the units it copies from other frameworks (see
// ./plan), so the download carries those files and not the other frameworks' whole grades.
export const courses: Course[] = minnesotaGrade("1", { math, language, science, social }, {});

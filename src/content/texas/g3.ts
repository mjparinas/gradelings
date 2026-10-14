import type { Course } from "../types";
import * as language from "./courses/language-3";
import * as math from "./courses/math-3";
import * as science from "./courses/science-3";
import * as social from "./courses/social-3";
import { texasGrade } from "./kit";

// Texas Grade 3. Each subject's file in ./courses holds the units it copies (POOL) and its own units (OWN).
export const courses: Course[] = texasGrade("3", { math, language, science, social });

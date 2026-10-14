import type { Course } from "../types";
import * as language from "./courses/language-2";
import * as math from "./courses/math-2";
import * as science from "./courses/science-2";
import * as social from "./courses/social-2";
import { texasGrade } from "./kit";

// Texas Grade 2. Each subject's file in ./courses holds the units it copies (POOL) and its own units (OWN).
export const courses: Course[] = texasGrade("2", { math, language, science, social });

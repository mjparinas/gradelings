import type { Course } from "../types";
import * as language from "./courses/language-7";
import * as math from "./courses/math-7";
import * as science from "./courses/science-7";
import * as social from "./courses/social-7";
import { texasGrade } from "./kit";

// Texas Grade 7. Each subject's file in ./courses holds the units it copies (POOL) and its own units (OWN).
export const courses: Course[] = texasGrade("7", { math, language, science, social });

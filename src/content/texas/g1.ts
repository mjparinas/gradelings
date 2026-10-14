import type { Course } from "../types";
import * as language from "./courses/language-1";
import * as math from "./courses/math-1";
import * as science from "./courses/science-1";
import * as social from "./courses/social-1";
import { texasGrade } from "./kit";

// Texas Grade 1. Each subject's file in ./courses holds the units it copies (POOL) and its own units (OWN).
export const courses: Course[] = texasGrade("1", { math, language, science, social });

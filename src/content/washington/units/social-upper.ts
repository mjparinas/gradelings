import type { GradeId, Unit } from "../../types";
import { G5 } from "./social-59-g5";
import { G6 } from "./social-59-g6";
import { G7 } from "./social-59-g7";
import { G8 } from "./social-59-g8";
import { G9 } from "./social-59-g9";

// Washington-only social studies units for Grades 5 to 9 (`wa-` ids).
export const OWN_SOCIAL_UPPER: Partial<Record<GradeId, Unit[]>> = { "5": G5, "6": G6, "7": G7, "8": G8, "9": G9 };

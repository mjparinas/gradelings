import type { Course } from "../types";
import { courses as alberta } from "../alberta/g5";
import { courses as manitoba } from "../manitoba/g5";
import { courses as ontario } from "../ontario/g5";
import { courses as saskatchewan } from "../saskatchewan/g5";
import { nunavutGrade } from "./kit";
import { landClaim5, wayfinding5 } from "./units/g5-g9-social";
import { midnightSun5 } from "./units/science";

// Nunavut 5.
export const courses: Course[] = nunavutGrade("5", [manitoba, alberta, ontario, saskatchewan], { social: { units: [landClaim5, wayfinding5] }, science: { units: [midnightSun5] } });

import type { Course } from "../types";
import { withLessons } from "../lessons";
import { lessons } from "../lessons/g5";
import { courses as alberta } from "../alberta/g5";
import { courses as manitoba } from "../manitoba/g5";
import { courses as ontario } from "../ontario/g5";
import { courses as saskatchewan } from "../saskatchewan/g5";
import { nunavutGrade } from "./kit";
import { landClaim5, wayfinding5 } from "./units/g5-g9-social";
import { midnightSun5 } from "./units/science";

// Nunavut 5.
const base: Course[] = nunavutGrade("5", [manitoba, alberta, ontario, saskatchewan], { social: { units: [landClaim5, wayfinding5] }, science: { units: [midnightSun5] } });

// Short "how it works" lessons, matched to units by id.
export const courses: Course[] = withLessons(base, lessons);

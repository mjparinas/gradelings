import type { Course } from "../types";
import { withLessons } from "../lessons";
import { lessons } from "../lessons/g9";
import { courses as alberta } from "../alberta/g9";
import { courses as manitoba } from "../manitoba/g9";
import { courses as ontario } from "../ontario/g9";
import { courses as saskatchewan } from "../saskatchewan/g9";
import { nunavutGrade } from "./kit";
import { governing9, landClaim9, circumpolar9 } from "./units/g5-g9-social";

// Nunavut 9.
const base: Course[] = nunavutGrade("9", [manitoba, alberta, ontario, saskatchewan], { social: { units: [governing9, landClaim9, circumpolar9] } });

// Short "how it works" lessons, matched to units by id.
export const courses: Course[] = withLessons(base, lessons);

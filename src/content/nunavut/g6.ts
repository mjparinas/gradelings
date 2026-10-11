import type { Course } from "../types";
import { withLessons } from "../lessons";
import { lessons } from "../lessons/g6";
import { courses as alberta } from "../alberta/g6";
import { courses as manitoba } from "../manitoba/g6";
import { courses as ontario } from "../ontario/g6";
import { courses as saskatchewan } from "../saskatchewan/g6";
import { nunavutGrade } from "./kit";
import { governing6 } from "./units/g5-g9-social";

// Nunavut 6.
const base: Course[] = nunavutGrade("6", [manitoba, alberta, ontario, saskatchewan], { social: { units: [governing6] } });

// Short "how it works" lessons, matched to units by id.
export const courses: Course[] = withLessons(base, lessons);

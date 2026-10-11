import type { Course } from "../types";
import { withLessons } from "../lessons";
import { lessons } from "../lessons/g8";
import { courses as alberta } from "../alberta/g8";
import { courses as manitoba } from "../manitoba/g8";
import { courses as ontario } from "../ontario/g8";
import { courses as saskatchewan } from "../saskatchewan/g8";
import { nunavutGrade } from "./kit";
import { makingNunavut8 } from "./units/g5-g9-social";

// Nunavut 8.
const base: Course[] = nunavutGrade("8", [manitoba, alberta, ontario, saskatchewan], { social: { units: [makingNunavut8] } });

// Short "how it works" lessons, matched to units by id.
export const courses: Course[] = withLessons(base, lessons);

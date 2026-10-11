import type { Course } from "../types";
import { courses as alberta } from "../alberta/g1";
import { courses as manitoba } from "../manitoba/g1";
import { courses as ontario } from "../ontario/g1";
import { courses as saskatchewan } from "../saskatchewan/g1";
import { nunavutGrade } from "./kit";

// Nunavut 1.
export const courses: Course[] = nunavutGrade("1", [manitoba, alberta, ontario, saskatchewan]);

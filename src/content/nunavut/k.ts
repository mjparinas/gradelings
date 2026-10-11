import type { Course } from "../types";
import { courses as alberta } from "../alberta/k";
import { courses as manitoba } from "../manitoba/k";
import { courses as ontario } from "../ontario/k";
import { courses as saskatchewan } from "../saskatchewan/k";
import { nunavutGrade } from "./kit";

// Nunavut Kindergarten.
export const courses: Course[] = nunavutGrade("k", [manitoba, alberta, ontario, saskatchewan]);

import type { Course } from "../types";
import { courses as alberta } from "../alberta/g1";
import { courses as manitoba } from "../manitoba/g1";
import { courses as newBrunswick } from "../new-brunswick/g1";
import { courses as novaScotia } from "../nova-scotia/g1";
import { courses as ontario } from "../ontario/g1";
import { courses as saskatchewan } from "../saskatchewan/g1";
import { washingtonGrade } from "./kit";

// Washington Grade 1.
export const courses: Course[] = washingtonGrade("1", [ontario, alberta, manitoba, saskatchewan, novaScotia, newBrunswick]);

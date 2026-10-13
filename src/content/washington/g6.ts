import type { Course } from "../types";
import { courses as alberta } from "../alberta/g6";
import { courses as manitoba } from "../manitoba/g6";
import { courses as newBrunswick } from "../new-brunswick/g6";
import { courses as novaScotia } from "../nova-scotia/g6";
import { courses as ontario } from "../ontario/g6";
import { courses as saskatchewan } from "../saskatchewan/g6";
import { washingtonGrade } from "./kit";
import { OWN } from "./units/own-g6";

// Washington Grade 6.
export const courses: Course[] = washingtonGrade("6", [ontario, alberta, manitoba, saskatchewan, novaScotia, newBrunswick], OWN);

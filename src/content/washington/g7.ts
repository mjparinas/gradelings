import type { Course } from "../types";
import { courses as alberta } from "../alberta/g7";
import { courses as manitoba } from "../manitoba/g7";
import { courses as newBrunswick } from "../new-brunswick/g7";
import { courses as novaScotia } from "../nova-scotia/g7";
import { courses as ontario } from "../ontario/g7";
import { courses as saskatchewan } from "../saskatchewan/g7";
import { washingtonGrade } from "./kit";
import { OWN } from "./units/own-g7";

// Washington Grade 7.
export const courses: Course[] = washingtonGrade("7", [ontario, alberta, manitoba, saskatchewan, novaScotia, newBrunswick], OWN);

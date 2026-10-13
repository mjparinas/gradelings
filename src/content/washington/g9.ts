import type { Course } from "../types";
import { courses as alberta } from "../alberta/g9";
import { courses as manitoba } from "../manitoba/g9";
import { courses as newBrunswick } from "../new-brunswick/g9";
import { courses as novaScotia } from "../nova-scotia/g9";
import { courses as ontario } from "../ontario/g9";
import { courses as saskatchewan } from "../saskatchewan/g9";
import { washingtonGrade } from "./kit";
import { OWN } from "./units/own-g9";

// Washington Grade 9.
export const courses: Course[] = washingtonGrade("9", [ontario, alberta, manitoba, saskatchewan, novaScotia, newBrunswick], OWN);

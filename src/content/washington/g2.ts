import type { Course } from "../types";
import { courses as alberta } from "../alberta/g2";
import { courses as manitoba } from "../manitoba/g2";
import { courses as newBrunswick } from "../new-brunswick/g2";
import { courses as novaScotia } from "../nova-scotia/g2";
import { courses as ontario } from "../ontario/g2";
import { courses as saskatchewan } from "../saskatchewan/g2";
import { washingtonGrade } from "./kit";
import { OWN } from "./units/own-g2";

// Washington Grade 2.
export const courses: Course[] = washingtonGrade("2", [ontario, alberta, manitoba, saskatchewan, novaScotia, newBrunswick], OWN);

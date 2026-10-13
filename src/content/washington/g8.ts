import type { Course } from "../types";
import { courses as alberta } from "../alberta/g8";
import { courses as manitoba } from "../manitoba/g8";
import { courses as newBrunswick } from "../new-brunswick/g8";
import { courses as novaScotia } from "../nova-scotia/g8";
import { courses as ontario } from "../ontario/g8";
import { courses as saskatchewan } from "../saskatchewan/g8";
import { washingtonGrade } from "./kit";
import { OWN } from "./units/own-g8";

// Washington Grade 8.
export const courses: Course[] = washingtonGrade("8", [ontario, alberta, manitoba, saskatchewan, novaScotia, newBrunswick], OWN);

import type { Course } from "../types";
import { courses as alberta } from "../alberta/g5";
import { courses as manitoba } from "../manitoba/g5";
import { courses as newBrunswick } from "../new-brunswick/g5";
import { courses as novaScotia } from "../nova-scotia/g5";
import { courses as ontario } from "../ontario/g5";
import { courses as saskatchewan } from "../saskatchewan/g5";
import { courses as washington } from "../washington/g5";
import { oregonGrade } from "./kit";
import { OWN } from "./units/own-g5";

// Oregon Grade 5.
export const courses: Course[] = oregonGrade("5", [washington, ontario, alberta, manitoba, saskatchewan, novaScotia, newBrunswick], OWN);

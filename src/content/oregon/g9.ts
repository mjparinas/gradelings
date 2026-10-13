import type { Course } from "../types";
import { courses as alberta } from "../alberta/g9";
import { courses as manitoba } from "../manitoba/g9";
import { courses as newBrunswick } from "../new-brunswick/g9";
import { courses as novaScotia } from "../nova-scotia/g9";
import { courses as ontario } from "../ontario/g9";
import { courses as saskatchewan } from "../saskatchewan/g9";
import { courses as washington } from "../washington/g9";
import { oregonGrade } from "./kit";

// Oregon Grade 9.
export const courses: Course[] = oregonGrade("9", [washington, ontario, alberta, manitoba, saskatchewan, novaScotia, newBrunswick]);

import type { Course } from "../types";
import { courses as alberta } from "../alberta/g3";
import { courses as manitoba } from "../manitoba/g3";
import { courses as newBrunswick } from "../new-brunswick/g3";
import { courses as novaScotia } from "../nova-scotia/g3";
import { courses as ontario } from "../ontario/g3";
import { courses as saskatchewan } from "../saskatchewan/g3";
import { courses as washington } from "../washington/g3";
import { oregonGrade } from "./kit";

// Oregon Grade 3.
export const courses: Course[] = oregonGrade("3", [washington, ontario, alberta, manitoba, saskatchewan, novaScotia, newBrunswick]);

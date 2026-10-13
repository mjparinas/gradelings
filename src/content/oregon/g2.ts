import type { Course } from "../types";
import { courses as alberta } from "../alberta/g2";
import { courses as manitoba } from "../manitoba/g2";
import { courses as newBrunswick } from "../new-brunswick/g2";
import { courses as novaScotia } from "../nova-scotia/g2";
import { courses as ontario } from "../ontario/g2";
import { courses as saskatchewan } from "../saskatchewan/g2";
import { courses as washington } from "../washington/g2";
import { oregonGrade } from "./kit";

// Oregon Grade 2.
export const courses: Course[] = oregonGrade("2", [washington, ontario, alberta, manitoba, saskatchewan, novaScotia, newBrunswick]);

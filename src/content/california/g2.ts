import type { Course } from "../types";
import { courses as alberta } from "../alberta/g2";
import { courses as manitoba } from "../manitoba/g2";
import { courses as newBrunswick } from "../new-brunswick/g2";
import { courses as novaScotia } from "../nova-scotia/g2";
import { courses as ontario } from "../ontario/g2";
import { courses as oregon } from "../oregon/g2";
import { courses as saskatchewan } from "../saskatchewan/g2";
import { courses as washington } from "../washington/g2";
import { californiaGrade } from "./kit";

// California Grade 2.
export const courses: Course[] = californiaGrade("2", [
  washington,
  oregon,
  ontario,
  alberta,
  manitoba,
  saskatchewan,
  novaScotia,
  newBrunswick,
]);

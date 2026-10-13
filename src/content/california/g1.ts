import type { Course } from "../types";
import { courses as alberta } from "../alberta/g1";
import { courses as manitoba } from "../manitoba/g1";
import { courses as newBrunswick } from "../new-brunswick/g1";
import { courses as novaScotia } from "../nova-scotia/g1";
import { courses as ontario } from "../ontario/g1";
import { courses as oregon } from "../oregon/g1";
import { courses as saskatchewan } from "../saskatchewan/g1";
import { courses as washington } from "../washington/g1";
import { californiaGrade } from "./kit";
import { OWN } from "./units/own-g1";

// California Grade 1.
export const courses: Course[] = californiaGrade("1", [
  washington,
  oregon,
  ontario,
  alberta,
  manitoba,
  saskatchewan,
  novaScotia,
  newBrunswick,
], OWN);

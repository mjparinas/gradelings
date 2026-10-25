import type { Unit } from "../../types";
import { unitsOf } from "../../placement";
import { courses as arizonaG4Courses } from "../../arizona/g4";
import { courses as georgiaG4Courses } from "../../georgia/g4";
import { courses as ohioG4Courses } from "../../ohio/g4";
import { courses as pennsylvaniaG4Courses } from "../../pennsylvania/g4";
import { historyDetective5 as oregonUnitsSocialCopiesHistoryDetective5 } from "../../oregon/units/social-copies";
import { reconstruction8 as oregonUnitsSocialCopiesReconstruction8 } from "../../oregon/units/social-copies";

// The units South Carolina's Grade 4 social studies course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...unitsOf(arizonaG4Courses, "social"),
  ...unitsOf(pennsylvaniaG4Courses, "social"),
  oregonUnitsSocialCopiesHistoryDetective5,
  ...unitsOf(georgiaG4Courses, "social"),
  ...unitsOf(ohioG4Courses, "social"),
  oregonUnitsSocialCopiesReconstruction8,
];

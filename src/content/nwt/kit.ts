import type { Course, Unit } from "../types";
import { citeFor, followBcCourse, followBcGrade } from "../placement";

// The Northwest Territories is moving from the Alberta curriculum to the BC curriculum adapted for the NWT
// (NWT Education, Culture and Employment, JK-12 Curriculum Renewal). Grades 1 to 9 are on the adapted BC
// curriculum in 2026-27 (Kindergarten to Grade 3 as a draft), so an NWT course is the matching BC course with
// NWT's own standards entry. Nothing is copied: every BC unit is listed under `shares`, which adds the "ca-nt"
// standards to the BC unit, so progress is the same whichever of the two curricula a family picks.

/** An NWT course from the BC course for the same grade and subject, plus any units written for the NWT. */
export function nwtCourse(bc: Course, own: Unit[] = [], ownIds?: string[]): Course {
  return followBcCourse("ca-nt", bc, own, ownIds);
}

/** An NWT grade: every BC course, with NWT-only units added to the subject they belong to. */
export function nwtGrade(bc: Course[], own: Record<string, Unit[]> = {}): Course[] {
  return followBcGrade("ca-nt", bc, own);
}

const CITE = citeFor("ca-nt");

/** Standards text for a unit written for the NWT. */
export function nt(area: string, text: string): Unit["standards"] {
  return CITE(area, text);
}

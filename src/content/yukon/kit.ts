import type { Course, Unit } from "../types";
import { citeFor, followBcCourse, followBcGrade } from "../placement";

// Yukon follows the BC curriculum (adapted for the Yukon), so a Yukon course is the matching BC course with Yukon's
// own standards entry. Nothing is copied: every BC unit is listed under `shares`, which adds the "ca-yt" standards
// to the BC unit, so progress is the same whichever of the two curricula a family picks.

/** A course from the BC course for the same grade and subject, plus any units written for this territory. */
export function yukonCourse(bc: Course, own: Unit[] = [], ownIds?: string[]): Course {
  return followBcCourse("ca-yt", bc, own, ownIds);
}

/** A grade: every BC course, with the territory's own units added to the subject they belong to. */
export function yukonGrade(bc: Course[], own: Record<string, Unit[]> = {}): Course[] {
  return followBcGrade("ca-yt", bc, own);
}

const CITE = citeFor("ca-yt");

/** Standards text for a unit written for this territory. */
export function yt(area: string, text: string): Unit["standards"] {
  return CITE(area, text);
}

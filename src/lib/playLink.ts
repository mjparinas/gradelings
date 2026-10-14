import { GRADE_ORDER } from "@/content/subjects";
import type { FrameworkId, GradeId, SubjectId } from "@/content/types";

// A "Try it free" link from a public page that opens the kids' app on what the visitor was reading: a new child
// starts with that province or state and grade picked, and lands on that subject's lessons with the unit open.
// The hash keeps it on the one cached /play/ page, so it works offline like every other screen.

export interface PlayStart {
  framework: FrameworkId;
  grade?: GradeId;
  subject?: SubjectId;
  /** A unit id within the subject's course for that grade. */
  unit?: string;
}

export const START_ROUTE = "/start";

/** `/play/#/start?framework=ca-on&grade=2&subject=math&unit=adding-to-100`, with only the parts given. */
export function playHref(s: PlayStart): string {
  const q = new URLSearchParams({ framework: s.framework });
  if (s.grade) {
    q.set("grade", s.grade);
    if (s.subject) {
      q.set("subject", s.subject);
      if (s.unit) q.set("unit", s.unit);
    }
  }
  return `/play/#${START_ROUTE}?${q}`;
}

const ID = /^[a-z0-9-]{1,80}$/;

/** The start a link asked for, or null when it names no framework we know. Parts that don't read are dropped. */
export function readPlayStart(query: URLSearchParams, isFramework: (id: string) => boolean): PlayStart | null {
  const framework = query.get("framework") ?? "";
  if (!isFramework(framework)) return null;
  const grade = query.get("grade") as GradeId | null;
  if (!grade || !GRADE_ORDER.includes(grade)) return { framework: framework as FrameworkId };
  const subject = query.get("subject") ?? "";
  if (!ID.test(subject)) return { framework: framework as FrameworkId, grade };
  const unit = query.get("unit") ?? "";
  return { framework: framework as FrameworkId, grade, subject: subject as SubjectId, ...(ID.test(unit) ? { unit } : {}) };
}

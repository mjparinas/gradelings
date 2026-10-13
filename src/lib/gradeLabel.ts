import { getFramework } from "@/content/frameworks";
import { gradeName, localeOf } from "@/content/locale";
import type { FrameworkId, GradeId } from "@/content/types";

/**
 * A grade as a family on this curriculum says it: "Grade 4" in Canada, "4th grade" in the US.
 * Kindergarten is the same in both. With no framework it is BC's ("Grade 4").
 */
export function gradeLabel(grade: GradeId, framework?: FrameworkId | string): string {
  return gradeName(grade, localeOf(getFramework(framework)));
}

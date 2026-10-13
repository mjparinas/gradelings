import { COMPETITORS } from "@/content/compare";
import type { Framework } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";
import { gradeSlug } from "@/content/subjects";
import type { GradeId, SubjectId } from "@/content/types";
import { courseUpdated, curriculumUpdated, gradeUpdated, guidesUpdated, latest } from "@/content/updated";
import { coursesFor, gradesWithContent, type SitemapPath } from "./curriculum";

// URLs for the parent guides. The competencies and assessment pages take their slug from the
// province's guide copy (BC: core-competencies, fsa; Ontario: learning-skills, eqao; Alberta: competencies, pat).
// Like the curriculum pages, they carry the framework
// slug: /guides/bc/grade-3/math/ and so on.

export const guidePath = {
  hub: (f: Framework) => `/guides/${f.slug}/`,
  grade: (f: Framework, g: GradeId) => `/guides/${f.slug}/${gradeSlug(g)}/`,
  subject: (f: Framework, g: GradeId, s: SubjectId) => `/guides/${f.slug}/${gradeSlug(g)}/${s}/`,
  worksheet: (f: Framework, g: GradeId, s: SubjectId) => `/guides/${f.slug}/${gradeSlug(g)}/${s}/worksheet/`,
  /** The tall Pinterest image for a grade's printable sheets. */
  sheetsPin: (f: Framework, g: GradeId) => `/guides/${f.slug}/${gradeSlug(g)}/pin.png`,
  competencies: (f: Framework) => `/guides/${f.slug}/${guidesFor(f.id).competencies.slug}/`,
  assessment: (f: Framework) => `/guides/${f.slug}/${guidesFor(f.id).assessment.slug}/`,
  french: (f: Framework) => `/guides/${f.slug}/french/`,
  compareIndex: () => "/compare/",
  compare: (slug: string) => `/compare/${slug}/`,
};

export function allGuidePaths(): SitemapPath[] {
  const out: SitemapPath[] = [{ path: guidePath.compareIndex() }];
  for (const c of COMPETITORS) out.push({ path: guidePath.compare(c.slug) });
  for (const f of GUIDE_FRAMEWORKS) {
    const guides = guidesUpdated(f.id);
    out.push({ path: guidePath.hub(f), updated: latest(guides, curriculumUpdated(f.id)) });
    out.push({ path: guidePath.competencies(f), updated: guides });
    out.push({ path: guidePath.assessment(f), updated: guides });
    if (guidesFor(f.id).french) out.push({ path: guidePath.french(f), updated: guides });
    for (const g of gradesWithContent(f)) {
      out.push({ path: guidePath.grade(f, g), updated: latest(guides, gradeUpdated(f.id, g)) });
      for (const c of coursesFor(f, g)) {
        out.push({ path: guidePath.subject(f, g, c.subject), updated: latest(guides, courseUpdated(f.id, g, c.subject)) });
        out.push({ path: guidePath.worksheet(f, g, c.subject), updated: courseUpdated(f.id, g, c.subject) });
      }
    }
  }
  return out;
}

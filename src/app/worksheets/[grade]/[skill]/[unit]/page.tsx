import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorksheetSheet } from "@/components/site/WorksheetSheet";
import { allSkillSheets, allWorksheetSkills, resolveWorksheet, sheetPath, sheetQuestions, subjectSlug, subjectWord, worksheetGradeLabel, worksheetPath } from "@/components/site/worksheets";
import { gradeSlug } from "@/content/subjects";
import { APP_NAME } from "@/lib/brand";
import { pageMeta } from "@/lib/pageMeta";

export const dynamicParams = false;

// Every skill that isn't Kindergarten to Grade 9 math: /worksheets/{grade}/{subject}/{skill}/ (math's addresses are
// /worksheets/{grade}/{skill}/, in the folder above).
export function generateStaticParams() {
  const others = allWorksheetSkills()
    .filter((s) => worksheetPath.skill(s.grade, s.unit.id, s.subject).split("/").length === 6)
    .map((s) => ({ grade: gradeSlug(s.grade), skill: subjectSlug(s.subject), unit: s.unit.id }));
  // /worksheets/{grade}/{unit}/{skill}/: a skill inside a math unit.
  const bySkill = allSkillSheets().map((s) => ({ grade: gradeSlug(s.grade), skill: s.skillOf!.id, unit: s.unit.id }));
  return [...others, ...bySkill];
}

type Props = PageProps<"/worksheets/[grade]/[skill]/[unit]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = resolveWorksheet(await params);
  if (!s) return {};
  const label = worksheetGradeLabel(s.grade);
  const word = subjectWord(s.subject);
  const n = sheetQuestions(s).length;
  return pageMeta({
    title: [`${label} ${s.unit.title} worksheet: free printable with answers`, `${label} ${s.unit.title} worksheet (free, printable)`, `${label} ${s.unit.title} worksheet`],
    description: `A free printable ${label} ${word} worksheet on ${s.unit.title.toLowerCase()}${s.skillOf ? `, part of ${s.skillOf.title.toLowerCase()},` : ""} with ${n} questions and an answer key. Print it, or practice the same skill on screen with ${APP_NAME}.`,
    path: sheetPath(s),
  });
}

export default async function WorksheetUnitPage({ params }: Props) {
  const s = resolveWorksheet(await params);
  if (!s) notFound();
  return <WorksheetSheet s={s} />;
}

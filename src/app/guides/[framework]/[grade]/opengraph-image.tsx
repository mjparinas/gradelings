import { notFound } from "next/navigation";
import { OG_SIZE, OG_TYPE, ogCard } from "@/components/site/ogCard";
import { guidePageKind } from "@/components/site/GuideExtras";
import { gradeQuestionCard, guideCard } from "@/components/site/ogText";
import { APP_NAME } from "@/lib/brand";

export { generateStaticParams } from "./page";

export const alt = `${APP_NAME}: Parent guide`;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default async function Image({ params }: { params: Promise<{ framework: string; grade: string }> }) {
  const p = await params;
  // The competencies and assessment pages share this route and keep the framework's guide card; a grade's guide
  // gets "Can your Grade 4 solve this?" with one of the grade's own questions.
  const card = guidePageKind(p.framework, p.grade) ? guideCard({ framework: p.framework }) : (gradeQuestionCard(p) ?? guideCard(p));
  if (!card) notFound();
  return ogCard(card);
}

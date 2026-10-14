import { notFound } from "next/navigation";
import { OG_SIZE, OG_TYPE, ogCard } from "@/components/site/ogCard";
import { guidePageKind } from "@/components/site/GuideExtras";
import { guideCard } from "@/components/site/ogText";
import { APP_NAME } from "@/lib/brand";

export { generateStaticParams } from "./page";

export const alt = `${APP_NAME}: Parent guide`;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default async function Image({ params }: { params: Promise<{ framework: string; grade: string }> }) {
  const p = await params;
  // The competencies and assessment pages share this route and keep the framework's guide card.
  const card = guideCard(guidePageKind(p.framework, p.grade) ? { framework: p.framework } : p);
  if (!card) notFound();
  return ogCard(card);
}

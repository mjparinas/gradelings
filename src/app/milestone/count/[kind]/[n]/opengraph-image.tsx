import { notFound } from "next/navigation";
import { OG_SIZE, OG_TYPE, ogCard } from "@/components/site/ogCard";
import { countMilestoneCard } from "@/components/site/ogText";
import { APP_NAME } from "@/lib/brand";

// Drawn the first time a link preview asks for it, then cached (an empty generateStaticParams).
export function generateStaticParams() {
  return [];
}

export const alt = `${APP_NAME}: a practice milestone`;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default async function Image({ params }: { params: Promise<{ kind: string; n: string }> }) {
  const card = countMilestoneCard(await params);
  if (!card) notFound();
  return ogCard(card);
}

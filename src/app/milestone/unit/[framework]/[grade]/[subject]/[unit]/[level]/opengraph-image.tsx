import { notFound } from "next/navigation";
import { OG_SIZE, OG_TYPE, ogCard } from "@/components/site/ogCard";
import { unitMilestoneCard } from "@/components/site/ogText";
import { APP_NAME } from "@/lib/brand";

// Drawn the first time a link preview asks for it, then cached (an empty generateStaticParams).
export function generateStaticParams() {
  return [];
}

export const alt = `${APP_NAME}: a practice milestone`;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default async function Image({ params }: { params: Promise<{ framework: string; grade: string; subject: string; unit: string; level: string }> }) {
  const card = unitMilestoneCard(await params);
  if (!card) notFound();
  return ogCard(card);
}

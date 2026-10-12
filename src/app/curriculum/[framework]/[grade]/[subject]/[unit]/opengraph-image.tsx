import { notFound } from "next/navigation";
import { OG_SIZE, OG_TYPE, ogCard } from "@/components/site/ogCard";
import { unitCard } from "@/components/site/ogText";
import { APP_NAME } from "@/lib/brand";

// About 6,000 units: too many to draw at build time, so each card is drawn the first time a link
// preview asks for it and cached from then on (an empty generateStaticParams).
export function generateStaticParams() {
  return [];
}

export const alt = `${APP_NAME}: a sample question`;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default async function Image({ params }: { params: Promise<{ framework: string; grade: string; subject: string; unit: string }> }) {
  const card = unitCard(await params);
  if (!card) notFound();
  return ogCard(card);
}

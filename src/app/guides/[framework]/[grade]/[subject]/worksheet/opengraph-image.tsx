import { notFound } from "next/navigation";
import { OG_SIZE, OG_TYPE, ogCard } from "@/components/site/ogCard";
import { worksheetCard } from "@/components/site/ogText";
import { APP_NAME } from "@/lib/brand";

// The worksheet page sets its own Open Graph tags, so it needs its own image: without this file a shared
// worksheet link shows no picture. Drawn the first time a link preview asks for it and cached from then on
// (an empty generateStaticParams), like the unit cards.
export function generateStaticParams() {
  return [];
}

export const alt = `${APP_NAME}: Printable worksheet`;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default async function Image({ params }: { params: Promise<{ framework: string; grade: string; subject: string }> }) {
  const card = worksheetCard(await params);
  if (!card) notFound();
  return ogCard(card);
}

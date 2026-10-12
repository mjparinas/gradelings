import { notFound } from "next/navigation";
import { OG_SIZE, OG_TYPE, ogCard } from "@/components/site/ogCard";
import { guideCard } from "@/components/site/ogText";
import { APP_NAME } from "@/lib/brand";

export { generateStaticParams } from "./page";

export const alt = `${APP_NAME}: Parent guide`;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default async function Image({ params }: { params: Promise<{ framework: string }> }) {
  const card = guideCard(await params);
  if (!card) notFound();
  return ogCard(card);
}

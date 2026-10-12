import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MilestonePage } from "@/components/site/MilestonePage";
import { unitMilestoneCard } from "@/components/site/ogText";
import { unitMilestonePath } from "@/lib/milestoneShare";

// Rendered on each request (src/proxy.ts gives it a CSP nonce), like shared reports.
export const dynamic = "force-dynamic";

type Props = PageProps<"/milestone/unit/[framework]/[grade]/[subject]/[unit]/[level]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const card = unitMilestoneCard(await params);
  if (!card) return {};
  return { title: card.title, description: `${card.kicker}. ${card.line}.`, robots: { index: false, follow: true } };
}

export default async function UnitMilestone({ params }: Props) {
  const p = await params;
  const card = unitMilestoneCard(p);
  if (!card) notFound();
  return <MilestonePage card={card} image={`${unitMilestonePath(p.framework, p.grade, p.subject, p.unit, Number(p.level))}opengraph-image/`} />;
}

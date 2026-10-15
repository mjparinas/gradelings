import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MilestonePage } from "@/components/site/MilestonePage";
import { MILESTONE_CARD, milestoneMeta } from "@/components/site/milestoneMeta";
import { unitMilestoneCard } from "@/components/site/ogText";
import { frameworkBySlug } from "@/components/site/curriculum";
import { unitMilestonePath } from "@/lib/milestoneShare";

// Rendered on each request (src/proxy.ts gives it a CSP nonce), like shared reports.
export const dynamic = "force-dynamic";

type Props = PageProps<"/milestone/unit/[framework]/[grade]/[subject]/[unit]/[level]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const card = unitMilestoneCard(p);
  if (!card) return {};
  return milestoneMeta(card, unitMilestonePath(p.framework, p.grade, p.subject, p.unit, Number(p.level)), frameworkBySlug(p.framework));
}

export default async function UnitMilestone({ params }: Props) {
  const p = await params;
  const card = unitMilestoneCard(p);
  if (!card) notFound();
  return <MilestonePage card={card} image={`${unitMilestonePath(p.framework, p.grade, p.subject, p.unit, Number(p.level))}${MILESTONE_CARD}`} />;
}

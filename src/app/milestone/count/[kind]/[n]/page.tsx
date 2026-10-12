import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MilestonePage } from "@/components/site/MilestonePage";
import { countMilestoneCard } from "@/components/site/ogText";

// Rendered on each request (src/proxy.ts gives it a CSP nonce), like shared reports.
export const dynamic = "force-dynamic";

type Props = PageProps<"/milestone/count/[kind]/[n]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const card = countMilestoneCard(await params);
  if (!card) return {};
  return { title: card.title, description: `${card.kicker}. ${card.line}.`, robots: { index: false, follow: true } };
}

export default async function CountMilestone({ params }: Props) {
  const p = await params;
  const card = countMilestoneCard(p);
  if (!card) notFound();
  return <MilestonePage card={card} image={`/milestone/count/${p.kind}/${p.n}/opengraph-image/`} />;
}

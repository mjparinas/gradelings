import { ogCard } from "@/components/site/ogCard";
import { unitMilestoneCard } from "@/components/site/ogText";

// A shared milestone's card (see milestoneMeta). Drawn the first time a link preview asks for it, then
// cached (an empty generateStaticParams).
export function generateStaticParams() {
  return [];
}

export async function GET(_req: Request, { params }: { params: Promise<{ framework: string; grade: string; subject: string; unit: string; level: string }> }) {
  const card = unitMilestoneCard(await params);
  if (!card) return new Response("Not found", { status: 404 });
  return ogCard(card);
}

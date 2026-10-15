import { ogCard } from "@/components/site/ogCard";
import { countMilestoneCard } from "@/components/site/ogText";

// A shared milestone's card (see milestoneMeta). Drawn the first time a link preview asks for it, then
// cached (an empty generateStaticParams).
export function generateStaticParams() {
  return [];
}

export async function GET(_req: Request, { params }: { params: Promise<{ kind: string; n: string }> }) {
  const card = countMilestoneCard(await params);
  if (!card) return new Response("Not found", { status: 404 });
  return ogCard(card);
}

import { pinCard } from "@/components/site/ogCard";
import { worksheetCard } from "@/components/site/ogText";
import { GUIDE_FRAMEWORKS } from "@/content/guides";

// The tall Pinterest image for a worksheet, used by the page's "Save to Pinterest" link. Drawn the
// first time it is asked for and cached from then on (an empty generateStaticParams).
export function generateStaticParams() {
  return [];
}

export async function GET(_req: Request, { params }: { params: Promise<{ framework: string; grade: string; subject: string }> }) {
  const p = await params;
  const card = GUIDE_FRAMEWORKS.some((f) => f.slug === p.framework) ? worksheetCard(p) : undefined;
  if (!card) return new Response("Not found", { status: 404 });
  return pinCard(card);
}

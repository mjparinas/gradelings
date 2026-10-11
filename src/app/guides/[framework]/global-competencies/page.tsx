import { competenciesMetadata, CompetenciesView } from "@/components/site/GuideExtras";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDE_FRAMEWORKS.filter((f) => guidesFor(f.id).competencies.slug === "global-competencies").map((f) => ({ framework: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[framework]/global-competencies">) {
  return competenciesMetadata(params);
}

export default function Page({ params }: PageProps<"/guides/[framework]/global-competencies">) {
  return <CompetenciesView params={params} />;
}

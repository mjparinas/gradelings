import { assessmentMetadata, AssessmentView } from "@/components/site/GuideExtras";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDE_FRAMEWORKS.filter((f) => guidesFor(f.id).assessment.slug === "state-tests").map((f) => ({ framework: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[framework]/state-tests">) {
  return assessmentMetadata(params);
}

export default function Page({ params }: PageProps<"/guides/[framework]/state-tests">) {
  return <AssessmentView params={params} />;
}

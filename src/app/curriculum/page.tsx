import type { Metadata } from "next";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { coursesFor, curriculumPath, gradesWithContent, gradeSpan } from "@/components/site/curriculum";
import { CurriculumBrowse, type CurriculumBrowseItem } from "@/components/site/CurriculumBrowse";
import { regionWord } from "@/components/site/provinces";
import { FRAMEWORKS } from "@/content/frameworks";
import { APP_NAME } from "@/lib/brand";
import { pageMeta } from "@/lib/pageMeta";
import { FaqSection } from "@/components/site/FaqSection";
import { curriculumIndexFaqs } from "@/components/site/pageFaqs";

export const metadata: Metadata = pageMeta({
  title: "Curriculum: what kids practise in each grade",
  description: `Browse every unit ${APP_NAME} covers from Pre-K to Grade 9, by curriculum, grade and subject, with sample questions and the learning standards each one matches.`,
  path: curriculumPath.index(),
});

function browseItems(): CurriculumBrowseItem[] {
  return FRAMEWORKS.map((f) => ({
    id: f.id,
    slug: f.slug,
    curriculumName: f.curriculumName,
    name: f.name,
    region: f.region,
    country: f.country,
    span: gradeSpan(f),
    units: gradesWithContent(f).reduce((n, g) => n + coursesFor(f, g).reduce((m, c) => m + c.units.length, 0), 0),
    href: curriculumPath.framework(f),
  }));
}

export default function CurriculumIndex() {
  const word = regionWord(FRAMEWORKS);
  return (
    <SitePage cta lead="trial">
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Curriculum" }]} />
      <h1 className="text-4xl font-bold">Where does your child go to school?</h1>
      <p className="mt-2 max-w-2xl font-read text-lg text-ink-soft">
        {APP_NAME} matches practice to the curriculum and report card for your {word}. Pick theirs to see every grade and unit, with sample questions you can try now.
      </p>
      <CurriculumBrowse items={browseItems()} />
      <FaqSection faqs={curriculumIndexFaqs(FRAMEWORKS)} />
    </SitePage>
  );
}

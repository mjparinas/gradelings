import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd, itemListJsonLd } from "@/components/site/jsonld";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { allWorksheetSkills, worksheetGradeLabel, worksheetGrades, worksheetPath, worksheetSkills } from "@/components/site/worksheets";
import { APP_NAME } from "@/lib/brand";
import { pageMeta } from "@/lib/pageMeta";
import { JsonLd } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: ["Free printable math worksheets, Kindergarten to Grade 9", "Free printable math worksheets"],
  description: `Free printable math worksheets for every grade from Kindergarten to Grade 9, one for each skill, each with an answer key. Print one, or practice on screen with ${APP_NAME}.`,
  path: worksheetPath.hub(),
});

export default function WorksheetsHub() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Math worksheets" }];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), itemListJsonLd("Free printable math worksheets", worksheetGrades().map((g) => ({ name: `${worksheetGradeLabel(g)} math worksheets`, path: worksheetPath.grade(g) })))]} />
      <Crumbs items={crumbs} />
      <h1 className="text-4xl font-bold">Free printable math worksheets</h1>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">
        Pick a grade, then a skill. Every worksheet has 10 questions and an answer key, and prints on one page. There are {allWorksheetSkills().length} skills in all.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {worksheetGrades().map((g) => (
          <li key={g} className="rounded-2xl border border-line bg-white p-5">
            <h2 className="text-2xl font-bold">
              <Link href={worksheetPath.grade(g)} className="underline-offset-4 hover:underline">
                {worksheetGradeLabel(g)} math worksheets
              </Link>
            </h2>
            <p className="mt-1 font-read text-ink-soft">{worksheetSkills(g).length} skills</p>
          </li>
        ))}
      </ul>
    </SitePage>
  );
}

import type { Metadata } from "next";
import Link from "@/components/PublicLink";
import { breadcrumbJsonLd, itemListJsonLd } from "@/components/site/jsonld";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { allWorksheetSkills, gradeSkills, subjectWord, subjectsWithSheets, worksheetGradeLabel, worksheetGrades, worksheetPath, worksheetSkills } from "@/components/site/worksheets";
import { APP_NAME } from "@/lib/brand";
import { pageMeta } from "@/lib/pageMeta";
import { JsonLd } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: ["Free printable worksheets, Pre-K to Grade 9", "Free printable worksheets"],
  description: `Free printable worksheets for Pre-K to Grade 9: math, language arts and science, one for each skill, each with an answer key. Print one, or practice on screen with ${APP_NAME}.`,
  path: worksheetPath.hub(),
});

export default function WorksheetsHub() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Worksheets" }];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), itemListJsonLd("Free printable worksheets", worksheetGrades().map((g) => ({ name: `${worksheetGradeLabel(g)} worksheets`, path: worksheetPath.grade(g) })))]} />
      <Crumbs items={crumbs} />
      <h1 className="text-4xl font-bold">Free printable worksheets</h1>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">
        Pick a grade, then a skill. Every worksheet has an answer key and prints on one page: 10 questions from Kindergarten up, and 6 picture questions for Pre-K, which a grown-up reads aloud. There are {allWorksheetSkills().length} skills in all.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {worksheetGrades().map((g) => (
          <li key={g} className="rounded-2xl border border-line bg-white p-5">
            <h2 className="text-2xl font-bold">
              <Link href={worksheetPath.grade(g)} className="underline-offset-4 hover:underline">
                {worksheetGradeLabel(g)} {g === "pk" ? "worksheets" : "math worksheets"}
              </Link>
            </h2>
            <p className="mt-1 font-read text-ink-soft">{g === "pk" ? `${gradeSkills(g).length} skills` : `${worksheetSkills(g).length} skills`}</p>
            {g !== "pk" && subjectsWithSheets(g).length > 1 && (
              <p className="mt-2 font-read">
                Also:{" "}
                {subjectsWithSheets(g)
                  .filter((sub) => sub !== "math")
                  .map((sub, i) => (
                    <span key={sub}>
                      {i > 0 && ", "}
                      <Link href={worksheetPath.subject(g, sub)} className="font-bold underline">
                        {subjectWord(sub)}
                      </Link>
                    </span>
                  ))}
              </p>
            )}
          </li>
        ))}
      </ul>
    </SitePage>
  );
}

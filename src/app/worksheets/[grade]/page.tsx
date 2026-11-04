import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { breadcrumbJsonLd, itemListJsonLd } from "@/components/site/jsonld";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { resolveSkill, sheetSize, subjectWord, subjectsWithSheets, worksheetGradeLabel, worksheetGrades, worksheetPath, worksheetSkills, worksheetSubjects } from "@/components/site/worksheets";
import { gradeSlug } from "@/content/subjects";
import { APP_NAME } from "@/lib/brand";
import { pageMeta } from "@/lib/pageMeta";
import { JsonLd } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return worksheetGrades().map((g) => ({ grade: gradeSlug(g) }));
}

type Props = PageProps<"/worksheets/[grade]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = resolveSkill(await params);
  if (!r) return {};
  const label = worksheetGradeLabel(r.grade);
  if (r.grade === "pk") {
    return pageMeta({
      title: ["Free printable Pre-K worksheets with answers", "Pre-K worksheets"],
      description: `Free printable Pre-K worksheets with answer keys: picture questions in math, language, science and social studies for a grown-up to read aloud. Print one, or play on screen with ${APP_NAME}.`,
      path: worksheetPath.grade("pk"),
    });
  }
  const skills = worksheetSkills(r.grade);
  return pageMeta({
    title: [`Free printable ${label} math worksheets with answers`, `${label} math worksheets`],
    description: `${skills.length} free printable ${label} math worksheets with answer keys: ${skills
      .slice(0, 4)
      .map((s) => s.unit.title.toLowerCase())
      .join(", ")} and more. Print one, or practice on screen with ${APP_NAME}.`,
    path: worksheetPath.grade(r.grade),
  });
}

export default async function WorksheetGradePage({ params }: Props) {
  const r = resolveSkill(await params);
  if (!r) notFound();
  const label = worksheetGradeLabel(r.grade);
  const crumbs = [{ label: "Home", href: "/" }, { label: "Worksheets", href: worksheetPath.hub() }, { label }];
  if (r.grade === "pk") {
    const groups = worksheetSubjects("pk").map((sub) => ({ sub, skills: worksheetSkills("pk", sub) })).filter((x) => x.skills.length > 0);
    return (
      <SitePage cta lead="trial" play="/play/">
        <JsonLd data={[breadcrumbJsonLd(crumbs), itemListJsonLd("Pre-K worksheets", groups.flatMap((x) => x.skills.map((s) => ({ name: `Pre-K ${s.unit.title} worksheet`, path: worksheetPath.skill("pk", s.unit.id, x.sub) }))))]} />
        <Crumbs items={crumbs} />
        <h1 className="text-4xl font-bold">Pre-K worksheets</h1>
        <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">
          Free printable Pre-K worksheets with {sheetSize("pk")} picture questions each and an answer key. A grown-up reads each question aloud, and the child points to the answer.
        </p>
        {groups.map(({ sub, skills }) => (
          <section key={sub} className="mt-8" aria-labelledby={`s-${sub}`}>
            <h2 id={`s-${sub}`} className="text-2xl font-bold">
              <Link href={worksheetPath.subject("pk", sub)} className="underline-offset-4 hover:underline">
                Pre-K {subjectWord(sub)} worksheets
              </Link>
            </h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {skills.map((s) => (
                <li key={s.unit.id} className="rounded-2xl border border-line bg-white p-4">
                  <Link href={worksheetPath.skill("pk", s.unit.id, sub)} className="text-xl font-bold underline-offset-4 hover:underline">
                    {s.unit.title}
                  </Link>
                  <p className="font-read text-ink-soft">{s.unit.blurb}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </SitePage>
    );
  }
  const skills = worksheetSkills(r.grade);
  const others = subjectsWithSheets(r.grade).filter((sub) => sub !== "math");
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), itemListJsonLd(`${label} math worksheets`, skills.map((s) => ({ name: `${label} ${s.unit.title} worksheet`, path: worksheetPath.skill(r.grade, s.unit.id) })))]} />
      <Crumbs items={crumbs} />
      <h1 className="text-4xl font-bold">{label} math worksheets</h1>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">Free printable {label} math worksheets, one for each skill. Each has 10 questions and an answer key.</p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {skills.map((s) => (
          <li key={s.unit.id} className="rounded-2xl border border-line bg-white p-4">
            <Link href={worksheetPath.skill(r.grade, s.unit.id)} className="text-xl font-bold underline-offset-4 hover:underline">
              {s.unit.title}
            </Link>
            <p className="font-read text-ink-soft">{s.unit.blurb}</p>
          </li>
        ))}
      </ul>
      {others.length > 0 && (
        <section className="mt-8" aria-labelledby="other">
          <h2 id="other" className="text-2xl font-bold">
            {label} worksheets in other subjects
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {others.map((sub) => (
              <li key={sub}>
                <Link href={worksheetPath.subject(r.grade, sub)} className="inline-flex min-h-11 items-center rounded-xl border-2 border-line bg-white px-3 py-1.5 font-read text-lg hover:border-[#4f8ef7]">
                  {label} {subjectWord(sub)} worksheets
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <p className="mt-8 font-read text-lg">
        More grades: <Link href={worksheetPath.hub()} className="font-bold underline">all worksheets</Link>.
      </p>
    </SitePage>
  );
}

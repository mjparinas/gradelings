import type { Metadata } from "next";
import Link from "@/components/PublicLink";
import { notFound } from "next/navigation";
import { breadcrumbJsonLd, itemListJsonLd } from "@/components/site/jsonld";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { WorksheetSheet } from "@/components/site/WorksheetSheet";
import { allWorksheetSkills, resolveSkill, sheetQuestions, sheetSize, subjectSlug, subjectWord, worksheetGradeLabel, worksheetPath, worksheetSkills, subjectPages } from "@/components/site/worksheets";
import { gradeSlug } from "@/content/subjects";
import { APP_NAME } from "@/lib/brand";
import { pageMeta } from "@/lib/pageMeta";
import { JsonLd } from "@/lib/site";

export const dynamicParams = false;

// One address, two pages: Kindergarten to Grade 9 math skills keep their first addresses (/worksheets/{grade}/{skill}/),
// and a grade's other subjects have a page listing their skills (/worksheets/{grade}/{subject}/).
export function generateStaticParams() {
  const skills = allWorksheetSkills()
    .filter((s) => worksheetPath.skill(s.grade, s.unit.id, s.subject).split("/").length === 5)
    .map((s) => ({ grade: gradeSlug(s.grade), skill: s.unit.id }));
  const subjects = subjectPages().map((p) => ({ grade: gradeSlug(p.grade), skill: subjectSlug(p.subject) }));
  return [...skills, ...subjects];
}

type Props = PageProps<"/worksheets/[grade]/[skill]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = resolveSkill(await params);
  if (!r) return {};
  const label = worksheetGradeLabel(r.grade);
  if ("unit" in r) {
    return pageMeta({
      title: [`${label} ${r.unit.title} worksheet: free printable with answers`, `${label} ${r.unit.title} worksheet (free, printable)`, `${label} ${r.unit.title} worksheet`],
      description: `A free printable ${label} math worksheet on ${r.unit.title.toLowerCase()} with ${sheetQuestions(r).length} questions and an answer key. Print it, or practice the same skill on screen with ${APP_NAME}.`,
      path: worksheetPath.skill(r.grade, r.unit.id),
    });
  }
  const subject = r.subject!;
  const word = subjectWord(subject);
  const skills = worksheetSkills(r.grade, subject);
  return pageMeta({
    title: [`Free printable ${label} ${word} worksheets with answers`, `${label} ${word} worksheets`],
    description: `${skills.length} free printable ${label} ${word} worksheets with answer keys: ${skills
      .slice(0, 4)
      .map((s) => s.unit.title.toLowerCase())
      .join(", ")} and more. Print one, or practice on screen with ${APP_NAME}.`,
    path: worksheetPath.subject(r.grade, subject),
  });
}

export default async function WorksheetSkillPage({ params }: Props) {
  const r = resolveSkill(await params);
  if (!r) notFound();
  if ("unit" in r) return <WorksheetSheet s={r} />;
  const grade = r.grade;
  const subject = r.subject!;
  const label = worksheetGradeLabel(grade);
  const word = subjectWord(subject);
  const skills = worksheetSkills(grade, subject);
  const crumbs = [{ label: "Home", href: "/" }, { label: "Worksheets", href: worksheetPath.hub() }, { label, href: worksheetPath.grade(grade) }, { label: `${word.charAt(0).toUpperCase()}${word.slice(1)}` }];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), itemListJsonLd(`${label} ${word} worksheets`, skills.map((s) => ({ name: `${label} ${s.unit.title} worksheet`, path: worksheetPath.skill(grade, s.unit.id, subject) })))]} />
      <Crumbs items={crumbs} />
      <h1 className="text-4xl font-bold">
        {label} {word} worksheets
      </h1>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">
        Free printable {label} {word} worksheets, one for each skill. Each has up to {sheetSize(grade)} questions and an answer key.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {skills.map((s) => (
          <li key={s.unit.id} className="rounded-2xl border border-line bg-white p-4">
            <Link href={worksheetPath.skill(grade, s.unit.id, subject)} className="text-xl font-bold underline-offset-4 hover:underline">
              {s.unit.title}
            </Link>
            <p className="font-read text-ink-soft">{s.unit.blurb}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 font-read text-lg">
        More: <Link href={worksheetPath.grade(grade)} className="font-bold underline">all {label} worksheets</Link>, or <Link href={worksheetPath.hub()} className="font-bold underline">every grade</Link>.
      </p>
    </SitePage>
  );
}

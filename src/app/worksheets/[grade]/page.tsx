import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { breadcrumbJsonLd, itemListJsonLd } from "@/components/site/jsonld";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { resolveSkill, worksheetGradeLabel, worksheetGrades, worksheetPath, worksheetSkills } from "@/components/site/worksheets";
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
  const skills = worksheetSkills(r.grade);
  const crumbs = [{ label: "Home", href: "/" }, { label: "Math worksheets", href: worksheetPath.hub() }, { label }];
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
      <p className="mt-8 font-read text-lg">
        More grades: <Link href={worksheetPath.hub()} className="font-bold underline">all math worksheets</Link>.
      </p>
    </SitePage>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { breadcrumbJsonLd, itemListJsonLd } from "@/components/site/jsonld";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { SPANISH_LEVEL_WORDS, spanishCourses, spanishGrade, spanishGradeLabel, spanishPath } from "@/components/site/spanishPages";
import { gradeSlug } from "@/content/subjects";
import { APP_NAME } from "@/lib/brand";
import { JsonLd } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";

export const dynamicParams = false;

export function generateStaticParams() {
  return spanishCourses().map((c) => ({ grade: gradeSlug(c.grade) }));
}

type Props = PageProps<"/spanish/[grade]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = spanishGrade((await params).grade);
  if (!r) return {};
  const g = spanishGradeLabel(r.grade);
  return pageMeta({
    title: [`${g} Spanish: units, practice and stories`, `${g} Spanish for kids`, `${g} Spanish`],
    description: `What a ${g} child practises in beginner Spanish: ${r.course.units.map((u) => u.title).join(", ")}. Free sample questions and stories in ${APP_NAME}.`,
    path: spanishPath.grade(r.grade),
  });
}

export default async function SpanishGradePage({ params }: Props) {
  const r = spanishGrade((await params).grade);
  if (!r) notFound();
  const { grade, course } = r;
  const g = spanishGradeLabel(grade);
  const crumbs = [{ label: "Home", href: "/" }, { label: "Spanish", href: spanishPath.hub() }, { label: g }];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), itemListJsonLd(`${g} Spanish units`, course.units.map((u) => ({ name: u.title, path: spanishPath.unit(grade, u.id) })))]} />
      <Crumbs items={crumbs} />
      <h1 className="text-4xl font-bold">{g} Spanish</h1>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">
        {course.units.length} beginner units. By the end of {g}, children aim to understand and use {SPANISH_LEVEL_WORDS[grade]}. Questions are in English and the Spanish is what children learn.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {course.units.map((u, i) => (
          <li key={u.id} className="card p-5">
            <p className="text-sm font-bold text-ink-soft">Unit {i + 1}</p>
            <h2 className="text-2xl font-bold">
              <Link href={spanishPath.unit(grade, u.id)} className="underline-offset-4 hover:underline">
                <span aria-hidden="true">{u.emoji} </span>
                {u.title}
              </Link>
            </h2>
            <p className="mt-1 font-read text-lg">{u.blurb}</p>
            <p className="mt-2 font-read text-ink-soft">{u.parentNote}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 font-read text-lg">
        Other grades:{" "}
        {spanishCourses()
          .filter((c) => c.grade !== grade)
          .map((c, i) => (
            <span key={c.grade}>
              {i > 0 && ", "}
              <Link href={spanishPath.grade(c.grade)} className="font-bold underline">
                {spanishGradeLabel(c.grade)}
              </Link>
            </span>
          ))}
        . Spanish practice is not a report-card mark; it shows what a child knows.
      </p>
    </SitePage>
  );
}

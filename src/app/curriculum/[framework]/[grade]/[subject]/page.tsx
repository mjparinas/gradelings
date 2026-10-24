import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { breadcrumbJsonLd, itemListJsonLd } from "@/components/site/jsonld";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { coursesFor, curriculumPath, gradesWithContent, resolve, subjectSeoTitle, subjectTitle, gradeLabel } from "@/components/site/curriculum";
import { FRAMEWORKS } from "@/content/frameworks";
import { getSubjectMeta, gradeSlug, subjectInSentence } from "@/content/subjects";
import { JsonLd } from "@/lib/site";
import { ShareButton } from "@/components/site/ShareButton";
import { pageMeta } from "@/lib/pageMeta";
import { playHref } from "@/lib/playLink";

export const dynamicParams = false;

export function generateStaticParams() {
  return FRAMEWORKS.flatMap((f) =>
    gradesWithContent(f).flatMap((g) => coursesFor(f, g).map((c) => ({ framework: f.slug, grade: gradeSlug(g), subject: c.subject }))),
  );
}

export async function generateMetadata({ params }: PageProps<"/curriculum/[framework]/[grade]/[subject]">): Promise<Metadata> {
  const r = resolve(await params);
  if (!r?.course) return {};
  const { framework: f, grade, course } = r;
  const name = subjectSeoTitle(course.subject);
  return pageMeta({
    title: [`${gradeLabel(f, grade)} ${name}: ${f.shortName} curriculum practice`, `${gradeLabel(f, grade)} ${name} practice (${f.shortName})`, `${gradeLabel(f, grade)} ${name} (${f.shortName})`],
    description: `${gradeLabel(f, grade)} ${subjectInSentence(name)} in ${f.name}: ${course.units
      .slice(0, 5)
      .map((u) => u.title)
      .join(", ")} and more. ${f.overviewLabel}, ${f.standardLabel.toLowerCase()}s and free sample questions.`,
    path: curriculumPath.subject(f, grade, course.subject),
    framework: f,
  });
}

export default async function SubjectPage({ params }: PageProps<"/curriculum/[framework]/[grade]/[subject]">) {
  const r = resolve(await params);
  if (!r?.course) notFound();
  const { framework: f, grade, course } = r;
  const meta = getSubjectMeta(course.subject);
  const name = subjectSeoTitle(course.subject);
  const bigIdeas = course.bigIdeas[f.id] ?? [];
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Curriculum", href: curriculumPath.index() },
    { label: f.curriculumName, href: curriculumPath.framework(f) },
    { label: gradeLabel(f, grade), href: curriculumPath.grade(f, grade) },
    { label: name },
  ];

  return (
    <SitePage cta lead="trial" play={playHref({ framework: f.id, grade, subject: course.subject })}>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          itemListJsonLd(
            `${gradeLabel(f, grade)} ${name} units`,
            course.units.map((u) => ({ name: u.title, path: curriculumPath.unit(f, grade, course.subject, u.id) })),
          ),
        ]}
      />
      <Crumbs items={crumbs} />
      <h1 className="flex items-center gap-3 text-4xl font-bold">
        <span aria-hidden="true">{meta.emoji}</span> {gradeLabel(f, grade)} {name}
      </h1>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">
        {course.units.length} units matched to the {f.curriculumName}
        {subjectTitle(course.subject, grade) !== name ? `. Kids see this subject as “${subjectTitle(course.subject, grade)}”.` : "."}
      </p>
      <div className="mt-3">
        <ShareButton path={curriculumPath.subject(f, grade, course.subject)} title={`${gradeLabel(f, grade)} ${name} (${f.shortName})`} text={`Free ${gradeLabel(f, grade)} ${name} practice, matched to the ${f.curriculumName}:`} />
      </div>

      {bigIdeas.length > 0 && (
        <section aria-labelledby="big-ideas" className="mt-6 rounded-3xl p-5 sm:p-6" style={{ background: meta.colourSoft }}>
          <h2 id="big-ideas" className="text-2xl font-bold">
            {f.overviewLabel}
          </h2>
          <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 font-read text-lg">
            {bigIdeas.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="units" className="mt-8">
        <h2 id="units" className="mb-4 text-2xl font-bold">
          Units
        </h2>
        <ol className="grid gap-4 md:grid-cols-2">
          {course.units.map((u, i) => (
            <li key={u.id} className="card flex flex-col gap-2 p-5">
              <p className="text-sm font-semibold text-ink-soft">Unit {i + 1}</p>
              <h3 className="flex items-center gap-2 text-xl font-bold">
                <span aria-hidden="true">{u.emoji}</span>
                <Link href={curriculumPath.unit(f, grade, course.subject, u.id)} className="hover:underline">
                  {u.title}
                </Link>
              </h3>
              <p className="font-read text-ink-soft">{u.parentNote}</p>
              {u.standards[f.id] && (
                <p className="text-sm">
                  <b>{f.standardLabel}:</b> {u.standards[f.id]}
                </p>
              )}
            </li>
          ))}
        </ol>
      </section>
    </SitePage>
  );
}

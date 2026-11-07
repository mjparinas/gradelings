import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { breadcrumbJsonLd, typicalAgeRange } from "@/components/site/jsonld";
import { SampleQuestion } from "@/components/site/SampleQuestion";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { spanishCourses, spanishGradeLabel, spanishPath, spanishSampleSeed, spanishStandardLines, spanishUnit } from "@/components/site/spanishPages";
import { hashSeed, withSeed } from "@/content/random";
import { getSubjectMeta, gradeSlug } from "@/content/subjects";
import { APP_NAME } from "@/lib/brand";
import { JsonLd, ORG_REF, absolute } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";

export const dynamicParams = false;

export function generateStaticParams() {
  return spanishCourses().flatMap((c) => c.units.map((u) => ({ grade: gradeSlug(c.grade), unit: u.id })));
}

type Props = PageProps<"/spanish/[grade]/[unit]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = spanishUnit((await params).grade, (await params).unit);
  if (!r) return {};
  const g = spanishGradeLabel(r.grade);
  return pageMeta({
    title: [`${r.unit.title}: ${g} Spanish practice`, `${r.unit.title}: ${g} Spanish`, `${r.unit.title} (${g} Spanish)`, r.unit.title],
    description: `${r.unit.parentNote} Free ${g} Spanish sample questions with hints, then more practice in ${APP_NAME}.`,
    path: spanishPath.unit(r.grade, r.unit.id),
  });
}

export default async function SpanishUnitPage({ params }: Props) {
  const { grade: gradeParam, unit: unitParam } = await params;
  const r = spanishUnit(gradeParam, unitParam);
  if (!r) notFound();
  const { grade, course, unit } = r;
  const g = spanishGradeLabel(grade);
  const meta = getSubjectMeta("spanish");
  const seed = spanishSampleSeed(grade, unit.id);
  const questions = withSeed(hashSeed(seed), () => unit.generate({ difficulty: 2 })).slice(0, 6);
  const index = course.units.indexOf(unit);
  const prev = course.units[index - 1];
  const next = course.units[index + 1];
  const path = spanishPath.unit(grade, unit.id);
  const standards = spanishStandardLines(unit);
  const crumbs = [{ label: "Home", href: "/" }, { label: "Spanish", href: spanishPath.hub() }, { label: `${g} Spanish`, href: spanishPath.grade(grade) }, { label: unit.title }];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: `${unit.title} (${g} Spanish)`,
            description: unit.parentNote,
            url: absolute(path),
            inLanguage: "en",
            teaches: "Spanish",
            learningResourceType: "Practice problems",
            interactivityType: "active",
            isAccessibleForFree: true,
            educationalLevel: g,
            typicalAgeRange: typicalAgeRange(grade),
            provider: ORG_REF,
          },
        ]}
      />
      <Crumbs items={crumbs} />
      <header className="flex flex-col gap-3 rounded-3xl p-6 sm:flex-row sm:items-center" style={{ background: meta.colourSoft }}>
        <span className="text-6xl" aria-hidden="true">
          {unit.emoji}
        </span>
        <div>
          <p className="font-semibold text-ink-soft">
            {g} · Spanish · Unit {index + 1} of {course.units.length}
          </p>
          <h1 className="text-4xl font-bold">{unit.title}</h1>
          <p className="mt-1 font-read text-lg">{unit.blurb}</p>
        </div>
      </header>

      <section aria-labelledby="about" className="mt-6 max-w-3xl">
        <h2 id="about" className="text-2xl font-bold">
          What your child practises
        </h2>
        <p className="mt-2 font-read text-lg">{unit.parentNote}</p>
        {standards.length > 0 && (
          <div className="mt-3 rounded-2xl bg-white p-4 font-read">
            <p className="font-bold">The standards behind this unit</p>
            <ul className="mt-1 flex flex-col gap-1">
              {standards.map((s) => (
                <li key={s.label}>
                  <b>{s.label}:</b> {s.text}
                </li>
              ))}
            </ul>
          </div>
        )}
        {unit.lesson && (
          <div className="mt-5">
            <h2 className="text-2xl font-bold">How we explain it</h2>
            <ol className="mt-2 list-decimal space-y-1 pl-6 font-read text-lg">
              {unit.lesson.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <p className="mt-3 rounded-2xl bg-white p-4 font-read">
              <b>Example:</b> {unit.lesson.example.question} {unit.lesson.example.work.join(" ")} <b>Answer: {unit.lesson.example.answer}</b>
            </p>
          </div>
        )}
      </section>

      <section aria-labelledby="samples" className="mt-8">
        <h2 id="samples" className="mb-1 text-2xl font-bold">
          Try a few questions
        </h2>
        <p className="mb-4 font-read text-ink-soft">A taste of this unit. In the app, questions change every time, are read aloud in a Spanish voice and get easier or harder to match your child.</p>
        <ol className="grid items-start gap-4 md:grid-cols-2">
          {questions.map((q, i) => (
            <SampleQuestion key={i} q={q} n={i + 1} seedText={`${seed}#${i}`} tryIt={{ play: "/play/", playLabel: "Play Spanish" }} />
          ))}
        </ol>
      </section>

      <p className="mt-8 font-read text-lg">
        {prev && (
          <>
            Before this: <Link href={spanishPath.unit(grade, prev.id)} className="font-bold underline">{prev.title}</Link>.{" "}
          </>
        )}
        {next && (
          <>
            Next: <Link href={spanishPath.unit(grade, next.id)} className="font-bold underline">{next.title}</Link>.{" "}
          </>
        )}
        <Link href={spanishPath.grade(grade)} className="font-bold underline">All {g} Spanish units</Link>. This is practice, not a report-card mark.
      </p>
    </SitePage>
  );
}

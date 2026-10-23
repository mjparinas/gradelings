import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrintButton } from "@/components/site/PrintButton";
import { SampleQuestion, answerText } from "@/components/site/SampleQuestion";
import { breadcrumbJsonLd, typicalAgeRange } from "@/components/site/jsonld";
import { Crumbs, SitePage, SubscribeActions } from "@/components/site/SiteChrome";
import { coursesFor, curriculumPath, gradesWithContent, resolve, sampleSeed, subjectSeoTitle, unitKey, gradeLabel } from "@/components/site/curriculum";
import { guidePath } from "@/components/site/guides";
import { hashSeed, withSeed } from "@/content/random";
import type { Framework } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS } from "@/content/guides";
import { getSubjectMeta, gradeSlug, subjectInSentence } from "@/content/subjects";
import type { Course, Question } from "@/content/types";
import { APP_NAME } from "@/lib/brand";
import { courseUpdated } from "@/content/updated";
import { pageLocale } from "@/lib/pageMeta";
import { JsonLd, ORG_REF, absolute } from "@/lib/site";
import { PinLink, ShareButton } from "@/components/site/ShareButton";
import { pageMeta } from "@/lib/pageMeta";
import { playHref } from "@/lib/playLink";
import { TRIAL_DAYS } from "@/lib/plan";

export const dynamicParams = false;

const SHEET_QUESTIONS = 10;

export function generateStaticParams() {
  return GUIDE_FRAMEWORKS.flatMap((f) =>
    gradesWithContent(f).flatMap((g) => coursesFor(f, g).map((c) => ({ framework: f.slug, grade: gradeSlug(g), subject: c.subject }))),
  );
}

type Props = PageProps<"/guides/[framework]/[grade]/[subject]/worksheet">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = resolve(await params);
  if (!r?.course) return {};
  const { framework: f, grade, course } = r;
  const name = subjectSeoTitle(course.subject);
  return pageMeta({
    title: [`Free printable ${gradeLabel(f, grade)} ${name} practice sheet (${f.shortName})`, `Printable ${gradeLabel(f, grade)} ${name} practice sheet (${f.shortName})`, `${gradeLabel(f, grade)} ${name} worksheet (${f.shortName})`, `${gradeLabel(f, grade)} ${name} sheets (${f.shortName})`],
    description: `A free ${gradeLabel(f, grade)} ${subjectInSentence(name)} practice sheet with an answer key, matched to the ${f.curriculumName}. Print it or work through it on screen.`,
    path: guidePath.worksheet(f, grade, course.subject),
    framework: f,
  });
}

/** One question per unit, round-robin, seeded so the sheet is identical on every build and differs by region. */
function sheetQuestions(f: Framework, course: Course): { q: Question; unit: string; unitId: string; seed: string }[] {
  const picked: { q: Question; unit: string; unitId: string; seed: string }[] = [];
  const pools = course.units.map((u) => {
    const key = sampleSeed(f, unitKey(course.grade, course.subject, u.id));
    return { u, key, qs: withSeed(hashSeed(`sheet:${key}`), () => u.generate({ difficulty: 2 })) };
  });
  for (let round = 0; picked.length < SHEET_QUESTIONS && round < 3; round++) {
    for (const p of pools) {
      if (picked.length >= SHEET_QUESTIONS) break;
      const q = p.qs[round];
      if (q) picked.push({ q, unit: p.u.title, unitId: p.u.id, seed: `${p.key}#sheet${round}` });
    }
  }
  return picked;
}

export default async function WorksheetPage({ params }: Props) {
  const r = resolve(await params);
  if (!r?.course) notFound();
  const { framework: f, grade, course } = r;
  const label = gradeLabel(f, grade);
  const name = subjectSeoTitle(course.subject);
  const meta = getSubjectMeta(course.subject);
  const items = sheetQuestions(f, course);
  const updated = courseUpdated(f.id, grade, course.subject);
  const path = guidePath.worksheet(f, grade, course.subject);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: `${f.shortName} parent guides`, href: guidePath.hub(f) },
    { label, href: guidePath.grade(f, grade) },
    { label: `${name} at home`, href: guidePath.subject(f, grade, course.subject) },
    { label: "Practice sheet" },
  ];

  return (
    <SitePage lead="trial" play={playHref({ framework: f.id, grade, subject: course.subject })}>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: `${label} ${name} practice sheet (${f.shortName})`,
            description: `Free ${label} ${subjectInSentence(name)} practice questions with an answer key, matched to the ${f.curriculumName}.`,
            url: absolute(path),
            inLanguage: pageLocale(f),
            learningResourceType: "Worksheet",
            educationalUse: "practice",
            isAccessibleForFree: true,
            educationalLevel: label,
            typicalAgeRange: typicalAgeRange(grade),
            about: name,
            ...(updated ? { dateModified: updated } : {}),
            provider: ORG_REF,
            // The standards the sheet's questions practise: one question per unit, round-robin.
            educationalAlignment: [...new Set(items.map((i) => i.unitId))].flatMap((id) => {
              const standard = course.units.find((u) => u.id === id)?.standards[f.id];
              return standard ? [{ "@type": "AlignmentObject", alignmentType: "teaches", educationalFramework: f.curriculumName, targetName: standard }] : [];
            }),
          },
        ]}
      />
      <div className="print:hidden">
        <Crumbs items={crumbs} />
      </div>
      <header className="flex flex-col gap-3 rounded-3xl p-6 sm:flex-row sm:items-center print:rounded-none print:p-0" style={{ background: meta.colourSoft }}>
        <span className="text-5xl print:hidden" aria-hidden="true">
          {meta.emoji}
        </span>
        <div className="flex-1">
          <h1 className="text-4xl font-bold print:text-3xl">
            {label} {name} practice sheet
          </h1>
          <p className="font-read text-lg">
            {f.curriculumName} · from {APP_NAME} · Name: ______________________
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:flex-col">
          <PrintButton />
          <ShareButton path={path} title={`${label} ${name} practice sheet`} text={`A free ${label} ${subjectInSentence(name)} practice sheet with answers:`} label="Share this sheet" />
          <PinLink path={path} media={absolute(`${path}pin.png`)} description={`Free printable ${label} ${name} worksheet with answer key (${f.shortName} curriculum)`} />
        </div>
      </header>

      <ol className="mt-6 grid items-start gap-4 md:grid-cols-2 print:block print:space-y-4">
        {items.map((it, i) => (
          <SampleQuestion key={i} q={it.q} n={i + 1} seedText={it.seed} className="print:break-inside-avoid" />
        ))}
      </ol>
      {/* On paper only: the sheet is what a parent keeps, so it says where the rest is. */}
      <p className="mt-6 hidden rounded-xl border-2 border-line p-3 font-read text-lg print:block print:break-inside-avoid">
        <b>
          More {label} {name} practice, with new questions every time:
        </b>{" "}
        {absolute(curriculumPath.subject(f, grade, course.subject)).replace(/^https?:\/\//, "")} · Free for {TRIAL_DAYS} days, no card needed.
      </p>

      <section aria-labelledby="key" className="mt-10 rounded-3xl bg-white p-6 print:break-before-page">
        <h2 id="key" className="text-2xl font-bold">
          Answer key
        </h2>
        <ol className="mt-3 grid gap-x-8 gap-y-1 font-read text-lg sm:grid-cols-2">
          {items.map((it, i) => (
            <li key={i}>
              <b>{i + 1}.</b> {answerText(it.q)} <span className="text-sm text-ink-soft">({it.unit})</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="card mt-10 flex flex-col flex-wrap gap-3 p-6 print:hidden sm:flex-row sm:items-center">
        <div className="flex-1">
          <p className="text-xl font-bold">Want more than 10 questions?</p>
          <p className="font-read text-ink-soft">
            In {APP_NAME} the questions change every time and adjust to your child, with hints and kind feedback.{" "}
            <Link href={curriculumPath.subject(f, grade, course.subject)} className="font-semibold text-[#2f6fd6] underline">
              See all {subjectInSentence(name)} units
            </Link>
            .
          </p>
        </div>
        <SubscribeActions lead="trial" size="md" play={playHref({ framework: f.id, grade, subject: course.subject })} />
      </section>
    </SitePage>
  );
}

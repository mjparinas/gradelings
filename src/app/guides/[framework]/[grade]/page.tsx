import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/site/jsonld";
import { Crumbs, SitePage, SubscribeActions } from "@/components/site/SiteChrome";
import { coursesFor, curriculumPath, gradesWithContent, resolve, subjectSeoTitle, gradeLabel, say } from "@/components/site/curriculum";
import { guidePath } from "@/components/site/guides";
import { assessmentMetadata, AssessmentView, competenciesMetadata, CompetenciesView, guidePageKind, guidePageParams } from "@/components/site/GuideExtras";
import { guidesFor, GUIDE_FRAMEWORKS } from "@/content/guides";
import { getSubjectMeta, gradeSlug, subjectInSentence } from "@/content/subjects";
import { APP_NAME } from "@/lib/brand";
import { TRIAL_DAYS } from "@/lib/plan";
import { Disclosure } from "@/components/Disclosure";
import { gradeUpdated, guidesUpdated, latest } from "@/content/updated";
import { JsonLd, absolute } from "@/lib/site";
import { PinLink, ShareButton } from "@/components/site/ShareButton";
import { pageMeta } from "@/lib/pageMeta";

export const dynamicParams = false;

// Each grade's guide, plus the framework's competencies and assessment pages, whose slugs come from its guide copy
// (see guidePageKind).
export function generateStaticParams() {
  return [...GUIDE_FRAMEWORKS.flatMap((f) => gradesWithContent(f).map((g) => ({ framework: f.slug, grade: gradeSlug(g) }))), ...guidePageParams()];
}

type Props = PageProps<"/guides/[framework]/[grade]">;

/** "math, English language arts and science" */
function listOf(names: string[]): string {
  const n = names.map(subjectInSentence);
  return n.length > 1 ? `${n.slice(0, -1).join(", ")} and ${n[n.length - 1]}` : n.join("");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const kind = guidePageKind(p.framework, p.grade);
  if (kind) return kind === "competencies" ? competenciesMetadata(params) : assessmentMetadata(params);
  const r = resolve(p);
  if (!r) return {};
  const { framework: f, grade } = r;
  return pageMeta({
    title: `What your child learns in ${gradeLabel(f, grade)} in ${f.shortName}: a parent's guide`,
    description: `${gradeLabel(f, grade)} in ${f.name}: what is taught in ${listOf(coursesFor(f, grade).map((c) => subjectSeoTitle(c.subject)))}, what to look for on the report card, and how to help at home. Matched to the ${f.curriculumName}.`,
    path: guidePath.grade(f, grade),
    framework: f,
    type: "article",
  });
}

export default async function GradeGuide({ params }: Props) {
  const p = await params;
  const kind = guidePageKind(p.framework, p.grade);
  if (kind) return kind === "competencies" ? <CompetenciesView params={params} /> : <AssessmentView params={params} />;
  const r = resolve(p);
  if (!r) notFound();
  const { framework: f, grade } = r;
  const label = gradeLabel(f, grade);
  const note = guidesFor(f.id).gradeNotes[grade];
  if (!note) notFound();
  const courses = coursesFor(f, grade);
  const grades = gradesWithContent(f);
  const i = grades.indexOf(grade);
  const prev = i > 0 ? grades[i - 1] : undefined;
  const next = i < grades.length - 1 ? grades[i + 1] : undefined;
  const prevCourses = prev ? coursesFor(f, prev) : [];
  const assessment = guidesFor(f.id).assessment;
  const hasAssessment = assessment.grades.includes(grade);
  const level = f.scoringFor(grade).levels;

  const faqs = [
    {
      q: `What do kids learn in ${label} in ${f.name}?`,
      a: `${label} covers ${courses.map((c) => subjectInSentence(subjectSeoTitle(c.subject))).join(", ")} in the ${f.curriculumName}. ${note.overview}`,
    },
    {
      q: `How is ${label} reported in ${f.shortName}?`,
      a: `${f.shortName} report cards describe learning with ${level.map((l) => l.label).join(", ")}.${hasAssessment ? ` Students in ${label} also write the ${assessment.name}, which is separate from the report card.` : ""}`,
    },
    {
      q: `How can I help my ${label} child at home?`,
      a: "Short, regular practice works better than long sessions: 10 to 15 minutes a few times a week, on the skills your child's teacher flags. Read together, use math in real life, and praise effort.",
    },
  ];
  const crumbs = [
    { label: "Home", href: "/" },
    { label: `${f.shortName} parent guides`, href: guidePath.hub(f) },
    { label },
  ];
  const title = `What your child learns in ${label} in ${f.shortName}`;

  return (
    <SitePage>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          faqJsonLd(faqs),
          articleJsonLd({ headline: title, description: note.overview, path: guidePath.grade(f, grade), framework: f, updated: latest(guidesUpdated(f.id), gradeUpdated(f.id, grade)) }),
        ]}
      />
      <Crumbs items={crumbs} />
      <h1 className="text-4xl font-bold">
        What your child learns in {label} in {f.shortName}
      </h1>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">{note.overview}</p>
      <div className="mt-3">
        <ShareButton path={guidePath.grade(f, grade)} title={title} text={`What kids learn in ${label} in ${f.shortName}, and how to help at home:`} label="Share this guide" />
      </div>

      <section aria-labelledby="subjects" className="mt-8">
        <h2 id="subjects" className="mb-3 text-2xl font-bold">
          {label} subjects in the {f.curriculumName}
        </h2>
        <div className="grid gap-5 lg:grid-cols-2">
          {courses.map((c) => {
            const meta = getSubjectMeta(c.subject);
            const ideas = (c.bigIdeas[f.id] ?? []).slice(0, 3);
            return (
              <section key={c.subject} className="card overflow-hidden" style={{ borderColor: meta.colour }}>
                <h3 className="flex items-center gap-2 px-5 py-3 text-2xl font-bold" style={{ background: meta.colourSoft }}>
                  <span aria-hidden="true">{meta.emoji}</span>
                  {subjectSeoTitle(c.subject)}
                </h3>
                <div className="flex flex-col gap-3 p-5">
                  {ideas.length > 0 && (
                    <>
                      <p className="font-bold">{f.country === "US" ? f.overviewLabel : "Big Ideas"}</p>
                      <ul className="list-disc pl-5 font-read">
                        {ideas.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  <p className="font-read text-ink-soft">
                    {c.units.length} units, including {c.units.slice(0, 4).map((u) => u.title).join(", ")}.
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 font-semibold">
                    <Link href={guidePath.subject(f, grade, c.subject)} className="text-[#2f6fd6] underline">
                      Help at home
                    </Link>
                    <Link href={curriculumPath.subject(f, grade, c.subject)} className="text-[#2f6fd6] underline">
                      All units
                    </Link>
                    <Link href={guidePath.worksheet(f, grade, c.subject)} className="text-[#2f6fd6] underline">
                      Printable sheet
                    </Link>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section id="sheets" aria-labelledby="sheets-heading" className="mt-10">
        <h2 id="sheets-heading" className="text-2xl font-bold">
          Printable {label} sheets
        </h2>
        <p className="mt-2 max-w-3xl font-read text-lg">One free practice sheet for each subject, with an answer key. Print them, or work through them on screen.</p>
        <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {courses.map((c) => {
            const meta = getSubjectMeta(c.subject);
            return (
              <li key={c.subject}>
                <Link
                  href={guidePath.worksheet(f, grade, c.subject)}
                  className="flex h-full min-h-48 flex-col gap-2 rounded-3xl border-4 p-4 hover:shadow-md"
                  style={{ borderColor: meta.colour, background: meta.colourSoft }}
                >
                  <span className="text-4xl" aria-hidden="true">
                    {meta.emoji}
                  </span>
                  <span className="text-lg font-bold leading-tight">
                    {label} {subjectSeoTitle(c.subject)}
                  </span>
                  <span className="font-read text-sm text-ink-soft">{c.units.slice(0, 2).map((u) => u.title).join(", ")}</span>
                  <span className="mt-auto font-semibold underline">Open the sheet →</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-4">
          <PinLink
            path={`${guidePath.grade(f, grade)}#sheets`}
            media={absolute(guidePath.sheetsPin(f, grade))}
            description={`Free printable ${label} worksheets with answer keys, one for each subject (${f.shortName} curriculum)`}
          />
        </div>
      </section>

      <section aria-labelledby="report" className="mt-10 max-w-3xl">
        <h2 id="report" className="text-2xl font-bold">
          What to look for on the report card
        </h2>
        <p className="mt-2 font-read text-lg">{note.lookFor}</p>
        <p className="mt-2 font-read text-lg">
          {f.shortName} report cards describe learning with {level.map((l) => l.label).join(", ")}.{" "}
          <Link href={`/report-cards/${f.slug}/`} className="font-semibold text-[#2f6fd6] underline">
            See what each level means
          </Link>
          .
        </p>
        {hasAssessment && (
          <p className="mt-2 font-read text-lg">
            {label} students also take the {assessment.name}.{" "}
            <Link href={guidePath.assessment(f)} className="font-semibold text-[#2f6fd6] underline">
              Read the {assessment.short} guide
            </Link>
            .
          </p>
        )}
        <p className="mt-2 font-read text-lg">
          {guidesFor(f.id).competencies.gradeLine}{" "}
          <Link href={guidePath.competencies(f)} className="font-semibold text-[#2f6fd6] underline">
            Read about {guidesFor(f.id).competencies.label}
          </Link>
          .
        </p>
      </section>

      {prev && (
        <section aria-labelledby="ready" className="mt-10 max-w-3xl">
          <h2 id="ready" className="text-2xl font-bold">
            Ready for {label}?
          </h2>
          <p className="mt-2 font-read text-lg">
            {label} builds on what your child {say(f, "practised")} in {gradeLabel(f, prev)}. If a skill feels shaky, a few short practice sessions before or early in the year can help:
          </p>
          <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 font-read text-lg">
            {prevCourses.map((c) => (
              <li key={c.subject}>
                <b>{subjectSeoTitle(c.subject)}:</b> {c.units.slice(0, 5).map((u) => u.title).join(", ")}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="faq" className="mt-10 max-w-3xl">
        <h2 id="faq" className="mb-3 text-2xl font-bold">
          Common questions
        </h2>
        <div className="flex flex-col gap-2">
          {faqs.map((q) => (
            <Disclosure key={q.q} className="rounded-2xl border border-line bg-white p-4" titleClassName="font-bold" title={q.q}>
              <p className="mt-2 font-read">{q.a}</p>
            </Disclosure>
          ))}
        </div>
      </section>

      <section className="card mt-10 flex flex-col gap-2 p-6">
        <p className="text-xl font-bold">{say(f, "Practise")} {label} skills with {APP_NAME}</p>
        <p className="font-read text-ink-soft">Kind hints, no ads, and reports in the language of the {f.shortName} report card. Subscribe now, or try it free for {TRIAL_DAYS} days with no card.</p>
        <div className="flex flex-wrap gap-3">
          <SubscribeActions />
        </div>
      </section>

      <nav aria-label="Other grades" className="mt-8 flex flex-wrap justify-between gap-3">
        {prev ? (
          <Link href={guidePath.grade(f, prev)} className="btn min-h-12 px-4 text-lg">
            ← {gradeLabel(f, prev)}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={guidePath.grade(f, next)} className="btn min-h-12 px-4 text-lg">
            {gradeLabel(f, next)} →
          </Link>
        )}
      </nav>
    </SitePage>
  );
}

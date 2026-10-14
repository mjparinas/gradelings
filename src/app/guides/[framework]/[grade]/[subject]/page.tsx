import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/site/jsonld";
import { Crumbs, SitePage, SubscribeActions } from "@/components/site/SiteChrome";
import { coursesFor, curriculumPath, gradesWithContent, resolve, subjectSeoTitle, gradeLabel, say } from "@/components/site/curriculum";
import { guidePath } from "@/components/site/guides";
import { HOME_TIPS, GUIDE_FRAMEWORKS } from "@/content/guides";
import { ageBandFor, getSubjectMeta, gradeSlug, subjectInSentence } from "@/content/subjects";
import { APP_NAME } from "@/lib/brand";
import { Disclosure } from "@/components/Disclosure";
import { courseUpdated, guidesUpdated, latest } from "@/content/updated";
import { JsonLd } from "@/lib/site";
import { ShareButton } from "@/components/site/ShareButton";
import { pageMeta } from "@/lib/pageMeta";
import { playHref } from "@/lib/playLink";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDE_FRAMEWORKS.flatMap((f) =>
    gradesWithContent(f).flatMap((g) => coursesFor(f, g).map((c) => ({ framework: f.slug, grade: gradeSlug(g), subject: c.subject }))),
  );
}

type Props = PageProps<"/guides/[framework]/[grade]/[subject]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = resolve(await params);
  if (!r?.course) return {};
  const { framework: f, grade, course } = r;
  const name = subjectSeoTitle(course.subject);
  return pageMeta({
    title: [`${gradeLabel(f, grade)} ${name} help at home (${f.shortName} curriculum)`, `${gradeLabel(f, grade)} ${name} help at home (${f.shortName})`, `${gradeLabel(f, grade)} ${name}: help at home`],
    description: `How to help your ${gradeLabel(f, grade)} child with ${subjectInSentence(name)} at home in ${f.name}: what they learn this year, simple activities, and what the report card levels mean.`,
    path: guidePath.subject(f, grade, course.subject),
    framework: f,
    type: "article",
  });
}

export default async function SubjectGuide({ params }: Props) {
  const r = resolve(await params);
  if (!r?.course) notFound();
  const { framework: f, grade, course } = r;
  const label = gradeLabel(f, grade);
  const name = subjectSeoTitle(course.subject);
  const meta = getSubjectMeta(course.subject);
  const bigIdeas = course.bigIdeas[f.id] ?? [];
  const tips = HOME_TIPS[course.subject][ageBandFor(grade)].map((t) => say(f, t));
  const levels = f.scoringFor(grade).levels;
  const faqs = [
    {
      q: `How can I help my ${label} child with ${subjectInSentence(name)}?`,
      a: `${tips.slice(0, 2).join(" ")} Keep sessions short, about 10 to 15 minutes, and stop on a success.`,
    },
    {
      q: `What does my child learn in ${label} ${subjectInSentence(name)} in ${f.shortName}?`,
      a: `The ${f.curriculumName} ${label} ${subjectInSentence(name)} units include ${course.units
        .slice(0, 6)
        .map((u) => u.title)
        .join(", ")}.`,
    },
  ];
  const crumbs = [
    { label: "Home", href: "/" },
    { label: `${f.shortName} parent guides`, href: guidePath.hub(f) },
    { label, href: guidePath.grade(f, grade) },
    { label: `${name} at home` },
  ];

  return (
    <SitePage play={playHref({ framework: f.id, grade, subject: course.subject })}>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          faqJsonLd(faqs),
          articleJsonLd({
            headline: `${label} ${name} help at home (${f.shortName})`,
            description: `How to help a ${label} child with ${subjectInSentence(name)} at home in ${f.name}.`,
            path: guidePath.subject(f, grade, course.subject),
            framework: f,
            updated: latest(guidesUpdated(f.id), courseUpdated(f.id, grade, course.subject)),
          }),
        ]}
      />
      <Crumbs items={crumbs} />
      <h1 className="flex items-center gap-3 text-4xl font-bold">
        <span aria-hidden="true">{meta.emoji}</span> {label} {name}: how to help at home
      </h1>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">
        What your child learns in {label} {subjectInSentence(name)} in the {f.curriculumName}, and simple things to try at home.
      </p>
      <div className="mt-3">
        <ShareButton path={guidePath.subject(f, grade, course.subject)} title={`${label} ${name}: how to help at home`} text={`Easy ways to help with ${label} ${subjectInSentence(name)} at home:`} label="Share this guide" />
      </div>

      {bigIdeas.length > 0 && (
        <section aria-labelledby="ideas" className="mt-6 rounded-3xl p-5 sm:p-6" style={{ background: meta.colourSoft }}>
          <h2 id="ideas" className="text-2xl font-bold">
            {f.country === "US" ? `${f.overviewLabel} this year` : "The Big Ideas this year"}
          </h2>
          <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 font-read text-lg">
            {bigIdeas.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="tips" className="mt-8 max-w-3xl">
        <h2 id="tips" className="text-2xl font-bold">
          Easy ways to {say(f, "practise")} {subjectInSentence(name)} at home
        </h2>
        <ul className="mt-2 flex list-disc flex-col gap-2 pl-5 font-read text-lg">
          {tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="units" className="mt-8">
        <h2 id="units" className="mb-3 text-2xl font-bold">
          What each unit covers
        </h2>
        <ol className="grid gap-4 md:grid-cols-2">
          {course.units.map((u) => (
            <li key={u.id} className="card flex flex-col gap-1 p-5">
              <h3 className="flex items-center gap-2 text-xl font-bold">
                <span aria-hidden="true">{u.emoji}</span>
                <Link href={curriculumPath.unit(f, grade, course.subject, u.id)} className="hover:underline">
                  {u.title}
                </Link>
              </h3>
              <p className="font-read text-ink-soft">{u.parentNote}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="levels" className="mt-10 max-w-3xl">
        <h2 id="levels" className="text-2xl font-bold">
          What the report card levels look like at home
        </h2>
        <dl className="mt-3 flex flex-col gap-3">
          {levels.map((l) => (
            <div key={l.id} className="rounded-2xl border border-line bg-white p-4">
              <dt className="font-bold">{l.label}</dt>
              <dd className="font-read">{l.atHome}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 font-read text-ink-soft">
          Your child’s teacher decides the level on the report card.{" "}
          <Link href={`/report-cards/${f.slug}/`} className="font-semibold text-[#2f6fd6] underline">
            Read the {f.shortName} report card guide
          </Link>
          .
        </p>
      </section>

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

      <section className="card mt-10 flex flex-col flex-wrap gap-3 p-6 sm:flex-row sm:items-center">
        <div className="flex-1">
          <p className="text-xl font-bold">Free printable {label} {subjectInSentence(name)} practice sheet</p>
          <p className="font-read text-ink-soft">Questions from every unit, with an answer key.</p>
        </div>
        <Link href={guidePath.worksheet(f, grade, course.subject)} className="btn min-h-12 px-6 text-lg">
          Get the sheet
        </Link>
        <SubscribeActions play={playHref({ framework: f.id, grade, subject: course.subject })} size="md" trialLabel={say(f, `Practise in ${APP_NAME}`)} />
      </section>
    </SitePage>
  );
}

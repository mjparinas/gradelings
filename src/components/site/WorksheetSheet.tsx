import Link from "@/components/PublicLink";
import { PrintButton } from "@/components/site/PrintButton";
import { SampleQuestion, answerText } from "@/components/site/SampleQuestion";
import { ShareButton } from "@/components/site/ShareButton";
import { articleJsonLd, breadcrumbJsonLd, typicalAgeRange } from "@/components/site/jsonld";
import { Crumbs, SitePage, SubscribeActions } from "@/components/site/SiteChrome";
import { sheetQuestions, sourceFramework, subjectAbout, subjectWord, worksheetGradeLabel, worksheetPath, worksheetSkills, type WorksheetSkill } from "@/components/site/worksheets";
import { unitUpdated } from "@/content/updated";
import { APP_NAME } from "@/lib/brand";
import { playHref } from "@/lib/playLink";
import { TRIAL_DAYS } from "@/lib/plan";
import { JsonLd, ORG_REF, absolute } from "@/lib/site";

const capital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** One printable worksheet with its answer key: a skill in any subject, shared by both worksheet routes. */
export function WorksheetSheet({ s }: { s: WorksheetSkill }) {
  const { grade, unit, subject } = s;
  const word = subjectWord(subject);
  const label = worksheetGradeLabel(grade);
  const items = sheetQuestions(s);
    const path = worksheetPath.skill(grade, unit.id, subject);
  const updated = unitUpdated(sourceFramework().id, grade, subject, unit.id);
  const play = playHref({ framework: sourceFramework().id, grade, subject, unit: unit.id });
  const others = worksheetSkills(grade, subject).filter((o) => o.unit.id !== unit.id);
  const crumbs = [{ label: "Home", href: "/" }, { label: "Worksheets", href: worksheetPath.hub() }, { label, href: worksheetPath.grade(grade) }, ...(subject === "math" && grade !== "pk" ? [] : [{ label: capital(word), href: worksheetPath.subject(grade, subject) }]), { label: unit.title }];
  return (
    <SitePage lead="trial" play={play}>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: `${label} ${unit.title} worksheet`,
            description: `A free printable ${label} ${word} worksheet on ${unit.title.toLowerCase()}, with an answer key.`,
            url: absolute(path),
            inLanguage: "en-CA",
            learningResourceType: "Worksheet",
            educationalUse: "practice",
            isAccessibleForFree: true,
            educationalLevel: label,
            typicalAgeRange: typicalAgeRange(grade),
            about: subjectAbout(subject),
            ...(updated ? { dateModified: updated } : {}),
            provider: ORG_REF,
          },
          articleJsonLd({ headline: `${label} ${unit.title} worksheet`, description: unit.blurb, path, updated }),
        ]}
      />
      <div className="print:hidden">
        <Crumbs items={crumbs} />
      </div>
      <header className="flex flex-col gap-3 rounded-3xl bg-white p-6 sm:flex-row sm:items-center print:rounded-none print:p-0">
        <span className="text-5xl print:hidden" aria-hidden="true">
          {unit.emoji}
        </span>
        <div className="flex-1">
          <h1 className="text-4xl font-bold print:text-3xl">
            {label} {unit.title} worksheet
          </h1>
          <p className="font-read text-lg">from {APP_NAME} · Name: ______________________</p>
          {grade === "pk" && <p className="font-read text-lg text-ink-soft">A grown-up reads each question aloud. Your child points to the answer or says it.</p>}
        </div>
        <div className="flex flex-wrap gap-2 sm:flex-col">
          <PrintButton label="Print this worksheet" />
          <ShareButton path={path} title={`${label} ${unit.title} worksheet`} text={`A free ${label} ${unit.title.toLowerCase()} worksheet with answers:`} label="Share this worksheet" />
        </div>
      </header>

      {unit.lesson && (
        <section aria-labelledby="how" className="mt-6 max-w-3xl print:hidden">
          <h2 id="how" className="text-2xl font-bold">
            How to explain it
          </h2>
          <ol className="mt-2 list-decimal space-y-1 pl-6 font-read text-lg">
            {unit.lesson.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <p className="mt-3 rounded-2xl bg-white p-4 font-read text-lg">
            <b>Example:</b> {unit.lesson.example.question} {unit.lesson.example.work.join(" ")} <b>Answer: {unit.lesson.example.answer}</b>
          </p>
        </section>
      )}

      <ol className="mt-6 grid items-start gap-4 md:grid-cols-2 print:block print:space-y-4">
        {items.map((q, i) => (
          <SampleQuestion key={i} q={q} n={i + 1} seedText={`${path}#${i}`} className="print:break-inside-avoid" />
        ))}
      </ol>
      <p className="mt-6 hidden rounded-xl border-2 border-line p-3 font-read text-lg print:block print:break-inside-avoid">
        <b>More {label} {word} practice, with new questions every time:</b> {absolute(worksheetPath.hub()).replace(/^https?:\/\//, "")} · Free for {TRIAL_DAYS} days, no card needed.
      </p>

      <section aria-labelledby="key" className="mt-10 rounded-3xl bg-white p-6 print:break-before-page">
        <h2 id="key" className="text-2xl font-bold">
          Answer key
        </h2>
        <ol className="mt-3 grid gap-x-8 gap-y-1 font-read text-lg sm:grid-cols-2">
          {items.map((q, i) => (
            <li key={i}>
              <b>{i + 1}.</b> {answerText(q)}
            </li>
          ))}
        </ol>
      </section>

      <section className="card mt-10 flex flex-col flex-wrap gap-3 p-6 print:hidden sm:flex-row sm:items-center">
        <div className="flex-1">
          <p className="text-xl font-bold">Want more than {items.length} questions?</p>
          <p className="font-read text-ink-soft">In {APP_NAME} the questions change every time and adjust to your child, with hints and kind feedback.</p>
        </div>
        <SubscribeActions lead="trial" size="md" play={play} />
      </section>

      {others.length > 0 && (
        <section aria-labelledby="more" className="mt-10 print:hidden">
          <h2 id="more" className="text-2xl font-bold">
            More {label} {word} worksheets
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.unit.id}>
                <Link href={worksheetPath.skill(grade, o.unit.id)} className="inline-flex min-h-11 items-center rounded-xl border-2 border-line bg-white px-3 py-1.5 font-read text-lg hover:border-[#4f8ef7]">
                  {o.unit.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </SitePage>
  );
}

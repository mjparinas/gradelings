import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/PublicLink";
import { ReadinessCheck } from "@/components/site/ReadinessCheck";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/site/jsonld";
import { READY_GRADES, gradeWord, previousGrade, readinessQuestions, readyFaqs, readyPath } from "@/components/site/readiness";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { worksheetPath } from "@/components/site/worksheets";
import { gradeFromSlug, gradeSlug } from "@/content/subjects";
import { APP_NAME } from "@/lib/brand";
import { JsonLd } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";

export const dynamicParams = false;

export function generateStaticParams() {
  return READY_GRADES.map((g) => ({ grade: gradeSlug(g) }));
}

type Props = PageProps<"/ready/[grade]">;

function gradeOf(slug: string) {
  const g = gradeFromSlug(slug);
  return g && READY_GRADES.includes(g) ? g : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = gradeOf((await params).grade);
  if (!g) return {};
  const now = gradeWord(g);
  return pageMeta({
    title: [`Is my child ready for ${now} math? Free readiness check`, `Ready for ${now} math? Free check`, `Ready for ${now} math?`],
    description: `Free ${now} math readiness check: ten untimed questions from ${gradeWord(previousGrade(g)!)} skills, a plain result and what to practise next. No sign-up. Then more in ${APP_NAME}.`,
    path: readyPath.grade(g),
    type: "article",
  });
}

export default async function ReadyGradePage({ params }: Props) {
  const g = gradeOf((await params).grade);
  if (!g) notFound();
  const prev = previousGrade(g)!;
  const now = gradeWord(g);
  const before = gradeWord(prev);
  const questions = readinessQuestions(g);
  const faqs = readyFaqs(g);
  const crumbs = [{ label: "Home", href: "/" }, { label: "Math readiness checks", href: readyPath.hub() }, { label: `Ready for ${now} math?` }];
  return (
    <SitePage cta lead="trial" play="/play/">
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(faqs), articleJsonLd({ headline: `Is my child ready for ${now} math?`, description: `A free, untimed ${now} math readiness check.`, path: readyPath.grade(g) })]} />
      <Crumbs items={crumbs} />
      <h1 className="text-4xl font-bold">Is my child ready for {now} math?</h1>
      <p className="mt-2 max-w-3xl font-read text-lg text-ink-soft">
        Ten questions on the main ideas from {before} math. No timer, no sign-up, and nothing is saved. A miss gets a hint and a second try, and only first tries count toward the result.
      </p>
      <section aria-labelledby="check" className="mt-8 max-w-3xl">
        <h2 id="check" className="sr-only">
          The {now} readiness check
        </h2>
        <ReadinessCheck questions={questions} gradeLabel={now} previousLabel={before} play="/play/" />
      </section>
      <section aria-labelledby="faq" className="mt-10 max-w-3xl">
        <h2 id="faq" className="text-2xl font-bold">
          Questions parents ask
        </h2>
        <dl className="mt-3 flex flex-col gap-4 font-read text-lg">
          {faqs.map((f) => (
            <div key={f.q}>
              <dt className="font-bold">{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 font-read text-lg">
          More free help: <Link href={worksheetPath.grade(prev)} className="font-bold underline">{before} worksheets</Link>, or{" "}
          <Link href={readyPath.hub()} className="font-bold underline">the other grades&apos; checks</Link>.
        </p>
      </section>
    </SitePage>
  );
}
